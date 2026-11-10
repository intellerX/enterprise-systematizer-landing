import type { LandingCopy } from "@/content/landing";
import styles from "./landing.module.css";

type Props = { copy: LandingCopy["cases"] };

export function Cases({ copy }: Props) {
  return (
    <section className="section" id="casos" aria-labelledby="cases-title">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">{copy.eyebrow}</p>
          <h2 id="cases-title">{copy.title}</h2>
          <p>{copy.note}</p>
        </div>
        <ul className={styles.cases} style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {copy.items.map((item) => (
            <li key={item.id} className={styles.case}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
