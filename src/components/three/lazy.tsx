"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { SceneFallback } from "./Fallback";

type SceneName = "HeroScene" | "WebScene" | "AppScene" | "AIScene" | "AboutScene" | "ServicesScene" | "PricingScene" | "ContactScene";

const load = (name: SceneName) =>
  dynamic<Record<string, never>>(
    () => import("./scenes").then((m) => ({ default: m[name] as ComponentType<Record<string, never>> })),
    { ssr: false, loading: () => <SceneFallback /> },
  );

export const HeroScene = load("HeroScene");
export const WebScene = load("WebScene");
export const AppScene = load("AppScene");
export const AIScene = load("AIScene");
export const AboutScene = load("AboutScene");
export const ServicesScene = load("ServicesScene");
export const PricingScene = load("PricingScene");
export const ContactScene = load("ContactScene");
