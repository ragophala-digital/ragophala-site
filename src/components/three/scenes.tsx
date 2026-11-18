"use client";

import { Float, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { CHROME, COBALT, Cube, Plate, Rig, SOFT, SceneFrame, Spin } from "./shared";

/** Signature sculpture: a gyroscope of chrome rings around a glass sphere, set against layered glass plates. */
export function HeroScene() {
  return (
    <SceneFrame fit={5.2} label="Three-dimensional chrome and glass sculpture">
      {(low) => (
        <Rig>
          {/* layered architectural plates for depth */}
          <Plate position={[0.4, 0.1, -1.6]} rotation={[0, -0.35, 0.04]} size={[4.4, 2.8]} opacity={0.16} />
          <Plate position={[0.9, -0.2, -2.3]} rotation={[0, -0.35, -0.05]} size={[5.2, 3.2]} opacity={0.1} />

          {/* gyroscope rings */}
          <Spin speed={0.12} axis="z">
            <mesh rotation={[1.15, 0.25, 0]}>
              <torusGeometry args={[2.35, 0.26, 48, 180]} />
              <meshPhysicalMaterial {...CHROME} />
            </mesh>
          </Spin>
          <Spin speed={-0.2} axis="x">
            <mesh rotation={[0.2, 0.6, 1.1]}>
              <torusGeometry args={[1.75, 0.1, 32, 160]} />
              <meshPhysicalMaterial {...CHROME} />
            </mesh>
          </Spin>
          {/* glass sphere with cobalt core */}
          <Float speed={1} floatIntensity={0.4}>
            <mesh>
              <sphereGeometry args={[1.2, low ? 40 : 72, low ? 40 : 72]} />
              {low ? (
                <meshPhysicalMaterial color="#dce5ff" transparent opacity={0.45} roughness={0.05} clearcoat={1} metalness={0.1} />
              ) : (
                <MeshTransmissionMaterial samples={4} resolution={512} thickness={1.4} roughness={0.04} ior={1.35} chromaticAberration={0.05} color="#dbe4ff" backside={false} />
              )}
            </mesh>
            <mesh>
              <icosahedronGeometry args={[0.46, 3]} />
              <meshPhysicalMaterial color={COBALT} emissive={COBALT} emissiveIntensity={0.9} roughness={0.2} />
            </mesh>
          </Float>

          {/* modular cubes and orbiting spheres */}
          <Cube position={[2.9, 1.5, 0.6]} size={0.62} kind="chrome" />
          <Cube position={[-2.8, -1.4, 0.8]} size={0.5} kind="cobalt" />
          <Cube position={[-2.4, 1.9, -0.4]} size={0.42} kind="glass" />
          <Cube position={[2.4, -1.9, 0.4]} size={0.36} kind="glass" />
          {!low && <Cube position={[3.4, -0.2, -0.8]} size={0.3} kind="cobalt" />}
          <Float speed={2} floatIntensity={1.4}>
            <mesh position={[-3.2, 0.2, 0.2]}>
              <sphereGeometry args={[0.22, 40, 40]} />
              <meshPhysicalMaterial {...CHROME} />
            </mesh>
          </Float>
          <Sparkles count={low ? 14 : 34} scale={[10, 6, 5]} size={1.6} speed={0.25} opacity={0.5} color={SOFT} />
        </Rig>
      )}
    </SceneFrame>
  );
}

/** Lighter floating composition used as the backdrop of the full-screen mobile menu. */
export function MenuScene() {
  return (
    <SceneFrame camera={[0, 0, 8.5]} fit={3.6} label="Floating chrome and glass objects">
      {(low) => (
        <group>
          <Float speed={1.2} floatIntensity={0.8} rotationIntensity={0.4}>
            <Spin speed={0.18} axis="z">
              <mesh rotation={[1.1, 0.3, 0]}>
                <torusGeometry args={[2.6, 0.3, 40, 140]} />
                <meshPhysicalMaterial {...CHROME} />
              </mesh>
            </Spin>
            <mesh>
              <sphereGeometry args={[1.2, 48, 48]} />
              {low ? (
                <meshPhysicalMaterial color="#dce5ff" transparent opacity={0.4} roughness={0.05} clearcoat={1} />
              ) : (
                <MeshTransmissionMaterial samples={4} resolution={384} thickness={1.2} roughness={0.04} ior={1.35} chromaticAberration={0.04} color="#dbe4ff" backside={false} />
              )}
            </mesh>
            <mesh>
              <icosahedronGeometry args={[0.46, 3]} />
              <meshPhysicalMaterial color={COBALT} emissive={COBALT} emissiveIntensity={0.9} roughness={0.2} />
            </mesh>
          </Float>
          <Cube position={[2.6, 2.3, 0]} size={0.55} kind="chrome" />
          <Cube position={[-2.5, -2.4, 0.4]} size={0.45} kind="cobalt" />
          <Cube position={[-2.4, 2.4, -0.5]} size={0.35} kind="glass" />
          <Sparkles count={low ? 12 : 26} scale={[8, 10, 4]} size={1.5} speed={0.25} opacity={0.5} color={SOFT} />
        </group>
      )}
    </SceneFrame>
  );
}
