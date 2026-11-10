import type { MetadataRoute } from "next";
import { industries } from "@/content/industries";
import { insights } from "@/content/insights";
import { services } from "@/content/services";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const staticRoutes = [
    "",
    "/assessment",
    "/contact",
    "/insights",
    "/legal/privacy",
    "/legal/terms",
    "/legal/cookies",
    "/legal/impressum",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: new Date(),
    })),
    ...industries.map((i) => ({
      url: `${base}/industries/${i.slug}`,
      lastModified: new Date(),
    })),
    ...insights.map((i) => ({
      url: `${base}/insights/${i.slug}`,
      lastModified: new Date(),
    })),
  ];
}
