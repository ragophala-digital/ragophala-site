"use client";

import { useFrame } from "@react-three/fiber";
import { Float, Line, RoundedBox, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { CHROME, COBALT, Cube, Rig, SOFT, SceneFrame, Spin } from "./shared";
import { drawChat, drawDashboard, drawEnquiry, drawWebsiteBooking, drawWebsiteHome, drawWebsiteShop, useCanvasTexture } from "./textures";

/* ---------- Website development: layered browser composition ---------- */

type SiteKind = "home" | "shop" | "booking";
const SITE_DRAW = { home: drawWebsiteHome, shop: drawWebsiteShop, booking: drawWebsiteBooking };

function BrowserWindow({ position, rotation, kind }: { position: [number, number, number]; rotation?: [number, number, number]; kind: SiteKind }) {
  const tex = useCanvasTexture(SITE_DRAW[kind], 1200, 720);
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox args={[3.2, 2.0, 0.16]} radius={0.09} smoothness={4}>
        <meshPhysicalMaterial {...CHROME} />
      </RoundedBox>
      <mesh position={[0, 0, 0.09]}>
        <planeGeometry args={[3.0, 1.8]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function WebScene3D() {
  return (
    <SceneFrame mountWhenVisible camera={[0, 0, 8]} label="Layered three-dimensional website composition">
      {(low) => (
        <Rig strength={0.4} scroll={0.3}>
          <Float speed={1} floatIntensity={0.4}><BrowserWindow kind="home" position={[-0.7, -0.35, 0.8]} rotation={[0, 0.38, 0.02]} /></Float>
          <Float speed={1.3} floatIntensity={0.5}><BrowserWindow kind="shop" position={[0.6, 0.45, -0.5]} rotation={[0, 0.38, 0.02]} /></Float>
          <Float speed={1.6} floatIntensity={0.6}><BrowserWindow kind="booking" position={[1.9, 1.2, -1.8]} rotation={[0, 0.38, 0.02]} /></Float>
          <Float speed={2} floatIntensity={1.2}>
            <mesh position={[1.4, -1.2, 1.5]} rotation={[0.6, 0.2, 0.3]}>
              <coneGeometry args={[0.2, 0.5, 3]} />
              <meshPhysicalMaterial {...CHROME} />
            </mesh>
          </Float>
          <Cube position={[-2.6, 1.3, 0.2]} size={0.4} kind="cobalt" />
          {!low && <Sparkles count={20} scale={[8, 5, 4]} size={1.4} speed={0.2} opacity={0.45} color={SOFT} />}
        </Rig>
      )}
    </SceneFrame>
  );
}

/* ---------- Web applications: floating layered dashboard ---------- */

function AnimatedBars() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const base = useMemo(() => [0.5, 0.8, 0.65, 1.1, 0.9, 1.35, 1.0], []);
  useFrame((s) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const h = base[i] * 0.8 * (1 + Math.sin(s.clock.elapsedTime * 1.1 + i * 0.8) * 0.12);
      m.scale.y = h;
      m.position.y = h / 2 - 0.7;
    });
  });
  return (
    <group position={[-0.8, -0.35, 0.1]}>
      {base.map((_, i) => (
        <mesh key={i} ref={(m) => { refs.current[i] = m; }} position={[i * 0.3, 0, 0]}>
          <boxGeometry args={[0.18, 1, 0.12]} />
          <meshPhysicalMaterial color={i === 5 ? "#ffffff" : COBALT} emissive={COBALT} emissiveIntensity={i === 5 ? 0.1 : 0.45} roughness={0.25} />
        </mesh>
      ))}
    </group>
  );
}

