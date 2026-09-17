# WoW Forever Encyclopedia V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first production-ready version of a premium, interactive Russian-language lore encyclopedia tailored to World of Warcraft: Forever, with structured lore content, timeline, entity pages, Forever-specific comparison views, source transparency, spoiler controls, tests, and GitHub Pages deployment.

**Architecture:** Astro + TypeScript static-first site. Lore lives in validated content collections and structured data, separated from UI so future automation can safely update facts without rewriting presentation code. Interactivity is limited to client-side islands for reading mode, spoiler visibility, timeline filters, and search.

**Tech Stack:** Astro, TypeScript, Astro Content Collections, plain CSS with design tokens, Vitest, Playwright, GitHub Actions, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-17-wow-forever-encyclopedia-design.md`

## Global Constraints

- Main prose is Russian; canonical Warcraft names stay in original English.
- Every lore item uses one status: `ESTABLISHED | FOREVER | CHANGED | BETA | UNCONFIRMED`.
- `BETA` and `UNCONFIRMED` must never look like established canon.
- Post-Forever Retail spoilers are hidden by default.
- V1 contains real lore content, not placeholder cards.
- Use primary Blizzard/in-game sources for Forever-sensitive claims where available.
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
│   │   ├── forever-changes.astro
│   │   ├── glossary.astro
│   │   ├── sources.astro
│   │   ├── changelog.astro
│   │   ├── chapters/[slug].astro
│   │   ├── characters/[slug].astro
│   │   ├── factions/[slug].astro
│   │   └── locations/[slug].astro
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── global.css
│   │   ├── components.css
│   │   └── print.css
│   └── lib/
│       ├── content.ts
│       ├── routes.ts
│       ├── timeline.ts
│       ├── search.ts
│       └── status.ts
├── public/
│   ├── favicon.svg
│   └── diagrams/*.svg
├── tests/
│   ├── content-schema.test.ts
│   ├── timeline.test.ts
│   ├── search.test.ts
│   └── e2e/navigation.spec.ts
├── .github/workflows/
│   ├── validate.yml
│   └── deploy.yml
├── CHANGELOG.md
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

### Task 5: Implement the master timeline

**Files:**
- Create: `src/content/timeline/core.json`
- Create: `src/lib/timeline.ts`
- Create: `src/components/Timeline.astro`
- Create: `src/components/TimelineFilters.astro`
- Create: `src/pages/timeline.astro`
- Create: `tests/timeline.test.ts`

**Interfaces:**
- `TimelineEvent` fields: `id`, `label`, `dateLabel`, `sortKey`, `era`, `status`, `major`, `characterIds`, `factionIds`, `locationIds`, `chapterSlug`, `sourceIds`.
- `sortTimeline(events)` sorts by `sortKey` without inventing numeric precision for approximate dates.

- [ ] **Step 1: Write tests for ordering and filtering**

Include approximate-date and same-era cases.

- [ ] **Step 2: Run tests to confirm failure**

```bash
npm test -- timeline.test.ts
```

- [ ] **Step 3: Add real timeline data**

Include Ancient Azeroth → War of the Ancients → Dark Portal → First War → Second War → Thrall/New Horde → Third War → Forsaken Kingdom → Forever `YOU ARE HERE`.

- [ ] **Step 4: Implement timeline UI**

Desktop uses wide scrollable rail or vertical chronological layout depending viewport. Mobile uses stacked cards. Filters: era, faction, status.

- [ ] **Step 5: Add uncertainty treatment**

Approximate dates show `~` or a descriptive range and an explanation icon; no fabricated year.

- [ ] **Step 6: Run tests and build**

```bash
npm test -- timeline.test.ts
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add src/content/timeline src/lib/timeline.ts src/components/Timeline* src/pages/timeline.astro tests/timeline.test.ts
git commit -m "feat: add interactive master timeline"
```

---

### Task 6: Add character, faction, and location dossiers

**Files:**
- Create real content entries for at least:
  - Characters: Arthas, Thrall, Sylvanas, Jaina, Uther, Medivh, Gul’dan, Orgrim, Grom, Tyrande, Malfurion, Illidan, Azshara.
  - Factions: Alliance, Horde, Forsaken, Scourge, Burning Legion, Night Elves.
  - Locations: Azeroth, Lordaeron, Stormwind, Kalimdor, Northrend, Mount Hyjal, Undercity, Tirisfal Glades, Durotar, Quel’Thalas.
- Create: `src/components/EntityCard.astro`
- Create: `src/pages/characters/[slug].astro`
- Create: `src/pages/factions/[slug].astro`
- Create: `src/pages/locations/[slug].astro`
- Create: `public/diagrams/arthas-path.svg`
- Create: `public/diagrams/faction-relations.svg`

**Interfaces:**
- Entity pages cross-link via canonical IDs.
- Location pages include `What happened here`, `Who controls it now`, `What you may encounter in Forever`.

- [ ] **Step 1: Add sourced character content**

Each page includes identity, affiliations, motivations from source-backed facts, personal timeline, related locations, and Forever relevance.

- [ ] **Step 2: Add faction content**

Describe goals and conflicts neutrally; avoid simplistic good/evil labeling.

- [ ] **Step 3: Add location content**

Prioritize player-facing geography and consequences of past events.

- [ ] **Step 4: Add original SVG explanatory diagrams**

One diagram traces Arthas from Lordaeron to Northrend and back. One diagram shows major faction relationships at the Forever starting point. SVG must include text alternatives in surrounding page copy.

- [ ] **Step 5: Implement dynamic routes and cross-links**

Generate static paths from collections and render related entities as cards.

- [ ] **Step 6: Build**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add src/content/characters src/content/factions src/content/locations src/pages/characters src/pages/factions src/pages/locations src/components/EntityCard.astro public/diagrams
git commit -m "feat: add lore dossiers and diagrams"
```

