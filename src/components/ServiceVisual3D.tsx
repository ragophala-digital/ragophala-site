"use client";

import type { ComponentType, ReactNode } from "react";
import { AiScene3D, AppsScene3D, AutomationScene3D, WebScene3D } from "@/components/three/lazy";
import { useCapability } from "@/components/three/capability";
import type { ServiceKey } from "@/lib/services";

const SCENES: Partial<Record<ServiceKey, ComponentType>> = { web: WebScene3D, apps: AppsScene3D, ai: AiScene3D, automation: AutomationScene3D };

/** Signature 3D visual for a service on capable desktops; the supplied fallback elsewhere. */
export function ServiceVisual3D({ kind, fallback }: { kind: ServiceKey; fallback: ReactNode }) {
  const { ready, ok, low } = useCapability();
  if (!ready) return <div aria-busy="true" className="aspect-[4/3] w-full animate-pulse rounded-2xl bg-navy/90" />;
  if (!ok || low) return <>{fallback}</>;
  const Scene = SCENES[kind];
  if (!Scene) return <>{fallback}</>;
  return (
    <div className="theme-dark relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-navy">
      <div aria-hidden className="grid-lines absolute inset-0 opacity-60" />
      <div aria-hidden className="absolute -right-10 top-0 h-64 w-64 rounded-full bg-cobalt/25 blur-[90px]" />
      <div className="relative h-full w-full"><Scene /></div>
    </div>
  );
}
