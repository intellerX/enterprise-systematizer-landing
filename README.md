# intellerX

Landing oscura de la fábrica de software potenciada por AI. Español por defecto; inglés en el navegador (`localStorage`, clave `ix_locale`). Export estático de Next.js.

## Non-negotiables

- Dark theme only (no light toggle)
- The published site is a static export. The contact form opens the visitor's mail app (`mailto:`) and does not reveal a hidden inbox. Optional build-time channels: `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_WHATSAPP`, or `NEXT_PUBLIC_CONTACT_FORM_ACTION`.
- Spec-driven work under [`specs/000-product/`](specs/000-product/)

## Setup

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000/enterprise-systematizer-landing/](http://localhost:3000/enterprise-systematizer-landing/).

### Environment

| Variable | Where | Purpose |
| -------- | ----- | ------- |
| `NEXT_PUBLIC_BASE_PATH` | build | Default `/enterprise-systematizer-landing`. Set empty for a custom domain. |
| `NEXT_PUBLIC_SITE_URL` | build | Canonical URL. Pages default in CI: `https://intellerx.github.io/enterprise-systematizer-landing` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | build | Optional public mailto recipient. Omit to keep any inbox off the site. |
| `NEXT_PUBLIC_WHATSAPP` | build | Optional WhatsApp number, digits only. |
| `NEXT_PUBLIC_CONTACT_FORM_ACTION` | build | Optional external form POST URL. |

## Scripts

| Command | Purpose |
| ------- | ------- |
| `npm run dev` | Local development |
| `npm run build` | Static export into `out/` |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm run test` | Vitest unit/component tests |
| `npm run test:e2e` | Playwright (build + start first, or use config webServer) |
| `npm run ci` | lint + typecheck + test + build |

## Content editing

Edit typed modules under `src/content/` (services, industries, methodology, metrics, assessment, insights, navigation, site copy). Presentational components read that data — avoid hardcoding marketing copy in UI files.

Copy de la home: `src/content/landing.ts`. Cromo ES/EN: `src/i18n/es.ts` y `src/i18n/en.ts`. El idioma se guarda en el navegador (`ix_locale`); el HTML de partida es español.

## Architecture notes

- Contact on the static site: mailto, or WhatsApp / external form when those build env vars are set. There is no `/api/contact` on GitHub Pages.
- GitHub Pages: workflow `.github/workflows/deploy-pages.yml` runs on push to `main`. Expected URL: https://intellerx.github.io/enterprise-systematizer-landing/ . The first time, an admin must set Settings → Pages → Source to **GitHub Actions**. Local dev is at `http://localhost:3000/enterprise-systematizer-landing/`.
- Assessment: client-side scoring in `src/lib/assessment/scoring.ts` (future `POST /api/assessment` documented in code)
- Specs: [`specs/000-product/`](specs/000-product/)

## Repository

Private GitHub. Feature branches `feature/{detail}` → PR into `main`.
