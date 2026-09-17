# WoW Forever Encyclopedia V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first production-ready version of a premium, interactive Russian-language lore encyclopedia tailored to World of Warcraft: Forever, with structured lore content, timeline, entity pages, Forever-specific comparison views, source transparency, spoiler controls, tests, and GitHub Pages deployment.

**Architecture:** Astro + TypeScript static-first site. Lore lives in validated content collections and structured data, separated from UI so future automation can safely update facts without rewriting presentation code. Interactivity is limited to client-side islands for reading mode, spoiler visibility, timeline filters, and search.

**Tech Stack:** Astro, TypeScript, Astro Content Collections, plain CSS with design tokens, Vitest, Playwright, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-17-wow-forever-encyclopedia-design.md`

**Revision 2026-09-17 (after audit):** Tasks 5–10 were rewritten from the audit in `docs/audits/2026-09-17-encyclopedia-v1-audit.md`. Task 4R records the remediation of Tasks 1–4. Read the gate before Task 5 first.

## Global Constraints

- Main prose is Russian; canonical Warcraft names stay in original English.
- Every lore item uses one status: `ESTABLISHED | FOREVER | CHANGED | BETA | UNCONFIRMED`.
- `BETA` and `UNCONFIRMED` must never look like established canon.
- Post-Forever Retail spoilers are hidden by default.
- V1 contains real lore content, not placeholder cards.
- Use primary Blizzard/in-game sources for Forever-sensitive claims where available.
- Every factual claim is backed by a verbatim quote in `docs/research/evidence/` that passes `npm run verify:evidence`; nothing is written from memory.
- Content describes the world as of original WoW Year 1 / the Forever starting point; later Retail material lives only inside `SpoilerBlock`.
- Keep runtime dependencies minimal; do not add Tailwind or a client SPA framework.
- Site must work under GitHub Pages base path `/WOW`.
- No feature may depend on hover-only interaction.
- Heavy imagery is lazy-loaded and always has meaningful alt text.

---

## File Structure

```text
WOW/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── playwright.config.ts
├── vitest.config.ts
├── src/
│   ├── content.config.ts
│   ├── content/
│   │   ├── chapters/*.md
│   │   ├── characters/*.md
│   │   ├── factions/*.md
│   │   ├── locations/*.md
│   │   ├── timeline/*.json
│   │   ├── forever/*.md
│   │   ├── glossary/*.json
│   │   ├── changelog/*.json
│   │   ├── update-log/*.json
│   │   └── sources/*.json
│   ├── components/
│   │   ├── AppShell.astro
│   │   ├── LoreBadge.astro
│   │   ├── ReadingModeToggle.astro
│   │   ├── SpoilerBlock.astro
│   │   ├── Timeline.astro
│   │   ├── TimelineFilters.astro
│   │   ├── EntityCard.astro
│   │   ├── SourceList.astro
│   │   └── SearchIndex.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── LoreLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── start-here.astro
│   │   ├── timeline.astro
│   │   ├── eras.astro
│   │   ├── forever-changes.astro
│   │   ├── glossary.astro
│   │   ├── sources.astro
│   │   ├── search.astro
│   │   ├── changelog.astro
│   │   ├── chapters/[slug].astro
│   │   ├── characters/{index,[slug]}.astro
│   │   ├── factions/{index,[slug]}.astro
│   │   └── locations/{index,[slug]}.astro
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   ├── components.css
│   │   └── print.css
│   └── lib/
│       ├── canonical-ids.ts
│       ├── content.ts
│       ├── routes.ts
│       ├── timeline.ts
│       ├── search.ts
│       └── status.ts
├── public/
│   ├── favicon.svg
│   └── diagrams/*.svg
├── scripts/
│   └── verify-evidence.mjs
├── docs/
│   ├── research/evidence/*.json
│   └── audits/*.md
├── tests/
│   ├── content-schema.test.ts
│   ├── chapter-content.test.ts
│   ├── evidence-ledger.test.ts
│   ├── timeline.test.ts
│   ├── search.test.ts
│   └── e2e/navigation.spec.ts
├── .github/workflows/
│   ├── validate.yml
│   ├── evidence.yml
│   └── deploy.yml
└── README.md
```

---

### Task 1: Scaffold the Astro project and validation baseline

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `src/pages/index.astro`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `.gitignore`
- Create: `README.md`

**Interfaces:**
- Produces: runnable Astro app, `npm run dev`, `npm run build`, `npm run test`, `npm run test:e2e`.

- [ ] **Step 1: Create package configuration**

Use scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "test": "vitest run",
    "test:e2e": "playwright test"
  }
}
```

Dependencies: `astro`. Dev dependencies: `typescript`, `vitest`, `@playwright/test`.

- [ ] **Step 2: Configure GitHub Pages base path**

`astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://d0riangrey.github.io',
  base: '/WOW',
  output: 'static'
});
```

- [ ] **Step 3: Add initial design tokens**

Create CSS variables for parchment, charcoal, gold, muted text, borders, status colors, spacing, typography scale, content width, and reduced-motion behavior.

- [ ] **Step 4: Add a minimal home page**

Render project title, one-line purpose, and a link to `/WOW/start-here`.

- [ ] **Step 5: Install dependencies and verify build**

Run:

```bash
npm install
npm run build
```

Expected: Astro static build succeeds with zero TypeScript errors.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "chore: scaffold Astro encyclopedia"
```

---

### Task 2: Implement the lore content model and schema validation

**Files:**
- Create: `src/content.config.ts`
- Create: `src/lib/status.ts`
- Create: `src/lib/content.ts`
- Create: `tests/content-schema.test.ts`
- Create: `src/content/sources/core.json`

**Interfaces:**
- Produces `LoreStatus` union and Astro collections: `chapters`, `characters`, `factions`, `locations`, `forever`, `timeline`, `glossary`, `sources`.
- Every content item exposes: `id`, `title`, `slug`, `status`, `era`, `summary`, `spoilerLevel`, `sourceIds`, `updatedAt`, `confidence`.

- [ ] **Step 1: Write failing schema tests**

Test that invalid lore status, missing sources on `FOREVER` content, and invalid confidence values fail validation.

- [ ] **Step 2: Run tests to verify failure**

```bash
npm test -- content-schema.test.ts
```

Expected: fail because schemas do not exist.

- [ ] **Step 3: Implement schemas**

Use `defineCollection()` with file/glob loaders and Zod-backed schemas. Status enum is exactly:

```ts
export const loreStatuses = ['ESTABLISHED', 'FOREVER', 'CHANGED', 'BETA', 'UNCONFIRMED'] as const;
```

`confidence` is `high | medium | low`.

- [ ] **Step 4: Add source records**

Each source contains `id`, `title`, `publisher`, `url`, `type`, `publishedAt?`, `notes?`.

- [ ] **Step 5: Run tests**

```bash
npm test -- content-schema.test.ts
npm run build
```

Expected: pass.

- [ ] **Step 6: Commit**

```bash
git add src/content.config.ts src/lib src/content/sources tests/content-schema.test.ts
git commit -m "feat: add typed lore content model"
```

---

### Task 3: Build the visual shell and reading controls

**Files:**
- Create: `src/components/AppShell.astro`
- Create: `src/components/LoreBadge.astro`
- Create: `src/components/ReadingModeToggle.astro`
- Create: `src/components/SpoilerBlock.astro`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/layouts/LoreLayout.astro`
- Create: `src/styles/components.css`
- Create: `src/styles/print.css`

**Interfaces:**
- `LoreBadge(status: LoreStatus)` renders status text and accessible explanation.
- Reading mode persists in `localStorage` key `wow-reading-mode` with values `essential | deep`.
- Spoiler visibility persists in `localStorage` key `wow-spoilers` with values `hidden | shown`.

- [ ] **Step 1: Implement semantic shell**

Desktop: left navigation + content column. Mobile: collapsible top navigation. Include skip-link, keyboard-visible focus, breadcrumb area, progress bar.

- [ ] **Step 2: Implement reading mode toggle**

Use a small inline script; no framework. Deep-dive sections use `[data-depth="deep"]` and respond to a root `data-reading-mode` attribute.

- [ ] **Step 3: Implement spoiler component**

Hidden state renders title and explicit reveal button. No spoiler text appears in accessible tree until revealed.

- [ ] **Step 4: Implement status badges**

`BETA` and `UNCONFIRMED` use warning copy and visually distinct patterns in addition to color.

- [ ] **Step 5: Verify responsive and reduced-motion styles**

Manual browser widths: 390, 768, 1440 px. Ensure no interaction relies only on hover.

- [ ] **Step 6: Commit**

```bash
git add src/components src/layouts src/styles
git commit -m "feat: add encyclopedia visual shell"
```

---

### Task 4: Add the first complete guided lore path from ancient Azeroth to Forever

**Files:**
- Create eight real chapter files under `src/content/chapters/`:
  - `00-azeroth-before-civilization.md`
  - `01-war-of-the-ancients.md`
  - `02-kingdoms-and-peoples.md`
  - `03-orcs-and-humans.md`
  - `04-second-war.md`
  - `05-thrall-and-new-horde.md`
  - `06-arthas-and-lordaeron.md`
  - `07-third-war-to-forever.md`
- Create: `src/pages/start-here.astro`
- Create: `src/pages/chapters/[slug].astro`
- Create: `src/components/SourceList.astro`
- Create: `src/components/ChapterNext.astro`

**Interfaces:**
- Each chapter provides `essential` narrative in the body and deep-dive sections marked with a reusable component or explicit content convention.
- Every chapter ends with `Why this matters in Forever` and `Remember these 3 things`.

- [ ] **Step 1: Research and source each chapter**

Use Blizzard/in-game/official Warcraft material first. Use secondary sources only for cross-checking. Record source IDs before writing prose.

- [ ] **Step 2: Write concise Essential narratives**

Target 5–10 minutes per chapter, short paragraphs, cause → event → consequence structure.

- [ ] **Step 3: Add Deep Dive blocks**

Add context on geography, faction motives, ambiguities, and named characters only where it improves understanding.

- [ ] **Step 4: Add Forever connection blocks**

Explicitly connect relevant history to Forsaken Kingdom, Forsaken Paladins, Skyborne, Mount Hyjal aftermath, Shen’dralas, Riverglades, and other confirmed Forever additions where sourced.

- [ ] **Step 5: Build Start Here page**

Show the eight-chapter reading path, estimated reading time, progress indicator, and clear recommendation to stay in Essential mode on first pass.

- [ ] **Step 6: Build dynamic chapter route**

Generate static paths from the chapters collection. Add previous/next navigation and source list.

- [ ] **Step 7: Validate build**

```bash
npm run build
```

Expected: all chapter pages generate successfully.

- [ ] **Step 8: Commit**

```bash
git add src/content/chapters src/pages/start-here.astro src/pages/chapters src/components/SourceList.astro src/components/ChapterNext.astro
git commit -m "feat: add guided pre-Forever lore path"
```

---

### Task 4R: Audit remediation of Tasks 1–4 (done 2026-09-17)

Audit report: `docs/audits/2026-09-17-encyclopedia-v1-audit.md`. This task records what the audit changed so later tasks build on it.

**Result:**
- Evidence ledger `docs/research/evidence/*.json` + `npm run verify:evidence` (every quote machine-checked against the live official page or PDF).
- Chapters 00–07 corrected against the ledger: War of the Ancients told from the official Well of Eternity preview, Year-1 world state added to chapter 07, missing `sourceIds` added, mixed-status paragraphs marked with `data-lore-status` blocks.
- Source schema: `type` is an enum, `url` or `citation` required (printed books allowed), optional `checkedAt`.
- Non-`ESTABLISHED` lore must cite at least one source.
- Tests: chapter sources must be backed by ledger entries; `passWithNoTests` removed; Playwright runs against `astro preview` of the real build.

---

## Gate before Task 5 (applies to Tasks 5–10)

- Every factual claim added by a task needs a ledger entry in `docs/research/evidence/` whose verbatim quote passes `npm run verify:evidence`. Research is done with Grok (web, read-only) and then machine-verified; nothing is written from memory.
- Community sites (Warcraft Wiki, Wowpedia, Wowhead, Icy Veins) may only point to an official text or back `BETA` / `UNCONFIRMED` material. They are never the source of `ESTABLISHED` or `FOREVER` claims.
- Year-1 fence: dossiers, timeline, glossary and search describe the world as of original WoW Year 1 / the Forever starting point. Anything later in Retail lives only inside a `SpoilerBlock`.
- Canonical IDs come from `src/lib/canonical-ids.ts`. A new entity gets its ID there first; timeline, dossiers and search reference only registered IDs.
- Before each task's review, run a Grok fact-check pass on the new content (web, read-only) and store its findings in `docs/audits/`.

---

### Task 5: Implement the master timeline and eras

**Files:**
- Create: `src/content/timeline/core.json`
- Modify: `src/content.config.ts` (timeline loader: `glob` → `file('src/content/timeline/core.json')`)
- Modify: `src/lib/content.ts` (timeline fields below)
- Create: `src/lib/timeline.ts`
- Create: `src/components/Timeline.astro`
- Create: `src/components/TimelineFilters.astro`
- Create: `src/pages/timeline.astro`
- Create: `src/pages/eras.astro`
- Create: `docs/research/evidence/timeline.json`
- Create: `tests/timeline.test.ts`

**Interfaces:**
- `TimelineEvent` fields: `id`, `title`, `dateLabel`, `dateNote?`, `approximate`, `sortKey`, `era`, `status`, `major`, `characterIds`, `factionIds`, `locationIds`, `chapterSlug`, `sourceIds`. Use `title` (the shared lore field), not `label`.
- `sortKey` is an ordinal for ordering only. It is never rendered and never implies a calendar year.
- `sortTimeline(events)` and `filterTimeline(events, { era, factionId, characterId, locationId, status })`.

**Dating rules (from the audit's official-source research):**
- Official texts disagree on durations (for example First War length, the gap between the Second War and Warcraft III). Show ranges or relative labels and put the disagreement in `dateNote`; never invent an absolute year.
- "Year 1" in Forever is the early period of original World of Warcraft, not the first year after the Dark Portal.
- The gap between Warcraft III and World of Warcraft is stated officially as four years; use it only as a relative anchor.

- [ ] **Step 1: Write tests for ordering and filtering**

Include approximate-date and same-era cases, plus a test that reads the real `core.json` and asserts it is non-empty, every event has evidence, and exactly one event has `id: "forever"`.

- [ ] **Step 2: Run tests to confirm failure**

```bash
npm test -- timeline.test.ts
```

- [ ] **Step 3: Research and verify dates**

Grok collects verbatim official quotes for every event and duration → add them to `docs/research/evidence/timeline.json` → `npm run verify:evidence` must pass.

- [ ] **Step 4: Add real timeline data**

Ancient Azeroth → War of the Ancients → Dark Portal → First War → Second War → Thrall/New Horde → Third War → Forsaken Kingdom → Forever `YOU ARE HERE` (`id: "forever"`, anchor `#forever` used by `AppShell`).

- [ ] **Step 5: Implement timeline UI and eras page**

Desktop: wide scrollable rail or vertical layout. Mobile: stacked cards. Filters: era, faction, character, location, status (spec §9). Approximate dates show `~` or a range with a visible explanation (not hover-only). `eras.astro` lists the spec §6 eras with their chapters and timeline ranges.

- [ ] **Step 6: Run tests, evidence and build**

```bash
npm test
npm run verify:evidence
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add src/content/timeline src/content.config.ts src/lib docs/research/evidence/timeline.json src/components/Timeline* src/pages/timeline.astro src/pages/eras.astro tests/timeline.test.ts
git commit -m "feat: add interactive master timeline and eras"
```

---

### Task 6: Add character, faction, and location dossiers

**Files:**
- Create real, evidence-backed content entries for at least:
  - Characters: Arthas, Thrall, Sylvanas, Jaina, Uther, Medivh, Gul’dan, Orgrim, Grom, Tyrande, Malfurion, Illidan, Azshara, Kel’Thuzad, Cairne Bloodhoof, Anduin Wrynn (Year-1 child king), and the Forsaken Kingdom leads Garek Bandarion and Dark Ranger Anya.
  - Factions: Alliance, Horde, Forsaken, Scourge, Burning Legion, Night Elves, Scarlet Crusade, and the Forever factions Windshapers, High Order and Al’Aketh.
  - Locations: Azeroth, Lordaeron, Stormwind, Kalimdor, Northrend (background only in Year 1), Mount Hyjal, Undercity, Tirisfal Glades, Durotar, Quel’Thalas, Teldrassil, and the Forever places Zephras Isle, Shen’dralas, Riverglades, Bandarion Keep.
- Modify: `src/lib/content.ts` and `src/content.config.ts` (dossier fields: `aliases`, `relatedCharacterIds`, `relatedFactionIds`, `relatedLocationIds`)
- Modify: `src/lib/canonical-ids.ts` (only if the roster grows)
- Create: `src/components/EntityCard.astro`
- Create: `src/pages/characters/index.astro`, `src/pages/characters/[slug].astro`
- Create: `src/pages/factions/index.astro`, `src/pages/factions/[slug].astro`
- Create: `src/pages/locations/index.astro`, `src/pages/locations/[slug].astro`
- Create: `docs/research/evidence/dossiers.json`
- Create: `public/diagrams/arthas-path.svg`
- Create: `public/diagrams/faction-relations.svg`

**Interfaces:**
- Entity pages cross-link via canonical IDs; build fails on an unknown reference (`assertValidContentReferences` over all populated collections).
- Location pages include `What happened here`, `Who controls it now`, `What you may encounter in Forever`.
- Names without published lore (for example Forever factions announced only by name) get a short, clearly scoped entry, not an invented history.

- [ ] **Step 1: Research and verify**

Grok evidence pass per entity → `docs/research/evidence/dossiers.json` → `npm run verify:evidence`.

- [ ] **Step 2: Add sourced character content**

Identity, affiliations, source-backed motivations, personal timeline, related locations, Forever relevance. Post-Year-1 Retail fates only inside `SpoilerBlock`.

- [ ] **Step 3: Add faction content**

Describe goals and conflicts neutrally; avoid simplistic good/evil labeling.

- [ ] **Step 4: Add location content**

Prioritize player-facing geography and consequences of past events. Where official recaps describe a place differently (Shen’dralas: "south of Desolace through the Valley of Bones" vs "between Mulgore and Desolace"), show both.

- [ ] **Step 5: Add original SVG explanatory diagrams**

One diagram traces Arthas from Lordaeron to Northrend and back. One shows major faction relationships at the Forever starting point. Text alternatives in surrounding copy.

- [ ] **Step 6: Optional illustrations (only with explicit user approval)**

Portraits or hero images may be generated through Codex built-in `image_gen` (see `CLAUDE.md`). Each image is labeled as an original illustration, never presented as Blizzard art, stored under `public/images/` with source metadata, lazy-loaded and given meaningful alt text.

- [ ] **Step 7: Implement index pages, dynamic routes and cross-links**

- [ ] **Step 8: Test, verify evidence, build**

```bash
npm test
npm run verify:evidence
npm run build
```

- [ ] **Step 9: Commit**

```bash
git add src/content/characters src/content/factions src/content/locations src/lib src/content.config.ts src/pages/characters src/pages/factions src/pages/locations src/components/EntityCard.astro public/diagrams docs/research/evidence/dossiers.json
git commit -m "feat: add lore dossiers and diagrams"
```

**Decided (2026-09-17):** Retail spoilers reveal per block. A `SpoilerBlock` button opens only that block for the current page view; the toolbar switch is the only site-wide, persisted opt-in. Dossiers rely on this behavior.

---

### Task 7: Build the Forever Changes experience and changelog

**Files:**
- Modify: `src/lib/content.ts` and `src/content.config.ts` (`foreverEntrySchema` = lore fields + `oldExpectation`, `foreverVersion`, `whyItMatters`)
- Create `src/content/forever/`: `time-bubble-year-1.md`, `forsaken-kingdom.md`, `forsaken-paladins.md`, `skyborne.md`, `zephras-isle.md`, `mount-hyjal-aftermath.md`, `shendralas.md`, `riverglades.md`, `race-class-combinations.md`, `dungeons-and-raids.md`
- Create: `src/content/changelog/entries.json` + `changelog` collection (`file` loader)
- Create: `src/pages/forever-changes.astro`
- Create: `src/pages/changelog.astro`
- Create: `src/components/ForeverComparison.astro`
- Create: `docs/research/evidence/forever.json`

**Interfaces:**
- Each Forever change entry stores: `oldExpectation`, `foreverVersion`, `whyItMatters`, `status`, `sourceIds`, `updatedAt`.
- Changelog entries: `date`, `version`, `summary`, `entityIds`, `sourceIds`; each links to affected entities (spec §18).

**Content rules:**
- Announced ≠ observed. Blizzard recaps prove announced content, not quest outcomes. Beta observations are `BETA`; datamining and community reconstructions (for example a dated Skyborne chronology) are `UNCONFIRMED` and stay out of the comparison table.
- Product dates are facts with sources: beta began 17 September 2026, launch 4 November 2026, new raids unlock 9 December 2026. The announcement article gives the launch time once as PDT and once as PST — do not present a single time zone as settled.
- Official recaps name nine new dungeons and two raids (Hyjal Summit, 20 players; Barrow Deeps, 10 players); describe only what is published.

- [ ] **Step 1: Research and verify** (Grok evidence pass → `docs/research/evidence/forever.json` → `npm run verify:evidence`)
- [ ] **Step 2: Add only confirmed or clearly beta-labeled Forever entries**
- [ ] **Step 3: Implement comparison layout** (desktop side-by-side, mobile stacked; `CHANGED` explains the divergence)
- [ ] **Step 4: Add changelog collection and page** (seed with the V1 entry and the audit remediation entry)
- [ ] **Step 5: Test, verify evidence, build**

```bash
npm test
npm run verify:evidence
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/content/forever src/content/changelog src/lib src/content.config.ts src/pages/forever-changes.astro src/pages/changelog.astro src/components/ForeverComparison.astro docs/research/evidence/forever.json
git commit -m "feat: add Forever-specific lore comparison and changelog"
```

---

### Task 8: Add glossary, source explorer, and search

**Files:**
- Create: `src/content/glossary/core.json`
- Modify: `src/content.config.ts` (glossary loader: `glob` → `file('src/content/glossary/core.json')`)
- Create: `src/lib/search.ts`
- Create: `src/components/SearchIndex.astro`
- Create: `src/pages/search.astro`
- Create: `src/pages/glossary.astro`
- Create: `src/pages/sources.astro`
- Create: `tests/search.test.ts`

**Interfaces:**
- Search document shape: `{ id, type, title, summary, href, status, keywords }`.
- Search is generated at build time and filtered client-side without an external service. Decision: custom index, not Pagefind — the contract is structured (type/status/aliases) and the corpus is small.

- [ ] **Step 1: Write search tests**

Exact name, alias, glossary keyword, status filtering, Russian word forms (Орда / Орды / Орде), and a spoiler test: nothing from `SpoilerBlock` content or post-Year-1 material appears in the index.

- [ ] **Step 2: Implement index builder**

Normalize lowercase Unicode; include original English names, Russian explanatory terms and common Russian inflections in `keywords`.

- [ ] **Step 3: Add glossary**

Initial terms: Azeroth, Old Gods, Titans, Well of Eternity, Burning Legion, Scourge, Horde, Alliance, Forsaken, Dark Portal, Third War, time bubble, Retcon, Beta canon. Lore terms need evidence entries.

- [ ] **Step 4: Add source explorer**

Group sources by `type`, show `checkedAt`, which entries cite each source, and how many ledger quotes back it.

- [ ] **Step 5: Run tests/build**

```bash
npm test
npm run verify:evidence
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/content/glossary src/content.config.ts src/lib/search.ts src/components/SearchIndex.astro src/pages/search.astro src/pages/glossary.astro src/pages/sources.astro tests/search.test.ts
git commit -m "feat: add search glossary and source explorer"
```

---

### Task 9: E2E coverage, CI validation, and gated GitHub Pages deployment

**Files:**
- Create: `tests/e2e/navigation.spec.ts`
- Create: `.github/workflows/validate.yml`
- Create: `.github/workflows/deploy.yml`
- Create: `.github/workflows/evidence.yml`
- Modify: `package.json` (`engines.node: ">=22.12.0"`), create `.nvmrc` (`24`)

**Interfaces:**
- Validation (PRs and pushes): `npm ci`, `npm test`, `npm run build`, Playwright Chromium, `npm run test:e2e` against `astro preview` of the build.
- Deployment is **manual**: `workflow_dispatch` only, job `environment: github-pages` with required reviewers. No deploy on push to `main` until the user explicitly changes that.
- Evidence check: `npm run verify:evidence` on a weekly schedule and on demand (network-dependent, so not a PR gate). A failure means a source page changed or died — review, do not auto-edit.

**Versions (checked 2026-09-17 against Astro's GitHub Pages guide; re-check at implementation):** `actions/checkout@v7`, `withastro/action@v6` (defaults to Node 24; `@v3` defaults to Node 20 and cannot build Astro 7), `actions/deploy-pages@v5`. Keep TypeScript on `^6`: `@astrojs/check` supports TypeScript 5–6 only.

- [ ] **Step 1: Write Playwright smoke tests**

Cover: Home → Start Here; Essential/Deep toggle persistence; spoiler reveal; timeline with `#forever`; Forever Changes; mobile navigation at 390 px; **every navigation link returns 200** on the preview build; `page.goto` always includes the `/WOW` base.

- [ ] **Step 2: Run E2E locally**

```bash
npx playwright install chromium
npm run test:e2e
```

- [ ] **Step 3: Add validation, evidence and deployment workflows** (versions above; Settings → Pages → Source: GitHub Actions is a manual user step)
- [ ] **Step 4: Close deferred Minor findings**: empty-state progress semantics (`max=1` with 0/0), `ChapterNext` one-way `aria-pressed` (undo or disabled completed state), `NO_COLOR`/`FORCE_COLOR` warnings, visible focus after the skip link.
- [ ] **Step 5: Commit**

```bash
git add tests/e2e .github/workflows package.json .nvmrc
git commit -m "ci: validate and gate encyclopedia deployment"
```

---

### Task 10: Wire the future lore-monitoring automation to the content architecture

**Files:**
- Create: `docs/automation/lore-update-contract.md`
- Create: `src/content/update-log/entries.json` + `updateLog` collection (own schema; never inside `src/content/forever/`)

**Interfaces:**
- Automation may change lore only with source IDs, a valid status and ledger entries that pass `npm run verify:evidence`.
- Automation works on a branch and opens a pull request. It never pushes to `main` and never deploys.
- A human approves every `FOREVER`, `CHANGED` or `BETA` change.
- Contradictions never overwrite `ESTABLISHED` content silently: they create a `CHANGED` entry (with `supersedes`) or stay `BETA`/`UNCONFIRMED`.
- Every meaningful change appends a changelog entry and an update-log record.

- [ ] **Step 1: Document the update contract**

Require automation to:
1. discover new Forever information (official Blizzard news, blue posts, in-game text; community sites only as leads);
2. research with Grok (web, read-only) and extract verbatim quotes;
3. add ledger entries and run `npm run verify:evidence`;
4. compare with repository content and classify status;
5. edit the minimum affected content files;
6. append changelog and update-log records;
7. run `npm test` and `npm run build`;
8. commit with `lore:` prefix on a branch and open a PR;
9. notify only if the change is meaningful.

- [ ] **Step 2: Add machine-readable update log**

Each record contains `date`, `entityIds`, `status`, `summary`, `sourceIds`, `supersedes?`, `commitSha?`.

- [ ] **Step 3: Validate**

```bash
npm test
npm run verify:evidence
npm run build
npm run test:e2e
```

- [ ] **Step 4: Commit**

```bash
git add docs/automation src/content/update-log src/content.config.ts src/lib
git commit -m "docs: define automated lore update contract"
```

---

## Final verification

Run:

```bash
npm ci
npm test
npm run verify:evidence
npm run build
npm run test:e2e
```

Verify manually:
- navigation works at 390 px and 1440 px, and no navigation link 404s;
- all `FOREVER`, `CHANGED`, `BETA`, `UNCONFIRMED` badges are distinct without relying only on color;
- every chapter, dossier, timeline event and Forever entry is backed by verified ledger quotes;
- a final Grok fact-check pass over all content reports no unsupported claims, and its report is stored in `docs/audits/`;
- no post-Year-1 Retail spoiler is visible by default, including in search results;
- `/WOW` base path works in all internal links and assets on the preview build;
- changelog contains the V1 entry;
- generated site contains no empty placeholder sections.

Then open a pull request from `feat/encyclopedia-v1` to `main` with a summary of architecture, content scope, tests, and deployment notes. Merging and deploying require explicit user approval.
