import { NextResponse } from "next/server";

export function clientIp(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

/** True when a cross-origin browser request is being made. Requests without an Origin header (same-origin GET, curl) pass. */
export function isForeignOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

export const jsonError = (error: string, status: number, extra?: Record<string, unknown>) => NextResponse.json({ error, ...extra }, { status });

/** Structured log line with no personal data. */
export function logEvent(event: string, data: Record<string, string | number | boolean | undefined> = {}) {
  console.info(JSON.stringify({ at: new Date().toISOString(), event, ...data }));
}
