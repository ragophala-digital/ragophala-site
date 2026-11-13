"use client";

import dynamic from "next/dynamic";
import { SceneFallback } from "./Fallback";

export const HeroScene = dynamic(() => import("./scenes").then((m) => ({ default: m.HeroScene })), {
  ssr: false,
  loading: () => <SceneFallback />,
});