function DashboardScreen() {
  const tex = useCanvasTexture(drawDashboard, 1260, 780);
  return (
    <mesh position={[0, 0, 0.08]}>
      <planeGeometry args={[4.2 - 0.12, 2.6 - 0.12]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  );
}

export function AppsScene3D() {
  return (
    <SceneFrame mountWhenVisible camera={[0, 0, 8]} label="Floating three-dimensional software dashboard">
      {(low) => (
        <Rig strength={0.4} scroll={0.3}>
          <Float speed={1} floatIntensity={0.35}>
            <group rotation={[0, 0.3, 0]}>
              <RoundedBox args={[4.2, 2.6, 0.14]} radius={0.1} smoothness={4}>
                <meshPhysicalMaterial color="#1b2745" metalness={0.5} roughness={0.2} clearcoat={1} envMapIntensity={1.2} />
              </RoundedBox>
              <DashboardScreen />
              <group position={[0, 0, 0.1]}>
                <AnimatedBars />
              </group>
            </group>
          </Float>
          <Float speed={1.5} floatIntensity={0.7}>
            <RoundedBox args={[1.7, 1.0, 0.1]} radius={0.08} smoothness={4} position={[-2.3, -1.4, 1.1]} rotation={[0, 0.3, 0]}>
              <meshPhysicalMaterial color="#dce5ff" transparent opacity={0.55} roughness={0.08} clearcoat={1} />
            </RoundedBox>
          </Float>
          <Float speed={1.8} floatIntensity={0.8}>
            <RoundedBox args={[1.5, 0.9, 0.1]} radius={0.08} smoothness={4} position={[2.5, 1.5, 0.9]} rotation={[0, 0.3, 0]}>
              <meshPhysicalMaterial {...CHROME} />
            </RoundedBox>
          </Float>
          <Cube position={[2.6, -1.5, 1.0]} size={0.45} kind="cobalt" />
          {!low && <Sparkles count={16} scale={[8, 5, 4]} size={1.4} speed={0.2} opacity={0.4} color={SOFT} />}
        </Rig>
      )}
    </SceneFrame>
  );
}

/* ---------- AI agents: connected intelligence structure ---------- */

function fibonacciShell(n: number, radius: number): THREE.Vector3[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = i * golden;
    return new THREE.Vector3(Math.cos(t) * r * radius, y * radius, Math.sin(t) * r * radius);
  });
}

function Pulses({ edges }: { edges: [THREE.Vector3, THREE.Vector3][] }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const picks = useMemo(() => [0, 5, 9, 14].map((n) => n % edges.length), [edges.length]);
  useFrame((s) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const [a, b] = edges[picks[i]];
      const t = (s.clock.elapsedTime * 0.35 + i * 0.27) % 1;
      m.position.lerpVectors(a, b, t);
    });
  });
  return (
    <>
      {picks.map((_, i) => (
        <mesh key={i} ref={(m) => { refs.current[i] = m; }}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      ))}
    </>
  );
}

function ChatCard() {
  const tex = useCanvasTexture(drawChat, 700, 900);
  return (
    <group position={[1.85, -0.5, 1.4]} rotation={[0, -0.3, 0.03]}>
      <RoundedBox args={[1.5, 1.9, 0.08]} radius={0.08} smoothness={4}><meshPhysicalMaterial {...CHROME} /></RoundedBox>
      <mesh position={[0, 0, 0.05]}><planeGeometry args={[1.4, 1.8]} /><meshBasicMaterial map={tex} toneMapped={false} /></mesh>
    </group>
  );
}

export function AiScene3D() {
  const { nodes, edges } = useMemo(() => {
    const pts = fibonacciShell(16, 2.1);
    const list: [THREE.Vector3, THREE.Vector3][] = [];
    pts.forEach((p, i) => {
      const sorted = pts.map((q, j) => ({ j, d: p.distanceTo(q) })).filter((o) => o.j !== i).sort((a, b) => a.d - b.d).slice(0, 2);
      sorted.forEach((o) => { if (o.j > i) list.push([p, pts[o.j]]); });
      if (i % 3 === 0) list.push([new THREE.Vector3(0, 0, 0), p]);
    });
    return { nodes: pts, edges: list };
  }, []);
  return (
    <SceneFrame mountWhenVisible camera={[0, 0, 8]} label="Abstract connected intelligence structure">
      {(low) => (
        <Rig strength={0.4} scroll={0.2}>
          <Spin speed={0.15}>
            {edges.map(([a, b], i) => (<Line key={i} points={[a, b]} color={SOFT} lineWidth={1} transparent opacity={0.45} />))}
            {nodes.map((p, i) => (
              <mesh key={i} position={p}>
                <sphereGeometry args={[i % 4 === 0 ? 0.16 : 0.1, 24, 24]} />
                {i % 4 === 0 ? <meshPhysicalMaterial {...CHROME} /> : <meshPhysicalMaterial color="#dce5ff" roughness={0.1} clearcoat={1} emissive={COBALT} emissiveIntensity={0.3} />}
              </mesh>
            ))}
            <Pulses edges={edges} />
          </Spin>
          <Float speed={1.3} floatIntensity={0.5}><ChatCard /></Float>
          <Float speed={1.1} floatIntensity={0.3}>
            <mesh>
              <icosahedronGeometry args={[0.62, 3]} />
              <meshPhysicalMaterial color={COBALT} emissive={COBALT} emissiveIntensity={1} roughness={0.2} />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.95, 48, 48]} />
              <meshPhysicalMaterial color="#dce5ff" transparent opacity={0.16} roughness={0.05} clearcoat={1} />
            </mesh>
          </Float>
          {!low && <Sparkles count={24} scale={[7, 5, 5]} size={1.4} speed={0.25} opacity={0.5} color={SOFT} />}
        </Rig>
      )}
    </SceneFrame>
  );
}

