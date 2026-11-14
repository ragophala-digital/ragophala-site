/**
 * Small in-memory sliding-window limiter. It is per server instance: for a multi-instance
 * deployment replace the Map with a shared store such as Upstash Redis.
 */
const buckets = new Map<string, number[]>();

export interface LimitResult {
  ok: boolean;
  retryAfter: number;
}

export function rateLimit(key: string, max: number, windowMs: number): LimitResult {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  if (hits.length >= max) {
    buckets.set(key, hits);
    return { ok: false, retryAfter: Math.ceil((windowMs - (now - hits[0])) / 1000) };
  }
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (v.every((t) => now - t >= windowMs)) buckets.delete(k);
  }
  return { ok: true, retryAfter: 0 };
}
