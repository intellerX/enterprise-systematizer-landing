import type { Metadata } from "next";
import Link from "next/link";
import { filterInsights, type InsightType } from "@/content/insights";
import { en } from "@/i18n/en";

export const metadata: Metadata = {
  title: "Insights",
  description: "Expert blog, reports, whitepapers, and webinars.",
};

type Props = { searchParams: Promise<{ type?: string }> };

export default async function InsightsPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const allowed: InsightType[] = ["blog", "report", "whitepaper", "webinar"];
  const filter = allowed.includes(type as InsightType)
    ? (type as InsightType)
    : undefined;
  const items = filterInsights(filter);

  return (
    <section className="section">
      <div className="container">
        <div className="section__head">
          <p className="section__eyebrow">Content</p>
          <h1>Insights</h1>
          <p>Methodology-focused writing. No client logos or vanity case studies.</p>
        </div>
        {items.length === 0 ? (
          <p>{en.emptyInsights}</p>
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
