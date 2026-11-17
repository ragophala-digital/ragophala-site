import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact";
import { BUDGETS, SERVICE_OPTIONS } from "@/lib/site";

const valid = {
  name: "Thandi Mokoena",
  email: "thandi@example.com",
  service: SERVICE_OPTIONS[0].value,
  budget: BUDGETS[0],
  message: "I need a website with online booking for my guesthouse.",
  consent: true as const,
};

describe("contactSchema", () => {
  it("accepts a valid enquiry and applies defaults", () => {
    const r = contactSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (r.success) expect(r.data.source).toBe("form");
  });

  it("requires explicit consent", () => {
    expect(contactSchema.safeParse({ ...valid, consent: false }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, consent: undefined }).success).toBe(false);
  });

  it("rejects a filled honeypot", () => {
    expect(contactSchema.safeParse({ ...valid, website: "http://spam.example" }).success).toBe(false);
  });

  it("rejects a bad email, short message and unknown service", () => {
    expect(contactSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, message: "too short" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...valid, service: "hacking" }).success).toBe(false);
  });
});
