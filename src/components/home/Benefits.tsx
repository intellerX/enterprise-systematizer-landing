import type { LandingCopy } from "@/content/landing";
import styles from "./landing.module.css";

type Props = { copy: LandingCopy["benefits"] };

export function Benefits({ copy }: Props) {
  return (
    <section className="section" id="beneficios" aria-labelledby="benefits-title">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">{copy.eyebrow}</p>
          <h2 id="benefits-title">{copy.title}</h2>
          <p>{copy.intro}</p>
        </div>
        <ul className={styles.cards} style={{ listStyle: "none", margin: 0, padding: 0 }}>
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
