# Overview — Design improvements

## Problem

The landing feels unfinished on desktop: an ugly **Open Menu** control appears where a proper nav should, buttons/components lack enterprise polish, and the hero has empty visual space above the brand instead of a cinematic media plane (reference: [typesafe.ai](https://typesafe.ai/) motion — adapted for dark enterprise teal/cyan).

## Goals

- Professional micro-details on buttons and shared UI chrome
- Desktop-first nav: hide mobile menu toggle at desktop breakpoints; working mega-menu (hover + keyboard)
- Hero full-bleed ambient video with (1) load intro transition and (2) subtle scroll parallax
- Keep dark-only palette and responsive behavior (360–1920)

## Non-goals

- Light theme
- Copying TypeSafe branding, copy, or hosting their video assets
- Changing IA / product messaging
- New pages or assessment/contact behavior changes

## Users

Same as `000-product` (CTO / CIO visitors reviewing the marketing site).

## Success metrics

- No “Open Menu” text button visible at ≥1024px; desktop nav usable
- Hero shows video (with poster fallback); intro + parallax honor `prefers-reduced-motion`
- Buttons/components look sharper without purple/glow AI-slop aesthetics

## Status

- **Phase:** in-progress
- **Owner:** TBD
- **Related:** `specs/000-product/`; reference motion from typesafe.ai (inspiration only)
