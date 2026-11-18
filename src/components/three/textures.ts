import { useEffect, useMemo } from "react";
import * as THREE from "three";

/** Picture textures for the 3D service scenes. Drawn on a canvas so they stay crisp, light and free of third-party images. All content is illustrative. */

type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

export function useCanvasTexture(draw: Draw, w: number, h: number): THREE.CanvasTexture {
  const tex = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (ctx) draw(ctx, w, h);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return t;
  }, [draw, w, h]);
  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

const NAVY = "#101827";
const IVORY = "#F5F3EF";
const COBALT = "#315BFA";
const SOFT = "#DCE5FF";
const SLATE = "#A7B1C2";
const SANS = "600 {s}px Inter, system-ui, -apple-system, 'Segoe UI', sans-serif";
const font = (size: number, weight = 600) => SANS.replace("600", String(weight)).replace("{s}", String(size));

function rr(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: string, stroke?: string) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

function bar(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: string) {
  rr(ctx, x, y, w, h, h / 2, fill);
}

/** A stylised landscape photograph: sky gradient, sun, layered hills. */
function photo(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, pal: [string, string, string, string, string], r = 18) {
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.clip();
  const sky = ctx.createLinearGradient(0, y, 0, y + h);
  sky.addColorStop(0, pal[0]);
  sky.addColorStop(1, pal[1]);
  ctx.fillStyle = sky;
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = "rgba(255,255,255,.85)";
  ctx.beginPath();
  ctx.arc(x + w * 0.74, y + h * 0.3, h * 0.11, 0, Math.PI * 2);
  ctx.fill();
  const hill = (base: number, amp: number, color: string, phase: number) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    for (let i = 0; i <= 24; i++) {
      const px = x + (w * i) / 24;
      ctx.lineTo(px, y + h * base + Math.sin(i * 0.5 + phase) * h * amp);
    }
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
    ctx.fill();
  };
  hill(0.62, 0.07, pal[2], 0);
  hill(0.76, 0.06, pal[3], 2);
  hill(0.88, 0.04, pal[4], 4);
  ctx.restore();
}

const P_BLUE: [string, string, string, string, string] = ["#9db8ff", "#e9efff", "#5d7dfc", "#315BFA", "#1b2f8a"];
const P_WARM: [string, string, string, string, string] = ["#ffd9b8", "#fff1e4", "#e29a6a", "#c46a4a", "#7a3a2e"];
const P_GREEN: [string, string, string, string, string] = ["#bfe7d4", "#f0faf5", "#6cbf9a", "#3b8f6e", "#1f5a46"];
const P_DUSK: [string, string, string, string, string] = ["#c6b8ff", "#f3efff", "#8a78e6", "#5a49b8", "#2c2470"];

/* ---------- Websites ---------- */

export const drawWebsiteHome: Draw = (ctx, w, h) => {
  ctx.fillStyle = IVORY;
  ctx.fillRect(0, 0, w, h);
  rr(ctx, 0, 0, w, 78, 0, "#ffffff");
  ctx.fillStyle = NAVY;
  ctx.font = font(34, 700);
  ctx.fillText("studio", 48, 52);
  ctx.fillStyle = COBALT;
  ctx.fillText(".", 156, 52);
  ["Work", "Services", "About"].forEach((t, i) => {
    ctx.fillStyle = "#566075";
    ctx.font = font(22, 500);
    ctx.fillText(t, 520 + i * 130, 48);
  });
  rr(ctx, w - 230, 18, 182, 44, 22, COBALT);
  ctx.fillStyle = "#fff";
  ctx.font = font(21, 600);
  ctx.fillText("Get in touch", w - 207, 47);
  ctx.fillStyle = NAVY;
  ctx.font = font(74, 700);
  ctx.fillText("Designed to", 56, 220);
  ctx.fillText("be found.", 56, 300);
  bar(ctx, 56, 336, 460, 14, "#c9ccd3");
  bar(ctx, 56, 366, 380, 14, "#d8dae0");
  rr(ctx, 56, 412, 190, 60, 14, COBALT);
  ctx.fillStyle = "#fff";
  ctx.font = font(24, 600);
  ctx.fillText("Start now", 90, 450);
  rr(ctx, 266, 412, 170, 60, 14, "#ffffff", "#d3d6dc");
  ctx.fillStyle = NAVY;
  ctx.fillText("Our work", 296, 450);
  photo(ctx, 640, 118, 500, 370, P_BLUE, 26);
  rr(ctx, 600, 400, 230, 110, 18, "#ffffff");
  bar(ctx, 626, 428, 120, 12, COBALT);
  bar(ctx, 626, 454, 170, 10, "#d3d6dc");
  bar(ctx, 626, 474, 130, 10, "#e2e4e8");
  [0, 1, 2].forEach((i) => {
    rr(ctx, 56 + i * 372, 540, 340, 140, 18, "#ffffff");
    ctx.fillStyle = SOFT;
    ctx.beginPath();
    ctx.arc(104 + i * 372, 590, 24, 0, Math.PI * 2);
    ctx.fill();
    bar(ctx, 146 + i * 372, 578, 150, 14, NAVY);
    bar(ctx, 82 + i * 372, 628, 260, 10, "#d3d6dc");
    bar(ctx, 82 + i * 372, 650, 200, 10, "#e2e4e8");
  });
};

