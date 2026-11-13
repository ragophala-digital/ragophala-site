/** Ragophala Digital 2026 rate card (ZAR). Edit here to update the Pricing page and every package link. */

export const formatZAR = (n: number) => `R${n.toLocaleString("en-ZA").replace(/\s/g, ",")}`;

export interface Package {
  id: string;
  name: string;
  price: number;
  blurb: string;
  features: string[];
  recommended?: boolean;
}

export const PACKAGES: Package[] = [
  {
    id: "basic-website",
    name: "Basic Website",
    price: 2800,
    blurb: "A simple, professional starting point for a new business.",
    features: ["1–3 pages (Home, About and Contact)", "Mobile-responsive design", "Basic contact form", "Basic website structure", "1 round of revisions", "Domain and hosting excluded"],
  },
  {
    id: "professional-landing",
    name: "Professional Landing Page",
    price: 3000,
    blurb: "One focused page designed to turn visitors into leads.",
    features: ["Single professionally designed page", "Custom visual layout", "Lead-capture form", "Mobile-responsive design", "Basic SEO setup", "2 rounds of revisions"],
  },
  {
    id: "starter-business",
    name: "Starter Business Website",
    price: 4500,
    blurb: "Everything a small business needs to get online properly.",
    features: ["Up to 5 pages", "Professional business-focused design", "Mobile-responsive layout", "Contact form", "Google Maps integration", "Basic SEO setup", "2 rounds of revisions"],
  },
  {
    id: "standard-business",
    name: "Standard Business Website",
    price: 6500,
    blurb: "A fuller custom website for growing service businesses.",
    recommended: true,
    features: ["Up to 8 pages", "Custom website design", "Mobile responsiveness", "WhatsApp and contact integration", "Basic SEO setup", "Google Analytics integration", "3 rounds of revisions"],
  },
  {
    id: "professional-business",
    name: "Professional Business Website",
    price: 9500,
    blurb: "A polished site with interaction, content tools and support.",
    features: ["Up to 12 pages", "Custom professional design", "Animations and interactive elements where appropriate", "Blog or CMS integration", "Advanced on-page SEO setup", "Analytics integration", "3 rounds of revisions", "1 month of post-launch support"],
  },
  {
    id: "premium-business",
    name: "Premium Business Website",
    price: 14000,
    blurb: "Our most complete website build, with CMS and extended support.",
    features: ["Custom-designed business website", "Standard content pages within the agreed project scope", "Content Management System (CMS)", "Advanced on-page SEO", "Analytics integration", "Performance optimisation", "Custom interactive features as scoped", "Up to 4 rounds of revisions", "2 months of post-launch support"],
  },
];

export interface PriceItem {
  name: string;
  price: string;
  note?: string;
}

export const SPECIALIST_SITES: PriceItem[] = [
  { name: "Portfolio Website", price: "From R3,000", note: "Personal brands and professional portfolios" },
  { name: "Corporate Website", price: "From R9,500", note: "Company and corporate websites" },
  { name: "Booking & Appointment Website", price: "From R7,500", note: "Appointment and reservation platforms" },
  { name: "Educational Website", price: "From R9,000", note: "Schools and educational platforms" },
  { name: "Membership Website", price: "From R12,000", note: "Membership and subscription portals" },
  { name: "E-commerce Website", price: "From R12,000", note: "Online stores and product catalogues" },
];

export const WEB_APPS: PriceItem[] = [
  { name: "Basic Web Application", price: "From R8,000" },
  { name: "Standard Web Application", price: "From R12,000" },
  { name: "Advanced Web Application", price: "From R20,000" },
  { name: "Enterprise Application", price: "From R35,000", note: "Requires a detailed project assessment" },
  { name: "Custom Application", price: "Individually quoted" },
];

export const WEB_APP_SOLUTIONS = [
  "Business management systems",
  "Customer Relationship Management (CRM)",
  "Inventory and stock management",
  "Employee management platforms",
  "Customer and client portals",
  "Booking and reservation systems",
  "Administrative dashboards",
  "Reporting and analytics platforms",
  "Custom business applications",
];

