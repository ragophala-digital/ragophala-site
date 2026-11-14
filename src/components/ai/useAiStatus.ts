"use client";

import { useEffect, useState } from "react";

let cached: Promise<boolean> | null = null;

function load(): Promise<boolean> {
  cached ??= fetch("/api/ai/status", { cache: "no-store" })
    .then((r) => (r.ok ? (r.json() as Promise<{ enabled?: boolean }>) : { enabled: false }))
    .then((d) => Boolean(d.enabled))
    .catch(() => false);
  return cached;
}

/** `null` while checking, then whether live AI is configured on the server. */
export function useAiStatus(): boolean | null {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  useEffect(() => {
    let alive = true;
    load().then((v) => alive && setEnabled(v));
    return () => {
      alive = false;
    };
  }, []);
  return enabled;
}
