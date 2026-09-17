# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Проект

Статическая русскоязычная энциклопедия лора **World of Warcraft: Forever**: Astro 7 + TypeScript,
без БД и без клиентского фреймворка, публикация на GitHub Pages под базовым путём `/WOW`
(`https://d0riangrey.github.io/WOW`). Продукт целиком держится на точности фактов и дат —
см. раздел «Доказательства».

## Состояние работ

- V1 смержен в `main`, репозиторий **публичный**, сайт опубликован:
  `https://d0riangrey.github.io/WOW/`. **Деплой только ручной и только с явного одобрения**
  (`.github/workflows/deploy.yml`, `workflow_dispatch`, из `main`).
- План из 10 задач (плюс аудит Task 4R и финальный аудит) выполнен. Актуальное состояние
  и открытые вопросы — в последнем handoff в `docs/superpowers/handoffs/`.
- Актуальность контента держится на следилке: `scripts/watch-sources.mjs` +
  `.github/workflows/watch-sources.yml` ежедневно ищут официальные статьи, которых нет в реестре
  источников, и заводят issue. Дальше — по контракту `docs/automation/lore-update-contract.md`.

| Файл | Роль |
|---|---|
| `docs/superpowers/specs/2026-09-17-wow-forever-encyclopedia-design.md` | Обязательная спека продукта |
| `docs/superpowers/plans/2026-09-17-wow-forever-encyclopedia-v1.md` | План задач (5–10 переписаны после аудита) |
| `docs/audits/2026-09-17-encyclopedia-v1-audit.md` | Аудит: находки, что проверено, что исправлено |
| `docs/research/evidence/` | Реестр доказательств — цитаты официальных источников |
| `docs/research/2026-09-17-wow-forever-source-notes.md` | Заметки по источникам и известные пробелы |
| `docs/automation/lore-update-contract.md` | Как людям и будущей автоматизации менять лор |
| `docs/audits/grok/` | Сырые отчёты Grok: непроверенный вывод модели, не источник фактов |

## Команды

```bash
npm run dev              # dev-сервер: http://localhost:4321/WOW/
npm run build            # astro check && astro build — ошибки типов валят сборку
npm run preview          # просмотр собранного dist/
npm test                 # Vitest (tests/*.test.ts, e2e исключены), офлайн
npm run test:e2e         # Playwright: сам делает build + preview на 127.0.0.1:4321
npm run verify:evidence  # сверка всех цитат реестра с живыми страницами и PDF (нужна сеть)
node scripts/watch-sources.mjs  # официальные статьи, которых ещё нет в реестре источников (rc 20 = есть новое)

# Один файл
npm test -- tests/content-schema.test.ts
npx playwright test tests/e2e/home.spec.ts
node scripts/verify-evidence.mjs docs/research/evidence/chapter-07.json

# Первый прогон e2e на машине
npx playwright install chromium
```

Playwright переиспользует уже запущенный сервер на 4321 (вне CI) — если там висит `npm run dev`,
тесты пойдут против него, а не против сборки.

`npm test` проверять по коду возврата, а не по `grep` вывода: однажды `npm test | grep … && git commit`
закоммитил упавшие тесты.

CI (`.github/workflows/`): `validate.yml` — тесты, сборка и e2e на PR и push в `main`;
`evidence.yml` — `verify:evidence` раз в неделю и вручную (зависит от сети, поэтому не гейт PR);
`watch-sources.yml` — ежедневная следилка за официальными статьями; `deploy.yml` — ручной деплой.
Экшены закреплены на commit SHA (версия — в комментарии рядом), права выданы на уровне job.
Node: `.nvmrc` = 24; `engines` повторяет диапазон Vitest (`^22.12.0 || ^24.0.0 || >=26.0.0`).

## Доказательства (обязательно для любого факта)

Ни одно утверждение о лоре, датах или продукте Forever не пишется по памяти — ни моей, ни чужой модели.

