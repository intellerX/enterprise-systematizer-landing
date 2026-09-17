export type Industry = {
  slug: string;
  title: string;
  summary: string;
  useCases: string[];
};

export const industries: Industry[] = [
  {
    slug: "finance",
    title: "Finance",
    summary: "Regulated delivery with measurable AI in engineering and operations.",
    useCases: [
      "AI-assisted code change with mandatory verification in core banking repos",
      "Document and KYC processing agents with human approval",
      "Incident triage agents bound to runbooks and audit logs",
    ],
  },
  {
    slug: "retail",
    title: "Retail / E-commerce",
    summary: "Faster catalog, pricing, and platform delivery without metric theater.",
    useCases: [
      "PR assistants for storefront and inventory services",
      "Automated test maintenance for high-churn UI flows",
      "Demand and ops agents watching pipeline health",
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    summary: "AI connected to governed data and security—not shadow tools.",
    useCases: [
      "Clinical and admin document agents with residency controls",
      "Engineering AI under DevSecOps gates for PHI-adjacent systems",
      "Knowledge agents grounded in approved protocols",
    ],
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    summary: "Plant and enterprise software with AI that respects OT boundaries.",
    useCases: [
      "Maintenance knowledge agents on approved corpora",
      "QA automation for MES and ERP integrations",
      "Code modernization of plant-floor adjacent systems",
    ],
  },
  {
    slug: "telecom",
    title: "Telecom",
    summary: "Network and BSS/OSS delivery with agent-assisted ops.",
    useCases: [
      "Incident triage across NOC runbooks",
      "Test generation for provisioning flows",
      "RAG over network change documentation",
    ],
  },
  {
    slug: "energy",
    title: "Energy & Utilities",
    summary: "Critical systems where baselines and continuity matter.",
    useCases: [
      "Change assistants with strict human-in-the-loop",
      "Continuity playbook agents for outage response",
      "Data pipeline monitoring for grid analytics",
    ],
  },
  {
    slug: "logistics",
    title: "Logistics & Supply Chain",
    summary: "Throughput and exception handling with measurable automation.",
    useCases: [
      "Exception-handling agents for order and freight events",
      "Integration test automation across TMS/WMS",
      "Documentation agents for partner APIs",
    ],
  },
  {
    slug: "automotive",
    title: "Automotive",
    summary: "Embedded and cloud software with verification-first AI.",
    useCases: [
      "AI-assisted test generation for safety-adjacent suites",
      "Code review assistants for large monorepos",
      "Knowledge agents for homologation documentation",
    ],
  },
  {
    slug: "agritech",
    title: "Agritech",
    summary: "Field and platform software with practical AI use cases.",
    useCases: [
      "Vision and sensor pipeline monitoring agents",
      "Data engineering for seasonal forecasting platforms",
      "Mobile delivery with reliable release metrics",
    ],
  },
];

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}
