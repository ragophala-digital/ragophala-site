"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import { SceneFallback } from "./Fallback";
import { useCapability } from "./capability";

const HeroSceneInner = dynamic(() => import("./scenes").then((m) => ({ default: m.HeroScene })), {
  ssr: false,
  loading: () => <SceneFallback />,
});

/** On phones and without WebGL the 3D bundle is never downloaded; a lightweight static composition is shown instead. */
export function HeroScene() {
  const { ready, ok, narrow } = useCapability();
  if (!ready || !ok || narrow) return <SceneFallback />;
  return <HeroSceneInner />;
}

export const WebScene3D = dynamic(() => import("./service-scenes").then((m) => ({ default: m.WebScene3D })), { ssr: false, loading: () => <SceneFallback /> });
export const AppsScene3D = dynamic(() => import("./service-scenes").then((m) => ({ default: m.AppsScene3D })), { ssr: false, loading: () => <SceneFallback /> });
export const AiScene3D = dynamic(() => import("./service-scenes").then((m) => ({ default: m.AiScene3D })), { ssr: false, loading: () => <SceneFallback /> });
export const AutomationScene3D = dynamic(() => import("./service-scenes").then((m) => ({ default: m.AutomationScene3D })), { ssr: false, loading: () => <SceneFallback /> });
const MenuSceneInner = dynamic(() => import("./scenes").then((m) => ({ default: m.MenuScene })), { ssr: false, loading: () => <SceneFallback /> });

export function MenuScene() {
  const { ready, ok, narrow } = useCapability();
  if (!ready || !ok || narrow) return <SceneFallback />;
  return <MenuSceneInner />;
}
const LabSceneInner = dynamic(() => import("./lab-scene").then((m) => ({ default: m.LabScene })), { ssr: false, loading: () => <SceneFallback /> });

/** Phones get the static composition; the package picker beside it still works. */
export function LabScene(props: ComponentProps<typeof LabSceneInner>) {
  const { ready, ok, narrow } = useCapability();
  if (!ready || !ok || narrow) return <SceneFallback />;
  return <LabSceneInner {...props} />;
}
export const AccentScene = dynamic(() => import("./accent-scenes").then((m) => ({ default: m.AccentScene })), { ssr: false, loading: () => null });
