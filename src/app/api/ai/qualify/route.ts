import { NextResponse } from "next/server";
import { z } from "zod";
import { qualify } from "@/lib/ai/analyse";
import { BUDGETS } from "@/lib/site";
import { clientIp, isForeignOrigin, jsonError } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 45;

const schema = z.object({
  text: z.string().trim().min(15, "Please describe the enquiry in at least 15 characters.").max(1200),
  budget: z.enum(BUDGETS as unknown as [string, ...string[]]).optional(),
});

/** Demonstration only: classifies sample text. Nothing is stored and no email is sent. */
export async function POST(req: Request) {
  if (isForeignOrigin(req)) return jsonError("Request not allowed.", 403);
  const ip = clientIp(req);
  const limit = rateLimit(`qualify:${ip}`, 8, 60_000);
  if (!limit.ok) return jsonError("Please wait a moment before trying another sample.", 429, { retryAfter: limit.retryAfter });
  const body = await req.text();
  if (body.length > 4000) return jsonError("That sample is too long.", 413);
  let json: unknown;
  try {
    json = JSON.parse(body);
  } catch {
    return jsonError("Invalid request.", 400);
  }
  const parsed = schema.safeParse(json);
  if (!parsed.success) return jsonError(parsed.error.issues[0]?.message ?? "Invalid request.", 400);
  const result = await qualify(parsed.data.text, { budget: parsed.data.budget });
  return NextResponse.json({ demo: true, result });
}
