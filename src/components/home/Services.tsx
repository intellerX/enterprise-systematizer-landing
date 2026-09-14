import Link from "next/link";
import { getFeaturedServices } from "@/content/services";
import styles from "./Services.module.css";

export function ServicesTeaser() {
  const items = getFeaturedServices();
  return (
    <section className="section" aria-labelledby="services-title">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">Catalog</p>
          <h2 id="services-title">What we do</h2>
          <p>Six entry points. Full catalog lives in the menu and service pages.</p>
        </div>
        <ul className={styles.grid}>
          {items.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className={styles.link}>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <span className={styles.more}>View service</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