export const drawWebsiteShop: Draw = (ctx, w, h) => {
  ctx.fillStyle = IVORY;
  ctx.fillRect(0, 0, w, h);
  rr(ctx, 0, 0, w, 78, 0, NAVY);
  ctx.fillStyle = "#fff";
  ctx.font = font(32, 700);
  ctx.fillText("market", 48, 52);
  rr(ctx, 380, 18, 440, 44, 22, "#1f2a44");
  bar(ctx, 410, 36, 150, 10, "#56648a");
  ctx.fillStyle = COBALT;
  ctx.beginPath();
  ctx.arc(w - 64, 40, 22, 0, Math.PI * 2);
  ctx.fill();
  ["All", "Fresh", "Pantry", "Bakery", "Drinks"].forEach((t, i) => {
    rr(ctx, 48 + i * 130, 106, 112, 44, 22, i === 0 ? NAVY : "#ffffff", i === 0 ? undefined : "#d3d6dc");
    ctx.fillStyle = i === 0 ? "#fff" : NAVY;
    ctx.font = font(21, 600);
    ctx.fillText(t, 76 + i * 130, 136);
  });
  const pals = [P_GREEN, P_WARM, P_BLUE, P_DUSK];
  pals.forEach((p, i) => {
    const x = 48 + i * 275;
    rr(ctx, x, 180, 252, 470, 20, "#ffffff");
    photo(ctx, x + 12, 192, 228, 250, p, 14);
    bar(ctx, x + 18, 470, 170, 16, NAVY);
    bar(ctx, x + 18, 502, 120, 11, "#d3d6dc");
    rr(ctx, x + 18, 560, 120, 46, 12, COBALT);
    ctx.fillStyle = "#fff";
    ctx.font = font(20, 600);
    ctx.fillText("Add", x + 56, 590);
  });
};

export const drawWebsiteBooking: Draw = (ctx, w, h) => {
  ctx.fillStyle = IVORY;
  ctx.fillRect(0, 0, w, h);
  rr(ctx, 0, 0, w, 78, 0, "#ffffff");
  ctx.fillStyle = NAVY;
  ctx.font = font(32, 700);
  ctx.fillText("stay", 48, 52);
  photo(ctx, 48, 110, 520, 560, P_WARM, 26);
  ctx.fillStyle = NAVY;
  ctx.font = font(46, 700);
  ctx.fillText("Book your", 620, 170);
  ctx.fillText("stay", 620, 226);
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 7; c++) {
      const sel = r === 1 && c === 3;
      rr(ctx, 620 + c * 72, 262 + r * 64, 56, 48, 12, sel ? COBALT : "#ffffff", sel ? undefined : "#e0e2e7");
      bar(ctx, 636 + c * 72, 282 + r * 64, 24, 9, sel ? "#fff" : "#c9ccd3");
    }
  }
  [0, 1, 2].forEach((i) => {
    rr(ctx, 620 + i * 168, 540, 150, 50, 14, i === 1 ? SOFT : "#ffffff", "#d3d6dc");
    bar(ctx, 646 + i * 168, 560, 90, 10, i === 1 ? COBALT : "#c9ccd3");
  });
  rr(ctx, 620, 610, 500, 62, 16, COBALT);
  ctx.fillStyle = "#fff";
  ctx.font = font(26, 600);
  ctx.fillText("Request this date", 790, 650);
};

/* ---------- Dashboard ---------- */

export const drawDashboard: Draw = (ctx, w, h) => {
  ctx.fillStyle = "#141d33";
  ctx.fillRect(0, 0, w, h);
  rr(ctx, 0, 0, 300, h, 0, "#101827");
  ctx.fillStyle = "#fff";
  ctx.font = font(34, 700);
  ctx.fillText("ops", 40, 64);
  ctx.fillStyle = "#8FA5FF";
  ctx.fillText(".", 112, 64);
  ["Overview", "Customers", "Inventory", "Orders", "Reports"].forEach((t, i) => {
    if (i === 0) rr(ctx, 22, 112, 256, 58, 14, COBALT);
    ctx.fillStyle = i === 0 ? "#fff" : SLATE;
    ctx.font = font(24, 500);
    ctx.fillText(t, 62, 150 + i * 70);
  });
  rr(ctx, 340, 28, 560, 52, 26, "#1f2a44");
  bar(ctx, 372, 50, 140, 10, "#56648a");
  ctx.fillStyle = COBALT;
  ctx.beginPath();
  ctx.arc(w - 64, 54, 26, 0, Math.PI * 2);
  ctx.fill();
  [["Open jobs", "24"], ["Customers", "312"], ["Low stock", "7"]].forEach(([k, v], i) => {
    rr(ctx, 340 + i * 292, 110, 270, 124, 18, "#1f2a44");
    ctx.fillStyle = SLATE;
    ctx.font = font(20, 500);
    ctx.fillText(k, 366 + i * 292, 148);
    ctx.fillStyle = "#fff";
    ctx.font = font(52, 700);
    ctx.fillText(v, 366 + i * 292, 206);
  });
  // chart card (animated bars are drawn over this area in 3D)
  rr(ctx, 340, 262, 600, 480, 20, "#1b2a4d");
  ctx.fillStyle = SLATE;
  ctx.font = font(20, 500);
  ctx.fillText("Monthly activity", 366, 302);
  // right column: records
  rr(ctx, 972, 262, 262, 480, 20, "#1f2a44");
  ctx.fillStyle = SLATE;
  ctx.font = font(20, 500);
  ctx.fillText("Recent orders", 996, 302);
  for (let i = 0; i < 6; i++) {
    ctx.fillStyle = "#2b3a63";
    ctx.beginPath();
    ctx.arc(1012, 352 + i * 62, 16, 0, Math.PI * 2);
    ctx.fill();
    bar(ctx, 1040, 342 + i * 62, 120, 11, "#6f80ad");
    bar(ctx, 1040, 362 + i * 62, 80, 9, "#3f5086");
    rr(ctx, 1176, 342 + i * 62, 40, 22, 11, i % 3 === 0 ? "#2e7d5b" : i % 3 === 1 ? "#a77a1f" : "#315BFA");
  }
};

