## Итог

Критических дефектов нет. Найдено 6 важных и 4 малых дефекта. Наиболее серьёзные риски — изменяемые ссылки на GitHub Actions, XSS через контент и неограниченная загрузка внешних ресурсов.

## Важные

1. **Important — GitHub Actions не закреплены по commit SHA.**  
   Файлы: [deploy.yml:22](/Users/yevhenii_m1/Downloads/WOW/.github/workflows/deploy.yml:22), [validate.yml:21](/Users/yevhenii_m1/Downloads/WOW/.github/workflows/validate.yml:21), [evidence.yml:18](/Users/yevhenii_m1/Downloads/WOW/.github/workflows/evidence.yml:18) и остальные строки `uses:`.  
   Сценарий: компрометация или перенос mutable-тега вроде `withastro/action@v6` → чужой код выполняется в deploy job с правами Pages/OIDC либо в еженедельном job.  
   Минимальное исправление: закрепить каждое action на полном 40-символьном commit SHA, оставив версию комментарием.

2. **Important — write/OIDC-права выданы также build job.**  
   Файл: [deploy.yml:7](/Users/yevhenii_m1/Downloads/WOW/.github/workflows/deploy.yml:7).  
   Сценарий: скомпрометированный `withastro/action` или build-зависимость выполняется до `deploy`, но получает workflow-level `pages: write` и `id-token: write`; последствия supply-chain-компрометации становятся существенно больше необходимого.  
   Минимальное исправление: перенести permissions на уровень jobs: `build` — только `contents: read`, `deploy` — `pages: write` и `id-token: write`.

3. **Important — stored XSS при сериализации поискового индекса.**  
   Файл: [SearchIndex.astro:7](/Users/yevhenii_m1/Downloads/WOW/src/components/SearchIndex.astro:7).  
   Сценарий: title/summary/alias со значением `</script><script>…</script>` → `JSON.stringify` не экранирует `<` → браузер закрывает `application/json`-элемент и исполняет внедрённый script после публикации. Требуется принятие и ручной deploy вредоносного контента, поэтому это не Critical.  
   Минимальное исправление: безопасная сериализация, как минимум `JSON.stringify(documents).replace(/</g, '\\u003c')`; добавить регрессионный тест с `</script>`.

4. **Important — URL источника допускает исполняемые схемы.**  
   Файлы: [content.ts:147](/Users/yevhenii_m1/Downloads/WOW/src/lib/content.ts:147), один из sinks — [SourceList.astro:30](/Users/yevhenii_m1/Downloads/WOW/src/components/SourceList.astro:30).  
   Сценарий: `z.url()` принимает `javascript:alert(1)`, `data:` и `file:`; проверка это подтверждает. Источник с `javascript:` проходит build, а клик по выглядящей официально ссылке исполняет код в origin сайта. `rel="noreferrer"` это не блокирует.  
   Минимальное исправление: разрешить только `https:`; если два нынешних HTTP PDF нельзя перевести на HTTPS — временно разрешить только конкретные HTTP-host/path. Добавить тест, отклоняющий `javascript:`, `data:` и `file:`.

5. **Important — SSRF через проверку доказательств и её redirects.**  
   Файлы: [verify-evidence.mjs:60](/Users/yevhenii_m1/Downloads/WOW/scripts/verify-evidence.mjs:60), [verify-evidence.mjs:150](/Users/yevhenii_m1/Downloads/WOW/scripts/verify-evidence.mjs:150).  
   Сценарий: URL `http://127.0.0.1:…`, link-local/private IP либо публичный URL с redirect на такой адрес → еженедельный GitHub runner выполняет GET. Статус и время ответа дают возможность грубого сканирования; GET может вызвать побочный эффект во внутреннем сервисе. Прямой `entry.url` также принимается самим скриптом, хотя тест текущего ledger его запрещает.  
   Минимальное исправление: allowlist точных официальных hostnames, только HTTP(S), запрет credentials/private/link-local/reserved addresses; использовать `redirect: 'manual'` и повторно проверять каждый `Location`.

6. **Important — удалённый ответ и PDF читаются целиком без лимита.**  
   Файл: [verify-evidence.mjs:74](/Users/yevhenii_m1/Downloads/WOW/scripts/verify-evidence.mjs:74).  
   Сценарий: сервер быстро отдаёт гигабайты, compression bomb или небольшой PDF с огромным объёмом распакованных объектов → `arrayBuffer()`, `text()`, `unpdf` и последующая нормализация исчерпывают память/CPU runner. Таймаут 90 секунд ограничивает сеть, но не размер и не CPU после загрузки; 20-минутный job timeout не предотвращает OOM.  
   Минимальное исправление: читать stream со счётчиком и жёстким лимитом декодированных байтов; PDF разбирать в отдельном процессе с memory/time limit. Не удерживать тела всех источников в `pageCache` после обработки.

## Малые

