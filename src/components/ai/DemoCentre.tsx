"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Info, Loader2, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { BUDGETS } from "@/lib/site";
import { cn } from "@/lib/utils";
import { AiDemo, AutomationFlow } from "../demos-ai";
import { ChatPanel } from "./ChatPanel";
import { useAiStatus } from "./useAiStatus";

const TABS = [
  { id: "assistant", label: "AI Customer Assistant" },
  { id: "qualify", label: "Smart Lead Qualification" },
  { id: "workflow", label: "Business Workflow Automation" },
] as const;
type Tab = (typeof TABS)[number]["id"];

const SAMPLE = "Hi, I run a small bakery in Cape Town and need a website with online ordering before the December rush. We would also like WhatsApp order alerts. Our launch deadline is the end of November.";

const CATEGORY: Record<string, string> = { web: "Website development", apps: "Web application", ai: "AI agent", automation: "Business automation", support: "Support and maintenance", other: "Other / unclear" };
const PRIORITY_STYLE: Record<string, string> = { high: "bg-rose-100 text-rose-800", medium: "bg-amber-100 text-amber-800", low: "bg-emerald-100 text-emerald-800" };

interface Qualification {
  category: string;
  priority: "high" | "medium" | "low";
  priorityReason: string;
  businessType: string;
  summary: string;
  followUp: string;
  source: "ai" | "rules";
}

