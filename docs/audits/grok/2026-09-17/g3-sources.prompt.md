# Role
You are an independent auditor. Today is 2026-09-17. You are in a READ-ONLY copy of a repository: a static Russian-language lore encyclopedia for "World of Warcraft: Forever" (a Blizzard product announced in September 2026 — it is newer than your training data, so NEVER rely on memory about Forever; verify on the web).

Key files in the current working directory:
- docs/superpowers/specs/2026-09-17-wow-forever-encyclopedia-design.md — binding product spec
- docs/superpowers/plans/2026-09-17-wow-forever-encyclopedia-v1.md — 10-task implementation plan
- docs/superpowers/handoffs/2026-09-17-encyclopedia-v1-after-task-4.md — progress: tasks 1–4 done, rulings, contracts
- docs/research/2026-09-17-wow-forever-source-notes.md — research notes on sources
- src/content/chapters/*.md — 8 guided lore chapters (Russian prose, canonical names in English)
- src/content/sources/core.json — source registry (sourceIds referenced by chapters)

Project rules: lore statuses ESTABLISHED | FOREVER | CHANGED | BETA | UNCONFIRMED; no fan theory as fact; no false date precision; do not fill lore gaps from memory; Blizzard official > in-game > official books/manuals > Warcraft Wiki/Wowhead (cross-check only) > community/datamining (BETA/UNCONFIRMED only).

# Evidence rules (strict)
- Every factual finding MUST cite a URL you actually opened in this session. If you could not open a page, say "не проверено" instead of guessing.
- Distinguish clearly: (a) verified wrong, (b) not supported by the cited source, (c) could not verify.
- Do not modify any files. Do not rewrite chapters; report findings only.
- Answer in Russian. Keep canonical Warcraft names in English.
# Task: audit the source registry and research notes
1. For EVERY entry in src/content/sources/core.json open the URL and report: HTTP outcome (ok / redirect to where / 403 / 404 / paywall), whether title, publisher, publishedAt and type are accurate, and whether the `notes` field is accurate.
2. grep which chapters cite each source (sourceIds in src/content/chapters/*.md). Judge whether each source is appropriate for what the chapter uses it for (e.g., a promotional recap used as proof of quest outcomes would be wrong).
3. Check docs/research/2026-09-17-wow-forever-source-notes.md: are its summaries of the sources accurate? Anything overstated?
4. The project removed two sources as inaccessible: a Warcraft III manual endpoint and a "Well of Eternity" preview. Find working OFFICIAL Blizzard alternatives (verify each URL opens) that could legitimately restore coverage of ancient lore (Titans, Old Gods, Black Empire, Well of Eternity, War of the Ancients, Great Sundering, Arathor, troll empires).
5. Recommend at most 10 additional primary sources that would close the gaps listed in the research notes' "Remaining evidence gaps" section. Each with verified URL, publisher, date, and which chapter/gap it covers.

# Output format
Table for section 1 (one row per source). Then sections 2–5 as concise lists. Rank problems by severity.
