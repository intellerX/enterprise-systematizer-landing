PROMPT — Enterprise AI Software Engineering Landing App

0. How to work on this request (read first)

You are the lead engineer for this project. Before writing any code or design:

Use the Skills available in this project. Scan the project's skills directory, read every skill that is plausibly relevant (frontend/UI design, component libraries, forms, SEO, testing, documentation, deployment, etc.), and follow their conventions. Do not reinvent patterns that a skill already prescribes. If a skill defines a design system, folder structure, naming, or tooling, that skill wins over your defaults.

Follow the project's Spec Driven Design (SDD) workflow. Do not jump straight into implementation. Starting from this prompt, produce the artifacts the project's SDD process requires, in the order it requires them — typically:

a Proposal (problem, goals, non-goals, success criteria),

a Specification (requirements, user stories, acceptance criteria, information architecture, data/content model, non-functional requirements),

a Design / Architecture document (tech decisions, component map, routing, state, integrations),

a Task breakdown (ordered, sized, dependency-aware, each task traceable to a spec requirement),

then implementation, task by task, with verification against the acceptance criteria.

Use the project's own templates, file locations, and naming for these artifacts. If the project's SDD tooling has commands or scripts (e.g. to create a change, validate a spec, or archive it), use them.

Ask before assuming only when a decision is genuinely blocking. Otherwise make a reasonable choice, record it in the spec under "Assumptions / Decisions", and move on.

Treat this prompt as the product brief, not as the spec. Your first deliverable is the proposal + spec derived from it.

---

1. Product vision

Build a marketing landing application for a company that positions itself as a Pragmatic AI Software Engineering partner for enterprises. The core message: enterprises have adopted AI tools, but delivery metrics have not moved; this company connects AI to the real codebase, cloud, data, and security infrastructure and measures the result before scaling.

The landing must communicate three things clearly and fast:

What we do — a catalog of AI, engineering, cloud, data, and security services.

How we do it — a measurable, phased methodology with an exit at each phase and no long-term commitment.

Why AI agents — custom AI agents and multi-agent orchestration as the path from AI experimentation to production automation.

Do NOT include company-history claims (years in business, number of engineers, offices, client logos, testimonials, named case studies, awards, certifications, partner badges, press/news, leadership). Everything must be about the offering, the methodology, and the technology. Where social proof would normally go, use methodology proof: what gets measured, how baselines are set, what "success" means per phase.

---

2. Target audience and messaging

Two primary personas, each addressed explicitly on the page:

CTO / VP Engineering — pain: "Engineers are faster with AI tools, sprints are not." Wants delivery metrics (velocity, cycle time, PR throughput, test coverage, hotfix time, incident resolution) to actually move, measured on their own codebase.

CIO / Head of IT — pain: "AI tools are live but disconnected from cloud, data, and security." Wants AI integrated into governed infrastructure, compliant, secure, and operable.

Secondary: Head of Data, Head of Product, Innovation leads.

Tone: direct, pragmatic, skeptical of hype, numbers-oriented, no buzzword soup. Short sentences. Every claim should be framed as something that is measured on the client's real code and infrastructure.

---

3. Information architecture (navigation)

Top navigation with mega-menu:

What we do

AI-Augmented Development

AI Consulting &amp; Implementation

AI Agent Development

Technology Consulting

Digital Transformation

Custom Solution Development

Team Extension

Software Product Engineering

Application Modernization

QA Automation

Mobile App Development

UI/UX Design

Cloud Solutions &amp; Consulting

Cloud Migration · DevOps · Cloud Infrastructure Management · Cloud Modernization · Cloud Application Development

Intelligent Platforms &amp; Automation

RPA · ERP Solutions · Enterprise platform integrations

Data &amp; Analytics

Data Engineering · Data Lake · Data Warehouse · Data Governance · Data Migration · BI / Reporting

AI Consulting &amp; Implementation (deep-dive)

AI Agent Development · Generative AI · Machine Learning · RAG Development · Computer Vision · MLOps

Security &amp; Quality

