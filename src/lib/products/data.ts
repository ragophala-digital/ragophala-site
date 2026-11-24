import { DIVISION_BY_ID } from "./categories";
import type { DivisionId, IconKey, Product, ProductIntegration, ProductStatus } from "./types";

/**
 * THE single source of truth for the software catalogue.
 *
 * To add a product: add one row to the right division below. Everything else (directory, counts, filters,
 * detail page, sitemap, waitlist options) derives from it.
 * To change a product's status, link or screenshots: add or edit its entry in OVERRIDES.
 *
 * Statuses default to "planned" (research / planned). Nothing is "live" unless it is set here on purpose.
 * Never invent launch dates, prices, screenshots or customer numbers.
 */

/** [name, description, optional feature keywords] */
type Row = readonly [name: string, description: string, keywords?: readonly string[]];

const CATALOGUE: Readonly<Record<DivisionId, readonly Row[]>> = {
  "business-management": [
    ["BookFlow", "Manage appointments, schedules, staff availability and customer bookings from one organised platform.", ["Appointments", "Scheduling", "Reminders", "Staff management"]],
    ["ClientFlow", "Organise customer information, manage leads, monitor sales pipelines and maintain meaningful business relationships.", ["CRM", "Customer records", "Sales pipelines", "Follow-ups"]],
    ["InvoiceFlow", "Manage quotations, invoices, payments and essential financial workflows in one platform.", ["Invoicing", "Quotations", "Payments", "Financial reporting"]],
    ["StockFlow", "Track inventory, suppliers, purchasing, stock movements and warehouse operations.", ["Inventory", "Warehouses", "Stock tracking", "Procurement"]],
    ["RetailFlow", "Manage retail sales, point-of-sale operations, checkout, returns and branch activity.", ["POS", "Retail", "Checkout", "Branches"]],
    ["OrderFlow", "Manage customer orders, order processing, fulfilment and delivery workflows.", ["Orders", "Fulfilment", "Deliveries", "Order tracking"]],
    ["JobFlow", "Coordinate field operations, assign work, manage technicians and track job progress.", ["Field service", "Technicians", "Work orders", "Scheduling"]],
  ],
  "ai-automation": [
    ["AssistFlow", "An intelligent business assistant designed to help teams organise information, automate routine work and improve productivity.", ["AI assistant", "Business automation", "Productivity"]],
    ["AgentFlow", "Create, configure and manage specialised AI agents for business workflows."],
    ["ChatFlow", "Deploy intelligent website chat assistants to handle customer enquiries and support."],
    ["VoiceFlow", "AI-powered voice reception and customer communication."],
    ["SalesFlow AI", "Support sales teams with lead qualification, follow-ups and sales assistance."],
    ["MarketingFlow", "Manage and automate marketing activities and campaigns."],
    ["WhatsAppFlow", "Manage business conversations, customer enquiries, follow-ups and messaging automation through supported WhatsApp Business integrations."],
    ["EmailFlow", "Automate business email workflows and customer communication."],
    ["LeadFlow", "Capture, organise and qualify potential customers."],
    ["WorkflowFlow", "Build and manage automated workflows connecting business processes."],
    ["DocumentAI", "Extract, process and organise information from business documents."],
    ["KnowledgeFlow", "Make company knowledge searchable and accessible through intelligent assistants."],
    ["MeetingFlow", "Organise meeting notes, summaries and action items."],
    ["RecruitFlow AI", "Support recruitment teams with candidate organisation and recruitment workflows."],
    ["ReviewFlow", "Manage customer feedback, reviews and reputation workflows."],
  ],
  "industry-solutions": [
    ["PropertyFlow", "Manage rental properties, tenants, maintenance, inspections and property operations."],
    ["FleetFlow", "Manage vehicles, maintenance schedules, fleet records and operational expenses."],
    ["BuildFlow", "Coordinate construction projects, contractors, materials, budgets and site progress."],
    ["SolarFlow", "Manage solar installation projects, maintenance, inspections and customer records."],
    ["SchoolFlow", "Manage school administration, students, attendance, parent communication and educational operations."],
    ["ClinicFlow", "Manage administrative workflows for healthcare practices, including appointments and patient administration."],
    ["LogisticsFlow", "Coordinate dispatch, delivery operations, drivers and proof of delivery."],
    ["FarmFlow", "Organise agricultural operations, production records and farm activities."],
    ["RestaurantFlow", "Manage restaurant operations, orders, menus, tables and staff workflows."],
    ["SalonFlow", "Manage appointments, customers, staff and daily salon operations."],
    ["AutoFlow", "Support automotive workshops with customer records, repair orders, vehicle information and service history."],
    ["RepairFlow", "Manage repair requests, work orders, technicians and maintenance operations."],
    ["HotelFlow", "Support accommodation management, reservations and guest operations."],
    ["TravelFlow", "Organise travel bookings, customers and travel agency operations."],
    ["EventFlow", "Manage event planning, registrations, schedules and coordination."],
    ["LegalFlow", "Organise legal practice administration, matters, documents and client workflows."],
    ["InsuranceFlow", "Support insurance administration, client records and claims workflows."],
    ["LaundryFlow", "Manage laundry orders, customer records and service operations."],
    ["FuneralFlow", "Support funeral service administration, arrangements and customer communication."],
    ["SecurityFlow", "Manage security operations, personnel scheduling, incidents and operational records."],
    ["CleaningFlow", "Coordinate cleaning teams, job schedules and service operations."],
    ["DentalFlow", "Support dental practice administration and appointment workflows."],
    ["PharmacyFlow", "Support pharmacy business administration and inventory workflows. Any regulated dispensing functionality must undergo appropriate compliance review."],
    ["VetFlow", "Support veterinary practice administration and appointment management."],
    ["GymFlow", "Manage memberships, bookings, attendance and fitness business operations."],
    ["FibreFlow", "Manage fibre network planning, deployment and installation workflows."],
  ],
  commerce: [
    ["ShopFlow", "Create and manage online stores and product catalogues."],
    ["MarketFlow", "Support multi-vendor marketplace operations."],
    ["SellFlow", "Organise sales across multiple commerce channels."],
    ["DeliveryFlow", "Coordinate delivery operations and order dispatch."],
    ["ReturnsFlow", "Manage returns, exchanges and reverse logistics."],
    ["PriceFlow", "Monitor and organise pricing information."],
    ["PromoFlow", "Manage promotions, discounts and campaigns."],
    ["LoyaltyFlow", "Create and manage customer loyalty programmes."],
    ["SubscribeFlow", "Manage recurring customer subscriptions and related workflows."],
    ["CatalogueFlow", "Organise product catalogues and product information."],
    ["SellerFlow", "Support marketplace sellers and their operational workflows."],
  ],
  education: [
    ["LearnFlow", "Deliver and manage online learning experiences."],
    ["CourseFlow", "Create, publish and manage digital courses."],
    ["ExamFlow", "Organise online assessments and examinations."],
    ["TutorFlow", "Manage tutors, learners and lesson scheduling."],
    ["TrainFlow", "Coordinate employee and corporate training."],
    ["CertFlow", "Manage digital certificates and qualification records."],
    ["SchoolFeesFlow", "Manage school fee administration and payment records."],
    ["SkillFlow", "Organise skills development and learning pathways."],
    ["CampusFlow", "Support college and university administration."],
  ],
  "it-infrastructure": [
    ["SecureFlow", "Organise business security management workflows."],
    ["MonitorFlow", "Monitor websites, servers and application performance."],
    ["UptimeFlow", "Track service availability and downtime."],
    ["BackupFlow", "Manage backup schedules and backup monitoring."],
    ["CloudFlow", "Organise cloud resource management."],
    ["DevFlow", "Support developer workflows and project coordination."],
    ["DeployFlow", "Organise software deployment workflows."],
    ["APIFlow", "Monitor and manage API integrations and operations."],
    ["TestFlow", "Organise automated software testing."],
    ["BugFlow", "Manage software bugs, issues and resolution workflows."],
    ["HelpDeskFlow", "Organise internal IT support requests."],
    ["NetworkFlow", "Monitor network infrastructure and network operations."],
    ["AccessFlow", "Manage identity and access workflows."],
    ["ComplianceFlow", "Organise compliance tracking and supporting evidence."],
  ],
  "finance-analytics": [
    ["BudgetFlow", "Manage business budgets and financial planning."],
    ["CashFlow", "Monitor cash position and support cash-flow forecasting."],
    ["ProfitFlow", "Analyse business profitability and performance."],
    ["TaxFlow", "Organise tax information and preparation workflows."],
    ["ReconcileFlow", "Support transaction reconciliation workflows."],
    ["CreditFlow", "Manage business credit and debt information."],
    ["CollectFlow", "Organise accounts receivable and collection workflows."],
    ["InvestFlow", "Track investment portfolios and related records."],
    ["ForecastFlow", "Support business forecasting and financial projections."],
    ["AuditFlow", "Organise audit workflows, evidence and findings."],
    ["SpendFlow", "Monitor business expenditure and spending controls."],
  ],
};

