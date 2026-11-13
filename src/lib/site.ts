export const SITE = {
  name: "Ragophala Digital",
  tagline: "Digital Solutions. Real Results.",
  description:
    "Ragophala Digital is a South African digital agency building business websites, web applications, AI agents and automation for growing companies.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  location: "South Africa",
};

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export type ServiceKey = "web" | "apps" | "ai" | "support";

export interface Service {
  key: ServiceKey;
  title: string;
  short: string;
  href: string;
  benefits: string[];
  tag: string;
}

export const SERVICES: Service[] = [
  {
    key: "web",
    title: "Website Development",
    short: "Fast, search-friendly websites that present your business properly and turn visitors into enquiries.",
    href: "/web-development",
    tag: "Websites",
    benefits: ["Mobile-first design", "Built for Google visibility", "Clear calls to action", "Easy to update"],
  },
  {
    key: "apps",
    title: "Web Applications",
    short: "Custom systems, portals and dashboards that replace spreadsheets and manual admin.",
    href: "/web-applications",
    tag: "Applications",
    benefits: ["Tailored to your workflow", "Secure user access", "Reports and dashboards", "Room to grow"],
  },
  {
    key: "ai",
    title: "AI Agents & Automation",
    short: "Chatbots, assistants and automated workflows that handle repetitive work and capture leads.",
    href: "/ai-automation",
    tag: "AI & Automation",
    benefits: ["Answers common questions", "Captures and routes leads", "Connects your tools", "Human hand-over built in"],
  },
  {
    key: "support",
    title: "Digital Support & Maintenance",
    short: "Hosting guidance, updates, fixes and improvements so your digital tools stay secure and current.",
    href: "/contact?service=support",
    tag: "Support",
    benefits: ["Security and software updates", "Content and design changes", "Performance checks", "Defined response times"],
  },
];

export interface Package {
  id: string;
  name: string;
  price: number;
  blurb: string;
  features: string[];
  timeline: string;
  popular?: boolean;
}

/** Starting prices in ZAR. Edit here to update the whole site. */
export const PACKAGES: Package[] = [
  {
    id: "basic-landing",
    name: "Basic Landing Page",
    price: 2000,
    blurb: "A single focused page to introduce your offer.",
    timeline: "About 3–5 working days",
    features: ["1 page, mobile responsive", "Enquiry form", "Basic on-page SEO", "Social and contact links", "1 round of revisions"],
  },
  {
    id: "professional-landing",
    name: "Professional Landing Page",
    price: 3000,
    blurb: "A longer, custom-designed page built to convert.",
    timeline: "About 5–7 working days",
    features: ["1 long-form page, custom design", "Scroll animations", "Enquiry form with email delivery", "Analytics setup", "2 rounds of revisions"],
  },
  {
    id: "starter-business",
    name: "Starter Business Website",
    price: 4500,
    blurb: "Everything a small business needs to get online.",
    timeline: "About 1–2 weeks",
    features: ["Up to 4 pages", "Mobile responsive design", "Contact form and map", "Basic on-page SEO", "2 rounds of revisions"],
  },
  {
    id: "standard-business",
    name: "Standard Business Website",
    price: 6500,
    blurb: "A fuller website for growing service businesses.",
    timeline: "About 2–3 weeks",
    popular: true,
    features: ["Up to 6 pages", "Custom design system", "Service pages with enquiry links", "SEO and sitemap setup", "Analytics setup", "2 rounds of revisions"],
  },
  {
    id: "professional-business",
    name: "Professional Business Website",
    price: 9500,
    blurb: "A polished site with content tools and integrations.",
    timeline: "About 3–4 weeks",
    features: ["Up to 10 pages", "Editable content sections", "Third-party integrations", "Advanced SEO structure", "Performance optimisation", "3 rounds of revisions"],
  },
  {
    id: "premium-business",
    name: "Premium Business Website",
    price: 14000,
    blurb: "A premium build with custom interaction and features.",
    timeline: "About 4–6 weeks",
    features: ["Up to 15 pages", "Custom animation and interaction", "Booking or catalogue features", "Advanced SEO and performance work", "Handover walkthrough", "3 rounds of revisions"],
  },
];

