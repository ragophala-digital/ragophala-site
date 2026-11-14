import { ADDONS, AI_MONTHLY, AI_SOLUTIONS, MAINTENANCE, PACKAGES, SPECIALIST_SITES, TERMS, WEB_APPS, WEB_APP_SOLUTIONS, formatZAR, type PriceItem } from "@/lib/pricing";
import { BUDGETS, FAQS, PROCESS, SERVICES, SITE } from "@/lib/site";

export interface CatalogueItem {
  name: string;
  group: string;
  price: string;
  billing: "once-off" | "monthly" | "quoted";
}

const fromItems = (items: PriceItem[], group: string, billing: CatalogueItem["billing"]): CatalogueItem[] =>
  items.map((i) => ({ name: i.name, group, price: i.price, billing: /quote|quoted/i.test(i.price) ? "quoted" : billing }));

/** Single source of truth for everything the AI may say about services and prices. */
export const CATALOGUE: CatalogueItem[] = [
  ...PACKAGES.map((p): CatalogueItem => ({ name: p.name, group: "Website development", price: `${formatZAR(p.price)} starting price`, billing: "once-off" })),
  ...fromItems(SPECIALIST_SITES, "Specialist websites", "once-off"),
  ...fromItems(WEB_APPS, "Web applications", "once-off"),
  ...fromItems(AI_SOLUTIONS, "AI agents and integrations", "once-off"),
  ...MAINTENANCE.map((m): CatalogueItem => ({ name: m.name, group: "Website maintenance", price: `${m.price} per month`, billing: "monthly" })),
  ...fromItems(AI_MONTHLY, "AI and automation support", "monthly"),
  ...fromItems(ADDONS, "Additional services", "once-off"),
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
const strip = (price: string) => price.replace("From ", "");

/** Compact catalogue text. Free-tier AI limits are token-based, so this stays lean; FAQs are added only when relevant. */
export function buildKnowledge(query = "", faqCount = 0): string {
  const out: string[] = [];
  out.push(`# ${SITE.name} catalogue (2026, South African rand). All prices are starting prices; a formal quotation confirms the final price.`);

  out.push(`${NL}## Services`);
  for (const s of SERVICES) out.push(`- ${s.title}: ${s.short}`);

  out.push(`${NL}## Website packages (once-off)`);
  for (const p of PACKAGES) out.push(`- ${p.name} ${formatZAR(p.price)}: ${p.features.join("; ")}`);

  out.push(`${NL}## Specialist websites (once-off, from)`);
  out.push(SPECIALIST_SITES.map((s) => `${s.name} ${strip(s.price)}`).join(" | "));
  out.push("E-commerce integrations, payment gateways, inventory, shipping and advanced catalogues may cost extra.");

  out.push(`${NL}## Web applications (once-off, from)`);
  out.push(WEB_APPS.map((a) => `${a.name} ${strip(a.price)}`).join(" | "));
  out.push(`Examples: ${WEB_APP_SOLUTIONS.join("; ")}. Price depends on user roles, database, integrations, workflows and security. Enterprise and custom apps need an assessment and formal quotation.`);

  out.push(`${NL}## AI agents and integrations (once-off, from)`);
  out.push(AI_SOLUTIONS.map((a) => `${a.name} ${strip(a.price)}`).join(" | "));
  out.push("API usage, AI model consumption, WhatsApp Business API charges, hosting and third-party subscriptions are excluded unless stated in the quotation.");

  out.push(`${NL}## Monthly (optional, billed monthly)`);
  out.push(`Website maintenance: ${MAINTENANCE.map((m) => `${m.name} ${m.price}/month (${[m.extends?.replace(":", ""), ...m.includes].filter(Boolean).join(", ")})`).join(" | ")}`);
  out.push(`AI and automation support: ${AI_MONTHLY.map((a) => `${a.name} ${a.price}`).join(" | ")}`);

  out.push(`${NL}## Add-ons`);
  out.push(ADDONS.map((a) => `${a.name} ${a.price}`).join(" | "));

  out.push(`${NL}## Terms`);
  for (const t of TERMS) out.push(`- ${t.title}: ${t.points.join(" ")}`);

  out.push(`${NL}## Process: ${PROCESS.map((s) => `${s.n} ${s.title}`).join(" > ")}`);
  out.push(`Budget categories on the enquiry form: ${BUDGETS.join("; ")}`);

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
