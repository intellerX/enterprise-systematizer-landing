"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./Hero.module.css";

type Props = {
  reducedMotion: boolean;
  scrollProgress: number;
};

/**
 * Enterprise abstract scene inspired by cinematic marketing sites (e.g. typesafe.ai motion language):
 * floating glass panels + node accents. Scroll drives subtle parallax on the group.
 */
export function HeroScene({ reducedMotion, scrollProgress }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(scrollProgress);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.15, 6.2);

    const root = new THREE.Group();
    scene.add(root);

    const ambient = new THREE.AmbientLight(0xb7d7e8, 0.55);
    const key = new THREE.DirectionalLight(0x3dbaa0, 1.15);
    key.position.set(3, 4, 5);
    const fill = new THREE.DirectionalLight(0x7ec8e3, 0.55);
    fill.position.set(-4, -1, 2);
    scene.add(ambient, key, fill);

    const panels: THREE.Mesh[] = [];
    const panelGeo = new THREE.PlaneGeometry(1.35, 0.85, 1, 1);

    const configs = [
      { x: -2.1, y: 0.85, z: -0.4, rot: 0.18, color: 0x3dbaa0 },
      { x: 0.15, y: 1.25, z: -1.1, rot: -0.12, color: 0x7ec8e3 },
      { x: 2.0, y: 0.35, z: -0.2, rot: 0.22, color: 0x5ad0b8 },
      { x: -1.1, y: -0.7, z: 0.35, rot: -0.2, color: 0x7ec8e3 },
      { x: 1.35, y: -0.95, z: -0.55, rot: 0.14, color: 0x3dbaa0 },
    ];

    for (const cfg of configs) {
      const mat = new THREE.MeshPhysicalMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.22,
        roughness: 0.25,
        metalness: 0.15,
        transmission: 0.55,
        thickness: 0.4,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(panelGeo, mat);
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      mesh.rotation.y = cfg.rot;
      mesh.rotation.x = -0.18;
      root.add(mesh);
      panels.push(mesh);

      const edge = new THREE.LineSegments(
        new THREE.EdgesGeometry(panelGeo),
        new THREE.LineBasicMaterial({
          color: cfg.color,
          transparent: true,
          opacity: 0.7,
        }),
      );
      edge.position.copy(mesh.position);
      edge.rotation.copy(mesh.rotation);
      root.add(edge);
    }

    const nodes: THREE.Mesh[] = [];
    const nodeGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x9fe8d8,
      emissive: 0x1a5a4c,
      emissiveIntensity: 0.8,
    });
    const nodePositions = [
      [-2.4, 1.4, 0.2],
      [0.4, 1.7, -0.5],
      [2.45, 0.8, 0.15],
      [-0.2, -1.2, 0.5],
      [2.1, -1.3, -0.1],
      [-2.0, -0.2, 0.6],
    ] as const;
    for (const [x, y, z] of nodePositions) {
      const n = new THREE.Mesh(nodeGeo, nodeMat);
      n.position.set(x, y, z);
      root.add(n);
      nodes.push(n);
    }

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x7ec8e3,
      transparent: true,
      opacity: 0.28,
    });
    for (let i = 0; i < nodes.length - 1; i++) {
      const a = nodes[i].position;
      const b = nodes[i + 1].position;
      const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
      root.add(new THREE.Line(geo, lineMat));
    }

    // Soft floor grid (2D cue)
    const grid = new THREE.GridHelper(10, 20, 0x3dbaa0, 0x1e2a3a);
    grid.position.y = -1.85;
    grid.material.transparent = true;
    // GridHelper materials can be array
    const gm = grid.material;
    if (Array.isArray(gm)) {
      gm.forEach((m) => {
        m.transparent = true;
        m.opacity = 0.35;
      });
    } else {
      gm.transparent = true;
      gm.opacity = 0.35;
    }
    scene.add(grid);

    let raf = 0;
    const start = performance.now();
    let alive = true;

    function onResize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    function tick(now: number) {
      if (!alive) return;
      const t = (now - start) / 1000;
      const p = progressRef.current;

      if (!reducedMotion) {
        root.position.y = -p * 1.35;
        root.rotation.y = p * 0.28 + Math.sin(t * 0.25) * 0.04;
        root.rotation.x = p * 0.08;
        camera.position.z = 6.2 + p * 0.9;
        panels.forEach((mesh, i) => {
          mesh.position.y =
            configs[i].y + Math.sin(t * 0.7 + i) * 0.08 - p * 0.35;
          mesh.rotation.y = configs[i].rot + Math.sin(t * 0.4 + i) * 0.05;
        });
      } else {
        root.position.y = 0;
        root.rotation.set(0, 0.12, 0);
      }

      renderer.render(scene, camera);
      if (!reducedMotion) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    if (reducedMotion) {
      renderer.render(scene, camera);
    }

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      panelGeo.dispose();
      nodeGeo.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  return <div className={styles.scene} ref={mountRef} aria-hidden />;
}
