import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, services } from "@/content/services";
import { site } from "@/content/site";
import { ServiceCta, ServiceEyebrow } from "@/components/i18n/ServiceBits";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

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
        <ServiceEyebrow />
        <h1>{service.title}</h1>
        <p style={{ color: "var(--text)", fontSize: "1.1rem" }}>
          {service.summary}
        </p>
        {service.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p>
          <ServiceCta />
        </p>
      </div>
    </article>
  );
}
