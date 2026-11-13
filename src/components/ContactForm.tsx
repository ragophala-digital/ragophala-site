"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import { contactSchema } from "@/lib/contact";
import { BUDGETS, PACKAGES, SERVICE_OPTIONS } from "@/lib/site";
import { whatsappUrl } from "@/lib/utils";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const params = useSearchParams();
  const pkg = PACKAGES.find((p) => p.id === params.get("package"));
  const service = SERVICE_OPTIONS.some((s) => s.value === params.get("service")) ? (params.get("service") as string) : pkg ? "web" : "";
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
      <div className="glass p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto text-emerald-400" size={44} aria-hidden />
        <h2 className="mt-4 font-display text-2xl">Thank you, we have your enquiry.</h2>
        <p className="mt-2 text-slate-400">We will review the details and reply with next steps and a quotation, usually within one to two working days.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mt-6">Send another enquiry</button>
      </div>
    );
  }

  const field = (name: string) => ({
    name,
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `${name}-err` : undefined,
    className: "field",
  });
  const Err = ({ n }: { n: string }) => (errors[n] ? <p id={`${n}-err`} className="mt-1 text-xs text-red-300">{errors[n]}</p> : null);

  return (
    <form onSubmit={onSubmit} noValidate className="glass grid gap-4 p-6 sm:p-8" aria-label="Quotation and enquiry form">
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="name" className="mb-1.5 block text-sm">Full name *</label><input id="name" autoComplete="name" {...field("name")} /><Err n="name" /></div>
        <div><label htmlFor="business" className="mb-1.5 block text-sm">Business name</label><input id="business" autoComplete="organization" {...field("business")} /><Err n="business" /></div>
        <div><label htmlFor="email" className="mb-1.5 block text-sm">Email *</label><input id="email" type="email" autoComplete="email" {...field("email")} /><Err n="email" /></div>
        <div><label htmlFor="phone" className="mb-1.5 block text-sm">Phone number</label><input id="phone" type="tel" autoComplete="tel" placeholder="e.g. 082 000 0000" {...field("phone")} /><Err n="phone" /></div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm">Service required *</label>
          <select id="service" defaultValue={service} {...field("service")}>
            <option value="" disabled>Select a service</option>
            {SERVICE_OPTIONS.map((s) => (<option key={s.value} value={s.value}>{s.label}</option>))}
          </select>
          <Err n="service" />
        </div>
        <div>
          <label htmlFor="budget" className="mb-1.5 block text-sm">Project budget *</label>
          <select id="budget" defaultValue="" {...field("budget")}>
            <option value="" disabled>Select a range</option>
            {BUDGETS.map((b) => (<option key={b} value={b}>{b}</option>))}
          </select>
          <Err n="budget" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm">Project description *</label>
        <textarea id="message" rows={5} defaultValue={pkg ? `I am interested in the ${pkg.name} package.\n` : ""} {...field("message")} />
        <Err n="message" />
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Leave this field empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {status === "error" && (
        <div role="alert" className="flex items-start gap-3 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-sm text-red-200">
          <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden />
          <div>
            {serverMsg}
            {waLink && (<> You can also <a href={waLink} target="_blank" rel="noopener noreferrer" className="underline">send this enquiry on WhatsApp</a>.</>)}
          </div>
        </div>
      )}
      <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-70 sm:w-auto sm:justify-self-start">
        {status === "sending" ? (<><Loader2 size={16} className="animate-spin" aria-hidden /> Sending…</>) : "Send enquiry"}
      </button>
      <p className="text-xs text-slate-500">We use your details only to respond to your enquiry.</p>
    </form>
  );
}
