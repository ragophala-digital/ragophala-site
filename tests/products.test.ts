import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { DIVISIONS, DIVISION_BY_ID, STATUSES } from "@/lib/products/categories";
import { PRODUCTS, slugify } from "@/lib/products/data";
import { DEFAULT_FILTERS, filterProducts, filtersFromParams, filtersToQuery, hasActiveFilters } from "@/lib/products/filters";
import { countByDivision, featuredProducts, getProduct, isSafeUrl, monogram, productCta, relatedProducts } from "@/lib/products/helpers";
import { clean, waitlistSchema } from "@/lib/products/waitlist";
import { createFileWaitlistStore } from "@/lib/products/waitlist-store";
import type { Product } from "@/lib/products/types";

describe("product catalogue data", () => {
  it("has unique ids and slugs", () => {
    expect(new Set(PRODUCTS.map((p) => p.id)).size).toBe(PRODUCTS.length);
    expect(new Set(PRODUCTS.map((p) => p.slug)).size).toBe(PRODUCTS.length);
  });

  it("gives every product a valid division, status, description and slug", () => {
    for (const p of PRODUCTS) {
      expect(DIVISION_BY_ID[p.category], p.name).toBeDefined();
      expect(p.division).toBe(DIVISION_BY_ID[p.category].label);
      expect(STATUSES).toContain(p.status);
      expect(p.name.length).toBeGreaterThan(2);
      expect(p.description.length).toBeGreaterThan(20);
      expect(p.slug).toBe(slugify(p.name));
    }
  });

  it("has products in every division", () => {
    const counts = countByDivision();
    for (const d of DIVISIONS) expect(counts[d.id], d.label).toBeGreaterThan(0);
    expect(Object.values(counts).reduce((a, b) => a + b, 0)).toBe(PRODUCTS.length);
  });

  it("only uses https for any link supplied", () => {
    for (const p of PRODUCTS) for (const u of [p.websiteUrl, p.pricingUrl, p.signupUrl]) if (u) expect(isSafeUrl(u), `${p.name}: ${u}`).toBe(true);
  });

  it("never claims a product is live or invents dates unless configured", () => {
    for (const p of PRODUCTS) if (p.status === "live") expect(p.websiteUrl ?? p.detailPageEnabled).toBeTruthy();
    expect(PRODUCTS.every((p) => p.createdAt === null || /^\d{4}-\d{2}-\d{2}/.test(p.createdAt))).toBe(true);
  });

  it("marks every connection as planned or conceptual, never available, until one is verified", () => {
    const states = PRODUCTS.flatMap((p) => p.integrations.map((i) => i.state));
    expect(states.length).toBeGreaterThan(0);
    expect(states).not.toContain("available");
    for (const p of PRODUCTS) for (const i of p.integrations) expect(getProduct(i.with), `${p.name} -> ${i.with}`).toBeDefined();
  });

  it("selects featured products in the configured order", () => {
    expect(featuredProducts().map((p) => p.slug)).toEqual(["bookflow", "clientflow", "invoiceflow", "stockflow", "retailflow", "orderflow"]);
  });

  it("keeps InvoiceFlow independent of ClientFlow", () => {
    const inv = getProduct("invoiceflow");
    expect(inv?.integrations.some((i) => i.with === "clientflow")).toBe(true);
    expect(inv?.integrations.find((i) => i.with === "clientflow")?.note).toMatch(/must work fully without ClientFlow/);
  });
});

