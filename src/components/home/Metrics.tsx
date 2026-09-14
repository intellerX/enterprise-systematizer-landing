import { metrics, metricsIntro } from "@/content/metrics";
import styles from "./Metrics.module.css";

export function Metrics() {
  return (
    <section className="section" aria-labelledby="metrics-title">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">Baseline</p>
          <h2 id="metrics-title">What we measure</h2>
          <p>{metricsIntro}</p>
        </div>
        <ul className={styles.grid}>
          {metrics.map((m) => (
            <li key={m.id} className={styles.tile}>
              <h3>{m.label}</h3>
              <p>{m.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
