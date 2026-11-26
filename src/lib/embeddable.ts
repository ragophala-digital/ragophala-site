import { SITE } from "@/lib/site";

/**
 * Can this site be shown inside a frame on our pages? Reads the site's own headers, once an hour.
 * A site blocks framing with X-Frame-Options, or with a frame-ancestors rule that leaves us out.
 * Any failure counts as "no", so the page falls back to screenshots and never breaks.
 */
export function framingAllowed(headers: Pick<Headers, "get">, origin: string): boolean {
  if (headers.get("x-frame-options")) return false;
  const csp = headers.get("content-security-policy") ?? "";
  const rule = /(?:^|;)\s*frame-ancestors\s+([^;]*)/i.exec(csp)?.[1];
  if (rule === undefined) return true;
  const sources = rule.trim().split(/\s+/);
  return sources.some((s) => s === "*" || s.replace(/\/$/, "") === origin);
}

export async function isEmbeddable(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { redirect: "follow", next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) });
    void res.body?.cancel();
    return res.ok && framingAllowed(res.headers, new URL(SITE.url).origin);
  } catch {
    return false;
  }
}
