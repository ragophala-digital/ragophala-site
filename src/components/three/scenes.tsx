"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, RoundedBox, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
    const low = window.innerWidth < 768 || cores <= 4;
    setState({ ok: webgl && !reduce, low });
  }, []);
  return state;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

function SceneFrame({ children, camera = [0, 0, 6.5], className }: { children: (low: boolean) => ReactNode; camera?: [number, number, number]; className?: string }) {
  const { ok, low } = useCapability();
  const { ref, visible } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={className ?? "h-full w-full"} role="img" aria-label="Interactive 3D illustration">
      {ok ? (
        <Canvas
          dpr={low ? 1 : [1, 1.75]}
          frameloop={visible ? "always" : "never"}
          camera={{ position: camera, fov: 42 }}
          gl={{ antialias: !low, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.55} />
          <directionalLight position={[4, 5, 5]} intensity={2.2} color="#9cc2ff" />
          <pointLight position={[-5, -2, 3]} intensity={30} color="#2f7bff" />
          {children(low)}
        </Canvas>
      ) : (
        <SceneFallback />
      )}
    </div>
  );
}

/** Eases the group toward the pointer for a subtle parallax. */
function Rig({ children, strength = 0.3 }: { children: ReactNode; strength?: number }) {
  const g = useRef<THREE.Group>(null);
  useFrame((s, dt) => {
    if (!g.current) return;
    g.current.rotation.y = THREE.MathUtils.damp(g.current.rotation.y, s.pointer.x * strength, 3, dt);
    g.current.rotation.x = THREE.MathUtils.damp(g.current.rotation.x, -s.pointer.y * strength * 0.6, 3, dt);
  });
  return <group ref={g}>{children}</group>;
}

function Spin({ children, speed = 0.2, axis = "y" }: { children: ReactNode; speed?: number; axis?: "x" | "y" | "z" }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current) g.current.rotation[axis] += dt * speed;
  });
  return <group ref={g}>{children}</group>;
}

/* ---------- reusable 3D objects ---------- */

const BLUE = "#2f7bff";
const LIGHT = "#8ab9ff";

function Win({ position, rotation, scale = 1, lines = 3, accent = BLUE }: { position: [number, number, number]; rotation?: [number, number, number]; scale?: number; lines?: number; accent?: string }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <RoundedBox args={[2.2, 1.45, 0.08]} radius={0.07} smoothness={3}>
        <meshPhysicalMaterial color="#0b1a46" metalness={0.35} roughness={0.3} transparent opacity={0.93} clearcoat={1} />
      </RoundedBox>
      <mesh position={[0, 0.6, 0.05]}>
        <planeGeometry args={[2.12, 0.16]} />
        <meshBasicMaterial color="#16307f" />
      </mesh>
      {[-0.95, -0.82, -0.69].map((x, i) => (
        <mesh key={i} position={[x, 0.6, 0.06]}>
          <circleGeometry args={[0.035, 12]} />
          <meshBasicMaterial color={i === 0 ? "#ff6b6b" : i === 1 ? "#ffd166" : "#5eead4"} />
        </mesh>
      ))}
      <mesh position={[-0.35, 0.25, 0.05]}>
        <planeGeometry args={[1.2, 0.14]} />
        <meshBasicMaterial color={accent} />
      </mesh>
      {Array.from({ length: lines }).map((_, i) => (
        <mesh key={i} position={[-0.2 - i * 0.05, 0.0 - i * 0.2, 0.05]}>
          <planeGeometry args={[1.6 - i * 0.25, 0.07]} />
          <meshBasicMaterial color="#4a6bd0" transparent opacity={0.8} />
        </mesh>
      ))}
      <mesh position={[0.65, -0.45, 0.05]}>
        <planeGeometry args={[0.6, 0.26]} />
        <meshBasicMaterial color={accent} />
      </mesh>
    </group>
  );
}

function Particles({ low, count = 60, color = LIGHT }: { low: boolean; count?: number; color?: string }) {
  return <Sparkles count={low ? Math.floor(count / 2.5) : count} scale={[9, 6, 5]} size={2.2} speed={0.35} opacity={0.7} color={color} />;
}

/* ---------- scenes ---------- */

