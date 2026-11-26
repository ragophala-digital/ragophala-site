import type { Division, DivisionId, ProductStatus } from "./types";

export const DIVISIONS: readonly Division[] = [
  { id: "business-management", label: "Business Management", short: "Business", icon: "briefcase", intro: "Everyday operations: customers, bookings, invoicing, stock, orders and field work." },
  { id: "ai-automation", label: "AI & Automation", short: "AI", icon: "bot", intro: "Assistants, agents and automations that take routine work off a team's plate." },
  { id: "industry-solutions", label: "Industry Solutions", short: "Industry", icon: "factory", intro: "Software shaped around the workflows of specific industries and trades." },
  { id: "commerce", label: "Commerce & E-commerce", short: "Commerce", icon: "shopping-bag", intro: "Selling, delivering, returning and rewarding across online and physical channels." },
  { id: "education", label: "Education & Learning", short: "Education", icon: "graduation-cap", intro: "Delivering, administering and assessing learning for schools, tutors and companies." },
  { id: "it-infrastructure", label: "IT & Infrastructure", short: "IT", icon: "server-cog", intro: "Monitoring, security and delivery tooling for technical teams." },
  { id: "finance-analytics", label: "Finance & Analytics", short: "Finance", icon: "trending-up", intro: "Budgets, cash, reporting and compliance workflows for finance teams." },
] as const;

export const DIVISION_BY_ID: Readonly<Record<DivisionId, Division>> = Object.fromEntries(DIVISIONS.map((d) => [d.id, d])) as Record<DivisionId, Division>;

export const isDivisionId = (v: string | null | undefined): v is DivisionId => !!v && Object.hasOwn(DIVISION_BY_ID, v);

export const STATUSES: readonly ProductStatus[] = ["live", "beta", "in-development", "coming-soon", "planned"] as const;

export const isStatus = (v: string | null | undefined): v is ProductStatus => !!v && (STATUSES as readonly string[]).includes(v);

export interface StatusMeta {
  label: string;
  /** Plain-language meaning, shown to screen readers and in tooltips. */
  meaning: string;
  tone: "green" | "cobalt" | "amber" | "slate" | "muted";
}

export const STATUS_META: Readonly<Record<ProductStatus, StatusMeta>> = {
  live: { label: "Live", meaning: "Available to use now.", tone: "green" },
  beta: { label: "Beta", meaning: "Available in beta for early users.", tone: "cobalt" },
  "in-development": { label: "In development", meaning: "Currently being built. Not yet available.", tone: "amber" },
  "coming-soon": { label: "Coming soon", meaning: "Planned for release. Not yet available.", tone: "slate" },
  planned: { label: "Research / planned", meaning: "An opportunity we are exploring. Not yet in development.", tone: "muted" },
};
