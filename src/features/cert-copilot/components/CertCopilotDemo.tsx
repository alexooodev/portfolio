import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { KeyRound, MessageSquare, Send, Square, Trash2 } from "lucide-react";
import { useCertCopilotStore } from "../store";
import TurnView from "./TurnView";

/** Panel de demo con aspecto de ventana (igual que la del hero). Alto fijo: la conversación hace scroll dentro. */
export default function CertCopilotDemo() {
  const {
    sessions,
    sessionsStatus,
    turns,
    busy,
    inviteCode,
    loadSessions,
    askRecorded,
    askLive,
    retry,
    setInviteCode,
    stop,
    reset,
  } = useCertCopilotStore();

  const [showLive, setShowLive] = useState(false);
  const [question, setQuestion] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const turnCount = turns.length;

  useEffect(() => {
    if (useCertCopilotStore.getState().sessionsStatus === "idle") void loadSessions();
    return () => useCertCopilotStore.getState().stop();
  }, [loadSessions]);

  // Pregunta nueva: se alinea arriba, como en un chat. La respuesta crece hacia abajo sin mover el scroll del lector.
  useEffect(() => {
    const el = scrollRef.current;
    const last = el?.lastElementChild;
    if (!el || !last || turnCount === 0) return;
    const top = last.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop - 8;
    el.scrollTo?.({ top, behavior: "smooth" });
  }, [turnCount]);

  const canAskLive = !busy && inviteCode.trim() !== "" && question.trim().length >= 3;

  const handleLive = (e: FormEvent) => {
    e.preventDefault();
    if (!canAskLive) return;
    void askLive(question);
    setQuestion("");
  };

  return (
    <div className="flex h-[34rem] flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
      <div className="flex shrink-0 items-center gap-2 border-b border-slate-700 bg-slate-800 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-2 text-sm text-slate-400">cert-copilot</span>
        <span className="ml-auto rounded-full border border-slate-600 px-2.5 py-0.5 text-xs text-slate-300">
          Recorded sessions
        </span>
      </div>

      <div className="max-h-28 shrink-0 overflow-y-auto border-b border-slate-800 p-3">
        {sessionsStatus === "loading" || sessionsStatus === "idle" ? (
          <div className="flex flex-wrap gap-2" aria-label="Loading example questions" role="status">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-8 w-44 animate-pulse rounded-full bg-slate-800" />
            ))}
          </div>
        ) : sessionsStatus === "error" ? (
          <p className="text-sm text-slate-400">
            Couldn't load the example questions.{" "}
            <button type="button" onClick={() => void loadSessions()} className="font-semibold text-amber-400 hover:text-amber-300">
              Try again
            </button>
          </p>
        ) : sessions.length === 0 ? (
          <p className="text-sm text-slate-400">No recorded sessions yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {sessions.map((s) => (
              <button
                key={s.id}
                type="button"
                title={s.question}
                onClick={() => void askRecorded(s)}
                className="max-w-full truncate rounded-full border border-slate-600 bg-slate-800/60 px-3 py-1.5 text-left text-sm text-slate-200 transition-colors hover:border-amber-500/60 hover:text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                {s.question}
              </button>
            ))}
          </div>
        )}
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 space-y-6 overflow-y-auto p-4">
        {turns.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-slate-500">
            <MessageSquare size={28} className="text-slate-600" />
            <p className="max-w-xs text-sm">Pick a question above to see a cited answer, built from the official docs.</p>
          </div>
        ) : (
          turns.map((t) => <TurnView key={t.id} turn={t} onRetry={(id) => void retry(id)} />)
        )}
      </div>

      <div className="shrink-0 space-y-3 border-t border-slate-800 p-3">
        {turns.length > 0 && (
          <div className="flex justify-end gap-2">
            {busy && (
              <button
                type="button"
                onClick={stop}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600 px-2.5 py-1 text-xs text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <Square size={12} />
                Stop
              </button>
            )}
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-800 transition-colors"
            >
              <Trash2 size={12} />
              Clear
            </button>
          </div>
        )}

        {!showLive ? (
          <button
            type="button"
            onClick={() => setShowLive(true)}
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-amber-300 transition-colors"
          >
            <KeyRound size={14} />I have an invitation code
          </button>
        ) : (
          <form onSubmit={handleLive} className="space-y-2">
            <p className="text-xs text-slate-500">Live questions run a real model, need an invitation code and are rate-limited.</p>
            <div className="grid gap-2 sm:grid-cols-[8rem_1fr_auto]">
              <div>
                <label htmlFor="cert-invite" className="sr-only">
                  Invitation code
                </label>
                <input
                  id="cert-invite"
                  type="password"
                  autoComplete="off"
                  placeholder="Code"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white transition-colors focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="cert-question" className="sr-only">
                  Your question
                </label>
                <input
                  id="cert-question"
                  type="text"
                  maxLength={500}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask your own question…"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white transition-colors focus:border-amber-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={!canAskLive}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2 text-sm font-semibold text-slate-900 transition-all hover:shadow-lg hover:shadow-amber-500/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
              >
                <Send size={14} />
                Ask live
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
