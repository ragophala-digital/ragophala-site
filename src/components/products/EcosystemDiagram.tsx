import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { getProduct } from "@/lib/products/helpers";
import type { IntegrationState } from "@/lib/products/types";
import { cn } from "@/lib/utils";
import { ICONS } from "./icons";

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
  const Icon = ICONS[p.icon];
  return (
    <Link href={`/products/${p.slug}`} className={`flex h-full min-w-0 items-center gap-3 rounded-xl border p-3.5 transition-colors hover:border-cobalt-300 ${optional ? "border-dashed border-white/25" : "border-white/15 bg-white/[.06] min-[1100px]:flex-wrap min-[1100px]:content-start"}`}>
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-cobalt/20 text-cobalt-300"><Icon size={18} aria-hidden /></span>
      <span className={optional ? "min-w-0 flex-1" : "min-w-0 flex-1 min-[1100px]:basis-full"}>
        <span className="block font-display text-sm font-semibold text-ivory">{p.name}</span>
        <span className="mt-1 block text-xs leading-relaxed text-slate">{note}</span>
      </span>
      <ArrowUpRight size={14} aria-hidden className={optional ? "shrink-0 text-cobalt-300" : "shrink-0 text-cobalt-300 min-[1100px]:absolute min-[1100px]:right-3.5 min-[1100px]:top-4"} />
    </Link>
  );
}

export function EcosystemDiagram() {
  return (
    <section className="theme-dark relative overflow-hidden bg-navy text-fg">
      <div className="container-x section relative">
        <div className="max-w-3xl">
          <p className="label mb-5 flex items-center gap-3"><span aria-hidden className="h-px w-8 bg-current opacity-40" />Connected ecosystem</p>
          <h2 className="display-md">Independent software. Connected possibilities.</h2>
          <p className="body-lg mt-5">Every Ragophala Digital product is designed to solve a specific operational problem. Businesses can adopt the tools they need independently and connect compatible systems when their operations require it.</p>
        </div>

        <figure className="mt-8 lg:mt-12" aria-label="Illustrative example of products that could connect">
          <ol className="mx-auto grid max-w-2xl gap-2 min-[1100px]:max-w-none min-[1100px]:grid-cols-5 min-[1100px]:gap-7">
            {CHAIN.map((n, i) => (
              <li key={n.slug} className="relative min-w-0">
                <div className="min-[1100px]:h-full"><Node {...n} /></div>
                {i < CHAIN.length - 1 && (
                  <span aria-hidden className="mt-2 grid place-items-center text-cobalt-300 min-[1100px]:absolute min-[1100px]:-right-6 min-[1100px]:top-1/2 min-[1100px]:mt-0 min-[1100px]:-translate-y-1/2">
                    <ArrowDown size={20} className="min-[1100px]:hidden" />
                    <ArrowRight size={20} className="hidden min-[1100px]:block" />
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[.14em] text-slate">Optional connections</p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">{OPTIONAL.map((n) => (<li key={n.slug}><Node {...n} optional /></li>))}</ul>
          <figcaption className="mt-8 rounded-xl border border-white/10 bg-white/[.04] p-5">
            <p className="text-sm leading-relaxed text-slate"><strong className="text-ivory">Illustrative workflow.</strong> The arrows show possible connections between independent products. Each product is designed to work on its own.</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-3">
              {LEGEND.map((l) => (
                <li key={l.state} className="flex items-start gap-2.5 text-xs text-slate">
                  <span aria-hidden className={cn("mt-1 h-2 w-6 shrink-0 rounded-full", l.state === "available" ? "bg-cobalt-300" : l.state === "planned" ? "border-b-2 border-dashed border-cobalt-300" : "border-b-2 border-dotted border-slate")} />
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
