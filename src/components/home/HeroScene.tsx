"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./Hero.module.css";

type Props = {
  reducedMotion: boolean;
  scrollProgress: number;
};

/** Floating enterprise panels/nodes. Isolated via dynamic import so failures never blank the video. */
export function HeroScene({ reducedMotion, scrollProgress }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(scrollProgress);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let raf = 0;
    let renderer: THREE.WebGLRenderer | null = null;

    try {
      const width = Math.max(mount.clientWidth, window.innerWidth, 320);
      const height = Math.max(mount.clientHeight, window.innerHeight * 0.7, 320);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "default",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
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

      scene.add(new THREE.AmbientLight(0xd7eaf5, 0.85));
      const key = new THREE.DirectionalLight(0x7ef0d0, 1.4);
      key.position.set(2.5, 3.5, 4);
      scene.add(key);

      const configs = [
        { x: -1.9, y: 0.9, z: -0.2, rot: 0.2, color: 0x3dbaa0 },
        { x: 0.2, y: 1.15, z: -0.9, rot: -0.15, color: 0x7ec8e3 },
        { x: 1.85, y: 0.4, z: 0.05, rot: 0.24, color: 0x5ad0b8 },
        { x: -1.0, y: -0.55, z: 0.45, rot: -0.18, color: 0x9fe8d8 },
        { x: 1.25, y: -0.85, z: -0.35, rot: 0.12, color: 0x3dbaa0 },
      ];

      const panelGeo = new THREE.PlaneGeometry(1.4, 0.9);
      const panels: THREE.Mesh[] = [];

      for (const cfg of configs) {
        // Avoid MeshPhysicalMaterial transmission (often invisible / expensive)
        const mat = new THREE.MeshStandardMaterial({
          color: cfg.color,
          transparent: true,
          opacity: 0.45,
          roughness: 0.35,
          metalness: 0.25,
          emissive: cfg.color,
          emissiveIntensity: 0.18,
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
            color: 0xe8f7f3,
            transparent: true,
            opacity: 0.85,
          }),
        );
        edge.position.copy(mesh.position);
        edge.rotation.copy(mesh.rotation);
        root.add(edge);
      }

      const nodeGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0xb8fff0,
        emissive: 0x3dbaa0,
        emissiveIntensity: 1.1,
      });
      const nodePos = [
        [-2.2, 1.35, 0.3],
        [0.55, 1.55, -0.4],
        [2.25, 0.75, 0.25],
        [-0.15, -1.1, 0.55],
        [2.0, -1.15, 0],
        [-1.85, -0.15, 0.65],
      ] as const;
      const nodes: THREE.Mesh[] = [];
      for (const [x, y, z] of nodePos) {
        const n = new THREE.Mesh(nodeGeo, nodeMat);
        n.position.set(x, y, z);
        root.add(n);
        nodes.push(n);
      }

      const lineMat = new THREE.LineBasicMaterial({
        color: 0x7ec8e3,
        transparent: true,
        opacity: 0.45,
      });
      for (let i = 0; i < nodes.length - 1; i++) {
        const geo = new THREE.BufferGeometry().setFromPoints([
          nodes[i].position,
          nodes[i + 1].position,
        ]);
        root.add(new THREE.Line(geo, lineMat));
      }

      const grid = new THREE.GridHelper(12, 24, 0x3dbaa0, 0x243246);
      grid.position.y = -1.7;
      const gm = grid.material;
      if (Array.isArray(gm)) {
        gm.forEach((m) => {
          m.transparent = true;
          m.opacity = 0.45;
        });
      } else {
        gm.transparent = true;
        gm.opacity = 0.45;
      }
      scene.add(grid);

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
        const p = progressRef.current;

        if (!reducedMotion) {
          root.position.y = -p * 1.5;
          root.rotation.y = p * 0.32 + Math.sin(t * 0.35) * 0.06;
          root.rotation.x = p * 0.1;
          camera.position.z = 5.6 + p * 1.1;
          panels.forEach((mesh, i) => {
            mesh.position.y =
              configs[i].y + Math.sin(t * 0.8 + i) * 0.1 - p * 0.4;
          });
        }

        renderer.render(scene, camera);
        if (!reducedMotion) raf = requestAnimationFrame(tick);
      };

      renderer.render(scene, camera);
      if (!reducedMotion) raf = requestAnimationFrame(tick);
      else renderer.render(scene, camera);

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
  }, [reducedMotion]);

  return <div className={styles.scene} ref={mountRef} aria-hidden data-hero-scene="1" />;
}