---

### Task 7: Build the Forever Changes experience

**Files:**
- Create: `src/content/forever/forsaken-kingdom.md`
- Create: `src/content/forever/forsaken-paladins.md`
- Create: `src/content/forever/skyborne.md`
- Create: `src/content/forever/mount-hyjal-aftermath.md`
- Create: `src/content/forever/shendralas.md`
- Create: `src/content/forever/riverglades.md`
- Create: `src/pages/forever-changes.astro`
- Create: `src/components/ForeverComparison.astro`
- Create: `CHANGELOG.md`

**Interfaces:**
- Each Forever change entry stores: `oldExpectation`, `foreverVersion`, `whyItMatters`, `status`, `sourceIds`, `updatedAt`.

- [ ] **Step 1: Add only confirmed or clearly beta-labeled Forever entries**

Every sensitive claim must have source IDs. Unconfirmed material is excluded from the primary comparison table.

- [ ] **Step 2: Implement comparison layout**

Desktop: side-by-side `Classic/Older expectation` vs `Forever`. Mobile: stacked cards. `CHANGED` items explicitly explain the divergence.

- [ ] **Step 3: Add human-readable changelog**

Seed with V1 creation entry and a section describing how future automated lore updates will be recorded.

- [ ] **Step 4: Build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/content/forever src/pages/forever-changes.astro src/components/ForeverComparison.astro CHANGELOG.md
git commit -m "feat: add Forever-specific lore comparison"
```

---

### Task 8: Add glossary, source explorer, and client-side search

**Files:**
- Create: `src/content/glossary/core.json`
- Create: `src/lib/search.ts`
- Create: `src/components/SearchIndex.astro`
- Create: `src/pages/glossary.astro`
- Create: `src/pages/sources.astro`
- Create: `tests/search.test.ts`

**Interfaces:**
- Search document shape: `{ id, type, title, summary, href, status, keywords }`.
- Search is generated at build time and filtered client-side without external service.

- [ ] **Step 1: Write search tests**

Test exact name, alias, glossary keyword, and status filtering.

- [ ] **Step 2: Implement index builder**

Normalize lowercase Unicode strings and include original names plus common Russian explanatory terms.

- [ ] **Step 3: Add glossary**

Initial terms: Azeroth, Old Gods, Titans, Well of Eternity, Burning Legion, Scourge, Horde, Alliance, Forsaken, Dark Portal, Third War, Retcon, Beta canon.

- [ ] **Step 4: Add source explorer**

Group sources by publisher/type and show which encyclopedia entries cite each source.

- [ ] **Step 5: Run tests/build**

```bash
npm test -- search.test.ts
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/content/glossary src/lib/search.ts src/components/SearchIndex.astro src/pages/glossary.astro src/pages/sources.astro tests/search.test.ts
git commit -m "feat: add search glossary and source explorer"
```

---

### Task 9: Add E2E coverage, CI validation, and GitHub Pages deployment

**Files:**
- Create: `tests/e2e/navigation.spec.ts`
- Create: `.github/workflows/validate.yml`
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- PR/push validation runs `npm ci`, unit tests, Astro build.
- Deploy runs from `main` after successful build and publishes Pages artifact.

- [ ] **Step 1: Write Playwright smoke tests**

Cover:
- Home → Start Here navigation.
- Essential/Deep Dive toggle persistence.
- Spoiler reveal behavior.
- Timeline page rendering.
- Forever Changes page rendering.
- Mobile navigation at 390 px.

- [ ] **Step 2: Run E2E locally**

```bash
npx playwright install --with-deps chromium
npm run build
npm run test:e2e
```

Expected: all smoke tests pass.

- [ ] **Step 3: Add validation workflow**

Trigger on pull requests and pushes. Run unit tests and `npm run build`.

- [ ] **Step 4: Add Pages deployment workflow**

Use `actions/checkout@v4`, `withastro/action@v3`, `actions/deploy-pages@v4`. Permissions: `contents: read`, `pages: write`, `id-token: write`.

- [ ] **Step 5: Commit**

```bash
git add tests/e2e .github/workflows
git commit -m "ci: validate and deploy encyclopedia"
```

---

### Task 10: Wire the future lore-monitoring automation to the content architecture

**Files:**
- Create: `docs/automation/lore-update-contract.md`
- Create: `src/content/forever/update-log.json`

**Interfaces:**
- Future automation may modify lore content only when it can provide source IDs and a valid status.
- Contradictions never overwrite established content silently; they create a `CHANGED` entry or remain `BETA/UNCONFIRMED`.
- Every meaningful automated change appends a changelog entry and update-log record.

- [ ] **Step 1: Document the update contract**

Require automation to:
1. discover new Forever information;
2. validate source quality;
3. compare with repository content;
4. classify status;
5. edit the minimum affected content files;
6. append changelog/update-log;
7. run content validation/build;
8. commit with `lore:` prefix;
9. notify only if the change is meaningful.

- [ ] **Step 2: Add machine-readable update log**

Each record contains `date`, `entityIds`, `status`, `summary`, `sourceIds`, `commitSha?`.

- [ ] **Step 3: Validate build**

```bash
npm test
npm run build
npm run test:e2e
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add docs/automation src/content/forever/update-log.json
git commit -m "docs: define automated lore update contract"
```

---

## Final verification

Run:

```bash
npm ci
npm test
npm run build
npm run test:e2e
```

Verify manually:
- navigation works at 390 px and 1440 px;
- all `FOREVER`, `CHANGED`, `BETA`, `UNCONFIRMED` badges are distinct without relying only on color;
- all chapter pages have sources;
- all Forever-sensitive claims have primary or clearly qualified secondary sourcing;
- no post-Forever Retail spoiler is visible by default;
- `/WOW` base path works in all internal links and assets;
- changelog contains V1 entry;
- generated site contains no empty placeholder sections.

Then open a pull request from `feat/encyclopedia-v1` to `main` with a summary of architecture, content scope, tests, and deployment notes.
