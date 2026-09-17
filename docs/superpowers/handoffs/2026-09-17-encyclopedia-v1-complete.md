# Encyclopedia V1 — handoff after Tasks 5–10

Date: 2026-09-17 (updated the same evening after the final audit)
Branch: merged into `main`; the site is live at https://d0riangrey.github.io/WOW/
Binding spec: `docs/superpowers/specs/2026-09-17-wow-forever-encyclopedia-design.md`
Implementation plan: `docs/superpowers/plans/2026-09-17-wow-forever-encyclopedia-v1.md` (all tasks done)
Audit report: `docs/audits/2026-09-17-encyclopedia-v1-audit.md` (includes the Tasks 5–8 fact-check)
Supersedes: `docs/superpowers/handoffs/2026-09-17-encyclopedia-v1-after-audit.md`

## State

The V1 plan is complete, merged and deployed. The repository is public (GitHub Pages needs that on the
free plan) and the owner ran the manual deployment. Deployment stays manual: it never happens without
the owner asking for it.

A final audit followed the deployment — four review channels, all findings triaged and fixed:
`docs/audits/2026-09-17-final-audit.md`, raw model output under `docs/audits/reviews/2026-09-17/`.
Content gaps it found are queued in `docs/superpowers/plans/2026-09-17-content-backlog.md`.

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
| Staying current | `scripts/watch-sources.mjs`, `.github/workflows/watch-sources.yml` | daily check for official articles the encyclopedia does not cite yet; opens one tracking issue |

## Verification at hand-off

```bash
npm run verify:evidence  # 571/571 quotes verified against live sources
npm test                 # 61/61
npm run build            # astro check 0 errors
npm run test:e2e         # 18/18, including a crawl of every referenced URL, image and #anchor
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
- Internal links carry a trailing slash (`route()` adds it): without it GitHub Pages answers every click
  with a 301.
- Blizzard forums serve browsers an empty app shell, so the evidence checker retries with a crawler
  user agent; its 502/504 answers are throttling, not dead pages, and are retried with backoff.

## Publishing (done once, repeat per release)

Actions → "Deploy to GitHub Pages" → Run workflow on `main`. Pages is already configured with the
GitHub Actions source, and the build job refuses any ref but `main`. Optional: Settings →
Environments → `github-pages` → required reviewers, if a deployment should need a second pair of eyes.

## Open

- Official open texts are still missing for the gaps listed in the audit report (Old Gods order, elemental wars,
  kaldorei origin from dark trolls, the fall of Arathor, gnome lineage through the Curse of Flesh).
- The timeline follows the 2004 manual for the voyage to Kalimdor; the Warcraft III retrospective tells Thrall's
  story in parallel with the plague. Add that second ordering only with a verified quote.
- Forever beta observations are deliberately absent. Once the beta produces official or in-game text, follow
  the update contract (`BETA` status, human review).
