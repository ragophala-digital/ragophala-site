import { DIVISIONS, STATUS_META } from "./categories";
import { FEATURED_ORDER, PRODUCTS } from "./data";
import type { DivisionId, Product } from "./types";

export const productHref = (slug: string) => `/products/${slug}`;

export const getProduct = (slug: string): Product | undefined => PRODUCTS.find((p) => p.slug === slug);

export const featuredProducts = (): Product[] => FEATURED_ORDER.flatMap((s) => getProduct(s) ?? []);

export const upcomingProducts = (): Product[] => PRODUCTS.filter((p) => p.status === "coming-soon" || p.status === "in-development");

export const countByDivision = (): Record<DivisionId, number> =>
  Object.fromEntries(DIVISIONS.map((d) => [d.id, PRODUCTS.filter((p) => p.category === d.id).length])) as Record<DivisionId, number>;

export function relatedProducts(p: Product, limit = 4): Product[] {
  const linked = p.integrations.flatMap((i) => getProduct(i.with) ?? []);
  const sameDivision = PRODUCTS.filter((o) => o.category === p.category && o.slug !== p.slug && !linked.some((l) => l.slug === o.slug));
  return [...linked, ...sameDivision].slice(0, limit);
}

export interface ProductCta {
  label: string;
  /** Internal path or external URL. */
  href: string;
  external: boolean;
}

/** One action per product, decided only by what is genuinely true for it. */
export function productCta(p: Product): ProductCta {
  const detail = productHref(p.slug);
  if (p.status === "live") {
    if (p.websiteUrl) return { label: "Visit product", href: p.websiteUrl, external: true };
    return { label: "Explore product", href: detail, external: false };
  }
  if (p.status === "beta") {
    if (p.signupUrl) return { label: "Join beta", href: p.signupUrl, external: true };
    return { label: "Explore beta", href: detail, external: false };
  }
  if (p.status === "in-development") return { label: p.waitlistEnabled ? "Register interest" : "View roadmap", href: `${detail}#waitlist`, external: false };
  if (p.status === "coming-soon") return { label: "Join waitlist", href: `${detail}#waitlist`, external: false };
  return { label: "Register interest", href: `${detail}#waitlist`, external: false };
}

export const statusLabel = (p: Product) => STATUS_META[p.status].label;

/** Two-letter monogram used instead of an invented logo. */
export const monogram = (name: string): string => {
  const words = name.replace(/([a-z])([A-Z])/g, "$1 $2").split(/\s+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : name.slice(0, 2)).toUpperCase();
};

/** True only for https URLs, so a bad data entry can never render an unsafe link. */
export const isSafeUrl = (u: string | null | undefined): u is string => {
  if (!u) return false;
  try {
    return new URL(u).protocol === "https:";
  } catch {
    return false;
  }
};
