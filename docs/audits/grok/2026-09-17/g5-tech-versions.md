Начинаю аудит стека: сначала сниму локальные версии и конфиги, затем сверю их с официальными источниками на сегодня.Локальные конфиги на месте. Дальше сниму lockfile, Task 8/9 и сверю API/версии по официальным докам.Дальше сверю официальные доки Astro, версии пакетов и Actions — параллельно по npm, GitHub и Context7.npmjs отдаёт challenge; перехожу на registry API, GitHub releases и официальные доки.Bash закрыт политикой — продолжаю через npm dist-tags, GitHub releases и официальные доки.Аудит на 2026-09-17. Файлы не менялись. Ниже только факты с URL, которые я открыл в этой сессии.

Локально зафиксировано (lockfile): `astro@7.3.3`, `@astrojs/check@0.9.10`, `typescript@6.0.3`, `vitest@5.0.1`, `@playwright/test@1.63.0`, `@types/node@22.20.3`, транзитивный `zod@4.6.5`.

---

## 1. Версии пакетов и Node.js LTS

| Пакет | В проекте (resolved) | npm `latest` на 2026-09-17 | Статус |
| --- | --- | --- | --- |
| `astro` | 7.3.3 | 7.3.3 | Совпадает со stable |
| `@astrojs/check` | 0.9.10 | 0.9.10 | Совпадает |
| `typescript` | 6.0.3 | **7.0.2** | Отстаёт на major |
| `vitest` | 5.0.1 | 5.0.1 | Совпадает |
| `@playwright/test` | 1.63.0 | 1.63.0 | Совпадает (`next` — alpha 1.64) |
| `@types/node` | 22.20.3 | dist-tag `latest` = 22.20.3 | Совпадает с тегом; не с текущим LTS runtime |

