import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInsight, insights } from "@/content/insights";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getInsight(slug);
  if (!item) return {};
  return { title: item.title, description: item.excerpt };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getInsight(slug);
  if (!item) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    datePublished: item.date,
    description: item.excerpt,
    author: { "@type": "Organization", name: site.brand },
  };

  return (
    <article className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container" style={{ maxWidth: "44rem" }}>
        <p className="section__eyebrow">
          {item.type} · {item.date}
        </p>
        <h1>{item.title}</h1>
        <p style={{ color: "var(--text)", fontSize: "1.1rem" }}>{item.excerpt}</p>
        {item.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </article>
  );
}