1. **Поиск — Grok** (веб, только чтение): официальные URL и **дословные** английские цитаты под каждое
   утверждение. Вызов из корня репо:
   `grok --prompt-file <prompt.md> --deny 'Write(*)' --deny 'Edit(*)' --deny 'Bash(*)' --cwd "$PWD" --effort xhigh --output-format json`
   (текст ответа — `jq -r .text`; никогда не запускать с `--debug`).
2. **Проверка — скрипт**: кандидатов в JSON реестра → `node scripts/verify-evidence.mjs <file>`.
   Сравнение игнорирует регистр, пунктуацию и пробелы, но требует ту же последовательность слов;
   цитата ищется и в видимом тексте, и во встроенных JSON-данных страницы (так отдаёт текст
   story timeline Blizzard). Статусы: `OK`, `NOT_FOUND` (цитаты нет — утверждение выбрасывается),
   `LOCATOR_MISMATCH` (цитата на другой странице PDF, чем `locator`), `FETCH_ERROR`, `UNKNOWN_SOURCE`.
   Код возврата: 1 — цитата не найдена (проблема контента), 2 — источник не загрузился (в недельном
   CI это предупреждение). Одна цитата хранится в реестре один раз: повторное использование — через
   `entryRefs`, дубли запрещены тестом.
   Загрузчик ходит только по публичным http(s)-адресам, проверяет каждый редирект, обрывает ответы
   больше 32 МБ, повторяет запрос при 502/504 и подбирает user-agent по хосту: форумы Blizzard
   отдают браузеру пустую оболочку приложения, поэтому к ним идёт «поисковый» агент.
   Grok ошибается и в цитатах, и в выводах «имени нет на странице» — доверять только скрипту.
3. **Текст** пишется только из проверенных записей; `sourceIds` записи = источники её цитат.
   Запись реестра привязана к главам через `chapterIds`, к остальному контенту — через
   `entryRefs: ["collection/id"]`. Цитату привязывать к **каждой** записи, которая на неё опирается: фактчек
   задач 5–8 нашёл десятки фраз, чья верная цитата висела на соседнем досье или главе.
4. **Контроль — снова Grok**: фактчек готового текста; спорные находки проверять скриптом или `curl`.

Формат реестра и правила — `docs/research/evidence/README.md`; JSON реестра — источник истины: правится
руками, а не пересобирается скриптом (иначе теряются `entryRefs`).
`tests/evidence-ledger.test.ts` требует, чтобы каждый `sourceId` главы, события хронологии, досье, записи
Forever и термина был подкреплён цитатой именно для этой записи и чтобы в реестре не было мёртвых источников.

Источники:
- Схема (`sourceSchema`): `type` — enum (`official-article`, `official-announcement`,
  `official-retrospective`, `official-preview`, `official-promo`, `official-manual`, `official-book`,
  `official-fiction`, `official-forum`, `in-game`);
  нужен `url` **или** `citation` (печатные книги вроде Warcraft Chronicle — через `citation`).
  URL — только `https`, исключение по хосту сделано для `http://ftp.blizzard.com` (мануалы).
- Мануалы Warcraft II и III на `ftp.blizzard.com` открываются только по `http://` (у `https://` битый
  сертификат). Это не мёртвые ссылки.
- Community-сайты (Warcraft Wiki, Wowpedia, Wowhead, Icy Veins) — только чтобы найти официальный текст
  или подкрепить `BETA` / `UNCONFIRMED`.

## Архитектура

### Контент отделён от представления

Лор живёт в `src/content/`, UI — в `src/pages`, `src/layouts`, `src/components`; будущая автоматизация
правит факты, не трогая код страниц (контракт — Task 10 плана: только через PR и ревью человека).

