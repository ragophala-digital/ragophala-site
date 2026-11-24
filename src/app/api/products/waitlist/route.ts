import { NextResponse } from "next/server";
import { clientIp, isForeignOrigin, jsonError, logEvent } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";
import { waitlistSchema } from "@/lib/products/waitlist";
import { getWaitlistStore } from "@/lib/products/waitlist-store";

export const runtime = "nodejs";

const MAX_BODY = 4_000;
const MIN_FILL_MS = 2000;

export async function POST(req: Request) {
  if (isForeignOrigin(req)) return jsonError("Request not allowed.", 403);

  const limit = rateLimit(`waitlist:${clientIp(req)}`, 6, 10 * 60_000);
  if (!limit.ok) return jsonError("Too many attempts. Please wait a few minutes and try again.", 429, { retryAfter: limit.retryAfter });

  const raw = await req.text();
  if (raw.length > MAX_BODY) return jsonError("Your message is too long.", 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return jsonError("Invalid request.", 400);
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const i of parsed.error.issues) fieldErrors[String(i.path[0])] ??= i.message;
    // A filled honeypot looks like success to bots.
    if (fieldErrors.website) return NextResponse.json({ ok: true });
    return jsonError("Please check the highlighted fields.", 400, { fieldErrors });
  }
  const input = parsed.data;
  if (input.startedAt && Date.now() - input.startedAt < MIN_FILL_MS) return jsonError("That was very quick. Please review your details and submit again.", 400);

  try {
    const result = await getWaitlistStore().add(input);
    logEvent("waitlist.add", { product: input.product, status: result.status });
    return NextResponse.json({ ok: true, duplicate: result.status === "duplicate" });
  } catch (err) {
    logEvent("waitlist.store_error", { error: err instanceof Error ? err.message.slice(0, 80) : "unknown" });
    // Never claim success when nothing was stored.
    return jsonError("We could not save your registration right now. Please try again shortly or contact us directly.", 503);
  }
}