/* ---------- Business automation: modular process network ---------- */

const NODE_POS: [number, number, number][] = [[-3.1, -0.9, 0], [-1.9, 0.8, 0.5], [-0.55, -0.5, -0.4], [0.9, 0.9, 0.3], [2.2, -0.5, 0.6], [3.2, 0.8, -0.3]];

function AutomationNetwork() {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(NODE_POS.map((p) => new THREE.Vector3(...p))), []);
  const points = useMemo(() => curve.getPoints(90), [curve]);
  const pulse = useRef<THREE.Mesh>(null);
  const nodeRefs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((s) => {
    const t = (s.clock.elapsedTime * 0.12) % 1;
    pulse.current?.position.copy(curve.getPoint(t));
    nodeRefs.current.forEach((m, i) => {
      if (!m) return;
      const ti = i / (NODE_POS.length - 1);
      const d = Math.min(Math.abs(t - ti), 1 - Math.abs(t - ti));
      (m.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.15 + Math.exp(-((d * 9) ** 2)) * 1.6;
    });
  });
  return (
    <group>
      <Line points={points} color={SOFT} lineWidth={1.2} transparent opacity={0.5} />
      {NODE_POS.map((p, i) => (
        <mesh key={i} ref={(m) => { nodeRefs.current[i] = m; }} position={p} rotation={[0.5, 0.6, 0]}>
          {i % 3 === 0 && <boxGeometry args={[0.55, 0.55, 0.55]} />}
          {i % 3 === 1 && <octahedronGeometry args={[0.42, 0]} />}
          {i % 3 === 2 && <sphereGeometry args={[0.36, 32, 32]} />}
          <meshPhysicalMaterial color="#eef1f8" metalness={0.9} roughness={0.12} emissive={COBALT} emissiveIntensity={0.15} envMapIntensity={1.5} />
        </mesh>
      ))}
      <mesh ref={pulse}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}

function EnquiryCard() {
  const tex = useCanvasTexture(drawEnquiry, 800, 500);
  return (
    <group position={[-1.6, 1.75, 1.1]} rotation={[0, 0.25, 0.02]}>
      <RoundedBox args={[1.8, 1.16, 0.06]} radius={0.07} smoothness={4}><meshPhysicalMaterial {...CHROME} /></RoundedBox>
      <mesh position={[0, 0, 0.04]}><planeGeometry args={[1.72, 1.075]} /><meshBasicMaterial map={tex} toneMapped={false} transparent /></mesh>
    </group>
  );
}

export function AutomationScene3D() {
  return (
    <SceneFrame mountWhenVisible camera={[0, 0, 8.5]} label="Modular network of connected process elements">
      {(low) => (
        <Rig strength={0.35} scroll={0.2}>
          <Float speed={1} floatIntensity={0.3}><AutomationNetwork /></Float>
          <Float speed={1.4} floatIntensity={0.5}><EnquiryCard /></Float>
          <Cube position={[0, 2.0, -1]} size={0.35} kind="glass" />
          <Cube position={[-2.2, -2.0, 0.4]} size={0.3} kind="cobalt" />
          {!low && <Sparkles count={20} scale={[9, 5, 4]} size={1.4} speed={0.2} opacity={0.45} color={SOFT} />}
        </Rig>
      )}
    </SceneFrame>
  );
}
