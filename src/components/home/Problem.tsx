import type { LandingCopy } from "@/content/landing";
import styles from "./landing.module.css";

type Props = { copy: LandingCopy["problem"] };

export function Problem({ copy }: Props) {
  return (
    <section className="section" aria-labelledby="problem-title">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">{copy.eyebrow}</p>
          <h2 id="problem-title">{copy.title}</h2>
        </div>
        <div className={styles.split}>
          <article className={styles.card}>
            <h3>{copy.painTitle}</h3>
            <p className={styles.pain}>{copy.pain}</p>
          </article>
          <article className={styles.card}>
            <h3>{copy.solutionTitle}</h3>
            <p className={styles.pain}>{copy.solution}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
