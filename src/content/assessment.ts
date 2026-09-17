export type PillarId =
  | "strategy"
  | "data"
  | "engineering"
  | "governance"
  | "people";

export type AssessmentChoice = {
  id: string;
  label: string;
  score: number;
};

export type AssessmentQuestion = {
  id: string;
  pillarId: PillarId;
  prompt: string;
  choices: AssessmentChoice[];
};

export type MaturityLevelId =
  | "exploring"
  | "piloting"
  | "scaling"
  | "optimizing";

export const pillars: { id: PillarId; label: string }[] = [
  { id: "strategy", label: "Strategy & use cases" },
  { id: "data", label: "Data readiness" },
  { id: "engineering", label: "Engineering & platform" },
  { id: "governance", label: "Governance, security & compliance" },
  { id: "people", label: "People & adoption" },
];

export const maturityLevels: {
  id: MaturityLevelId;
  label: string;
  minScore: number;
  summary: string;
  phaseId: string;
}[] = [
  {
    id: "exploring",
    label: "Exploring",
    minScore: 0,
    summary: "AI is ad hoc. Start with a measured Assess on real code and infrastructure.",
    phaseId: "assess",
  },
  {
    id: "piloting",
    label: "Piloting",
    minScore: 40,
    summary: "Some pilots exist. Lock a baseline and run a fixed-scope Pilot.",
    phaseId: "pilot",
  },
  {
    id: "scaling",
    label: "Scaling",
    minScore: 60,
    summary: "Proven workflows ready to standardize. Expand with board-visible metrics.",
    phaseId: "expand",
  },
  {
    id: "optimizing",
    label: "Optimizing",
    minScore: 80,
    summary: "Ready for governed autonomous agents where baselines support it.",
    phaseId: "scale",
  },
];

const likert = (
  prefix: string,
): AssessmentChoice[] => [
  { id: `${prefix}-0`, label: "Not started", score: 0 },
  { id: `${prefix}-1`, label: "Ad hoc / informal", score: 25 },
  { id: `${prefix}-2`, label: "Defined for a few teams", score: 50 },
  { id: `${prefix}-3`, label: "Standard across most teams", score: 75 },
  { id: `${prefix}-4`, label: "Measured and continuously improved", score: 100 },
];

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "s1",
    pillarId: "strategy",
    prompt: "How clearly are AI use cases tied to delivery or business metrics?",
    choices: likert("s1"),
  },
  {
    id: "s2",
    pillarId: "strategy",
    prompt: "Do you have an agreed prioritization method for AI initiatives?",
    choices: likert("s2"),
  },
  {
    id: "s3",
    pillarId: "strategy",
    prompt: "Can leadership stop a pilot when metrics do not move?",
    choices: likert("s3"),
  },
  {
    id: "d1",
    pillarId: "data",
    prompt: "How ready is enterprise data for grounding AI (quality, access, catalogs)?",
    choices: likert("d1"),
  },
  {
    id: "d2",
    pillarId: "data",
    prompt: "Are residency, retention, and classification controls enforced for AI paths?",
    choices: likert("d2"),
  },
  {
    id: "d3",
    pillarId: "data",
    prompt: "Do evaluation datasets exist for your priority AI workflows?",
    choices: likert("d3"),
  },
  {
    id: "e1",
    pillarId: "engineering",
    prompt: "Is AI integrated into IDE, review, CI, and incident tooling—not only chat?",
    choices: likert("e1"),
  },
  {
    id: "e2",
    pillarId: "engineering",
    prompt: "Do you verify AI-generated code with tests and policy gates?",
    choices: likert("e2"),
  },
  {
    id: "e3",
    pillarId: "engineering",
    prompt: "Are delivery baselines (velocity, cycle time, etc.) measured for AI work?",
    choices: likert("e3"),
  },
  {
    id: "g1",
    pillarId: "governance",
    prompt: "Are model, prompt, and agent permissions governed like production systems?",
    choices: likert("g1"),
  },
  {
    id: "g2",
    pillarId: "governance",
    prompt: "Is there a security review path for AI features and agents?",
    choices: likert("g2"),
  },
  {
    id: "g3",
    pillarId: "governance",
    prompt: "Can you evidence compliance readiness (e.g. EU AI Act–style obligations)?",
    choices: likert("g3"),
  },
  {
    id: "p1",
    pillarId: "people",
    prompt: "Do engineers have clear playbooks for responsible AI use?",
    choices: likert("p1"),
  },
  {
    id: "p2",
    pillarId: "people",
    prompt: "Is adoption measured (usage + outcomes), not only license counts?",
    choices: likert("p2"),
  },
  {
    id: "p3",
    pillarId: "people",
    prompt: "Is knowledge retained in your org when tools or vendors change?",
    choices: likert("p3"),
  },
];
