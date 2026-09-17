export type Service = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  relatedIndustrySlugs?: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "ai-augmented-development",
    title: "AI-Augmented Development",
    summary:
      "Embed AI into engineering workflows and measure delivery impact on your real codebase.",
    body: [
      "We put AI where delivery happens: IDE, review, tests, CI, and incident response—then baseline the metrics that matter.",
      "Every workflow is documented, gated, and verified. No shadow AI; no unmanaged prompts in production paths.",
    ],
    featured: true,
    relatedIndustrySlugs: ["finance", "healthcare", "manufacturing"],
  },
  {
    slug: "ai-consulting-implementation",
    title: "AI Consulting & Implementation",
    summary:
      "From use-case selection to governed production—connected to cloud, data, and security.",
    body: [
      "We help CIOs and engineering leaders prioritize AI work that moves board-level metrics.",
      "Implementation includes platform choices, evaluation harnesses, and compliance-ready operating models.",
    ],
    featured: true,
  },
  {
    slug: "ai-agent-development",
    title: "AI Agent Development",
    summary:
      "Custom agents and multi-agent orchestration with tools, permissions, and success metrics.",
    body: [
      "Agents are scoped to a workflow, given explicit tools and permissions, and judged against agreed outcomes.",
      "Orchestration covers planner/worker patterns, hand-offs, shared state, and human approval points.",
    ],
    featured: true,
  },
  {
    slug: "software-product-engineering",
    title: "Software Product Engineering",
    summary:
      "Product teams that ship with AI assistance under the same quality and security bars as human code.",
    body: [
      "We build and evolve products with spec-driven delivery, verification of AI-generated code, and observability from day one.",
    ],
    featured: true,
  },
  {
    slug: "cloud-solutions",
    title: "Cloud Solutions & Consulting",
    summary:
      "Migration, DevOps, infrastructure management, modernization, and cloud-native application delivery.",
    body: [
      "AI workloads only create value when cloud foundations are operable: identity, networking, cost, and deployment automation.",
      "We align AI platforms with your cloud posture—not a parallel shadow estate.",
    ],
    featured: true,
  },
  {
    slug: "data-analytics",
    title: "Data & Analytics",
    summary:
      "Data engineering, lakes, warehouses, governance, migration, and BI that ground enterprise AI.",
    body: [
      "RAG and agents fail without trustworthy data paths. We engineer pipelines with governance and residency in mind.",
    ],
    featured: true,
  },
  {
    slug: "technology-consulting",
    title: "Technology Consulting",
    summary: "Architecture and stack decisions tied to delivery outcomes, not fashion.",
    body: [
      "We advise on platforms, build-vs-buy, and integration patterns with measurable acceptance criteria.",
    ],
  },
  {
    slug: "digital-transformation",
    title: "Digital Transformation",
    summary: "Phased change programs with exits—AI included only where metrics justify it.",
    body: [
      "Transformation is sequenced: assess, pilot, expand. Long-term lock-in is not required at any phase.",
    ],
  },
  {
    slug: "custom-solution-development",
    title: "Custom Solution Development",
    summary: "Bespoke systems with AI where it earns its keep.",
    body: [
      "Custom builds follow the same verification, security, and observability standards as product engineering.",
    ],
  },
  {
    slug: "team-extension",
    title: "Team Extension",
    summary: "Embedded engineers who work in your repos with your baselines.",
    body: [
      "Extension teams adopt your tooling and measure the same delivery metrics you already track.",
    ],
  },
  {
    slug: "application-modernization",
    title: "Application Modernization",
    summary: "Modernize legacy systems with AI-assisted analysis and verified change.",
    body: [
      "We combine automated discovery with human-led risk cuts—modernization that does not gamble on unverified AI rewrites.",
    ],
  },
  {
    slug: "qa-automation",
    title: "QA Automation",
    summary: "Test generation, maintenance, and gates that keep AI-assisted change safe.",
    body: [
      "Automation covers regression suites, AI-generated test proposals, and CI gates tied to risk.",
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    summary: "Mobile products with secure AI features and measurable release health.",
    body: [
      "Mobile delivery includes store pipelines, crash/incident metrics, and governed on-device or edge AI when needed.",
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    summary: "Interfaces for complex enterprise workflows—including agent supervision UIs.",
    body: [
      "Design for operators and engineers: clear approval flows, auditability, and reduced cognitive load.",
    ],
  },
  {
    slug: "intelligent-platforms",
    title: "Intelligent Platforms & Automation",
    summary: "RPA, ERP solutions, and enterprise platform integrations with LLM hybrids where useful.",
    body: [
      "We connect automation platforms to governed AI—document processing, back-office ops, and monitoring.",
    ],
  },
  {
    slug: "security-quality",
    title: "Security & Quality",
    summary: "DevSecOps, application security testing, penetration testing, and business continuity.",
    body: [
      "AI changes the attack surface. We put security gates on prompts, models, data paths, and generated code.",
    ],
  },
  {
    slug: "embedded-iot",
    title: "Embedded & IoT",
    summary: "Edge and device software with constrained AI and strong update discipline.",
    body: [
      "We treat model updates like firmware: versioned, signed, and measurable in the field.",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function getFeaturedServices() {
  return services.filter((s) => s.featured);
}
