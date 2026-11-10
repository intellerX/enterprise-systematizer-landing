import type { LandingCopy } from "@/content/landing";
import styles from "./landing.module.css";

type Props = { copy: LandingCopy["team"] };

export function Team({ copy }: Props) {
  return (
    <section className="section" id="equipo" aria-labelledby="team-title">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">{copy.eyebrow}</p>
          <h2 id="team-title">{copy.title}</h2>
          <p>{copy.body}</p>
        </div>
        <ul className={styles.roles} style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {copy.roles.map((role) => (
            <li key={role.id} className={styles.role}>
              <h3>{role.title}</h3>
              <p>{role.body}</p>
            </li>
          ))}
        </ul>
        <div className={styles.mottoBand}>
          <p>{copy.motto}</p>
        </div>
      </div>
    </section>
  );
}