- Схемы (zod из `astro/zod`) — `src/lib/content.ts`; коллекции — `src/content.config.ts`.
  Схемы, которыми пользуются страницы, — обычный `z.object({...loreFields, …}).superRefine(…)`:
  обобщённый `createLoreSchema` стирает типы полей. Правило источников у всех общее —
  `requireSourcesUnlessEstablished`.
- Коллекции: Markdown через `glob` — `chapters`, `characters`, `factions`, `locations` (досье),
  `forever` (`kind: change | schedule`); JSON через `file` — `timeline`, `glossary`, `sources`,
  `changelog` (для читателя) и `updateLog` (машиночитаемая история лора, только дополняется).
- Статусы — `src/lib/status.ts`. Всё, что не `ESTABLISHED`, обязано ссылаться хотя бы на один источник.
- Реестр сущностей выводится из контента: `loadEntityRegistry()` в `src/lib/entities.ts` берёт ID и
  имена из самих досье. Новая сущность = новый файл в `src/content/`, правка кода не нужна;
  ссылка на несуществующий ID валит сборку и тест целостности.
- Ссылки между записями — строки `collection/id`; URL из них строит `entityRefHref`
  (`src/lib/entity-links.ts`: хронология, Forever и словарь — якоря на общей странице).
- Ссылочная целостность проверяется дважды: на сборке (`assertValidContentReferences`, `loadDossiers`)
  и офлайн в `tests/content-integrity.test.ts` — он разбирает frontmatter YAML-парсером, валидирует
  каждую запись схемой и проверяет все ссылки, не завися от того, рендерит ли их какая-то страница.
  В тестах frontmatter читать только через `tests/helpers/content-entries.ts`: регулярки молча
  возвращают пустой список, и проверка проходит вхолостую.
- Поиск — клиентский, по индексу из заголовков, summary и алиасов (`src/lib/search-index.ts`,
  без тел статей); русская морфология — грубый стеммер в `src/lib/search.ts`.

### Контракт глав

`tests/chapter-content.test.ts` и `tests/evidence-ledger.test.ts`:

- ровно 8 файлов `NN-slug.md`, `order` = индекс, `readingMinutes` 5–10;
- блок `data-depth="deep"`, заголовки `## Почему это важно в Forever` и `## Запомните три вещи`
  (ровно три пункта в этом разделе);
- без общих английских слов (`kingdom`, `quest`, `region`…) и без упоминаний внутреннего «исследования»;
- абзацы со статусом, отличным от статуса главы, оборачиваются так (markdown внутри разбирается):

```html
<div class="lore-status-block" data-lore-status="FOREVER">
<p class="lore-badge status-forever"><span aria-hidden="true">✦</span> Forever<span class="sr-only"> — Подтверждённое дополнение World of Warcraft: Forever.</span></p>

Абзацы markdown…

</div>
```

  Подписи и символы статусов — как в `src/components/LoreBadge.astro`.

Во frontmatter пустой список пишется как `[]`: голое `relatedLocationIds:` YAML читает как `null`, и
сборка падает на схеме (юнит-тесты читают frontmatter регулярками и этого не видят).

### Оболочка и клиентское состояние

Вложенность: `LoreLayout` (статьи) → `BaseLayout` → `AppShell` (навигация на 11 разделов, панель режимов,
прогресс). Прогресс на любой странице считается по пути из всех глав — `AppShell` читает коллекцию сам.

Интерактивность — обычные `<script>` в Astro-компонентах; общение через атрибуты `<html>` и DOM-события:

| Что | Хранение (`localStorage`) | Механика |
|---|---|---|
| Режим чтения | `wow-reading-mode`: `essential \| deep` | `html[data-reading-mode]`; CSS в `global.css` скрывает `[data-depth="deep"]` вне режима `deep` |
| Спойлеры Retail (весь сайт) | `wow-spoilers`: `hidden \| shown` | переключатель в панели → `html[data-spoilers]` + событие `wow:spoilers-changed` |
| Прогресс | `wow-reading-progress`: JSON-массив ID глав | событие `wow:progress-changed` на `window`; только явной кнопкой в `ChapterNext`, которая и снимает отметку |

