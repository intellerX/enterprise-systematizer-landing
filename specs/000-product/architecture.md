# Architecture — Enterprise AI Software Engineering Landing

## Summary

A **Next.js (App Router) + React + TypeScript** marketing site with a **dark-only** design system. Marketing copy and catalogs live in typed content modules. Interactive pieces (mega-menu, methodology stepper, assessment, contact) are client islands. Lead capture posts to a Route Handler that validates, rate-limits, and sends via a pluggable **LeadAdapter**; the destination address lives only in **server env** and never ships to the client.

## Context diagram

```text
Visitor
  → Next.js app (SSR/SSG pages + client islands)
      → Typed content modules (services, industries, methodology, metrics, assessment, insights)
      → Cookie/consent gate → analytics (optional)
      → POST /api/contact → validate + honeypot + rate limit → LeadAdapter
            → Email provider (prod) | MockAdapter (dev)
                  → LEAD_TO_EMAIL (server-only; e.g. anmevel10@gmail.com)
```

## Route map

| Route | Purpose |
| ----- | ------- |
| `/` | Home (sections F10–F19) |
| `/services/[slug]` | Service template |
| `/industries/[slug]` | Industry template |
| `/insights` | Insights list |
| `/insights/[slug]` | Insight detail |
| `/assessment` | AI Maturity Assessment |
| `/contact` | Contact / consultation |
| `/legal/privacy`, `/legal/terms`, `/legal/cookies`, `/legal/impressum` | Legal placeholders |
| `/api/contact` | Lead submission (server-only) |
| `*` | 404 |

## Components (high level)

| Component | Responsibility | Notes |
| --------- | -------------- | ----- |
| `AppShell` | Dark theme tokens, fonts, skip link, layout chrome | CSS variables |
| `SiteHeader` / `MegaMenu` | IA navigation + Contact CTA | Collapse &lt; `md` |
| `SiteFooter` | Sitemap, legal, cookie prefs | No email display |
| `CookieBanner` | Consent; equal reject non-essential | Gates analytics |
| Home sections | Hero, Problem, Methodology, Metrics, Agents, Services, Industries, Practices, Insights teaser, Contact | One job each |
| `MethodologyStepper` | Phase timeline + tabs/stepper | Content-driven |
| `AgentsDiagram` | SVG/architecture diagram | Decorative + labeled |
| `AssessmentWizard` | Multi-step Qs, scoring UI, radar, results | URL/memory state |
| `ContactForm` | Fields, files, consent, a11y errors | Calls `/api/contact` |
| Service / Industry / Insight templates | Render structured content | Shared layouts |
| `LeadAdapter` | Send lead payload | Server-only module |

## Content model (typed)

Content lives under e.g. `src/content/` as TypeScript modules (or JSON imported with Zod schemas). CMS-ready field names.

| Collection | Key fields |
| ---------- | ---------- |
| `services` | slug, title, summary, body sections, related industries |
| `industries` | slug, title, useCases[] |
| `methodology.phases` | id, order, name, duration, happens, delivered, exitCriterion |
| `metrics` | id, label, description |
| `assessment.pillars` / `questions` | pillarId, prompt, choices[], scores |
| `assessment.levels` | Exploring → Optimizing thresholds + recommendations → phase mapping |
| `insights` | slug, title, type (blog\|report\|whitepaper\|webinar), excerpt, body, date |
| `nav` | mega-menu tree → routes |
| `copy` / `i18n/en` | externalized UI strings |

**Forbidden in content:** company-history claims, client logos/testimonials, operator email addresses.

## Assessment scoring (v1)

- Each answer contributes weighted points to one of five pillars.
- Pillar scores normalized 0–100; overall = weighted average.
- Level thresholds (initial): Exploring &lt; 40, Piloting &lt; 60, Scaling &lt; 80, else Optimizing — tune in content, not components.
- Recommendations: map weakest pillars + level → Assess / Pilot / Expand / Scale phase CTAs.
- Persistence: `sessionStorage` + optional query `?a=` compressed state; design `POST /api/assessment` contract for later (TBD implementation).

## Lead capture & email secrecy

```text
ContactForm (browser)
  → POST /api/contact  (multipart or JSON + files)
      → validate schema + honeypot + rate limit
      → LeadAdapter.send(payload)
           reads process.env.LEAD_TO_EMAIL  // NEVER NEXT_PUBLIC_*
           // production default value documented in ops only: anmevel10@gmail.com
```

| Rule | Enforcement |
| ---- | ----------- |
| No `mailto:` to operator inbox | UI uses form only |
| No address in React trees / content / footer | Spec + review checklist |
| No `NEXT_PUBLIC_LEAD_*` | Adapter is server-only (`server-only` import) |
| Dev | `MockLeadAdapter` logs payload; does not require real inbox |
| Prod | Email adapter (provider TBD — open question) |

Payload includes: name, business email, phone, company, role, interest, message, attachments metadata, consent timestamp, optional assessment summary if consented.

## Design system

- **Theme:** dark-only. CSS variables for background layers, text, borders, accent (non-purple-default; enterprise high-contrast).
- **Typography:** distinctive non-default display + body pair (loaded via `next/font`).
- **Motion:** 2–3 intentional motions (e.g. hero entrance, stepper transition, diagram draw); honor `prefers-reduced-motion`.
- **Hero:** full-bleed visual plane; brand-first; no cards/overlays in first viewport.

## Key decisions

| Decision | Choice | Why |
| -------- | ------ | --- |
| Framework | Next.js App Router + TS | Prompt default; SEO/SSR; Route Handlers for leads |
| UI skill | `react-responsive` | Mobile-first React conventions |
| Theme | Dark only | User non-negotiable |
| Styling | CSS variables + CSS modules (or Tailwind if scaffolded once) | Avoid mid-feature dual systems; pick at scaffold |
| Content | Typed TS/JSON + Zod | Editable without touching components; CMS-ready |
| Lead email | Server env `LEAD_TO_EMAIL` | Hidden from landing; F35–F36 |
| State | URL + local for assessment; no global store | Skill default |
| Analytics | Post-consent only | N6 |

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| Email leaked via client bundle | `server-only` adapter; CI grep for known address; no public env | 
| Mega-menu a11y regresses | Component tests + keyboard checklist |
| Content sprawl / hardcoded copy | Lint convention: presentational components accept props/content only |
| Spam to inbox | Honeypot + rate limit + CAPTCHA hook |
| Generic “AI landing” look | Follow workspace frontend design rules; dark enterprise direction |

## Open architecture TBDs

- Exact mail provider and attachment handling limits in provider API.
- Hosting + secrets injection.
- Whether insights use MDX files or JSON only in v1.
