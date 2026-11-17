"use client";

import { useEffect, useRef, useState } from "react";

export interface Capability {
  ready: boolean;
  ok: boolean;
  low: boolean;
  /** Phone-sized viewport: heavy 3D should not even be downloaded. */
  narrow: boolean;
}

/** Detects WebGL support, reduced motion and weaker devices. `ready` flips true after the first check. */
export function useCapability(): Capability {
  const [state, setState] = useState<Capability>({ ready: false, ok: false, low: false, narrow: false });
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    const cores = navigator.hardwareConcurrency ?? 4;
    setState({ ready: true, ok: webgl && !reduce, low: window.innerWidth < 768 || cores <= 4, narrow: window.innerWidth < 768 });
  }, []);
  return state;
}

export function useInView<T extends HTMLElement>(margin = "120px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return { ref, visible };
}