- Инлайн-скрипт в `<head>` `BaseLayout` выставляет режимы до отрисовки.
- Кнопка внутри `SpoilerBlock` раскрывает **только этот блок** и только до перезагрузки (не сохраняется); общий
  переключатель в панели раскрывает все Retail-блоки и сбрасывает локальные выборы. Решение владельца, 2026-09-17.
- `SpoilerBlock kind="unconfirmed"` раскрывается отдельно и **не** следует переключателю Retail.
- Любой доступ к `localStorage` — в `try/catch` (e2e эмулирует недоступное хранилище).

### Базовый путь `/WOW`

Внутренние ссылки — только через `route()` из `src/lib/routes.ts`: он добавляет завершающий слэш
страницам (иначе GitHub Pages отвечает редиректом 301 на каждый переход) и не трогает файлы и якоря.
В e2e `page.goto` всегда с `/WOW`.
`tests/e2e/navigation.spec.ts` обходит все внутренние ссылки собранного сайта и требует 200 и
существующий `#якорь`.

### Стили

Чистый CSS: токены в `tokens.css`, далее `global.css`, `components.css`, `print.css`. Без Tailwind
и SPA-фреймворка; ничего не должно работать только на hover.

## Изображения

Спека §13–14: только оригинальные иллюстрации и схемы или официальные материалы Blizzard с метаданными;
сгенерированное никогда не выдаётся за арт Blizzard (подпись «Оригинальная ИИ-иллюстрация»). Владелец
разрешил генерировать иллюстрации без согласования каждой (2026-09-17); портреты персонажей Blizzard не делать.

- **Растровые иллюстрации — через Codex** (встроенный `image_gen`, по подписке, без API-ключа): субагент
  `codex-executor` или `~/.claude/bin/codex-stage`. Файл появляется не в проекте, а в
  `~/.codex-slim/generated_images/<thread_id>/` — копировать самому в `public/images/`.
  Размер промптом не управляется; проверка — `file <путь>`, соответствие задумке — глазами.
- **Лимиты Codex контролировать до и после каждой генерации**: `~/.claude/bin/codex-usage.sh`
  (5-часовое и недельное окно, план Plus). Генерация одной картинки занимает около минуты;
  генерировать по одной и сверять окно после каждой. Останавливаться только выше 99%
  (решение владельца, 2026-09-17).
- Схемы, карты связей и таймлайны — SVG руками (`public/diagrams/`), с текстовой альтернативой рядом.
- Всё тяжёлое — `loading="lazy"` и осмысленный `alt`.

## Правила лора

- Основной текст — русский; английский только для канонических имён, названий и терминов Warcraft.
- `BETA` и `UNCONFIRMED` никогда не оформляются как канон; поздний Retail скрыт по умолчанию.
- Мир описывается на момент первого года оригинального WoW / старта Forever. «Year 1» Forever — это
  ранний период оригинального WoW, а не первый год после Dark Portal.
- Иерархия источников: официальные публикации Blizzard → игровые материалы → официальные книги и
  мануалы → community-сайты (только поиск и `BETA` / `UNCONFIRMED`).
- Анонс Blizzard доказывает анонсированный контент, а не исходы квестов и сюжет кампании Forsaken Kingdom.
- Если официальные тексты расходятся (длительность войн, описание места Shen’dralas, часовой пояс
  запуска), показывать обе версии, а не выбирать одну.
- Не путать Shen’dralas (место), Shen’dralar (группа) и shen’dorei (Skyborne).
- Мануал 2004 года — базовая линия эпохи; поздние ретроспективы помечаются как поздний слой.
- Пробелы без открытого официального текста (порядок Old Gods, цепочка Y’Shaarj → Well, происхождение
  тёмных троллей, распад Arathor, полная Curse of Flesh) не заполнять, пока нет источника.
