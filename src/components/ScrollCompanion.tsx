"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useCapability } from "@/components/three/capability";

const CompanionScene = dynamic(() => import("@/components/three/companion").then((m) => ({ default: m.CompanionScene })), { ssr: false });

/** Narrower screens have no spare margin beside the content, so the companion would sit on top of it. */
const MIN_WIDTH = 1366;

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

/** True when the visitor asked to save data or is on a slow connection. */
function isConstrained() {
  const c = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  return !!c && (c.saveData === true || c.effectiveType === "2g" || c.effectiveType === "slow-2g" || c.effectiveType === "3g");
}

/**
 * A small 3D companion that rides the right margin and reshapes as the visitor scrolls.
 * Decorative only. It downloads nothing until the page has loaded and the browser is idle,
 * and never on small screens, reduced motion, no WebGL or a saving-data connection.
 */
export function ScrollCompanion() {
  const { ready, ok } = useCapability();
  const [go, setGo] = useState(false);

  useEffect(() => {
    if (!ready || !ok || window.innerWidth < MIN_WIDTH || isConstrained()) return;
    const start = () => setGo(true);
    const idle = typeof window.requestIdleCallback === "function";
    const id = idle ? window.requestIdleCallback(start, { timeout: 2500 }) : window.setTimeout(start, 1500);
    return () => (idle ? window.cancelIdleCallback(id) : window.clearTimeout(id));
  }, [ready, ok]);

  if (!go) return null;
  return (
    <div aria-hidden className="companion pointer-events-none fixed right-0 top-1/2 z-10 hidden h-[360px] w-[120px] -translate-y-1/2 min-[1366px]:block">
      <CompanionScene />
    </div>
  );
}
