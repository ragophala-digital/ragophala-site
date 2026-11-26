const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const productionUrl = "https://ragophala-site.vercel.app";

export const SITE = {
  name: "Ragophala Digital",
  tagline: "Digital solutions. Built for business.",
  description:
    "Ragophala Digital designs and builds websites, web applications, AI agents and business automation for South African businesses.",
  url: configuredSiteUrl && !/^https?:\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?=[:/]|$)/i.test(configuredSiteUrl) ? configuredSiteUrl : productionUrl,
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  location: "South Africa",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/portfolio", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export { SERVICES, type Service, type ServiceKey } from "./services";

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
  /** What happens in this stage. */
  expect: string[];
  /** What the client contributes. */
  need: string;
  /** What Ragophala Digital delivers. */
  delivers: string;
  /** The outcome of the stage. */
  outcome: string;
}

export const PROCESS: ProcessStage[] = [
  {
    n: "01",
    title: "Discovery & Consultation",
    summary: "We learn about your business, customers and goals before proposing anything.",
    expect: ["A conversation about your goals, audience and current tools", "Questions about content, branding and must-have features", "A review of any existing website or systems"],
    need: "A clear idea of what you want the project to achieve, plus any existing branding or content.",
    delivers: "A shared understanding of your needs and a written quotation with scope, deliverables and price.",
    outcome: "You know what we recommend and what it will involve.",
  },
  {
    n: "02",
    title: "Requirements & Planning",
    summary: "We turn the agreed scope into a structure, a feature list and a plan of delivery.",
    expect: ["Site map or system outline", "Feature list confirmed against the quotation", "Agreed milestones and feedback points"],
    need: "Approval of the plan and the 50% deposit so development can begin.",
    delivers: "A confirmed scope, structure and delivery plan.",
    outcome: "Everyone agrees what is being built, and work can begin.",
  },
  {
    n: "03",
    title: "UI/UX Design",
    summary: "We design the look, layout and interactions, and share them for your feedback.",
    expect: ["Visual direction and key page or screen designs", "Mobile and desktop layouts", "Revision rounds as included in your package"],
    need: "Timely feedback, plus your content, logos and images where available.",
    delivers: "Approved designs for the key pages or screens.",
    outcome: "A design you have reviewed and signed off.",
  },
  {
    n: "04",
    title: "Development",
    summary: "We build the approved design into a fast, secure and maintainable product.",
    expect: ["Regular progress updates", "A working preview you can review", "Integrations such as forms, analytics or WhatsApp where scoped"],
    need: "Availability to answer questions and review progress.",
    delivers: "A working build of the agreed scope.",
    outcome: "A functioning product ready to be tested.",
  },
  {
    n: "05",
    title: "Testing & Quality Assurance",
    summary: "We test across devices and browsers, and check performance, forms and accessibility.",
    expect: ["Testing on phone, tablet and desktop", "Form, link and integration checks", "Fixes from your final review"],
    need: "Your final review and sign-off.",
    delivers: "A tested build with review feedback addressed.",
    outcome: "A product that is ready to go live.",
  },
  {
    n: "06",
    title: "Deployment",
    summary: "We publish the project and hand over the agreed files and access.",
    expect: ["Final 50% payment before handover and deployment", "Deployment to your hosting", "Handover of agreed files and access details"],
    need: "Hosting and domain details, if these are not part of your quotation.",
    delivers: "A live product plus the agreed files, access credentials and deployment information.",
    outcome: "Your project is live and in your hands.",
  },
  {
    n: "07",
    title: "Support & Improvement",
    summary: "We stay available after launch, with support as agreed and optional monthly care.",
    expect: ["Post-launch support where included in your package", "Optional monthly maintenance or AI and automation support", "Quoted improvements as your needs grow"],
    need: "Tell us what is working and what you would like to improve.",
    delivers: "Support within the agreed limits and a route for future improvements.",
    outcome: "Your solution keeps working as your business grows.",
  },
];

export const WHY = [
  { title: "Built for South African business", text: "Clear quotations, WhatsApp-friendly communication and solutions that work well on local mobile networks." },
  { title: "Clear quotations", text: "You see scope, deliverables and costs before work begins, with no hidden surprises." },
  { title: "Real products, not templates", text: "Every build is designed around your business and developed with modern, maintainable technology." },
  { title: "Performance and SEO built in", text: "Fast loading, clean structure and metadata are part of the build, not optional extras." },
  { title: "Direct communication", text: "You speak to the people building your project, in plain language." },
  { title: "Room to grow", text: "Start with a website and add applications, AI assistants and automation as your business grows." },
];

