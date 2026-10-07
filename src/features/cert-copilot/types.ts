// Espejo de los eventos SSE del backend (cert-copilot-poc/src/types.ts).
// Si el contrato cambia allá, cambia aquí.

export interface PublicSource {
  n: number; // número de cita [n]
  id: number;
  url: string;
  section: string;
  cert: string;
  service: string;
  snippet: string;
  score: number; // similitud coseno 0..1
}

export interface CitationCheck {
  used: number[];
  invalid: number[];
  hasAnyCitation: boolean;
}

export interface AskMeta {
  provider: string;
  model: string;
  latencyMs: number;
  retrieved: number;
  topScore: number | null;
  tokensInEst: number;
  tokensOutEst: number;
  recorded: boolean;
}

export type AskEvent =
  | { type: "sources"; sources: PublicSource[] }
  | { type: "token"; text: string }
  | { type: "no_answer"; reason: "low_relevance" | "no_results"; message: string; topScore: number | null }
  | { type: "done"; citations: CitationCheck; meta: AskMeta }
  | { type: "error"; message: string };

export interface RecordedItem {
  id: string;
  question: string;
}

export interface AskRequest {
  question: string;
  /** Si viene, el backend reproduce una sesión grabada (no gasta cuota). */
  sessionId?: string;
}
