"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import styles from "./home-visuals.module.css";

export function WorkflowDepth({ children }: { children: ReactNode }) {
  const surface = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = surface.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio < 0.25) return;
      element.dataset.entered = "true";
      observer.disconnect();
    }, { threshold: 0.25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function tilt(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || !window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    surface.current?.style.setProperty("--tilt-x", `${-y * 4}deg`);
    surface.current?.style.setProperty("--tilt-y", `${x * 4}deg`);
  }

  function reset() {
    surface.current?.style.removeProperty("--tilt-x");
    surface.current?.style.removeProperty("--tilt-y");
  }

  return (
    <div className={styles.depth} onPointerMove={tilt} onPointerLeave={reset} onPointerCancel={reset}>
      <div ref={surface} className={styles.surface}>{children}</div>
    </div>
  );
}
