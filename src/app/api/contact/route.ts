import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact";
import { emailConfigured } from "@/lib/notify";
import { clientIp, isForeignOrigin, jsonError, logEvent } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";
import { runEnquiryWorkflow } from "@/lib/workflow";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BODY = 14_000;
const MIN_FILL_MS = 3000;

export async function POST(req: Request) {
  if (isForeignOrigin(req)) return jsonError("Request not allowed.", 403);

  const limit = rateLimit(`enquiry:${clientIp(req)}`, 5, 10 * 60_000);
  if (!limit.ok) return jsonError("Too many submissions. Please wait a few minutes and try again.", 429, { retryAfter: limit.retryAfter });

  const text = await req.text();
  if (text.length > MAX_BODY) return jsonError("Your message is too long.", 413);

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return jsonError("Invalid request.", 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) fieldErrors[String(i.path[0])] ??= i.message;
    // A filled honeypot is reported as success so bots learn nothing.
    if (fieldErrors.website) return NextResponse.json({ ok: true });
    return jsonError("Please check the highlighted fields.", 400, { fieldErrors });
  }
  const input = parsed.data;
  if (input.startedAt && Date.now() - input.startedAt < MIN_FILL_MS) {
    return jsonError("That was very quick. Please review your details and submit again.", 400);
  }

  try {
    const outcome = await runEnquiryWorkflow(input);
    // Succeed only if the enquiry is safely saved or the owner was actually notified.
    if (!outcome.stored && !outcome.notified) {
      return jsonError(emailConfigured() ? "We could not process your enquiry right now. Please try again shortly." : "Our enquiry service is not available right now, so your enquiry was not saved.", emailConfigured() ? 502 : 503);
    }
    return NextResponse.json({ ok: true, reference: outcome.reference, stored: outcome.stored, notified: outcome.notified, duplicate: outcome.duplicate });
  } catch (err) {
    logEvent("enquiry.workflow_error", { error: err instanceof Error ? err.message.slice(0, 80) : "unknown" });
    return jsonError("We could not process your enquiry right now. Please try again shortly.", 502);
  }
}
