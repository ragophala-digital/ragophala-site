"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { COBALT, Studio } from "./shared";

/**
 * Scroll companion for the home page: four small blocks that reshape as each section passes the
 * middle of the screen (assembled, services, concepts, process, launch). No textures or models,
 * so it costs a few kilobytes of geometry and one small canvas.
 */

type Pose = readonly [x: number, y: number, scale: number, cobalt: number];

/** One pose per block, per stage. Stage order matches the data-scene-stage attributes on the page. */
const STAGES: readonly (readonly Pose[])[] = [
  // Hero: assembled into one block.
  [[-0.27, 0.27, 1, 0], [0.27, 0.27, 1, 0], [-0.27, -0.27, 1, 0], [0.27, -0.27, 1, 0]],
  // Services: four separate offerings in a line.
  [[0, 1.6, 0.8, 0], [0, 0.55, 0.8, 0], [0, -0.55, 0.8, 0], [0, -1.6, 0.8, 0]],
  // Concepts: a zig-zag, one picked out.
  [[-0.4, 1.5, 0.75, 0], [0.4, 0.5, 0.75, 1], [-0.4, -0.5, 0.75, 0], [0.4, -1.5, 0.75, 0]],
  // Process: a staircase that lights up step by step.
  [[-0.5, 1.45, 0.6, 0.1], [-0.17, 0.48, 0.6, 0.4], [0.17, -0.48, 0.6, 0.7], [0.5, -1.45, 0.6, 1]],
  // Studio: back together, finished.
  [[-0.27, 0.27, 1.1, 1], [0.27, 0.27, 1.1, 1], [-0.27, -0.27, 1.1, 1], [0.27, -0.27, 1.1, 1]],
];

const BASE = new THREE.Color("#7384ad");
const ACCENT = new THREE.Color(COBALT);
const SIZE = 0.5;

const smooth = (t: number) => t * t * (3 - 2 * t);

/** Centres of the tagged sections, measured in page coordinates. Re-measured when the page resizes. */
function useStageCentres() {
  const centres = useRef<number[]>([]);
  useEffect(() => {
    const measure = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-scene-stage]"));
      centres.current = els.map((el) => {
        const r = el.getBoundingClientRect();
        return r.top + window.scrollY + r.height / 2;
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  return centres;
}

/** Whole stage index (for example 1.4 is 40% of the way from stage 1 to stage 2). */
function stageAt(centres: number[], y: number) {
  const n = centres.length;
  if (n < 2) return 0;
  if (y <= centres[0]) return 0;
  if (y >= centres[n - 1]) return n - 1;
  let i = 0;
  while (i < n - 2 && y > centres[i + 1]) i++;
  return i + smooth((y - centres[i]) / (centres[i + 1] - centres[i]));
}

function Blocks() {
  const group = useRef<THREE.Group>(null);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  const centres = useStageCentres();
  const colour = useMemo(() => new THREE.Color(), []);

  useFrame((s, dt) => {
    const g = group.current;
    if (!g) return;
    const vp = window.scrollY + window.innerHeight / 2;
    const stage = Math.min(stageAt(centres.current, vp), STAGES.length - 1);
    const a = Math.floor(stage);
    const b = Math.min(a + 1, STAGES.length - 1);
    const f = stage - a;

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, s.clock.elapsedTime * 0.28 + stage * 0.9, 4, dt);
    g.rotation.x = Math.sin(s.clock.elapsedTime * 0.4) * 0.08;

    meshes.current.forEach((m, i) => {
      if (!m) return;
      const p = STAGES[a][i];
      const q = STAGES[b][i];
      const lerp = THREE.MathUtils.lerp;
      m.position.x = THREE.MathUtils.damp(m.position.x, lerp(p[0], q[0], f), 6, dt);
      m.position.y = THREE.MathUtils.damp(m.position.y, lerp(p[1], q[1], f), 6, dt);
      const scale = THREE.MathUtils.damp(m.scale.x, lerp(p[2], q[2], f), 6, dt);
      m.scale.setScalar(scale);
      m.rotation.y = s.clock.elapsedTime * 0.2 * (i % 2 ? 1 : -1);
      const mat = m.material as THREE.MeshStandardMaterial;
      colour.copy(BASE).lerp(ACCENT, lerp(p[3], q[3], f));
      mat.color.lerp(colour, Math.min(1, dt * 6));
    });
  });

  return (
    <>
      {/* The route the blocks travel along. */}
      <mesh position={[0, 0, -0.4]}>
        <cylinderGeometry args={[0.012, 0.012, 7, 8]} />
        <meshBasicMaterial color={COBALT} transparent opacity={0.4} />
      </mesh>
      <group ref={group}>
        {STAGES[0].map((p, i) => (
          <RoundedBox key={i} ref={(el) => { meshes.current[i] = el; }} args={[SIZE, SIZE, SIZE]} radius={0.07} smoothness={3} position={[p[0], p[1], 0]} scale={p[2]}>
            <meshStandardMaterial color={BASE} metalness={0.7} roughness={0.3} envMapIntensity={1.3} />
          </RoundedBox>
        ))}
      </group>
    </>
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
    <Canvas dpr={[1, 1.25]} frameloop="demand" camera={{ position: [0, 0, 7.5], fov: 35 }} gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}>
      <Studio low />
      <Blocks />
      <Pulse />
    </Canvas>
  );
}
