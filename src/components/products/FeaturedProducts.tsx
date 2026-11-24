import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal, SectionHead } from "@/components/ui";
import { featuredProducts, productCta, productHref } from "@/lib/products/helpers";
import type { Product } from "@/lib/products/types";
import { cn } from "@/lib/utils";
import { Monogram } from "./ProductCard";
import { ProductStatus } from "./ProductStatus";

/** Placeholder preview for products without a real screenshot. It is plainly illustrative and never labelled as a screenshot. */
function Illustration({ p, dark }: { p: Product; dark?: boolean }) {
  return (
    <div aria-hidden className={cn("relative h-full min-h-[180px] overflow-hidden rounded-xl p-4", dark ? "bg-white/5" : "bg-softblue")}>
      <div className={cn("rounded-lg p-3", dark ? "bg-navy" : "bg-white")}>
        <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-cobalt" /><span className={cn("h-1.5 w-16 rounded-full", dark ? "bg-white/30" : "bg-navy/20")} /></div>
        <div className="mt-3 space-y-2">{[78, 60, 70].map((w, i) => (<span key={i} className={cn("block h-1.5 rounded-full", dark ? "bg-white/15" : "bg-navy/10")} style={{ width: `${w}%` }} />))}</div>
        <div className="mt-3 grid grid-cols-3 gap-2">{p.features.slice(0, 3).map((f) => (<span key={f} className={cn("truncate rounded-md px-1.5 py-1 text-center text-[9px]", dark ? "bg-white/10 text-slate" : "bg-softblue text-navy")}>{f}</span>))}</div>
      </div>
      <p className={cn("absolute bottom-2 right-3 font-mono text-[9px] uppercase tracking-[.12em]", dark ? "text-slate" : "text-[#566075]")}>Illustration</p>
    </div>
  );
}

function Shot({ p, dark }: { p: Product; dark?: boolean }) {
  const s = p.screenshots[0];
  // Real screenshots are plain images from the product data. Without one, show the labelled illustration.
  // eslint-disable-next-line @next/next/no-img-element
  return s ? <img src={s.src} alt={s.alt} loading="lazy" className="h-full w-full rounded-xl border border-line object-cover" /> : <Illustration p={p} dark={dark} />;
}

function Benefits({ p }: { p: Product }) {
  return (
    <ul className="mt-4 grid gap-1.5 text-sm">
      {p.features.slice(0, 4).map((f) => (<li key={f} className="flex gap-2"><Check size={15} aria-hidden className="mt-0.5 shrink-0 text-cobalt" />{f}</li>))}
    </ul>
  );
}

function Action({ p, className }: { p: Product; className?: string }) {
  const c = productCta(p);
  const cls = cn("inline-flex items-center gap-1.5 text-sm font-semibold", className);
  return c.external ? <a href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>{c.label}<ArrowUpRight size={15} aria-hidden /></a> : <Link href={c.href} className={cls}>{c.label}<ArrowUpRight size={15} aria-hidden /></Link>;
}

export function FeaturedProducts() {
  const list = featuredProducts();
  const [a, b, c, ...rest] = list;
  if (!a) return null;
  return (
    <section className="section">
      <div className="container-x">
        <SectionHead label="Featured" title="Built to solve everyday business challenges." text="Statuses are shown exactly as they are. Nothing here is available until it says so." />
        <div className="grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <article className="theme-dark grid h-full gap-6 rounded-2xl bg-navy p-6 text-fg sm:grid-cols-2 sm:p-8">
              <div>
                <div className="flex items-center gap-3"><Monogram product={a} size="lg" /><ProductStatus status={a.status} /></div>
                <h3 className="display-md mt-5 !text-3xl"><Link href={productHref(a.slug)}>{a.name}</Link></h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{a.description}</p>
                <Benefits p={a} />
                <Action p={a} className="mt-6 text-cobalt-300" />
              </div>
              <Shot p={a} dark />
            </article>
          </Reveal>
          <div className="grid gap-5 lg:col-span-5">
            {[b, c].filter(Boolean).map((p, i) => (
              <Reveal key={p.id} delay={0.06 * (i + 1)}>
                <article className="h-full rounded-2xl border border-line bg-white p-6">
                  <div className="flex items-start justify-between gap-3"><Monogram product={p} /><ProductStatus status={p.status} /></div>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight"><Link href={productHref(p.slug)}>{p.name}</Link></h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#566075]">{p.description}</p>
                  <Action p={p} className="mt-4 text-heading" />
                </article>
              </Reveal>
            ))}
          </div>
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={0.05 * i} className="lg:col-span-4">
              <article className="flex h-full flex-col rounded-2xl bg-softblue p-6">
                <div className="flex items-start justify-between gap-3"><Monogram product={p} /><ProductStatus status={p.status} /></div>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight"><Link href={productHref(p.slug)}>{p.name}</Link></h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#3d475c]">{p.description}</p>
                <Action p={p} className="mt-4 text-heading" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