export const formatZAR = (n: number) => `R${n.toLocaleString("en-ZA").replace(/\s/g, ",")}`;

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
    description:
      "A demonstration concept for a small guesthouse. It shows how a hospitality business can present rooms, local attractions and availability enquiries on one fast, mobile-first website.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    goals: ["Make enquiring take under a minute", "Show rooms clearly on mobile", "Rank for local search terms"],
    features: ["Room galleries", "Enquiry form with date selection", "Local area guide", "WhatsApp enquiry button"],
    hue: 215,
  },
  {
    slug: "cape-fresh-market-shop",
    title: "Cape Fresh Market Online Shop",
    category: "Websites",
    summary: "An e-commerce concept for a fresh produce delivery business.",
    description:
      "A demonstration online shop concept showing product catalogue, delivery area checks and a simple ordering flow suited to a local produce business.",
    tech: ["Next.js", "TypeScript", "Payment gateway integration"],
    goals: ["Simple ordering for repeat customers", "Delivery area clarity", "Fast product browsing on mobile"],
    features: ["Product catalogue and filters", "Delivery area checker", "Cart and checkout flow", "Order notification emails"],
    hue: 200,
  },
  {
    slug: "launchpad-landing-page",
    title: "Launchpad Startup Landing Page",
    category: "Websites",
    summary: "A single-page product launch site with animated sections.",
    description:
      "A demonstration landing page for a software product. It shows scroll-based storytelling, a clear offer and a lead capture form designed to convert visitors.",
    tech: ["React", "Framer Motion", "Tailwind CSS"],
    goals: ["One clear call to action", "Fast first load", "Measurable sign-ups"],
    features: ["Animated hero", "Feature walkthrough", "Lead capture form", "Analytics-ready events"],
    hue: 225,
  },
  {
    slug: "fleet-dashboard",
    title: "Fleet Operations Dashboard",
    category: "Web Applications",
    summary: "A dashboard concept for tracking vehicles, jobs and maintenance.",
    description:
      "A demonstration web application concept for a logistics business that wants vehicle status, job allocation and maintenance reminders in a single secure dashboard.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    goals: ["One view of daily operations", "Fewer missed service dates", "Role-based access for staff"],
    features: ["Vehicle status board", "Job allocation", "Maintenance reminders", "Exportable reports"],
    hue: 210,
  },
  {
    slug: "clinic-booking-portal",
    title: "Clinic Booking Portal",
    category: "Web Applications",
    summary: "A client portal concept for appointment booking and reminders.",
    description:
      "A demonstration portal concept where clients book appointments, receive reminders and update their details, while staff manage the daily schedule.",
    tech: ["Next.js", "TypeScript", "PostgreSQL"],
    goals: ["Reduce phone-based booking", "Fewer no-shows through reminders", "Protect personal information"],
    features: ["Online appointment booking", "Email and SMS reminders", "Staff calendar", "Client profile area"],
    hue: 205,
  },
  {
    slug: "stock-manager",
    title: "Stock and Inventory Manager",
    category: "Web Applications",
    summary: "An inventory system concept for a small retailer or workshop.",
    description:
      "A demonstration inventory system concept covering stock levels, suppliers and reorder alerts for a small business replacing spreadsheets.",
    tech: ["React", "Node.js", "PostgreSQL"],
    goals: ["Real-time stock visibility", "Automatic low-stock alerts", "Simple supplier orders"],
    features: ["Stock tracking", "Low-stock alerts", "Supplier records", "Sales and stock reports"],
    hue: 220,
  },
  {
    slug: "website-support-agent",
    title: "Website Support Agent",
    category: "AI & Automation",
    summary: "An AI chat assistant concept that answers common questions.",
    description:
      "A demonstration AI assistant concept that answers frequently asked questions from a business knowledge base and hands the conversation to a person when it cannot help.",
    tech: ["Next.js", "LLM API", "TypeScript"],
    goals: ["Answer common questions instantly", "Capture contact details", "Hand over to a human cleanly"],
    features: ["Knowledge-base answers", "Lead capture", "Human hand-over", "Conversation summaries by email"],
    hue: 212,
  },
  {
    slug: "whatsapp-lead-automation",
    title: "WhatsApp Lead Automation",
    category: "AI & Automation",
    summary: "A workflow concept that captures and routes new enquiries.",
    description:
      "A demonstration automation concept that collects enquiries from a website form or WhatsApp, tags them and notifies the right person so leads are not missed.",
    tech: ["WhatsApp Business API", "Node.js", "Webhooks"],
    goals: ["Respond to leads faster", "Stop enquiries getting lost", "Give owners a clear lead list"],
    features: ["Enquiry capture", "Automatic tagging", "Team notifications", "Follow-up reminders"],
    hue: 218,
  },
];

