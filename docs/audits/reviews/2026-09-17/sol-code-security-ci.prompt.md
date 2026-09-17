You are auditing a small static website repository before it is considered finished. Read-only: do not modify files. Working directory is the repo (Astro 7 + TypeScript, static output, deployed to GitHub Pages at https://d0riangrey.github.io/WOW/ from a public repo).

Audit these areas and report defects, in this priority order:

1. SECURITY
   - `.github/workflows/*.yml`: trigger surface, permissions, whether a pull request from a fork can obtain write access, secrets exposure, action pinning, injection through untrusted inputs (PR titles, branch names), the manual-only deployment gate in deploy.yml.
   - `scripts/verify-evidence.mjs`: it downloads arbitrary URLs taken from JSON files and parses PDFs with `unpdf`. Consider SSRF, redirect handling, absent timeouts, unbounded memory, zip/pdf bombs, path handling of the `--json` output argument, and whether a malicious ledger file could do damage when the weekly workflow runs it.
   - Client-side code in `src/components/*.astro`, `src/pages/*.astro`, `src/lib/*.ts`: XSS through `set:html`, `innerHTML`, JSON embedded in `<script>` tags, and `localStorage` handling.

2. CORRECTNESS AND ROBUSTNESS
   - `src/lib/*.ts` (search stemmer, timeline filters, entity links, content schemas): edge cases, wrong results, crashes on empty or malformed data.
   - Tests in `tests/`: what is actually asserted versus what can silently break; missing cases that would have caught a real defect; anything that passes vacuously.

3. BUILD, DEPLOY AND PERFORMANCE
   - `astro.config.mjs`, `package.json`, `playwright.config.ts`, `.nvmrc`: correctness of the base path, engines range, anything that breaks on a fresh clone or in CI.
   - Page weight and asset strategy: images in `public/images/`, CSS in `src/styles/`, inline scripts. Name the single change with the best payoff.

4. MAINTAINABILITY — only defects that will cause a real problem later, not style preferences.

For every finding give: severity (Critical / Important / Minor), file and line, the concrete failure scenario (inputs → wrong or dangerous outcome), and the smallest fix. Rank by severity. If an area is clean, say so in one line rather than inventing findings. Be concrete; no generic advice. Answer in Russian.
