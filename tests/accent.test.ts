import { describe, expect, it } from "vitest";
import { accentFor } from "@/lib/accent";

describe("accentFor", () => {
  it("maps sections to motifs", () => {
    expect(accentFor("/quote")).toBe("slabs");
    expect(accentFor("/portfolio/some-project")).toBe("plates");
    expect(accentFor("/contact")).toBe("orbit");
  });
  it("does not match on a shared prefix only", () => {
    expect(accentFor("/quotex")).toBe("crystal");
  });
  it("falls back to the default motif", () => {
    expect(accentFor("/terms")).toBe("crystal");
  });
});
