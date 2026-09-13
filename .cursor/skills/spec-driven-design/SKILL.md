---
name: spec-driven-design
description: >-
  Maintains and implements from specs/ using this project's simple
  spec-driven design flow. Use when creating or updating specs, initializing
  project context, planning features, or implementing work that should follow
  overview → requirements → architecture → tasks.
---

# Spec-Driven Design

## Layout

```
specs/
  README.md                 # how specs work in this repo
  000-product/              # product-level context (always current)
    overview.md
    requirements.md
    architecture.md
    tasks.md
  NNN-feature-name/         # one folder per feature / change
    overview.md
    requirements.md
    architecture.md
    tasks.md
.cursor/skills/spec-driven-design/templates/   # copy these for new specs
```

Number folders `001`, `002`, … Keep names lowercase with hyphens.

## When to read specs

1. Before planning or coding, read `specs/000-product/` plus any active feature folder.
2. Prefer specs over chat history when they disagree.
3. If the user gives a product/feature prompt, update specs first, then implement.

## Create or update a spec

1. Copy templates from `.cursor/skills/spec-driven-design/templates/` into `specs/NNN-name/`.
2. Fill in order: **overview → requirements → architecture → tasks**.
3. Keep each file short. Link out rather than duplicating.
4. Mark unknowns as `TBD` with a one-line question — do not invent product facts.
5. Update `tasks.md` checkboxes as work completes.

## Implement from a spec

1. Confirm requirements are agreed (or explicitly provisional).
2. Implement only what `tasks.md` lists for the current slice.
3. If code needs a design change, update `architecture.md` (and requirements if behavior changes) in the same change set.
4. Do not skip the spec for "small" features that change user-visible behavior.

## Product context (`000-product`)

`specs/000-product/` is the living project brief. When the user sends a project prompt:

1. Fold it into `000-product` (overview + requirements first).
2. Keep architecture high-level until stack choices are decided.
3. Put build slices in `tasks.md`; spin feature folders when a slice needs its own design.

## Templates

Canonical blank files: [templates/](templates/).
