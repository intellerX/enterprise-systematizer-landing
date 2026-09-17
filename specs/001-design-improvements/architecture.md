# Architecture — Design improvements

## Summary

UI polish in global button tokens + header CSS/JS behavior. Hero gains a client `HeroMedia` layer: local `<video>` (webm/mp4) with poster, CSS intro keyframes, and scroll-linked `transform` for parallax. Color grade overlays keep brand teal/cyan.

## Context diagram

```text
Visitor scroll/load
  → HeroMedia (video + intro CSS + parallax listener)
  → SiteHeader (icon toggle < lg; hover mega-menu ≥ lg)
  → Shared .btn tokens
```

## Components

| Component | Responsibility |
| --------- | -------------- |
| `Hero` / `HeroMedia` | Video plane, intro, parallax |
| `SiteHeader` | Icon menu toggle; desktop hover/focus menus |
| `globals.css` `.btn*` | Professional button states |

## Data / assets

- `public/media/hero-ambient.mp4`
- `public/media/hero-ambient.webm`
- `public/media/hero-poster.jpg`

## Key decisions

| Decision | Choice | Why |
| -------- | ------ | --- |
| Reference site | typesafe.ai motion language | User request; not asset reuse |
| Video hosting | Local `public/media` | DN3; performance control |
| Parallax | `requestAnimationFrame` + CSS transform on media only | Subtle; content stays readable |
| Menu breakpoint | Keep `lg` 1024 for full nav | Matches existing IA density |

## Risks

| Risk | Mitigation |
| ---- | ---------- |
| Autoplay blocked | Poster + muted playsInline; graceful static |
| Large video weight | Compressed ~1–2MB loop |
| Motion sickness | `prefers-reduced-motion` hard disable |