export function HeroScene() {
  return (
    <SceneFrame camera={[0, 0, 7.2]}>
      {(low) => (
        <Rig strength={0.35}>
          <Float speed={1.4} floatIntensity={0.6} rotationIntensity={0.3}>
            <Spin speed={0.25}>
              <mesh>
                <icosahedronGeometry args={[1.55, 1]} />
                <meshBasicMaterial color={LIGHT} wireframe transparent opacity={0.55} />
              </mesh>
            </Spin>
            <mesh>
              <sphereGeometry args={[1.05, low ? 32 : 64, low ? 32 : 64]} />
              <MeshDistortMaterial color="#1d4ed8" distort={0.28} speed={1.6} roughness={0.15} metalness={0.5} emissive="#0b2f9e" emissiveIntensity={0.6} />
            </mesh>
            <Spin speed={0.45} axis="z">
              <mesh rotation={[1.2, 0, 0]}>
                <torusGeometry args={[2.1, 0.012, 8, 120]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
              </mesh>
            </Spin>
          </Float>
          <Float speed={1.8} floatIntensity={1}>
            <Win position={[-2.5, 1.2, 0.6]} rotation={[0, 0.5, 0.06]} scale={0.8} />
          </Float>
          <Float speed={1.5} floatIntensity={0.9}>
            <Win position={[2.4, -1.1, 0.8]} rotation={[0, -0.5, -0.05]} scale={0.7} lines={2} accent="#5b9bff" />
          </Float>
          {!low && (
            <Float speed={2} floatIntensity={1.2}>
              <Win position={[2.2, 1.7, -0.6]} rotation={[0, -0.4, 0.1]} scale={0.5} lines={1} />
            </Float>
          )}
          <Particles low={low} />
        </Rig>
      )}
    </SceneFrame>
  );
}

export function WebScene() {
  return (
    <SceneFrame camera={[0, 0, 7]}>
      {(low) => (
        <Rig strength={0.4}>
          {[0, 1, 2, 3].map((i) => (
            <Float key={i} speed={1.2 + i * 0.2} floatIntensity={0.5}>
              <Win position={[-1.2 + i * 0.7, 1.1 - i * 0.75, -i * 0.9 + 1]} rotation={[0, 0.35, 0.03]} scale={1.05 - i * 0.06} lines={i % 3 + 1} accent={i % 2 ? "#5b9bff" : BLUE} />
            </Float>
          ))}
          <Float speed={2.2} floatIntensity={1.4}>
            <mesh position={[2.4, 1.5, 1.4]} rotation={[0.5, 0.3, 0.2]}>
              <coneGeometry args={[0.22, 0.5, 3]} />
              <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.2} />
            </mesh>
          </Float>
          <Particles low={low} count={40} />
        </Rig>
      )}
    </SceneFrame>
  );
}

