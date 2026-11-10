import type { LandingCopy } from "@/content/landing";
import styles from "./landing.module.css";

type Props = { copy: LandingCopy["improve"] };

export function SelfImprove({ copy }: Props) {
  return (
    <section className="section" id="automejora" aria-labelledby="improve-title">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">{copy.eyebrow}</p>
          <h2 id="improve-title">{copy.title}</h2>
          <p>{copy.intro}</p>
        </div>
        <ul className={`${styles.cards} ${styles.improve}`} style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {copy.items.map((item) => (
            <li key={item.id} className={styles.card}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
