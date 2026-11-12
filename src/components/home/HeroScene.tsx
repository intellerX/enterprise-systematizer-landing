"use client";

import { useEffect, useRef, type RefObject } from "react";
import * as THREE from "three";
import styles from "./Hero.module.css";

type Detail = "full" | "low";

type Props = {
  reducedMotion: boolean;
  detail: Detail;
  progressRef: RefObject<number>;
  pointerRef: RefObject<{ x: number; y: number }>;
};

const PANEL_CONFIGS = [
  { x: -1.9, y: 0.9, z: -0.2, rot: 0.2, color: 0x7aa2ff },
  { x: 0.2, y: 1.15, z: -0.9, rot: -0.15, color: 0x8ee7ff },
  { x: 1.85, y: 0.4, z: 0.05, rot: 0.24, color: 0xb9cbff },
  { x: -1.0, y: -0.55, z: 0.45, rot: -0.18, color: 0x6d8cff },
  { x: 1.25, y: -0.85, z: -0.35, rot: 0.12, color: 0x9eb6ff },
];

const NODE_POS = [
  [-2.2, 1.35, 0.3],
  [0.55, 1.55, -0.4],
  [2.25, 0.75, 0.25],
  [-0.15, -1.1, 0.55],
  [2.0, -1.15, 0],
  [-1.85, -0.15, 0.65],
] as const;

/** Floating glass panels and nodes. Same scene as before the factory redesign, retinted indigo. */
export function HeroScene({ reducedMotion, detail, progressRef, pointerRef }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let raf = 0;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      const low = detail === "low";
      const width = Math.max(mount.clientWidth, low ? 320 : window.innerWidth, 320);
      const height = Math.max(mount.clientHeight, low ? 320 : window.innerHeight * 0.7, 320);
      const configs = low ? PANEL_CONFIGS.slice(0, 3) : PANEL_CONFIGS;
      const nodePos = low ? NODE_POS.slice(0, 3) : NODE_POS;

      renderer = new THREE.WebGLRenderer({
        antialias: !low,
        alpha: true,
        powerPreference: low ? "low-power" : "default",
      });
      renderer.setPixelRatio(low ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(width, height, false);
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0.2, 5.6);

      const root = new THREE.Group();
      scene.add(root);

      scene.add(new THREE.AmbientLight(0xd7e2ff, 0.7));
      const key = new THREE.DirectionalLight(0x8ee7ff, 1.15);
      key.position.set(2.5, 3.5, 4);
      scene.add(key);

      const panelGeo = new THREE.PlaneGeometry(1.4, 0.9);
      const panels: THREE.Mesh[] = [];

      for (const cfg of configs) {
        const mat = new THREE.MeshStandardMaterial({
          color: cfg.color,
          transparent: true,
          opacity: 0.32,
          roughness: 0.35,
          metalness: 0.25,
          emissive: cfg.color,
          emissiveIntensity: 0.16,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(panelGeo, mat);
        mesh.position.set(cfg.x, cfg.y, cfg.z);
        mesh.rotation.set(-0.2, cfg.rot, 0);
        root.add(mesh);
        panels.push(mesh);

        const edge = new THREE.LineSegments(
          new THREE.EdgesGeometry(panelGeo),
          new THREE.LineBasicMaterial({
            color: 0xdbe4ff,
            transparent: true,
            opacity: 0.62,
          }),
        );
        edge.position.copy(mesh.position);
        edge.rotation.copy(mesh.rotation);
        root.add(edge);
      }

      const nodeGeo = new THREE.SphereGeometry(0.06, low ? 8 : 16, low ? 8 : 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0xd5e4ff,
        emissive: 0x6d8cff,
        emissiveIntensity: 0.9,
      });
      const nodes: THREE.Mesh[] = [];
      for (const [x, y, z] of nodePos) {
        const n = new THREE.Mesh(nodeGeo, nodeMat);
        n.position.set(x, y, z);
        root.add(n);
        nodes.push(n);
      }

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x8ee7ff,
        transparent: true,
        opacity: 0.32,
      });
      for (let i = 0; i < nodes.length - 1; i++) {
        const geo = new THREE.BufferGeometry().setFromPoints([
          nodes[i].position,
          nodes[i + 1].position,
        ]);
        root.add(new THREE.Line(geo, lineMat));
      }

      if (!low) {
        const grid = new THREE.GridHelper(12, 24, 0x8ee7ff, 0x1c2a52);
        grid.position.y = -1.7;
        const gm = grid.material;
        if (Array.isArray(gm)) {
          gm.forEach((m) => {
            m.transparent = true;
            m.opacity = 0.28;
          });
        } else {
          gm.transparent = true;
          gm.opacity = 0.28;
        }
        scene.add(grid);
      }

      const start = performance.now();

      const onResize = () => {
        if (!renderer || !mount) return;
        const w = Math.max(mount.clientWidth, 320);
        const h = Math.max(mount.clientHeight, 320);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      };
      window.addEventListener("resize", onResize);

      const tick = (now: number) => {
        if (disposed || !renderer) return;
        const t = (now - start) / 1000;
        const p = progressRef.current ?? 0;
        const pointer = pointerRef.current ?? { x: 0, y: 0 };

        if (!reducedMotion) {
          root.position.y = -p * 1.5;
          root.rotation.y = p * 0.32 + Math.sin(t * 0.35) * 0.06 + pointer.x * 0.14;
          root.rotation.x = p * 0.1 - pointer.y * 0.08;
          camera.position.x = pointer.x * 0.28;
          camera.position.y = 0.2 - pointer.y * 0.16;
          camera.position.z = 5.6 + p * 1.1;
          panels.forEach((mesh, i) => {
            mesh.position.y = configs[i].y + Math.sin(t * 0.8 + i) * 0.1 - p * 0.4;
          });
        }

        renderer.render(scene, camera);
        if (!reducedMotion) raf = requestAnimationFrame(tick);
      };

      renderer.render(scene, camera);
      if (!reducedMotion) raf = requestAnimationFrame(tick);

      return () => {
        disposed = true;
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        panelGeo.dispose();
        nodeGeo.dispose();
        renderer?.dispose();
        if (renderer && mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    } catch (err) {
      console.error("[HeroScene] WebGL init failed", err);
      return;
    }
  }, [reducedMotion, detail, progressRef, pointerRef]);

  return <div className={styles.scene} ref={mountRef} aria-hidden data-hero-scene="1" />;
}
