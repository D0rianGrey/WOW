# World of Warcraft: Forever Encyclopedia — Design Specification

## 1. Goal

Build a premium, interactive Russian-language lore encyclopedia tailored specifically to **World of Warcraft: Forever**. The product should help a player enter Forever understanding what happened before the game, why locations/factions/characters matter, what lore is new or changed in Forever, and how newly revealed beta/release lore connects back to established Warcraft history.

The encyclopedia is not a generic Warcraft wiki. It is a guided, visual, spoiler-aware reading experience optimized for a player who wants to learn from the beginning without being overwhelmed.

## 2. Product principles

1. **Forever-first context** — every chapter answers “why does this matter in WoW Forever?”
2. **Progressive disclosure** — simple first, depth on demand.
3. **Visual storytelling** — maps, timelines, character cards, relationship diagrams, event flows and atmospheric art should carry meaning, not decorate pages.
4. **Canon transparency** — clearly distinguish established history, Forever additions, retcons/changes, beta-only findings and speculation.
5. **Spoiler discipline** — post-Forever Retail outcomes stay hidden unless explicitly requested or genuinely necessary.
6. **Source-backed lore** — no fan theory presented as fact.
7. **Living encyclopedia** — the lore layer is designed to be updated as Forever beta and post-release information appears.

## 3. Audience and language

Primary reader: Eugene, playing World of Warcraft: Forever from launch/beta and wanting to understand the story from the beginning.

Language:
- Main prose: Russian.
- Canon names, factions, classes, locations, abilities and expansions: original English forms retained prominently.
- Russian explanatory translations may be shown in secondary text where useful.

Tone:
- cinematic, readable, energetic;
- detailed but never encyclopedic-for-its-own-sake;
- short paragraphs, visual breaks, clear causal links.

## 4. Reading modes

### Essential
Shows only what is required to understand Forever:
- event summary;
- causes;
- consequences;
- key people;
- Forever connection.

Target reading time per chapter: 5–10 minutes.

### Deep Dive
Expandable sections containing:
- additional history;
- political/faction context;
- character motivations supported by canon sources;
- geography;
- side conflicts;
- ambiguity or canon changes;
- source notes.

The reader can stay in Essential mode for the entire pre-game journey.

## 5. Core navigation

Primary left navigation:
- Home
- Start Here
- Timeline
- Eras
- Characters
- Factions
- Locations
- Forever Changes
- Glossary
- Sources
- Changelog

Persistent utilities:
- Essential / Deep Dive toggle
- spoiler visibility toggle
- search
- reading progress
- “You are here” marker on the master timeline

## 6. Story structure

### Prologue — Azeroth before the familiar world
- Azeroth
- elemental chaos
- Old Gods
- Black Empire
- Titans / titan-forged
- Well of Eternity

### Era I — Ancient Azeroth
- Night Elves
- Queen Azshara
- Highborne
- Burning Legion
- War of the Ancients
- Great Sundering

### Era II — The familiar peoples and kingdoms emerge
- High Elves
- Troll empires
- Humans
- Dwarves and Gnomes
- Quel’Thalas
- Lordaeron
- Stormwind

### Era III — Orcs & Humans
- Draenor before corruption
- clans
- Gul’dan
- demonic corruption
- Medivh
- Dark Portal
- First War
- fall of Stormwind

### Era IV — Alliance and Horde
- Second War
- Orgrim Doomhammer
- Alliance of Lordaeron
- Horde defeat
- internment camps
- destruction of Draenor

### Era V — The New Horde
- Thrall
- liberation of the orcs
- return to shamanism
- Kalimdor
- Durotar
- Tauren
- Darkspear Trolls

### Era VI — Arthas and the fall of Lordaeron
- Plague of Undeath
- Andorhal
- Stratholme
- Northrend
- Frostmourne
- Death Knight Arthas
- fall of Lordaeron
- Sylvanas
- Scourge

### Era VII — Third War
- Burning Legion returns
- Jaina
- Thrall
- Night Elves
- Archimonde
- Battle of Mount Hyjal

### Era VIII — The bridge into Forever
- Frozen Throne aftermath where relevant
- Sylvanas breaks free
- Forsaken
- Undercity
- Forsaken Kingdom campaign
- formation of the world state immediately before Forever

### Era IX — World of Warcraft: Forever
A dedicated entry state rather than a future history dump:
- Alliance status
- Horde status
- Forsaken status
- Night Elf status
- active conflicts
- new Forever regions
- new Forever factions
- new Forever races/classes/lore additions
- “What you are about to encounter” overview

Future developments after Forever launch appear only as the Forever timeline expands.

