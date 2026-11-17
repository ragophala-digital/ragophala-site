import { describe, expect, it } from "vitest";
import { redact } from "@/lib/ai/redact";

describe("redact", () => {
  it("removes email addresses", () => {
    expect(redact("write to jo@example.co.za please")).toBe("write to [email removed] please");
  });

  it("removes South African phone numbers", () => {
    expect(redact("call 082 123 4567 today")).toContain("[phone removed]");
    expect(redact("call +27 82 123 4567 today")).toContain("[phone removed]");
  });

  it("removes 13-digit ID numbers", () => {
    expect(redact("id 8001015009087 ok")).toBe("id [id removed] ok");
  });

  it("leaves ordinary text and short numbers alone", () => {
    const text = "I need 3 pages for my bakery in Cape Town";
    expect(redact(text)).toBe(text);
  });
});
