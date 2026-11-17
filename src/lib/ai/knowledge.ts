import { ADDONS_PUBLIC, AI_MONTHLY_PUBLIC, AI_SOLUTIONS_PUBLIC, MAINTENANCE_PUBLIC, PACKAGES_PUBLIC, SPECIALIST_PUBLIC, TERMS, WEB_APPS_PUBLIC, WEB_APP_SOLUTIONS } from "@/lib/catalogue-public";
import { BUDGETS, FAQS, PROCESS, SERVICES, SITE } from "@/lib/site";

export interface CatalogueItem {
  name: string;
  group: string;
  billing: "once-off" | "monthly" | "quoted";
}

const names = (items: readonly { name: string }[], group: string, billing: CatalogueItem["billing"]): CatalogueItem[] => items.map((i) => ({ name: i.name, group, billing }));

/** Single source of truth for the services the AI may discuss. It holds NO prices: pricing is private. */
export const CATALOGUE: CatalogueItem[] = [
  ...names(PACKAGES_PUBLIC, "Website development", "once-off"),
  ...names(SPECIALIST_PUBLIC, "Specialist websites", "once-off"),
  ...names(WEB_APPS_PUBLIC, "Web applications", "once-off"),
  ...names(AI_SOLUTIONS_PUBLIC, "AI agents and integrations", "once-off"),
  ...names(MAINTENANCE_PUBLIC, "Website maintenance", "monthly"),
  ...names(AI_MONTHLY_PUBLIC, "AI and automation support", "monthly"),
  ...names(ADDONS_PUBLIC, "Additional services", "once-off"),
];

export const CATALOGUE_NAMES = CATALOGUE.map((c) => c.name);

export function findCatalogueItem(name: string): CatalogueItem | undefined {
  const n = name.trim().toLowerCase();
  return CATALOGUE.find((c) => c.name.toLowerCase() === n) ?? CATALOGUE.find((c) => n.length > 5 && (c.name.toLowerCase().includes(n) || n.includes(c.name.toLowerCase())));
}

const STOP = new Set(["what", "which", "that", "this", "with", "have", "does", "your", "about", "will", "much", "need", "want", "from", "they", "there", "would", "could", "should", "please", "like"]);
const words = (t: string) => t.toLowerCase().match(/[a-z]{4,}/g)?.filter((w) => !STOP.has(w)) ?? [];

/** FAQ entries most relevant to the visitor's latest message (keeps the prompt, and token use, small). */
function relevantFaqs(query: string, max: number) {
  const q = new Set(words(query));
  if (q.size === 0) return [];
  return FAQS.map((f) => ({ f, score: words(`${f.q} ${f.a} ${f.category}`).filter((w) => q.has(w)).length }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, max)
    .map((x) => x.f);
}

const NL = "\n";

/** Compact service knowledge. Free-tier AI limits are token-based, so this stays lean; FAQs are added only when relevant. */
export function buildKnowledge(query = "", faqCount = 0): string {
  const out: string[] = [];
  out.push(`# ${SITE.name} services. Pricing is private and tailored to each project: never state, estimate or hint at any price, rate or price range. Direct pricing questions to a personalised quotation.`);

  out.push(`${NL}## Services`);
  for (const s of SERVICES) out.push(`- ${s.title}: ${s.short} Capabilities: ${s.capabilities.join("; ")}.`);

  out.push(`${NL}## Website packages (once-off development)`);
  for (const p of PACKAGES_PUBLIC) out.push(`- ${p.name}: ${p.features.join("; ")}`);

  out.push(`${NL}## Specialist websites`);
  out.push(SPECIALIST_PUBLIC.map((s) => s.name).join(" | "));
  out.push("Payment gateways, inventory, shipping and advanced catalogues may involve extra costs.");

  out.push(`${NL}## Web applications`);
  out.push(WEB_APPS_PUBLIC.map((a) => a.name).join(" | "));
  out.push(`Examples: ${WEB_APP_SOLUTIONS.join("; ")}. Scope depends on user roles, database, integrations, workflows and security. Enterprise and custom apps need an assessment and formal quotation.`);

  out.push(`${NL}## AI agents and integrations (once-off)`);
  out.push(AI_SOLUTIONS_PUBLIC.map((a) => a.name).join(" | "));
  out.push("API usage, AI model consumption, WhatsApp Business API charges, hosting and third-party subscriptions are excluded unless stated in the quotation.");

  out.push(`${NL}## Monthly (optional)`);
  out.push(`Website maintenance: ${MAINTENANCE_PUBLIC.map((m) => `${m.name} (${[("extends" in m ? m.extends : "")?.toString().replace(":", ""), ...m.includes].filter(Boolean).join(", ")})`).join(" | ")}`);
  out.push(`AI and automation support: ${AI_MONTHLY_PUBLIC.map((a) => a.name).join(" | ")}`);

  out.push(`${NL}## Additional services`);
  out.push(ADDONS_PUBLIC.map((a) => a.name).join(" | "));

  out.push(`${NL}## Terms`);
  for (const t of TERMS) out.push(`- ${t.title}: ${t.points.join(" ")}`);

  out.push(`${NL}## Process: ${PROCESS.map((s) => `${s.n} ${s.title}`).join(" > ")}`);
  out.push(`Budget ranges visitors can pick on the enquiry form: ${BUDGETS.join("; ")}`);

  const faqs = faqCount > 0 ? relevantFaqs(query, faqCount) : [];
  if (faqs.length) {
    out.push(`${NL}## Relevant FAQs`);
    for (const f of faqs) out.push(`Q: ${f.q}${NL}A: ${f.a}`);
  }
  return out.join(NL);
}

export function contactRoutes(): string {
  const routes = ["the project enquiry form at /contact"];
  if (SITE.whatsapp) routes.push("WhatsApp (link on the site)");
  if (SITE.email) routes.push(`email (${SITE.email})`);
  return routes.join(", ");
}
