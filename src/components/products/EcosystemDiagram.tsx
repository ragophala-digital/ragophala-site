import { ArrowDown, ArrowRight } from "lucide-react";
import { getProduct } from "@/lib/products/helpers";
import type { IntegrationState } from "@/lib/products/types";
import { cn } from "@/lib/utils";

/** Illustrative chain. Every connection here is "conceptual" or "planned": none is described as working. */
const CHAIN = [
  { slug: "clientflow", note: "Customer records" },
  { slug: "bookflow", note: "Appointments" },
  { slug: "invoiceflow", note: "Invoices and payments" },
  { slug: "stockflow", note: "Inventory" },
  { slug: "orderflow", note: "Orders and fulfilment" },
] as const;

const OPTIONAL = [
  { slug: "retailflow", note: "Retail and point of sale" },
  { slug: "assistflow", note: "AI business assistant" },
  { slug: "whatsappflow", note: "Customer messaging" },
] as const;

const LEGEND: { state: IntegrationState; label: string; meaning: string }[] = [
  { state: "available", label: "Available", meaning: "Working today. None yet." },
  { state: "planned", label: "Planned", meaning: "On the roadmap." },
  { state: "conceptual", label: "Conceptual", meaning: "A possibility we are exploring." },
];

function Node({ slug, note, optional }: { slug: string; note: string; optional?: boolean }) {
  const p = getProduct(slug);
  if (!p) return null;
  return (
    <li className={cn("rounded-xl border p-4", optional ? "border-dashed border-white/25 bg-transparent" : "border-white/15 bg-white/[.06]")}>
      <p className="font-display text-base font-semibold text-ivory">{p.name}</p>
      <p className="mt-0.5 text-xs text-slate">{note}</p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[.12em] text-cobalt-300">Works on its own</p>
    </li>
  );
}

export function EcosystemDiagram() {
  return (
    <section className="theme-dark relative overflow-hidden bg-navy text-fg">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-30" />
      <div className="container-x section relative">
        <div className="max-w-3xl">
          <p className="label mb-5 flex items-center gap-3"><span aria-hidden className="h-px w-8 bg-current opacity-40" />Connected ecosystem</p>
          <h2 className="display-md">Independent software. Connected possibilities.</h2>
          <p className="body-lg mt-5">Every Ragophala Digital product is designed to solve a specific operational problem. Businesses can adopt the tools they need independently and connect compatible systems when their operations require it.</p>
        </div>

        <figure className="mt-12" aria-label="Illustrative example of products that could connect">
          <ol className="grid items-stretch gap-2 lg:grid-cols-[repeat(9,auto)] lg:gap-3">
            {CHAIN.map((n, i) => (
              <li key={n.slug} className="contents">
                <ul className="m-0 list-none p-0"><Node {...n} /></ul>
                {i < CHAIN.length - 1 && (
                  <span aria-hidden className="grid place-items-center text-cobalt-300 lg:px-1">
                    <ArrowDown size={20} className="lg:hidden" />
                    <ArrowRight size={20} className="hidden lg:block eco-pulse" />
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[.14em] text-slate">Optional connections</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">{OPTIONAL.map((n) => (<Node key={n.slug} {...n} optional />))}</ul>
          <figcaption className="mt-8 rounded-xl border border-white/10 bg-white/[.04] p-5">
            <p className="text-sm leading-relaxed text-slate"><strong className="text-ivory">This is an illustration.</strong> It shows how products could connect, not integrations that exist today. Each product works fully on its own, and nobody needs to buy one product to use another.</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-3">
              {LEGEND.map((l) => (
                <li key={l.state} className="flex items-start gap-2.5 text-xs text-slate">
                  <span aria-hidden className={cn("mt-1 h-2 w-6 shrink-0 rounded-full", l.state === "available" ? "bg-emerald-400" : l.state === "planned" ? "border-b-2 border-dashed border-cobalt-300" : "border-b-2 border-dotted border-slate")} />
                  <span><strong className="text-ivory">{l.label}.</strong> {l.meaning}</span>
                </li>
              ))}
            </ul>
          </figcaption>
        </figure>

        <ul className="mt-12 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-3">
          {[["Independent products", "Each solves one problem and can be adopted alone."], ["Optional integrations", "Connect compatible products only when your operations call for it."], ["Unified business visibility", "Where products connect, information can be shared instead of re-entered."]].map(([t, d]) => (
            <li key={t}><h3 className="font-display text-lg font-semibold tracking-tight">{t}</h3><p className="mt-2 text-sm leading-relaxed text-slate">{d}</p></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
