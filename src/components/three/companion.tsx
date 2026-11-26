"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three-stdlib";
import { COBALT, SOFT } from "./shared";
import { POOL, STAGES } from "./companion-shapes";

/**
 * Home-page scroll story. One pool of cubes flies down the page: it assembles into a block in the
 * hero, then builds a website, a dashboard, an AI network and a workflow inside the four service
 * cards, then a guesthouse, dashboard and chat for the concepts, rising steps for the process and
 * an "R" for the studio. Landing slots are tagged in the page markup:
 * `data-scene-stage` on each section and `data-scene-slot` on the empty slot inside it.
 * The canvas is orthographic, so one world unit is one CSS pixel and a slot's place on screen is
 * also its place in the scene. No textures or models, and the pool is only a few dozen cubes.
 */

const BASE = new THREE.Color("#7384ad");
const ACCENT = new THREE.Color(COBALT);
const UNITS_ACROSS = 3.4;
/** Switch to a section once its top passes this fraction of the screen height. */
const PROBE = 0.62;

interface Slots {
  /** Slot elements for each section, by slot number. */
  bySection: (HTMLElement | null)[][];
  sections: HTMLElement[];
}

function findSlots(): Slots {
  const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-scene-stage]"));
  const bySection = sections.map((section) => {
    const slots: (HTMLElement | null)[] = [];
    section.querySelectorAll<HTMLElement>("[data-scene-slot]").forEach((el) => {
      const k = Number(el.dataset.sceneSlot);
      if (!slots[k] && el.getClientRects().length > 0) slots[k] = el;
    });
    return slots;
  });
  return { bySection, sections };
}

/** Stable pseudo-random number per cube, so each flies at its own speed. */
const hash = (i: number) => (Math.sin(i * 12.9898) * 43758.5453) % 1 * 0.5 + 0.5;

interface Cube {
  cx: number; cy: number; u: number;
  lx: number; ly: number; lz: number;
  sx: number; sy: number; sz: number;
  cob: number;
}

