# Overview — Enterprise AI Software Engineering Landing

Source brief: [`prompt.md`](../../prompt.md). Adapted into this repo’s SDD layout and constitution (private repo, GitHub flow, React + TypeScript, `react-responsive`).

## Problem

La landing tiene que vender la fábrica de software de intellerX. El relato vigente (partner de “ingeniería pragmática”, en inglés, orientado a métricas de delivery) no engancha. El pedido nuevo está en [`specs/002-factory-landing/`](../002-factory-landing/overview.md) y manda sobre la home y el idioma.

## Goals

- Landing oscura que vende la fábrica de software potenciada por AI, en español por defecto, con inglés sincronizado.
- Convertir por contacto. El correo del lead sigue siendo solo de servidor.
- Mantener el contenido de marketing en módulos tipados.

## Non-goals

- Company history, years in business, headcount, offices, client logos, testimonials, named case studies, awards, certifications, partner badges, press, leadership bios.
- Full product app, auth, billing, or CRM UI.
- Light theme or theme toggle (v1 is dark-only; non-negotiable).
- Exposing the lead destination email (or any operator inbox) in UI, HTML, or client bundles.
- Un solo idioma. Español es el default; inglés queda disponible (`specs/002-factory-landing`).
- Backend-persisted assessment accounts (v1 is client-side; API contract designed for later).

## Users

- **Primary — CTO / VP Engineering:** “Engineers are faster with AI tools; sprints are not.” Wants delivery metrics to move on their codebase.
- **Primary — CIO / Head of IT:** “AI tools are live but disconnected from cloud, data, and security.” Wants governed, compliant, operable integration.
- **Secondary:** Head of Data, Head of Product, Innovation leads.

## Success metrics

- Methodology, metrics, and AI-agents sections are the strongest, most detailed parts of the site.
- Contact and assessment funnels complete (hero → assessment → contact E2E path).
- Lead submissions reach the configured server destination without the address appearing on the landing.
- Lighthouse ≥ 90 (performance / a11y / best-practices / SEO); WCAG 2.1 AA; responsive 360–1920px.
- CI green: lint, type-check, tests, build.

## Assumptions / Decisions

| Topic | Decision | Notes |
| ----- | -------- | ----- |
| Display brand | intellerX, fábrica de software potenciada por AI | Razón social del Impressum sigue TBD |
| Theme | **Dark mode only** | User non-negotiable; no light theme in v1 |
| Lead email | Destination `anmevel10@gmail.com` via server env only | Must never appear in page UI or client-visible source |
| Stack | React + TypeScript (Next.js App Router) | Per `react-responsive` + prompt default when no app exists yet |
| Content | Typed content modules (TS/JSON), CMS-ready | No marketing copy hardcoded in presentational components |
| Assessment v1 | Client-side scoring + URL/memory state | Optional email of results only via contact form consent |

## Status

- **Phase:** in-progress (home e idioma: `specs/002-factory-landing`)
- **Owner:** TBD
- **Related:** `prompt.md`; skill `spec-driven-design`; skill `react-responsive`