describe("product filtering", () => {
  it("returns everything with default filters", () => {
    expect(filterProducts(PRODUCTS, DEFAULT_FILTERS)).toHaveLength(PRODUCTS.length);
  });

  it("searches by name, description, division and keywords", () => {
    expect(filterProducts(PRODUCTS, { query: "bookflow" }).map((p) => p.slug)).toContain("bookflow");
    expect(filterProducts(PRODUCTS, { query: "tenants inspections" }).map((p) => p.slug)).toContain("propertyflow");
    expect(filterProducts(PRODUCTS, { query: "finance analytics" }).length).toBeGreaterThan(5);
    expect(filterProducts(PRODUCTS, { query: "CRM" }).map((p) => p.slug)).toContain("clientflow");
  });

  it("ignores case, accents and punctuation", () => {
    expect(filterProducts(PRODUCTS, { query: "  POINT-of-SALE?? " }).map((p) => p.slug)).toContain("retailflow");
    expect(filterProducts(PRODUCTS, { query: "POS" }).map((p) => p.slug)).toContain("retailflow");
  });

  it("filters by category and status and combines them", () => {
    const biz = filterProducts(PRODUCTS, { category: "business-management" });
    expect(biz.every((p) => p.category === "business-management")).toBe(true);
    const soon = filterProducts(PRODUCTS, { category: "business-management", status: "coming-soon" });
    expect(soon.every((p) => p.status === "coming-soon" && p.category === "business-management")).toBe(true);
    expect(filterProducts(PRODUCTS, { category: "education", query: "exam" }).map((p) => p.slug)).toEqual(["examflow"]);
  });

  it("returns an empty list for no match and clears back with default filters", () => {
    expect(filterProducts(PRODUCTS, { query: "zzzzqqq" })).toEqual([]);
    expect(filterProducts(PRODUCTS, { ...DEFAULT_FILTERS })).toHaveLength(PRODUCTS.length);
    expect(hasActiveFilters(DEFAULT_FILTERS)).toBe(false);
    expect(hasActiveFilters({ ...DEFAULT_FILTERS, query: "x" })).toBe(true);
  });

  it("sorts alphabetically and with featured first", () => {
    const alpha = filterProducts(PRODUCTS, { sort: "alphabetical" }).map((p) => p.name);
    expect(alpha).toEqual([...alpha].sort((a, b) => a.localeCompare(b, "en")));
    const feat = filterProducts(PRODUCTS, { sort: "featured" });
    expect(feat[0].featured).toBe(true);
  });

  it("round-trips filters through URL parameters and ignores unknown values", () => {
    const f = { query: "book", category: "ai-automation" as const, status: "planned" as const, sort: "alphabetical" as const };
    const qs = new URLSearchParams(filtersToQuery(f));
    expect(filtersFromParams((k) => qs.get(k))).toEqual(f);
    const bad = new URLSearchParams("category=nope&status=live-ish&sort=chaos&q=" + "x".repeat(200));
    const parsed = filtersFromParams((k) => bad.get(k));
    expect(parsed.category).toBe("all");
    expect(parsed.status).toBe("all");
    expect(parsed.sort).toBe("featured");
    expect(parsed.query.length).toBe(80);
    expect(filtersToQuery(DEFAULT_FILTERS)).toBe("");
  });
});

describe("product display rules", () => {
  const base = PRODUCTS[0];
  const make = (o: Partial<Product>): Product => ({ ...base, ...o });

  it("chooses the action from each product's real state", () => {
    expect(productCta(make({ status: "live", websiteUrl: "https://example.com" }))).toMatchObject({ label: "Visit product", external: true });
    expect(productCta(make({ status: "live", websiteUrl: null }))).toMatchObject({ label: "Explore product", external: false });
    expect(productCta(make({ status: "beta", signupUrl: null }))).toMatchObject({ label: "Explore beta" });
    expect(productCta(make({ status: "beta", signupUrl: "https://example.com/beta" }))).toMatchObject({ label: "Join beta", external: true });
    expect(productCta(make({ status: "in-development", waitlistEnabled: true })).label).toBe("Register interest");
    expect(productCta(make({ status: "coming-soon" })).label).toBe("Join waitlist");
    expect(productCta(make({ status: "planned" })).label).toBe("Register interest");
  });

  it("never links to an invented destination", () => {
    for (const p of PRODUCTS) {
      const c = productCta(p);
      expect(c.external ? isSafeUrl(c.href) : c.href.startsWith("/products/")).toBe(true);
    }
  });

  it("copes with missing screenshots, logos and urls", () => {
    for (const p of PRODUCTS) {
      expect(p.screenshots).toEqual([]);
      expect(p.logo).toBeNull();
      expect(monogram(p.name)).toMatch(/^[A-Z0-9]{2}$/);
    }
    expect(getProduct("not-a-product")).toBeUndefined();
  });

  it("finds related products without repeating the product", () => {
    const rel = relatedProducts(getProduct("invoiceflow") as Product);
    expect(rel.length).toBeGreaterThan(0);
    expect(rel.map((r) => r.slug)).not.toContain("invoiceflow");
  });

  it("rejects unsafe urls", () => {
    expect(isSafeUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeUrl("http://insecure.test")).toBe(false);
    expect(isSafeUrl("not a url")).toBe(false);
    expect(isSafeUrl(null)).toBe(false);
  });
});

