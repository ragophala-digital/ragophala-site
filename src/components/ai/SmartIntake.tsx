"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Loader2, Sparkles, TriangleAlert } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import { contactSchema } from "@/lib/contact";
import { BUDGETS, SERVICE_OPTIONS } from "@/lib/site";
import { cn } from "@/lib/utils";

interface Brief {
  businessType: string;
  problem: string;
  requestedSolution: string;
  features: string[];
  users: string;
  integrations: string[];
  complexity: string;
  category: string;
  overview: string;
  requirements: string[];
  recommendedSolution: string;
  budgetCategory: string;
  indicativeItems: { name: string; billing: string }[];
  nextSteps: string[];
  source: "ai" | "rules";
}

type Result = { status: "needs_info"; questions: string[] } | { status: "ready"; brief: Brief };
type Step = "describe" | "questions" | "review" | "done";

const EXAMPLES = [
  "I own a plumbing business. I need a website where customers can book appointments.",
  "We run a small warehouse and want a system to track stock and send low-stock alerts to our team.",
  "I want an AI assistant on my salon website that answers questions and collects bookings.",
];

const STEPS: [Step, string][] = [["describe", "Describe"], ["questions", "Clarify"], ["review", "Review"], ["done", "Send"]];
const lines = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);

function Field({ id, label, error, optional, children }: { id: string; label: string; error?: string; optional?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-heading">{label}{optional && <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Optional</span>}</label>
      {children}
      {error && <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

const LOADING_LINES = ["Reading your idea…", "Identifying the business and requirements…", "Matching services from our catalogue…", "Preparing your project brief…"];

export function SmartIntake() {
  const [step, setStep] = useState<Step>("describe");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [brief, setBrief] = useState<Brief | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingLine, setLoadingLine] = useState(0);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [outcome, setOutcome] = useState<{ reference: string; notified: boolean } | null>(null);
  const [form, setForm] = useState({ overview: "", recommendedSolution: "", requirements: "", features: "", integrations: "", budget: "Not sure yet", name: "", email: "", phone: "", business: "", consent: false });
  const started = useRef(Date.now());
  const top = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!loading) return;
    const t = setInterval(() => setLoadingLine((l) => (l + 1) % LOADING_LINES.length), 1400);
    return () => clearInterval(t);
  }, [loading]);

  const goto = (s: Step) => {
    setStep(s);
    top.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  async function analyse(withAnswers: string[]) {
    setError("");
    setLoading(true);
    setLoadingLine(0);
    try {
      const res = await fetch("/api/ai/intake", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ description, answers: withAnswers }) });
      const data = (await res.json().catch(() => ({}))) as Result & { error?: string };
      if (!res.ok) {
        setError(data.error ?? "We could not analyse your idea right now. Please try again, or use the project form.");
        return;
      }
      if (data.status === "needs_info") {
        setQuestions(data.questions);
        setAnswers(data.questions.map(() => ""));
        goto("questions");
        return;
      }
      const b = data.brief;
      setBrief(b);
      setForm((f) => ({ ...f, overview: b.overview, recommendedSolution: b.recommendedSolution, requirements: b.requirements.join("\n"), features: b.features.join("\n"), integrations: b.integrations.join("\n"), budget: b.budgetCategory }));
      goto("review");
    } catch {
      setError("We could not reach the consultant. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!brief) return;
    const payload = {
      name: form.name,
      business: form.business,
      email: form.email,
      phone: form.phone,
      service: SERVICE_OPTIONS.some((s) => s.value === brief.category) ? brief.category : "other",
      budget: form.budget,
      message: description,
      extra: "",
      consent: form.consent as true,
      source: "smart-intake" as const,
      startedAt: started.current,
      brief: {
        businessType: brief.businessType,
        problem: brief.problem,
        requestedSolution: brief.requestedSolution,
        overview: form.overview,
        requirements: lines(form.requirements),
        recommendedSolution: form.recommendedSolution,
        features: lines(form.features),
        integrations: lines(form.integrations),
        budgetCategory: form.budget,
        indicativeItems: brief.indicativeItems.map(({ name }) => ({ name })),
        nextSteps: brief.nextSteps,
        source: brief.source,
      },
    };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const i of parsed.error.issues) next[String(i.path[0])] ??= i.message;
      setFieldErrors(next);
      return;
    }
    setFieldErrors({});
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const data = (await res.json().catch(() => ({}))) as { error?: string; reference?: string; notified?: boolean; fieldErrors?: Record<string, string> };
      if (!res.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setOutcome({ reference: data.reference ?? "", notified: Boolean(data.notified) });
      track("Smart Intake Sent", "smart-intake");
      goto("done");
    } catch {
      setError("We could not reach the server. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  const stepIndex = STEPS.findIndex(([s]) => s === step);
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div ref={top} className="scroll-mt-28">
      <ol className="mb-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[.14em]" aria-label="Progress">
        {STEPS.map(([s, l], i) => (
          <li key={s} aria-current={i === stepIndex ? "step" : undefined} className={cn("flex items-center gap-2", i === stepIndex ? "text-heading" : i < stepIndex ? "text-accent" : "text-muted")}>
            <span className={cn("grid h-5 w-5 place-items-center rounded-full border text-[10px]", i <= stepIndex ? "border-cobalt bg-cobalt text-white" : "border-line")}>{i + 1}</span>{l}
          </li>
        ))}
      </ol>

      {error && (
        <div role="alert" className="mb-5 flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden />
          <p>{error} <Link href="/contact" className="font-medium underline">Use the project form instead</Link></p>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
          {step === "describe" && (
            <div className="rounded-2xl border border-line bg-card p-6 sm:p-9">
              <h2 className="display-md">What would you like to build?</h2>
              <p className="mt-3 text-muted">Tell me about your business or idea in your own words. Avoid sharing personal details here; you can add contact details at the end.</p>
              <label htmlFor="idea" className="sr-only">Describe your business or idea</label>
              <textarea id="idea" value={description} onChange={(e) => setDescription(e.target.value.slice(0, 2500))} rows={6} placeholder="For example: I own a plumbing business and need a website where customers can book appointments." className="field mt-6" />
              <div className="mt-3 flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (<button key={ex} type="button" onClick={() => setDescription(ex)} className="rounded-lg border border-line px-3 py-1.5 text-left text-xs text-muted transition hover:border-cobalt hover:text-heading">{ex}</button>))}
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button type="button" disabled={loading || description.trim().length < 20} onClick={() => void analyse([])} className="btn btn-primary disabled:opacity-50">
                  {loading ? <><Loader2 size={16} className="animate-spin" aria-hidden />{LOADING_LINES[loadingLine]}</> : <><Sparkles size={16} aria-hidden />Analyse my idea</>}
                </button>
                <p className="text-xs text-muted">{description.trim().length < 20 ? `${20 - description.trim().length} more characters needed` : "Nothing is saved until you review and send your brief."}</p>
              </div>
            </div>
          )}

          {step === "questions" && (
            <div className="rounded-2xl border border-line bg-card p-6 sm:p-9">
              <h2 className="display-md">A few quick questions</h2>
              <p className="mt-3 text-muted">These help me recommend the right solution. Answer what you can.</p>
              <div className="mt-6 space-y-5">
                {questions.map((q, i) => (
                  <Field key={q} id={`q${i}`} label={q} optional>
                    <input id={`q${i}`} value={answers[i] ?? ""} onChange={(e) => setAnswers((a) => a.map((v, j) => (j === i ? e.target.value.slice(0, 500) : v)))} className="field" />
                  </Field>
                ))}
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <button type="button" disabled={loading} onClick={() => void analyse(answers.map((a) => a.trim()).filter(Boolean).length ? answers.map((a) => a.trim()).filter(Boolean) : ["No further details."])} className="btn btn-primary">
                  {loading ? <><Loader2 size={16} className="animate-spin" aria-hidden />{LOADING_LINES[loadingLine]}</> : "Create my project brief"}
                </button>
                <button type="button" onClick={() => goto("describe")} className="btn btn-line"><ArrowLeft size={16} aria-hidden />Edit my idea</button>
              </div>
            </div>
          )}

          {step === "review" && brief && (
            <form onSubmit={submit} noValidate className="space-y-6">
              <div className="rounded-2xl border border-line bg-card p-6 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="display-md">Your project brief</h2>
                  <span className="rounded-md bg-softblue px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-navy">{brief.source === "ai" ? "AI-assisted analysis" : "Automatic analysis · AI not enabled"}</span>
                </div>
                <p className="mt-3 text-muted">Review and edit anything that is not quite right. This brief helps us understand your project; it is not a final quotation.</p>
                <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                  <div><dt className="label">Business type</dt><dd className="mt-1">{brief.businessType}</dd></div>
                  <div><dt className="label">Requested solution</dt><dd className="mt-1">{brief.requestedSolution}</dd></div>
                  <div><dt className="label">Intended users</dt><dd className="mt-1">{brief.users}</dd></div>
                  <div><dt className="label">Complexity</dt><dd className="mt-1 capitalize">{brief.complexity}</dd></div>
                </dl>
                <div className="mt-6 space-y-5">
                  <Field id="overview" label="Project overview"><textarea id="overview" rows={3} value={form.overview} onChange={(e) => set("overview", e.target.value.slice(0, 800))} className="field" /></Field>
                  <Field id="recommended" label="Recommended solution"><textarea id="recommended" rows={3} value={form.recommendedSolution} onChange={(e) => set("recommendedSolution", e.target.value.slice(0, 600))} className="field" /></Field>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="requirements" label="Business requirements (one per line)"><textarea id="requirements" rows={5} value={form.requirements} onChange={(e) => set("requirements", e.target.value)} className="field" /></Field>
                    <Field id="features" label="Suggested features (one per line)" optional><textarea id="features" rows={5} value={form.features} onChange={(e) => set("features", e.target.value)} className="field" /></Field>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field id="integrations" label="Potential integrations (one per line)" optional><textarea id="integrations" rows={3} value={form.integrations} onChange={(e) => set("integrations", e.target.value)} className="field" /></Field>
                    <Field id="budget" label="Estimated budget range">
                      <select id="budget" value={form.budget} onChange={(e) => set("budget", e.target.value)} className="field">{BUDGETS.map((b) => (<option key={b} value={b}>{b}</option>))}</select>
                    </Field>
                  </div>
                </div>
                {brief.indicativeItems.length > 0 && (
                  <div className="mt-6 rounded-xl border border-line p-5">
                    <h3 className="label mb-3">Services that look relevant</h3>
                    <ul className="space-y-1.5 text-[15px]">{brief.indicativeItems.map((i) => (<li key={i.name} className="flex flex-wrap justify-between gap-2"><span>{i.name}</span><span className="font-display font-semibold">{i.billing}</span></li>))}</ul>
                    <p className="mt-3 text-xs text-muted">Pricing is tailored to your project. Submit the brief for a personalised quotation.</p>
                  </div>
                )}
                <div className="mt-6"><h3 className="label mb-3">Suggested next steps</h3><ol className="space-y-1.5 text-sm text-muted">{brief.nextSteps.map((n, i) => (<li key={n}>{i + 1}. {n}</li>))}</ol></div>
              </div>

              <div className="rounded-2xl border border-line bg-card p-6 sm:p-9">
                <h2 className="display-md">Where should we send our reply?</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <Field id="name" label="Full name" error={fieldErrors.name}><input id="name" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} className="field" aria-invalid={fieldErrors.name ? true : undefined} /></Field>
                  <Field id="email" label="Email address" error={fieldErrors.email}><input id="email" type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="field" aria-invalid={fieldErrors.email ? true : undefined} /></Field>
                  <Field id="business" label="Business name" optional><input id="business" autoComplete="organization" value={form.business} onChange={(e) => set("business", e.target.value)} className="field" /></Field>
                  <Field id="phone" label="Phone number" optional error={fieldErrors.phone}><input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className="field" /></Field>
                </div>
                <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm">
                  <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-1 h-4 w-4 accent-[#315BFA]" aria-invalid={fieldErrors.consent ? true : undefined} />
                  <span>I agree that Ragophala Digital may save my details and this brief so they can reply to my enquiry. I have read the <Link href="/privacy" className="font-medium text-cobalt underline" target="_blank">privacy information</Link>.</span>
                </label>
                {fieldErrors.consent && <p className="mt-1.5 text-xs font-medium text-red-600">{fieldErrors.consent}</p>}
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button type="submit" disabled={loading} className="btn btn-primary disabled:opacity-70">{loading ? <><Loader2 size={16} className="animate-spin" aria-hidden />Sending…</> : "Send my project brief"}</button>
                  <button type="button" onClick={() => goto("describe")} className="btn btn-line"><ArrowLeft size={16} aria-hidden />Start again</button>
                </div>
              </div>
            </form>
          )}

          {step === "done" && outcome && (
            <div className="rounded-2xl border border-line bg-card p-8 text-center sm:p-12" role="status">
              <svg viewBox="0 0 52 52" className="mx-auto h-14 w-14" aria-hidden>
                <motion.circle cx="26" cy="26" r="23" fill="none" stroke="#315BFA" strokeWidth="2.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} />
                <motion.path d="M15 27l8 8 14-16" fill="none" stroke="#315BFA" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.4 }} />
              </svg>
              <h2 className="display-md mt-5">Thank you. Your brief has been received.</h2>
              <p className="mx-auto mt-3 max-w-md text-muted">{outcome.notified ? "Our team has been notified and will review your brief and reply with next steps and a written quotation, usually within one to two working days." : "Your brief has been saved for our team to review. We could not confirm an email notification, but your enquiry is recorded and we will reply, usually within one to two working days."}</p>
              {outcome.reference && <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted">Reference {outcome.reference}</p>}
              <div className="mt-8"><Link href="/" className="btn btn-line">Back to home</Link></div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
