import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { monogram, productCta, productHref } from "@/lib/products/helpers";
import type { Product } from "@/lib/products/types";
import { cn } from "@/lib/utils";
import { ICONS } from "./icons";
import { ProductStatus } from "./ProductStatus";

export function Monogram({ product, size = "md" }: { product: Product; size?: "md" | "lg" }) {
  const Icon = ICONS[product.icon];
  return (
    <span aria-hidden className={cn("relative grid shrink-0 place-items-center rounded-xl bg-navy font-display font-bold text-ivory", size === "lg" ? "h-16 w-16 text-xl" : "h-11 w-11 text-sm")}>
      {monogram(product.name)}
      <span className={cn("absolute -bottom-1 -right-1 grid place-items-center rounded-md bg-cobalt text-white", size === "lg" ? "h-6 w-6" : "h-[18px] w-[18px]")}><Icon size={size === "lg" ? 13 : 10} /></span>
    </span>
  );
}

/** Reusable product card. The action always comes from the product's own data. */
export function ProductCard({ product: p }: { product: Product }) {
  const cta = productCta(p);
  const highlights = p.features.slice(0, 3);
  const linkClass = "link-underline relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-heading focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt";
  return (
    <article className="card group relative flex h-full flex-col rounded-2xl border border-line bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-cobalt/40 hover:shadow-[0_24px_40px_-30px_rgba(16,24,39,.35)]">
      <div className="flex items-start justify-between gap-3">
        <Monogram product={p} />
        <ProductStatus status={p.status} />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-heading">
        <Link href={productHref(p.slug)} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt">{p.name}</Link>
      </h3>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[.12em] text-[#566075]">{p.division}{p.featured ? " · Featured" : ""}</p>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-[#566075]">{p.description}</p>
      {highlights.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={`${p.name} highlights`}>
          {highlights.map((f) => (<li key={f} className="rounded-md bg-softblue px-2 py-1 text-[11px] text-navy">{f}</li>))}
        </ul>
      )}
      <div className="mt-5 border-t border-line pt-4">
        {cta.external ? (
          <a href={cta.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{cta.label}<ArrowUpRight size={14} aria-hidden /></a>
        ) : (
          <Link href={cta.href} className={linkClass}>{cta.label}<ArrowUpRight size={14} aria-hidden /></Link>
        )}
      </div>
    </article>
  );
}
