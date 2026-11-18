"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Service } from "@/lib/services";
import { ChatPanel } from "./ChatPanel";
import { useAiStatus } from "./useAiStatus";

/** "Ask the AI" section shown on every service page. Uses the same assistant as the floating chat, which only answers from approved service content. */
export function AskService({ service: s }: { service: Service }) {
  const enabled = useAiStatus();
  const first = s.offerings[0]?.name ?? s.title;
  const suggestions = [`What does ${first.toLowerCase()} include?`, `Is ${s.title.toLowerCase()} right for my business?`, "How does the process work?", "What would you need from me to start?"];
  const greeting = `Hi! I'm RAGOPHALA AI. Ask me anything about ${s.title.toLowerCase()}: what we build, who it suits, how the process works and what to expect. What would you like to know?`;

  return (
    <section id="ask" className="theme-soft section scroll-mt-24 bg-softblue">
      <div className="container-x grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="label mb-5 flex items-center gap-3"><Sparkles size={14} aria-hidden className="text-cobalt" />Ask the AI</p>
          <h2 className="display-md">Ask about {s.title.toLowerCase()}.</h2>
          <p className="body-lg mt-5">Type a question or pick a suggestion. The assistant answers from our approved service information and passes you to the team when you are ready for a quotation.</p>
          <p className="mt-4 text-sm text-muted">AI can make mistakes. It cannot confirm bookings or quote prices: pricing is tailored in a written quotation.</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-line bg-ivory shadow-[0_30px_60px_-40px_rgba(16,24,39,.35)]">
          {enabled === null && <div aria-busy="true" className="h-[460px] animate-pulse bg-card" />}
          {enabled === false && (
            <div className="grid h-[260px] place-items-center p-8 text-center" role="status">
              <div>
                <p className="font-display text-lg font-semibold">The live assistant is not available right now.</p>
                <p className="mx-auto mt-2 max-w-sm text-sm text-muted">You can still ask us directly and receive a personalised answer and quotation.</p>
                <Link href={`/contact?service=${s.key}`} className="btn btn-primary mt-5">Request a Quote</Link>
              </div>
            </div>
          )}
          {enabled && <ChatPanel mode="assistant" greeting={greeting} suggestions={suggestions} storageKey={`rd-ask-${s.key}`} placeholder={`Ask about ${s.title.toLowerCase()}…`} className="h-[500px]" />}
        </div>
      </div>
    </section>
  );
}
