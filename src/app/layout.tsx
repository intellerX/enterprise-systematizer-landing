import type { Metadata } from "next";
import { Manrope, Outfit } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { site } from "@/content/site";
import { getLanding } from "@/content/landing";
import "./globals.css";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

const copy = getLanding("es");

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: copy.meta.title,
    template: `%s · ${site.brand}`,
  },
  description: copy.meta.description,
  openGraph: {
    title: copy.meta.title,
    description: copy.meta.description,
    type: "website",
    url: site.url,
    locale: "es_419",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.brand,
    url: site.url,
    description: copy.meta.description,
  };

  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