/** Per-product facts that differ from the defaults. Edit here when something genuinely changes. */
interface Override {
  status?: ProductStatus;
  featured?: boolean;
  websiteUrl?: string;
  pricingUrl?: string;
  signupUrl?: string;
  longDescription?: string;
  targetIndustries?: readonly string[];
  createdAt?: string;
  screenshots?: Product["screenshots"];
}

const OVERRIDES: Readonly<Record<string, Override>> = {
  // Only BookFlow and JobFlow appear in the existing project records (as coming-soon products), so they and the
  // two Flow products named in the roadmap are "coming-soon". Everything else defaults to "planned".
  bookflow: { status: "coming-soon", featured: true, targetIndustries: ["Salons", "Clinics", "Studios", "Service businesses"] },
  clientflow: { status: "coming-soon", featured: true, targetIndustries: ["Service businesses", "Sales teams"] },
  invoiceflow: { status: "coming-soon", featured: true, targetIndustries: ["Freelancers", "Small businesses", "Contractors"] },
  jobflow: { status: "coming-soon", targetIndustries: ["Field service", "Maintenance", "Installation"] },
  stockflow: { featured: true },
  retailflow: { featured: true },
  orderflow: { featured: true },
};

/** Optional connections between products. None are "available": they describe possible integrations only. */
const LINKS: readonly (readonly [string, string, ProductIntegration["state"], string?])[] = [
  ["clientflow", "bookflow", "conceptual", "Customer records could feed new bookings."],
  ["bookflow", "invoiceflow", "conceptual", "Completed appointments could prepare invoices."],
  ["clientflow", "invoiceflow", "planned", "Customer records could prefill quotations and invoices. InvoiceFlow must work fully without ClientFlow."],
  ["invoiceflow", "stockflow", "conceptual", "Invoiced items could update stock levels."],
  ["stockflow", "orderflow", "conceptual", "Stock levels could inform order fulfilment."],
  ["orderflow", "retailflow", "conceptual"],
  ["retailflow", "stockflow", "conceptual"],
  ["assistflow", "clientflow", "conceptual"],
  ["whatsappflow", "clientflow", "conceptual"],
];

