import type { ShowcaseSite } from "@/components/demos-web";

/**
 * Real, live projects. Unlike the concept projects in site.ts these are not illustrations, so keep
 * every statement here to what is visible on the live site. Do not add results, numbers or
 * testimonials unless the project owner has confirmed them.
 */
export interface RealProject {
  slug: string;
  title: string;
  category: "Websites";
  summary: string;
  description: string;
  /** What the live site includes, as seen on the site itself. */
  features: string[];
  services: string[];
  site: ShowcaseSite;
}

export const REAL_PROJECTS: readonly RealProject[] = [
  {
    slug: "stay-radiant",
    title: "Stay Radiant",
    category: "Websites",
    summary: "A beauty, self-care and lifestyle content website for young women.",
    description:
      "Stay Radiant is a live content brand site. It presents the brand, featured journal posts, creator and content services, brand collaborations and an email list sign-up, with layouts that adapt from desktop to tablet and phone.",
    features: [
      "Journal with featured posts",
      "Content and creator services section",
      "Brand collaborations strip",
      "Email list sign-up",
      "WhatsApp chat button",
      "Layouts for desktop, tablet and phone",
    ],
    services: ["Website development"],
    site: {
      name: "Stay Radiant",
      url: "https://www.stayradiant.co.za/",
      shots: {
        desktop: { src: "/projects/stayradiant/desktop.webp", width: 1440, height: 3400 },
        tablet: { src: "/projects/stayradiant/tablet.webp", width: 1230, height: 4500 },
        mobile: { src: "/projects/stayradiant/mobile.webp", width: 780, height: 7200 },
      },
    },
  },
];

export const realProject = (slug: string) => REAL_PROJECTS.find((p) => p.slug === slug);