/* ---------- AI chat ---------- */

export const drawChat: Draw = (ctx, w, h) => {
  ctx.fillStyle = IVORY;
  ctx.fillRect(0, 0, w, h);
  rr(ctx, 0, 0, w, 120, 0, NAVY);
  ctx.fillStyle = COBALT;
  ctx.beginPath();
  ctx.arc(70, 60, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = font(30, 700);
  ctx.fillText("AI", 53, 71);
  ctx.font = font(30, 600);
  ctx.fillText("Business assistant", 120, 58);
  ctx.fillStyle = "#6fe0a8";
  ctx.beginPath();
  ctx.arc(128, 86, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = SLATE;
  ctx.font = font(20, 500);
  ctx.fillText("Online (demo)", 146, 93);
  const bubble = (x: number, y: number, bw: number, bh: number, mine: boolean) => {
    rr(ctx, x, y, bw, bh, 26, mine ? COBALT : "#ffffff", mine ? undefined : "#e0e2e7");
    bar(ctx, x + 28, y + 30, bw - 90, 12, mine ? "rgba(255,255,255,.85)" : "#c9ccd3");
    bar(ctx, x + 28, y + 58, bw - 150, 12, mine ? "rgba(255,255,255,.6)" : "#e0e2e7");
    if (bh > 120) bar(ctx, x + 28, y + 86, bw - 120, 12, mine ? "rgba(255,255,255,.5)" : "#e0e2e7");
  };
  bubble(40, 160, 430, 110, false);
  bubble(w - 410 - 40, 310, 410, 90, true);
  bubble(40, 440, 480, 150, false);
  [0, 1].forEach((i) => {
    rr(ctx, 40 + i * 250, 640, 230, 56, 28, SOFT);
    bar(ctx, 66 + i * 250, 662, 150, 11, COBALT);
  });
  rr(ctx, 30, h - 110, w - 60, 70, 35, "#ffffff", "#d3d6dc");
  bar(ctx, 70, h - 82, 240, 12, "#c9ccd3");
  ctx.fillStyle = COBALT;
  ctx.beginPath();
  ctx.arc(w - 85, h - 75, 26, 0, Math.PI * 2);
  ctx.fill();
};

/* ---------- Automation: incoming enquiry card ---------- */

export const drawEnquiry: Draw = (ctx, w, h) => {
  rr(ctx, 0, 0, w, h, 36, "#ffffff");
  ctx.fillStyle = SOFT;
  ctx.beginPath();
  ctx.arc(90, 96, 44, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = COBALT;
  ctx.font = font(40, 700);
  ctx.fillText("TM", 62, 110);
  ctx.fillStyle = NAVY;
  ctx.font = font(34, 700);
  ctx.fillText("New enquiry", 160, 88);
  ctx.fillStyle = "#566075";
  ctx.font = font(24, 500);
  ctx.fillText("Website form  ·  just now", 160, 126);
  bar(ctx, 48, 190, w - 96, 14, "#d3d6dc");
  bar(ctx, 48, 222, w - 200, 14, "#e2e4e8");
  bar(ctx, 48, 254, w - 280, 14, "#e2e4e8");
  [["Website", COBALT], ["Priority: normal", "#566075"], ["Notified", "#2e7d5b"]].forEach(([t, c], i) => {
    const x = 48 + i * 200;
    rr(ctx, x, 330, i === 1 ? 250 : 170, 52, 26, "#f2f3f5");
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(x + 28, 356, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = NAVY;
    ctx.font = font(21, 600);
    ctx.fillText(t, x + 46, 364);
  });
  rr(ctx, 48, h - 100, 220, 60, 16, COBALT);
  ctx.fillStyle = "#fff";
  ctx.font = font(24, 600);
  ctx.fillText("Open lead", 90, h - 62);
};
