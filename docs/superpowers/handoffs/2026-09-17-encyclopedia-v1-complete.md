# Encyclopedia V1 — handoff after Tasks 5–10

Date: 2026-09-17
Branch: `feat/encyclopedia-v1` (pull request to `main`, not merged)
Binding spec: `docs/superpowers/specs/2026-09-17-wow-forever-encyclopedia-design.md`
Implementation plan: `docs/superpowers/plans/2026-09-17-wow-forever-encyclopedia-v1.md` (all tasks done)
Audit report: `docs/audits/2026-09-17-encyclopedia-v1-audit.md` (includes the Tasks 5–8 fact-check)
Supersedes: `docs/superpowers/handoffs/2026-09-17-encyclopedia-v1-after-audit.md`

## State

The V1 plan is complete. Nothing is deployed and `main` still holds only the spec: merging and the first
deployment wait for the owner's explicit approval.

| Area | Where | Notes |
|---|---|---|
| Timeline and eras | `src/content/timeline/core.json`, `src/lib/eras.ts`, `/timeline`, `/eras` | 32 events, 10 eras, filters in the URL, `#forever` "you are here" anchor |
| Dossiers | `src/content/{characters,factions,locations}/` | 43 entries, one per canonical ID; two hand-made SVG diagrams |
| Forever changes | `src/content/forever/`, `/forever-changes` | 10 comparisons + announced schedule; `sourceNote` shows disagreeing official texts |
| Glossary, sources, search | `src/content/glossary/core.json`, `/sources`, `/search` | client search over titles, summaries and aliases |
| Changelog and update log | `src/content/changelog/entries.json`, `src/content/update-log/entries.json` | reader-facing v0.1–v0.7; machine-readable, append-only lore history |
| Automation contract | `docs/automation/lore-update-contract.md` | PR-only, evidence-verified, human approval for FOREVER/CHANGED/BETA |
| CI | `.github/workflows/validate.yml`, `evidence.yml`, `deploy.yml` | deploy is `workflow_dispatch` only; its build job runs only on `main` |
| Illustrations | `public/images/chapters/`, `src/lib/illustrations.ts` | eight original AI scenes, WebP 1600w + 960w, credited as not Blizzard art |

## Verification at hand-off

```bash
npm run verify:evidence  # 561/561 quotes verified against live sources
npm test                 # 54/54
npm run build            # astro check 0 errors
npm run test:e2e         # 18/18, including a crawl of every internal link and #anchor
```

## Fact-check of Tasks 5–8

Seven Grok passes (`docs/audits/grok/2026-09-17/f5…f11`) found 159 issues, none critical, no invented Forever
facts and no Retail outcomes presented as the Year-1 state. Typical defects and the fixes are summarised in the
audit report. The pattern worth remembering: a correct quote often existed in the ledger but was tagged for a
neighbouring entry, so the text looked sourced while its own `entryRefs` did not back it. Tag the quote for
every entry that relies on it.

## Rulings added in this stretch

- Illustrations: generated through Codex without per-image approval (owner, 2026-09-17). Check
  `~/.claude/bin/codex-usage.sh` before and after each image and stop only above 99%. One image took about
  1% of the 5-hour Codex window and about a minute.
- Chapter completion is a toggle: the button marks or unmarks the chapter and a status line announces the state.
- Reading progress is always counted against the full eight-chapter path.
- Empty YAML lists must be written as `[]`: a bare `field:` parses as `null` and fails the content schema at
  build time (unit tests do not parse frontmatter with YAML).

## Manual steps for the owner

1. Review and merge the pull request into `main`.
2. Settings → Pages → Source: GitHub Actions.
3. Settings → Environments → `github-pages`: add required reviewers if deployments should need approval.
4. Actions → "Deploy to GitHub Pages" → Run workflow on `main`.

## Open

- Official open texts are still missing for the gaps listed in the audit report (Old Gods order, elemental wars,
  kaldorei origin from dark trolls, the fall of Arathor, gnome lineage through the Curse of Flesh).
- The timeline follows the 2004 manual for the voyage to Kalimdor; the Warcraft III retrospective tells Thrall's
  story in parallel with the plague. Add that second ordering only with a verified quote.
- Forever beta observations are deliberately absent. Once the beta produces official or in-game text, follow
  the update contract (`BETA` status, human review).
