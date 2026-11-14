import type { MetadataRoute } from "next";
import { PROJECTS, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/web-development", "/web-applications", "/ai-automation", "/pricing", "/process", "/portfolio", "/contact", "/faq", "/smart-intake", "/privacy"];
  return [...pages, ...PROJECTS.map((p) => `/portfolio/${p.slug}`)].map((p) => ({ url: `${SITE.url}${p}`, lastModified: new Date(), changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
