import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal, SectionHead } from "@/components/ui";
import { featuredProducts, productCta, productHref } from "@/lib/products/helpers";
import type { Product } from "@/lib/products/types";
import { cn } from "@/lib/utils";
import { Monogram } from "./ProductCard";
import { ICONS } from "./icons";
import { ProductStatus } from "./ProductStatus";

/** Decorative product artwork for a feature without a screenshot. */
function Shot({ p }: { p: Product }) {
  const screenshot = p.screenshots[0];
  const Icon = ICONS[p.icon];
  if (screenshot) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={screenshot.src} alt={screenshot.alt} loading="lazy" className="h-full w-full rounded-xl border border-line object-cover" />;
  }

  return (
    <div aria-hidden className="relative isolate grid min-h-44 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/[.04]">
      <div className="grid-lines absolute inset-0 opacity-75" />
      <div className="absolute size-36 rounded-full border border-dashed border-cobalt-300/25" />
      <div className="absolute size-28 rounded-full border border-cobalt-300/20" />
      <div className="relative grid size-[4.5rem] -rotate-6 place-items-center rounded-2xl border border-cobalt-300/50 bg-navy text-cobalt-300 shadow-[5px_7px_0_rgba(49,91,250,0.4)]">
        <Icon size={33} strokeWidth={1.5} />
      </div>
    </div>
  );
}

function Benefits({ p }: { p: Product }) {
  return (
    <ul className="mt-4 grid gap-1.5 text-sm">
      {p.features.slice(0, 4).map((f) => (<li key={f} className="flex gap-2"><Check size={15} aria-hidden className="mt-0.5 shrink-0 text-accent" />{f}</li>))}
    </ul>
  );
}

function Action({ p, className }: { p: Product; className?: string }) {
  const c = productCta(p);
  const cls = cn("link-underline inline-flex w-fit items-center gap-1.5 text-sm font-semibold", className);
  return c.external ? <a href={c.href} target="_blank" rel="noopener noreferrer" className={cls}>{c.label}<ArrowUpRight size={15} aria-hidden /></a> : <Link href={c.href} className={cls}>{c.label}<ArrowUpRight size={15} aria-hidden /></Link>;
}

export function FeaturedProducts() {
  const list = featuredProducts();
  const [a, b, c, ...rest] = list;
  if (!a) return null;
  return (
    <section className="section">
      <div className="container-x">
        <SectionHead label="Featured" title="Built to solve everyday business challenges." text="Explore tools for managing daily operations, customer work and business processes." />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-12">
          <Reveal className="sm:col-span-2 xl:col-span-7">
            <article className="theme-dark grid h-full gap-6 rounded-2xl bg-navy p-5 text-fg md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] sm:p-8">
              <div>
                <div className="flex items-center gap-3"><Monogram product={a} size="lg" /><ProductStatus status={a.status} /></div>
                <h3 className="display-md mt-5 !text-3xl"><Link href={productHref(a.slug)}>{a.name}</Link></h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate">{a.description}</p>
                <Benefits p={a} />
                <Action p={a} className="mt-6 text-cobalt-300" />
              </div>
              <Shot p={a} />
            </article>
          </Reveal>
          <div className="grid gap-4 sm:col-span-2 sm:grid-cols-2 xl:col-span-5 xl:grid-cols-1">
            {[b, c].filter(Boolean).map((p, i) => (
              <Reveal key={p.id} delay={0.06 * (i + 1)}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 hover:border-cobalt/40 sm:p-6">
                  <div className="flex items-start justify-between gap-3"><Monogram product={p} /><ProductStatus status={p.status} /></div>
                  <h3 className="mt-4 font-display text-xl font-semibold tracking-tight"><Link href={productHref(p.slug)}>{p.name}</Link></h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#566075]">{p.description}</p>
                  <Action p={p} className="mt-4 text-heading" />
                </article>
              </Reveal>
            ))}
          </div>
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={0.05 * i} className="sm:last:odd:col-span-2 xl:col-span-4 xl:last:odd:col-span-4">
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