DevSecOps · Application Security Testing · Penetration Testing · Business Continuity

Embedded &amp; IoT

Industries: Finance, Retail / E-commerce, Healthcare, Manufacturing, Telecom, Energy &amp; Utilities, Logistics &amp; Supply Chain, Automotive, Agritech.

Insights: Expert blog, Reports, Whitepapers, Webinars (content-driven; can be stubbed with a CMS-ready structure).

Contact (primary CTA, persistent in header).

Each menu item must have a route. Service pages can share a template driven by structured content.

---

4. Home page — required sections (in order)

Hero — Headline: "Pragmatic AI Software Engineering". Sub-headline: turning AI investment into measurable engineering results. Two CTAs: primary "Audit your AI. Then decide." (scrolls to contact form) and secondary "Assess your AI maturity" (opens the interactive assessment, see §7).

The problem — Two-column block: "For CTOs" / "For CIOs" with the pains above, followed by a one-paragraph positioning statement (measured on your codebase, connected to your infrastructure, before it scales).

The methodology — four phases, one exit at each, no long-term commitment (see §5). Interactive stepper/tabs.

What we measure — a metrics grid explaining the delivery baseline: velocity, cycle time, PR throughput, review time, test coverage, regression time, hotfix deployment time, incident resolution time, AI-generated code share, verification rate. Explain how a baseline is agreed before a pilot starts.

AI Agents for enterprise-scale automation (see §6).

What we do — six service cards: AI-Augmented Development; AI Consulting &amp; Implementation; AI Agent Development; Software Engineering; Cloud Solutions; Data &amp; Analytics. Each with a 1–2 line description and link.

Industries — tabbed or carousel with the industries list, each with 2–3 typical AI/engineering use cases (no client names or figures).

Engineering practices — how AI is used responsibly in delivery: spec-driven development, human-in-the-loop review, AI-generated code verification, DevSecOps gates, observability, data sovereignty and compliance readiness (e.g. EU AI Act style obligations), knowledge retention.

Insights — card grid for blog / reports / whitepapers (content-driven, empty-state friendly).

Contact / Request a consultation — see §8.

Footer — sitemap, legal links (Privacy, Terms, Cookies, Impressum placeholders), cookie preference trigger.

---

5. Methodology (core content — must be modeled as structured data)

Four phases. Each phase must display: name, duration, what happens, what is delivered, and the exit criterion ("you can stop here if…").

#	Phase	Duration	What happens	Exit

01	Assess	~2 weeks	Engineers work inside the client's codebase with their team. Every AI workflow is documented, every gap is sized, every opportunity is costed.	If nothing in the report justifies the next step, stop here.

02	Pilot	4–6 weeks	Three to five workflows run on real code with real engineers, against a baseline agreed at the start.	The numbers either moved or they did not.

03	Expand	ongoing	Workflows that worked are standardized across the organization. Gains show up in the metrics the board tracks.	Most engagements land here.

04	Scale with autonomous agents	when the Expand baseline supports it	Autonomous AI agents inside deployment pipelines, code-review cycles, QA and incident workflows.	Governed by the same baseline and human-in-the-loop controls.

Present this as an interactive stepper with a timeline visual. Include a callout: "No long-term commitment at any phase."

---

6. AI Agents section (must be prominent)

Explain the offering in concrete terms:

Custom AI agents for workflow automation — agents scoped to a business or engineering workflow, with defined tools, permissions, and success metrics.

Multi-agent orchestration — planner/worker patterns, routing, hand-offs, shared memory and state, guardrails.

Agentic engineering use cases — code generation with verification, automated test generation and maintenance, PR review assistants, CI/CD agents, incident triage and runbook execution, documentation and knowledge agents.

Agentic business use cases — document processing, customer support, back-office operations, data pipeline monitoring, RPA + LLM hybrids.

Foundations — RAG and enterprise knowledge grounding, evaluation frameworks, observability and tracing, cost control, model/vendor flexibility, security and data residency, human-in-the-loop approval points.

