import { z } from "zod";
import { PRODUCTS } from "./data";

const slugs = new Set(PRODUCTS.map((p) => p.slug));

/** Removes control characters and angle brackets and collapses whitespace. Output is always rendered as text, never HTML. */
export const clean = (s: string): string => s.replace(/[\u0000-\u001f\u007f<>]/g, " ").replace(/\s+/g, " ").trim();

const text = (max: number) => z.string().transform(clean).pipe(z.string().max(max));

export const waitlistSchema = z.object({
  name: z.string().transform(clean).pipe(z.string().min(2, "Please enter your name.").max(80)),
  email: z.string().transform((s) => clean(s).toLowerCase()).pipe(z.string().email("Please enter a valid work email address.").max(120)),
  company: text(120).optional().default(""),
  product: z.string().refine((s) => slugs.has(s), { message: "Please choose a product from the list." }),
  country: text(60).optional().default(""),
  consent: z.literal(true, { message: "Please agree so we can contact you about this product." }),
  /** Honeypot: real visitors never fill this in. */
  website: z.string().max(0).optional().default(""),
  startedAt: z.number().optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;

export interface WaitlistEntry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  company: string;
  product: string;
  country: string;
  consentAt: string;
}

export type AddResult = { status: "created" } | { status: "duplicate" };

/** Anything that can persist waitlist entries. Swap the implementation for a database without touching the route. */
export interface WaitlistStore {
  add(input: WaitlistInput): Promise<AddResult>;
}
