import type { MetadataRoute } from "next";
import { ARTICLES } from "@/lib/insights";
import { PRODUCTS } from "@/lib/products/data";
import { PROJECTS, SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/services", "/web-development", "/web-applications", "/ai-agents", "/business-automation", "/website-maintenance", "/ai-support", "/quote", "/process", "/portfolio", "/contact", "/faq", "/smart-intake", "/privacy", "/terms", "/insights", "/lab", "/products"];
  return [...pages, ...PROJECTS.map((p) => `/portfolio/${p.slug}`), ...ARTICLES.map((a) => `/insights/${a.slug}`), ...PRODUCTS.map((p) => `/products/${p.slug}`)].map((p) => ({ url: `${SITE.url}${p}`, lastModified: new Date(), changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
