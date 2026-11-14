"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/** Gently pulls its child toward the cursor. Desktop pointers only; use on one or two key actions. */
export function Magnetic({ children, strength = 0.25, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });
  const fine = useRef(false);
  useEffect(() => {
    fine.current = window.matchMedia(FINE_POINTER).matches;
  }, []);
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!fine.current || reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div ref={ref} style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={leave} className={cn("inline-block", className)}>
      {children}
    </motion.div>
  );
}

/** Soft light that follows the cursor inside its relatively-positioned parent. Desktop pointers only. */
export function CursorGlow({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent || reduce || !window.matchMedia(FINE_POINTER).matches) return;
    const move = (e: globalThis.PointerEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--gx", `${e.clientX - r.left}px`);
      el.style.setProperty("--gy", `${e.clientY - r.top}px`);
      el.style.opacity = "1";
    };
    const leave = () => {
      el.style.opacity = "0";
    };
    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerleave", leave);
    return () => {
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
    };
  }, [reduce]);
  return <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500", className)} style={{ background: "radial-gradient(420px circle at var(--gx, 50%) var(--gy, 50%), rgba(49,91,250,.2), transparent 60%)" }} />;
}

/** Moves its child at a different rate to the page scroll. */
export function Parallax({ children, speed = 0.15, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 120, speed * -120]);
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}

/** Subtle 3D tilt toward the pointer. */
export function Tilt({ children, max = 5, className }: { children: ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || !ref.current || e.pointerType !== "mouse") return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
    rx.set((0.5 - (e.clientY - r.top) / r.height) * max * 2);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
  };
  return (
    <motion.div ref={ref} onPointerMove={move} onPointerLeave={leave} style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }} className={className}>
      {children}
    </motion.div>
  );
}

/** Renders fixed-size design content scaled to fit its container width. */
export function ScaleToFit({ designWidth, designHeight, children, className }: { designWidth: number; designHeight: number; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / designWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);
  return (
    <div ref={ref} className={cn("relative w-full overflow-hidden", className)} style={{ height: designHeight * scale }}>
      <div style={{ width: designWidth, height: designHeight, transform: `scale(${scale})`, transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}
