import { create } from "zustand";
import { ApiError, fetchRecorded, streamAsk } from "../lib/certCopilot/api";
import { CERT_API_BASE } from "../lib/certCopilot/config";
import type { AskMeta, AskRequest, CitationCheck, PublicSource, RecordedItem } from "../lib/certCopilot/types";

export type TurnStatus = "streaming" | "done" | "no_answer" | "error" | "stopped";

export interface Turn {
  id: string;
  req: AskRequest;
  /** true = pregunta libre al modelo; false = sesión grabada. */
  live: boolean;
  status: TurnStatus;
  answer: string;
  sources: PublicSource[];
  citations: CitationCheck | null;
  meta: AskMeta | null;
  /** no_answer: mensaje del backend. error: mensaje para mostrar. */
  message: string | null;
}

interface CertCopilotState {
  sessions: RecordedItem[];
  sessionsStatus: "idle" | "loading" | "ready" | "error";
  turns: Turn[];
  busy: boolean;
  inviteCode: string;
  loadSessions: () => Promise<void>;
  askRecorded: (item: RecordedItem) => Promise<void>;
  askLive: (question: string) => Promise<void>;
  retry: (turnId: string) => Promise<void>;
  setInviteCode: (code: string) => void;
  stop: () => void;
  reset: () => void;
}

const MAX_TURNS = 8;
let controller: AbortController | null = null;
let seq = 0;

function describeError(e: unknown, hadCode: boolean): string {
  if (e instanceof ApiError) {
    if (e.status === 403) {
      return hadCode
        ? "That invitation code didn't work, or live mode is switched off."
        : "Live questions need an invitation code. Pick one of the example questions instead.";
    }
    if (e.status === 404) return "That recorded session is no longer available.";
    if (e.status === 400) return "The question must be between 3 and 500 characters.";
  }
  return "Couldn't reach the Cert Copilot API. Try again in a moment.";
}

export const useCertCopilotStore = create<CertCopilotState>((set, get) => {
  async function run(req: AskRequest): Promise<void> {
    controller?.abort();
    const ctrl = new AbortController();
    controller = ctrl;

    const id = `turn-${++seq}`;
    const live = !req.sessionId;
    const inviteCode = live ? get().inviteCode.trim() : "";
    const turn: Turn = {
      id,
      req,
      live,
      status: "streaming",
      answer: "",
      sources: [],
      citations: null,
      meta: null,
      message: null,
    };
    set((s) => ({ busy: true, turns: [...s.turns, turn].slice(-MAX_TURNS) }));

    const patch = (p: Partial<Turn> | ((t: Turn) => Partial<Turn>)) =>
      set((s) => ({
        turns: s.turns.map((t) => (t.id === id ? { ...t, ...(typeof p === "function" ? p(t) : p) } : t)),
      }));

    try {
      for await (const ev of streamAsk(req, {
        baseUrl: CERT_API_BASE,
        signal: ctrl.signal,
        ...(inviteCode ? { inviteCode } : {}),
      })) {
        switch (ev.type) {
          case "sources":
            patch({ sources: ev.sources });
            break;
          case "token":
            patch((t) => ({ answer: t.answer + ev.text }));
            break;
          case "no_answer":
            patch({ status: "no_answer", message: ev.message });
            break;
          case "done":
            patch({ status: "done", citations: ev.citations, meta: ev.meta });
            break;
          case "error":
            patch({ status: "error", message: describeError(null, false) });
            break;
        }
      }
      // El stream terminó sin `done`/`no_answer`/`error`: la conexión se cortó.
      patch((t) =>
        t.status === "streaming" ? { status: "error", message: "The connection closed before the answer finished." } : {},
      );
    } catch (e) {
      if (ctrl.signal.aborted) {
        patch((t) => (t.status === "streaming" ? { status: "stopped" } : {}));
      } else {
        patch({ status: "error", message: describeError(e, inviteCode !== "") });
      }
    } finally {
      // Si otra pregunta tomó el relevo, ella se encarga de `busy`.
      if (controller === ctrl) {
        controller = null;
        set({ busy: false });
      }
    }
  }

  return {
    sessions: [],
    sessionsStatus: "idle",
    turns: [],
    busy: false,
    inviteCode: "",

    loadSessions: async () => {
      set({ sessionsStatus: "loading" });
      try {
        const sessions = await fetchRecorded({ baseUrl: CERT_API_BASE });
        set({ sessions, sessionsStatus: "ready" });
      } catch {
        set({ sessionsStatus: "error" });
      }
    },

    askRecorded: (item) => run({ question: item.question, sessionId: item.id }),
    askLive: (question) => run({ question: question.trim() }),

    retry: async (turnId) => {
      const turn = get().turns.find((t) => t.id === turnId);
      if (!turn) return;
      set((s) => ({ turns: s.turns.filter((t) => t.id !== turnId) }));
      await run(turn.req);
    },

    setInviteCode: (inviteCode) => set({ inviteCode }),

    stop: () => controller?.abort(),

    reset: () => {
      controller?.abort();
      controller = null;
      set({ turns: [], busy: false });
    },
  };
});
