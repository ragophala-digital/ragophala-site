# Full website prompt: Ragophala Digital

Copy everything below the line into any AI coding assistant to recreate the website exactly as it is built.

---

Build a complete, production-ready website for **Ragophala Digital**, a South African digital solutions agency. Tagline: **"Digital Solutions. Real Results."** Target market: South African small, medium and established businesses. Brand personality: professional, innovative, creative, reliable, approachable, technology-driven. Write natural South African business English. Prices are in South African rand (ZAR).

## 1. Technology stack

- Next.js 15 (App Router), React 19, TypeScript (strict)
- Tailwind CSS 3
- Three.js, React Three Fiber 9 and Drei for 3D
- Framer Motion for animation and page transitions
- Lucide React for icons
- Zod for validation (shared by client and server)
- Nodemailer for contact-form email over SMTP
- Fonts through `next/font/google`: **Space Grotesk** (headings) and **Inter** (body)
- No database and no authentication (not justified by the requirements)
- Deploy on Vercel
- Folders: `src/app` (routes), `src/components` (shared and `three/`), `src/lib` (site data, utils, contact schema)
- Keep the old static HTML site in `legacy/` for reference

## 2. Visual identity

- Backgrounds: deep navy and near-black (`ink #02050f`, `navy-950 #040a1c`, `navy-900 #070f2b`, `navy-800 #0b1740`)
- Accent: electric blue (`volt #2f7bff`, `volt-400 #5b9bff`, `volt-300 #8ab9ff`, `volt-600 #1f5fe0`)
- Light sections: `mist #f3f6fc` with navy text, alternated with dark sections
- White text on dark; slate greys for body copy
- Subtle glassmorphism cards (`border white/10`, `bg white/4%`, backdrop blur)
- A faint blue grid background with a radial fade, and soft blurred blue glows. Avoid excessive glow, clutter and too many colours
- Logo: rounded-square navy badge with a blue gradient "R", beside the wordmark "Ragophala **Digital**" (Digital in blue)
- Pill-shaped buttons: primary (solid blue), ghost (outlined), dark, outline-dark
- Section pattern: small blue "eyebrow" label with a leading line, large heading, grey lead paragraph

## 3. Global layout and behaviour

- **Header (fixed):** logo, nav links (Services with hover/focus dropdown listing the four service pages, Pricing, Portfolio, About, FAQ), and a "Get a quote" button. It turns into a blurred solid bar after scrolling, and shows a thin blue scroll-progress line along its bottom edge. On mobile (below 1024px) there is a hamburger that opens a full-screen menu with Home, the main links, Contact, a Services list and a "Get a quote" button. The menu locks body scroll, closes on route change and has proper `aria-expanded`/`aria-controls`.
- **Footer:** logo and tagline; a Services column (four service pages); a Company column (About, Pricing, Portfolio, FAQ, Contact); WhatsApp and email links only when configured, plus a "Contact form" link; copyright line stating that prices are in ZAR.
- **Floating WhatsApp button** (bottom-right) shown only when a WhatsApp number is configured.
- **Skip-to-content link**, semantic landmarks, visible focus rings, `lang="en-ZA"`.
- **Page transitions:** a short fade and rise on every route change (`template.tsx`).
- **Scroll animations:** a `Reveal` component fades and slides sections in once when scrolled into view.
- **Hover interaction:** a `TiltCard` gives cards a cursor-following spotlight and a subtle 3D tilt.
- Smooth scrolling and a scroll offset below the fixed header.
- **Reduced motion:** all animations, transitions and 3D respect `prefers-reduced-motion`.
- **404 page** with a link home.
- Reusable pieces: `Reveal`, `SectionHead`, `LinkButton`, `WhatsAppButton`, `TiltCard`, `CTASection`, `PageHero`, `Faq` accordion, `ProjectVisual`, `ServiceVisual`.

## 4. 3D experience

Every major page has its own React Three Fiber scene, loaded client-side only (code-split with `next/dynamic`, `ssr: false`) so first-load JS stays small (about 160 kB per page).

