import { describe, expect, it } from "vitest";
import { BUILD_TRAITS, DEFAULT_TRAITS, MAX_PAGES, TOOLCHAIN, traitsFor } from "@/lib/lab";
import { PACKAGES_PUBLIC as PACKAGES } from "@/lib/catalogue-public";

describe("lab traits", () => {
  it("covers every package in the rate card", () => {
    for (const p of PACKAGES) expect(BUILD_TRAITS[p.id], p.id).toBeDefined();
  });
  it("never exceeds the model's page slots", () => {
    for (const t of Object.values(BUILD_TRAITS)) expect(t.pages).toBeLessThanOrEqual(MAX_PAGES);
  });
  it("falls back for unknown ids", () => {
    expect(traitsFor("nope")).toEqual(DEFAULT_TRAITS);
  });
  it("lists only one tool as in use", () => {
    expect(TOOLCHAIN.filter((t) => t.status === "in-use").map((t) => t.name)).toEqual(["Three.js"]);
  });
});
