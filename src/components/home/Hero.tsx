import { site } from "@/content/site";
import { HeroCtas } from "./HeroCtas";
import styles from "./Hero.module.css";

export function Hero() {
  const { hero } = site;
  return (
    <section className={styles.hero} aria-labelledby="hero-brand">
      <div className={styles.plane} aria-hidden />
      <div className={`container ${styles.content}`}>
        <h1 className={`${styles.brand} rise`} id="hero-brand">
          {hero.headline}
        </h1>
        <p className={`${styles.sub} rise`}>{hero.subhead}</p>
        <HeroCtas primary={hero.primaryCta} secondary={hero.secondaryCta} />
      </div>
    </section>
  );
}
