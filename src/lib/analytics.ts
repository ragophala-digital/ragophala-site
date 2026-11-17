/** Cookieless analytics (Plausible). Disabled unless NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set. */

export const ANALYTICS = {
  domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "",
  src: process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js",
} as const;

export const analyticsEnabled = (): boolean => ANALYTICS.domain.length > 0;

export type ConversionEvent = "Enquiry Sent" | "Smart Intake Sent" | "WhatsApp Click";

type Plausible = (event: string, options?: { props?: Record<string, string> }) => void;

/** Records a conversion. Never sends form content or personal data, only the event name and a source label. */
export function track(event: ConversionEvent, source?: string): void {
  if (!analyticsEnabled() || typeof window === "undefined") return;
  const plausible = (window as unknown as { plausible?: Plausible }).plausible;
  plausible?.(event, source ? { props: { source } } : undefined);
}
