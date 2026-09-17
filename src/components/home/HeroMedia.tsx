"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false },
);

type Props = {
  children: React.ReactNode;
};

export function HeroMedia({ children }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sceneOn, setSceneOn] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    // Mount WebGL after paint so a Three failure cannot block the hero video.
    const t = window.setTimeout(() => setSceneOn(true), 50);
    return () => {
      mq.removeEventListener("change", sync);
      window.clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.autoplay = true;

    const tryPlay = () => {
      void video.play().catch(() => {
        // Keep the element + poster visible; do not tear down the video.
      });
    };

    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    return () => {
      video.removeEventListener("loadeddata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
    };
  }, [reducedMotion]);

  useEffect(() => {
    let frame = 0;

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = rootRef.current;
        const media = mediaRef.current;
        if (!root || !media) return;
        const rect = root.getBoundingClientRect();
        const travel = Math.max(rect.height, window.innerHeight);
        const progress = Math.min(1, Math.max(0, -rect.top / travel));
        setScrollProgress(progress);

        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          const shift = progress * 160;
          const scale = 1.1 + progress * 0.1;
          media.style.transform = `translate3d(0, ${shift}px, 0) scale(${scale})`;
        } else {
          media.style.transform = "none";
        }
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={styles.hero}
      aria-labelledby="hero-brand"
      data-hero="ready"
    >
      <div className={styles.mediaWrap} ref={mediaRef} aria-hidden>
        {reducedMotion ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.video}
            src="/media/hero-poster.jpg"
            alt=""
          />
        ) : (
          <video
            ref={videoRef}
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/media/hero-poster.jpg"
          >
            <source src="/media/hero-ambient.mp4" type="video/mp4" />
            <source src="/media/hero-ambient.webm" type="video/webm" />
          </video>
        )}
        {sceneOn ? (
          <HeroScene
            reducedMotion={reducedMotion}
            scrollProgress={scrollProgress}
          />
        ) : null}
        <div className={styles.grade} />
        <div className={styles.veil} />
      </div>
      <div className={`container ${styles.content}`}>{children}</div>
    </section>
  );
}
