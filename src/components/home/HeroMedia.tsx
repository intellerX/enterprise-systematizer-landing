"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";

type Props = {
  children: React.ReactNode;
};

export function HeroMedia({ children }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const [introReady, setIntroReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setIntroReady(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let frame = 0;

    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = rootRef.current;
        const media = mediaRef.current;
        if (!root || !media) return;
        const rect = root.getBoundingClientRect();
        const viewH = window.innerHeight || 1;
        // Progress while hero is in/near viewport
        const progress = Math.min(1, Math.max(0, -rect.top / (rect.height || viewH)));
        const shift = progress * 72; // subtle enterprise parallax
        media.style.transform = `translate3d(0, ${shift}px, 0) scale(1.08)`;
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
        {!reducedMotion ? (
          <video
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/hero-poster.jpg"
          >
            <source src="/media/hero-ambient.webm" type="video/webm" />
            <source src="/media/hero-ambient.mp4" type="video/mp4" />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className={styles.video}
            src="/media/hero-poster.jpg"
            alt=""
          />
        )}
        <div className={styles.grade} />
        <div className={styles.grid} />
        <div className={styles.veil} />
      </div>
      <div className={`container ${styles.content}`}>{children}</div>
    </section>
  );
}
