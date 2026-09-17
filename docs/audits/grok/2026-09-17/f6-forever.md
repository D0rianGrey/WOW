Начинаю с инвентаризации всех 11 статей Forever, леджера доказательств и официальных анонсов Blizzard — без опоры на память.Читаю все 11 статей, леджер и схему контента параллельно с официальными страницами Blizzard.Дальше сверю леджер целиком с официальными страницами и связанными доказательствами из других файлов.Дальше сверю оставшиеся официальные страницы и все связанные записи леджера — особенно даты, рейды и формулировки сравнения.Сверил все 11 карточек с `docs/research/evidence/*.json` (не только `forever.json`) и с живыми страницами Blizzard от 2026-09-17. Цитаты на страницах заново не искал; даты, формулировки Forever и расхождения официальных текстов проверял по самим анонсам.

---

## `time-bubble-year-1`

**Вердикт:** проблем нет. Year 1 (Arthas / Kel’Thuzad / Tirisfal), time bubble, «постоянный дом» рядом с modern и Classic, отказ от режима/сезона/новой Classic, отсутствие полётов и level scaling — все закрыты помеченными цитатами. Даты запуска в карточке нет; слой Retail не выдаётся за текущее состояние.

---

## `forsaken-kingdom`

**Вердикт:** каркас кампании держится; в `whyItMatters` лежит сюжет, а пролог склеен с героями основной кампании.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | FOREVER COMPARISON | «как возник Undercity, как Forsaken создали собственную культуру и почему Scourge не вернул себе Lordaeron» | Это факты анонса, не обоснование значимости. По правилу поля они должны быть в `foreverVersion`. | «Through Garek and Anya, players will learn how the Undercity was established, how the Forsaken formed their own culture and community, why the Scourge did not reclaim Lordaeron…» (`ch06-fk-themes`) | Перенести в `foreverVersion`; в `whyItMatters` оставить, зачем этот разрыв важен энциклопедии |
| Minor | OVERSTATED | «Пролог Last Days of Lordaeron из четырёх миссий начинается с возвращения Arthas домой, а в центре истории — новые персонажи Garek Bandarion … и Dark Ranger Anya» | Союз «а» читается так, будто Garek и Anya — центр пролога. В источнике пролог — глазами Capital City Guard; герои названы в блоке основной кампании. | «The four-mission Last Days of Lordaeron prologue begins as Arthas returns home. Players experience the kingdom’s final hours through the eyes of the Capital City Guard» / «At the heart of the story are two new characters—Garek Bandarion…» | Развести два предложения: пролог отдельно, Garek и Anya — основная кампания |

Четырёхлетний разрыв, доступность кампании и «Forever вскоре после» совпадают с живыми страницами What’s Next, Deep Dive и Wage War.

---

## `forsaken-paladins`