export const slugify = (name: string): string => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const ICON_BY_DIVISION: Readonly<Record<DivisionId, IconKey>> = {
  "business-management": "briefcase",
  "ai-automation": "bot",
  "industry-solutions": "factory",
  commerce: "shopping-bag",
  education: "graduation-cap",
  "it-infrastructure": "server-cog",
  "finance-analytics": "trending-up",
};

function build(): readonly Product[] {
  const out: Product[] = [];
  let order = 0;
  for (const [category, rows] of Object.entries(CATALOGUE) as [DivisionId, readonly Row[]][]) {
    for (const [name, description, keywords] of rows) {
      const slug = slugify(name);
      const o = OVERRIDES[slug] ?? {};
      const integrations: ProductIntegration[] = LINKS.flatMap(([a, b, state, note]) => (a === slug ? [{ with: b, state, note }] : b === slug ? [{ with: a, state, note }] : []));
      const status = o.status ?? "planned";
      out.push({
        id: `prod_${slug}`,
        name,
        slug,
        category,
        division: DIVISION_BY_ID[category].label,
        description,
        longDescription: o.longDescription ?? null,
        keywords: keywords ?? [],
        features: keywords ?? [],
        status,
        icon: ICON_BY_DIVISION[category],
        logo: null,
        screenshots: o.screenshots ?? [],
        websiteUrl: o.websiteUrl ?? null,
        detailPageEnabled: true,
        pricingUrl: o.pricingUrl ?? null,
        signupUrl: o.signupUrl ?? null,
        waitlistEnabled: status !== "live",
        featured: o.featured ?? false,
        displayOrder: order++,
        createdAt: o.createdAt ?? null,
        integrations,
        targetIndustries: o.targetIndustries ?? [],
      });
    }
  }
  return out;
}

export const PRODUCTS: readonly Product[] = build();

export const FEATURED_ORDER = ["bookflow", "clientflow", "invoiceflow", "stockflow", "retailflow", "orderflow"] as const;
