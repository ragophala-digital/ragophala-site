import { NextResponse } from "next/server";
import { z } from "zod";
import { analyseIntake } from "@/lib/ai/analyse";
import { AIError } from "@/lib/ai/provider";
import { clientIp, isForeignOrigin, jsonError, logEvent } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const maxDuration = 60;

const schema = z.object({
  description: z.string().trim().min(20, "Please describe your idea in at least 20 characters.").max(2500),
  answers: z.array(z.string().trim().max(500)).max(3).default([]),
});

/** Analyses a described idea and returns follow-up questions or a structured, editable project brief. Nothing is stored here. */
export async function POST(req: Request) {
  if (isForeignOrigin(req)) return jsonError("Request not allowed.", 403);
  const limit = rateLimit(`intake:${clientIp(req)}`, 8, 10 * 60_000);
  if (!limit.ok) return jsonError("Please wait a few minutes before analysing another idea, or use the project form.", 429, { retryAfter: limit.retryAfter });

  const body = await req.text();
  if (body.length > 9000) return jsonError("That description is too long.", 413);
  let json: unknown;
  try {
    json = JSON.parse(body);
  } catch {
    return jsonError("Invalid request.", 400);
  }
  const parsed = schema.safeParse(json);
  if (!parsed.success) return jsonError(parsed.error.issues[0]?.message ?? "Invalid request.", 400);

  try {
    const result = await analyseIntake(parsed.data.description, parsed.data.answers.filter(Boolean));
    logEvent("ai.intake", { status: result.status, source: result.status === "ready" ? result.brief.source : "ai" });
    return NextResponse.json(result);
  } catch (err) {
    if (err instanceof AIError && err.code === "rate_limited") return jsonError("The consultant is busy right now. Please try again shortly, or use the project form.", 429, { retryAfter: err.retryAfter });
    return jsonError("The consultant is temporarily unavailable. Please use the project form instead.", 503);
  }
}