**Вердикт:** классы 2004 и недоверие закрыты; два конкретных факта в `foreverVersion` не привязаны к этой карточке в ledger, хотя на живой странице Found Photos они есть.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | UNSUPPORTED | «сами они ещё учатся направлять Light в нежизни» | Для `forever/forsaken-paladins` помечен усечённый `fv-40` (только mistrust). Полная фраза есть в `ch06-forsaken-paladins`, но `entryRefs` там — `characters/uther-the-lightbringer`. | Ledger `fv-40`: «…deeply mistrusted by other Forsaken». Живая страница: «…and still learning what it means to channel the Light in undeath.» [Found Photos](https://news.blizzard.com/en-us/article/24304071/world-of-warcraft-forever-found-photos-panel-recap) | Дописать цитату в `fv-40` или добавить `forever/forsaken-paladins` в `entryRefs` полной записи |
| Important | UNSUPPORTED | «На 60 уровне паладины Alliance получают эпического скакуна во имя Redemption, а Forsaken — во имя Retribution» | `fv-42` начинается с «Whereas Alliance paladins…» и не содержит level 60. Полная цитата — в `ch06-retribution`, но `entryRefs` — только `locations/bandarion-keep`. Плюс «На 60 уровне» в русском относится и к Alliance; в источнике level 60 вводит квест Forsaken. | Ledger `fv-42` без «At level 60». Живая страница: «At level 60, Forsaken paladins will also embark on their own epic mount quest. Whereas Alliance paladins…» [Found Photos](https://news.blizzard.com/en-us/article/24304071/world-of-warcraft-forever-found-photos-panel-recap) | Привязать полную цитату к этой карточке; «на 60 уровне» оставить у Forsaken |

`whyItMatters` про отдельность героя Warcraft III — редакционное предостережение, не факт мира; не считал ошибкой. Список `sourceIds` совпадает с используемыми источниками.

---

## `race-class-combinations`

**Вердикт:** проблем нет. Шесть закрытых сочетаний 2004, Horde-only Shaman / Alliance-only Paladin и список Deep Dive («Gnome Priest, Human Hunter, Dwarf Shaman, Orc Mage, Troll Warlock, and Undead Paladin, with more planned for future updates») совпадают с помеченными цитатами и живой страницей [Deep Dive](https://news.blizzard.com/en-us/article/24303313/world-of-warcraft-forever-deep-dive-panel-recap).

---

## `skyborne`

**Вердикт:** происхождение и классовый раскол верны; имена путей и тезис про «решение народа» сидят не в том поле / сильнее источника.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | FOREVER COMPARISON | «Официальная страница Forever называет два пути — Windshaper Horde и High Order Alliance» | Это факт анонса (`fv-49`), его нет в `foreverVersion`. Поле `whyItMatters` не должно добавлять факты. | «Follow the path of the Windshaper Horde or the High Order Alliance in your quest to defend Zephras Isle.» [хаб Forever](https://worldofwarcraft.blizzard.com/en-us/forever) | Перенести имена путей в `foreverVersion` |
| Minor | OVERSTATED | «Выбор фракции — современное решение народа, а не доказательство того, что древние изгнанники уже принадлежали Horde или Alliance» | Источник говорит о выборе игрока на создании персонажа и о разных видениях будущего. «Решение народа» и отрицание древней принадлежности — домысел. | «At character creation, you’ll choose whether your Skyborne joins the Horde or the Alliance» (`fv-47`) | «Фракция выбирается при создании персонажа; это не сказано как древняя принадлежность изгнанников» |

Восемь рас 2004, shen’dorei, бегство из Eldre’Thalas в Skywall, Shaman/Mage и Warrior/Hunter/Rogue/Druid — совпадают с ledger и What’s Next.

---

## `zephras-isle`

**Вердикт:** стартовая зона 1–12, пилоны и три группы на острове верны; хук про духов ветра и «своя зона у каждой расы» не держатся.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | UNSUPPORTED | «Стартовая зона Skyborne — остров, который держат духи ветра» | Якорение духами ветра есть только в `fv-46` с `entryRefs` `forever/skyborne`, не `forever/zephras-isle`. Для этой карточки помечены 1–12, Skywall-архитектура, benefactors/pylons и три группы. | `fv-46` (чужой ref): «…found refuge in Skywall, where wind spirits anchored their island home in the elemental plane.» | Либо добавить `forever/zephras-isle` в `fv-46`, либо убрать духов из summary |
| Minor | OVERSTATED | «у каждой расы была своя стартовая зона» | Тот же мануал 2004, который карточка цитирует для ночных эльфов, даёт общие зоны: dwarves и gnomes — Coldridge Valley; orcs и trolls — Valley of Trials. | `fv-07`/`fv-08`, `fv-11`/`fv-12` | «у рас были назначенные стартовые зоны; ночные эльфы, например, начинали в Shadowglen» |
| Minor | FOREVER COMPARISON | «Доступ к расе и стартовой зоне входит в наборы улучшений Forever» | Коммерческий факт (`fv-53`) только в `whyItMatters`. | «Access to the new Skyborne race and their Zephras Isle starting experience» ([предзаказ](https://news.blizzard.com/en-us/article/24301508/pre-purchase-world-of-warcraft-forever-upgrades-and-begin-your-next-journey-in-azeroth); на хабе — Heroic Pack или выше) | Перенести в `foreverVersion` |

Кризис покровителей, отказ пилонов, Windshapers / High Order / Al’Aketh — совпадают с Found Photos.

---

## `mount-hyjal-aftermath`

**Вердикт:** последствия Archimonde, Darkwhisper Gorge и угрозы на склонах верны; в `oldExpectation` попал язык Forever.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | FOREVER COMPARISON | «Blizzard называет Hyjal местом, куда игроки давно хотели попасть» | Это формулировка Found Photos про контент Forever, а не состояние первого года 2004–2005. Year 1 в той же строке уже закрыт: битва в прошлом, Archimonde уничтожен. | «Anticipated: Places players have long known about or wanted to explore, such as Mount Hyjal.» (`fv-54`) | Убрать из `oldExpectation`; при желании — в `foreverVersion` |
| Minor | UNSUPPORTED | «новые фракции, имена которых пока не объявлены» | Источник: «meet emerging factions». Что имена не объявлены — вывод из молчания, в ledger этого нет. На What’s Next / Found Photos / хабе имён нет, но утверждать «пока не объявлены» карточка не вправе. | «…meet emerging factions, form alliances…» (`fv-57`) | «встретят emerging factions» без мета-фразы про имена |

Cataclysm-Hyjal в текст не протащен. Угрозы «old and new» на склонах совпадают с [хабом](https://worldofwarcraft.blizzard.com/en-us/forever).

---

## `shendralas`

**Вердикт:** две официальные локации и связь с Shen’dralar / Eldre’Thalas / Dire Maul / кентаврами даны правильно; `oldExpectation` частично говорит языком Forever.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | FOREVER COMPARISON | «В оригинальном мире такой области не было: Found Photos называет Shen’dralas новой областью» | Первая половина — Year 1; вторая — цитата анонса Forever внутри `oldExpectation`. | «…the addition of Shen’dralas opens a fresh, new area…» (`fv-60`) | `oldExpectation`: зоны с таким именем в оригинальном мире не было. Ссылку Found Photos оставить в `foreverVersion` (она там уже есть) |

Расхождение «три новые зоны» (Opening Ceremony) vs четыре места в What’s Next честно вынесено в `sourceNote`. Разведение Shen’dralas / Shen’dralar / shen’dorei — редакционное, не выдумка.

---

## `riverglades`

**Вердикт:** география, размер, порт и группы верны; «первый пример» сильнее источника и сидит в `whyItMatters`.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | OVERSTATED + FOREVER COMPARISON | «Blizzard называет Riverglades первым крупным примером «нового, но знакомого» содержания» | Источник: *one of our first*, не the first. Плюс это факт анонса в `whyItMatters`. | «The Riverglades is one of our first major examples of “new, but familiar” content» (`fv-64` / Found Photos) | «одним из первых крупных примеров»; при необходимости перенести в `foreverVersion` |

150 vs «почти 200» заданий энциклопедия не выбирает — правильно. Соседи Burning Steppes / Redridge / Swamp of Sorrows / Badlands, Powderfuse Port и Steamwheedle, Powderfuse goblins / Twilight’s Hammer / Brotherhood of the Horse — совпадают с помеченными цитатами. Хаб отдельно называет «Eastern Kingdom»; в ledger этой карточки этой фразы нет, но континент следует из перечисленных зон — отдельной ошибкой не считал.

---

## `dungeons-and-raids`

**Вердикт:** девять имён подземелий сходятся с What’s Next; сравнение и счёт рейдов сломаны.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | FOREVER COMPARISON | «Forever начинается до Molten Core.» | `oldExpectation` описывает рамку Forever, а не первый год 2004–2005 (там Molten Core как раз был). | «Set after the events of Warcraft III Reforged: Forsaken Kingdom and before Molten Core» ([анонс](https://news.blizzard.com/en-us/article/24302093/carve-a-new-path-with-world-of-warcraft-forever), `fv-29`) | В `oldExpectation` — рейды/данжи первого года (в т.ч. Molten Core). «До Molten Core» — в `foreverVersion` |
| Important | OVERSTATED / не показан спор источников | «Для групп объявлены Barrow Deeps — испытание максимального уровня для 10 игроков — и рейд Hyjal Summit на 20 игроков» | What’s Next зовёт оба «raid encounters», Barrow Deeps — «10-player challenge», Hyjal Summit — 20-player raid. Opening Ceremony, который висит в `sourceIds` и в `fv-65`, считает **два новых рейда**. В `foreverVersion` только формулировка What’s Next; summary говорит «два рейда», тело — как будто рейд один. Для зон такой спор в `sourceNote` есть, для рейдов — нет. | «nine new dungeons, two new raids» ([Opening Ceremony](https://news.blizzard.com/en-us/article/24301453/everything-announced-at-blizzcon-2026-opening-ceremony)); «Hyjal Summit and the Barrow Deeps set the stage for raid encounters… The Barrow Deeps is planned as a maximum-level 10-player challenge, while Hyjal Summit will bring 20-player raid encounters» ([What’s Next](https://news.blizzard.com/en-us/article/24303862/world-of-warcraft-forever-whats-next-panel-recap)) | Как с зонами: дать оба счёта. 9 декабря рейдов — верно |
| Important | FOREVER COMPARISON | «Forsaken возвращают Ruins of Lordaeron, в Dalaran творятся странные магические неполадки…» | Сюжетные зарисовки данжей (`fv-69`) добавлены в `whyItMatters`. | «from helping the Forsaken reclaim the Ruins of Lordaeron to investigating strange magical trouble in Dalaran…» | Перенести в `foreverVersion` |

Список девяти данжей (Hall of Thanes … Shaper’s Terrace) совпадает с What’s Next слово в слово. Наблюдений с беты нет.

---

## `announced-schedule`

**Вердикт:** живые даты сходятся; у окна имён снята единственная официальная метка пояса.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | FOREVER COMPARISON (точность расписания) | «Предварительный выбор имён: с 27 октября по 3 ноября 2026 года» | В предзаказе окно помечено PST, расхождения PDT/PST нет (в отличие от запуска и беты). Карточка поясняет пояса у запуска/беты и молчит здесь. | «Early Name Reservation will be available from October 27 through November 3, 2026, PST» ([предзаказ](https://news.blizzard.com/en-us/article/24301508/pre-purchase-world-of-warcraft-forever-upgrades-and-begin-your-next-journey-in-azeroth)) | «с 27 октября по 3 ноября 2026 года, PST» |

Проверено по живым страницам (2026-09-17):

- Бета: 17 сентября — 21 октября 2026 (предзаказ — PST; Collector’s Edition — PDT) — `sourceNote` это честно фиксирует.
- Запуск: 4 ноября 2026, 15:00; на [анонсе](https://news.blizzard.com/en-us/article/24302093/carve-a-new-path-with-world-of-warcraft-forever) один раз PDT, ниже и в предзаказе/What’s Next — PST. Зонтичное «тихоокеанское время» плюс `sourceNote` — правильная обработка спора.
- Новые рейды: 9 декабря — What’s Next.
- Hardcore после запуска — Deep Dive.

`oldExpectation`: «Не применимо» для `kind: schedule` — не ошибка. Наблюдений с беты в фактах нет.

---

## Сводка

Существенных ложных дат Forever и подмены Year 1 поздним Retail нет. Повторяющийся сбой полей: факты анонса уезжают в `whyItMatters`, а в `oldExpectation` дважды попадает рамка Forever (Molten Core, «игроки давно хотели Hyjal»). Единственный спор официальных текстов, который карточки *не* показывают так же явно, как 3 vs 4 зоны и PDT/PST, — **два рейда** vs **Barrow Deeps как 10-player challenge**. Самый жёсткий пробел ledger — у Forsaken paladins: Light в нежизни и «на 60 уровне» на живой Found Photos есть, к `forever/forsaken-paladins` не привязаны.