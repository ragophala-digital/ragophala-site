"use client";

import { usePathname } from "next/navigation";
import { AccentScene } from "@/components/three/lazy";
import { useCapability } from "@/components/three/capability";
import { accentFor } from "@/lib/accent";

/** Decorative 3D motif on the right of inner page heroes. Desktop and capable devices only; adds no content. */
export function HeroAccent() {
  const path = usePathname();
  const { ready, ok, low } = useCapability();
  if (!ready || !ok || low) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] lg:block">
      <AccentScene variant={accentFor(path)} />
    </div>
  );
}
