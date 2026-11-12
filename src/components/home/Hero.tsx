import type { LandingCopy } from "@/content/landing";
import { HeroCtas } from "./HeroCtas";
import { SceneBackdrop } from "./SceneBackdrop";
import styles from "./landing.module.css";

type Props = { copy: LandingCopy["hero"] };

export function Hero({ copy }: Props) {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <SceneBackdrop />
      <div className={styles.heroScrim} aria-hidden="true" />
      <div className={`container ${styles.heroGrid}`}>
        <div>
          <p className="section__eyebrow">{copy.eyebrow}</p>
          <h1 id="hero-title">{copy.headline}</h1>
          <p className={styles.lead}>{copy.subhead}</p>
          <p className={styles.motto}>{copy.motto}</p>
          <HeroCtas primary={copy.primary} secondary={copy.secondary} />
        </div>
        <aside className={styles.panel} aria-label={copy.panelLabel}>
          <p className={styles.kicker}>{copy.panelKicker}</p>
          <ul className={styles.highlights}>
            {copy.highlights.map((item) => (
              <li key={item.title}>
                <p className={styles.highlightTitle}>{item.title}</p>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
