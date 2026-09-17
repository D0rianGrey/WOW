# Evidence ledger

Every factual claim in the encyclopedia is backed here by a verbatim quote from an official source.
The quotes are machine-checked against the live pages, so a claim cannot silently rest on memory
or on a model's paraphrase.

## Format

One JSON file per content area (`chapter-00.json`, `timeline.json`, `dossiers.json`, …), each an array:

```json
{
  "id": "ch07-lich-king-northrend",
  "claim": "К первому году Arthas — Lich King в Northrend.",
  "sourceId": "world-of-warcraft-2004-manual",
  "quote": "Currently Arthas, the new and immortal Lich King, resides in Northrend",
  "locator": "PDF p. 87",
  "chapterIds": ["third-war-to-forever"]
}
```

- `sourceId` must exist in `src/content/sources/core.json`.
- `quote` is exact English text from the source (at least eight words); never a paraphrase.
- `locator` is required for PDFs (page number as reported by the verifier).
- `chapterIds` lists the chapters that rely on the claim.

## Rules

- Every `sourceId` a chapter cites must have at least one ledger entry for that chapter
  (`tests/evidence-ledger.test.ts`).
- Official Blizzard texts only. Community wikis and news sites may point to an official text or
  back `BETA` / `UNCONFIRMED` material, but never back `ESTABLISHED` or `FOREVER` claims.
- When two official texts disagree, add both quotes and say so in the content instead of choosing one.

## Workflow

1. Research with Grok (web, read-only): ask for official URLs and verbatim quotes per claim.
2. Put candidates into a ledger file and run `npm run verify:evidence` (or pass one file as an argument).
3. Drop or replace every `NOT_FOUND` / `FETCH_ERROR` entry. Only then write or change content.
4. After writing, run a Grok fact-check pass on the content and fix what it finds.

`npm run verify:evidence` needs network access, so it is not part of `npm test`; run it before
merging content and on a schedule to detect changed or removed source pages.
