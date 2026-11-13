"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshTransmissionMaterial, RoundedBox, Sparkles } from "@react-three/drei";
import { useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { SceneFallback } from "./Fallback";

/* ---------- environment / performance helpers ---------- */

function useCapability() {
  const [state, setState] = useState<{ ok: boolean; low: boolean }>({ ok: false, low: false });
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    const cores = navigator.hardwareConcurrency ?? 4;
    setState({ ok: webgl && !reduce, low: window.innerWidth < 768 || cores <= 4 });
  }, []);
  return state;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "120px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function SceneFrame({ children, camera = [0, 0, 9] }: { children: (low: boolean) => ReactNode; camera?: [number, number, number] }) {
  const { ok, low } = useCapability();
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="h-full w-full" role="img" aria-label="Three-dimensional composition of chrome and glass geometric objects">
      {ok ? (
        <Canvas dpr={low ? 1 : [1, 1.75]} frameloop={visible ? "always" : "never"} camera={{ position: camera, fov: 40 }} gl={{ antialias: !low, alpha: true, powerPreference: "high-performance" }}>
          <fog attach="fog" args={["#101827", 10, 22]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 6, 5]} intensity={2.4} color="#ffffff" />
          <pointLight position={[-6, -2, 3]} intensity={50} color="#315BFA" />
          <Environment resolution={low ? 64 : 128} frames={1}>
            <color attach="background" args={["#5f7098"]} />
            <Lightformer form="rect" intensity={5} color="#ffffff" position={[0, 6, 3]} scale={[12, 3, 1]} />
            <Lightformer form="rect" intensity={3} color="#8FA5FF" position={[-7, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 5, 1]} />
            <Lightformer form="rect" intensity={2.5} color="#315BFA" position={[7, 0, -2]} rotation-y={-Math.PI / 2} scale={[8, 5, 1]} />
            <Lightformer form="circle" intensity={3} color="#ffffff" position={[0, -4, 4]} scale={4} />
          </Environment>
          {children(low)}
        </Canvas>
      ) : (
        <SceneFallback />
      )}
    </div>
  );
}

/** Eases the composition toward the pointer and turns it gently with scroll. */
function Rig({ children }: { children: ReactNode }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s, dt) => {
    if (!g.current) return;
    const scroll = Math.min(window.scrollY, 800) / 800;
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, s.pointer.x * 0.5 + scroll * 0.8, 3, dt);
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, -s.pointer.y * 0.25 + scroll * 0.2, 3, dt);
  });
  return <group ref={g}>{children}</group>;
}

function Spin({ children, speed = 0.15, axis = "y" }: { children: ReactNode; speed?: number; axis?: "x" | "y" | "z" }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation[axis] += dt * speed;
  });
  return <group ref={g}>{children}</group>;
}

const CHROME = { color: "#eef1f8", metalness: 1, roughness: 0.1, envMapIntensity: 1.7 } as const;

function Cube({ position, size = 0.5, kind }: { position: [number, number, number]; size?: number; kind: "chrome" | "cobalt" | "glass" }) {
  return (
    <Float speed={1.4} floatIntensity={1.1} rotationIntensity={1.2}>
      <RoundedBox args={[size, size, size]} radius={size * 0.14} smoothness={4} position={position} rotation={[0.5, 0.7, 0.1]}>
        {kind === "chrome" && <meshPhysicalMaterial {...CHROME} />}
        {kind === "cobalt" && <meshPhysicalMaterial color="#315BFA" metalness={0.5} roughness={0.15} clearcoat={1} envMapIntensity={1.4} />}
        {kind === "glass" && <meshPhysicalMaterial color="#dce5ff" transmission={0.9} thickness={0.8} roughness={0.05} ior={1.4} clearcoat={1} transparent />}
      </RoundedBox>
    </Float>
  );
}

export function HeroScene() {
  return (
    <SceneFrame>
      {(low) => (
        <Rig>
          {/* architectural chrome ring */}
          <Spin speed={0.12} axis="z">
            <mesh rotation={[1.15, 0.25, 0]}>
              <torusGeometry args={[2.35, 0.26, 48, 180]} />
              <meshPhysicalMaterial {...CHROME} />
            </mesh>
          </Spin>
          {/* thin outer ring */}
          <Spin speed={-0.08} axis="y">
            <mesh rotation={[0.35, 0, 0.5]}>
              <torusGeometry args={[3.3, 0.012, 8, 220]} />
              <meshBasicMaterial color="#8FA5FF" transparent opacity={0.55} />
            </mesh>
          </Spin>
          {/* glass sphere with a cobalt core */}
          <Float speed={1.1} floatIntensity={0.5}>
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
              <meshPhysicalMaterial color="#315BFA" emissive="#315BFA" emissiveIntensity={0.9} roughness={0.2} />
            </mesh>
          </Float>
          {/* modular cubes */}
          <Cube position={[2.9, 1.5, 0.6]} size={0.62} kind="chrome" />
          <Cube position={[-2.8, -1.4, 0.8]} size={0.5} kind="cobalt" />
          <Cube position={[-2.4, 1.9, -0.4]} size={0.42} kind="glass" />
          <Cube position={[2.4, -1.9, 0.4]} size={0.36} kind="glass" />
          {!low && <Cube position={[3.4, -0.2, -0.8]} size={0.3} kind="cobalt" />}
          <Sparkles count={low ? 16 : 36} scale={[10, 6, 5]} size={1.6} speed={0.25} opacity={0.55} color="#8FA5FF" />
        </Rig>
      )}
    </SceneFrame>
  );
}
