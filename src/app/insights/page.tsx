import type { Metadata } from "next";
import Link from "next/link";
import { filterInsights, type InsightType } from "@/content/insights";
import { getLocale } from "@/i18n/get-locale";
import { getMessages } from "@/i18n/get-messages";

export async function generateMetadata(): Promise<Metadata> {
  const m = getMessages(await getLocale());
  return {
    title: m.insightsPage.title,
    description: m.insightsPage.intro,
  };
}

type Props = { searchParams: Promise<{ type?: string }> };

export default async function InsightsPage({ searchParams }: Props) {
  const { type } = await searchParams;
  const allowed: InsightType[] = ["blog", "report", "whitepaper", "webinar"];
  const filter = allowed.includes(type as InsightType)
    ? (type as InsightType)
    : undefined;
  const items = filterInsights(filter);
  const m = getMessages(await getLocale());

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
