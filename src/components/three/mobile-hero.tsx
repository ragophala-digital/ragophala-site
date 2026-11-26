"use client";

import { useEffect, useRef, useState } from "react";
import {
  AmbientLight, BoxGeometry, DirectionalLight, Group, IcosahedronGeometry,
  Mesh, MeshPhongMaterial, PerspectiveCamera, Scene, SphereGeometry, TorusGeometry, WebGLRenderer,
} from "three";
import { SceneFallback } from "./Fallback";

/** Phone-sized gyroscope with simple lighting and no offscreen material passes. */
export function MobileHeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({ canvas, alpha: true, powerPreference: "low-power" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));

    const scene = new Scene();
    const camera = new PerspectiveCamera(38, 1, 0.1, 40);
    const sculpture = new Group();
    scene.add(sculpture, new AmbientLight(0xa7b1c2, 1.5));
    const key = new DirectionalLight(0xffffff, 3);
    key.position.set(-3, 5, 4);
    const rim = new DirectionalLight(0x8fa5ff, 2.5);
    rim.position.set(4, -1, -2);
    scene.add(key, rim);

    const chrome = new MeshPhongMaterial({ color: 0x8192c3, specular: 0xffffff, shininess: 100 });
    const cobalt = new MeshPhongMaterial({ color: 0x315bfa, emissive: 0x101c62, shininess: 75 });
    const glass = new MeshPhongMaterial({ color: 0x8fa5ff, specular: 0xffffff, shininess: 100, transparent: true, opacity: 0.23, depthWrite: false });
    const wideRing = new Mesh(new TorusGeometry(2.15, 0.16, 12, 56), chrome);
    const innerRing = new Mesh(new TorusGeometry(1.68, 0.085, 10, 48), chrome);
    const core = new Mesh(new IcosahedronGeometry(0.77, 2), cobalt);
    const shell = new Mesh(new SphereGeometry(1.14, 24, 16), glass);
    const cube = new BoxGeometry(0.4, 0.4, 0.4);
    const left = new Mesh(cube, cobalt);
    const right = new Mesh(cube, chrome);
    left.position.set(-2.35, -1.45, 0.15);
    right.position.set(2.28, 1.35, -0.2);
    left.rotation.set(0.5, 0.5, 0.35);
    right.rotation.set(-0.35, 0.6, -0.2);
    sculpture.add(wideRing, innerRing, core, shell, left, right);

    const resize = () => {
      const { clientWidth: width, clientHeight: height } = host;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.position.z = 3.05 / (Math.tan(19 * Math.PI / 180) * Math.min(1, camera.aspect));
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    let frame = 0;
    let last = -Infinity;
    const start = performance.now();
    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (now - last < 1000 / 30) return;
      last = now;
      const time = (now - start) / 1000;
      wideRing.rotation.set(0.95 + Math.sin(time * 0.48) * 0.36, 0.28, -0.38 + time * 0.12);
      innerRing.rotation.set(0.92, 0.6 + Math.sin(time * 0.43) * 0.5, 0.75 - time * 0.19);
      core.rotation.y = time * 0.3;
      sculpture.position.y = Math.sin(time * 1.2) * 0.1;
      renderer.render(scene, camera);
    };
    const onLost = () => {
      cancelAnimationFrame(frame);
      setRendered(false);
    };
    canvas.addEventListener("webglcontextlost", onLost);
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();
    draw(start);
    setRendered(true);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      for (const geometry of [wideRing.geometry, innerRing.geometry, core.geometry, shell.geometry, cube]) geometry.dispose();
      for (const material of [chrome, cobalt, glass]) material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div ref={hostRef} aria-hidden className="relative h-full w-full">
      {!rendered && <SceneFallback sculpture />}
      <canvas ref={canvasRef} className={`absolute inset-0 h-full w-full ${rendered ? "" : "invisible"}`} />
    </div>
  );
}
