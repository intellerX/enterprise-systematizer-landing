import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getIndustry, industries } from "@/content/industries";
import { getLocale } from "@/i18n/get-locale";
import { getMessages } from "@/i18n/get-messages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return {
    title: industry.title,
    description: industry.summary,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  const m = getMessages(await getLocale());

  return (
    <article className="section">
      <div className="container" style={{ maxWidth: "48rem" }}>
        <p className="section__eyebrow">Industry</p>
        <h1>{industry.title}</h1>
        <p style={{ color: "var(--text)", fontSize: "1.1rem" }}>
          {industry.summary}
        </p>
        <h2>Typical use cases</h2>
        <ul>
          {industry.useCases.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
        <p>
          <Link href="/contact" className="btn btn--primary">
            {m.servicePage.cta}
          </Link>
        </p>
      </div>
    </article>
  );
}
