/** Public service content. Contains no prices: pricing is shared privately through a quotation or the Service Catalogue. */

export type ServiceKey = "web" | "apps" | "ai" | "automation" | "maintenance" | "support";

export interface Offering {
  name: string;
  summary: string;
  items: string[];
}

export interface Service {
  key: ServiceKey;
  index: string;
  title: string;
  href: string;
  /** Short line for cards. */
  short: string;
  /** Three to five key capabilities for overview cards. */
  capabilities: string[];
  headline: string;
  intro: string[];
  metaTitle: string;
  metaDescription: string;
  forWho: string[];
  solves: string[];
  offeringsTitle: string;
  offerings: Offering[];
  /** What is included in a typical engagement. */
  included: string[];
  processTitle: string;
  process: string[];
  why: string;
  useCases: string[];
  /** Honest disclosures: third-party costs, limits and dependencies. */
  notes: string[];
  cta: string;
  ctaSecondary: string;
}

export const SERVICES: Service[] = [
  {
    key: "web",
    index: "01",
    title: "Website Development",
    href: "/web-development",
    short: "Professional websites that establish your presence, explain your value and bring in enquiries.",
    capabilities: ["Custom, responsive design", "Contact, WhatsApp and map integration", "Search and analytics foundations", "Online stores and booking sites", "Redesigns of existing websites"],
    headline: "Websites that move your business forward.",
    intro: [
      "We design and develop professional websites that help businesses establish their online presence, communicate their value, connect with customers and grow their operations.",
      "From simple business websites to sophisticated online platforms, we create digital experiences tailored to your business objectives.",
    ],
    metaTitle: "Website Development in South Africa",
    metaDescription: "Business website design and development in South Africa: business sites, landing pages, corporate sites, online stores, booking websites and redesigns.",
    forWho: ["Startups and small businesses getting online for the first time", "Established companies whose website no longer represents them", "Service businesses that depend on enquiries and bookings", "Retailers who want to sell online"],
    solves: ["A website that looks dated or does not work well on phones", "Customers who cannot find you or cannot easily contact you", "No clear route from a visitor to an enquiry", "A site that is hard to update"],
    offeringsTitle: "Websites we build",
    offerings: [
      { name: "Basic Websites", summary: "For individuals, startups and small businesses that need a straightforward online presence.", items: ["Home page", "About section", "Contact section", "Responsive layout", "Basic contact functionality", "Essential business information"] },
      { name: "Landing Pages", summary: "Purpose-built pages designed around a specific campaign, service, product or business objective.", items: ["Custom landing page design", "Clear calls to action", "Lead enquiry forms", "Responsive layouts", "Conversion-focused content structure", "Basic SEO foundations"] },
      { name: "Business Websites", summary: "Professional websites that introduce your business, showcase your services and help customers make enquiries.", items: ["Multiple website pages", "Custom visual design", "Service presentation", "About and contact pages", "WhatsApp integration where required", "Google Maps integration where required", "Contact forms", "Analytics and basic SEO according to scope"] },
      { name: "Corporate Websites", summary: "Professional digital platforms for established businesses and organisations.", items: ["Custom corporate design", "Structured business information", "Multiple service sections", "Professional company presentation", "Responsive experience", "Advanced page layouts", "Analytics and SEO", "Content management where included"] },
      { name: "E-commerce Websites", summary: "Online stores that let you present products and sell online.", items: ["Product catalogues and categories", "Shopping cart", "Checkout experience", "Payment gateway integration", "Order management", "Inventory functionality where scoped", "Customer notifications", "Mobile-friendly shopping experience"] },
      { name: "Booking & Appointment Websites", summary: "Websites that allow customers to request or schedule services.", items: ["Service listings", "Appointment request forms", "Calendar functionality where required", "Booking management", "Customer notifications", "Administrative management tools", "Responsive interfaces"] },
      { name: "Educational Websites", summary: "Digital platforms for educational institutions, tutors and training providers.", items: ["Course presentation", "Learning information", "Student enquiry forms", "Registration functionality", "Educational content", "Learning management functionality where scoped"] },
      { name: "Membership Websites", summary: "Platforms that provide restricted content and member access.", items: ["User registration", "Login and authentication", "Member profiles", "Restricted content", "Membership management", "Subscription integration where required"] },
      { name: "Website Redesign", summary: "Improve an existing website with modern design, better structure, responsive layouts and better usability.", items: ["Existing website assessment", "Visual redesign", "Layout improvements", "Mobile optimisation", "Performance improvements", "Content restructuring", "Migration where included"] },
    ],
    included: ["Custom visual design", "Responsive layouts for phone, tablet and desktop", "Contact and lead-capture forms", "On-page SEO foundations and metadata", "Analytics integration where scoped", "Handover of agreed files and access"],
    processTitle: "How a website project runs",
    process: ["Discovery and consultation", "Requirements and planning", "UI/UX design", "Development", "Testing and optimisation", "Launch and handover", "Post-launch support according to the agreed package"],
    why: "Your website is often the first place a customer judges your business. A clear, credible and easy-to-use site builds trust before anyone speaks to you, and gives interested customers a simple way to get in touch.",
    useCases: ["A tradesperson who wants customers to request a quote online", "A guesthouse that wants direct booking enquiries", "A retailer moving from social media sales to an online store", "A training provider that needs course information and registration"],
    notes: ["Payment gateway charges, shipping services, advanced inventory requirements and external subscriptions may involve additional costs.", "Domain registration and hosting are quoted separately unless explicitly included in your quotation."],
    cta: "Let's Build Your Website",
    ctaSecondary: "Request a Consultation",
  },
  {
    key: "apps",
    index: "02",
    title: "Web Applications",
    href: "/web-applications",
    short: "Custom systems, portals and dashboards built around how your business actually works.",
    capabilities: ["Business management systems", "CRM and lead tracking", "Inventory and stock control", "Client portals with secure login", "Reporting and analytics dashboards"],
    headline: "Software built around the way you work.",
    intro: [
      "We develop custom web applications that help businesses manage operations, organise information, automate processes and improve how they work.",
      "Our applications are designed around actual business requirements rather than forcing businesses to adapt to generic software.",
    ],
    metaTitle: "Custom Web Application Development",
    metaDescription: "Custom web application development in South Africa: business management systems, CRMs, inventory systems, client portals, booking systems and reporting dashboards.",
    forWho: ["Businesses running on spreadsheets, paper or disconnected tools", "Teams that need one place for customers, stock, jobs or bookings", "Organisations that want to give customers secure self-service access"],
    solves: ["Information scattered across spreadsheets and messages", "Manual admin that slows the team down", "No clear view of performance or day-to-day operations", "Generic software that does not match your process"],
    offeringsTitle: "Application solutions",
    offerings: [
      { name: "Business Management Systems", summary: "Centralise business operations through a dedicated management platform.", items: ["Business dashboards", "User accounts", "Role-based access", "Operational records", "Reporting", "Workflow management", "Administrative controls"] },
      { name: "Customer Relationship Management (CRM)", summary: "Manage customer relationships and sales processes.", items: ["Customer records", "Lead management", "Enquiry tracking", "Communication history", "Sales pipelines", "Follow-up management", "Reporting"] },
      { name: "Inventory Management Systems", summary: "Manage products, stock levels and inventory movements.", items: ["Product management", "Stock tracking", "Stock adjustments", "Inventory records", "Low-stock alerts", "Supplier management", "Inventory reporting"] },
      { name: "Employee Management Systems", summary: "Organise employee information and internal business processes.", items: ["Employee profiles", "Department management", "Role-based permissions", "Attendance functionality where required", "Administrative dashboards", "Reporting"] },
      { name: "Client Portals", summary: "Give customers secure access to relevant services and information.", items: ["Secure authentication", "Customer dashboards", "Document access", "Request tracking", "Account information", "Notifications"] },
      { name: "Booking Management Systems", summary: "Manage appointments, service availability and customer bookings.", items: ["Service and availability management", "Customer bookings", "Booking records", "Notifications", "Administrative tools"] },
      { name: "Reporting & Analytics Dashboards", summary: "Turn operational information into useful business insight.", items: ["Business performance metrics", "Visual reports", "Data filtering", "Export functionality", "Operational summaries"] },
    ],
    included: ["Requirements analysis and scoping", "Secure user accounts and roles", "Database design", "Dashboards and reporting", "Deployment and handover"],
    processTitle: "How an application project runs",
    process: ["Business requirements analysis", "System architecture and database planning", "UI/UX design", "Backend and frontend development", "Authentication and security implementation", "Integration and testing", "Deployment and handover"],
    why: "When your tools match your process, your team spends less time on admin and more time on the work that matters, and you can see what is happening in your business without chasing information.",
    useCases: ["A distributor tracking stock levels and suppliers", "A service company managing leads and follow-ups", "A clinic or studio managing bookings", "A firm giving clients a portal to follow requests and documents"],
    notes: ["Scope and effort depend on authentication, user roles, database design, integrations, workflows, security requirements and overall complexity.", "Large or enterprise applications start with a detailed assessment and a formal quotation."],
    cta: "Discuss Your Application",
    ctaSecondary: "Request a Quote",
  },
  {
    key: "ai",
    index: "03",
    title: "AI Agents & Intelligent Assistants",
    href: "/ai-agents",
    short: "Assistants that answer questions, capture enquiries and hand over to your team when it matters.",
    capabilities: ["Website AI chatbots", "Customer question answering", "WhatsApp assistants", "Lead capture and qualification", "Appointment enquiry assistants"],
    headline: "Make your business more intelligent.",
    intro: [
      "We build AI-powered assistants that help businesses communicate with customers, answer questions, capture enquiries, support internal processes and improve everyday operations.",
      "Our solutions are designed around practical business use cases.",
    ],
    metaTitle: "AI Chatbot and AI Assistant Development",
    metaDescription: "AI chatbot development in South Africa: website assistants, customer assistants, WhatsApp assistants, lead capture and appointment assistants built around practical business use.",
    forWho: ["Businesses that answer the same customer questions every day", "Teams that miss enquiries outside office hours", "Companies that want leads captured and summarised for follow-up"],
    solves: ["Slow replies to routine questions", "Enquiries that arrive incomplete or get lost", "Staff time spent on repetitive messages", "No consistent first response for visitors"],
    offeringsTitle: "AI solutions",
    offerings: [
      { name: "Website AI Chatbots", summary: "Intelligent assistants integrated into business websites.", items: ["Answer frequently asked questions", "Explain business services", "Guide website visitors", "Capture customer enquiries", "Provide business information", "Direct complex enquiries to human support"] },
      { name: "AI Customer Assistants", summary: "Assistants designed to support customer communication.", items: ["Respond to customer questions", "Provide service information", "Assist with basic customer requests", "Collect relevant information", "Escalate enquiries where human assistance is needed"] },
      { name: "WhatsApp AI Assistants", summary: "Conversational experiences using supported WhatsApp Business integrations.", items: ["Respond to enquiries", "Provide product or service information", "Capture leads", "Support customer communication", "Route enquiries to the appropriate person"] },
      { name: "AI Lead Capture Assistants", summary: "Help businesses collect and qualify prospective customer enquiries.", items: ["Ask relevant questions", "Understand customer requirements", "Identify service interests", "Categorise enquiries", "Prepare structured lead summaries", "Send information through configured integrations"] },
      { name: "AI Appointment Assistants", summary: "Assist customers with appointment-related enquiries.", items: ["Explain available services", "Collect preferred appointment details", "Connect to supported booking systems", "Assist with booking requests", "Provide configured appointment information"] },
      { name: "Custom AI Assistants", summary: "Custom AI solutions developed around specific business requirements.", items: ["Internal knowledge assistants", "Document question-answering", "Business information assistants", "Customer support workflows", "Operational assistance"] },
    ],
    included: ["Assistant design around your approved content", "Conversation and workflow design", "Website or supported channel deployment", "Lead capture and routing", "Testing of accuracy and behaviour"],
    processTitle: "How an AI project runs",
    process: ["Identify the business use case", "Assess the available information and data", "Define the assistant's responsibilities", "Design the conversation and workflow", "Implement the AI integration", "Test accuracy and behaviour", "Deploy and monitor"],
    why: "A well-scoped assistant gives every visitor a prompt, consistent first response and gives your team better-prepared enquiries, while people stay in charge of decisions that matter.",
    useCases: ["A guesthouse answering questions about rooms and local attractions", "A service business qualifying quote requests before a call", "A clinic collecting appointment preferences", "A company giving staff quick answers from internal documents"],
    notes: ["WhatsApp Business API access, messaging charges and third-party platform costs may apply.", "An appointment assistant never tells a customer a booking is confirmed unless your booking system confirms it.", "AI can make mistakes. Assistants work from approved information, say when they do not know and hand over to a person for sensitive matters."],
    cta: "Explore AI Solutions",
    ctaSecondary: "Request a Quote",
  },
  {
    key: "automation",
    index: "04",
    title: "Business Automation",
    href: "/business-automation",
    short: "Connected workflows that move information between your tools without repeated manual work.",
    capabilities: ["Enquiry capture and routing", "Email notifications and follow-ups", "Workflow and system connections", "Document processing", "CRM and lead automation"],
    headline: "Make every workflow work smarter.",
    intro: [
      "We help businesses streamline repetitive processes by connecting their digital tools, organising workflows and implementing intelligent automation.",
      "Our goal is to reduce unnecessary manual work and make everyday business processes more efficient.",
    ],
    metaTitle: "Business Process Automation",
    metaDescription: "Business process automation in South Africa: enquiry automation, email workflows, document processing, CRM and lead automation and custom integrations.",
    forWho: ["Businesses where people copy information between tools", "Teams that lose track of follow-ups and enquiries", "Operations that depend on repeated manual steps"],
    solves: ["Enquiries sitting unanswered because nobody was notified", "Re-typing the same details into several systems", "Inconsistent follow-up", "No visibility of where a request currently stands"],
    offeringsTitle: "Automation services",
    offerings: [
      { name: "Enquiry Automation", summary: "Handle incoming enquiries consistently.", items: ["Capture website enquiries", "Organise incoming information", "Categorise leads", "Generate enquiry summaries", "Notify the appropriate person"] },
      { name: "Email Automation", summary: "Keep customers and your team informed automatically.", items: ["Automated notifications", "Enquiry acknowledgements", "Follow-up workflows", "Internal email alerts", "Business communication workflows"] },
      { name: "Business Workflow Automation", summary: "Connect the steps of a business process.", items: ["Connect business processes", "Trigger actions based on events", "Reduce repetitive administrative tasks", "Organise information between systems", "Improve process visibility"] },
      { name: "Document Processing Automation", summary: "Where supported by the selected tools and document formats.", items: ["Collect uploaded documents", "Extract relevant information", "Organise records", "Prepare structured summaries", "Route documents for review"] },
      { name: "CRM & Lead Automation", summary: "Keep customer records and follow-ups moving.", items: ["Capture new leads", "Organise customer records", "Categorise enquiries", "Prepare follow-up tasks", "Update supported business systems"] },
      { name: "Custom Integrations", summary: "Connect compatible business systems through APIs, webhooks and supported integrations.", items: ["API and webhook connections", "Data flow between systems", "Event-based triggers", "Error handling and notifications"] },
    ],
    included: ["Process mapping", "Workflow design and build", "Integration with your supported tools", "Testing of each workflow", "Documentation and handover"],
    processTitle: "How an automation project runs",
    process: ["Understand the current business process", "Identify repetitive activities", "Design the workflow", "Select compatible technologies", "Build and integrate", "Test the workflow", "Deploy and monitor"],
    why: "Automation removes the small repeated tasks that cost a team hours each week, so follow-ups happen consistently and your people can focus on customers and decisions.",
    useCases: ["A new website enquiry that is categorised, summarised and sent to the right person", "Acknowledgement emails that go out immediately", "Uploaded documents that are sorted and routed for review", "New leads that appear in your CRM with follow-up tasks"],
    notes: ["Integration availability depends on the external service, its API access, permissions and subscription requirements.", "Third-party subscription and usage charges may apply."],
    cta: "Automate Your Business",
    ctaSecondary: "Request a Quote",
  },
  {
    key: "maintenance",
    index: "05",
    title: "Website Maintenance & Support",
    href: "/website-maintenance",
    short: "Ongoing updates, monitoring and support so your website stays secure, current and available.",
    capabilities: ["Routine updates and security checks", "Availability monitoring", "Backups", "Minor content updates", "Priority support and performance monitoring"],
    headline: "Your website. Well maintained.",
    intro: [
      "Launching a website is only the beginning. We provide ongoing website maintenance and support to help businesses keep their digital platforms updated, monitored and functioning properly.",
    ],
    metaTitle: "Website Maintenance Services",
    metaDescription: "Website maintenance services in South Africa: updates, security checks, availability monitoring, backups, minor content updates and priority support plans.",
    forWho: ["Businesses without in-house technical staff", "Owners who want someone responsible for keeping the site healthy", "Sites that are updated regularly and need reliable support"],
    solves: ["Websites that slowly fall out of date", "Not knowing when a site goes down", "No recent backup when something breaks", "No one to ask when a change is needed"],
    offeringsTitle: "Maintenance plans",
    offerings: [
      { name: "Basic Website Maintenance", summary: "Essential upkeep.", items: ["Basic website updates", "Routine security checks", "Website availability monitoring"] },
      { name: "Standard Website Maintenance", summary: "Includes the basic plan, plus:", items: ["Backups", "Minor content updates", "General technical support"] },
      { name: "Premium Website Maintenance", summary: "Includes standard maintenance, plus:", items: ["Priority support", "Routine maintenance checks", "Performance monitoring and optimisation"] },
    ],
    included: ["Updates and checks as set out in your plan", "Monitoring of availability", "Support within agreed limits"],
    processTitle: "How maintenance works",
    process: ["Review your website and agree a plan", "Set up monitoring and backups where included", "Carry out routine updates and checks", "Handle support requests within agreed limits", "Report issues and recommend improvements"],
    why: "Regular care keeps a website secure, reliable and current, and avoids small issues turning into outages or expensive emergency work.",
    useCases: ["A business site that needs regular updates and checks", "A company that wants prompt help when something breaks", "A growing site that benefits from performance monitoring"],
    notes: ["Maintenance plans have defined service limits, support hours and response times.", "Major redesigns, new functionality, additional pages and extensive development are quoted separately."],
    cta: "Discuss Website Maintenance",
    ctaSecondary: "Request a Quote",
  },
  {
    key: "support",
    index: "06",
    title: "AI & Automation Support",
    href: "/ai-support",
    short: "Ongoing monitoring and support to keep your assistants and automated workflows reliable.",
    capabilities: ["Assistant monitoring and availability checks", "Chatbot functionality checks", "Knowledge updates within agreed scope", "Workflow and integration monitoring", "Custom support for complex AI systems"],
    headline: "Keep your systems running with confidence.",
    intro: [
      "We provide ongoing support for AI assistants and business automation systems to help businesses maintain their digital workflows and address operational issues.",
    ],
    metaTitle: "AI and Automation Support",
    metaDescription: "AI automation support in South Africa: assistant monitoring, chatbot support, business automation support and advanced AI management.",
    forWho: ["Businesses already running an AI assistant or automated workflow", "Teams that rely on integrations staying connected", "Organisations with more complex AI systems"],
    solves: ["Assistants that give outdated answers", "Integrations that quietly stop working", "No one monitoring automated workflows", "No clear contact when something goes wrong"],
    offeringsTitle: "Support services",
    offerings: [
      { name: "AI Assistant Monitoring", summary: "Keep an eye on your assistant.", items: ["Basic assistant monitoring", "Availability checks", "General issue identification"] },
      { name: "AI Chatbot Support", summary: "Keep your chatbot useful.", items: ["Assistant functionality checks", "Knowledge updates within agreed scope", "Basic troubleshooting", "General support"] },
      { name: "Business Automation Support", summary: "Keep your workflows running.", items: ["Workflow monitoring", "Integration checks", "Troubleshooting", "Minor adjustments within agreed scope"] },
      { name: "Advanced AI Management", summary: "Custom ongoing support for more complex AI systems, integrations and business workflows.", items: ["Scope agreed around your systems", "Ongoing monitoring and improvement", "Integration and workflow support"] },
    ],
    included: ["Monitoring and checks as set out in your plan", "Support within agreed scope", "Minor adjustments where included"],
    processTitle: "How support works",
    process: ["Review your assistants and workflows", "Agree what is monitored and supported", "Monitor availability and behaviour", "Resolve issues and make agreed adjustments", "Recommend improvements"],
    why: "AI assistants and automations depend on content, integrations and third-party services that change. Ongoing support keeps them accurate, connected and dependable.",
    useCases: ["Keeping a website chatbot's answers current", "Checking that enquiry workflows still reach the right people", "Ongoing management of a more complex assistant"],
    notes: ["API consumption, hosting, messaging, model usage and third-party subscription charges may be billed separately."],
    cta: "Get AI Support",
    ctaSecondary: "Request a Quote",
  },
];

export const serviceByKey = (key: ServiceKey): Service => SERVICES.find((s) => s.key === key) ?? SERVICES[0];
