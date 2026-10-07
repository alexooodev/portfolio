import React, { lazy, Suspense } from "react";
import { Quote, Search, ShieldCheck, Zap } from "lucide-react";
import { CERT_COPILOT_ENABLED } from "../features/cert-copilot/config";

// Chunk aparte: con el flag apagado los visitantes no descargan nada del demo.
const CertCopilotDemo = lazy(() => import("../features/cert-copilot/components/CertCopilotDemo"));

const HIGHLIGHTS = [
  {
    icon: Search,
    title: "Retrieval pipeline",
    text: "Chunking, bge-m3 embeddings and pgvector similarity search over the official docs.",
  },
  {
    icon: Quote,
    title: "Cited answers",
    text: "Streamed over SSE. Every [n] citation is checked against the sources actually retrieved.",
  },
  {
    icon: ShieldCheck,
    title: "Knows when it doesn't know",
    text: "Below a relevance threshold it declines to answer instead of guessing.",
  },
  {
    icon: Zap,
    title: "Free to explore",
    text: "The demo replays real recorded sessions, so visitors never spend model quota.",
  },
];

const STACK = ["React", "TypeScript", "Hono", "Postgres + pgvector", "SSE streaming"];

/** Mismo marco que el panel del demo, para que la sección no cambie de tamaño cuando el demo está apagado. */
const DemoUnavailable: React.FC<{ loading?: boolean }> = ({ loading = false }) => (
  <div className="flex h-[34rem] flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-2xl">
    <div className="flex items-center gap-2 border-b border-slate-700 bg-slate-800 px-4 py-3">
      <span className="h-3 w-3 rounded-full bg-red-500" />
      <span className="h-3 w-3 rounded-full bg-yellow-500" />
      <span className="h-3 w-3 rounded-full bg-green-500" />
      <span className="ml-2 text-sm text-slate-400">cert-copilot</span>
    </div>
    <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center" role="status">
      <p className="font-medium text-slate-300">{loading ? "Loading demo…" : "Live demo coming soon"}</p>
      {!loading && <p className="max-w-xs text-sm text-slate-500">Recorded sessions will appear here.</p>}
    </div>
  </div>
);

const Projects: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  return (
    <section id={sectionId} className="relative py-20 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
          Featured{" "}
          <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Project</span>
        </h2>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:items-center">
          <div className="min-w-0 space-y-6 lg:col-span-2">
            <div className="space-y-2">
              <p className="text-amber-400 font-semibold">AI · Retrieval-augmented generation</p>
              <h3 className="text-3xl md:text-4xl font-bold">Cert Copilot</h3>
            </div>

            <p className="text-lg text-slate-400 leading-relaxed">
              A study assistant for the AWS Cloud Practitioner exam. Ask a question and get an answer grounded in the
              official documentation, with every claim linked to its source. When the evidence isn't there, it says so.
            </p>

            <ul className="space-y-4">
              {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="font-medium text-slate-100">{title}</p>
                    <p className="text-sm leading-relaxed text-slate-400">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {STACK.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-lg text-sm text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="min-w-0 lg:col-span-3">
            {CERT_COPILOT_ENABLED ? (
              <Suspense fallback={<DemoUnavailable loading />}>
                <CertCopilotDemo />
              </Suspense>
            ) : (
              <DemoUnavailable />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
