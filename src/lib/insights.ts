/** Insights (blog) content. Plain structured data so articles are easy to add or edit. Prices are never quoted here; link to /quote instead. */

export type Block = { type: "p"; text: string } | { type: "h2"; text: string } | { type: "ul"; items: string[] };

export interface Article {
  slug: string;
  title: string;
  summary: string;
  category: string;
  date: string; // ISO date
  readMinutes: number;
  body: Block[];
}

export const ARTICLES: Article[] = [
  {
    slug: "what-a-small-business-website-needs",
    title: "What a small business website actually needs",
    summary: "A short checklist of the pages and features that help a website win enquiries, and the ones you can safely leave for later.",
    category: "Websites",
    date: "2026-11-02",
    readMinutes: 4,
    body: [
      { type: "p", text: "Many small business sites fail for a simple reason: they try to do everything and end up explaining nothing. A good first website does a few jobs clearly." },
      { type: "h2", text: "Start with the jobs the site must do" },
      { type: "ul", items: ["Say what you do and who it is for, in the first screen.", "Show proof: real work, real reviews, real people.", "Make the next step obvious: call, WhatsApp, book or request a quote.", "Load quickly on a mobile phone with limited data."] },
      { type: "h2", text: "The pages most businesses need" },
      { type: "p", text: "Home, Services, About, Contact and a page for frequently asked questions cover most needs. Add a portfolio or gallery if your work is visual, and a booking or shop page only when you are ready to run it." },
      { type: "h2", text: "What can wait" },
      { type: "ul", items: ["A blog, until you can publish regularly.", "Multiple languages, until you know you need them.", "Complex animation that does not help a visitor decide."] },
      { type: "p", text: "If you are unsure where to start, Smart Intake on this website turns a short description of your business into a clear project brief you can send us." },
    ],
  },
  {
    slug: "where-ai-helps-a-business-first",
    title: "Where AI helps a business first",
    summary: "AI is most useful on repetitive, text-heavy work. Here are the places we would look first, and what to be careful about.",
    category: "AI & automation",
    date: "2026-11-05",
    readMinutes: 5,
    body: [
      { type: "p", text: "You do not need to rebuild your business around AI. The best early wins are small, specific and easy to check." },
      { type: "h2", text: "Good first uses" },
      { type: "ul", items: ["Answering common customer questions from your own information.", "Sorting incoming enquiries by type and urgency.", "Drafting replies that a person reviews before sending.", "Summarising long messages or notes for your team."] },
      { type: "h2", text: "Be careful with" },
      { type: "ul", items: ["Prices, legal promises and delivery dates: keep a person in charge of these.", "Personal information: only collect what you need and say how it is used.", "Anything where a wrong answer is costly and nobody checks it."] },
      { type: "p", text: "A good AI assistant knows its limits, says when it does not know, and hands over to a human. That is how we design them." },
    ],
  },
  {
    slug: "how-to-brief-a-web-developer",
    title: "How to brief a web developer so you get an accurate quote",
    summary: "Six things to write down before you ask for a quotation, so the price and timeline match what you actually need.",
    category: "Planning",
    date: "2026-11-09",
    readMinutes: 4,
    body: [
      { type: "p", text: "Quotes differ wildly when briefs are vague. A few lines of preparation make the answer far more useful." },
      { type: "h2", text: "What to include" },
      { type: "ul", items: ["What your business does and who your customers are.", "The problem you want the website or system to solve.", "The pages or features you think you need.", "Anything it must connect to, such as payments, a calendar or WhatsApp.", "Examples of sites you like, and why.", "Your rough budget range and when you need it live."] },
      { type: "p", text: "Pricing is tailored to each project. A written quotation confirms the final figure once the scope is clear." },
    ],
  },
];

export const findArticle = (slug: string): Article | undefined => ARTICLES.find((a) => a.slug === slug);

export const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat("en-ZA", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