function Swarm() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const slots = useRef<Slots>({ bySection: [], sections: [] });
  const cubes = useRef<Cube[] | null>(null);
  const geometry = useMemo(() => new RoundedBoxGeometry(1, 1, 1, 3, 0.14), []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const euler = useMemo(() => new THREE.Euler(), []);
  const quat = useMemo(() => new THREE.Quaternion(), []);
  const offset = useMemo(() => new THREE.Vector3(), []);
  const colour = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    const find = () => {
      slots.current = findSlots();
    };
    find();
    const ro = new ResizeObserver(find);
    ro.observe(document.body);
    window.addEventListener("resize", find);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", find);
    };
  }, []);

  useFrame((s, dt) => {
    const im = mesh.current;
    const { bySection, sections } = slots.current;
    if (!im || sections.length === 0) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const t = s.clock.elapsedTime;

    // The last section whose top has passed the probe line is the one the cubes are building in.
    let stage = 0;
    sections.forEach((el, i) => {
      if (el.getBoundingClientRect().top <= vh * PROBE) stage = i;
    });
    const parts = STAGES[stage];
    const stageSlots = bySection[stage] ?? [];

    // Everything in a shape turns together, so it reads as one 3D object.
    // The hero block is tilted to read as 3D, and opens up as the visitor starts to scroll.
    const open = stage === 0 ? THREE.MathUtils.smoothstep(window.scrollY, 40, vh * 0.7) : 0;
    euler.set(stage === 0 ? 0.5 : 0.3, Math.sin(t * 0.5) * 0.4 + (stage === 0 ? 0.6 : stage * 0.2), 0);
    quat.setFromEuler(euler);

    if (!cubes.current) {
      const first = bySection[0]?.[0]?.getBoundingClientRect();
      const cx = first ? first.left + first.width / 2 - vw / 2 : 0;
      const cy = first ? -(first.top + first.height / 2 - vh / 2) : 0;
      cubes.current = Array.from({ length: POOL }, () => ({ cx, cy, u: 30, lx: 0, ly: 0, lz: 0, sx: 0, sy: 0, sz: 0, cob: 0 }));
    }

    for (let i = 0; i < POOL; i++) {
      const c = cubes.current[i];
      const p = parts[i];
      const el = p ? (stageSlots[p.slot ?? 0] ?? stageSlots[0]) : null;
      const h = hash(i);
      const move = 3 + h * 4;
      const shape = 4 + h * 3;

      let dist = 0;
      if (p && el) {
        const r = el.getBoundingClientRect();
        const tx = r.left + r.width / 2 - vw / 2;
        const ty = -(r.top + r.height / 2 - vh / 2);
        dist = Math.hypot(tx - c.cx, ty - c.cy);
        c.cx = THREE.MathUtils.damp(c.cx, tx, move, dt);
        c.cy = THREE.MathUtils.damp(c.cy, ty, move, dt);
        c.u = THREE.MathUtils.damp(c.u, Math.min(r.width, r.height) / UNITS_ACROSS, move, dt);
        const spread = 1 + open * 1.1;
        c.lx = THREE.MathUtils.damp(c.lx, p.l[0] * spread, shape, dt);
        c.ly = THREE.MathUtils.damp(c.ly, p.l[1] * spread, shape, dt);
        c.lz = THREE.MathUtils.damp(c.lz, p.l[2] * spread, shape, dt);
        c.sx = THREE.MathUtils.damp(c.sx, p.s[0], shape, dt);
        c.sy = THREE.MathUtils.damp(c.sy, p.s[1], shape, dt);
        c.sz = THREE.MathUtils.damp(c.sz, p.s[2], shape, dt);
        c.cob = THREE.MathUtils.damp(c.cob, p.cob, shape, dt);
      } else {
        // Not part of this shape: shrink away where it is.
        c.sx = THREE.MathUtils.damp(c.sx, 0, shape, dt);
        c.sy = THREE.MathUtils.damp(c.sy, 0, shape, dt);
        c.sz = THREE.MathUtils.damp(c.sz, 0, shape, dt);
      }

      // Pieces still on their way swirl a little, so the flight looks like a swarm, not a slide.
      const swirl = Math.min(dist, 500) * 0.07;
      offset.set(c.lx * c.u, c.ly * c.u, c.lz * c.u).applyQuaternion(quat);
      dummy.position.set(c.cx + offset.x + Math.sin(t * 2.7 + i) * swirl, c.cy + offset.y + Math.cos(t * 2.1 + i * 1.3) * swirl, offset.z);
      dummy.quaternion.copy(quat);
      dummy.scale.set(Math.max(c.sx * c.u, 0.001), Math.max(c.sy * c.u, 0.001), Math.max(c.sz * c.u, 0.001));
      dummy.updateMatrix();
      im.setMatrixAt(i, dummy.matrix);
      im.setColorAt(i, colour.copy(BASE).lerp(ACCENT, c.cob));
    }
    im.instanceMatrix.needsUpdate = true;
    if (im.instanceColor) im.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, POOL]} frustumCulled={false}>
      <meshStandardMaterial metalness={0.65} roughness={0.3} envMapIntensity={1.3} />
    </instancedMesh>
  );
}

/** Renders on a timer (about 25 frames a second) and on scroll, and not at all while the tab is hidden. */
function Pulse() {
  const invalidate = useThree((t) => t.invalidate);
  useEffect(() => {
    const tick = () => {
      if (document.visibilityState === "visible") invalidate();
    };
    const id = window.setInterval(tick, 40);
    window.addEventListener("scroll", tick, { passive: true });
    return () => {
      window.clearInterval(id);
      window.removeEventListener("scroll", tick);
    };
  }, [invalidate]);
  return null;
}

export function CompanionScene() {
  return (
    <Canvas orthographic style={{ pointerEvents: "none" }} dpr={[1, 1.5]} frameloop="demand" camera={{ position: [0, 0, 600], zoom: 1, near: 0.1, far: 2000 }} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[200, 300, 400]} intensity={2.2} />
      <Environment resolution={64} frames={1}>
        <color attach="background" args={["#5f7098"]} />
        <Lightformer form="rect" intensity={5} color="#ffffff" position={[0, 6, 3]} scale={[12, 3, 1]} />
        <Lightformer form="rect" intensity={3} color={SOFT} position={[-7, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 5, 1]} />
        <Lightformer form="rect" intensity={2.5} color={COBALT} position={[7, 0, -2]} rotation-y={-Math.PI / 2} scale={[8, 5, 1]} />
      </Environment>
      <Swarm />
      <Pulse />
    </Canvas>
  );
}
