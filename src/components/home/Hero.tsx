import { site } from "@/content/site";
import { HeroCtas } from "./HeroCtas";
import { HeroMedia } from "./HeroMedia";
import styles from "./Hero.module.css";

export function Hero() {
  const { hero } = site;
  return (
    <HeroMedia>
      <h1 className={`${styles.brand} rise`} id="hero-brand">
        {hero.headline}
      </h1>
      <p className={`${styles.sub} rise`}>{hero.subhead}</p>
      <HeroCtas primary={hero.primaryCta} secondary={hero.secondaryCta} />
    </HeroMedia>
  );
}
