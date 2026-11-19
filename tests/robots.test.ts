import { afterEach, describe, expect, it } from "vitest";
import robots from "@/app/robots";

afterEach(() => {
  delete process.env.NEXT_PUBLIC_NOINDEX;
});

describe("robots", () => {
  it("allows crawling but never the API by default", () => {
    const r = robots();
    expect(JSON.stringify(r.rules)).toContain('"allow":"/"');
    expect(JSON.stringify(r.rules)).toContain("/api/");
    expect(r.sitemap).toMatch(/sitemap\.xml$/);
  });

  it("blocks all crawlers for shared preview deployments", () => {
    process.env.NEXT_PUBLIC_NOINDEX = "true";
    const r = robots();
    expect(JSON.stringify(r.rules)).toContain('"disallow":"/"');
    expect(r.sitemap).toBeUndefined();
  });
});
