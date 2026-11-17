import { qualify } from "./ai/analyse";
import type { ContactInput } from "./contact";
import { addEnquiry, fingerprint, findRecentDuplicate, newId, updateEnquiry, type EnquiryRecord } from "./enquiry-store";
import { logEvent } from "./http";
import { notifyOwner } from "./notify";

export interface WorkflowOutcome {
  reference: string;
  duplicate: boolean;
  stored: boolean;
  analysed: boolean;
  notified: boolean;
}

const DUPLICATE_WINDOW_MS = 15 * 60_000;

/**
 * Server-side enquiry automation:
 * validate (done by caller) → de-duplicate → store → AI analysis → classify and prioritise → notify owner.
 */
export async function runEnquiryWorkflow(input: ContactInput): Promise<WorkflowOutcome> {
  const fp = fingerprint(input.email, input.message);
  const dup = await findRecentDuplicate(fp, DUPLICATE_WINDOW_MS);
  if (dup) {
    logEvent("enquiry.duplicate", { ref: dup.id.slice(0, 8) });
    return { reference: dup.id.slice(0, 8), duplicate: true, stored: true, analysed: Boolean(dup.analysis), notified: dup.notification.status === "sent" };
  }

  const now = new Date().toISOString();
  const rec: EnquiryRecord = {
    id: newId(),
    createdAt: now,
    consentAt: now,
    fingerprint: fp,
    source: input.source,
    name: input.name,
    business: input.business,
    email: input.email,
    phone: input.phone,
    service: input.service,
    budget: input.budget,
    contactMethod: input.contactMethod,
    message: input.message,
    extra: input.extra,
    brief: input.brief,
    notification: { status: "pending", attempts: 0 },
  };

  let stored = true;
  try {
    await addEnquiry(rec);
  } catch (err) {
    stored = false;
    logEvent("enquiry.store_failed", { error: err instanceof Error ? err.message.slice(0, 80) : "unknown" });
  }

  const analysis = await qualify(`${input.message}\n${input.extra}\n${input.brief?.overview ?? ""}`, { budget: input.budget, service: input.service });
  rec.analysis = analysis;
  if (stored) await updateEnquiry(rec.id, { analysis }).catch(() => undefined);

  const result = await notifyOwner(rec);
  rec.notification = { status: result.status, attempts: result.attempts, at: new Date().toISOString(), error: result.error };
  if (stored) await updateEnquiry(rec.id, { notification: rec.notification }).catch(() => undefined);

  logEvent("enquiry.processed", { ref: rec.id.slice(0, 8), source: input.source, category: analysis.category, priority: analysis.priority, analysedBy: analysis.source, stored, notification: result.status });
  return { reference: rec.id.slice(0, 8), duplicate: false, stored, analysed: true, notified: result.status === "sent" };
}
