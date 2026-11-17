"use client";

import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { MAX_PAGES, type BuildTraits } from "@/lib/lab";
import { CHROME, COBALT, Rig, SOFT, SceneFrame } from "./shared";

/** Position of page `i` in a fanned stack, so the count reads at a glance. */
const slot = (i: number): [number, number, number] => [(i % 4) * 0.62 - 0.93, 0.9 - Math.floor(i / 4) * 0.85, -Math.floor(i / 4) * 0.5 + (i % 4) * 0.12];

function Page({ index, active }: { index: number; active: boolean }) {
  const g = useRef<THREE.Group>(null);
  const pos = useMemo(() => slot(index), [index]);
  useFrame((_, dt) => {
    if (!g.current) return;
    const target = active ? 1 : 0.0001;
    const s = THREE.MathUtils.damp(g.current.scale.x, target, 6, dt);
    g.current.scale.setScalar(s);
  });
  return (
    <group ref={g} position={pos} rotation={[0, -0.25, 0]} scale={0.0001}>
      <RoundedBox args={[0.56, 0.74, 0.06]} radius={0.04} smoothness={3}>
        <meshPhysicalMaterial {...CHROME} />
      </RoundedBox>
      <mesh position={[0, 0.2, 0.04]}><planeGeometry args={[0.44, 0.16]} /><meshBasicMaterial color="#141d33" /></mesh>
      <mesh position={[0, -0.02, 0.04]}><planeGeometry args={[0.44, 0.05]} /><meshBasicMaterial color={SOFT} /></mesh>
      <mesh position={[-0.1, -0.12, 0.04]}><planeGeometry args={[0.24, 0.05]} /><meshBasicMaterial color={SOFT} transparent opacity={0.6} /></mesh>
      <mesh position={[0, -0.28, 0.04]}><planeGeometry args={[0.3, 0.1]} /><meshBasicMaterial color={COBALT} /></mesh>
    </group>
  );
}

/** Smoothly scales a feature in or out when a package gains or loses it. */
function Feature({ on, children, position }: { on: boolean; children: React.ReactNode; position: [number, number, number] }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!g.current) return;
    g.current.scale.setScalar(THREE.MathUtils.damp(g.current.scale.x, on ? 1 : 0.0001, 5, dt));
  });
  return <group ref={g} position={position} scale={0.0001}>{children}</group>;
}

function Ring() {
  const r = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (r.current) r.current.rotation.z += dt * 0.6;
  });
  return (
    <mesh ref={r} rotation={[1.1, 0.3, 0]}>
      <torusGeometry args={[0.9, 0.03, 16, 80]} />
      <meshPhysicalMaterial color={COBALT} emissive={COBALT} emissiveIntensity={0.6} roughness={0.2} />
    </mesh>
  );
}

function Model({ traits, low }: { traits: BuildTraits; low: boolean }) {
  return (
    <Rig strength={0.5} scroll={0}>
      {Array.from({ length: MAX_PAGES }, (_, i) => <Page key={i} index={i} active={i < traits.pages} />)}
      <Feature on={traits.cms} position={[0, -1.6, 0.4]}>
        <Float speed={1.5} floatIntensity={0.6}>
          <RoundedBox args={[0.55, 0.55, 0.55]} radius={0.08} smoothness={4}>
            <meshPhysicalMaterial color={COBALT} metalness={0.5} roughness={0.15} clearcoat={1} />
          </RoundedBox>
        </Float>
      </Feature>
      <Feature on={traits.seo} position={[1.9, -1.2, 0.3]}>
        <Float speed={2} floatIntensity={1}>
          <mesh rotation={[0.5, 0.3, 0.2]}><coneGeometry args={[0.22, 0.55, 3]} /><meshPhysicalMaterial {...CHROME} /></mesh>
        </Float>
      </Feature>
      <Feature on={traits.motion} position={[0, 0, 0.2]}><Ring /></Feature>
      <Feature on={traits.support} position={[-1.9, -1.2, 0.3]}>
        <Float speed={1.8} floatIntensity={0.8}>
          <mesh><sphereGeometry args={[0.22, 32, 32]} /><meshPhysicalMaterial color="#dce5ff" transmission={0.9} thickness={0.6} roughness={0.05} clearcoat={1} transparent /></mesh>
        </Float>
      </Feature>
      {!low && <Sparkles count={18} scale={[6, 4, 3]} size={1.3} speed={0.2} opacity={0.4} color={SOFT} />}
    </Rig>
  );
}

export function LabScene({ traits }: { traits: BuildTraits }) {
  return (
    <SceneFrame mountWhenVisible camera={[0, 0, 8]} fit={3.2} label="Interactive three-dimensional model of the selected website package">
      {(low) => <Model traits={traits} low={low} />}
    </SceneFrame>
  );
}
