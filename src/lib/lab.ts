import { PACKAGES_PUBLIC } from "@/lib/catalogue-public";

/** What each package adds to the 3D build model. Mirrors the rate card; prices come from PACKAGES. */
export interface BuildTraits {
  pages: number;
  cms: boolean;
  motion: boolean;
  seo: boolean;
  support: boolean;
}

export const BUILD_TRAITS: Record<string, BuildTraits> = {
  "basic-website": { pages: 3, cms: false, motion: false, seo: false, support: false },
  "professional-landing": { pages: 1, cms: false, motion: false, seo: true, support: false },
  "starter-business": { pages: 5, cms: false, motion: false, seo: true, support: false },
  "standard-business": { pages: 8, cms: false, motion: false, seo: true, support: false },
  "professional-business": { pages: 12, cms: true, motion: true, seo: true, support: true },
  "premium-business": { pages: 12, cms: true, motion: true, seo: true, support: true },
};

export const MAX_PAGES = 12;

export const DEFAULT_TRAITS: BuildTraits = { pages: 1, cms: false, motion: false, seo: false, support: false };

export const traitsFor = (id: string): BuildTraits => BUILD_TRAITS[id] ?? DEFAULT_TRAITS;

export const packageById = (id: string) => PACKAGES_PUBLIC.find((p) => p.id === id);

export interface Tool {
  name: string;
  url: string;
  role: string;
  /** Where we use it today, stated plainly. */
  status: "in-use" | "on-request";
  fit: string;
}

export const TOOLCHAIN: Tool[] = [
  { name: "Three.js", url: "https://github.com/mrdoob/three.js", role: "WebGL rendering", status: "in-use", fit: "Powers the 3D on this site, through React Three Fiber." },
  { name: "Blender", url: "https://github.com/blender/blender", role: "Modelling and animation", status: "on-request", fit: "Custom product or logo models, exported as glTF for the web." },
  { name: "Babylon.js", url: "https://github.com/BabylonJS/Babylon.js", role: "Full 3D engine", status: "on-request", fit: "Heavier interactive scenes, product viewers and browser games." },
  { name: "A-Frame", url: "https://github.com/aframevr/aframe", role: "WebXR framework", status: "on-request", fit: "Walk-through and VR or AR experiences that run in a browser." },
  { name: "OpenSCAD", url: "https://github.com/openscad/openscad", role: "Code-driven 3D design", status: "on-request", fit: "Generative and parametric objects, such as configurable product shapes." },
  { name: "Godot", url: "https://github.com/godotengine/godot", role: "Game engine", status: "on-request", fit: "Interactive demos and games exported to the web." },
];
