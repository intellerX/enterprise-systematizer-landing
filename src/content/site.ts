export const site = {
  brand: "intellerX",
  shortBrand: "intellerX",
  tagline: "Fábrica de software potenciada por AI.",
  description:
    "Fábrica de software con AI para que tu empresa se adapte: automatizaciones, desarrollo ágil y una operación más efectiva. La calidad va primero.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contact: {
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
