# Encyclopedia V1 — handoff after the audit (Task 4R)

> **Superseded** by `2026-09-17-encyclopedia-v1-complete.md` (Tasks 5–10 done).

Date: 2026-09-17
Branch: `feat/encyclopedia-v1`
Binding spec: `docs/superpowers/specs/2026-09-17-wow-forever-encyclopedia-design.md`
Implementation plan: `docs/superpowers/plans/2026-09-17-wow-forever-encyclopedia-v1.md` (Tasks 5–10 rewritten)
Audit report: `docs/audits/2026-09-17-encyclopedia-v1-audit.md`
Supersedes: `docs/superpowers/handoffs/2026-09-17-encyclopedia-v1-after-task-4.md`

## Resume point

Tasks 1–4 and the audit remediation (Task 4R) are complete. Resume at **Task 5: master timeline and eras**, after reading the plan section "Gate before Task 5". Do not repeat Tasks 1–4.

## What changed in Task 4R

- **Evidence ledger.** `docs/research/evidence/chapter-00.json` … `chapter-07.json` hold every factual claim of the eight chapters as `claim` (Russian) + `sourceId` + verbatim English `quote` (+ PDF `locator`). `npm run verify:evidence` (`scripts/verify-evidence.mjs`) downloads each source, including PDFs through `unpdf`, and checks every quote. The run at the end of Task 4R verified all quotes.
- **Chapters rewritten from the ledger.** Chapter 01 now tells the War of the Ancients (Warcraft III manual + later official texts). Chapter 07 describes the Year-1 world state (2004 manual). Chapter 06 no longer contains unsupported details (plague spread through grain, Andorhal during the Third War, Uther refusing at Stratholme). All Forever facts carry Forever sources and sit inside `data-lore-status="FOREVER"` blocks.
- **Sources.** `src/content/sources/core.json` now has 28 sources; the unused Warcraft II Battle.net article was removed. `type` is an enum, `url` or `citation` is required, and `checkedAt` records the verification date.
- **Schemas.** Non-`ESTABLISHED` lore must cite a source (`requireSourcesUnlessEstablished`). `chapterEntrySchema` stays a plain `z.object` because `createLoreSchema`'s generic erases field types.
- **Canonical IDs.** `src/lib/canonical-ids.ts` registers character, faction and location IDs for Tasks 5–8 (`tests/canonical-ids.test.ts`: unique, kebab-case).
- **Tests.** `tests/evidence-ledger.test.ts` (every chapter source backed by a quote for that chapter; no unused sources; PDF locators). `tests/chapter-content.test.ts` now scopes the three takeaways, validates status blocks and bans mentions of the internal research process. `passWithNoTests` removed.
- **E2E against the real build.** Playwright runs `npm run build && npm run preview -- --ignore-lock`. `--ignore-lock` is required: when Astro detects an AI agent, `astro preview` otherwise detaches into a background server and Playwright reports "Process from config.webServer exited early".

## Verification at the end of Task 4R

```bash
npm test                 # 22/22
npm run verify:evidence  # all ledger quotes verified
npm run build            # astro check 0 errors; 10 pages
npm run test:e2e         # 12/12 against astro preview
```

A final Grok fact-check pass of the rewritten chapters is recorded in the audit report.

## Rulings (replace the source rulings of the Task 4 handoff)

- No factual sentence without a ledger quote. Research with Grok (web, read-only), accept only what the verifier confirms. Grok also produces wrong negative claims ("the name is not on the page"); check those against the page.
- Official Blizzard texts only for `ESTABLISHED` and `FOREVER`. Community wikis only as pointers or for `BETA` / `UNCONFIRMED`.
- The Warcraft II and III manuals on `ftp.blizzard.com` are valid sources over `http://`.
- When official texts disagree, show both versions (see the correction list in `docs/research/2026-09-17-wow-forever-source-notes.md`).
- Forever facts are announcements, not observed gameplay or quest outcomes. Announced product dates: beta started 17 September 2026, launch 4 November 2026, new raids unlock 9 December 2026. The announcement page gives the launch time once as PDT and once as PST — do not state a single time zone.
- Year-1 fence: the world as original WoW players found it; later Retail only inside `SpoilerBlock`.
- Deployment stays gated; do not merge to `main` or deploy without explicit approval.

## Decisions made by the user

1. **Retail spoilers reveal per block (2026-09-17).** A `SpoilerBlock` button reveals only that block for the current page view and is not persisted. The toolbar switch "Спойлеры Retail" stays the explicit site-wide, persisted opt-in and resets per-block choices. `wow:spoilers-request` was removed. Covered by two e2e tests.

## Open decisions for the user

1. Illustrations: portraits or hero images through Codex `image_gen` only with explicit approval per image (spec §14).

## Deferred Minor findings (still open, owned by Task 9)

1. `NO_COLOR` / `FORCE_COLOR` warnings in test output.
2. Progress element empty state (`max=1` with 0/0).
3. `ChapterNext` one-way `aria-pressed`.
4. Empty collection loader warnings until Tasks 5–8.
5. `main:focus { outline: none }` overrides the global `:focus-visible` outline after the skip link.
