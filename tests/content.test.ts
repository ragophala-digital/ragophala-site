import { describe, expect, it } from "vitest";
import { ARTICLES, findArticle } from "@/lib/insights";
import { formatZAR, PACKAGES } from "@/lib/pricing";
import { PROJECTS } from "@/lib/site";

describe("content integrity", () => {
  it("has unique slugs for articles and projects", () => {
    const a = ARTICLES.map((x) => x.slug);
    const p = PROJECTS.map((x) => x.slug);
    expect(new Set(a).size).toBe(a.length);
    expect(new Set(p).size).toBe(p.length);
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
