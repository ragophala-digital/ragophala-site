"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AiAssistant = dynamic(() => import("./AiAssistant").then((m) => ({ default: m.AiAssistant })), { ssr: false });

/** Loads the chat assistant only once the page is idle, so it never competes with first paint and interaction. */
export function LazyAssistant() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (idle) {
      idle(() => setReady(true), { timeout: 3500 });
      return;
    }
    const t = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(t);
  }, []);
  return ready ? <AiAssistant /> : null;
}