Shared scene behaviour:
- Lights only (no HDR environment downloads)
- Subtle pointer parallax rig and floating objects (Drei `Float`), sparkle particles
- Pause rendering when scrolled off-screen
- Lower pixel ratio (1) and fewer objects/particles on small or low-core devices (width below 768px or 4 or fewer cores)
- Fall back to a lightweight CSS glass illustration while loading, when WebGL is unavailable, or when reduced motion is requested

Scenes:
- **Home hero:** a glowing distorted blue core inside a rotating wireframe icosahedron with an orbiting ring, surrounded by floating 3D browser windows, plus sparkles
- **About:** a metallic blue crystal (octahedron) with a wireframe shell, orbiting ring and small floating shards
- **Services:** a distorted core with four orbiting objects (browser window, cube, wireframe sphere, torus knot)
- **Web Development:** a layered stack of four floating browser windows plus a cursor shape
- **Web Applications:** a floating dashboard panel with animated bar chart, gauge ring and lines, with floating cubes
- **AI & Automation:** a rotating neural network of glowing nodes and connecting lines around a pulsing core
- **Pricing:** ascending rounded blocks (six tiers) with a floating ring
- **Contact:** a wireframe globe with a location marker and orbiting ring
- Portfolio and FAQ use clean layouts without a 3D scene

## 5. Site data (all in `src/lib/site.ts`, editable in one place)

**Services (four divisions):**
1. Website Development: benefits: mobile-first design, built for Google visibility, clear calls to action, easy to update
2. Web Applications: tailored to your workflow, secure user access, reports and dashboards, room to grow
3. AI Agents & Automation: answers common questions, captures and routes leads, connects your tools, human hand-over built in
4. Digital Support & Maintenance: security and software updates, content and design changes, performance checks, defined response times

**Website packages (editable starting prices, ZAR):**

| Package | Price | Timeline | Includes |
| --- | --- | --- | --- |
| Basic Landing Page | R2,000 | 3–5 working days | 1 responsive page, enquiry form, basic on-page SEO, social/contact links, 1 revision round |
| Professional Landing Page | R3,000 | 5–7 working days | 1 long-form custom page, scroll animations, enquiry form with email delivery, analytics setup, 2 revision rounds |
| Starter Business Website | R4,500 | 1–2 weeks | up to 4 pages, responsive, contact form and map, basic SEO, 2 revision rounds |
| Standard Business Website (most requested) | R6,500 | 2–3 weeks | up to 6 pages, custom design system, service pages with enquiry links, SEO and sitemap, analytics, 2 revision rounds |
| Professional Business Website | R9,500 | 3–4 weeks | up to 10 pages, editable content sections, third-party integrations, advanced SEO structure, performance optimisation, 3 revision rounds |
| Premium Business Website | R14,000 | 4–6 weeks | up to 15 pages, custom animation and interaction, booking or catalogue features, advanced SEO and performance, handover walkthrough, 3 revision rounds |

Never promise unlimited revisions, support or usage.

**Demonstration projects (clearly labelled as concepts, not real clients):**
- Websites: Karoo Stays Booking Website; Cape Fresh Market Online Shop; Launchpad Startup Landing Page
- Web Applications: Fleet Operations Dashboard; Clinic Booking Portal; Stock and Inventory Manager
- AI & Automation: Website Support Agent; WhatsApp Lead Automation

Each has a slug, category, summary, description, technology list, design goals, key features and an illustration hue. Do not invent real clients, testimonials, awards, staff or company history.

**Process (5 steps):** Discover, Design, Build, Launch, Support.

**Why choose us (6 points):** Built for South Africa; Clear quotations; Mobile-first; Performance and SEO built in; Direct communication; Technology that scales.

**Tech list:** Next.js, React, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Three.js, WhatsApp Business API, REST & Webhooks, AI / LLM APIs.

**Contact options:** budgets (Under R5,000; R5,000–R10,000; R10,000–R25,000; R25,000–R50,000; R50,000+; Not sure yet) and services (Website development, Web application, AI agent or automation, Support and maintenance, Not sure yet).

