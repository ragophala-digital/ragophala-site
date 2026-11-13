export { PACKAGES, formatZAR } from "./pricing";
export type { Package } from "./pricing";

export const SITE = {
  name: "Ragophala Digital",
  tagline: "Digital solutions. Built for business.",
  description:
    "Ragophala Digital designs and builds websites, web applications, AI agents and business automation for South African businesses.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  location: "South Africa",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export type ServiceKey = "web" | "apps" | "ai" | "automation";

export interface Service {
  key: ServiceKey;
  index: string;
  title: string;
  short: string;
  href: string;
  benefits: string[];
  included: string[];
  examples: string[];
}

export const SERVICES: Service[] = [
  {
    key: "web",
    index: "01",
    title: "Website Development",
    short: "Fast, search-friendly websites that present your business properly and turn visitors into enquiries.",
    href: "/web-development",
    benefits: ["Looks credible on every screen", "Built to be found on Google", "Clear paths to enquire"],
    included: ["Custom design and build", "Mobile-first layouts", "Contact and lead forms", "SEO foundations", "Analytics integration"],
    examples: ["Business and corporate sites", "Landing pages", "Online stores", "Booking websites"],
  },
  {
    key: "apps",
    index: "02",
    title: "Web Applications",
    short: "Custom systems, portals and dashboards that replace spreadsheets and manual admin.",
    href: "/web-applications",
    benefits: ["Shaped around your workflow", "One source of truth for your data", "Room to grow with the business"],
    included: ["Discovery and scoping", "Secure user accounts and roles", "Database design", "Dashboards and reporting", "Deployment and handover"],
    examples: ["CRM platforms", "Inventory management", "Client portals", "Booking platforms"],
  },
  {
    key: "ai",
    index: "03",
    title: "AI Agents",
    short: "Assistants that answer common questions, qualify enquiries and hand over to your team when it matters.",
    href: "/ai-automation",
    benefits: ["Respond to customers faster", "Capture leads around the clock", "Clear human hand-over"],
    included: ["Assistant design and training on your content", "Website or WhatsApp deployment", "Lead capture and routing", "Guardrails and escalation rules", "Testing and monitoring options"],
    examples: ["Website AI assistants", "FAQ chatbots", "WhatsApp assistants", "Appointment assistants"],
  },
  {
    key: "automation",
    index: "04",
    title: "Business Automation",
    short: "Connected workflows that move information between your tools without repeated manual work.",
    href: "/ai-automation#automation",
    benefits: ["Fewer repetitive tasks", "Fewer missed follow-ups", "Consistent processes"],
    included: ["Process mapping", "Workflow build and integration", "Notifications and reminders", "Document handling", "Documentation and support"],
    examples: ["Lead routing", "Quote and invoice workflows", "Reminders and follow-ups", "Document processing"],
  },
];

export interface Project {
  slug: string;
  title: string;
  category: "Websites" | "Web Applications" | "AI & Automation";
  summary: string;
  description: string;
  tech: string[];
  goals: string[];
  features: string[];
  hue: number;
}

export const PROJECT_CATEGORIES = ["All", "Websites", "Web Applications", "AI & Automation"] as const;

export const PROJECTS: Project[] = [
  {
    slug: "karoo-stays-booking",
    title: "Karoo Stays Booking Website",
    category: "Websites",
    summary: "A guesthouse website with room galleries and a booking enquiry flow.",
    description: "A demonstration concept for a small guesthouse. It shows how a hospitality business can present rooms, local attractions and availability enquiries on one fast, mobile-first website.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    goals: ["Make enquiring take under a minute", "Show rooms clearly on mobile", "Support local search visibility"],
    features: ["Room galleries", "Enquiry form with date selection", "Local area guide", "WhatsApp enquiry button"],
    hue: 222,
  },
  {
    slug: "cape-fresh-market-shop",
    title: "Cape Fresh Market Online Shop",
    category: "Websites",
    summary: "An e-commerce concept for a fresh produce delivery business.",
    description: "A demonstration online shop concept showing product catalogue, delivery area checks and a simple ordering flow suited to a local produce business.",
    tech: ["Next.js", "TypeScript", "Payment gateway integration"],
    goals: ["Simple ordering for repeat customers", "Delivery area clarity", "Fast product browsing on mobile"],
    features: ["Product catalogue and filters", "Delivery area checker", "Cart and checkout flow", "Order notification emails"],
    hue: 215,
  },
  {
    slug: "launchpad-landing-page",
    title: "Launchpad Startup Landing Page",
    category: "Websites",
    summary: "A single-page product launch site with animated sections.",
    description: "A demonstration landing page for a software product. It shows scroll-based storytelling, a clear offer and a lead capture form designed to convert visitors.",
    tech: ["React", "Framer Motion", "Tailwind CSS"],
    goals: ["One clear call to action", "Fast first load", "Measurable sign-ups"],
    features: ["Animated hero", "Feature walkthrough", "Lead capture form", "Analytics-ready events"],
    hue: 228,
  },
  {
    slug: "fleet-dashboard",
    title: "Fleet Operations Dashboard",
    category: "Web Applications",
    summary: "A dashboard concept for tracking vehicles, jobs and maintenance.",
    description: "A demonstration web application concept for a logistics business that wants vehicle status, job allocation and maintenance reminders in a single secure dashboard.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    goals: ["One view of daily operations", "Fewer missed service dates", "Role-based access for staff"],
    features: ["Vehicle status board", "Job allocation", "Maintenance reminders", "Exportable reports"],
    hue: 218,
  },
  {
    slug: "clinic-booking-portal",
    title: "Clinic Booking Portal",
    category: "Web Applications",
    summary: "A client portal concept for appointment booking and reminders.",
    description: "A demonstration portal concept where clients book appointments, receive reminders and update their details, while staff manage the daily schedule.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    goals: ["Reduce phone-based booking", "Fewer no-shows through reminders", "Protect personal information"],
    features: ["Online appointment booking", "Email and SMS reminders", "Staff calendar", "Client profile area"],
    hue: 212,
  },
  {
    slug: "stock-manager",
    title: "Stock and Inventory Manager",
    category: "Web Applications",
    summary: "An inventory system concept for a small retailer or workshop.",
    description: "A demonstration inventory system concept covering stock levels, suppliers and reorder alerts for a small business replacing spreadsheets.",
    tech: ["React", "Node.js", "PostgreSQL"],
    goals: ["Real-time stock visibility", "Automatic low-stock alerts", "Simple supplier orders"],
    features: ["Stock tracking", "Low-stock alerts", "Supplier records", "Sales and stock reports"],
    hue: 225,
  },
  {
    slug: "website-support-agent",
    title: "Website Support Agent",
    category: "AI & Automation",
    summary: "An AI chat assistant concept that answers common questions.",
    description: "A demonstration AI assistant concept that answers frequently asked questions from a business knowledge base and hands the conversation to a person when it cannot help.",
    tech: ["Next.js", "LLM API", "TypeScript"],
    goals: ["Answer common questions instantly", "Capture contact details", "Hand over to a human cleanly"],
    features: ["Knowledge-base answers", "Lead capture", "Human hand-over", "Conversation summaries by email"],
    hue: 220,
  },
  {
    slug: "whatsapp-lead-automation",
    title: "WhatsApp Lead Automation",
    category: "AI & Automation",
    summary: "A workflow concept that captures and routes new enquiries.",
    description: "A demonstration automation concept that collects enquiries from a website form or WhatsApp, tags them and notifies the right person so leads are not missed.",
    tech: ["WhatsApp Business API", "Node.js", "Webhooks"],
    goals: ["Respond to leads faster", "Stop enquiries getting lost", "Give owners a clear lead list"],
    features: ["Enquiry capture", "Automatic tagging", "Team notifications", "Follow-up reminders"],
    hue: 218,
  },
];

export interface ProcessStage {
  n: string;
  title: string;
  summary: string;
  expect: string[];
  need: string;
}

export const PROCESS: ProcessStage[] = [
  {
    n: "01",
    title: "Discovery",
    summary: "We learn about your business, customers and goals before proposing anything.",
    expect: ["A conversation about your goals, audience and current tools", "Questions about content, branding and must-have features", "A written quotation with scope, deliverables and price"],
    need: "A clear idea of what you want the project to achieve, plus any existing branding or content.",
  },
  {
    n: "02",
    title: "Planning",
    summary: "We turn the agreed scope into a structure, a feature list and a plan of delivery.",
    expect: ["Site map or system outline", "Feature list confirmed against the quotation", "Agreed milestones, feedback points and the 50% deposit"],
    need: "Approval of the plan and the deposit so development can begin.",
  },
  {
    n: "03",
    title: "Design",
    summary: "We design the look, layout and interactions, and share them for your feedback.",
    expect: ["Visual direction and key page or screen designs", "Mobile and desktop layouts", "Revision rounds as included in your package"],
    need: "Timely feedback and your content, logos and images where available.",
  },
  {
    n: "04",
    title: "Development",
    summary: "We build the approved design into a fast, secure and maintainable product.",
    expect: ["Regular progress updates", "A working preview you can review", "Integrations such as forms, analytics or WhatsApp where scoped"],
    need: "Availability to answer questions and review progress.",
  },
  {
    n: "05",
    title: "Testing",
    summary: "We test across devices and browsers, and check performance, forms and accessibility.",
    expect: ["Testing on phone, tablet and desktop", "Form, link and integration checks", "Fixes from your final review"],
    need: "Your final review and sign-off.",
  },
  {
    n: "06",
    title: "Launch and support",
    summary: "We publish the project, hand over the agreed files and access, and stay available afterwards.",
    expect: ["Final 50% payment before handover and deployment", "Deployment and handover of agreed files and access details", "Post-launch support where included, with optional monthly maintenance"],
    need: "Hosting and domain details, if these are not part of your quotation.",
  },
];

export const WHY = [
  { title: "Built for South African business", text: "Pricing in rand, WhatsApp-friendly communication and solutions that work well on local mobile networks." },
  { title: "Clear quotations", text: "You see scope, deliverables and costs before work begins, with no hidden surprises." },
  { title: "Real products, not templates", text: "Every build is designed around your business and developed with modern, maintainable technology." },
  { title: "Performance and SEO built in", text: "Fast loading, clean structure and metadata are part of the build, not optional extras." },
  { title: "Direct communication", text: "You speak to the people building your project, in plain language." },
  { title: "Room to grow", text: "Start with a website and add applications, AI assistants and automation as your business grows." },
];

export const FAQS: { category: string; q: string; a: string }[] = [
  { category: "Pricing", q: "How much does a website cost?", a: "Website packages start at R2,800 for a Basic Website and go up to R14,000 for a Premium Business Website. Specialist websites, web applications and AI solutions have their own starting prices on the pricing page. A formal quotation confirms the final price and deliverables." },
  { category: "Pricing", q: "What costs extra?", a: "Domain registration and hosting (unless included in your quotation), third-party subscriptions, additional pages, complex functionality, content updates, API and AI usage costs, and anything outside the agreed scope are quoted separately." },
  { category: "Pricing", q: "Why are prices shown as starting prices?", a: "Every project is different. Starting prices reflect the base package, and the final price depends on requirements, functionality, complexity and agreed deliverables. We always confirm the price in writing before work begins." },
  { category: "Timelines", q: "How long does a project take?", a: "It depends on the package, the number of pages or features, and how quickly content and feedback are supplied. We confirm a realistic timeline in your quotation before work begins." },
  { category: "Timelines", q: "What do you need from me to start?", a: "A clear idea of your goals, your business details, any logo or brand colours, the content you want on the site, and examples of designs you like. We guide you on anything that is missing." },
  { category: "Payments", q: "How do deposits and payments work?", a: "We ask for a 50% deposit before development begins and the remaining 50% before final handover and deployment. Monthly services are billed separately. Exact terms are confirmed in your written quotation." },
  { category: "Domains and hosting", q: "Do you register domains?", a: "We can arrange domain registration for you. It is quoted separately unless explicitly included in your quotation." },
  { category: "Domains and hosting", q: "Is hosting included?", a: "Hosting is quoted separately unless explicitly included in your quotation. We can advise on suitable hosting for your project." },
  { category: "Revisions", q: "How many revisions are included?", a: "Each package includes a specified number of revision rounds, from 1 round in the Basic Website to up to 4 in the Premium Business Website. Revisions must relate to the originally agreed scope." },
  { category: "Revisions", q: "What if I want changes outside the original scope?", a: "New features, additional pages and major design changes are quoted separately. Changes outside the agreed scope may also affect the project timeline." },
  { category: "Maintenance", q: "Do you offer website maintenance?", a: "Yes. Monthly maintenance plans start at R350 and cover updates, security checks, backups and support depending on the plan. Maintenance is optional and not automatically included in once-off development." },
  { category: "Maintenance", q: "Is any support included after launch?", a: "Post-launch support is included only where the selected package says so, for example one month in the Professional Business Website and two months in the Premium Business Website. After that, ongoing support requires a separate agreement." },
  { category: "Ownership", q: "Who owns the website once it is finished?", a: "Project ownership and the agreed deliverables transfer to you after full payment. Third-party software, licensed assets and subscriptions remain subject to their own licence agreements." },
  { category: "Ownership", q: "What do I receive at handover?", a: "The agreed project files, access credentials and deployment information." },
  { category: "Web applications", q: "Can you build a custom application for my business?", a: "Yes. We build business management systems, CRMs, inventory systems, client portals and dashboards. Applications start from R8,000, and complex or enterprise systems require a detailed assessment and formal quotation." },
  { category: "AI agents", q: "What can an AI assistant do for my business?", a: "It can answer common questions, collect enquiry details, qualify leads and pass conversations to your team. It works from your approved information and hands over to a person when it cannot help." },
  { category: "AI agents", q: "Is customer data safe with an AI assistant?", a: "We design integrations to collect only the information needed and keep credentials on the server. We discuss privacy and POPIA considerations with you during scoping." },
  { category: "Third-party costs", q: "Are there costs from other providers?", a: "Yes, sometimes. API usage, AI model consumption, WhatsApp Business API charges, hosting and third-party subscriptions are excluded unless explicitly included in the quotation. We explain these costs up front." },
];

export const TECH = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Three.js", "WhatsApp Business API", "REST and Webhooks", "AI and LLM APIs"];

export const BUDGETS = ["Under R5,000", "R5,000 – R10,000", "R10,000 – R25,000", "R25,000 – R50,000", "R50,000+", "Not sure yet"];

export const SERVICE_OPTIONS: { value: string; label: string }[] = [
  { value: "web", label: "Website development" },
  { value: "apps", label: "Web application" },
  { value: "ai", label: "AI agent" },
  { value: "automation", label: "Business automation" },
  { value: "support", label: "Support and maintenance" },
  { value: "other", label: "Not sure yet" },
];
