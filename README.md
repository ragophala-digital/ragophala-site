# Ragophala Digital website

Next.js 15 (App Router) · TypeScript · Tailwind CSS · React Three Fiber + Drei · Framer Motion · Lucide · Zod · Nodemailer

The original static HTML site is preserved in `legacy/` for reference. The old image crops live in `assets/`.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
```

Quality checks: `npm run typecheck`, `npm run lint`, `npm run build`.

## Editing content

All copy, prices, services, FAQs and demo projects are in `src/lib/site.ts`. Package prices (`PACKAGES`) are editable starting values.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Canonical URL for metadata, sitemap and robots |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Optional | Digits only, international format (e.g. `27XXXXXXXXX`). WhatsApp buttons are hidden when empty |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional | Public email shown in the footer and contact page. Hidden when empty |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Yes for the contact form | SMTP credentials (server-side only) |
| `CONTACT_TO_EMAIL` | Yes for the contact form | Inbox that receives enquiries |
| `CONTACT_FROM_EMAIL` | Optional | From address (defaults to `SMTP_USER`) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Enables cookieless Plausible analytics and conversion events (enquiry sent, Smart Intake sent). Disabled when empty |
| `GROQ_API_KEY` | For AI features | Server-side only. Without it the assistant is hidden and demos use scripted or rule-based fallbacks |

Until SMTP is configured, the contact form validates input and then shows an honest error with a WhatsApp fallback (when configured). It never pretends an email was sent.

## Contact form protections

Zod validation on client and server, honeypot field, minimum time-to-submit check, same-origin check, payload size limit, and an in-memory rate limit (5 per 10 minutes per IP). For multi-instance deployments, replace the rate limiter with a shared store such as Upstash Redis.

## RAGOPHALA AI, Smart Intake and enquiry automation

All AI calls happen on the server (`src/lib/ai/provider.ts`, Groq's OpenAI-compatible API). The key never reaches the browser.

| Feature | Route / page | Notes |
| --- | --- | --- |
| RAGOPHALA AI assistant | floating button, `POST /api/ai/chat` | Streams replies. Knowledge is built from `src/lib/pricing.ts` and `src/lib/site.ts`, so prices stay accurate. Hidden when no key is set. |
| Smart Intake | `/smart-intake`, `POST /api/ai/intake` | Idea in plain language, optional follow-up questions, editable brief, consent, then submit. Prices in the brief are looked up from the catalogue, never taken from the model. |
| Demonstration centre | `/ai-automation#demo` | Demo assistant (fictional guesthouse), lead qualification demo (saves nothing), workflow explanation. |
| Enquiry automation | `POST /api/contact` | Validate, consent, de-duplicate, store, AI analysis (category, priority, summary, follow-up draft), email owner with retries. Falls back to keyword rules if AI is unavailable. |
| Admin list | `GET /api/admin/enquiries` | Disabled unless `ADMIN_TOKEN` (24+ characters) is set. Send `Authorization: Bearer <token>`. |
| Privacy information | `/privacy` | Describes what is stored and for how long. |

Environment variables: `GROQ_API_KEY`, `GROQ_MODEL`, `GROQ_API_URL` (optional), `ENQUIRY_DATA_DIR`, `DATA_RETENTION_DAYS`, `ADMIN_TOKEN`. See `.env.example`.

Things to know:
- **Model:** set `GROQ_MODEL` to a model your key can use. `GET https://api.groq.com/openai/v1/models` lists them. If the configured model returns 404, the server picks an available one automatically and logs `ai.model_unavailable`.
- **Free tier limits** are per model (requests and tokens per minute and day) and shared by all visitors, so a busy site can hit them. The UI shows a friendly message on HTTP 429, and Smart Intake and qualification fall back to keyword rules.
- **Privacy:** email addresses and phone numbers are removed from text before it is sent to the AI provider. Chats are not stored on the server. Enquiries are saved only after consent and are deleted after `DATA_RETENTION_DAYS`.
- **Storage:** enquiries are saved to `.data/enquiries.json` (git-ignored, owner-only file permissions, no public route). This suits a VPS or local use. On Vercel or other serverless hosts the filesystem is not persistent: replace `src/lib/enquiry-store.ts` with a hosted database (for example Postgres) before going live.
- **Email:** "notified" is only reported when the SMTP server accepts the message. Temporary failures are retried three times. Configure `SMTP_*` and `CONTACT_TO_EMAIL`.
- **Rate limits** are in memory per server instance; use a shared store such as Upstash Redis for multi-instance deployments.

## Design system

Palette: Midnight Navy `#101827`, Warm Ivory `#F5F3EF`, Electric Blue `#315BFA`, Soft Blue `#DCE5FF`, Charcoal `#242B39`, Slate `#A7B1C2` (tokens in `tailwind.config.ts` and `src/app/globals.css`). Fonts: Sora (headings), Inter (body), JetBrains Mono (labels). Sections switch theme with `theme-dark` / `theme-soft` classes that remap the `--fg`, `--muted` and `--line` variables.

## 3D and performance

3D is used only on the home hero (`src/components/three/scenes.tsx`): a chrome ring, glass sphere and geometric cubes. It is code-split, pauses off-screen, uses a lighter version on phones and low-core devices, and falls back to a CSS composition when WebGL is unavailable or reduced motion is requested. Other pages use HTML/CSS interface mockups (`mockups-*.tsx`), which are labelled as illustrative.

## Pages

Home, Services, Website Development, Web Applications, AI Agents and Automation, Pricing, About, Our Process, Contact, FAQ, plus Selected Concepts (`/portfolio`), Insights (`/insights`, articles live in `src/lib/insights.ts`), Smart Intake, Privacy and Terms. Error, loading and 404 pages are in `src/app`.

## Tests and CI

```bash
npm test          # Vitest unit tests in tests/
npm run typecheck
npm run lint
```

GitHub Actions (`.github/workflows/ci.yml`) runs typecheck, lint, tests and build on every push and pull request. Never put real keys in `.env.example`; use `.env` (git-ignored).

## Deploy to Vercel

1. Push the project to a Git repository and import it in Vercel.
2. Add the environment variables above (Project Settings → Environment Variables).
3. Deploy. Set `NEXT_PUBLIC_SITE_URL` to your production domain and redeploy so the sitemap and canonical URLs are correct.
4. Send a test enquiry from `/contact` to confirm email delivery.

## Notes

- Portfolio items are clearly labelled demonstration projects, not real client work. Replace them in `PROJECTS` when real case studies are available.
- `npm audit` reports a PostCSS advisory bundled inside Next.js 15.5.x; the only fix is the Next.js 16 major upgrade. It affects build-time CSS processing of untrusted CSS, which this site does not do.
