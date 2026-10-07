import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Bot, KeyRound, Send, Square, Trash2 } from "lucide-react";
import { useCertCopilotStore } from "../../store/certCopilotStore";
import TurnView from "./TurnView";

export default function CertCopilotSection({ sectionId }: { sectionId: string }) {
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

  useEffect(() => {
    if (useCertCopilotStore.getState().sessionsStatus === "idle") void loadSessions();
    return () => useCertCopilotStore.getState().stop();
  }, [loadSessions]);

  const canAskLive = !busy && inviteCode.trim() !== "" && question.trim().length >= 3;

  const handleLive = (e: FormEvent) => {
    e.preventDefault();
    if (!canAskLive) return;
    void askLive(question);
    setQuestion("");
  };

  return (
    <section id={sectionId} className="relative py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto mb-10 max-w-3xl space-y-4 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Cert{" "}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">Copilot</span>
          </h2>
          <p className="text-lg leading-relaxed text-slate-400">
            Ask AWS Cloud Practitioner questions and get answers grounded in the official documentation. Every claim cites its
            source, and when the evidence isn't there, it says it doesn't know.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-300">
            {["RAG", "pgvector", "Cited answers", "Streaming (SSE)"].map((tag) => (
              <span key={tag} className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-5 md:p-8">
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-800/40 p-4 text-sm text-slate-300">
            <Bot className="mt-0.5 shrink-0 text-amber-400" size={18} />
            <p>
              You're viewing <strong className="text-white">recorded sessions</strong>: real answers produced by this pipeline,
              replayed with simulated streaming. No model is called, so it's instant and free.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">Try a question</h3>
            {sessionsStatus === "loading" || sessionsStatus === "idle" ? (
              <div className="flex flex-wrap gap-2" aria-label="Loading example questions" role="status">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-9 w-56 animate-pulse rounded-full bg-slate-800" />
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
                    onClick={() => void askRecorded(s)}
                    className="rounded-full border border-slate-600 bg-slate-800/60 px-4 py-2 text-left text-sm text-slate-200 transition-colors hover:border-amber-500/60 hover:text-amber-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    {s.question}
                  </button>
                ))}
              </div>
            )}
          </div>

          {turns.length > 0 && (
            <div className="space-y-8">
              <div className="flex justify-end gap-2">
                {busy && (
                  <button
                    type="button"
                    onClick={stop}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800 transition-colors"
                  >
                    <Square size={14} />
                    Stop
                  </button>
                )}
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  <Trash2 size={14} />
                  Clear
                </button>
              </div>
              {turns.map((t) => (
                <TurnView key={t.id} turn={t} onRetry={(id) => void retry(id)} />
              ))}
            </div>
          )}

          <div className="mt-8 border-t border-slate-800 pt-6">
            {!showLive ? (
              <button
                type="button"
                onClick={() => setShowLive(true)}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-amber-300 transition-colors"
              >
                <KeyRound size={16} />
                I have an invitation code
              </button>
            ) : (
              <form onSubmit={handleLive} className="space-y-4">
                <p className="text-sm text-slate-400">
                  Live questions run the full pipeline against a real model. They need an invitation code and are rate-limited.
                </p>
                <div className="grid gap-4 md:grid-cols-[14rem_1fr]">
                  <div>
                    <label htmlFor="cert-invite" className="mb-2 block text-sm font-medium text-slate-300">
                      Invitation code
                    </label>
                    <input
                      id="cert-invite"
                      type="password"
                      autoComplete="off"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white transition-colors focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="cert-question" className="mb-2 block text-sm font-medium text-slate-300">
                      Your question
                    </label>
                    <input
                      id="cert-question"
                      type="text"
                      maxLength={500}
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      placeholder="e.g. What does the shared responsibility model cover?"
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white transition-colors focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={!canAskLive}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-3 font-semibold text-slate-900 transition-all hover:shadow-lg hover:shadow-amber-500/40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
                >
                  <Send size={18} />
                  Ask live
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