export const PROCESS = [
  { title: "Discover", text: "We learn about your business, customers and goals, then agree on scope, timeline and a clear quotation." },
  { title: "Design", text: "We plan structure and design the look and feel, sharing designs for your feedback before development." },
  { title: "Build", text: "We develop the solution in stages, with regular progress updates and testing on real devices." },
  { title: "Launch", text: "We test, optimise and publish, then walk you through how everything works." },
  { title: "Support", text: "We stay available for updates, fixes and improvements as your business grows." },
];

export const WHY = [
  { title: "Built for South Africa", text: "Pricing in rand, WhatsApp-friendly communication and solutions that work on local mobile networks." },
  { title: "Clear quotations", text: "You see scope, deliverables and costs before work begins, with no hidden surprises." },
  { title: "Mobile-first", text: "Most South African visitors browse on phones, so every build is designed and tested for small screens first." },
  { title: "Performance and SEO built in", text: "Fast loading, clean structure and metadata are part of every project, not optional extras." },
  { title: "Direct communication", text: "You talk to the people building your project, in plain language, without technical jargon." },
  { title: "Technology that scales", text: "Modern frameworks let you start small and add features, integrations and AI as your needs grow." },
];

export const FAQS: { category: string; q: string; a: string }[] = [
  { category: "Websites", q: "How long does a website take to build?", a: "A landing page usually takes 3–7 working days and a business website 1–6 weeks, depending on the number of pages and how quickly content and feedback are supplied. We confirm a timeline in your quotation." },
  { category: "Websites", q: "Can you redesign my existing website?", a: "Yes. We review your current site, keep what works, improve structure, design, speed and search visibility, and migrate your content where needed." },
  { category: "Websites", q: "Will my website work on mobile phones?", a: "Yes. Every website is designed mobile-first and tested on phone, tablet and desktop screens." },
  { category: "Pricing", q: "How much does a website cost?", a: "Our website packages start at R2,000 for a basic landing page and go up to R14,000 for a premium business website. Custom applications and AI solutions are priced per project after we understand your requirements." },
  { category: "Pricing", q: "What costs extra?", a: "Hosting, domain registration, premium stock photography, paid plugins or third-party subscriptions, copywriting, content entry beyond the agreed pages, and features outside the agreed scope are quoted separately." },
  { category: "Payments", q: "How do deposits and payments work?", a: "We usually ask for a deposit before work starts, with the balance due on completion and before launch. Exact terms are confirmed in your written quotation." },
  { category: "Payments", q: "Which payment methods do you accept?", a: "Payment is normally by EFT. Other options can be agreed in your quotation." },
  { category: "Timelines", q: "What do you need from me to start?", a: "Your business details, logo and brand colours if you have them, the content you want on the site, and examples of sites you like. We can guide you on anything that is missing." },
  { category: "Hosting", q: "Do you handle hosting and domains?", a: "We can advise on and set up hosting and domain registration. These are separate ongoing costs paid to the provider, and the domain is registered in your name." },
  { category: "Maintenance", q: "Do you offer ongoing maintenance?", a: "Yes. Support and maintenance plans cover updates, backups, fixes and small content changes. Scope and response times are agreed in writing, and larger changes are quoted separately." },
  { category: "AI", q: "What can an AI chatbot do for my business?", a: "It can answer common questions, collect enquiry details and route conversations to your team. It is configured with your business information and limits, and hands over to a person when it cannot help." },
  { category: "AI", q: "Is AI automation safe for customer data?", a: "We design integrations to collect only the information needed, keep secrets server-side and comply with your privacy requirements. We will discuss POPIA considerations with you during scoping." },
  { category: "Applications", q: "Can you build a custom application for my business?", a: "Yes. We build custom portals, dashboards, management and inventory systems. We start with a discovery conversation, then provide a scoped quotation and delivery plan." },
];

export const TECH = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Three.js", "WhatsApp Business API", "REST & Webhooks", "AI / LLM APIs"];

export const BUDGETS = ["Under R5,000", "R5,000 – R10,000", "R10,000 – R25,000", "R25,000 – R50,000", "R50,000+", "Not sure yet"];

export const SERVICE_OPTIONS: { value: string; label: string }[] = [
  { value: "web", label: "Website development" },
  { value: "apps", label: "Web application" },
  { value: "ai", label: "AI agent or automation" },
  { value: "support", label: "Support and maintenance" },
  { value: "other", label: "Not sure yet" },
];