function Notice({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 flex items-start gap-2 rounded-lg border border-line bg-card p-3 text-xs leading-relaxed text-muted"><Info size={14} className="mt-0.5 shrink-0 text-accent" aria-hidden />{children}</p>;
}

function AssistantDemo() {
  const enabled = useAiStatus();
  if (enabled === null) return <div aria-busy="true" className="h-[420px] animate-pulse rounded-2xl border border-line bg-card" />;
  if (!enabled)
    return (
      <div>
        <Notice>Live AI is not enabled on this site yet, so this is a scripted demonstration of how a business assistant behaves.</Notice>
        <AiDemo />
      </div>
    );
  return (
    <div>
      <Notice><b>Demonstration.</b> This assistant answers as a fictional guesthouse called Karoo Stays, using made-up demonstration data. It cannot make real bookings, and nothing you type here is saved.</Notice>
      <div className="mx-auto flex h-[520px] max-w-xl flex-col overflow-hidden rounded-2xl border border-navy/15 shadow-[0_40px_70px_-40px_rgba(16,24,39,.5)]">
        <div className="theme-dark flex items-center gap-3 bg-navy px-4 py-3">
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full bg-cobalt font-display text-sm font-bold text-white">K</span>
          <div><p className="font-display text-sm font-semibold">Karoo Stays assistant</p><p className="font-mono text-[10px] uppercase tracking-wider text-muted">Demonstration business</p></div>
        </div>
        <ChatPanel mode="demo" storageKey="rd-demo-chat" greeting="Welcome to **Karoo Stays** (a demonstration guesthouse). I can answer questions about rooms, check-in and facilities. What would you like to know?" suggestions={["Do you allow pets?", "What time is check-in?", "How much is the Family Suite?"]} placeholder="Ask the demo guesthouse a question…" className="flex-1" />
      </div>
    </div>
  );
}

function QualifyDemo() {
  const [text, setText] = useState(SAMPLE);
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState<Qualification | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const reduce = useReducedMotion();

  async function run() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/ai/qualify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text, ...(budget ? { budget } : {}) }) });
      const data = (await res.json().catch(() => ({}))) as { error?: string; result?: Qualification };
      if (!res.ok || !data.result) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setResult(data.result);
    } catch {
      setError("We could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Notice><b>Demonstration.</b> Enter a sample enquiry to see how it is classified, prioritised and summarised. Nothing is saved and no email is sent. Please do not include personal details.</Notice>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-line bg-card p-5">
          <label htmlFor="sample" className="label mb-2 block">Sample enquiry</label>
          <textarea id="sample" rows={7} value={text} onChange={(e) => setText(e.target.value.slice(0, 1200))} className="field" />
          <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
            <select aria-label="Sample budget (optional)" value={budget} onChange={(e) => setBudget(e.target.value)} className="field">
              <option value="">Budget not stated</option>
              {BUDGETS.map((b) => (<option key={b} value={b}>{b}</option>))}
            </select>
            <button type="button" onClick={() => void run()} disabled={loading || text.trim().length < 15} className="btn btn-primary disabled:opacity-60">{loading ? <><Loader2 size={16} className="animate-spin" aria-hidden />Analysing…</> : "Qualify this enquiry"}</button>
          </div>
          {error && <p role="alert" className="mt-3 flex items-start gap-2 text-sm text-red-700"><TriangleAlert size={16} className="mt-0.5 shrink-0" aria-hidden />{error}</p>}
        </div>

        <div className="min-h-[260px] rounded-2xl border border-line bg-card p-5" aria-live="polite">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div key={result.summary} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-navy px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ivory">{CATEGORY[result.category] ?? result.category}</span>
                  <span className={cn("rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider", PRIORITY_STYLE[result.priority])}>Priority: {result.priority}</span>
                  <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-muted">{result.source === "ai" ? "Analysed by AI" : "Keyword rules · AI not enabled"}</span>
                </div>
                <dl className="mt-5 space-y-4 text-sm">
                  <div><dt className="label">Why this priority</dt><dd className="mt-1">{result.priorityReason}</dd></div>
                  <div><dt className="label">Business type</dt><dd className="mt-1">{result.businessType}</dd></div>
                  <div><dt className="label">Summary</dt><dd className="mt-1 leading-relaxed">{result.summary}</dd></div>
                  <div><dt className="label">Suggested follow-up message</dt><dd className="mt-1 rounded-lg bg-softblue/60 p-3 leading-relaxed">{result.followUp}</dd></div>
                </dl>
              </motion.div>
            ) : (
              <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid h-full min-h-[220px] place-items-center text-center text-sm text-muted">The classification, priority, summary and a suggested reply will appear here.</motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

const PIPELINE = [
  ["Enquiry received and validated", "Every field is checked on the server, with spam protection and rate limits."],
  ["Consent and secure storage", "With the visitor's consent, the enquiry is saved to a private store with no public access."],
  ["AI analysis", "The request is analysed with personal identifiers removed before it reaches the AI provider."],
  ["Classification and priority", "The enquiry is sorted into website, application, AI or automation, and given a priority."],
  ["Summary and follow-up draft", "A concise summary and a suggested reply are prepared for the team."],
  ["Business notified", "An email goes to the business owner, with retries for temporary failures and no duplicates."],
];

function WorkflowDemo() {
  return (
    <div>
      <Notice><b>Illustrative animation.</b> The workflow below is an example. The real pipeline behind this site&apos;s project forms is described underneath.</Notice>
      <AutomationFlow />
      <div className="mt-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h3 className="display-md">The real thing runs on this site.</h3>
          <p className="mt-4 text-muted">When a visitor submits a project enquiry with consent, this is the workflow that actually runs on our server.</p>
          <Link href="/smart-intake" className="btn btn-dark group mt-6">Try Smart Intake <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden /></Link>
        </div>
        <ol className="border-t border-line">
          {PIPELINE.map(([t, d], i) => (
            <li key={t} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[40px_1fr]"><span className="font-mono text-xs text-accent">0{i + 1}</span><div><p className="font-display font-semibold">{t}</p><p className="text-sm text-muted">{d}</p></div></li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** "Experience Intelligent Business Solutions": three demonstrations with clearly labelled demo data. */
export function DemoCentre() {
  const [tab, setTab] = useState<Tab>("assistant");
  return (
    <div>
      <div role="tablist" aria-label="Demonstrations" className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-line bg-card p-1">
        {TABS.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className={cn("relative shrink-0 rounded-lg px-4 py-2.5 text-sm transition-colors", tab === t.id ? "text-white" : "text-muted hover:text-heading")}>
            {tab === t.id && <motion.span layoutId="demo-tab" className="absolute inset-0 rounded-lg bg-navy" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>
      <div role="tabpanel">
        {tab === "assistant" && <AssistantDemo />}
        {tab === "qualify" && <QualifyDemo />}
        {tab === "workflow" && <WorkflowDemo />}
      </div>
    </div>
  );
}