Источники: [registry astro/latest](https://registry.npmjs.org/astro/latest), [registry @astrojs/check/latest](https://registry.npmjs.org/@astrojs/check/latest), [typescript dist-tags](https://registry.npmjs.org/-/package/typescript/dist-tags), [vitest dist-tags](https://registry.npmjs.org/-/package/vitest/dist-tags), [@playwright/test dist-tags](https://registry.npmjs.org/-/package/@playwright/test/dist-tags), [@types/node dist-tags](https://registry.npmjs.org/-/package/@types/node/dist-tags).

**1.1. `astro@7.3.3` — актуальный stable, не pre-release.**  
Опубликован 2026-09-16. Engines: `node: ">=22.12.0"`.  
URL: [https://registry.npmjs.org/astro/latest](https://registry.npmjs.org/astro/latest)

Рекомендация: оставить `^7.3.3`. Не понижать.

**1.2. Node.js: текущий LTS — 24.21.0 (Krypton), не 22.**  
Официальная страница загрузки предлагает **v24.21.0 LTS**. Node 22 (Jod) тоже ещё LTS (latest archive **v22.23.2**). Node 26.9.0 — Current, не LTS. Node 20 — **EOL** (24 Mar 2026). Официальные docs Astro: Node `v22.12.0` or higher; **odd-numbered versions like v23 are not supported**.  
URL: [https://nodejs.org/en/download](https://nodejs.org/en/download), [https://nodejs.org/en/about/previous-releases](https://nodejs.org/en/about/previous-releases), [https://docs.astro.build/en/install-and-setup/](https://docs.astro.build/en/install-and-setup/)

Рекомендация: в `package.json` добавить `"engines": { "node": ">=22.12.0" }`. Для CI/Pages зафиксировать **Node 24** (дефолт `withastro/action@v6`). Не использовать Node 20.

**1.3. `@types/node@22.20.3` vs runtime Node 24 — mismatch major.**  
npm `latest` всё ещё 22.20.3. При этом существуют `@types/node@24.10.0` и `@types/node@26.6.1`. Версии `24.19.1` / `24.20.0` / `24.21.0` на registry — 404 (полный newest 24.x я не перечислил). Vitest 5 peer: `"@types/node": "^22.0.0 || >=24.0.0"`.  
URL: [https://registry.npmjs.org/-/package/@types/node/dist-tags](https://registry.npmjs.org/-/package/@types/node/dist-tags), [https://registry.npmjs.org/@types/node/24.10.0](https://registry.npmjs.org/@types/node/24.10.0), [https://registry.npmjs.org/@types/node/26.6.1](https://registry.npmjs.org/@types/node/26.6.1), [https://registry.npmjs.org/vitest/latest](https://registry.npmjs.org/vitest/latest)

Классификация: (a) major types не совпадает с рекомендуемым CI runtime Node 24; (c) точный newest patch 24.x сверх 24.10.0 — не проверено.

Рекомендация: если CI = Node 24, поставить `@types/node@^24`. Если оставляете Node 22 LTS — оставить 22.20.3 и явно зафиксировать runtime 22.

**1.4. TypeScript 6.0.3 vs latest 7.0.2 — не апгрейдить.**  
TS 7 — native Go-порт. Официальный анонс: workflows с **Astro / Vue / MDX / Svelte пока не могут опереться на TS 7**, потому что нет стабильного programmatic API; Volar и подобные живут на 6.0. `@astrojs/check@0.9.10` peer: `"typescript": "^5.0.0 || ^6.0.0"` — **TS 7 не входит**. Сам `astro@7.3.3` в своих devDependencies держит `typescript: ^6.0.3`.  
URL: [https://www.typescriptlang.org/](https://www.typescriptlang.org/), [https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/), [https://registry.npmjs.org/@astrojs/check/latest](https://registry.npmjs.org/@astrojs/check/latest)

Рекомендация: **пин `typescript@^6.0.3`**, не `npm update typescript`. `npm run build` = `astro check && astro build` — TS 7 сломает check.

**1.5. Pre-release в дереве Astro: `get-tsconfig@5.0.0-beta.4`.**  
Прямая зависимость `astro@7.3.3`. При этом npm `latest` пакета — **4.14.3** (stable). Это выбор Astro, не проекта.  
URL: lockfile `package-lock.json` (astro.dependencies), [https://registry.npmjs.org/get-tsconfig/latest](https://registry.npmjs.org/get-tsconfig/latest)

Рекомендация: не патчить вручную. Следить за следующим patch Astro.

**1.6. Vitest engines не включают Node 20/23/25.**  
`"node": "^22.12.0 || ^24.0.0 || >=26.0.0"`. Совпадает с политикой Astro по odd majors.  
URL: [https://registry.npmjs.org/vitest/latest](https://registry.npmjs.org/vitest/latest)

Рекомендация: ничего не менять в версии vitest.

---

## 2. Astro Content Layer API (этот major)

Используемые API — **текущие, не deprecated** для Astro 7.

**2.1. `glob` / `file` из `astro/loaders` + `defineCollection` из `astro:content` + `src/content.config.ts`.**  
Официальный гайд Content collections именно так и показывает. Старый `src/content/config.ts` + `type: 'content'|'data'` убраны в Content Layer (миграция v5).  
URL: [https://docs.astro.build/en/guides/content-collections/](https://docs.astro.build/en/guides/content-collections/)

`file('src/content/sources/core.json')` корректен: JSON — массив объектов с обязательным `id` (локальный `core.json` это соблюдает).

Рекомендация: API не менять. Для glossary/timeline по handoff переключить glob → `file()`, когда появятся JSON.

**2.2. `render(entry)` из `astro:content` — актуальный API.**  
`entry.render()` deprecated с Content Layer. Проект уже вызывает `const { Content } = await render(chapter)` в `src/pages/chapters/[slug].astro`.  
URL: [https://docs.astro.build/en/guides/content-collections/#rendering-body-content](https://docs.astro.build/en/guides/content-collections/#rendering-body-content)

Рекомендация: оставить как есть.

**2.3. `z` из `astro/zod`, `z.url()`, `.safeExtend()` — текущий Zod 4 API.**  
Astro 7 реэкспортирует Zod 4 (`"This is a re-export of the Zod library, and it supports all of the features of Zod 4"`). Docs Astro явно показывают `z.url()` и `portfolio: z.url()`.  
URL: [https://docs.astro.build/en/guides/content-collections/#defining-datatypes-with-zod](https://docs.astro.build/en/guides/content-collections/#defining-datatypes-with-zod), [https://docs.astro.build/en/reference/modules/astro-zod/](https://docs.astro.build/en/reference/modules/astro-zod/), [https://zod.dev/api](https://zod.dev/api)

В Zod 4 `z.string().url()` / `.email()` **deprecated** в пользу top-level `z.url()` / `z.email()` ([changelog](https://zod.dev/v4/changelog)). Проект уже на `z.url()` — верно.

**2.4. `superRefine` + `safeExtend` — это как раз рекомендуемый паттерн Zod 4, не баг.**  
Цитата Zod: *«Use `.safeExtend()` to extend schemas that contain refinements. (Regular `.extend()` will throw an error when used on schemas with refinements.)»*  
`createLoreSchema` делает `baseLoreSchema.safeExtend(extraFields)` после `.superRefine()` — **правильно**.  
URL: [https://zod.dev/api](https://zod.dev/api) (секция `.safeExtend()`)

Известный issue Zod 3 «ZodEffects нельзя extend-ить» в v4 снят: changelog прямо пишет **drops ZodEffects**; refinements живут внутри схемы ([https://zod.dev/v4/changelog](https://zod.dev/v4/changelog), [https://zod.dev/v4](https://zod.dev/v4)). Bundled zod в lockfile — **4.6.5**, latest npm тоже 4.6.5.

Нюанс кода (не API-депрекация): `chapterEntrySchema` **дублирует** тот же `superRefine` через `z.object({...loreFields})`, вместо `createLoreSchema({ order, readingMinutes })`. Поведение валидно; дубль — риск дрейфа правил FOREVER.

Рекомендация: оставить `safeExtend`. По желанию свести chapter-схему к `createLoreSchema`. Не ставить отдельный `zod` в dependencies.

---

## 3. GitHub Pages: `base: '/WOW'`, `site`, trailing slash, `BASE_URL`

**3.1. Пара `site` + `base` — правильная схема для project site.**  
`site: 'https://d0riangrey.github.io'` + `base: '/WOW'` совпадает с официальным примером (`site: 'https://astronaut.github.io'`, `base: '/my-repo'`). Project site живёт по `https://<owner>.github.io/<repositoryname>`.  
URL: [https://docs.astro.build/en/guides/deploy/github/](https://docs.astro.build/en/guides/deploy/github/), [https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)

Рекомендация: оставить, **если репозиторий действительно называется `WOW`**. Если имя другое — `base` неверен (это уже не стек, а соответствие имени repo).

**3.2. `output: 'static'` — дефолт Astro 7, избыточно, но не ошибочно.**  
URL: [https://docs.astro.build/en/reference/configuration-reference/#output](https://docs.astro.build/en/reference/configuration-reference/#output)

**3.3. `trailingSlash` не задан (= `'ignore'`). Для Pages это риск.**  
Astro: `BASE_URL` **определяется `trailingSlash`**, независимо от того, есть ли `/` в `base`. При `'always'` BASE_URL = `/WOW/`; при `'never'` = `/WOW`. Для prerendered страниц trailing slash **делает хост**, не Astro. Default `build.format` = `'directory'` → `start-here/index.html`.  
URL: [https://docs.astro.build/en/reference/configuration-reference/#base](https://docs.astro.build/en/reference/configuration-reference/#base), [#trailingslash](https://docs.astro.build/en/reference/configuration-reference/#trailingslash), [#buildformat](https://docs.astro.build/en/reference/configuration-reference/#buildformat)

Поведение GitHub Pages для `/WOW/start-here` vs `/WOW/start-here/` в открытых сегодня docs **не специфицировано** → (c) не проверено.

Локально `src/lib/routes.ts` всегда даёт путь **без** завершающего `/` у страницы (`/WOW/start-here`), а `route()` для корня даёт `/WOW/`. Playwright: `baseURL` без `/` на конце, `webServer.url` **со** слэшем.

Рекомендация: явно поставить `trailingSlash: 'always'` (Astro советует так для `directory` format) и либо добавить слэш в `route()`, либо документировать, что хост редиректит. Прогнать E2E против `astro preview` собранного `dist`, не против `dev`.

**3.4. `import.meta.env.BASE_URL` — штатный механизм.**  
Docs: *«The base URL your site is being served from. This is determined by the `base` config option»*. Хелпер `route()` снимает хвостовой `/` и собирает путь заново — это правильная защита от колебаний BASE_URL.  
URL: [https://docs.astro.build/en/guides/environment-variables/#default-environment-variables](https://docs.astro.build/en/guides/environment-variables/#default-environment-variables)

Рекомендация: все внутренние ссылки только через `route()` (уже так в AppShell/главах). Не хардкодить `/WOW`.

---

## 4. Task 9: GitHub Actions и официальный Astro→Pages workflow

План пишет: `actions/checkout@v4`, `withastro/action@v3`, `actions/deploy-pages@v4`, permissions `contents: read`, `pages: write`, `id-token: write`.

| Action | План | Актуальный major (latest release) | Официальный пример Astro |
| --- | --- | --- | --- |
| checkout | v4 | **v7.0.1** (20 Jul) | `actions/checkout@v7` |
| withastro/action | v3 | **v6.1.3** (14 Sep) | `withastro/action@v6` |
| deploy-pages | v4 | **v5.0.1** (1 Sep) | `actions/deploy-pages@v5` |

URL: [https://docs.astro.build/en/guides/deploy/github/](https://docs.astro.build/en/guides/deploy/github/), [https://github.com/withastro/action](https://github.com/withastro/action), [https://github.com/withastro/action/releases/latest](https://github.com/withastro/action/releases/latest), [https://github.com/actions/checkout/releases/latest](https://github.com/actions/checkout/releases/latest), [https://github.com/actions/deploy-pages/releases/latest](https://github.com/actions/deploy-pages/releases/latest)

**4.1. `withastro/action@v3` — verified wrong для этого стека.**  
v3 default `node-version: "20"`. Node 20 EOL. Astro 7 требует `>=22.12.0`. Сборка на v3 без override **не взлетит**.  
URL: [https://github.com/withastro/action/blob/v3/action.yml](https://github.com/withastro/action/blob/v3/action.yml)

v6 default **Node 24**, upload через `actions/upload-pages-artifact@v5`, `include-hidden-files: true`.  
URL: [https://raw.githubusercontent.com/withastro/action/v6/action.yml](https://raw.githubusercontent.com/withastro/action/v6/action.yml)

Рекомендация: копировать workflow **как в текущих Astro docs** (`checkout@v7` + `withastro/action@v6` + `deploy-pages@v5`). Не писать v3/v4.

**4.2. Permissions плана — совпадают с официальными.**  
Astro docs и `withastro/action` README:

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

`deploy-pages` отдельно требует минимум `pages: write` + `id-token: write` (OIDC). Нужен job `environment: name: github-pages`. В Settings → Pages source = **GitHub Actions**.  
URL: [https://docs.astro.build/en/guides/deploy/github/](https://docs.astro.build/en/guides/deploy/github/), [https://github.com/actions/deploy-pages](https://github.com/actions/deploy-pages)

README самого `deploy-pages` всё ещё показывает `@v4` в примере, при latest **v5.0.1**. Для github.com брать v5 (как Astro). GHES: v4 помечен incompatible — для github.com не релевантно.

Рекомендация: permissions оставить. Добавить `environment: github-pages` на deploy job. В Settings включить Actions как source.

**4.3. Автодеплой с `main` конфликтует с handoff.**  
Handoff: *«Deployment workflow later must remain gated; do not publish or deploy without explicit approval»* и *«Do not merge to `main`»*. План: push на `main` → publish Pages.

Рекомендация: `workflow_dispatch` only (или `environment` protection / required reviewers). Не вешать deploy на каждый push в `main`, пока нет явного апрува.

**4.4. E2E в Task 9 не тестирует то, что деплоится.**  
План: `npm run build` затем `npm run test:e2e`. Реальный `playwright.config.ts` поднимает **`npm run dev -- --host 127.0.0.1 --ignore-lock`**, `reuseExistingServer: true` всегда. `--ignore-lock` — валидный флаг Astro ≥7.1.0.  
URL: [https://docs.astro.build/en/reference/cli-reference/#--ignore-lock](https://docs.astro.build/en/reference/cli-reference/#--ignore-lock)

Рекомендация: в CI webServer = `npm run build && npm run preview -- --host 127.0.0.1`, `reuseExistingServer: !process.env.CI`. Иначе Pages-баги (`base`, trailing slash, ассеты) E2E не поймает.

---

## 5. Task 8: custom search vs Pagefind

Контракт плана: build-time индекс `{ id, type, title, summary, href, status, keywords }`, клиентский фильтр, тесты exact name / alias / glossary keyword / **status**. Unicode lowercase + английские канонические имена + русские пояснения. Без внешнего сервиса.

**Pagefind (факты):**

| Критерий | Факт | URL |
| --- | --- | --- |
| Русский stemming | **Да**: `ru` — UI ✅, Word Stemming ✅ | [https://pagefind.app/docs/multilingual/](https://pagefind.app/docs/multilingual/) |
| Язык страницы | Сайт уже `<html lang="ru">` — Pagefind сам выберет ru-индекс | `src/layouts/BaseLayout.astro` + тот же гайд |
| Bundle size (браузер) | «most sites closer to **100kB**»; 10k страниц < 300kB включая библиотеку | [https://pagefind.app/](https://pagefind.app/) |
| Native indexer | `@pagefind/darwin-arm64` unpacked **~57 MB** (CLI, не браузер) | [https://registry.npmjs.org/@pagefind/darwin-arm64/latest](https://registry.npmjs.org/@pagefind/darwin-arm64/latest) |
| Base path | `baseUrl: "/docs/"`, `bundlePath` / `basePath` | [https://pagefind.app/docs/search-config/](https://pagefind.app/docs/search-config/) |
| Astro-интеграция | **Нет first-party `@astrojs/*`**. Community `astro-pagefind@2.0.1` (peer astro ^2…^7), «Supports customized base URL path». Starlight встраивает Pagefind из коробки — это другой продукт | [https://docs.astro.build/en/guides/integrations-guide/](https://docs.astro.build/en/guides/integrations-guide/), [https://registry.npmjs.org/astro-pagefind/latest](https://registry.npmjs.org/astro-pagefind/latest), [https://github.com/shishkin/astro-pagefind/blob/master/README.md](https://github.com/shishkin/astro-pagefind/blob/master/README.md), [https://starlight.astro.build/guides/site-search/](https://starlight.astro.build/guides/site-search/) |

Custom JSON для ~десятков записей — килобайты, без WASM и без 57 MB CLI.

**Рекомендация: оставить custom `src/lib/search.ts` + `SearchIndex` для v1.**

Почему не Pagefind сейчас:

1. Контракт Task 8 — **структурный** поиск (type/status/keywords/aliases), не full-text HTML. Status-фильтр в Pagefind — metadata/filters, это другой контракт и другие тесты.
2. Корпус маленький; 100 kB WASM+index — лишняя стоимость относительно JSON.
3. Нет официальной Astro-интеграции в списке first-party.
4. План уже фиксирует форму документа и Vitest-кейсы.

Что обязательно добавить в custom, иначе русский поиск будет дырявым: словоформы в `keywords` (Орда/Орды/Орде, Плеть/Плети, орк/орков). Stemming Pagefind этого не заменит, если индекс — только title/summary.

Pagefind имеет смысл **после v1**, если понадобится полнотекст глав. Тогда: `astro-pagefind`, `lang="ru"`, `baseUrl: "/WOW/"`, `data-pagefind-ignore` на спойлерах/навигации. Не вместо структурного индекса.

---

## Топ-5 технических рисков

1. **Task 9 с `withastro/action@v3` (Node 20) не соберёт Astro 7.** Verified wrong. Чинить: workflow из текущих Astro docs (`checkout@v7`, `action@v6`, `deploy-pages@v5`, Node 24).  
   [https://docs.astro.build/en/guides/deploy/github/](https://docs.astro.build/en/guides/deploy/github/) · [https://github.com/withastro/action/blob/v3/action.yml](https://github.com/withastro/action/blob/v3/action.yml)

2. **Trailing slash не зафиксирован, а ссылки без `/`.** Default `directory` + GitHub Pages. Поведение хоста не специфицировано в открытых docs. Риск 404 на `/WOW/start-here` vs `/WOW/start-here/`.  
   [https://docs.astro.build/en/reference/configuration-reference/#trailingslash](https://docs.astro.build/en/reference/configuration-reference/#trailingslash)

3. **E2E гоняет `astro dev`, а деплоится `dist`.** План Task 9 и `playwright.config.ts` расходятся. Баги `base`/ассетов/слэшей на Pages не ловятся.  
   Локальный конфиг + [CLI `--ignore-lock`](https://docs.astro.build/en/reference/cli-reference/#--ignore-lock)

4. **Слепой апгрейд на TypeScript 7 сломает `astro check` и Astro-tooling.** Latest = 7.0.2; `@astrojs/check` peer только TS 5–6; официальный анонс TS 7 прямо исключает Astro до появления API.  
   [https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) · [https://registry.npmjs.org/@astrojs/check/latest](https://registry.npmjs.org/@astrojs/check/latest)

5. **Нет `engines` / `.nvmrc`, types Node 22 при дефолте action Node 24.** Локально и в CI можно незаметно разъехаться по runtime.  
   [https://nodejs.org/en/download](https://nodejs.org/en/download) · [https://raw.githubusercontent.com/withastro/action/v6/action.yml](https://raw.githubusercontent.com/withastro/action/v6/action.yml)

Дополнительно (не в топ-5, но в Task 9): автодеплой с `main` противоречит ruling «gated, без апрува не публиковать».
