import { Fragment } from "react";
import { useMessages } from "../../../i18n/localeStore";

interface AnswerTextProps {
  text: string;
  /** Números de cita que existen entre las fuentes recibidas. */
  sourceNs: ReadonlySet<number>;
  streaming: boolean;
  onCite: (n: number) => void;
}

// [n] | **negrita** | `código`. El modelo suele responder con este markdown mínimo; no se renderiza nada más.
const TOKEN = /(\[\d{1,3}\]|\*\*[^*\n]+\*\*|`[^`\n]+`)/;

export default function AnswerText({ text, sourceNs, streaming, onCite }: AnswerTextProps) {
  const t = useMessages().demo.sources;
  return (
    <p className="whitespace-pre-wrap leading-relaxed text-slate-200">
      {text.split(TOKEN).map((part, i) => {
        const cite = /^\[(\d{1,3})\]$/.exec(part);
        if (cite) {
          const n = Number(cite[1]);
          return sourceNs.has(n) ? (
            <button
              key={i}
              type="button"
              onClick={() => onCite(n)}
              aria-label={`${t.show} ${n}`}
              className="mx-0.5 inline-flex items-center rounded-md border border-amber-500/40 bg-amber-500/15 px-1.5 text-sm font-semibold text-amber-300 align-baseline hover:bg-amber-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-colors"
            >
              {n}
            </button>
          ) : (
            // Cita a una fuente que no existe: se marca, no se enlaza.
            <span key={i} title={t.missing} className="mx-0.5 text-red-400 line-through">
              {part}
            </span>
          );
        }
        if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={i} className="rounded bg-slate-800 px-1.5 py-0.5 text-sm text-amber-200">
              {part.slice(1, -1)}
            </code>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
      {streaming && (
        <span aria-hidden="true" className="ml-0.5 inline-block h-4 w-1.5 translate-y-0.5 animate-pulse bg-amber-400" />
      )}
    </p>
  );
}
