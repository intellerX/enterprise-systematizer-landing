"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { filterInsights, type InsightType } from "@/content/insights";
import { useI18n } from "@/i18n/I18nProvider";

export function InsightsList() {
  const params = useSearchParams();
  const { m } = useI18n();
  const allowed: InsightType[] = ["blog", "report", "whitepaper", "webinar"];
  const type = params.get("type");
  const filter = allowed.includes(type as InsightType) ? (type as InsightType) : undefined;
  const items = filterInsights(filter);

  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">{m.insightsPage.eyebrow}</p>
          <h1>{m.insightsPage.title}</h1>
          <p>{m.insightsPage.intro}</p>
        </div>
        {items.length === 0 ? (
          <p>{m.emptyInsights}</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "1rem" }}>
            {items.map((item) => (
              <li key={item.slug}>
                <Link href={`/insights/${item.slug}`}>
                  <strong>{item.title}</strong>
                  <span style={{ display: "block", color: "var(--text-muted)" }}>
                    {item.type} · {item.date}
                  </span>
                  <span style={{ display: "block", color: "var(--text-muted)" }}>
                    {item.excerpt}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
