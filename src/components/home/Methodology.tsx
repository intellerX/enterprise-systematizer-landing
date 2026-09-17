"use client";

import { useState } from "react";
import { methodology } from "@/content/methodology";
import styles from "./Methodology.module.css";

export function MethodologyStepper() {
  const [active, setActive] = useState(methodology.phases[0].id);
  const phase =
    methodology.phases.find((p) => p.id === active) ?? methodology.phases[0];

  return (
    <section className="section" aria-labelledby="method-title">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">How we work</p>
          <h2 id="method-title">The methodology</h2>
          <p>Four phases. An exit at each. No long-term commitment required.</p>
        </div>

        <p className={styles.callout} role="note">
          {methodology.callout}
        </p>

        <ol className={styles.timeline} aria-label="Methodology phases">
          {methodology.phases.map((p, idx) => (
            <li key={p.id}>
              <button
                type="button"
                className={`${styles.step} ${active === p.id ? styles.stepActive : ""}`}
                aria-current={active === p.id ? "step" : undefined}
                onClick={() => setActive(p.id)}
              >
                <span className={styles.num}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className={styles.stepLabel}>{p.name}</span>
                <span className={styles.dur}>{p.duration}</span>
              </button>
            </li>
          ))}
        </ol>

        <article className={styles.detail} aria-live="polite">
          <h3>
            {phase.name}{" "}
            <span className={styles.durInline}>{phase.duration}</span>
          </h3>
          <div className={styles.detailGrid}>
            <div>
              <h4>What happens</h4>
              <p>{phase.happens}</p>
            </div>
            <div>
              <h4>What is delivered</h4>
              <p>{phase.delivered}</p>
            </div>
            <div className={styles.exit}>
              <h4>Exit</h4>
              <p>{phase.exitCriterion}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