## 7. Canon/status model

Every lore item can carry one status:

### ESTABLISHED
Historical Warcraft lore that remains part of Forever’s background.

### FOREVER
Confirmed new lore introduced specifically for World of Warcraft: Forever or its direct bridge content.

### CHANGED
A documented retcon, reinterpretation or meaningful divergence from older WoW continuity.

### BETA
Observed or announced in beta but not treated as durable canon yet.

### UNCONFIRMED
Datamining, rumor, player interpretation or other non-confirmed material. Hidden by default from the main narrative and shown only in clearly isolated notes.

The UI must never style BETA or UNCONFIRMED material like established fact.

## 8. Forever-specific requirements

The encyclopedia must explicitly cover and track:
- Forever’s separate/time-bubble continuity where confirmed by Blizzard;
- Forsaken Kingdom as a narrative bridge;
- Forsaken Paladin lore;
- Skyborne / shen’dorei lore;
- Mount Hyjal aftermath content;
- Shen’dralas region/story connections;
- Riverglades and other new regions;
- new dungeons/raids where they add lore;
- new or altered quests that change historical context;
- any canon-sensitive additions revealed during beta or after release.

A dedicated **Forever Changes** view compares:
- Classic/older WoW expectation;
- Forever version;
- what changed;
- why it matters;
- source and confidence status.

## 9. Timeline design

The master timeline is a primary feature.

Features:
- horizontally or vertically scrollable depending on viewport;
- era bands;
- major and minor event tiers;
- filters by faction/location/character/status;
- “You are here: Forever” anchor;
- click event → detail drawer/page;
- uncertainty marker for disputed/approximate dates;
- connections to location and character pages.

Timeline dates must avoid false precision. If canonical sources disagree, display approximate ranges or a note rather than manufacturing certainty.

## 10. Character pages

Each important character page contains:
- portrait/hero art;
- one-sentence identity;
- faction(s);
- race/class/title where applicable;
- motivations described neutrally from sources;
- personal timeline;
- relationship graph;
- locations connected to them;
- “why this person matters in Forever”;
- spoiler-controlled post-Forever section if ever included.

Key early characters include:
- Arthas Menethil
- Thrall
- Sylvanas Windrunner
- Jaina Proudmoore
- Uther the Lightbringer
- Medivh
- Gul’dan
- Orgrim Doomhammer
- Grom Hellscream
- Tyrande Whisperwind
- Malfurion Stormrage
- Illidan Stormrage
- Queen Azshara

The roster grows as the reader progresses.

## 11. Faction pages

Faction pages show:
- origin;
- worldview/goals stated descriptively;
- leadership;
- allies/enemies;
- territory;
- key events;
- internal conflicts;
- Forever status;
- related characters and locations.

Initial faction set:
- Alliance
- Horde
- Forsaken
- Scourge
- Burning Legion
- Night Elves
- Argent/Scarlet-related factions where relevant
- new Forever factions as confirmed.

## 12. Location pages and maps

Each major location page should answer:
- where it is;
- what happened there;
- who controls it now;
- why it matters;
- what the player will see there in Forever.

Maps should be informational, not ornamental.

Map layers can show:
- political control;
- historical events;
- character routes;
- war fronts;
- before/after state;
- Forever-only additions.

## 13. Visual system

Art direction:
- dark Warcraft chronicle;
- parchment, aged paper, carved stone and subtle metal accents;
- restrained gold highlights;
- deep charcoal/navy background;
- faction accent colors used sparingly;
- large cinematic hero images;
- readable typography prioritized over imitation of in-game UI.

Visual assets must serve one of these functions:
- establish geography;
- identify a character/faction;
- explain chronology;
- explain relationships;
- show a before/after transformation;
- create atmosphere at chapter openings.

Avoid cluttered fantasy decoration that reduces readability.

## 14. Image policy

Use only images that can be responsibly included in the project.

Preferred sources:
- officially published Blizzard promotional/media assets when reuse is appropriate;
- user-approved generated illustrations designed as original visualizations;
- original diagrams, maps and timelines created for the encyclopedia.

Every externally sourced image must retain source metadata in the content layer.

Generated imagery must not pretend to be official Blizzard art.

## 15. Content/data architecture

The presentation layer and lore data must be separated so that automated updates can change content without rewriting page code.

Suggested content model:

```text
content/
  chapters/
  characters/
  factions/
  locations/
  timeline/
  forever/
  glossary/
  sources/
```

Each item stores structured metadata such as:
- id
- title
- slug
- status
- era
- summary
- essential text
- deep-dive blocks
- related entities
- spoiler level
- source references
- updated date
- confidence

