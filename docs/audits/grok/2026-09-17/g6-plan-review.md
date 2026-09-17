Начну с обязательных документов и фактической сверки Forever по вебу — без правок файлов, только аудит.Документы на месте. Дальше сверю код, тесты и навигацию с контрактами handoff и спецификацией.Проверяю главы, мёртвые ссылки и официальные источники Forever — без опоры на память.План задач 5–10 **не закрывает спецификацию и уже поставленную навигацию**. Текущий код задач 1–4 в целом честно держит Forever-рамку по официальным статьям, которые я открыл, но оставляет мёртвые ссылки, контракты, которые следующий исполнитель сломает, и тесты, которые это не поймают.

Проверено по первоисточникам (открыты в этой сессии):

- [Carve a New Path with World of Warcraft: Forever](https://news.blizzard.com/en-us/article/24302093/carve-a-new-path-with-world-of-warcraft-forever) — после Forsaken Kingdom и до Molten Core, исходные континенты, уровень 60, анонс запуска 4 ноября 2026 и беты 17 сентября; на той же странице PDT и PST для одного и того же слота.
- [Found Photos Panel Recap](https://news.blizzard.com/en-us/article/24304071/world-of-warcraft-forever-found-photos-panel-recap) — «time bubble», Year 1 до Kazzak, Skyborne/shen’dorei, Zephras, Forsaken Paladins, Hyjal, Shen’dralas, Riverglades.
- [What’s Next Panel Recap](https://news.blizzard.com/en-us/article/24303862/world-of-warcraft-forever-whats-next-panel-recap) — те же регионы плюс **девять новых данжей**, Hyjal Summit (20) и Barrow Deeps (10).
- [Forsaken Kingdom Deep Dive](https://news.blizzard.com/en-us/article/24298590/warcraft-iii-reforged-forsaken-kingdom-deep-dive-recap) — Last Days of Lordaeron, Rexxar-структура, Stratholme/Undercity, герой Forsaken Paladin; это не транскрипт кампании.
- [Astro: GitHub Pages](https://docs.astro.build/en/guides/deploy/github/) и [Astro: Routing](https://docs.astro.build/en/guides/routing/).

По ключевым Forever-фактам в `07-third-war-to-forever.md` расхождений с этими четырьмя статьями **не нашёл** (это не индульгенция задачам 5–10). Тесты в этой сессии не гонял — статус «11/11» из handoff здесь **не проверен**.

---

### 1. Critical — Навигация ведёт на страницы, которых ни одна задача не создаёт

**Дефект.** Spec §5 (строки 57–70) требует 11 пунктов левого меню, changelog и search. `AppShell.astro:10-15,31,38` уже рисует все 11 ссылок плюс `/search` и `timeline#forever`. План при этом:

| Ссылка | Задача-владелец страницы |
| --- | --- |
| `/eras` | нет ни в file structure, ни в tasks 5–10 |
| `/changelog` | в дереве есть `pages/changelog.astro`, но Task 7 создаёт только корневой `CHANGELOG.md` |
| `/search` | Task 8 даёт `SearchIndex.astro`, не `pages/search.astro`; AppShell в файлах Task 8 нет |
| `/characters`, `/factions`, `/locations` | Task 6 создаёт только `[slug].astro` |

[Astro Routing](https://docs.astro.build/en/guides/routing/): `src/pages/dogs/[dog].astro` даёт `/dogs/clifford`, **не** `/dogs`.

**Сценарий.** После «готового V1» читатель жмёт «Эпохи», «Персонажи» или «Поиск» и получает 404 GitHub Pages. E2E это не ловит: `reading-controls.spec.ts:70` проверяет только `toHaveCount(11)`, не статус ответа.

**Минимальный фикс.** Дописать в план владельцев: `pages/eras.astro` (или убрать пункт), `pages/changelog.astro`, `pages/search.astro` **или** заменить ссылку поиска на остров в шелле, плюс `characters/index.astro` (и аналоги) в Task 6. В Task 9 — `expect(request).toBeOK()` по всем `href` из навигации.

---

### 2. Critical — Task 9 публикует с `main` без гейта; Task 10 описывает автокоммит лора без ревью человека

**Дефект.** План Task 9 (строки 545–546, 573): деплой с `main` после сборки, `actions/checkout@v4` + `withastro/action@v3` + `actions/deploy-pages@v4`. Handoff (строки 94–95): «Deployment workflow later must remain gated; do not publish or deploy without explicit approval». Spec §17 (строки 384–416) замыкает пайплайн на `commit → rebuild/deploy`. Task 10 (строки 597–608) требует: классифицировать статус → править файлы → changelog → `npm test`/`build` → `lore:` commit. Человеческого апрува нет. Схема не отличает ложный, но валидный `FOREVER` с `sourceIds` от канона.

Актуальный шаблон Astro ([docs](https://docs.astro.build/en/guides/deploy/github/)): `checkout@v7`, `withastro/action@v6`, `deploy-pages@v5`, `on: push: branches: [main]`, и фраза «automatically deploy». Environment `github-pages` в шаблоне **не** равен required reviewers — по умолчанию это всё равно автопубликация.

**Сценарий.** Бот по контракту Task 10 коммитит ошибочный «факт» из recap/датамайна со статусом `FOREVER` и живым URL. CI зелёный. Push/merge в `main` выкладывает это на Pages. Молчивая перезапись ESTABLISHED не запрещена кодом — только абзацем в будущем markdown.

**Минимальный фикс.** В Task 9: `workflow_dispatch` и/или environment с required reviewers; не деплоить с `push` в `main` без апрува. В Task 10: запретить прямой push в `main`; PR + ручной апрув для любого `FOREVER`/`CHANGED`; валидатор, который отказывает в overwrite ESTABLISHED без нового `CHANGED`-слоя. Версии экшенов взять из текущих docs, не из v3/v4.

---

### 3. Important — Контракты коллекций: JSON не подхватят, схема Forever не совпадает с Task 7, `update-log.json` лежит в чужой коллекции

**Дефект.**

1. Сейчас `content.config.ts:31-38` грузит timeline и glossary через `glob({ pattern: '*.md' })`. Handoff (строка 65) требует при создании `core.json` переключить loader на `file()`. Tasks 5 и 8 **не включают** `content.config.ts`. `file()` для массива с `id` уже работает на `sources/core.json`; glob `*.md` JSON не видит.
2. Task 7 (строки 461–462) обещает `oldExpectation`, `foreverVersion`, `whyItMatters`. Forever-коллекция сидит на `loreEntrySchema` (`content.config.ts:26-29`, `content.ts:13-24`) без этих полей. В списке файлов Task 7 нет `content.ts` / `content.config.ts`.
3. Task 10 кладёт `src/content/forever/update-log.json` рядом с markdown Forever. Форма лога (`date`, `entityIds`, …) не проходит `loreEntrySchema`.

**Сценарий.** Исполнитель Task 5 кладёт `timeline/core.json`, пишет `sortTimeline` и зелёные фикстурные тесты. Сборка предупреждает о пустой коллекции, `/timeline` пустой, якорь `#forever` из `AppShell.astro:31` никуда не ведёт. Task 7: либо сборка падает на лишних ключах, либо `ForeverComparison` не видит `oldExpectation` в `entry.data`. Task 10: смена forever-loader «для порядка» валит всю коллекцию из‑за лога.

**Минимальный фикс.** Явно: Task 5/8 правят loader на `file('src/content/timeline/core.json')` (как sources). Task 7 расширяет `foreverEntrySchema`. `update-log.json` убрать из `src/content/forever/` (например `src/content/logs/` или `docs/automation/`).

---

### 4. Important — Тесты зелёные при невыполненном требовании

**Дефект.**

- `tests/chapter-content.test.ts:29`: `^\d\. ` ровно три раза на весь файл — это не проверка блока «Запомните три вещи». Глава с тремя нумерованными пунктами не там и без источников всё равно проходит.
- Тот же файл не сверяет `sourceIds` с `core.json` и не отличает ESTABLISHED-прозу от Forever-утверждений.
- `content.ts:26-33` требует источники только у `FOREVER`. `CHANGED`/`BETA`/`UNCONFIRMED` с пустым `sourceIds` валидны, хотя spec §16: «Every Forever-sensitive claim should have a source entry».
- `vitest.config.ts:6`: `passWithNoTests: true` — забытый `timeline.test.ts` не валит `npm test`.
- Playwright (`playwright.config.ts:8-12`) поднимает `astro dev` с `reuseExistingServer: true`, а не `astro preview` после `build`. Task 9 шаг 2 гоняет `build`, затем e2e всё равно бьёт в dev. База `/WOW` на статическом артефакте GitHub Pages не проверяется.

**Сценарий.** Task 5 отдаёт пустую хронологию (finding 3), unit-тесты на фикстурах зелёные, `npm test` зелёный даже без файла тестов, e2e «Timeline page rendering» видит 200 на пустой dev-странице. На Pages CSS/JS с неправильным base.

**Минимальный фикс.** Убрать `passWithNoTests`. Тесты коллекций читать реальные JSON/MD. Источники обязательны для `FOREVER`/`CHANGED`/`BETA`. E2E: `webServer.command = preview` собранного сайта, плюс проверка, что ключевые коллекции не пусты.

---

### 5. Important — Дыры покрытия spec, которые задачи 5–10 не закрывают

**Дефект.** Spec §8 (строки 197–207) требует данжи/рейды, «где они добавляют лор». [What’s Next](https://news.blizzard.com/en-us/article/24303862/world-of-warcraft-forever-whats-next-panel-recap) уже называет девять данжей, включая lore-bearing (Ruins of Lordaeron, Hall of Thanes, City of Dalaran, Shaper’s Terrace), плюс Hyjal Summit и Barrow Deeps. Task 7 — шесть файлов, данжей нет. В главе 07 рейды есть одной фразой в deep (`07-third-war-to-forever.md:51`); это не Forever Changes.

Spec §6 Era I (Azshara, Highborne, Legion, Sundering) Task 4 сознательно вырезал (`01-war-of-the-ancients.md:29-30`). Ни Task 5, ни 6, ни 7 не возвращают этот слой. Игроку «без знания Warcraft» Sundering так и не объяснят.

Spec §10: портрет, relationship graph, post-Forever spoiler section. Task 6 — карточки и два SVG, без графа и без барьера Retail.

**Сценарий.** V1 «Before You Enter Azeroth» не знает, что Forsaken в Forever идут в Ruins of Lordaeron как данж, и не знает, почему карта расколота. Dossier Illidan/Sylvanas легко уезжает в Retail-концовки (см. 7).

**Минимальный фикс.** В Task 7 — entries на объявленные данжи/рейды со статусом `FOREVER`/`BETA` и sourceIds. В Task 5 или отдельным шагом — либо восстановить Era I из доступного источника, либо явно сузить spec. В Task 6 — Year-1 fence и spoiler-секции; граф можно отложить только если spec §10 переписать.

---

### 6. Important — Хронология: фильтры spec ≠ шаг плана; ID не зафиксированы; реестр ссылок никто не включает

**Дефект.** Spec §9 (строки 220–228): фильтры faction/**location**/**character**/status. Handoff (строка 107) то же. Task 5 шаг 4 (строка 373): «era, faction, status» — character/location выпали. Интерфейс Task 5 использует `label`; схема — `title` (`content.ts:14-15,56-64`).

Handoff (строка 63): канонические ID глав, timeline, dossiers и search должны совпадать. Task 5 пишет `characterIds` до файлов Task 6. Словаря ID нет (`arthas` vs `arthas-menethil`).

`assertValidContentReferences` (`content.ts:99-101`) **пропускает** коллекцию, которой нет в registry. Сейчас в сборке живёт только `validateChapterSourceIds`. Handoff (строка 64) откладывает полный реестр «after Tasks 5–8». Ни одна из задач 5–10 не ставит этот вызов в `getStaticPaths`/build.

**Сценарий.** Task 5 фильтрует без персонажей/локаций — spec не выполнен, e2e «timeline renders» зелёный. Task 6 даёт другие slug’и — карточки и поиск расходятся. Неверный `characterIds: ['medivh']` при registry без `characters` проходит молча.

**Минимальный фикс.** Шаг 4 Task 5 = spec. Зафиксировать таблицу ID в handoff до Task 5. После Task 8 — `assertValidContentReferences` на всех коллекциях как часть `npm run build`. Поля timeline привести к схеме (`title`, не `label`).

---

### 7. Important — Спойлеры: один клик открывает все Retail и запоминает это; Task 6 без Year-1 барьера

**Дефект.** `SpoilerBlock.astro:30-42` + `ReadingModeToggle.astro:34-46`: кнопка одного блока шлёт `wow:spoilers-request`, это ставит `wow-spoilers=shown` и раскрывает **все** retail-блоки на всех страницах после reload. Handoff (строки 60, 61) это кодифицирует. Spec §5 — «hidden unless explicitly requested»; глобальный persist сильнее «этого блока».

UNCONFIRMED независимо — это соблюдено, регрессии здесь нет.

Task 6 (Arthas, Sylvanas, Illidan, Azshara) не требует spoiler-секций и запрета Retail после Forever. Handoff (строки 75, 69–71): 2004 manual — baseline Year 1; не восстанавливать концовки Forsaken Kingdom из recap. Планового механизма нет.

`print.css:5` прячет `.text-button` (кнопку раскрытия), но не содержимое уже открытого спойлера.

**Сценарий.** Читатель на главной открывает пояснение про границу с Retail. Дальше все dossier’ы показывают поздний Retail. Либо Task 6 вписывает Shadowlands-судьбу Sylvanas как ESTABLISHED — прямое нарушение Forever time bubble из [Found Photos](https://news.blizzard.com/en-us/article/24304071/world-of-warcraft-forever-found-photos-panel-recap).

**Минимальный фикс.** Retail-раскрытие по блоку, глобальный тумблер — отдельный confirm. В Task 6: запрет пост-Forever фактов вне `SpoilerBlock`; ревью-критерий «Year-1 / 2004 baseline». Печать: не выводить `[data-spoiler-content]`, пока пользователь явно не раскрыл **и** не включил печать спойлеров.

---

### 8. Important — a11y и `/WOW`: skip-link без фокуса; e2e не бьёт в preview; хрупкий Playwright baseURL

**Дефект.** `components.css:43`: `main:focus { outline: none; }` при `tabindex="-1"` на `main` (`AppShell.astro:44`). После skip-link фокус невидим — это удар по keyboard navigation из spec §21.

Deep-блоки прячутся только CSS (`global.css:20`), без `hidden`, в отличие от спойлеров. При срыве CSS Essential/Deep сливаются.

`route()` (`src/lib/routes.ts`) для внутренних ссылок используется последовательно — **это соблюдено** в текущем коде. Риск в тестах и будущих задачах: `baseURL: 'http://127.0.0.1:4321/WOW'` плюс `goto('/WOW/...')` работает как абсолютный путь от origin; `goto('/timeline')` в Task 9 уйдёт на `http://127.0.0.1:4321/timeline` без `/WOW`. Dev ≠ preview (finding 4).

Контраст токенов (`#a3a9ac` на `#10151a` и т.п.) в этой сессии **не проверял** — «не проверено».

**Сценарий.** Клавиатурный читатель «переходит к содержанию» и не видит, где он. Task 9 пишет `goto('/forever-changes')` — e2e красный или, при `reuseExistingServer`, бьёт не туда. На Pages ассеты с `/_astro/...` вместо `/WOW/_astro/...` e2e не видит.

**Минимальный фикс.** Не снимать outline с `:focus-visible` на `main`. Deep — атрибут `hidden` в essential. E2E против `astro preview`, goto только через base `/WOW` или relative от `baseURL` без дублирования. Прогнать contrast перед merge.

---

### 9. Minor — Смешение статусов на главе-мосте и «отложенные Minor» без владельца

**Дефект.** `07-third-war-to-forever.md:5` — `status: FOREVER` на тексте, где Third War / Hyjal / Forsaken 2004 — ESTABLISHED, а time bubble / Skyborne — FOREVER. Spec §7: один статус на item; UI не должен красить установленную историю как добавление Forever. Task 7 сравнение это не лечит, если глава уже помечена целиком.

Handoff (строки 80–85) откладывает `NO_COLOR`, `progress max=1` при 0/0, односторонний `aria-pressed` в `ChapterNext.astro:43-46`. Ни Task 9, ни 10 их не берут, кроме туманного «investigate in Task 9» про цвет.

**Сценарий.** Бейдж Forever на рассказе о Archimonde. Кнопка «Глава прочитана» остаётся нажимаемой, SR слышит `pressed`, undo нет.

**Минимальный фикс.** Статус главы — ESTABLISHED, Forever-абзацы — бейджи/блоки FOREVER. Deferred-пункты вписать в Task 9 чеклистом.

---

### 10. Minor — Устаревшие GitHub Actions в Task 9 (если не схлопнуть с №2)

Уже покрыто в finding 2. Отдельно: даже без автоматизации лора `withastro/action@v3` / `deploy-pages@v4` расходятся с [текущим гайдом Astro](https://docs.astro.build/en/guides/deploy/github/). Сломается ли v3 на Node 24 по умолчанию — **не проверено**. Минимальный фикс: скопировать актуальный YAML и не выдумывать версии.

---

## Категории

| Категория | Итог |
| --- | --- |
| Spec coverage / мёртвые ссылки | Есть: №1, №5 |
| Противоречия spec / plan / handoff / код | Есть: №2, №3, №6 |
| Контракты handoff, которые код/план не держат | Есть: №3, №6 |
| Слабые тесты | Есть: №4 |
| Sequencing 5–10 | Есть: №3, №6, №2 |
| Task 10: автопубликация / silent overwrite | Есть: №2 |
| a11y / spoiler-safety / `/WOW` | Есть: №7, №8 |
| Заведомо ложный Forever-лор в текущих главах vs открытые статьи Blizzard | Значимого не нашёл |

Самый дешёвый порядок починки до Task 5: таблица маршрутов+ID, loader JSON, схема Forever, гейт деплоя, e2e по реальным URL. Иначе исполнитель Task 5 честно сделает пустую хронологию с зелёными тестами.
