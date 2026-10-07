import { useState } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import type { Turn } from "../../store/certCopilotStore";
import AnswerText from "./AnswerText";
import SourceList from "./SourceList";

interface TurnViewProps {
  turn: Turn;
  onRetry: (turnId: string) => void;
}

function MetaLine({ turn }: { turn: Turn }) {
  const { meta } = turn;
  if (!meta) return null;
  const secs = (meta.latencyMs / 1000).toFixed(1);
  const parts = [
    turn.live ? "Live" : "Recorded session",
    meta.model,
    turn.live ? `${secs}s` : `originally answered in ${secs}s`,
    meta.topScore !== null ? `top match ${Math.round(meta.topScore * 100)}%` : null,
  ].filter(Boolean);
  return <p className="text-xs text-slate-500">{parts.join(" · ")}</p>;
}

export default function TurnView({ turn, onRetry }: TurnViewProps) {
  const [activeN, setActiveN] = useState<number | null>(null);
  const sourceNs = new Set(turn.sources.map((s) => s.n));
  const streaming = turn.status === "streaming";

  const handleCite = (n: number) => {
    setActiveN(n);
    document.getElementById(`${turn.id}-src-${n}`)?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
  };

  return (
    <article className="space-y-4" aria-label={`Question: ${turn.req.question}`}>
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-slate-700/70 px-4 py-3 text-slate-100">{turn.req.question}</p>
      </div>

      <div className="space-y-4 rounded-2xl rounded-bl-sm border border-slate-700 bg-slate-900/70 p-5">
        {turn.status === "no_answer" && (
          <div className="flex gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 text-amber-100" role="status">
            <AlertTriangle className="mt-0.5 shrink-0 text-amber-400" size={20} />
            <p>{turn.message}</p>
          </div>
        )}

        {turn.status === "error" && (
          <div className="flex items-start justify-between gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-red-200" role="alert">
            <p>{turn.message}</p>
            <button
              type="button"
              onClick={() => onRetry(turn.id)}
              className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-red-400/50 px-3 py-1.5 text-sm font-medium hover:bg-red-500/20 transition-colors"
            >
              <RotateCcw size={14} />
              Retry
            </button>
          </div>
        )}

        {streaming && turn.answer === "" && turn.sources.length === 0 && (
          <p className="text-sm text-slate-400" role="status">
            Searching the docs…
          </p>
        )}

        {turn.answer !== "" && (
          <div aria-live="polite" aria-busy={streaming}>
            <AnswerText text={turn.answer} sourceNs={sourceNs} streaming={streaming} onCite={handleCite} />
          </div>
        )}

        {turn.status === "stopped" && <p className="text-sm text-slate-500">Stopped.</p>}

        {turn.status === "done" && turn.citations && !turn.citations.hasAnyCitation && (
          <p className="flex items-center gap-2 text-sm text-amber-300">
            <AlertTriangle size={16} />
            This answer has no citations. Treat it with caution.
          </p>
        )}
        {turn.status === "done" && turn.citations && turn.citations.invalid.length > 0 && (
          <p className="flex items-center gap-2 text-sm text-amber-300">
            <AlertTriangle size={16} />
            It cites sources that don't exist ({turn.citations.invalid.map((n) => `[${n}]`).join(", ")}).
          </p>
        )}

        {turn.sources.length > 0 && <SourceList idPrefix={turn.id} sources={turn.sources} activeN={activeN} />}

        <MetaLine turn={turn} />
      </div>
    </article>
  );
}