## 16. Source hierarchy

Priority:
1. Blizzard official World of Warcraft / Warcraft publications and developer communications.
2. In-game text or official game materials.
3. Official Warcraft books/manuals/Chronicle where relevant and not superseded.
4. Warcraft Wiki / Wowhead or similar secondary references for discovery/cross-checking, not as sole authority for major canon claims when primary sources exist.
5. Community reports/datamining only as BETA or UNCONFIRMED until independently validated.

Every Forever-sensitive claim should have a source entry.

## 17. Automated update workflow

The monitoring automation should continue during beta and after release.

Pipeline:

```text
new Blizzard / reliable Forever information
        ↓
relevance filter
        ↓
source validation
        ↓
compare against encyclopedia data
        ↓
classify as ESTABLISHED / FOREVER / CHANGED / BETA / UNCONFIRMED
        ↓
update structured lore content
        ↓
append changelog entry
        ↓
commit to GitHub
        ↓
site rebuild/deploy
        ↓
short notification describing meaningful changes
```

Guardrails:
- no auto-promotion of rumor to canon;
- no silent overwrite of contradicting lore;
- contradictions create a CHANGED or review note;
- preserve source history;
- all updates remain visible in git history;
- only meaningful lore changes trigger user notifications.

## 18. Changelog

The site has a human-readable changelog with entries such as:

```text
2026-09-18 — v0.2
+ Added confirmed Forsaken Paladin history
+ Linked Bandarion Keep to Tirisfal timeline
~ Updated Forever continuity note from Blizzard developer post
```

Each change can link to the affected encyclopedia entity.

## 19. Search and discovery

Search across:
- characters;
- factions;
- places;
- events;
- glossary terms;
- Forever additions.

Search results show entity type and lore status.

Cross-links should make the encyclopedia feel explorable without forcing the reader to leave the guided path.

## 20. Responsive experience

Desktop:
- persistent navigation;
- wide timeline/maps;
- side-by-side comparison layouts.

Mobile:
- collapsible navigation;
- stacked content;
- touch-friendly timeline cards;
- image-first chapter openings without excessive vertical chrome.

No feature may require hover to be understood.

## 21. Accessibility and usability

- semantic HTML;
- keyboard navigation;
- sufficient contrast;
- meaningful alt text;
- prefers-reduced-motion support;
- no autoplay audio/video;
- readable body width;
- motion used only to explain transitions/state.

## 22. Performance

Target a static-first architecture suitable for GitHub Pages or another static host.

Requirements:
- lazy-load heavy images;
- responsive image sizes;
- minimal client JavaScript;
- no database required for v1;
- content stored in version-controlled files;
- fast first content paint on desktop and mobile.

## 23. Recommended implementation approach

Preferred stack:
- Astro + TypeScript;
- content collections or validated structured content;
- minimal client-side islands for timeline/search/filter interactions;
- plain CSS or scoped component styles with design tokens;
- Vitest for utility/content validation tests;
- Playwright for critical navigation and responsive smoke tests;
- GitHub Actions for validation/build/deploy.

Reasons:
- excellent static performance;
- content-first architecture;
- low runtime complexity;
- easy GitHub Pages deployment;
- TypeScript validation for automated content updates;
- interactive components without turning the entire encyclopedia into a heavy SPA.

## 24. Version 1 scope

V1 is “Before You Enter Azeroth”. It should be useful before the player creates or seriously levels a character in Forever.

V1 includes:
- home/start page;
- master timeline;
- Essential / Deep Dive reading mode;
- spoiler controls;
- first guided lore path from ancient Azeroth to Forever;
- core character pages;
- core faction pages;
- core location pages;
- Forever Changes page;
- glossary;
- sources page;
- changelog;
- responsive UI;
- automated content validation/build/deploy foundation.

V1 should contain real lore content, not empty placeholder cards.

## 25. Deferred scope

Not required for first release:
- user accounts;
- comments;
- community editing;
- server-side database;
- achievements/gamification;
- full Retail WoW history after Forever;
- every minor NPC/location in Warcraft history.

These may be added only if they materially improve the reading experience later.

## 26. Success criteria

The encyclopedia succeeds when:
- a new Forever player can understand the state of the world without prior Warcraft knowledge;
- the reader can finish the Essential path without feeling overloaded;
- every major pre-Forever event explains its impact on Forever;
- new Forever lore can be added without rewriting the UI;
- beta speculation is visually and structurally separated from canon;
- important lore changes are source-backed and visible in the changelog;
- the site feels closer to a premium interactive lore book than to a conventional wiki.
