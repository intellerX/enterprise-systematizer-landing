import Link from "next/link";
import { insights } from "@/content/insights";
import { en } from "@/i18n/en";
import styles from "./Insights.module.css";

export function InsightsTeaser() {
  return (
    <section className="section" aria-labelledby="insights-title">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">Content</p>
          <h2 id="insights-title">Insights</h2>
        </div>
        {insights.length === 0 ? (
          <p className={styles.empty}>{en.emptyInsights}</p>
        ) : (
          <ul className={styles.grid}>
            {insights.map((item) => (
              <li key={item.slug}>
                <Link href={`/insights/${item.slug}`} className={styles.card}>
                  <span className={styles.type}>{item.type}</span>
                  <h3>{item.title}</h3>
                  <p>{item.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
        <p className={styles.all}>
          <Link href="/insights">All insights</Link>
        </p>
      </div>
    </section>
  );
}
