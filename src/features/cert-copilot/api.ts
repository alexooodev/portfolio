import { readSse, type SseMessage } from "./sse";
import type { AskEvent, AskRequest, RecordedItem } from "./types";

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  constructor(status: number, code: string, message?: string) {
    super(message ?? code);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

export interface ApiOptions {
  baseUrl?: string;
  signal?: AbortSignal;
  /** Código de invitación para el modo en vivo. Se envía en `x-invite-code`. */
  inviteCode?: string;
}

const EVENT_TYPES = new Set(["sources", "token", "no_answer", "done", "error"]);

/** Valida lo mínimo para que la UI no reviente con un evento mal formado. */
export function parseEvent(msg: SseMessage): AskEvent | null {
  let v: unknown;
  try {
    v = JSON.parse(msg.data);
  } catch {
    return null;
  }
  if (typeof v !== "object" || v === null) return null;
  const e = v as Record<string, unknown>;
  if (typeof e.type !== "string" || !EVENT_TYPES.has(e.type)) return null;
  switch (e.type) {
    case "sources":
      return Array.isArray(e.sources) ? (e as unknown as AskEvent) : null;
    case "token":
      return typeof e.text === "string" ? (e as unknown as AskEvent) : null;
    case "done":
      return typeof e.citations === "object" && e.citations !== null && typeof e.meta === "object" && e.meta !== null
        ? (e as unknown as AskEvent)
        : null;
    case "no_answer":
      return typeof e.message === "string" ? (e as unknown as AskEvent) : null;
    default:
      return e as unknown as AskEvent;
  }
}

export async function fetchRecorded(opts: ApiOptions = {}): Promise<RecordedItem[]> {
  const res = await fetch(`${opts.baseUrl ?? ""}/api/cert/recorded`, { signal: opts.signal });
  if (!res.ok) throw new ApiError(res.status, "recorded_failed");
  const data: unknown = await res.json();
  if (!Array.isArray(data)) throw new ApiError(res.status, "recorded_invalid");
  return data.filter(
    (d): d is RecordedItem =>
      typeof d === "object" && d !== null && typeof d.id === "string" && typeof d.question === "string",
  );
}

/** POST /api/cert/ask → eventos tipados. Lanza ApiError si el servidor responde con error HTTP. */
export async function* streamAsk(body: AskRequest, opts: ApiOptions = {}): AsyncGenerator<AskEvent> {
  const headers: Record<string, string> = { "content-type": "application/json", accept: "text/event-stream" };
  if (opts.inviteCode) headers["x-invite-code"] = opts.inviteCode;

  const res = await fetch(`${opts.baseUrl ?? ""}/api/cert/ask`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    signal: opts.signal,
  });

  if (!res.ok) {
    const err = (await res.json().catch(() => null)) as { error?: string; hint?: string } | null;
    throw new ApiError(res.status, err?.error ?? "request_failed", err?.hint);
  }
  if (!res.body) throw new ApiError(res.status, "no_body");

  for await (const msg of readSse(res.body)) {
    const ev = parseEvent(msg);
    if (ev) yield ev;
  }
}
