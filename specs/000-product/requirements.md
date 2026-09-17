# Requirements — Enterprise AI Software Engineering Landing

Derived from [`prompt.md`](../../prompt.md) + project constitution. Priority: **must** / **should** / **could**.

## Functional

### Site shell & IA

| ID | Requirement | Priority | Acceptance |
| ---- | ----------- | -------- | ---------- |
| F1 | Top nav with mega-menu covering What we do (services), Industries, Insights, Contact | must | Given a desktop viewport, when user opens each menu group, then all listed destinations are reachable by keyboard and pointer |
| F2 | Every menu item has a route; service and industry pages use shared templates driven by structured content | must | Given a service slug in content, when user navigates to `/services/{slug}`, then the template renders that content |
| F3 | Persistent primary CTA “Contact” in header | must | CTA visible on all primary pages; activates contact route or in-page contact |
| F4 | Footer: sitemap, Privacy / Terms / Cookies / Impressum placeholders, cookie preference trigger | must | Links resolve; cookie trigger re-opens banner preferences |
| F5 | 404 page | must | Unknown routes show branded dark 404 with path home |

### Home page (section order fixed)

| ID | Requirement | Priority | Acceptance |
| ---- | ----------- | -------- | ---------- |
| F10 | Hero: brand-level “Pragmatic AI Software Engineering”; subhead on measurable engineering results; primary CTA “Audit your AI. Then decide.” → contact; secondary “Assess your AI maturity” → assessment | must | First viewport: brand, one headline, one support line, CTA group, dominant visual plane; no stats/cards/overlays |
| F11 | Problem: two columns For CTOs / For CIOs + positioning paragraph (measured on codebase, connected to infrastructure, before scale) | must | Both personas visible; no company-history claims |
| F12 | Methodology: interactive stepper/tabs for four phases with timeline visual + callout “No long-term commitment at any phase.” | must | Each phase shows name, duration, what happens, delivered, exit criterion; keyboard operable |
| F13 | What we measure: metrics grid + how baseline is agreed before pilot | must | All listed metrics present (see content model); baseline explanation present |
| F14 | AI Agents section (prominent): custom agents, multi-agent orchestration, engineering + business use cases, foundations, lifecycle; architecture-style diagram (SVG/component) | must | Diagram shows user/trigger → orchestrator → agents → tools/APIs/data → human approval → outcome + metrics |
| F15 | What we do: six service teaser cards linking to service pages | must | AI-Augmented Dev; AI Consulting; AI Agent Dev; Software Engineering; Cloud; Data & Analytics |
| F16 | Industries: tabbed or carousel; each industry has 2–3 typical use cases (no client names/figures) | must | All industries from IA present |
| F17 | Engineering practices: SDD, human-in-the-loop, AI code verification, DevSecOps, observability, data sovereignty / compliance readiness, knowledge retention | must | Section present; one job, no faux social proof |
| F18 | Insights: card grid for blog/reports/whitepapers; empty-state friendly | should | Renders empty state without errors when content empty |
| F19 | Contact / Request a consultation section | must | Satisfies F30–F36 |

### Methodology content (structured data)

| ID | Requirement | Priority | Acceptance |
| ---- | ----------- | -------- | ---------- |
| F20 | Four phases modeled as data: Assess (~2w), Pilot (4–6w), Expand (ongoing), Scale with autonomous agents | must | UI reads from content module; changing data updates UI without component edits |
| F21 | Each phase: name, duration, what happens, delivered, exit (“you can stop here if…”) | must | All five fields visible per selected phase |

### AI Maturity Assessment

| ID | Requirement | Priority | Acceptance |
| ---- | ----------- | -------- | ---------- |
| F40 | Multi-step questionnaire (~10–15 Qs) across five pillars; no account required | must | Completable without auth; progress in memory and/or URL state |
| F41 | Score answers; radar/score per pillar; overall level (Exploring → Piloting → Scaling → Optimizing); tailored next steps mapped to four phases | must | Unit tests cover scoring; UI shows all outputs |
| F42 | Result downloadable/printable; optional pre-fill of contact form with consent | should | Print/download works; pre-fill only after explicit consent |
| F43 | Document future API contract for backend persistence (not required to implement server in v1) | should | Contract in architecture.md |
| F44 | Optional v1.1: AI Opportunity Assessment wizard | could | Out of v1 scope unless pulled into tasks |

### Contact / lead capture

