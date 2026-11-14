import { NextResponse } from "next/server";
import { aiEnabled } from "@/lib/ai/provider";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Lets the UI know whether live AI is configured, without revealing any configuration. */
export function GET() {
  return NextResponse.json({ enabled: aiEnabled() });
}
