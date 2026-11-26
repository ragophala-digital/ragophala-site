import { describe, expect, it } from "vitest";
import { ARTICLES, findArticle } from "@/lib/insights";
import { formatZAR, PACKAGES } from "@/lib/pricing";
import { REAL_PROJECTS } from "@/lib/real-projects";
import { PROJECTS } from "@/lib/site";

describe("content integrity", () => {
  it("has unique slugs for articles and projects", () => {
    const a = ARTICLES.map((x) => x.slug);
    const p = PROJECTS.map((x) => x.slug);
    expect(new Set(a).size).toBe(a.length);
    expect(new Set(p).size).toBe(p.length);
  });

  it("keeps real project slugs distinct from concept slugs", () => {
    const all = [...REAL_PROJECTS, ...PROJECTS].map((x) => x.slug);
    expect(new Set(all).size).toBe(all.length);
  });

  it("finds articles by slug and returns undefined otherwise", () => {
    expect(findArticle(ARTICLES[0].slug)?.title).toBe(ARTICLES[0].title);
    expect(findArticle("missing")).toBeUndefined();
  });

  it("never quotes rand prices inside articles (prices live in pricing.ts)", () => {
    const text = JSON.stringify(ARTICLES);
    expect(text).not.toMatch(/R\s?\d/);
  });

  it("formats rand with a comma separator", () => {
    const first = PACKAGES[0];
    expect(formatZAR(6500)).toMatch(/^R\s?6[,\s\u00a0]500$/);
    expect(first).toBeDefined();
  });
});

describe("framing check", () => {
  const origin = "https://ragophala-site.vercel.app";
  const h = (o: Record<string, string>) => ({ get: (k: string) => o[k.toLowerCase()] ?? null });

  it("refuses sites that send X-Frame-Options", async () => {
    const { framingAllowed } = await import("@/lib/embeddable");
    expect(framingAllowed(h({ "x-frame-options": "DENY" }), origin)).toBe(false);
  });

  it("allows sites with no framing rule", async () => {
    const { framingAllowed } = await import("@/lib/embeddable");
    expect(framingAllowed(h({}), origin)).toBe(true);
  });

  it("only allows a frame-ancestors rule that names our site", async () => {
    const { framingAllowed } = await import("@/lib/embeddable");
    expect(framingAllowed(h({ "content-security-policy": `frame-ancestors 'self' ${origin}` }), origin)).toBe(true);
    expect(framingAllowed(h({ "content-security-policy": "frame-ancestors 'self'" }), origin)).toBe(false);
    expect(framingAllowed(h({ "content-security-policy": "frame-ancestors 'none'" }), origin)).toBe(false);
  });
});
