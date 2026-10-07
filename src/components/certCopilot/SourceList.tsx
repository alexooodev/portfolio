import { ExternalLink } from "lucide-react";
import { safeHref } from "../../lib/certCopilot/safeHref";
import type { PublicSource } from "../../lib/certCopilot/types";

interface SourceListProps {
  idPrefix: string;
  sources: PublicSource[];
  activeN: number | null;
}

export default function SourceList({ idPrefix, sources, activeN }: SourceListProps) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">Sources</h4>
      <ol className="grid gap-3 md:grid-cols-2">
        {sources.map((s) => {
          const href = safeHref(s.url);
          const active = activeN === s.n;
          return (
            <li
              key={s.n}
              id={`${idPrefix}-src-${s.n}`}
              aria-current={active ? "true" : undefined}
              className={`rounded-xl border p-4 text-sm transition-colors ${
                active ? "border-amber-500 bg-amber-500/10" : "border-slate-700 bg-slate-800/50"
              }`}
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-md bg-amber-500/20 px-1.5 text-xs font-bold text-amber-300">
                  {s.n}
                </span>
                <span className="font-medium text-slate-100">{s.section || "Untitled section"}</span>
                {s.service && (
                  <span className="rounded-full border border-slate-600 px-2 py-0.5 text-xs text-slate-300">{s.service}</span>
                )}
                <span className="ml-auto text-xs text-slate-500" title="Cosine similarity to the question">
                  {Math.round(s.score * 100)}% match
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">{s.snippet}</p>
              {href && (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
                >
                  <ExternalLink size={14} />
                  Open in the official docs
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
