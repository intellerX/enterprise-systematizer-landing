"use client";

import { useEffect, useRef, useState } from "react";
import { HeroScene } from "./HeroScene";
import styles from "./Hero.module.css";

type Props = {
  children: React.ReactNode;
};

export function HeroMedia({ children }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [introReady, setIntroReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    queueMicrotask(sync);
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setIntroReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        setVideoFailed(true);
      }
    };

    void tryPlay();
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("error", () => setVideoFailed(true));
    return () => {
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
        const progress = Math.min(
          1,
          Math.max(0, -rect.top / travel),
        );
        setScrollProgress(progress);

        if (!reducedMotion) {
          // Stronger, visible parallax on the media stack
          const shift = progress * 140;
          const scale = 1.12 + progress * 0.08;
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
  }, [reducedMotion]);

  return (
    <section
      ref={rootRef}
      className={`${styles.hero} ${introReady ? styles.heroReady : ""}`}
      aria-labelledby="hero-brand"
    >
      <div className={styles.mediaWrap} ref={mediaRef} aria-hidden>
        {!reducedMotion && !videoFailed ? (
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
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.video}
            src="/media/hero-poster.jpg"
            alt=""
          />
        )}
        <HeroScene reducedMotion={reducedMotion} scrollProgress={scrollProgress} />
        <div className={styles.grade} />
        <div className={styles.veil} />
      </div>
      <div className={`container ${styles.content}`}>{children}</div>
    </section>
  );
}
