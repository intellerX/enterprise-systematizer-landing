"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import styles from "./landing.module.css";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false },
);

const SMALL_SCREEN = "(max-width: 759px)";

export function SceneBackdrop() {
  const progressRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [detail, setDetail] = useState<"full" | "low">("low");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallMq = window.matchMedia(SMALL_SCREEN);
    const sync = () => {
      setReducedMotion(reduceMq.matches);
      setDetail(smallMq.matches ? "low" : "full");
    };
    sync();
    reduceMq.addEventListener("change", sync);
    smallMq.addEventListener("change", sync);
    const timer = window.setTimeout(() => setShow(true), 60);
    return () => {
      reduceMq.removeEventListener("change", sync);
      smallMq.removeEventListener("change", sync);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || detail === "low") return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const travel = Math.max(window.innerHeight, 1);
        progressRef.current = Math.min(1, Math.max(0, window.scrollY / travel));
      });
    };
    const onPointer = (event: PointerEvent) => {
      pointerRef.current = {
        x: (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1,
        y: (event.clientY / Math.max(window.innerHeight, 1)) * 2 - 1,
      };
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [reducedMotion, detail]);

  return (
    <div className={styles.scene} aria-hidden="true">
      {show ? (
        <HeroScene
          reducedMotion={reducedMotion || detail === "low"}
          detail={detail}
          progressRef={progressRef}
          pointerRef={pointerRef}
        />
      ) : null}
    </div>
  );
}