7. **Minor — валидные статусы будут ошибочно показаны как established.**  
   Файл: [search.astro:31](/Users/yevhenii_m1/Downloads/WOW/src/pages/search.astro:31), [search.astro:82](/Users/yevhenii_m1/Downloads/WOW/src/pages/search.astro:82).  
   Сценарий: появляется запись `BETA`, `CHANGED` или `UNCONFIRMED` → фильтра для неё нет, а результат подписывается «История Warcraft». Сейчас контент содержит только `ESTABLISHED` и `FOREVER`, но схема и интерфейс сайта уже поддерживают пять статусов.  
   Минимальное исправление: единый исчерпывающий `Record<LoreStatus, label>` и построение select из `loreStatuses`.

8. **Minor — malformed ledger завершает job без JSON-отчёта.**  
   Файл: [verify-evidence.mjs:103](/Users/yevhenii_m1/Downloads/WOW/scripts/verify-evidence.mjs:103), [verify-evidence.mjs:168](/Users/yevhenii_m1/Downloads/WOW/scripts/verify-evidence.mjs:168).  
   Сценарий: корнем JSON становится object либо `quote` становится числом → `for…of`/`.normalize()` бросает исключение; запись отчёта на строке 200 не происходит, а `if: always()` пытается загрузить отсутствующий файл.  
   Минимальное исправление: валидировать ledger-схему до сети и писать структурированный fatal result через `finally`.

9. **Minor — проверяется формат даты, но не существование даты.**  
   Файл: [content.ts:10](/Users/yevhenii_m1/Downloads/WOW/src/lib/content.ts:10).  
   Сценарий: `2026-99-99`, `2026-02-29` или `0000-00-00` проходят schema → неверная дата публикуется и участвует в лексикографической сортировке журналов.  
   Минимальное исправление: refinement с разбором year/month/day и обратной проверкой компонентов; добавить три отрицательных теста.

10. **Minor — несколько тестов могут пройти, не проверив заявленное.**  
    Файлы:

    - [search.test.ts:48](/Users/yevhenii_m1/Downloads/WOW/tests/search.test.ts:48): `.every()` возвращает `true` для пустого результата. Поломка индекса glossary останется незамеченной. Исправление: проверять точный непустой список ID.
    - [chapter-content.test.ts:68](/Users/yevhenii_m1/Downloads/WOW/tests/chapter-content.test.ts:68): если все status-блоки удалить или изменить их синтаксис, цикл выполнится ноль раз. Исправление: сначала требовать ожидаемое минимальное число блоков.
    - [navigation.spec.ts:5](/Users/yevhenii_m1/Downloads/WOW/tests/e2e/navigation.spec.ts:5): сборщик видит только уже правильные `href="/WOW…"`; ошибочная ссылка `/characters/x`, relative URL, `src` или `srcset` вообще не проверяются. Исправление: разбирать DOM, разрешать все URL через `new URL(value, pageUrl)` и проверять все same-origin HTML и assets.
    - [evidence-ledger.test.ts:95](/Users/yevhenii_m1/Downloads/WOW/tests/evidence-ledger.test.ts:95): тестируется структура текущих данных, но не downloader. Нужны тесты на private redirect, oversized/chunked body, timeout, malformed PDF и `</script>`-сериализацию.

## Производительность: лучший единичный выигрыш

**Minor — главный рисунок главы лениво загружается, хотя является вероятным LCP.**  
Файл: [LoreLayout.astro:29](/Users/yevhenii_m1/Downloads/WOW/src/layouts/LoreLayout.astro:29).  
Сценарий: пользователь открывает главу → браузер откладывает запрос к расположенному сверху изображению → LCP ухудшается.  
Минимальное и наиболее выгодное изменение: только для главной иллюстрации поставить `loading="eager"` и `fetchpriority="high"`. Остальная стратегия хорошая: WebP, варианты 960/1600, `srcset`, размеры 76–220 КБ; общий CSS в имеющемся build — 25 КБ, около 6,7 КБ gzip.

## Проверенные чистые области

- Fork PR получает только `contents: read`; `pull_request_target` нет, secrets не передаются, выражения из PR title/branch не вставляются в shell.
- Deploy действительно manual-only: только `workflow_dispatch`, а build дополнительно ограничен `refs/heads/main`.
- `astro.config.mjs` корректно задаёт `site` и `/WOW`; `.nvmrc` 24 согласован с Astro 7/Vitest 5 и `package.json`.
- `innerHTML` отсутствует; остальные Astro-выводы экранируются. JSON в `data-chapter-ids` безопасно экранирован как HTML-атрибут.
- `localStorage` читается через `try/catch`, значения режимов whitelist-ятся, progress проверяется как массив строк, вывод идёт через `textContent`.
- Timeline sorting/filtering и entity links для schema-valid текущих данных корректны; подтверждённого дефекта stemmer на нынешнем наборе не найдено.
- `--json` может писать по указанному вызывающим пути, но ledger этот аргумент не контролирует, а workflow использует константу `evidence-report.json`; самостоятельной уязвимости path traversal здесь нет.

Файлы не изменялись. Динамический запуск Vitest был заблокирован read-only-средой: Vite попытался создать временный файл в `node_modules/.vite-temp`; это ограничение аудита, не дефект репозитория.