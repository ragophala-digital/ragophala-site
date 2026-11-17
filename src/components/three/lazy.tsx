"use client";

import dynamic from "next/dynamic";
import { SceneFallback } from "./Fallback";

export const HeroScene = dynamic(() => import("./scenes").then((m) => ({ default: m.HeroScene })), {
  ssr: false,
  loading: () => <SceneFallback />,
});

export const WebScene3D = dynamic(() => import("./service-scenes").then((m) => ({ default: m.WebScene3D })), { ssr: false, loading: () => <SceneFallback /> });
export const AppsScene3D = dynamic(() => import("./service-scenes").then((m) => ({ default: m.AppsScene3D })), { ssr: false, loading: () => <SceneFallback /> });
export const AiScene3D = dynamic(() => import("./service-scenes").then((m) => ({ default: m.AiScene3D })), { ssr: false, loading: () => <SceneFallback /> });
export const AutomationScene3D = dynamic(() => import("./service-scenes").then((m) => ({ default: m.AutomationScene3D })), { ssr: false, loading: () => <SceneFallback /> });
export const MenuScene = dynamic(() => import("./scenes").then((m) => ({ default: m.MenuScene })), { ssr: false, loading: () => <SceneFallback /> });
export const LabScene = dynamic(() => import("./lab-scene").then((m) => ({ default: m.LabScene })), { ssr: false, loading: () => <SceneFallback /> });
export const AccentScene = dynamic(() => import("./accent-scenes").then((m) => ({ default: m.AccentScene })), { ssr: false, loading: () => null });
