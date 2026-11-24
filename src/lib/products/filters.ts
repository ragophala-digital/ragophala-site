import { isDivisionId, isStatus } from "./categories";
import type { DivisionId, Product, ProductFilters, ProductStatus, SortKey } from "./types";

export const DEFAULT_FILTERS: ProductFilters = { query: "", category: "all", status: "all", sort: "featured" };

const normalise = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();

/** Everything a visitor might search for, in one lower-cased string per product. */
export function searchText(p: Product): string {
  return normalise([p.name, p.slug, p.description, p.longDescription ?? "", p.division, ...p.keywords, ...p.features, ...p.targetIndustries].join(" "));
}

export function matchesQuery(p: Product, query: string): boolean {
  const terms = normalise(query).split(" ").filter(Boolean);
  if (terms.length === 0) return true;
  const hay = searchText(p);
  return terms.every((t) => hay.includes(t));
}

const byName = (a: Product, b: Product) => a.name.localeCompare(b.name, "en");

export function sortProducts(list: readonly Product[], sort: SortKey): Product[] {
  const copy = [...list];
  if (sort === "alphabetical") return copy.sort(byName);
  if (sort === "recent") {
    // Genuine dates win; otherwise the order products were added to the catalogue (newest entries last in data).
    return copy.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? "") || b.displayOrder - a.displayOrder);
  }
  return copy.sort((a, b) => Number(b.featured) - Number(a.featured) || a.displayOrder - b.displayOrder);
}

export function filterProducts(products: readonly Product[], f: Partial<ProductFilters>): Product[] {
  const { query = "", category = "all", status = "all", sort = "featured" } = f;
  const matched = products.filter((p) => (category === "all" || p.category === category) && (status === "all" || p.status === status) && matchesQuery(p, query));
  return sortProducts(matched, sort);
}

export const hasActiveFilters = (f: ProductFilters): boolean => f.query.trim() !== "" || f.category !== "all" || f.status !== "all";

const SORTS: readonly SortKey[] = ["featured", "alphabetical", "recent"];

/** Reads shareable filters from URL search params, ignoring anything that is not a known value. */
export function filtersFromParams(get: (key: string) => string | null): ProductFilters {
  const category = get("category");
  const status = get("status");
  const sort = get("sort");
  return {
    query: (get("q") ?? "").slice(0, 80),
    category: isDivisionId(category) ? (category as DivisionId) : "all",
    status: isStatus(status) ? (status as ProductStatus) : "all",
    sort: SORTS.includes(sort as SortKey) ? (sort as SortKey) : "featured",
  };
}

/** Builds a minimal query string for the filters (defaults are omitted). */
export function filtersToQuery(f: ProductFilters): string {
  const p = new URLSearchParams();
  if (f.query.trim()) p.set("q", f.query.trim().slice(0, 80));
  if (f.category !== "all") p.set("category", f.category);
  if (f.status !== "all") p.set("status", f.status);
  if (f.sort !== "featured") p.set("sort", f.sort);
  return p.toString();
}
