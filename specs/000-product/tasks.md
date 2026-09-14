# Tasks — Enterprise AI Software Engineering Landing

Ordered by dependency. Each task references requirement IDs.

## Slice 0 — Spec & constitution

- [x] Fold `prompt.md` into `000-product` overview → requirements → architecture → tasks
- [x] Record non-negotiables: dark-only (N1), hidden lead email (F35–F36), React + TypeScript (N10)
- [x] Reviewer approval / explicit implement request

## Slice 1 — App scaffold & dark design tokens

- [x] Branch `feature/complete-landing`
- [x] Scaffold Next.js App Router + TypeScript + lint/test/CI (N8, N10)
- [x] Dark-only global theme (CSS variables, fonts, base layout) (N1, N9)
- [x] `AppShell`, responsive breakpoints per `react-responsive` (N2)
- [x] README: setup, env vars (`LEAD_TO_EMAIL` server-only), content editing notes

## Slice 2 — Content model & routing skeleton

- [x] Typed content modules (F20, F21, F51)
- [x] Route map: home, services, industries, insights, assessment, contact, legal, 404 (F2, F5, F50)
- [x] Nav content tree wired to routes (F1)
- [x] i18n string bag (en) stub (N5)

## Slice 3 — Chrome: header mega-menu, footer, cookies

- [x] `SiteHeader` + accessible mega-menu + Contact CTA (F1, F3, N3)
- [x] `SiteFooter` sitemap + legal placeholders — **no email** (F4, F36)
- [x] Cookie banner + preference trigger; analytics gated (F4, N6)
- [x] Component tests for stepper (N7)

## Slice 4 — Home: hero → problem → methodology → metrics

- [x] Hero brand-first full-bleed (F10, N9)
- [x] CTO/CIO problem section (F11, F53)
- [x] Methodology stepper + timeline from content (F12, F20, F21)
- [x] Metrics grid + baseline copy (F13)
- [x] Motion + reduced-motion (N3, N9)

## Slice 5 — Home: agents, services, industries, practices, insights

- [x] AI Agents section + diagram (F14)
- [x] Six service teasers (F15)
- [x] Industries tabs (F16)
- [x] Engineering practices (F17)
- [x] Insights teaser + empty-state friendly (F18, F60)

## Slice 6 — Service & industry templates + SEO

- [x] `/services/[slug]`, `/industries/[slug]` templates (F2, F50, F51)
- [x] Metadata, OG, sitemap, robots, JSON-LD (F52)
- [x] Legal placeholder pages (F4)

## Slice 7 — AI Maturity Assessment

- [x] Wizard UI + URL/memory progress (F40)
- [x] Scoring engine + levels + recommendations (F41); unit tests (N7)
- [x] Results viz (radar); print/download (F42)
- [x] Optional contact pre-fill with consent (F42)
- [x] Future API contract documented in scoring module (F43)

## Slice 8 — Contact + lead delivery (hidden email)

- [x] Contact form UI + client validation (F30, F31, F34)
- [x] `POST /api/contact`: server validation, honeypot, rate limit, CAPTCHA hooks (F32)
- [x] `LeadAdapter` + MockAdapter; EmailAdapter reading `LEAD_TO_EMAIL` only on server (F33, F35, F36)
- [x] File attachments ≤ 3 / 5 MB (F30)
- [x] Unit tests for validation; address not in `src/` (F36, N7)
- [x] Success / error a11y states (F30)

## Slice 9 — Insights detail + E2E + quality gates

- [x] Insights list/detail (F60)
- [x] E2E: hero → assessment → contact (N7)
- [x] Responsive / a11y patterns applied (N3, N4)
- [x] Content edit guide in README; no history/social-proof copy (F53)
- [x] CI workflow (N8)

## Done when

- [x] All **must** requirements implemented in this PR
- [x] Dark-only UI; no operator email visible or in `src/`
- [x] Content editable without touching presentational components
- [x] Methodology, metrics, AI-agents are detailed sections
- [ ] PR opened via GitHub flow
