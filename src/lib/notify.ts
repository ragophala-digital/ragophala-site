import nodemailer from "nodemailer";
import { categoryLabel } from "./ai/analyse";
import type { EnquiryRecord } from "./enquiry-store";
import { SERVICE_OPTIONS } from "./site";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
const nl = (s: string) => esc(s).replace(/\n/g, "<br>");
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const emailConfigured = () => Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.CONTACT_TO_EMAIL);

function compose(r: EnquiryRecord) {
  const service = SERVICE_OPTIONS.find((s) => s.value === r.service)?.label ?? r.service;
  const a = r.analysis;
  const b = r.brief;
  const lines = [
    `New enquiry (${r.source === "smart-intake" ? "Smart Intake" : "contact form"}) · reference ${r.id.slice(0, 8)}`,
    a ? `Classification: ${categoryLabel(a.category)} · Priority: ${a.priority.toUpperCase()} (${a.priorityReason}) · analysed by ${a.source === "ai" ? "AI" : "rules"}` : "",
    a ? `Summary: ${a.summary}` : "",
    "",
    `Name: ${r.name}`,
    `Business: ${r.business || "-"}`,
    `Email: ${r.email}`,
    `Phone: ${r.phone || "-"}`,
    `Service: ${service}`,
    `Budget: ${r.budget}`,
    "",
    r.message,
    r.extra ? `\nAdditional information:\n${r.extra}` : "",
    b ? `\nProject brief (${b.source === "ai" ? "AI-assisted, visitor reviewed" : "automatic, visitor reviewed"}):\nOverview: ${b.overview}\nRecommended: ${b.recommendedSolution}\nRequirements: ${b.requirements.join("; ")}\nIndicative: ${b.indicativeItems.map((i) => `${i.name} (${i.price})`).join("; ") || "-"}\nBudget category: ${b.budgetCategory}` : "",
    a ? `\nSuggested follow-up message:\n${a.followUp}` : "",
  ];
  const text = lines.join("\n");
  const html =
    `<div style="font-family:system-ui,sans-serif;max-width:640px"><h2>New enquiry</h2>` +
    `<p style="color:#566075">${r.source === "smart-intake" ? "Smart Intake" : "Contact form"} · reference ${esc(r.id.slice(0, 8))}</p>` +
    (a ? `<p><b>${esc(categoryLabel(a.category))}</b> · priority <b>${esc(a.priority.toUpperCase())}</b><br><i>${esc(a.priorityReason)}</i><br>Analysed by ${a.source === "ai" ? "AI" : "keyword rules"}</p><p>${esc(a.summary)}</p>` : "") +
    `<hr><p><b>Name:</b> ${esc(r.name)}<br><b>Business:</b> ${esc(r.business || "-")}<br><b>Email:</b> ${esc(r.email)}<br><b>Phone:</b> ${esc(r.phone || "-")}<br><b>Service:</b> ${esc(service)}<br><b>Budget:</b> ${esc(r.budget)}</p>` +
    `<p>${nl(r.message)}</p>` +
    (r.extra ? `<p><b>Additional information:</b><br>${nl(r.extra)}</p>` : "") +
    (b ? `<hr><h3>Project brief</h3><p>${esc(b.overview)}</p><p><b>Recommended:</b> ${esc(b.recommendedSolution)}</p><ul>${b.requirements.map((x) => `<li>${esc(x)}</li>`).join("")}</ul><p><b>Indicative:</b> ${esc(b.indicativeItems.map((i) => `${i.name} (${i.price})`).join("; ") || "-")}<br><b>Budget category:</b> ${esc(b.budgetCategory)}</p>` : "") +
    (a ? `<hr><p><b>Suggested follow-up</b></p><p>${nl(a.followUp)}</p>` : "") +
    `</div>`;
  return { subject: `${a ? `[${a.priority.toUpperCase()}] ` : ""}New enquiry: ${service} – ${r.name}`, text, html };
}

export interface NotifyResult {
  status: "sent" | "failed" | "skipped";
  attempts: number;
  error?: string;
}

/** Sends the owner notification, retrying temporary failures. "sent" means the mail server accepted the message. */
export async function notifyOwner(rec: EnquiryRecord): Promise<NotifyResult> {
  if (!emailConfigured()) return { status: "skipped", attempts: 0, error: "SMTP not configured" };
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  const transport = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT ?? 587), secure: Number(SMTP_PORT) === 465, auth: { user: SMTP_USER, pass: SMTP_PASS }, connectionTimeout: 10_000, socketTimeout: 15_000 });
  const mail = compose(rec);
  const delays = [0, 1200, 3500];
  let lastError = "";
  for (let i = 0; i < delays.length; i++) {
    if (delays[i]) await sleep(delays[i]);
    try {
      const info = await transport.sendMail({ from: CONTACT_FROM_EMAIL ?? SMTP_USER, to: CONTACT_TO_EMAIL, replyTo: rec.email, messageId: `<${rec.id}@enquiry.local>`, ...mail });
      if (info.accepted.length > 0) return { status: "sent", attempts: i + 1 };
      lastError = "no recipient accepted the message";
    } catch (err) {
      const code = (err as { code?: string }).code;
      lastError = (code ?? (err instanceof Error ? err.message : "")).slice(0, 160) || "send failed";
    }
  }
  return { status: "failed", attempts: delays.length, error: lastError };
}
