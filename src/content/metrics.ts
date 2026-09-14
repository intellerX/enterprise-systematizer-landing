export type Metric = {
  id: string;
  label: string;
  description: string;
};

export const metricsIntro =
  "Before a pilot starts, we agree a delivery baseline on your repositories and pipelines. Success is movement in these numbers—not demos.";

export const metrics: Metric[] = [
  {
    id: "velocity",
    label: "Velocity",
    description: "Completed work per sprint on the teams in scope.",
  },
  {
    id: "cycle-time",
    label: "Cycle time",
    description: "Idea to production for changes in the measured streams.",
  },
  {
    id: "pr-throughput",
    label: "PR throughput",
    description: "Merged pull requests per engineer or team per week.",
  },
  {
    id: "review-time",
    label: "Review time",
    description: "Time from open to first meaningful review and to merge.",
  },
  {
    id: "test-coverage",
    label: "Test coverage",
    description: "Meaningful coverage on critical paths—not vanity % alone.",
  },
  {
    id: "regression-time",
    label: "Regression time",
    description: "How long it takes to detect and clear regressions.",
  },
  {
    id: "hotfix-time",
    label: "Hotfix deployment time",
    description: "Time from severity decision to production fix.",
  },
  {
    id: "incident-resolution",
    label: "Incident resolution time",
    description: "Mean time to mitigate and resolve production incidents.",
  },
  {
    id: "ai-code-share",
    label: "AI-generated code share",
    description: "Share of merged code assisted by AI tools in scope.",
  },
  {
    id: "verification-rate",
    label: "Verification rate",
    description:
      "Share of AI-assisted changes that pass human and automated verification gates.",
  },
];
