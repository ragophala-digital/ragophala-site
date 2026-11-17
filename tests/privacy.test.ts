import { describe, expect, it } from "vitest";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import * as c from "@/lib/pricing";
import * as pub from "@/lib/catalogue-public";

const ROOT = process.cwd();
const walk = (dir: string, out: string[] = []): string[] => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
};
const rel = (p: string) => p.slice(ROOT.length + 1).replaceAll("\\", "/");

// Every rand amount in the private catalogue, e.g. "R2,800".
const AMOUNTS = [...new Set(readFileSync(join(ROOT, "src/lib/pricing.ts"), "utf8").match(/R\d[\d,]*/g) ?? [])];
const amountRe = (a: string) => new RegExp(`${a}(?![\d,])`);

describe("private pricing stays private", () => {
  it("found catalogue amounts to guard", () => {
    expect(AMOUNTS.length).toBeGreaterThan(10);
  });

  it("no site source file imports the internal catalogue", () => {
    const offenders = walk(join(ROOT, "src")).filter((f) => /\.(ts|tsx)$/.test(f) && rel(f) !== "src/lib/pricing.ts").filter((f) => /from ["']@\/lib\/pricing["']|from ["']\.\/pricing["']/.test(readFileSync(f, "utf8")));
    expect(offenders.map(rel)).toEqual([]);
  });

  it("no catalogue amount appears in site source (visitor budget bands excepted)", () => {
    const hits: string[] = [];
    for (const f of walk(join(ROOT, "src")).filter((p) => /\.(ts|tsx)$/.test(p) && rel(p) !== "src/lib/pricing.ts")) {
      const text = readFileSync(f, "utf8").split("\n").filter((l) => !l.includes("export const BUDGETS")).join("\n");
      for (const a of AMOUNTS) if (amountRe(a).test(text)) hits.push(`${rel(f)} contains ${a}`);
    }
    expect(hits).toEqual([]);
  });

  it("the public catalogue has no currency or price fields", () => {
    const text = JSON.stringify(pub);
    expect(text).not.toMatch(/\bR\s?\d|"price"|ZAR/);
  });

  it("public catalogue names and inclusions match the approved catalogue", () => {
    expect(pub.PACKAGES_PUBLIC.map((p) => [p.id, p.name, p.features])).toEqual(c.PACKAGES.map((p) => [p.id, p.name, p.features]));
    expect(pub.MAINTENANCE_PUBLIC.map((m) => m.name)).toEqual(c.MAINTENANCE.map((m) => m.name));
    expect(pub.AI_MONTHLY_PUBLIC.map((m) => m.name)).toEqual(c.AI_MONTHLY.map((m) => m.name));
    expect(pub.ADDONS_PUBLIC.map((m) => m.name)).toEqual(c.ADDONS.map((m) => m.name));
  });

  it("the private PDF is never placed in the public folder", () => {
    const pubDir = join(ROOT, "public");
    const files = existsSync(pubDir) ? walk(pubDir) : [];
    expect(files.filter((f) => /\.pdf$/i.test(f) || /pricing|catalogue/i.test(f)).map(rel)).toEqual([]);
  });

  it("the built site contains no catalogue amounts (when a build exists)", () => {
    const dir = join(ROOT, ".next");
    if (!existsSync(join(dir, "BUILD_ID"))) return;
    const files = [...walk(join(dir, "static")), ...walk(join(dir, "server")).filter((f) => /\.(html|js|rsc|json)$/.test(f))];
    const hits: string[] = [];
    for (const f of files) {
      const text = readFileSync(f, "utf8").replaceAll(/R5,000 – R10,000|R10,000 – R25,000|R25,000 – R50,000|Under R5,000|R50,000\+/g, "");
      for (const a of AMOUNTS) if (amountRe(a).test(text)) hits.push(`${rel(f)} contains ${a}`);
    }
    expect(hits.slice(0, 5)).toEqual([]);
  });
});