| ID | Requirement | Priority | Acceptance |
| ---- | ----------- | -------- | ---------- |
| F30 | Fields: Full name*, Business email*, Phone, Company, Role, Interest (enum), Message*, up to 3 files ≤ 5 MB total, consent* linking Terms & Privacy | must | Client + server validation; accessible errors; success state |
| F31 | Interest enum: General consultation / Paid assessment / Fixed-scope pilot / Team extension / Managed service | must | Only these values accepted server-side |
| F32 | Spam protection: honeypot + rate limiting; CAPTCHA-ready hooks | must | Bot-like honeypot fills rejected; rate limit returns clear error |
| F33 | Pluggable backend adapter (email / CRM webhook); mock adapter in dev | must | Interface in architecture; swap without UI change |
| F34 | Never auto-submit on behalf of the user | must | Submit only on explicit user action |
| F35 | **Lead destination:** deliver new user/client landing details to configured inbox (`LEAD_TO_EMAIL`, production value `anmevel10@gmail.com`) | must | Successful submit results in email (or mocked send in dev) to that destination |
| F36 | **Email secrecy:** destination address must not appear in landing UI, visible copy, `mailto:`, footer, or client-side bundles | must | Grep/build check: address absent from client artifacts; only server env / server-only module |

### Content & SEO routes

| ID | Requirement | Priority | Acceptance |
| ---- | ----------- | -------- | ---------- |
| F50 | Routes: home, service template, industry template, insights list + detail, assessment, contact, legal, 404 | must | Route map matches architecture |
| F51 | Services, industries, methodology, metrics, insights, assessment questions live in typed content — not hardcoded in components | must | Content edit changes page without touching presentational components |
| F52 | Per-page metadata, OG, sitemap, robots, JSON-LD (Organization / Service / Article) | must | Metadata present; sitemap generated |
| F53 | No company-history or client-proof content anywhere | must | Review checklist passes |

### Insights (stub)

| ID | Requirement | Priority | Acceptance |
| ---- | ----------- | -------- | ---------- |
| F60 | CMS-ready insights structure; stub content allowed | should | List + detail templates work with 0–N items |

## Non-functional

| ID | Requirement | Priority | Notes |
| ---- | ----------- | -------- | ----- |
| N1 | **Dark mode only** — high-contrast enterprise dark theme; no light theme or toggle in v1 | must | Non-negotiable product constraint |
| N2 | Responsive mobile-first; verify 375 / 768 / 1280; support 360–1920 | must | Skill `react-responsive` |
| N3 | WCAG 2.1 AA; keyboard mega-menu + stepper; `prefers-reduced-motion` | must | |
| N4 | Lighthouse ≥ 90 performance / a11y / best-practices / SEO; image optimization; code-splitting; stable LCP; no CLS | should | Treat as release gate for launch slice |
| N5 | i18n-ready: English first; externalized strings | should | |
| N6 | Cookie banner: reject non-essential equal weight; analytics only after consent; track CTAs, assessment complete, form submit | must | |
| N7 | Tests: unit (scoring + form validation); component (stepper/menu); ≥1 E2E happy path hero → assessment → contact | must | |
| N8 | CI: lint, type-check, tests, build | must | |
| N9 | Distinctive enterprise visual direction; restrained motion (2–3 intentional motions); CSS variables; avoid generic AI-slop palettes | must | Workspace frontend design rules |
| N10 | Stack: **React + TypeScript**; Next.js App Router; utility-first or CSS-variables styling consistent with dark theme | must | Per skills + user |

## Constraints

- Private GitHub repository; work on `feature/{feature-detail}`; PR into `main` (never commit directly to `main`).
- Specs updated in the same change set when behavior/design changes.
- Lead inbox address is a **secret configuration**, not marketing content.
- Do not invent legal entity details for Impressum beyond placeholders / TBD.

## Open questions

- [ ] Legal / display company name for Organization schema and Impressum (beyond positioning brand)?
- [ ] Hosting target (Vercel / other) and production env for `LEAD_TO_EMAIL` + mail provider credentials?
- [ ] Mail provider for v1 adapter (Resend / SendGrid / SMTP / Form webhook)?
- [ ] Brand logo / wordmark asset source?
- [ ] Insights: ship empty state only, or seed 1–2 placeholder articles?

## Out of scope (v1)

- Light theme
- Showing any operator email on the site
- AI Opportunity Assessment wizard (F44) unless explicitly scheduled
- Real CRM; mock + email adapter sufficient for v1
