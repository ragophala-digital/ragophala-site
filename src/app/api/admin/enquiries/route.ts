import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { listEnquiries } from "@/lib/enquiry-store";
import { clientIp, jsonError } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorised(req: Request, token: string): boolean {
  const header = req.headers.get("authorization") ?? "";
  const supplied = header.startsWith("Bearer ") ? header.slice(7) : "";
  const a = Buffer.from(supplied);
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Owner-only list of stored enquiries. Disabled unless ADMIN_TOKEN is set; visitors have no way to read enquiries. */
export async function GET(req: Request) {
  const token = process.env.ADMIN_TOKEN;
  if (!token || token.length < 24) return jsonError("Not found.", 404);
  if (!rateLimit(`admin:${clientIp(req)}`, 20, 60_000).ok) return jsonError("Too many requests.", 429);
  if (!authorised(req, token)) return jsonError("Unauthorised.", 401);
  const enquiries = await listEnquiries(200);
  return NextResponse.json({ count: enquiries.length, enquiries }, { headers: { "Cache-Control": "no-store" } });
}
