export type MethodologyPhase = {
  id: string;
  order: number;
  name: string;
  duration: string;
  happens: string;
  delivered: string;
  exitCriterion: string;
};

export const methodology = {
  callout: "No long-term commitment at any phase.",
  phases: [
    {
      id: "assess",
      order: 1,
      name: "Assess",
      duration: "~2 weeks",
      happens:
        "Engineers work inside the client's codebase with their team. Every AI workflow is documented, every gap is sized, every opportunity is costed.",
      delivered:
        "A written assessment: current AI workflows, gaps, costed opportunities, and a recommended next step.",
      exitCriterion:
        "If nothing in the report justifies the next step, stop here.",
    },
    {
      id: "pilot",
      order: 2,
      name: "Pilot",
      duration: "4–6 weeks",
      happens:
        "Three to five workflows run on real code with real engineers, against a baseline agreed at the start.",
      delivered:
        "Measured pilot results vs baseline, playbooks for what worked, and a clear expand/stop decision.",
      exitCriterion: "The numbers either moved or they did not.",
    },
    {
      id: "expand",
      order: 3,
      name: "Expand",
      duration: "Ongoing",
      happens:
        "Workflows that worked are standardized across the organization. Gains show up in the metrics the board tracks.",
      delivered:
        "Standardized AI-augmented practices, rollout plans, and metric dashboards tied to delivery KPIs.",
      exitCriterion: "Most engagements land here.",
    },
    {
      id: "scale",
      order: 4,
      name: "Scale with autonomous agents",
      duration: "When the Expand baseline supports it",
      happens:
        "Autonomous AI agents inside deployment pipelines, code-review cycles, QA and incident workflows.",
      delivered:
        "Governed agents in production paths with human-in-the-loop controls and continuous evaluation.",
      exitCriterion:
        "Governed by the same baseline and human-in-the-loop controls.",
    },
  ] satisfies MethodologyPhase[],
};