export const FAQS: { category: string; q: string; a: string }[] = [
  { category: "Quotations", q: "How much does a website cost?", a: "Pricing is tailored to your project requirements. Tell us what you need and we will send a personalised written quotation that confirms scope, deliverables and price. You do not need to know our pricing before you enquire." },
  { category: "Services", q: "What services do you offer?", a: "Website development, custom web applications, AI agents and intelligent assistants, business automation, website maintenance and support, and AI and automation support. Each has its own page under Services." },
  { category: "Services", q: "Can you redesign my existing website?", a: "Yes. A redesign starts with an assessment of your current site, then improves design, layout, mobile experience, performance and content structure. Migration is included only where your quotation says so." },
  { category: "Services", q: "Can you integrate AI into my existing systems?", a: "Often, yes. It depends on the systems involved, whether they offer an API or supported integration, and the permissions and subscriptions required. We assess this during discovery and tell you plainly what is and is not possible." },
  { category: "Quotations", q: "What costs extra?", a: "Domain registration and hosting (unless included in your quotation), third-party subscriptions, additional pages, complex functionality, content updates, API and AI usage costs, and anything outside the agreed scope are quoted separately." },
  { category: "Quotations", q: "Why do you not publish your prices?", a: "Every project is different, and the right price depends on requirements, functionality, complexity and agreed deliverables. We share our service catalogue and a personalised quotation privately with serious enquiries, and always confirm the price in writing before work begins." },
  { category: "Timelines", q: "How long does a project take?", a: "It depends on the package, the number of pages or features, and how quickly content and feedback are supplied. We confirm a realistic timeline in your quotation before work begins." },
  { category: "Timelines", q: "What do you need from me to start?", a: "A clear idea of your goals, your business details, any logo or brand colours, the content you want on the site, and examples of designs you like. We guide you on anything that is missing." },
  { category: "Payments", q: "How do deposits and payments work?", a: "We ask for a 50% deposit before development begins and the remaining 50% before final handover and deployment. Monthly services are billed separately. Exact terms are confirmed in your written quotation." },
  { category: "Domains and hosting", q: "Do you register domains?", a: "We can arrange domain registration for you. It is quoted separately unless explicitly included in your quotation." },
  { category: "Domains and hosting", q: "Is hosting included?", a: "Hosting is quoted separately unless explicitly included in your quotation. We can advise on suitable hosting for your project." },
  { category: "Revisions", q: "How many revisions are included?", a: "Each package includes a specified number of revision rounds, from 1 round in the Basic Website to up to 4 in the Premium Business Website. Revisions must relate to the originally agreed scope." },
  { category: "Revisions", q: "What if I want changes outside the original scope?", a: "New features, additional pages and major design changes are quoted separately. Changes outside the agreed scope may also affect the project timeline." },
  { category: "Maintenance", q: "Do you offer website maintenance?", a: "Yes. We offer Basic, Standard and Premium monthly maintenance plans covering updates, security checks, backups and support depending on the plan. Maintenance is optional and not automatically included in once-off development." },
  { category: "Maintenance", q: "Is any support included after launch?", a: "Post-launch support is included only where the selected package says so, for example one month in the Professional Business Website and two months in the Premium Business Website. After that, ongoing support requires a separate agreement." },
  { category: "Ownership", q: "Who owns the website once it is finished?", a: "Project ownership and the agreed deliverables transfer to you after full payment. Third-party software, licensed assets and subscriptions remain subject to their own licence agreements." },
  { category: "Ownership", q: "What do I receive at handover?", a: "The agreed project files, access credentials and deployment information." },
  { category: "Web applications", q: "Can you build a custom application for my business?", a: "Yes. We build business management systems, CRMs, inventory systems, client portals and dashboards. Complex or enterprise systems require a detailed assessment and formal quotation." },
  { category: "AI agents", q: "What can an AI assistant do for my business?", a: "It can answer common questions, collect enquiry details, qualify leads and pass conversations to your team. It works from your approved information and hands over to a person when it cannot help." },
  { category: "AI agents", q: "Is customer data safe with an AI assistant?", a: "We design integrations to collect only the information needed and keep credentials on the server. We discuss privacy and POPIA considerations with you during scoping." },
  { category: "Third-party costs", q: "Are there costs from other providers?", a: "Yes, sometimes. API usage, AI model consumption, WhatsApp Business API charges, hosting and third-party subscriptions are excluded unless explicitly included in the quotation. We explain these costs up front." },
];

