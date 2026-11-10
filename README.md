# intellerX

Landing oscura de la fábrica de software potenciada por AI. Español por defecto; inglés con la cookie `ix_locale=en`. React + TypeScript (Next.js App Router).

## Non-negotiables

- Dark theme only (no light toggle)
- Lead inbox is **server-only** via `LEAD_TO_EMAIL` — never shown on the page
- Spec-driven work under [`specs/000-product/`](specs/000-product/)

## Setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

| Variable | Where | Purpose |
| -------- | ----- | ------- |
| `LEAD_TO_EMAIL` | server only | Destination for consultation leads (never `NEXT_PUBLIC_*`) |
| `LEAD_ADAPTER` | server | `mock` (default) or `email` |
| `RESEND_API_KEY` / `LEAD_FROM_EMAIL` | server | Optional real email send when `LEAD_ADAPTER=email` |
| `NEXT_PUBLIC_SITE_URL` | public | Absolute URLs for sitemap / OG |

## Scripts

| Command | Purpose |
| ------- | ------- |
| `npm run dev` | Local development |
| `npm run build` / `start` | Production build & serve |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run test` | Vitest unit/component tests |
| `npm run test:e2e` | Playwright (build + start first, or use config webServer) |
| `npm run ci` | lint + typecheck + test + build |

## Content editing

Edit typed modules under `src/content/` (services, industries, methodology, metrics, assessment, insights, navigation, site copy). Presentational components read that data — avoid hardcoding marketing copy in UI files.

Copy de la home: `src/content/landing.ts`. Cromo ES/EN: `src/i18n/es.ts` y `src/i18n/en.ts`. Idioma: cookie `ix_locale` (`es` por defecto).

## Architecture notes

- Contact: `POST /api/contact` → validate → honeypot → rate limit → `LeadAdapter`
- Assessment: client-side scoring in `src/lib/assessment/scoring.ts` (future `POST /api/assessment` documented in code)
- Specs: [`specs/000-product/`](specs/000-product/)

## Repository

Private GitHub. Feature branches `feature/{detail}` → PR into `main`.
