import { site } from "@/content/site";
import styles from "./Problem.module.css";

export function Problem() {
  const { problem } = site;
  return (
    <section className="section" aria-labelledby="problem-title">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">Positioning</p>
          <h2 id="problem-title">{problem.title}</h2>
        </div>
        <div className="grid-2">
          <article className={styles.card}>
            <h3>{problem.cto.title}</h3>
            <p className={styles.pain}>{problem.cto.pain}</p>
            <p>{problem.cto.want}</p>
          </article>
          <article className={styles.card}>
            <h3>{problem.cio.title}</h3>
            <p className={styles.pain}>{problem.cio.pain}</p>
            <p>{problem.cio.want}</p>
          </article>
        </div>
        <p className={styles.positioning}>{problem.positioning}</p>
      </div>
    </section>
  );
}
