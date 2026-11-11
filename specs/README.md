# Specs

This repo uses a simple **spec-driven design** (open-spec) layout.

Bootstrap + naming + GitHub conventions: [`../PROJECT_INIT.md`](../PROJECT_INIT.md).

## Structure

| Path | Purpose |
| ---- | ------- |
| `000-product/` | Living product context. Home and language follow `002-factory-landing/` |
| `002-factory-landing/` | intellerX factory landing (Spanish default, English in sync) |
| `003-hero-scene/` | Three.js hero backdrop restored from before the factory redesign |
| `NNN-feature-name/` | Spec for one feature or change |
| `.cursor/skills/spec-driven-design/` | Agent skill + blank templates |

Each spec folder has four files, filled in order:

1. `overview.md`
2. `requirements.md`
3. `architecture.md`
4. `tasks.md`

## How to add a feature spec

```bash
mkdir -p specs/001-my-feature
cp .cursor/skills/spec-driven-design/templates/*.md specs/001-my-feature/
```
