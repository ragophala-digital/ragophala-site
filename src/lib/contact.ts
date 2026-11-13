import { z } from "zod";
import { BUDGETS, SERVICE_OPTIONS } from "./site";

const serviceValues = SERVICE_OPTIONS.map((s) => s.value) as [string, ...string[]];
const budgetValues = BUDGETS as unknown as [string, ...string[]];

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
  website: z.string().max(0).optional().default(""), // honeypot
  startedAt: z.number().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
