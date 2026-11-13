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

Until SMTP is configured, the contact form validates input and then shows an honest error with a WhatsApp fallback (when configured). It never pretends an email was sent.

## Contact form protections

Zod validation on client and server, honeypot field, minimum time-to-submit check, same-origin check, payload size limit, and an in-memory rate limit (5 per 10 minutes per IP). For multi-instance deployments, replace the rate limiter with a shared store such as Upstash Redis.

## 3D and performance

3D scenes (`src/components/three/scenes.tsx`) are code-split and loaded client-side only. They pause when off-screen, use a lower pixel ratio and fewer objects on small or low-core devices, and fall back to a lightweight CSS illustration when WebGL is unavailable or `prefers-reduced-motion` is set.

## Deploy to Vercel

1. Push the project to a Git repository and import it in Vercel.
2. Add the environment variables above (Project Settings → Environment Variables).
3. Deploy. Set `NEXT_PUBLIC_SITE_URL` to your production domain and redeploy so the sitemap and canonical URLs are correct.
4. Send a test enquiry from `/contact` to confirm email delivery.

## Notes

- Portfolio items are clearly labelled demonstration projects, not real client work. Replace them in `PROJECTS` when real case studies are available.
- `npm audit` reports a PostCSS advisory bundled inside Next.js 15.5.x; the only fix is the Next.js 16 major upgrade. It affects build-time CSS processing of untrusted CSS, which this site does not do.
