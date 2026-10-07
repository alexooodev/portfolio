import { useState } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import type { Turn } from "../store";
import AnswerText from "./AnswerText";
import SourceList from "./SourceList";
import { useMessages } from "../../../i18n/localeStore";

interface TurnViewProps {
  turn: Turn;
  onRetry: (turnId: string) => void;
}

function MetaLine({ turn }: { turn: Turn }) {
  const t = useMessages().demo.turn;
  const { meta } = turn;
  if (!meta) return null;
  const secs = (meta.latencyMs / 1000).toFixed(1);
  const parts = [
    turn.live ? t.live : t.recorded,
    meta.model,
    turn.live ? `${secs}s` : `${t.originallyAnswered} ${secs}s`,
    meta.topScore !== null ? `${t.topMatch} ${Math.round(meta.topScore * 100)}%` : null,
  ].filter(Boolean);
  return <p className="text-xs text-slate-500">{parts.join(" · ")}</p>;
}

export default function TurnView({ turn, onRetry }: TurnViewProps) {
  const m = useMessages().demo;
  const t = m.turn;
  const [activeN, setActiveN] = useState<number | null>(null);
  const sourceNs = new Set(turn.sources.map((s) => s.n));
  const streaming = turn.status === "streaming";

  const handleCite = (n: number) => {
    setActiveN(n);
    document.getElementById(`${turn.id}-src-${n}`)?.scrollIntoView?.({ behavior: "smooth", block: "nearest" });
  };

  return (
    <article className="space-y-3" aria-label={`${t.questionAria} ${turn.req.question}`}>
      <div className="flex justify-end">
        <p className="max-w-[90%] rounded-2xl rounded-br-sm bg-slate-700/70 px-4 py-2.5 text-sm text-slate-100">
          {turn.req.question}
        </p>
      </div>

      <div className="space-y-3">
        {turn.status === "no_answer" && (
          <div
            className="flex gap-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-100"
            role="status"
          >
            <AlertTriangle className="mt-0.5 shrink-0 text-amber-400" size={18} />
            <p>{turn.message}</p>
          </div>
        )}

        {turn.status === "error" && (
          <div
            className="flex items-start justify-between gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200"
            role="alert"
          >
            <p>{turn.errorKind ? m.errors[turn.errorKind] : m.errors.network}</p>
            <button
              type="button"
              onClick={() => onRetry(turn.id)}
              className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-red-400/50 px-2.5 py-1 text-xs font-medium hover:bg-red-500/20 transition-colors"
            >
              <RotateCcw size={12} />
              {t.retry}
            </button>
          </div>
        )}

        {streaming && turn.answer === "" && turn.sources.length === 0 && (
          <p className="text-sm text-slate-400" role="status">
            {t.searching}
          </p>
        )}

        {turn.answer !== "" && (
          <div aria-live="polite" aria-busy={streaming} className="text-sm">
            <AnswerText text={turn.answer} sourceNs={sourceNs} streaming={streaming} onCite={handleCite} />
          </div>
        )}

        {turn.status === "stopped" && <p className="text-sm text-slate-500">{t.stopped}</p>}

        {turn.status === "done" && turn.citations && !turn.citations.hasAnyCitation && (
          <p className="flex items-center gap-2 text-xs text-amber-300">
            <AlertTriangle size={14} />
            {t.noCitations}
          </p>
        )}
        {turn.status === "done" && turn.citations && turn.citations.invalid.length > 0 && (
          <p className="flex items-center gap-2 text-xs text-amber-300">
            <AlertTriangle size={14} />
            {t.invalidCitations} ({turn.citations.invalid.map((n) => `[${n}]`).join(", ")}).
          </p>
        )}

        {turn.sources.length > 0 && <SourceList idPrefix={turn.id} sources={turn.sources} activeN={activeN} />}

        <MetaLine turn={turn} />
      </div>
    </article>
  );
}
