export type ProductStatus = "live" | "beta" | "in-development" | "coming-soon" | "planned";

export type DivisionId = "business-management" | "ai-automation" | "industry-solutions" | "commerce" | "education" | "it-infrastructure" | "finance-analytics";

export type IconKey = "briefcase" | "bot" | "factory" | "shopping-bag" | "graduation-cap" | "server-cog" | "trending-up";

/** How far an integration between two products has actually progressed. Only "available" may be described as working. */
export type IntegrationState = "available" | "planned" | "conceptual";

export interface ProductIntegration {
  /** Slug of the other product. */
  with: string;
  state: IntegrationState;
  note?: string;
}

export interface ProductScreenshot {
  src: string;
  alt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: DivisionId;
  /** Display name of the division, for example "Business Management". */
  division: string;
  description: string;
  longDescription: string | null;
  keywords: readonly string[];
  features: readonly string[];
  status: ProductStatus;
  icon: IconKey;
  /** Path to a real logo asset, or null to use the generated monogram. */
  logo: string | null;
  screenshots: readonly ProductScreenshot[];
  /** The independent product's own site, only when it really exists. */
  websiteUrl: string | null;
  detailPageEnabled: boolean;
  /** Public pricing page owned by the product, only when it really exists. */
  pricingUrl: string | null;
  signupUrl: string | null;
  waitlistEnabled: boolean;
  featured: boolean;
  displayOrder: number;
  /** Only set when a genuine date is known. */
  createdAt: string | null;
  integrations: readonly ProductIntegration[];
  targetIndustries: readonly string[];
}

export interface Division {
  id: DivisionId;
  label: string;
  short: string;
  intro: string;
  icon: IconKey;
}

export type SortKey = "featured" | "alphabetical" | "recent";

export interface ProductFilters {
  query: string;
  category: DivisionId | "all";
  status: ProductStatus | "all";
  sort: SortKey;
}