export const AI_SOLUTIONS: PriceItem[] = [
  { name: "Basic FAQ AI Assistant", price: "From R3,500" },
  { name: "Website AI Chatbot", price: "From R5,000" },
  { name: "AI Lead Capture Assistant", price: "From R4,500" },
  { name: "WhatsApp AI Assistant", price: "From R6,500" },
  { name: "AI Appointment Assistant", price: "From R7,500" },
  { name: "Business Workflow Automation", price: "From R5,000" },
  { name: "Custom AI Assistant", price: "From R8,500+" },
];

export const AI_AVAILABLE = [
  "Automated customer support",
  "AI-powered website assistants",
  "WhatsApp customer enquiry assistants",
  "Automated lead qualification",
  "Appointment scheduling assistants",
  "Business workflow automation",
  "Document processing and information retrieval",
  "Custom AI-powered business solutions",
];

export interface MaintenancePlan {
  name: string;
  price: string;
  includes: string[];
  extends?: string;
}

export const MAINTENANCE: MaintenancePlan[] = [
  { name: "Basic Maintenance", price: "R350", includes: ["Basic website updates", "Security checks", "Website availability monitoring"] },
  { name: "Standard Maintenance", price: "R650", extends: "Everything in Basic, plus:", includes: ["Regular backups", "Minor content updates", "Additional website support"] },
  { name: "Premium Maintenance", price: "R1,200", extends: "Everything in Standard, plus:", includes: ["Priority support", "Regular maintenance checks", "Performance monitoring", "Additional optimisation support"] },
];

export const AI_MONTHLY: PriceItem[] = [
  { name: "AI Assistant Monitoring", price: "R350 / month" },
  { name: "AI Chatbot Support", price: "R650 / month" },
  { name: "Business Automation Support", price: "R1,200 / month" },
  { name: "Advanced AI Management", price: "Custom quote" },
];

export const ADDONS: PriceItem[] = [
  { name: "Additional Website Page", price: "R350" },
  { name: "Website Redesign", price: "From R2,500" },
  { name: "Website Content Updates", price: "Quoted separately" },
  { name: "Contact Form Integration", price: "From R500" },
  { name: "WhatsApp Integration", price: "From R350" },
  { name: "Google Maps Integration", price: "From R350" },
  { name: "Basic SEO Setup", price: "From R750" },
  { name: "Analytics Integration", price: "From R500" },
  { name: "Website Migration", price: "From R1,000" },
  { name: "Additional Functionality", price: "Custom quote" },
];

export const TERMS: { title: string; points: string[] }[] = [
  {
    title: "Payment structure",
    points: ["50% deposit before development begins.", "50% final payment before final handover and deployment.", "Monthly services are billed separately.", "Work outside the agreed scope requires an additional quotation."],
  },
  {
    title: "Domain and hosting",
    points: ["Domain registration is quoted separately unless explicitly included.", "Hosting is quoted separately unless explicitly included.", "Third-party subscriptions and external service costs remain the client's responsibility unless agreed otherwise."],
  },
  {
    title: "Revisions and scope",
    points: ["Each package includes a specified number of revision rounds.", "Revisions must relate to the originally agreed project scope.", "New features, additional pages and major design changes are quoted separately.", "Work outside the agreed scope may affect timelines and costs."],
  },
  {
    title: "Ownership and handover",
    points: ["Project ownership and agreed deliverables transfer after full payment.", "Third-party software, licensed assets and subscriptions remain subject to their own licence agreements.", "Handover includes the agreed project files, access credentials and deployment information."],
  },
  {
    title: "Maintenance and support",
    points: ["Monthly maintenance is optional and not automatically included in once-off development.", "Free post-launch support applies only where included in the selected package.", "Support hours, update limits and response times are defined in the maintenance agreement."],
  },
  {
    title: "AI running costs",
    points: ["API usage, AI model consumption, WhatsApp Business API charges, hosting and third-party subscriptions are excluded unless explicitly included in the quotation.", "Pricing depends on integrations, model requirements, workflow complexity, data sources and deployment."],
  },
];

export const COMING_SOON = [
  { name: "BookFlow", text: "A booking and business management platform. Pricing will include subscription plans, onboarding and applicable usage fees." },
  { name: "JobFlow", text: "A field service and operations management platform. Pricing will include subscription plans, user-based access, onboarding and applicable usage fees." },
];
