"use client";

import Link from "next/link";
import { CheckCircle2, Loader2, TriangleAlert } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { DIVISIONS } from "@/lib/products/categories";
import { PRODUCTS } from "@/lib/products/data";
import { waitlistSchema } from "@/lib/products/waitlist";
import { track } from "@/lib/analytics";

type Errors = Partial<Record<string, string>>;
type Status = "idle" | "sending" | "success" | "duplicate" | "error";

/** Register interest in a product. Nothing is promised: we only record your interest and contact you about that product. */
export function ProductWaitlistForm({ initialProduct = "", compact, headingId }: { initialProduct?: string; compact?: boolean; headingId?: string }) {
  const uid = useId();
  const started = useRef(Date.now());
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const parsed = waitlistSchema.safeParse({ ...raw, consent: raw.consent === "on", startedAt: started.current });
    if (!parsed.success) {
      const next: Errors = {};
      for (const i of parsed.error.issues) next[String(i.path[0])] ??= i.message;
      setErrors(next);
      form.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/products/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const data = (await res.json().catch(() => ({}))) as { error?: string; fieldErrors?: Errors; duplicate?: boolean };
      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        setMessage(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      track("Waitlist Joined", parsed.data.product);
      setStatus(data.duplicate ? "duplicate" : "success");
      form.reset();
    } catch {
      setMessage("We could not reach the server. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success" || status === "duplicate") {
    return (
      <div id="waitlist" role="status" className="scroll-mt-28 rounded-2xl border border-line bg-white p-7 text-center">
        <CheckCircle2 size={36} aria-hidden className="mx-auto text-cobalt" />
        <h3 className="mt-3 font-display text-xl font-semibold">{status === "duplicate" ? "You're already on the list." : "Thank you. Your interest is registered."}</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-[#566075]">{status === "duplicate" ? "We already have your details for this product. We will be in touch when there is news." : "We will contact you about this product. Registering interest does not commit you to anything and does not promise a release date."}</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-line mt-5">Register for another product</button>
      </div>
    );
  }

  const f = (name: string) => ({ name, id: `${uid}-${name}`, "aria-invalid": errors[name] ? (true as const) : undefined, "aria-describedby": errors[name] ? `${uid}-${name}-err` : undefined, className: "field" });
  const err = (name: string) => errors[name] && <p id={`${uid}-${name}-err`} className="mt-1.5 text-xs font-medium text-red-700">{errors[name]}</p>;

  return (
    <form id="waitlist" onSubmit={onSubmit} noValidate aria-labelledby={headingId} aria-label={headingId ? undefined : "Register interest in a product"} aria-busy={status === "sending"} className="scroll-mt-28 grid min-w-0 gap-5 rounded-2xl border border-line bg-white p-5 sm:p-7">
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <div><label htmlFor={`${uid}-name`} className="mb-2 block text-sm font-medium">Full name</label><input autoComplete="name" {...f("name")} />{err("name")}</div>
        <div><label htmlFor={`${uid}-email`} className="mb-2 block text-sm font-medium">Work email</label><input type="email" autoComplete="email" {...f("email")} />{err("email")}</div>
        <div><label htmlFor={`${uid}-company`} className="mb-2 flex justify-between text-sm font-medium">Company name <span className="font-mono text-[10px] uppercase text-[#566075]">Optional</span></label><input autoComplete="organization" {...f("company")} />{err("company")}</div>
        <div><label htmlFor={`${uid}-country`} className="mb-2 flex justify-between text-sm font-medium">Country <span className="font-mono text-[10px] uppercase text-[#566075]">Optional</span></label><input autoComplete="country-name" {...f("country")} />{err("country")}</div>
      </div>
      <div>
        <label htmlFor={`${uid}-product`} className="mb-2 block text-sm font-medium">Product of interest</label>
        <select defaultValue={initialProduct} {...f("product")}>
          <option value="" disabled>Select a product</option>
          {DIVISIONS.map((d) => (
            <optgroup key={d.id} label={d.label}>
              {PRODUCTS.filter((p) => p.category === d.id).map((p) => (<option key={p.slug} value={p.slug}>{p.name}</option>))}
            </optgroup>
          ))}
        </select>
        {err("product")}
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm">
          <input type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-[#315BFA]" aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? `${uid}-consent-err` : undefined} />
          <span>I agree that Ragophala Digital may store these details and contact me about this product.</span>
        </label>
        <Link href="/privacy" target="_blank" className="ml-7 mt-1 inline-block text-sm font-medium text-[#2447D6] underline">Privacy information</Link>
        {errors.consent && <p id={`${uid}-consent-err`} className="mt-1.5 text-xs font-medium text-red-700">{errors.consent}</p>}
      </div>
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Leave this empty<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {status === "error" && (<div role="alert" className="flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-900"><TriangleAlert size={18} aria-hidden className="mt-0.5 shrink-0" />{message}</div>)}
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-70 sm:w-auto">{status === "sending" ? (<><Loader2 size={16} className="motion-safe:animate-spin" aria-hidden /> Registering…</>) : "Register interest"}</button>
        <p className="text-xs text-[#566075]">We only ask for what we need to contact you.</p>
      </div>
    </form>
  );
}