describe("waitlist validation", () => {
  const ok = { name: "Thandi Nkosi", email: "Thandi@Example.com ", company: "", product: "bookflow", country: "", consent: true as const };

  it("accepts a valid registration and normalises it", () => {
    const r = waitlistSchema.safeParse(ok);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.email).toBe("thandi@example.com");
  });

  it("rejects bad email, missing name, unknown product and missing consent", () => {
    expect(waitlistSchema.safeParse({ ...ok, email: "nope" }).success).toBe(false);
    expect(waitlistSchema.safeParse({ ...ok, name: "" }).success).toBe(false);
    expect(waitlistSchema.safeParse({ ...ok, product: "invented-flow" }).success).toBe(false);
    expect(waitlistSchema.safeParse({ ...ok, consent: false }).success).toBe(false);
    expect(waitlistSchema.safeParse({ ...ok, website: "http://spam.test" }).success).toBe(false);
  });

  it("strips markup characters from text", () => {
    expect(clean("<b>Hi</b>\u0000  there")).toBe("b Hi /b there");
    const r = waitlistSchema.safeParse({ ...ok, company: "<script>alert(1)</script>" });
    expect(r.success && !/[<>]/.test(r.data.company)).toBe(true);
  });
});

describe("waitlist storage", () => {
  let dir: string;
  beforeEach(async () => {
    dir = await mkdtemp(join(tmpdir(), "rd-waitlist-"));
  });
  afterEach(async () => {
    await rm(dir, { recursive: true, force: true });
  });
  const input = (over: Partial<ReturnType<typeof base>> = {}) => ({ ...base(), ...over });
  const base = () => ({ name: "Thandi Nkosi", email: "thandi@example.com", company: "", product: "bookflow", country: "", consent: true as const, website: "", startedAt: undefined });

  it("stores a registration and detects duplicates for the same email and product", async () => {
    const store = createFileWaitlistStore(dir);
    expect(await store.add(input())).toEqual({ status: "created" });
    expect(await store.add(input())).toEqual({ status: "duplicate" });
    expect(await store.add(input({ product: "clientflow" }))).toEqual({ status: "created" });
    const saved = JSON.parse(await readFile(join(dir, "waitlist.json"), "utf8")) as unknown[];
    expect(saved).toHaveLength(2);
  });

  it("handles concurrent registrations without losing any", async () => {
    const store = createFileWaitlistStore(dir);
    await Promise.all(Array.from({ length: 8 }, (_, i) => store.add(input({ email: `user${i}@example.com` }))));
    const saved = JSON.parse(await readFile(join(dir, "waitlist.json"), "utf8")) as unknown[];
    expect(saved).toHaveLength(8);
  });

  it("surfaces a storage failure instead of reporting success", async () => {
    await writeFile(join(dir, "blocker"), "a file, not a folder");
    const store = createFileWaitlistStore(join(dir, "blocker", "sub"));
    await expect(store.add(input())).rejects.toBeDefined();
  });
});
