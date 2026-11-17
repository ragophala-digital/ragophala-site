"use client";

import { Float, RoundedBox, Sparkles } from "@react-three/drei";
import type { AccentVariant } from "@/lib/accent";
import { CHROME, COBALT, Cube, Plate, Rig, SOFT, SceneFrame, Spin } from "./shared";

const glass = <meshPhysicalMaterial color="#dce5ff" transmission={0.9} thickness={0.8} roughness={0.05} ior={1.4} clearcoat={1} transparent />;

function Shapes({ variant }: { variant: AccentVariant }) {
  switch (variant) {
    case "slabs":
      return (
        <Float speed={1.2} floatIntensity={0.5}>
          {[0, 1, 2, 3].map((i) => (
            <RoundedBox key={i} args={[2.2 - i * 0.3, 0.28, 1.5 - i * 0.2]} radius={0.08} smoothness={4} position={[i * 0.08, i * 0.42 - 0.6, 0]} rotation={[0, i * 0.35, 0]}>
              {i === 3 ? <meshPhysicalMaterial color={COBALT} metalness={0.5} roughness={0.15} clearcoat={1} /> : <meshPhysicalMaterial {...CHROME} />}
            </RoundedBox>
          ))}
        </Float>
      );
    case "knot":
      return (
        <Spin speed={0.25}>
          <mesh><torusKnotGeometry args={[0.9, 0.28, 160, 24]} /><meshPhysicalMaterial {...CHROME} /></mesh>
        </Spin>
      );
    case "orbit":
      return (
        <>
          <Float speed={1.5} floatIntensity={0.8}><mesh><sphereGeometry args={[0.9, 48, 48]} />{glass}</mesh></Float>
          <Spin speed={0.5}><Cube position={[1.7, 0.3, 0]} size={0.5} kind="cobalt" /></Spin>
          <Spin speed={-0.35} axis="x"><Cube position={[0, 1.6, 0.4]} size={0.4} kind="chrome" /></Spin>
        </>
      );
    case "plates":
      return (
        <>
          <Float speed={1} floatIntensity={0.6}><Plate position={[-0.6, -0.3, 0.6]} rotation={[0, 0.4, 0]} size={[2.2, 1.4]} opacity={0.3} /></Float>
          <Float speed={1.4} floatIntensity={0.7}><Plate position={[0.5, 0.4, -0.3]} rotation={[0, 0.4, 0]} size={[2.2, 1.4]} opacity={0.22} /></Float>
          <Cube position={[1.6, -0.9, 0.9]} size={0.45} kind="cobalt" />
        </>
      );
    default:
      return (
        <Spin speed={0.2}>
          <mesh><icosahedronGeometry args={[1.1, 0]} /><meshPhysicalMaterial {...CHROME} flatShading /></mesh>
          <mesh rotation={[1.2, 0.3, 0]}><torusGeometry args={[1.7, 0.03, 16, 90]} /><meshPhysicalMaterial color={COBALT} emissive={COBALT} emissiveIntensity={0.5} /></mesh>
        </Spin>
      );
  }
}

export function AccentScene({ variant }: { variant: AccentVariant }) {
  return (
    <SceneFrame mountWhenVisible camera={[0, 0, 8]} fit={2.6} label="Decorative three-dimensional shapes">
      {(low) => (
        <Rig strength={0.45} scroll={0.5}>
          <Shapes variant={variant} />
          {!low && <Sparkles count={14} scale={[5, 4, 3]} size={1.2} speed={0.2} opacity={0.4} color={SOFT} />}
        </Rig>
      )}
    </SceneFrame>
  );
}