Lifecycle — discovery → agent design → pilot with baseline → evaluation → hardening → production ops (the same team throughout).

Include an architecture-style diagram (SVG or component) showing: user/trigger → orchestrator → specialized agents → tools/APIs/data → human approval → outcome + metrics.

---

7. Interactive feature: AI Maturity Assessment

A self-service, multi-step questionnaire (client-side, no account required):

~10–15 questions across five pillars: Strategy &amp; use cases, Data readiness, Engineering &amp; platform, Governance, security &amp; compliance, People &amp; adoption.

Each answer scored; output a radar/score visualization per pillar, an overall maturity level (e.g. Exploring → Piloting → Scaling → Optimizing), and tailored next-step recommendations mapped to the four phases.

Result can be downloaded/printed and optionally pre-fills the contact form (with user consent).

Store progress in memory/URL state; no backend required for v1 (design the API contract for a future backend anyway).

Optional v1.1: an AI Opportunity Assessment wizard (select industry + function → suggested AI use cases with expected metric impact categories).

---

8. Contact / lead capture

Form fields: Full name*, Business email*, Phone, Company, Role, Interest (General consultation / Paid assessment / Fixed-scope pilot / Team extension / Managed service), Message*, file attachments (up to 3, total ≤ 5 MB), consent checkbox linking to Terms &amp; Privacy*. Show expected response time and privacy assurances (generic: "your data is handled according to our privacy notice").

Requirements: client + server validation, spam protection (honeypot + rate limiting; CAPTCHA-ready), accessible error states, success state, submission to a pluggable backend (email/CRM webhook adapter interface; mock adapter in dev). Never submit on behalf of the user automatically.

---

9. Technical requirements

Pick the stack the project's skills prescribe. If none, default to a modern React meta-framework (e.g. Next.js/App Router) with TypeScript, a utility-first CSS system, and a component library consistent with the project's design skill.

Content-driven architecture: services, industries, methodology phases, metrics, insights, and assessment questions live in typed content files (JSON/MDX/YAML) or a headless-CMS-ready schema. No copy hardcoded in components.

Routing: home, service template pages, industry template pages, insights list + detail, assessment, contact, legal pages, 404.

SEO: semantic HTML, per-page metadata, Open Graph, sitemap, robots, structured data (Organization/Service/Article), fast LCP.

Performance: Lighthouse ≥ 90 on performance/accessibility/best-practices/SEO; image optimization; code-splitting; no layout shift.

Accessibility: WCAG 2.1 AA, keyboard-navigable mega-menu and stepper, reduced-motion support.

Internationalization-ready: English first; string externalization so Spanish can be added later.

Analytics &amp; consent: cookie banner with "reject non-essential" as an equal-weight option; analytics loads only after consent; event tracking for CTAs, assessment completion, form submission.

Testing: unit tests for scoring logic and form validation; component tests for stepper/menu; at least one E2E happy path (hero → assessment → contact).

Quality gates: lint, type-check, tests, and build must pass in CI; commit conventions per project skills.

Design: distinctive, enterprise-grade, high-contrast, dark/light theme, restrained motion, data-visual accents (diagrams, metric tiles, timelines). Avoid generic template look.

---

10. Deliverables (through the SDD process)

Proposal document.

Specification with numbered requirements and acceptance criteria (Given/When/Then).

Architecture/design document incl. content schema, component map, route map, form backend adapter interface, assessment scoring model.

Task list, ordered by dependency, each task referencing the requirement IDs it satisfies.

Implementation delivered task by task, each with tests and a short verification note.

README with setup, content editing guide, and deployment notes.

11. Definition of done

All spec requirements have passing acceptance criteria.

Content is fully editable without touching components.

No company-history or client-proof content present anywhere.

Methodology, metrics, and AI-agent sections are the strongest, most detailed parts of the site.

CI green; Lighthouse and accessibility targets met; responsive from 360px to 1920px.

Start now with step 1 of the SDD workflow: produce the Proposal, then the Spec, and wait for review before implementation unless the project's process says otherwise.