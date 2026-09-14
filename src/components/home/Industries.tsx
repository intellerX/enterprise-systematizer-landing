"use client";

import Link from "next/link";
import { useState } from "react";
import { industries } from "@/content/industries";
import styles from "./Industries.module.css";

export function IndustriesPanel() {
  const [active, setActive] = useState(industries[0].slug);
  const industry =
    industries.find((i) => i.slug === active) ?? industries[0];

  return (
    <section className="section" aria-labelledby="industries-title">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">Sectors</p>
          <h2 id="industries-title">Industries</h2>
          <p>Typical AI and engineering use cases—no named clients or vanity figures.</p>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Industries">
          {industries.map((i) => (
            <button
              key={i.slug}
              type="button"
              role="tab"
              aria-selected={active === i.slug}
              className={`${styles.tab} ${active === i.slug ? styles.tabActive : ""}`}
              onClick={() => setActive(i.slug)}
            >
              {i.title}
            </button>
          ))}
        </div>

        <div className={styles.panel} role="tabpanel">
          <h3>{industry.title}</h3>
          <p>{industry.summary}</p>
          <ul>
            {industry.useCases.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
          <Link href={`/industries/${industry.slug}`} className={styles.more}>
            Industry page
          </Link>
        </div>
      </div>
    </section>
  );
}
