# Requirements — Design improvements

## Functional

| ID | Requirement | Priority | Acceptance |
| ---- | ----------- | -------- | ---------- |
| D1 | Polish buttons (primary/ghost) and shared controls: cleaner borders, focus rings, hover/active states | must | Focus-visible ring; no layout jump on hover |
| D2 | Polish header, panels, section chrome for desktop density while remaining mobile-first | must | Readable at 375 / 768 / 1280 |
| D3 | Mobile menu control is an icon toggle (not a large “Open Menu” text chip); labeled via `aria-label` | must | Screen reader still announces open/close |
| D4 | At `lg` (≥1024px), menu toggle is not visible; primary nav + Contact CTA are visible | must | Toggle `display:none` / not in tab order when hidden |
| D5 | Desktop mega-menu opens on hover/focus and keyboard; Escape closes | must | Pointer + keyboard paths work |
| D6 | Hero empty plane replaced by ambient background video (local assets) with dark enterprise color grade | must | Video muted, loop, playsInline; poster shown until ready |
| D7 | Hero **intro transition** on first paint (fade/scale/blur reveal of media + content) | must | Runs once; skipped when `prefers-reduced-motion: reduce` |
| D8 | Hero **scroll parallax**: media layer translates subtly while scrolling through hero / page top | must | Subtle (enterprise); disabled under reduced motion |
| D9 | Keep existing CSS color tokens (teal/cyan dark enterprise) | must | No purple-gradient theme swap |

## Non-functional

| ID | Requirement | Priority | Notes |
| ---- | ----------- | -------- | ----- |
| DN1 | Video assets optimized (short loop, compressed) under `public/media/` | must | Prefer mp4 + webm |
| DN2 | Respect reduced motion | must | Static poster + no parallax/intro |
| DN3 | Do not hotlink third-party site videos | must | Inspiration only from typesafe.ai |

## Constraints

- Dark mode only
- GitHub flow: `feature/design-improvements` → PR to `main`

## Open questions

- [x] Video source: royalty-free compressed local assets (not TypeSafe files)
