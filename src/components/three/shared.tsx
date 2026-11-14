"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer, RoundedBox } from "@react-three/drei";
import { useEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { SceneFallback } from "./Fallback";
import { useCapability, useInView } from "./capability";

/** One lighting and material language shared by every scene: chrome, glass and cobalt. */
export const CHROME = { color: "#eef1f8", metalness: 1, roughness: 0.1, envMapIntensity: 1.7 } as const;
export const COBALT = "#315BFA";
export const SOFT = "#8FA5FF";

export function Studio({ low }: { low: boolean }) {
  return (
    <>
      <fog attach="fog" args={["#101827", 10, 22]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 5]} intensity={2.4} color="#ffffff" />
      <pointLight position={[-6, -2, 3]} intensity={50} color={COBALT} />
      <Environment resolution={low ? 64 : 128} frames={1}>
        <color attach="background" args={["#5f7098"]} />
        <Lightformer form="rect" intensity={5} color="#ffffff" position={[0, 6, 3]} scale={[12, 3, 1]} />
        <Lightformer form="rect" intensity={3} color={SOFT} position={[-7, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 5, 1]} />
        <Lightformer form="rect" intensity={2.5} color={COBALT} position={[7, 0, -2]} rotation-y={-Math.PI / 2} scale={[8, 5, 1]} />
        <Lightformer form="circle" intensity={3} color="#ffffff" position={[0, -4, 4]} scale={4} />
      </Environment>
    </>
  );
}

/** Moves the camera back on narrow canvases so the whole composition always fits with room to float. */
function FitCamera({ halfWidth, minZ }: { halfWidth: number; minZ: number }) {
  const camera = useThree((t) => t.camera) as THREE.PerspectiveCamera;
  const size = useThree((t) => t.size);
  useEffect(() => {
    const aspect = size.width / size.height;
    const needed = halfWidth / (Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * aspect);
    camera.position.z = Math.max(minZ, needed);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height, halfWidth, minZ]);
  return null;
}

interface FrameProps {
  children: (low: boolean) => ReactNode;
  camera?: [number, number, number];
  label?: string;
  /** Half of the horizontal extent (world units) the composition needs; the camera backs off to fit it. */
  fit?: number;
  /** Mount the canvas only while on screen, freeing the WebGL context when scrolled away. */
  mountWhenVisible?: boolean;
}

export function SceneFrame({ children, camera = [0, 0, 9], label = "Three-dimensional composition", mountWhenVisible, fit = 3.8 }: FrameProps) {
  const { ok, low } = useCapability();
  const { ref, visible } = useInView<HTMLDivElement>();
  const show = ok && (!mountWhenVisible || visible);
  return (
    <div ref={ref} className="h-full w-full" role="img" aria-label={label}>
      {show ? (
        <Canvas dpr={low ? 1 : [1, 1.75]} frameloop={visible ? "always" : "never"} camera={{ position: camera, fov: 40 }} gl={{ antialias: !low, alpha: true, powerPreference: "high-performance" }}>
          <Studio low={low} />
          <FitCamera halfWidth={fit} minZ={camera[2]} />
          {children(low)}
        </Canvas>
      ) : (
        <SceneFallback />
      )}
    </div>
  );
}

/** Eases the composition toward the pointer, breathes gently and turns slightly with scroll. */
export function Rig({ children, strength = 0.5, scroll = 0.8 }: { children: ReactNode; strength?: number; scroll?: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s, dt) => {
    if (!g.current) return;
    const sc = Math.min(window.scrollY, 900) / 900;
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, s.pointer.x * strength + sc * scroll, 3, dt);
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, -s.pointer.y * strength * 0.5 + sc * 0.2, 3, dt);
    g.current.position.y = Math.sin(s.clock.elapsedTime * 0.5) * 0.08;
  });
  return <group ref={g}>{children}</group>;
}

export function Spin({ children, speed = 0.15, axis = "y" }: { children: ReactNode; speed?: number; axis?: "x" | "y" | "z" }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation[axis] += dt * speed;
  });
  return <group ref={g}>{children}</group>;
}

export function Cube({ position, size = 0.5, kind }: { position: [number, number, number]; size?: number; kind: "chrome" | "cobalt" | "glass" }) {
  return (
    <Float speed={1.4} floatIntensity={1.1} rotationIntensity={1.2}>
      <RoundedBox args={[size, size, size]} radius={size * 0.14} smoothness={4} position={position} rotation={[0.5, 0.7, 0.1]}>
        {kind === "chrome" && <meshPhysicalMaterial {...CHROME} />}
        {kind === "cobalt" && <meshPhysicalMaterial color={COBALT} metalness={0.5} roughness={0.15} clearcoat={1} envMapIntensity={1.4} />}
        {kind === "glass" && <meshPhysicalMaterial color="#dce5ff" transmission={0.9} thickness={0.8} roughness={0.05} ior={1.4} clearcoat={1} transparent />}
      </RoundedBox>
    </Float>
  );
}

export function Plate({ position, rotation, size, opacity = 0.18 }: { position: [number, number, number]; rotation?: [number, number, number]; size: [number, number]; opacity?: number }) {
  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[size[0], size[1], 0.05]} />
      <meshPhysicalMaterial color="#dce5ff" transparent opacity={opacity} roughness={0.08} clearcoat={1} metalness={0.2} envMapIntensity={1.2} />
    </mesh>
  );
}
