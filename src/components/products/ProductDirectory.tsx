"use client";

import { Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { DIVISIONS, STATUSES, STATUS_META } from "@/lib/products/categories";
import { DEFAULT_FILTERS, filterProducts, filtersToQuery, hasActiveFilters } from "@/lib/products/filters";
import type { Product, ProductFilters, SortKey } from "@/lib/products/types";
import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";

const PAGE = 12;

/** Searchable, filterable catalogue. Filters live in the URL so a filtered view can be shared. */
export function ProductDirectory({ products, filters }: { products: readonly Product[]; filters: ProductFilters }) {
  const router = useRouter();
  const pathname = usePathname();
  const [text, setText] = useState(filters.query);
  const [visible, setVisible] = useState(PAGE);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Keep the search box in step when the URL changes elsewhere (for example a division link).
  useEffect(() => setText(filters.query), [filters.query]);
  useEffect(() => setVisible(PAGE), [filters]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const apply = (next: ProductFilters) => {
    const qs = filtersToQuery(next);
    router.replace(qs ? `${pathname}?${qs}#directory` : `${pathname}#directory`, { scroll: false });
  };
  const patch = (p: Partial<ProductFilters>) => {
    clearTimeout(timer.current);
    apply({ ...filters, query: text, ...p });
  };
  const clearFilters = () => {
    clearTimeout(timer.current);
    setText("");
    apply(DEFAULT_FILTERS);
  };

  const onType = (v: string) => {
    setText(v);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => patch({ query: v }), 250);
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearTimeout(timer.current);
    patch({ query: text });
  };

  const results = useMemo(() => filterProducts(products, filters), [products, filters]);
  const shown = results.slice(0, visible);
  const active = hasActiveFilters(filters);
  const catLabel = DIVISIONS.find((d) => d.id === filters.category)?.label;

  return (
    <div>
      <form role="search" onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="product-search" className="sr-only">Search software</label>
        <div className="relative flex-1">
          <Search size={18} aria-hidden className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#566075]" />
          <input id="product-search" type="search" value={text} onChange={(e) => onType(e.target.value)} placeholder="Search software, products or solutions..." autoComplete="off" className="field !rounded-xl !py-3.5 !pl-11" />
        </div>
        <button type="submit" className="btn btn-primary sm:w-auto">Search</button>
      </form>

      <div className="mt-6">
        <p id="cat-label" className="label mb-3">Category</p>
        <div role="group" aria-labelledby="cat-label" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {[{ id: "all" as const, label: "All products" }, ...DIVISIONS].map((d) => {
            const on = filters.category === d.id;
            return (
              <button key={d.id} type="button" aria-pressed={on} onClick={() => patch({ category: d.id })} className={cn("shrink-0 rounded-full border px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2", on ? "border-navy bg-navy text-ivory" : "border-navy/20 bg-white text-navy hover:border-cobalt")}>{d.label}</button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:items-end">
        <div>
          <label htmlFor="product-status" className="label mb-2 block">Status</label>
          <select id="product-status" value={filters.status} onChange={(e) => patch({ status: e.target.value as ProductFilters["status"] })} className="field !rounded-xl">
            <option value="all">All statuses</option>
            {STATUSES.map((s) => (<option key={s} value={s}>{STATUS_META[s].label}</option>))}
          </select>
        </div>
        <div>
          <label htmlFor="product-sort" className="label mb-2 block">Sort by</label>
          <select id="product-sort" value={filters.sort} onChange={(e) => patch({ sort: e.target.value as SortKey })} className="field !rounded-xl">
            <option value="featured">Featured</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="recent">Recently added</option>
          </select>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
        <p className="break-words text-sm text-[#566075] [overflow-wrap:anywhere]" role="status" aria-live="polite">
          <span className="font-display text-lg font-semibold text-heading">{results.length}</span> {results.length === 1 ? "product" : "products"}
          {active && <> matching{filters.query.trim() ? <> “{filters.query.trim()}”</> : null}{catLabel ? <> in {catLabel}</> : null}{filters.status !== "all" ? <> · {STATUS_META[filters.status].label}</> : null}</>}
        </p>
        {active && (<button type="button" onClick={clearFilters} className="inline-flex items-center gap-1.5 rounded-lg border border-navy/20 px-3 py-1.5 text-sm hover:border-cobalt"><X size={14} aria-hidden /> Clear all filters</button>)}
      </div>

      {results.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-navy/25 bg-white/60 px-5 py-8 sm:p-10 text-center" role="status">
          <p className="font-display text-xl font-semibold">No products match your search.</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#566075]">Try a different word, or clear the filters to see the whole catalogue. If you need software we haven&apos;t listed, tell us about it.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={clearFilters} className="btn btn-primary">Clear all filters</button>
            <Link href="/contact" className="btn btn-line">Tell us what you need</Link>
          </div>
        </div>
      ) : (
        <>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 min-[1100px]:grid-cols-3">
            {shown.map((p) => (<li key={p.id}><ProductCard product={p} /></li>))}
          </ul>
          {results.length > shown.length && (
            <div className="mt-8 text-center">
              <button type="button" onClick={() => setVisible((v) => v + PAGE)} className="btn btn-line">Show more ({results.length - shown.length} remaining)</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
