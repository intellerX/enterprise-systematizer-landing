export const site = {
  brand: "Pragmatic AI Software Engineering",
  shortBrand: "PAISE",
  tagline: "Turning AI investment into measurable engineering results.",
  description:
    "Enterprise AI software engineering partner: connect AI to your codebase, cloud, data, and security—and measure delivery before you scale.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  hero: {
    headline: "Pragmatic AI Software Engineering",
    subhead: "Turning AI investment into measurable engineering results.",
    primaryCta: { label: "Audit your AI. Then decide.", href: "/contact" },
    secondaryCta: {
      label: "Assess your AI maturity",
      href: "/assessment",
    },
  },
  problem: {
    title: "The problem",
    positioning:
      "We measure on your codebase, connect AI to your infrastructure, and prove impact before it scales.",
    cto: {
      title: "For CTOs",
      pain: "Engineers are faster with AI tools. Sprints are not.",
      want: "Delivery metrics—velocity, cycle time, PR throughput, coverage, hotfix and incident time—must move on your repositories.",
    },
    cio: {
      title: "For CIOs",
      pain: "AI tools are live but disconnected from cloud, data, and security.",
      want: "AI integrated into governed infrastructure—compliant, secure, and operable.",
    },
  },
  contact: {
    title: "Request a consultation",
    intro:
      "Tell us about your stack and goals. Expected response within two business days. Your data is handled according to our privacy notice.",
    interests: [
      "General consultation",
      "Paid assessment",
      "Fixed-scope pilot",
      "Team extension",
      "Managed service",
    ] as const,
  },
};

export type Interest = (typeof site.contact.interests)[number];
