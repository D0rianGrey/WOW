# Encyclopedia V1 — handoff after Task 4

Date: 2026-09-17
Branch: `feat/encyclopedia-v1`
Binding spec: `docs/superpowers/specs/2026-09-17-wow-forever-encyclopedia-design.md`
Implementation plan: `docs/superpowers/plans/2026-09-17-wow-forever-encyclopedia-v1.md`

## Resume point

Tasks 1–4 are complete and independently reviewed. Resume at **Task 5: Implement the master timeline**. Do not repeat Tasks 1–4.

The SDD scratch ledger remains at:

`.superpowers/sdd/2026-09-17-wow-forever-encyclopedia-v1/progress.md`

It is intentionally git-ignored. This tracked handoff contains the durable state needed by another model. The detailed verified source notes are tracked at:

`docs/research/2026-09-17-wow-forever-source-notes.md`

## Completed tasks

| Task | Result | Commits | Review status |
| --- | --- | --- | --- |
| 1 — Astro scaffold | Static Astro app, `/WOW` base path, tokens, build/test/e2e scripts, home smoke test | `c98cb83`, `1696ac5` | Important E2E gap fixed; approved |
| 2 — Content model | Typed statuses, lore/source/timeline schemas, source records, schema tests | `6082060` | No Critical/Important findings |
| 3 — Visual shell | Responsive shell, 11-item navigation, reading modes, spoiler controls, progress UI | `50907e1`, `912ebbc` | Retail persistence issue fixed; approved |
| 4 — Guided lore path | Eight sourced chapters, Start Here, dynamic routes, sources, explicit completion and progress | `f2d04e3`, `080f210` | Language/source issues fixed; approved |

Additional repository-preservation commits: `ef98cc4` imported the two binding documents and `6f4f067` normalized them to exact remote blob bytes.

## Current verification

Task 4 final evidence before this handoff:

- Vitest: 11/11 focused chapter/content checks passed.
- Playwright: 11/11 passed before the Task 4 source/language fix; the fix did not change browser behavior.
- Astro check: 0 errors, 0 warnings, 0 hints.
- Astro build: 10 static pages generated.
- Responsive guided route checks: 6/6 at 390, 768 and 1440 px.
- `git diff --check`: clean.

Fresh checkpoint verification after adding this handoff passed:

```bash
npm test          # 11/11 passed
npm run build     # 10 pages; Astro diagnostics 0/0/0
npm run test:e2e # 11/11 passed
```

The build still prints expected empty-loader warnings for collections owned by Tasks 5–8, and Playwright prints the deferred environment color warning.

## Integration contracts

- `BaseLayout` / `LoreLayout` accept `chapterIds: string[]`.
- Reading progress is stored in `localStorage` key `wow-reading-progress` as a JSON array of unique completed chapter IDs.
- Changes dispatch `wow:progress-changed`.
- Reading mode uses `wow-reading-mode`: `essential | deep`.
- Retail spoiler visibility uses `wow-spoilers`: `hidden | shown`.
- UNCONFIRMED notes are independent, explicit opt-ins and never follow the Retail switch.
- Internal paths must use `src/lib/routes.ts` so GitHub Pages base `/WOW` is retained.
- Canonical IDs in chapters, timeline, dossiers and search must match.
- `assertValidContentReferences` is currently a partial pure helper. Task 4 enforces chapter source IDs. Complete cross-collection registry enforcement after Tasks 5–8 populate all collections.
- When Task 5 creates `src/content/timeline/core.json`, switch its collection loader from the temporary Markdown glob to the JSON file loader. Do the same for glossary in Task 8.

## Source and lore rulings

- Official Blizzard announcements support Forever's own “time bubble”, Forsaken Kingdom bridge, Forsaken Paladins, Skyborne/shen’dorei, Mount Hyjal aftermath, Shen’dralas and Riverglades.
- Announcement text is evidence of announced content, not proof of live beta observation or eventual quest outcomes.
- Do not infer Forsaken Kingdom endings, dialogue or complete campaign plot from promotional recaps.
- Do not mix Shen’dralas (place), Shen’dralar (group) and shen’dorei (Skyborne).
- The inaccessible Warcraft III manual endpoint and blocked Well of Eternity preview were removed from user-facing sources. Do not restore dead links.
- Ancient causal gaps remain intentional. Do not fill the elemental-war sequence, Y’Shaarj-to-Well chain, dark-troll origin chain or full Curse of Flesh sequence from memory.
- The 2004 manual is an era-specific baseline. Later Retail revelations do not replace what a Year-1 Forever reader is meant to know.
- Main prose is Russian; preserve English only for canonical names, titles and Warcraft terms.

## Deferred Minor findings

These do not block completed tasks, but the final whole-branch review must triage them:

1. Task 1/3/4 test output can show environment `NO_COLOR` / `FORCE_COLOR` warnings. Investigate in Task 9 without changing global machine configuration.
2. Before chapters are supplied, the native progress element has `max=1` while the label says 0/0. Current guided pages supply chapter IDs; decide whether the empty state needs a semantic adjustment.
3. `ChapterNext` uses `aria-pressed` while completion is currently one-way. Either support undo or use a disabled completed state before final merge.
4. Empty future collection loader warnings are expected until Tasks 5–8 populate those collections. Final build output must be clean.

## Rulings already made

- Added `@astrojs/check` because the required build script invokes `astro check`.
- Added a minimal real Playwright smoke test during Task 1 so `npm run test:e2e` is runnable from the start.
- Retained the reference-validation helper and deferred full registry wiring until real collections exist.
- Explicit chapter completion drives progress; merely opening a chapter does not mark it read.
- Unverified or inaccessible ancient claims were narrowed or omitted instead of being silently reconstructed.
- Deployment workflow later must remain gated; do not publish or deploy without explicit approval.
- Do not merge to `main`.

## Next implementation task

Use the Superpowers subagent-driven-development workflow exactly as originally requested:

1. Fresh implementer for Task 5.
2. Independent Task 5 review.
3. Fix all Critical/Important findings before Task 6.
4. Continue sequentially through Task 10.
5. Perform whole-branch review and final full verification.
6. Report completed tasks, tests/build status, unresolved findings, rulings and deployment readiness.

Task 5 must implement real timeline data from Ancient Azeroth through the Forever anchor, approximate dates without false precision, era/status/faction filters, and the spec-required character/location filtering. Preserve all source and spoiler rulings above.
