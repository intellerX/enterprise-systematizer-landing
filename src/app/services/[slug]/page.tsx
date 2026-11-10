import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { site } from "@/content/site";
import { getLocale } from "@/i18n/get-locale";
import { getMessages } from "@/i18n/get-messages";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    openGraph: { title: service.title, description: service.summary },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const m = getMessages(await getLocale());

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.summary,
    provider: { "@type": "Organization", name: site.brand },
  };

  return (
    <article className="section">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container" style={{ maxWidth: "48rem" }}>
        <p className="section__eyebrow">{m.servicePage.eyebrow}</p>
        <h1>{service.title}</h1>
        <p style={{ color: "var(--text)", fontSize: "1.1rem" }}>
          {service.summary}
        </p>
        {service.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p>
          <Link href="/contact" className="btn btn--primary">
            {m.servicePage.cta}
          </Link>
        </p>
      </div>
    </article>
  );
}