function Bars() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const base = useMemo(() => [0.6, 1.1, 0.8, 1.5, 1.2, 1.9], []);
  useFrame((s) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const h = base[i] * (1 + Math.sin(s.clock.elapsedTime * 1.2 + i) * 0.12);
      m.scale.y = h;
      m.position.y = h / 2 - 0.55;
    });
  });
  return (
    <group position={[-1.5, -0.2, 0.1]}>
      {base.map((_, i) => (
        <mesh key={i} ref={(m) => { refs.current[i] = m; }} position={[i * 0.28, 0, 0]}>
          <boxGeometry args={[0.18, 1, 0.18]} />
          <meshStandardMaterial color={i === 5 ? "#ffffff" : BLUE} emissive={BLUE} emissiveIntensity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export function AppScene() {
  return (
    <SceneFrame camera={[0, 0.2, 7]}>
      {(low) => (
        <Rig strength={0.35}>
          <Float speed={1.1} floatIntensity={0.5}>
            <RoundedBox args={[4.2, 2.7, 0.1]} radius={0.12} smoothness={3} rotation={[0, 0.25, 0]}>
              <meshPhysicalMaterial color="#0a1844" metalness={0.4} roughness={0.25} clearcoat={1} />
            </RoundedBox>
            <group rotation={[0, 0.25, 0]} position={[0, 0, 0.08]}>
              <Bars />
              <mesh position={[1.1, 0.5, 0]}>
                <torusGeometry args={[0.55, 0.08, 16, 64, Math.PI * 1.5]} />
                <meshBasicMaterial color={LIGHT} />
              </mesh>
              {[0, 1, 2].map((i) => (
                <mesh key={i} position={[1.1, -0.45 - i * 0.2, 0]}>
                  <planeGeometry args={[1.1 - i * 0.2, 0.08]} />
                  <meshBasicMaterial color="#4a6bd0" />
                </mesh>
              ))}
              <mesh position={[-1.4, 1.0, 0]}>
                <planeGeometry args={[1.0, 0.12]} />
                <meshBasicMaterial color={BLUE} />
              </mesh>
            </group>
          </Float>
          <Float speed={2} floatIntensity={1.2}>
            <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.08} position={[2.6, -1.3, 1.2]} rotation={[0.4, 0.6, 0]}>
              <meshPhysicalMaterial color="#1f5fe0" metalness={0.5} roughness={0.2} clearcoat={1} />
            </RoundedBox>
          </Float>
          {!low && (
            <Float speed={1.6} floatIntensity={1}>
              <RoundedBox args={[0.55, 0.55, 0.55]} radius={0.06} position={[-2.6, 1.5, 1]} rotation={[0.2, 0.9, 0.3]}>
                <meshPhysicalMaterial color="#ffffff" metalness={0.3} roughness={0.2} clearcoat={1} />
              </RoundedBox>
            </Float>
          )}
          <Particles low={low} count={40} />
        </Rig>
      )}
    </SceneFrame>
  );
}

function Network({ low }: { low: boolean }) {
  const count = low ? 22 : 38;
  const nodes = useMemo(() => {
    const rnd = (() => { let s = 7; return () => ((s = (s * 16807) % 2147483647) / 2147483647); })();
    return Array.from({ length: count }, () => new THREE.Vector3((rnd() - 0.5) * 5.5, (rnd() - 0.5) * 3.8, (rnd() - 0.5) * 3));
  }, [count]);
  const lines = useMemo(() => {
    const pts: number[] = [];
    nodes.forEach((a, i) => nodes.forEach((b, j) => { if (j > i && a.distanceTo(b) < 1.9) pts.push(a.x, a.y, a.z, b.x, b.y, b.z); }));
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [nodes]);
  const meshes = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((s) => meshes.current.forEach((m, i) => m && m.scale.setScalar(1 + Math.sin(s.clock.elapsedTime * 2 + i) * 0.3)));
  return (
    <>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color={BLUE} transparent opacity={0.45} />
      </lineSegments>
      {nodes.map((p, i) => (
        <mesh key={i} position={p} ref={(m) => { meshes.current[i] = m; }}>
          <sphereGeometry args={[i % 7 === 0 ? 0.12 : 0.07, 12, 12]} />
          <meshBasicMaterial color={i % 7 === 0 ? "#ffffff" : LIGHT} />
        </mesh>
      ))}
    </>
  );
}

export function AIScene() {
  return (
    <SceneFrame camera={[0, 0, 7]}>
      {(low) => (
        <Rig strength={0.4}>
          <Spin speed={0.12}>
            <Network low={low} />
          </Spin>
          <Float speed={1.5} floatIntensity={0.5}>
            <mesh>
              <icosahedronGeometry args={[0.7, 2]} />
              <MeshDistortMaterial color="#2f7bff" distort={0.4} speed={2.4} emissive="#1d4ed8" emissiveIntensity={0.8} roughness={0.1} />
            </mesh>
          </Float>
          <Particles low={low} count={40} />
        </Rig>
      )}
    </SceneFrame>
  );
}

export function AboutScene() {
  return (
    <SceneFrame camera={[0, 0, 6.5]}>
      {(low) => (
        <Rig strength={0.4}>
          <Float speed={1.3} floatIntensity={0.7}>
            <Spin speed={0.3}>
              <mesh>
                <octahedronGeometry args={[1.5, 0]} />
                <meshPhysicalMaterial color="#1f5fe0" metalness={0.6} roughness={0.12} clearcoat={1} flatShading />
              </mesh>
              <mesh>
                <octahedronGeometry args={[2.1, 0]} />
                <meshBasicMaterial color={LIGHT} wireframe transparent opacity={0.35} />
              </mesh>
            </Spin>
          </Float>
          <Spin speed={0.6} axis="z">
            <mesh rotation={[1.1, 0.4, 0]}>
              <torusGeometry args={[2.7, 0.015, 8, 140]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
            </mesh>
          </Spin>
          {[0, 1, 2, 3].map((i) => (
            <Float key={i} speed={2 + i * 0.3} floatIntensity={1.2}>
              <mesh position={[Math.cos(i * 1.6) * 2.6, Math.sin(i * 1.6) * 1.6, 0.5]}>
                <octahedronGeometry args={[0.2, 0]} />
                <meshStandardMaterial color="#ffffff" metalness={0.5} roughness={0.2} />
              </mesh>
            </Float>
          ))}
          <Particles low={low} count={40} />
        </Rig>
      )}
    </SceneFrame>
  );
}

export function ServicesScene() {
  return (
    <SceneFrame camera={[0, 0, 8]}>
      {(low) => (
        <Rig strength={0.4}>
          <Spin speed={0.15}>
            <Float speed={1.4} floatIntensity={0.6}>
              <group position={[-2.1, 0.8, 0]}><Win position={[0, 0, 0]} scale={0.7} /></group>
            </Float>
            <Float speed={1.6} floatIntensity={0.6}>
              <RoundedBox args={[1.2, 1.2, 1.2]} radius={0.1} position={[2.1, 0.9, 0]} rotation={[0.4, 0.5, 0]}>
                <meshPhysicalMaterial color="#1f5fe0" metalness={0.5} roughness={0.2} clearcoat={1} />
              </RoundedBox>
            </Float>
            <Float speed={1.2} floatIntensity={0.8}>
              <mesh position={[-1.9, -1.4, 0]}>
                <icosahedronGeometry args={[0.7, 1]} />
                <meshBasicMaterial color={LIGHT} wireframe />
              </mesh>
            </Float>
            <Float speed={1.8} floatIntensity={0.8}>
              <mesh position={[2, -1.3, 0]} rotation={[1, 0.3, 0]}>
                <torusKnotGeometry args={[0.5, 0.14, low ? 64 : 120, 12]} />
                <meshPhysicalMaterial color="#ffffff" metalness={0.5} roughness={0.15} clearcoat={1} />
              </mesh>
            </Float>
          </Spin>
          <mesh>
            <sphereGeometry args={[0.55, 32, 32]} />
            <MeshDistortMaterial color="#2f7bff" distort={0.3} speed={2} emissive="#1d4ed8" emissiveIntensity={0.7} />
          </mesh>
          <Particles low={low} count={40} />
        </Rig>
      )}
    </SceneFrame>
  );
}

export function PricingScene() {
  const tiers = [0.6, 0.9, 1.25, 1.6, 2.0, 2.5];
  return (
    <SceneFrame camera={[0, 0.6, 8]}>
      {(low) => (
        <Rig strength={0.35}>
          <Float speed={1} floatIntensity={0.4}>
            <group position={[-2, -1.4, 0]} rotation={[0, -0.5, 0]}>
              {tiers.map((h, i) => (
                <RoundedBox key={i} args={[0.55, h, 0.55]} radius={0.05} position={[i * 0.75, h / 2, 0]}>
                  <meshPhysicalMaterial color={i === 5 ? "#ffffff" : i === 3 ? "#5b9bff" : "#1f5fe0"} metalness={0.5} roughness={0.2} clearcoat={1} />
                </RoundedBox>
              ))}
            </group>
          </Float>
          <Float speed={2} floatIntensity={1.5}>
            <mesh position={[2.3, 2, 0.5]}>
              <torusGeometry args={[0.35, 0.1, 16, 48]} />
              <meshPhysicalMaterial color="#ffffff" metalness={0.6} roughness={0.15} />
            </mesh>
          </Float>
          <Particles low={low} count={35} />
        </Rig>
      )}
    </SceneFrame>
  );
}

export function ContactScene() {
  return (
    <SceneFrame camera={[0, 0, 6.5]}>
      {(low) => (
        <Rig strength={0.45}>
          <Float speed={1.2} floatIntensity={0.5}>
            <Spin speed={0.18}>
              <mesh>
                <sphereGeometry args={[1.8, 28, 20]} />
                <meshBasicMaterial color={LIGHT} wireframe transparent opacity={0.4} />
              </mesh>
              <mesh>
                <sphereGeometry args={[1.76, 48, 48]} />
                <meshPhysicalMaterial color="#0b1f5c" metalness={0.4} roughness={0.35} />
              </mesh>
              <group rotation={[0.55, 0.5, 0]}>
                <mesh position={[0, 1.95, 0]}>
                  <sphereGeometry args={[0.14, 16, 16]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
                <mesh position={[0, 1.85, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.28, 0.015, 8, 40]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>
            </Spin>
          </Float>
          <Spin speed={0.5} axis="z">
            <mesh rotation={[1.3, 0.2, 0]}>
              <torusGeometry args={[2.5, 0.012, 8, 120]} />
              <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
            </mesh>
          </Spin>
          <Particles low={low} count={40} />
        </Rig>
      )}
    </SceneFrame>
  );
}
