# Sharing and deploying Ragophala Digital

Three ways to let someone far away see the site, from quickest to most permanent.

## 1. Temporary link from your own PC (about 2 minutes)

Run the production site, then open a tunnel in a second terminal.

```bash
npm run build
npm run start
```

```bash
npx cloudflared tunnel --url http://localhost:3000
```

It prints a public `https://…trycloudflare.com` link. It works only while both terminals are open and your PC is on.

What the link exposes: anyone holding it can use the site, including the AI chat (it uses your Groq key; per-visitor rate limits apply) and the contact form (enquiries are saved on your PC). Send it only to the person you mean to.

## 2. Preview deployment on Vercel (about 10 minutes, free tier)

1. Sign in at vercel.com with the GitHub account that owns `ragophala-digital/ragophala-site`, choose **Add New → Project**, import the repository and keep the default Next.js settings.
2. Before the first deploy, add these **Environment Variables** (Settings → Environment Variables):

| Name | Value | Why |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | the address Vercel gives you (or your domain) | canonical links, sitemap, social previews |
| `NEXT_PUBLIC_NOINDEX` | `true` | stops search engines indexing a preview; remove it at launch |
| `GROQ_API_KEY` | your Groq key | turns on the AI assistant, Smart Intake and the "Ask the AI" sections |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | your number, digits only | WhatsApp buttons (leave out if unverified) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | your business email | shown in the footer and contact page |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL` | your mail account | email you each enquiry |

3. Click **Deploy**. Vercel gives you a link to send.

Important limits on Vercel:

- **Enquiries are not stored durably there.** The server has no permanent disk, so saved enquiries disappear. Set the SMTP values so every enquiry reaches your inbox, or move the store to a hosted database (the functions in `src/lib/enquiry-store.ts` are the only code that needs changing).
- Without SMTP, the contact form will report that it could not confirm delivery, so test it before sending the link.
- The private pricing PDF and `private/catalogue.json` are git-ignored and are never deployed. Keep it that way.

## 3. Your own domain

After a preview works, add the domain in Vercel (Settings → Domains), set `NEXT_PUBLIC_SITE_URL` to it, and delete `NEXT_PUBLIC_NOINDEX`.

## Before sending the link

- Open it yourself on a phone and click through Home, Services, one service page, Contact and the AI chat.
- Check the contact form actually reaches you.
- Rotate the Groq key if it has been shared anywhere outside your own machine.
