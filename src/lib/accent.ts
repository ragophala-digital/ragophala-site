export type AccentVariant = "slabs" | "knot" | "orbit" | "plates" | "crystal";

const RULES: [string, AccentVariant][] = [
  ["/quote", "slabs"],
  ["/about", "knot"],
  ["/process", "knot"],
  ["/contact", "orbit"],
  ["/faq", "orbit"],
  ["/smart-intake", "orbit"],
  ["/portfolio", "plates"],
  ["/insights", "plates"],
  ["/web-development", "plates"],
  ["/web-applications", "plates"],
  ["/website-maintenance", "knot"],
  ["/ai-support", "orbit"],
  ["/ai-agents", "orbit"],
  ["/business-automation", "knot"],
];

/** Chooses the 3D accent shown in a page hero from the route, so each section has its own motif. */
export function accentFor(path: string): AccentVariant {
  return RULES.find(([prefix]) => path === prefix || path.startsWith(`${prefix}/`))?.[1] ?? "crystal";
}
