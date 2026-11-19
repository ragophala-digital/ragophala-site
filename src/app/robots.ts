import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/** Set NEXT_PUBLIC_NOINDEX=true on preview or shared deployments so search engines ignore them. */
export const isNoindex = () => process.env.NEXT_PUBLIC_NOINDEX === "true";

export default function robots(): MetadataRoute.Robots {
  if (isNoindex()) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${SITE.url}/sitemap.xml` };
}
