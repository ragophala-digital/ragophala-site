"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { contactSchema } from "@/lib/contact";
import { BUDGETS, PACKAGES, SERVICE_OPTIONS } from "@/lib/site";
import { whatsappUrl } from "@/lib/utils";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "sending" | "success" | "error";

function Field({ id, label, error, optional, children }: { id: string; label: string; error?: string; optional?: boolean; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-heading">
        {label}
        {optional && <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Optional</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} className="mt-1.5 text-xs font-medium text-red-600">{error}</p>}
    </div>
  );
}

export function ContactForm() {
  const params = useSearchParams();
  const pkg = PACKAGES.find((p) => p.id === params.get("package"));
  const service = SERVICE_OPTIONS.some((s) => s.value === params.get("service")) ? (params.get("service") as string) : pkg ? "web" : "";
  const item = (params.get("item") ?? "").slice(0, 80).replace(/\s+/g, " ");
  const startedAt = useRef(Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [waLink, setWaLink] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const parsed = contactSchema.safeParse({ ...raw, startedAt: startedAt.current });
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] ??= issue.message;
      setErrors(next);
      setStatus("idle");
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    setServerMsg("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const data = (await res.json().catch(() => ({}))) as { error?: string; fieldErrors?: Errors };
      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setServerMsg(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        setWaLink(whatsappUrl(`Hi Ragophala Digital, I tried to send an enquiry on your website. ${parsed.data.message}`));
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setServerMsg("We could not reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-card p-8 text-center sm:p-12" role="status">
        <CheckCircle2 className="mx-auto text-cobalt" size={44} aria-hidden />
        <h2 className="display-md mt-5">Thank you. We have your enquiry.</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">We will review the details and reply with next steps and a written quotation, usually within one to two working days.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-line mt-8">Send another enquiry</button>
      </div>
    );
  }

  const field = (name: string) => ({
    name,
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `${name}-err` : undefined,
    className: "field",
  });

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-2xl border border-line bg-card p-6 sm:p-9" aria-label="Project enquiry form">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Full name" error={errors.name}><input id="name" autoComplete="name" {...field("name")} /></Field>
        <Field id="email" label="Email address" error={errors.email}><input id="email" type="email" autoComplete="email" {...field("email")} /></Field>
        <Field id="business" label="Business name" optional error={errors.business}><input id="business" autoComplete="organization" {...field("business")} /></Field>
        <Field id="phone" label="Phone number" optional error={errors.phone}><input id="phone" type="tel" autoComplete="tel" {...field("phone")} /></Field>
        <Field id="service" label="Service required" error={errors.service}>
          <select id="service" defaultValue={service} {...field("service")}>
            <option value="" disabled>Select a service</option>
            {SERVICE_OPTIONS.map((s) => (<option key={s.value} value={s.value}>{s.label}</option>))}
          </select>
        </Field>
        <Field id="budget" label="Estimated budget" error={errors.budget}>
          <select id="budget" defaultValue="" {...field("budget")}>
            <option value="" disabled>Select a range</option>
            {BUDGETS.map((b) => (<option key={b} value={b}>{b}</option>))}
          </select>
        </Field>
      </div>
      <Field id="message" label="Project description" error={errors.message}>
        <textarea id="message" rows={5} defaultValue={pkg ? `I am interested in the ${pkg.name} package.\n` : item ? `I would like a quotation for: ${item}.\n` : ""} {...field("message")} />
      </Field>
      <Field id="extra" label="Additional information" optional error={errors.extra}>
        <textarea id="extra" rows={3} placeholder="Deadlines, existing website, examples you like…" {...field("extra")} />
      </Field>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Leave this field empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {status === "error" && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
          <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden />
          <div>
            {serverMsg}
            {waLink && (<> You can also <a href={waLink} target="_blank" rel="noopener noreferrer" className="font-medium underline">send this enquiry on WhatsApp</a>.</>)}
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary disabled:opacity-70">
          {status === "sending" ? (<><Loader2 size={16} className="animate-spin" aria-hidden /> Sending…</>) : "Send enquiry"}
        </button>
        <p className="text-xs text-muted">We use your details only to respond to your enquiry.</p>
      </div>
    </form>
  );
}
