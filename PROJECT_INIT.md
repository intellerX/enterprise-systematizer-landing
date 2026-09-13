# Project initialization guide

Use this file when starting a **new** project. It mirrors the open-spec organization used by **CallSpamBlocker** (this repo: `/home/user/hermes`).

Canonical live layout lives in this repo. A ready-to-copy scaffold is at [`templates/new-project/`](templates/new-project/).

---

## 1. Open-spec folder organization

```text
project-root/
├── PROJECT_INIT.md          # optional copy of this guide
├── specs/
│   ├── README.md            # how specs work in the repo
│   ├── 000-product/         # living product context (always present)
│   │   ├── overview.md
│   │   ├── requirements.md
│   │   ├── architecture.md
│   │   └── tasks.md
│   └── NNN-feature-name/    # one folder per feature / change (001, 002, …)
│       ├── overview.md
│       ├── requirements.md
│       ├── architecture.md
│       └── tasks.md
└── .cursor/
    ├── rules/
    │   ├── spec-driven.mdc  # always read specs before planning/coding
    │   └── github-flow.mdc  # private repos + feature branches + PRs
    └── skills/
        └── spec-driven-design/
            ├── SKILL.md
            └── templates/   # blank overview / requirements / architecture / tasks
                ├── overview.md
                ├── requirements.md
                ├── architecture.md
                └── tasks.md
```

### Spec file order

Fill each folder in this order: **overview → requirements → architecture → tasks**.

| File | Purpose |
| ---- | ------- |
| `overview.md` | Problem, goals, non-goals, users, success metrics, status |
| `requirements.md` | Functional / non-functional requirements, constraints, open questions |
| `architecture.md` | Components, data, decisions, risks |
| `tasks.md` | Ordered implementation slices with checkboxes |

Mark unknowns as `TBD`. Do not invent product requirements.

### Naming

- **Project / folder / GitHub repo:** kebab-case from the product title.  
  Example: `EnterpriseSystematizerLanding` → `enterprise-systematizer-landing`  
  (folder path and `gh repo create` name must match that kebab-case id).
- Product folder is always `000-product/`.
- Feature folders: `001-short-name`, `002-short-name`, … (lowercase, hyphens).
- Prefer committed specs over chat memory when they conflict.

---

## 2. Bootstrap a new project (copy this organization)

From a machine that has this repo:

```bash
# 0) Derive kebab-case id from the product title
#    EnterpriseSystematizerLanding → enterprise-systematizer-landing
NAME=enterprise-systematizer-landing

# 1) Create the new project directory (sibling of other projects is fine)
mkdir -p /home/user/$NAME
cd /home/user/$NAME

# 2) Copy open-spec organization + Cursor rules/skill templates
cp -a /home/user/hermes/templates/new-project/. .
# or, if hermes is elsewhere:
# cp -a /path/to/hermes/templates/new-project/. .

# 3) Git + private GitHub repo (name = kebab-case id)
git init -b main
# add a .gitignore before the first commit (secrets, build dirs, venv, etc.)
git add -A
git commit -m "Initial commit: open-spec layout and project conventions."

gh repo create "$NAME" --private --source=. --remote=origin --push
```

If `gh` is not logged in: `gh auth login`, then retry `gh repo create … --private`.

### Add a feature spec later

```bash
mkdir -p specs/001-my-feature
cp .cursor/skills/spec-driven-design/templates/*.md specs/001-my-feature/
```

Then fill the four files and implement from `tasks.md`.

---

## 3. Conventions (always)

### Private repository

- **Always** create the GitHub repository as **private** (`gh repo create … --private`).
- Do not make a repo public unless the owner explicitly requests it.

### GitHub flow

1. Start from up-to-date `main`.
2. Create a branch: `feature/{feature-detail}`  
   Examples: `feature/slice-5-ui`, `feature/add-export`, `feature/fix-login-timeout`.
3. Implement (update matching specs in the same change set when behavior/design changes).
4. Push the branch and **always open a PR** into `main` (never commit straight to `main`).
5. Merge via PR; then branch again from `main` for the next feature.

```bash
git checkout main && git pull
git checkout -b feature/short-detail
# … work …
git push -u origin HEAD
gh pr create --title "Short why-focused title" --body "$(cat <<'EOF'
## Summary
- …

## Test plan
- [ ] …
EOF
)"
```

Branch name rules:

- Prefix: `feature/`
- Detail: lowercase words separated by hyphens
- No spaces; keep it short and descriptive

---

## 4. Agent / Cursor wiring

After copying `templates/new-project/`:

- `.cursor/rules/spec-driven.mdc` — agents read `specs/` before planning or coding.
- `.cursor/rules/github-flow.mdc` — private repos; `feature/{feature-detail}`; PRs required.
- `.cursor/skills/spec-driven-design/` — full open-spec workflow skill + blank templates.

Product-specific skills (Android, Kotlin, etc.) are **not** part of the open-spec bootstrap; add those only when the stack needs them.

---

## 5. New-project checklist

- [ ] Chose kebab-case project id from product title (e.g. `EnterpriseSystematizerLanding` → `enterprise-systematizer-landing`)
- [ ] Copied `templates/new-project/` into the new root
- [ ] Filled `specs/000-product/` (overview → requirements → architecture → tasks)
- [ ] `.gitignore` covers secrets, build output, local env files
- [ ] `git init -b main` + initial commit
- [ ] GitHub repo created with **`--private`** using the same kebab-case id
- [ ] First work on `feature/{feature-detail}` with a PR into `main`

---

## Reference in this repo

| Path | Role |
| ---- | ---- |
| `specs/` | Live CallSpamBlocker open specs |
| `.cursor/skills/spec-driven-design/` | Skill + blank templates |
| `.cursor/rules/spec-driven.mdc` | Spec workflow rule |
| `.cursor/rules/github-flow.mdc` | Private repo + PR flow rule |
| `templates/new-project/` | Exact copyable open-spec organization for future projects |