**FAQs (13)** grouped by Websites, Pricing, Payments, Timelines, Hosting, Maintenance, AI, Applications.

## 6. Pages

### Home (`/`)
1. **Hero (dark):** eyebrow "South African digital agency"; headline "Digital solutions for businesses that want **real results.**" (last words in a blue gradient); paragraph about websites, web applications and AI-powered automation; buttons "Request a quotation", "View demo projects", and "WhatsApp us" (only when configured); the 3D hero scene on the right.
2. **Scrolling technology marquee** of the tech list.
3. **What we do:** "Four service divisions, one dependable team", four interactive glass cards (icon, title, description, three benefit chips, arrow link to each service page).
4. **Featured projects (light section):** three demo project cards with illustrated previews, a "Demo" label, and a link to the full portfolio.
5. **Why Ragophala Digital (dark):** six numbered glass cards.
6. **How we work (light section):** the five process steps as numbered cards.
7. **Final call to action.**

### About (`/about`)
Hero with the crystal scene ("A digital agency focused on practical results") and a "Talk to us" button. Then Mission and Vision cards, four Values (Honest partnership, Reliability, Practical innovation, Performance) on a light section, "Our approach" (start with the business problem, four numbered steps), a Technology and innovation panel with tech chips, and a call to action. Do not invent staff, awards, qualifications or history.

### Services (`/services`)
Hero with the services scene ("Four divisions. One connected digital partner."). Four alternating (left/right) rows, one per service, each with a unique SVG illustration (stacked browser windows, dashboard, neural network, shield with tick), numbered eyebrow, description, benefits checklist, a "Learn more" link (not for Support) and an "Enquire about this service" link to `/contact?service=<key>`. A pointer to the pricing page, then a call to action.

### Web Development (`/web-development`)
Hero with the browser-stack scene and buttons "Request a website quotation" and "View packages". Seven website types: Business, Corporate, Landing pages, E-commerce, Portfolio, Booking websites, Website redesigns. A light section with the four-stage process (Brief and quotation, Structure and design, Development and content, Review and launch) beside four feature tiles (Mobile-first, SEO foundations, Fast loading, Accessible). A package price list linking to Pricing, then a quotation call to action prefilled for web.

### Web Applications (`/web-applications`)
Hero with the dashboard scene and a "Discuss your application" button. Seven offerings: Custom business applications, Management systems, Customer portals, Dashboards, Inventory systems, Booking and management platforms, Custom software solutions. Light section "Scoped, staged and secure" with four steps (Discovery, Scope and quote, Staged delivery, Launch and support). A Security and data protection panel (role-based access, server-side validation, backups, documentation; mentions discussing POPIA during scoping). Call to action prefilled for apps.

### AI & Automation (`/ai-automation`)
Hero with the neural-network scene, headline "Put repetitive work on autopilot", and a "Discuss automation" button. Seven offerings: AI chatbots, Custom AI assistants, Website support agents, WhatsApp automation, Lead capture automation, Business workflow automation, AI integrations. A light "Before / After" comparison explaining time saved and faster responses. A Responsible AI section (approved content only, human hand-over, secrets kept server-side, AI provider running costs quoted up front). Call to action prefilled for AI.

### Pricing (`/pricing`)
Hero with the pricing scene ("Clear pricing in South African rand") and a "Request a custom quotation" button. Six package cards (name, blurb, price with "from", timeline, feature checklist, "Request this package" linking to `/contact?package=<id>`); the Standard package has a "Most requested" badge and a blue glow. Light section with "What is included" and "What costs extra" (domain and hosting, copywriting/photography/video, paid plugins and subscriptions, extra pages/features/revisions, ongoing support plans). A custom-pricing panel for web applications and AI solutions (quotation-based) with a four-step "how to request" list and quote buttons. A pricing and payments FAQ, then a call to action.

