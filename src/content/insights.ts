export type InsightType = "blog" | "report" | "whitepaper" | "webinar";

export type Insight = {
  slug: string;
  title: string;
  type: InsightType;
  excerpt: string;
  body: string[];
  date: string;
};

/** Seed insights — editable without touching components. Empty array is valid. */
export const insights: Insight[] = [
  {
    slug: "measuring-ai-delivery-baselines",
    title: "Measuring AI delivery baselines before you scale",
    type: "blog",
    excerpt:
      "How to agree velocity, cycle time, and verification metrics before an AI pilot starts.",
    date: "2026-03-01",
    body: [
      "AI tools can make individual engineers faster while sprint outcomes stay flat. The gap is measurement.",
      "Agree a baseline on the repositories and teams in scope. Track velocity, cycle time, PR throughput, review time, coverage on critical paths, hotfix time, and verification rate for AI-assisted changes.",
      "Only then run a fixed-scope pilot. If the numbers do not move, stop. That exit is a feature—not a failure of commitment.",
    ],
  },
  {
    slug: "agents-with-human-approval",
    title: "Agentic workflows that keep humans in the loop",
    type: "whitepaper",
    excerpt:
      "Planner/worker patterns, tool permissions, and approval points that survive audit.",
    date: "2026-04-12",
    body: [
      "Enterprise agents need scoped tools, explicit permissions, and recorded approval for high-impact actions.",
      "Orchestration should expose state, hand-offs, and evaluation traces—not a black box that “just works” in a demo.",
    ],
  },
];

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}

export function filterInsights(type?: InsightType) {
  if (!type) return insights;
  return insights.filter((i) => i.type === type);
}
