import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/contact";
import { SERVICE_OPTIONS } from "@/lib/site";

export const runtime = "nodejs";

// Simple in-memory rate limit (per server instance). Use a shared store such as Upstash Redis for multi-instance scale.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function POST(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "Request not allowed." }, { status: 403 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many submissions. Please wait a few minutes and try again." }, { status: 429 });
  }

  const text = await req.text();
  if (text.length > 12_000) return NextResponse.json({ error: "Your message is too long." }, { status: 413 });

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) fieldErrors[String(i.path[0])] ??= i.message;
    // A filled honeypot is reported as success so bots learn nothing.
    if (fieldErrors.website) return NextResponse.json({ ok: true });
    return NextResponse.json({ error: "Please check the highlighted fields.", fieldErrors }, { status: 400 });
  }
  const d = parsed.data;
  if (d.startedAt && Date.now() - d.startedAt < 3000) {
    return NextResponse.json({ error: "That was very quick. Please review your details and submit again." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    console.error("Contact form: SMTP environment variables are not configured.");
    return NextResponse.json({ error: "Our email service is not available right now, so your enquiry was not sent." }, { status: 503 });
  }

  const serviceLabel = SERVICE_OPTIONS.find((s) => s.value === d.service)?.label ?? d.service;
  try {
    const transport = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT ?? 587), secure: Number(SMTP_PORT) === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
    await transport.sendMail({
      from: CONTACT_FROM_EMAIL ?? SMTP_USER,
      to: CONTACT_TO_EMAIL,
      replyTo: d.email,
      subject: `New enquiry: ${serviceLabel} – ${d.name}`,
      text: `Name: ${d.name}\nBusiness: ${d.business || "-"}\nEmail: ${d.email}\nPhone: ${d.phone || "-"}\nService: ${serviceLabel}\nBudget: ${d.budget}\n\n${d.message}${d.extra ? `\n\nAdditional information:\n${d.extra}` : ""}`,
      html: `<h2>New website enquiry</h2><p><b>Name:</b> ${esc(d.name)}<br><b>Business:</b> ${esc(d.business || "-")}<br><b>Email:</b> ${esc(d.email)}<br><b>Phone:</b> ${esc(d.phone || "-")}<br><b>Service:</b> ${esc(serviceLabel)}<br><b>Budget:</b> ${esc(d.budget)}</p><p>${esc(d.message).replace(/\n/g, "<br>")}</p>${d.extra ? `<p><b>Additional information:</b><br>${esc(d.extra).replace(/\n/g, "<br>")}</p>` : ""}`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form: failed to send email", err);
    return NextResponse.json({ error: "We could not send your enquiry right now. Please try again shortly." }, { status: 502 });
  }
}