### Portfolio (`/portfolio`)
Hero explaining these are clearly labelled demonstration projects. A tabbed filter (All, Websites, Web Applications, AI & Automation) with animated card layout changes and a screen-reader live count. Each card shows a generated SVG project illustration, category, a "Demo project" tag, title and summary, with a tilt/spotlight hover. Call to action.

### Project detail (`/portfolio/[slug]`)
Statically generated for all 8 projects. Back link, category and "Demonstration project" label, title, description, a notice that it is a concept and not a real client project, a "Request something similar" button, a large project illustration, then Technology, Key features and Design goals panels, related projects in the same category, and a call to action. Unknown slugs return 404. Page title and metadata are generated per project.

### Contact (`/contact`)
Hero ("Let's talk about your project") with the globe scene on large screens. A glass form with fields: Full name*, Business name, Email*, Phone number, Service required*, Project budget*, Project description* (minimum 20 characters). It prefills the service from `?service=` and the description from `?package=`. A sidebar with WhatsApp and email links (only when configured), service area (South Africa), reply time (1–2 working days), a "What happens next?" list and a link to pricing.

### FAQ (`/faq`)
Hero, then questions grouped by category in an accessible accordion (one open at a time, `aria-expanded`, animated height), FAQPage JSON-LD structured data, and a call to action.

## 7. Contact form and API

- **Client:** validate with the shared Zod schema before sending. Show per-field error messages with `aria-invalid`/`aria-describedby`, focus the first invalid field, show a loading state ("Sending…") with a disabled button, show a success panel on success (with a "Send another enquiry" button), and show a clear error alert on failure with a WhatsApp fallback link when configured.
- **Server (`POST /api/contact`, Node runtime):** same-origin check, in-memory rate limit (5 submissions per 10 minutes per IP), payload size limit (about 12 KB), JSON parse handling, Zod validation returning field errors (400), hidden honeypot field (bots receive a silent success), minimum-time-to-submit check, HTML-escaped email body, `replyTo` set to the visitor's email, and safe server-side error logging.
- **Email delivery:** Nodemailer over SMTP. If SMTP variables are missing, return 503 with an honest message. **Never fake a successful send.**
- Note in the README that the in-memory rate limiter should be replaced with a shared store (for example Upstash Redis) for multi-instance deployments.

## 8. Configuration (never hardcode, never invent)

Use environment variables and provide `.env.example`:
- `NEXT_PUBLIC_SITE_URL` (canonical URL for metadata and sitemap)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only, international format; WhatsApp buttons are hidden when empty)
- `NEXT_PUBLIC_CONTACT_EMAIL` (shown only when set)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (server-only)

Do not invent a WhatsApp number or business email. Every visible button and link must work.

## 9. SEO, accessibility and performance

- Page-specific titles and descriptions, Open Graph and Twitter metadata, canonical URLs, `en_ZA` locale, ProfessionalService JSON-LD on every page
- `sitemap.xml` (all pages and project pages), `robots.txt` (disallow `/api/`), SVG favicon
- Semantic HTML, one `h1` per page with a logical heading order, keyboard navigation, accessible colour contrast, ARIA on the menu, tabs and accordion
- Security headers: `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy`
- Optimised fonts, lazy-loaded 3D, no oversized assets, no horizontal overflow on any screen from 375px up

## 10. Testing and delivery

Before finishing: run the dev/production server, open every page, test navigation and every button, test form validation, the error path and the API (invalid, valid, rate-limited), test mobile (375px) for horizontal overflow, check the console for errors, and run `npm run typecheck`, `npm run lint` and `npm run build`. Fix everything found.

Finish with a README covering local setup, content editing (`src/lib/site.ts`), the environment variable table, the contact-form protections, the 3D and performance notes, Vercel deployment steps, and a development report listing pages completed, features, technologies, integrations needing credentials, tests run with results, and deployment instructions.

The result must look like a premium, professionally designed agency site: consistent navy and electric-blue identity, distinct layouts per page, restrained and intentional animation, and no placeholder text, fake functionality, fake testimonials or TODO comments.
