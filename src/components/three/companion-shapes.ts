/**
 * What the home-page cubes build in each section. Every shape is made from the same small pool of
 * cubes, so as the visitor scrolls the pool flies from one shape to the next.
 * Coordinates are in "slot units": a shape fits in a box about 3.4 units across.
 */
export interface Part {
  /** Centre of the piece, relative to its landing slot. */
  readonly l: readonly [number, number, number];
  /** Width, height and depth. */
  readonly s: readonly [number, number, number];
  /** 0 is slate blue, 1 is cobalt. */
  readonly cob: number;
  /** Which landing slot inside the section the piece belongs to (default 0). */
  readonly slot?: number;
}

const part = (l: Part["l"], s: Part["s"], cob = 0, slot = 0): Part => ({ l, s, cob, slot });

/** Hero: a 3 x 3 x 3 block, assembled. */
function hero(): Part[] {
  const out: Part[] = [];
  for (const x of [-1, 0, 1]) for (const y of [-1, 0, 1]) for (const z of [-1, 0, 1]) {
    const lit = (x === 1 && y === 1) || (x === -1 && y === -1 && z === 1);
    out.push(part([x * 0.95, y * 0.95, z * 0.95], [0.82, 0.82, 0.82], lit ? 1 : 0));
  }
  return out;
}

/** Services: a website, a dashboard, an AI network and a workflow, one in each card. */
function services(): Part[] {
  const web: Part[] = [
    part([0, 1.25, 0], [3, 0.38, 0.3]),
    part([-1.2, 1.25, 0.2], [0.2, 0.2, 0.3], 1),
    part([-0.85, 1.25, 0.2], [0.2, 0.2, 0.3], 0.5),
    part([-0.5, 1.25, 0.2], [0.2, 0.2, 0.3], 0.2),
    part([-0.85, -0.2, 0], [1.2, 2, 0.3]),
    part([0.6, 0.2, 0], [1.5, 0.95, 0.3]),
    part([0.6, -0.85, 0], [1.5, 0.95, 0.3], 1),
  ];
  const heights = [0.8, 1.5, 1.1, 2.2, 1.7];
  const apps: Part[] = [
    part([0, -1.3, 0], [3, 0.2, 0.9]),
    ...heights.map((h, i) => part([-1.2 + i * 0.6, -1.2 + h / 2, 0], [0.4, h, 0.4], i === 3 ? 1 : 0.15)),
  ];
  const ai: Part[] = [part([0, 0, 0], [0.9, 0.9, 0.9], 1)];
  for (let k = 0; k < 10; k++) {
    const y = 1 - (2 * (k + 0.5)) / 10;
    const r = Math.sqrt(1 - y * y);
    const phi = k * 2.39996;
    ai.push(part([Math.cos(phi) * r * 1.25, y * 1.25, Math.sin(phi) * r * 1.25], [0.34, 0.34, 0.34], k % 3 === 0 ? 0.7 : 0.1));
  }
  const flow: Part[] = [
    part([-1.2, 0.8, 0], [0.6, 0.6, 0.6]),
    part([0, 0.8, 0], [0.6, 0.6, 0.6]),
    part([0, -0.8, 0], [0.6, 0.6, 0.6]),
    part([1.2, -0.8, 0], [0.6, 0.6, 0.6], 1),
    part([-0.6, 0.8, 0], [0.8, 0.12, 0.12], 0.4),
    part([0, 0, 0], [0.12, 1.2, 0.12], 0.4),
    part([0.6, -0.8, 0], [0.8, 0.12, 0.12], 0.4),
  ];
  return [web, apps, ai, flow].flatMap((group, slot) => group.map((p) => ({ ...p, slot })));
}

/** Concepts: a guesthouse, a dispatch dashboard and a chat, side by side. */
function concepts(): Part[] {
  const house = [
    part([-2.9, -0.5, 0], [0.4, 1.2, 0.4]),
    part([-2.4, -0.15, 0], [0.4, 1.9, 0.4], 0.3),
    part([-1.9, -0.35, 0], [0.4, 1.5, 0.4]),
    part([-2.4, 0.9, 0], [1.5, 0.2, 0.5], 1),
  ];
  const dash = [
    part([0, -1.2, 0], [1.8, 0.15, 0.6]),
    ...[1, 1.8, 1.3, 2].map((h, i) => part([-0.6 + i * 0.4, -1.1 + h / 2, 0], [0.3, h, 0.3], i === 3 ? 1 : 0.15)),
  ];
  const chat = [
    part([2.2, 0.9, 0], [1.4, 0.6, 0.35]),
    part([2.6, 0, 0], [1.2, 0.6, 0.35], 1),
    part([2.2, -0.9, 0], [1, 0.6, 0.35]),
  ];
  return [...house, ...dash, ...chat];
}

/** Process: seven rising steps that light up one after another. */
function process(): Part[] {
  return Array.from({ length: 7 }, (_, i) => {
    const h = 0.5 + i * 0.35;
    return part([-1.5 + i * 0.5, -1.3 + h / 2, 0], [0.38, h, 0.38], i / 6);
  });
}

const R = ["1111 ", "1   1", "1   1", "1111 ", "1 1  ", "1  1 ", "1   1"];

/** Studio: a block "R" for Ragophala. */
function studio(): Part[] {
  const out: Part[] = [];
  R.forEach((row, y) => [...row].forEach((c, x) => {
    if (c === "1") out.push(part([(x - 2) * 0.46, (3 - y) * 0.46, 0], [0.42, 0.42, 0.42], 0.55 + (y / R.length) * 0.45));
  }));
  return out;
}

export const STAGES: readonly (readonly Part[])[] = [hero(), services(), concepts(), process(), studio()];
export const POOL = Math.max(...STAGES.map((s) => s.length));
