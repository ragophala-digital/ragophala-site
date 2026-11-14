import { z } from "zod";
import { BUDGETS, SERVICE_OPTIONS } from "./site";

const serviceValues = SERVICE_OPTIONS.map((s) => s.value) as [string, ...string[]];
const budgetValues = BUDGETS as unknown as [string, ...string[]];

const list = (max: number, len = 200) => z.array(z.string().max(len)).max(max).default([]);

/** Project brief produced by Smart Intake and confirmed by the visitor before submission. */
export const briefSchema = z.object({
  businessType: z.string().max(120).default(""),
  problem: z.string().max(500).default(""),
  requestedSolution: z.string().max(300).default(""),
  overview: z.string().max(800).default(""),
  requirements: list(10),
  recommendedSolution: z.string().max(600).default(""),
  features: list(10, 120),
  integrations: list(8, 120),
  budgetCategory: z.string().max(40).default(""),
  indicativeItems: z.array(z.object({ name: z.string().max(120), price: z.string().max(80) })).max(4).default([]),
  nextSteps: list(6),
  source: z.enum(["ai", "rules"]).default("rules"),
});
export type Brief = z.infer<typeof briefSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  business: z.string().trim().max(120).optional().default(""),
  email: z.string().trim().email("Please enter a valid email address.").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9 ()-]{7,20}$/, "Please enter a valid phone number.")
    .or(z.literal(""))
    .optional()
    .default(""),
  service: z.enum(serviceValues, { message: "Please choose a service." }),
  budget: z.enum(budgetValues, { message: "Please choose a budget range." }),
  message: z.string().trim().min(20, "Please describe your project in at least 20 characters.").max(3000),
  extra: z.string().trim().max(1500).optional().default(""),
  consent: z.literal(true, { message: "Please agree to the privacy information so we can save your enquiry." }),
  source: z.enum(["form", "smart-intake"]).optional().default("form"),
  brief: briefSchema.optional(),
  website: z.string().max(0).optional().default(""), // honeypot
  startedAt: z.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