export const TECH = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Three.js", "WhatsApp Business API", "REST and Webhooks", "AI and LLM APIs"];

export const BUDGETS = ["Under R5,000", "R5,000 – R10,000", "R10,000 – R25,000", "R25,000 – R50,000", "R50,000+", "Not sure yet"];

export const SERVICE_OPTIONS: { value: string; label: string }[] = [
  { value: "web", label: "Website development" },
  { value: "apps", label: "Web application" },
  { value: "ai", label: "AI agent or assistant" },
  { value: "automation", label: "Business automation" },
  { value: "maintenance", label: "Website maintenance and support" },
  { value: "support", label: "AI and automation support" },
  { value: "other", label: "Not sure yet" },
];

export type MockKind = "booking" | "shop" | "studio" | "fleet" | "portal" | "stock" | "chat" | "whatsapp";

export interface CaseStudy {
  mock: MockKind;
  tint: string;
  services: string[];
  problem: string;
  solution: string;
  design: string;
}

/** Concept case studies. These are demonstration projects, not client work. */
export const CASES: Record<string, CaseStudy> = {
  "karoo-stays-booking": { mock: "booking", tint: "#315BFA", services: ["Website design", "Booking enquiry flow", "SEO foundations"], problem: "Small guesthouses lose enquiries when rooms, rates and availability are hard to find on a phone.", solution: "A fast, mobile-first website with room galleries and a short enquiry form that captures dates and guest numbers.", design: "Warm editorial layouts, generous image areas and a single clear enquiry action on every screen." },
  "cape-fresh-market-shop": { mock: "shop", tint: "#4B6BFF", services: ["E-commerce design", "Checkout flow", "Delivery area logic"], problem: "Fresh produce sellers need repeat orders to be quick, and customers must know whether delivery reaches them.", solution: "A catalogue with filters, a delivery-area check before checkout and order confirmation emails.", design: "Clean product grids, high-contrast prices and a streamlined three-step checkout." },
  "launchpad-landing-page": { mock: "studio", tint: "#2547D6", services: ["Landing page design", "Motion design", "Lead capture"], problem: "A product launch page has one job: turn attention into sign-ups.", solution: "A single scrolling story with a clear offer, supporting points and one lead-capture form.", design: "Confident typography, restrained motion and a focused call to action." },
  "fleet-dashboard": { mock: "fleet", tint: "#5D7DFF", services: ["Web application", "Dashboard design", "Role-based access"], problem: "Operations teams juggle spreadsheets and messages to track vehicles, jobs and service dates.", solution: "One dashboard showing vehicle status, job allocation and maintenance reminders.", design: "A dense but calm interface with clear status colours, sortable tables and persistent side navigation." },
  "clinic-booking-portal": { mock: "portal", tint: "#3A63F5", services: ["Web application", "Client portal", "Reminders"], problem: "Phone-based booking is slow for clients and staff, and missed appointments cost time.", solution: "A portal where clients book and manage appointments, with reminders and a staff schedule.", design: "A reassuring, accessible interface with large touch targets and plain-language labels." },
  "stock-manager": { mock: "stock", tint: "#6A86FF", services: ["Web application", "Inventory system", "Alerts"], problem: "Spreadsheet stock lists go out of date and low stock is noticed too late.", solution: "A live inventory view with low-stock alerts, supplier records and simple reorder lists.", design: "A table-first layout with inline stock bars and clear alert states." },
  "website-support-agent": { mock: "chat", tint: "#7B92FF", services: ["AI agent", "Knowledge base setup", "Lead capture"], problem: "Teams answer the same questions repeatedly while visitors wait for replies.", solution: "An assistant that answers from approved content, captures contact details and hands over to a person.", design: "A friendly, compact chat interface with clear hand-over and lead-capture moments." },
  "whatsapp-lead-automation": { mock: "whatsapp", tint: "#4A5CFF", services: ["Business automation", "WhatsApp integration", "Notifications"], problem: "Enquiries arrive across channels and some are never followed up.", solution: "A workflow that collects each enquiry, tags it and notifies the right person with a follow-up reminder.", design: "A simple status-driven view so owners can see at a glance what needs attention." },
};
