export const agentsContent = {
  title: "AI Agents for enterprise-scale automation",
  intro:
    "Custom agents and multi-agent systems that run on real workflows—with tools, permissions, metrics, and human approval.",
  blocks: [
    {
      title: "Custom AI agents for workflow automation",
      body: "Agents scoped to a business or engineering workflow, with defined tools, permissions, and success metrics.",
    },
    {
      title: "Multi-agent orchestration",
      body: "Planner/worker patterns, routing, hand-offs, shared memory and state, and guardrails.",
    },
    {
      title: "Agentic engineering use cases",
      body: "Code generation with verification, automated test generation and maintenance, PR review assistants, CI/CD agents, incident triage and runbook execution, documentation and knowledge agents.",
    },
    {
      title: "Agentic business use cases",
      body: "Document processing, customer support, back-office operations, data pipeline monitoring, RPA + LLM hybrids.",
    },
    {
      title: "Foundations",
      body: "RAG and enterprise knowledge grounding, evaluation frameworks, observability and tracing, cost control, model/vendor flexibility, security and data residency, human-in-the-loop approval points.",
    },
    {
      title: "Lifecycle",
      body: "Discovery → agent design → pilot with baseline → evaluation → hardening → production ops—the same team throughout.",
    },
  ],
  diagramSteps: [
    "User / trigger",
    "Orchestrator",
    "Specialized agents",
    "Tools / APIs / data",
    "Human approval",
    "Outcome + metrics",
  ],
};
