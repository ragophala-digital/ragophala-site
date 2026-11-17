import Script from "next/script";
import { ANALYTICS, analyticsEnabled } from "@/lib/analytics";

export function Analytics() {
  if (!analyticsEnabled()) return null;
  return <Script defer data-domain={ANALYTICS.domain} src={ANALYTICS.src} strategy="afterInteractive" />;
}
