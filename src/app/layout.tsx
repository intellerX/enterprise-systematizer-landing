import type { Metadata } from "next";
import localFont from "next/font/local";
import { AppShell } from "@/components/layout/AppShell";
import { site } from "@/content/site";
import { getLanding } from "@/content/landing";
import "./globals.css";

const display = localFont({
  src: "../../node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2",
  variable: "--font-display",
  weight: "100 900",
});

const body = localFont({
  src: "../../node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2",
  variable: "--font-body",
  weight: "200 800",
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
