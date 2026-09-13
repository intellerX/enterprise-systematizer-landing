---
name: react-responsive
description: >-
  Builds React (JSX/TSX) UIs with TypeScript, modern hooks, and mobile-first
  responsive layouts. Use when creating or editing React components, hooks,
  pages, CSS modules, Tailwind/responsive breakpoints, media queries, or when
  the user mentions React, Vite/Next, or responsive web UI.
paths:
  - "**/*.tsx"
  - "**/*.jsx"
  - "**/*.css"
  - "**/*.module.css"
  - "**/components/**"
  - "**/pages/**"
  - "**/app/**"
metadata:
  project: hermes
  note: For React web UI. Does not override CallSpamBlocker Android product bans (no RN/Compose swap-in).
---

# React + Responsive

Develop React UIs that work on phone → tablet → desktop. Prefer the repo’s existing stack (Vite, Next, CRA, etc.) when present; do not introduce a second framework without an explicit ask.

## When this applies

- Editing `.tsx` / `.jsx`, React hooks, routers, or web component trees
- Layout / CSS that must adapt across viewports
- **Not** for CallSpamBlocker Android slices (`:app` / framework views) — those stay on `android-framework-ui-dark` and product specs

## Stack defaults

| Concern | Prefer | Avoid unless asked |
| ------- | ------ | ------------------ |
| Language | TypeScript + function components | Class components |
| State | Local `useState` / URL state; lift only when shared | Global store for trivial UI |
| Effects | `useEffect` for sync with external systems only | Fetch-in-effect when a router/loader already fits |
| Styling | Existing project CSS approach (modules, Tailwind, CSS vars) | New CSS framework mid-feature |
| Components | Small, props-typed, one job | God components, prop drilling 4+ levels |

Follow the repo if it already uses React Compiler guidance: do **not** add `useMemo` / `useCallback` by default. Prefer modern patterns (`useEffectEvent`, `startTransition`, `useDeferredValue`) when they fit.

## Component checklist

1. Function component + explicit props type (`type Props = { … }`).
2. Name by role (`SimPicker`, not `Box1`).
3. Keep side effects out of render; derive values instead of syncing state copies.
4. Keys: stable ids, never array index for reorderable lists.
5. Forms: controlled inputs or the project’s form lib; label every control.
6. A11y: semantic HTML (`button`, `nav`, `main`); keyboard focus; `aria-*` only when native semantics are insufficient.

```tsx
type SimCardProps = {
  name: string;
  active: boolean;
  onSelect: (id: string) => void;
  id: string;
};

export function SimCard({ id, name, active, onSelect }: SimCardProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(id)}
    >
      {name}
    </button>
  );
}
```

## Responsive (mobile-first)

Design **smallest viewport first**, then enhance.

| Token | Width | Typical use |
| ----- | ----- | ----------- |
| base | &lt; 640px | Phone — single column, full-width actions |
| `sm` | ≥ 640px | Large phone |
| `md` | ≥ 768px | Tablet — optional side-by-side |
| `lg` | ≥ 1024px | Desktop layout |
| `xl` | ≥ 1280px | Wide desktop — constrain measure, don’t stretch forever |

Rules:

- **No horizontal page scroll** at 320–428px unless the feature is explicitly a wide table (then provide an inner scroll region).
- Stack flex/grid children on base; only set `row` / multi-column from `md` up.
- Touch targets ≥ 44×44px on mobile; don’t rely on hover-only affordances.
- Images/media: `max-width: 100%`; prefer intrinsic aspect ratio.
- Type: `rem` / fluid scale; avoid fixed px font sizes for body copy.
- Navigation: collapse to a simple toggle/drawer pattern below `md` when links don’t fit one row.
- Fixed/sticky chrome must not cover content; account for safe areas (`env(safe-area-inset-*)`) when relevant.

### CSS pattern (plain / modules)

```css
.shell {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  max-width: 72rem;
  margin-inline: auto;
}

@media (min-width: 768px) {
  .shell {
    flex-direction: row;
    padding: 1.5rem;
  }
}
```

### Tailwind-style pattern (only if the repo already uses Tailwind)

```tsx
<div className="flex flex-col gap-4 p-4 md:flex-row md:p-6 max-w-6xl mx-auto">
  …
</div>
```

Use mobile-first variants (`md:`, `lg:`), not desktop-first overrides.

## Layout & visual quality

When building marketing or visually led surfaces in React, follow the workspace frontend design rules (brand-first hero, one job per section, real imagery, restrained motion). For app chrome/settings screens, prefer clarity and density over hero marketing patterns.

- One clear visual hierarchy per view
- CSS variables for color/spacing when introducing a palette
- Avoid generic “AI slop” looks (purple gradients, cream+terracotta defaults, glow stacks) unless the brand already uses them

## Responsive verification

After UI changes, mentally (or with browser tools) check:

| Width | Expect |
| ----- | ------ |
| 375 | Single column; tappable controls; no clipped text |
| 768 | Tablet; nav usable; optional 2-column |
| 1280 | Desktop; content max-width; no ultra-wide stretch |

Fail if: overflow-x on body, overlapping controls, unreadable type, hover-only actions on touch layouts.

## Do / don’t

| Do | Don’t |
| -- | ----- |
| Match existing folder and import aliases | Invent a parallel `components2/` tree |
| Colocate component + styles when the repo does | Dump all CSS into one global file |
| Prefer composition over inheritance | Premature abstraction (“utils” for one call site) |
| Keep client interactivity leaf-local (Next `"use client"` deep) | Mark entire trees client without need |
| Update specs when UI behavior changes | Ship React into the Android APK / RN rewrite |

## Related

- Spec flow: `spec-driven-design`
- GitHub flow: `.cursor/rules/github-flow.mdc`
- Android UI (this product): `android-framework-ui-dark` — mutually exclusive with React for CallSpamBlocker v1
