Проверяю все 32 события таймлайна против леджера, источников и официальных текстов. Сначала сниму карту файлов и объявление WoW: Forever.Есть готовый промпт аудита таймлайна — читаю события, леджер, источники и определения эр.Леджер таймлайна почти пустой — основное покрытие в главах. Вытащу все цитаты по `timeline/<id>` и сверю с текстами событий.Bash недоступен — читаю леджеры глав целиком и вытаскиваю цитаты через поиск.Проверил все 32 события против `entryRefs` во всех файлах леджера, `eras.ts`, `sources/core.json` и живых страниц Blizzard по Forever / Forsaken Kingdom / Dragon Aspects / WC3 Story So Far. Цитаты на страницах заново не искал.Цитаты на живых страницах не перепроверял. Forever сверен с [анонсом](https://news.blizzard.com/en-us/article/24302093/carve-a-new-path-with-world-of-warcraft-forever) и [Found Photos](https://news.blizzard.com/en-us/article/24304071/world-of-warcraft-forever-found-photos-panel-recap): старт в early Year 1, после Forsaken Kingdom и до Molten Core, своя time bubble. Покрытие событий — `entryRefs` `timeline/<id>` во всех `docs/research/evidence/*.json` (не только `timeline.json`).

---

### `titans-order-azeroth` — Titans упорядочивают Azeroth
Каркас цитат держится; ломает событие слой космологии.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 5 | «Опасаясь повредить world-soul, titans действуют через созданные конструкты: keepers ведут titan-forged против армий Black Empire.» | Единственный текст слота — космология Dragonflight как факт. WC3 даёт другую картину (titans сами формуют землю и куют Well); расхождение не показано. | «Aggramar feared the Pantheon would irreparably damage or even kill the world-soul. He proposed creating powerful constructs…» (`ch00-world-soul-constructs`). WC3: «For many ages the Titans moved and shaped the earth… the Titans crafted a lake of scintillating energies.» (`ch00-wc3-one-continent`, `ch00-wc3-titans-crafted-well`, без `timeline/` ref). [Dragon Aspects](https://news.blizzard.com/en-us/article/23876527/the-story-so-far-take-wing-through-time-with-the-dragon-aspects) | Пометить ретроспективой Dragonflight и рядом дать версию WC3. |

`sourceIds`: без замечаний.

### `dragon-aspects-empowered` — Proto-dragons становятся Dragon Aspects
Схватка с Galakrond и наделение силой — по цитатам; имя «keeper» и слой — нет.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 5 | всё summary (Galakrond, proto-dragons, Tyr, охрана земель) | Происхождение Aspects из статьи Dragonflight без ярлыка позднего слоя; в Year-1/WC3 этого рассказа нет. | Та же статья; в WC3 драконы появляются уже как помощники в War of the Ancients (`ch01-alexstrasza-flights`). | «в ретроспективе Dragonflight». |
| Minor | 1 | «Под руководством **keeper** Tyr» | В привязанных к событию цитатах Tyr не назван keeper. В той же статье фраза есть, в ledger на этот id не вынесена. | Привязано: «Under Tyr's guidance, the proto-dragons warred with Galakrond.» На той же странице, но не в `entryRefs`: «Aggramar, imparted his strength and courage to **Keeper Tyr**». | Снять «keeper» или добавить цитату в `entryRefs`. |

`sourceIds`: без замечаний. `locationIds: kalimdor` держится («far north of ancient Kalimdor»).

### `highborne-summon-legion` — Highborne открывают путь Burning Legion
Проблем нет. Магия → Sargeras, Azshara впускает, портал в Well, дата «около 10 000» с двумя формулами в `dateNote` — по `ch01-sargeras-drawn`, `ch01-azshara-agreed`, `ch01-portal-in-well`, `ch01-one-continent`, `ch01-bc-ten-thousand`.

### `great-sundering` — Great Sundering
Проблем нет. «Схватка Furion с Azshara ввергает заклинание в хаос» совпадает с `ch01-battle-chaos`; Well, раскол Kalimdor, Maelstrom — с привязанными цитатами.

### `nordrassil-planted` — Nordrassil вырастает на Mount Hyjal
Заточение Illidan и дар Nozdormu держатся; посадка — нет.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 2 | «**драконы сажают** Мировое древо Nordrassil» | Сажает жёлудь только Alexstrasza. Nozdormu зачаровывает уже стоящее древо. | «**Alexstrasza**, the Life-Giver, **placed a single, enchanted acorn** within the heart of the Well of Eternity.» (`ch01-acorn`) | «Alexstrasza сажает жёлудь; древо называют Nordrassil; Nozdormu дарует…» |
| Minor | 1 | title: «Nordrassil **вырастает**» | Росток (*sprung to life as a colossal tree*) в ledger есть (`ch01-acorn-sprung`), но без `timeline/nordrassil-planted`. | `ch01-acorn-sprung` | Добавить ref или оставить «сажает жёлудь / называют Nordrassil». |

### `highborne-exiled` — Изгнание Highborne
Высадка в будущем Lordaeron и имя high elves держатся; вождь и причина изгнания — нет.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 1 | «Highborne **во главе с Dath’Remar**» | Имя не встречается ни в одной цитате с `timeline/highborne-exiled`. | Привязано: «the druids… decided to **exile the reckless high-borne**» (`ch02-exile`). Dath’Remar — `ch02-dathremar-mock` / `ch02-ships`, без timeline-ref. | Снять имя или добавить эти записи в `entryRefs`. |
| Important | 1 | «**не отказываются от магии** и изгнаны» | Привязанные цитаты дают только «reckless» и факт изгнания, не отказ от запрета магии. | Там же; закон друидов — в `ch02-storm` / `ch01-no-magic` без этого ref. | Добавить цитату про закон/магию или «изгнаны за безрассудную магию». |

`dateLabel` «Века после Great Sundering» держится `tl-centuries-passed`.

### `quelthalas-founded` — Основание Quel’Thalas
Проблем нет. Битвы с trolls, Quel’Thalas, Sunwell из украденной воды, `dateNote` про «более девяти тысяч лет» — по `ch02-quelthalas-founded`, `ch02-sunwell`, `ch02-quelthalas-nine-thousand`.

### `troll-wars-arathor` — Союз Quel’Thalas и Arathor
Почти точно; одна лишняя широта.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | 2 | «эльфы учат **людей** магии» | Учат не «людей», а небольшую группу. | «The elves taught **a small number of humans** how to wield magic.» (`ch02-magic-for-aid`) | «учат небольшую группу людей». |

«разрушить опору силы trolls» — точный перевод *power base*. `dateNote` про отсутствие точной даты Troll Wars — ок.

### `war-of-the-three-hammers` — War of the Three Hammers
Факты войны и призыва Ragnaros держатся; дата спорит с собственной `dateNote`.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 7 | `dateLabel`: «**До прихода Horde**»; `dateNote`: «Официальные тексты не датируют эту войну.» | Привязанные цитаты не датируют войну относительно Horde. `dateNote` отрицает датировку, ярлык её ставит. В том же Muradin Horde вторгается уже после войны, но эта фраза не в `entryRefs`. | Привязано: смерть Modimus, War of the Three Hammers, Thaurissan/Ragnaros. Не привязано: «When the orcish Horde invaded Azeroth, Ironforge’s dwarves offered to join the Grand Alliance.» (`ch02-magni-grand-alliance`) | Либо `dateLabel` без Horde, либо привязать цитату Muradin и поправить `dateNote`: нет года, но война раньше вторжения Horde. |

В отличие от гл. 02, summary не ставит призыв *после* конца войны — это не баг таймлайна.

### `horde-corrupted` — Порча orcs на Draenor
Проблем нет. Kil’jaeden → Ner’zhul → ученик/Gul’dan, кровь Mannoroth, жажда крови — `ch03-kiljaeden-nerzhul`, `ch03-draenei-slaughter`, `ch03-mannoroth-blood`.

### `dark-portal-opened` — Открытие Dark Portal
Портал и вторжение держатся; роль Sargeras сдвинута.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 2 | «Sargeras, овладевший Medivh, **помогает Gul’dan**» | Sargeras овладевает Medivh, чтобы развязать войну миров; Medivh заключает сделку с Gul’dan. Это не помощь Gul’dan. Агентность портала в источниках разная (Gul’dan / Medivh / оба) — в summary не отражена (в `dateNote` разобран только 583 год). | «possessed the magus Medivh, intending to… foment a war between worlds»; «Gul’dan would create a gateway»; «gateway **created by Medivh and Gul'dan**»; WC2: «**Medivh’s** unnatural Portals». | «Sargeras через Medivh сговаривается с Gul’dan; портал открывают они вместе» + в `dateNote` разница агентов. |

`approximate: false` на «Начало First War» как относительная метка — ок. `sourceIds` все три используются.

### `stormwind-falls` — Падение Stormwind
Проблем нет. Первый штурм отбит, второй под Doomhammer, Garona/Llane, падение города; `dateNote` честно держит «три года» vs «почти пять лет».

### `alliance-of-lordaeron` — Рождение Alliance of Lordaeron
Проблем нет. Бегство на север и «семь наций впервые за три тысячи лет» — `ch03-fled-north`, `ch02-seven-nations`. «человеческих» читается из того же абзаца SSF про *human kingdoms* (как уже принято для гл. 02).

### `horde-defeated` — Разгром Horde
Проблем нет. Уход Gul’dan к Tomb of Sargeras, гибель Lothar, контратака Turalyon, плен Doomhammer, разрушение портала. «часть Horde» слабее *half* — недосказ, не выдумка.

### `draenor-shattered` — Гибель Draenor
Проблем нет. Повторное открытие, разрыв Draenor, Khadgar уничтожает портал; «Вскоре после Second War» держится `tl-few-months-nethergarde`.

### `internment-and-splintering` — Лагеря и раскол Alliance
Проблем нет. Апатия, налоги, выход Silvermoon/Quel’Thalas, Gilneas и Stromgarde — по привязанным цитатам.

### `thrall-frees-orcs` — Thrall освобождает orcs
Хребет (раб-гладиатор, гибель Doomhammer, вождь) держится; в summary и тегах лишнее.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 7 | `characterIds`: **`grom-hellscream`** | В тексте события и в привязанных цитатах Grom нет. | Привязано: лагеря, раб-гладиатор, Drek’Thar, гибель Doomhammer, новый warchief, «nearly 13 years». `ch05-find-grom` без этого ref. | Убрать id. |
| Minor | 1 | «**Бежавший** раб-гладиатор» | Побег в привязанных цитатах не описан (есть «favored slave and gladiator»). | Побег — `ch05-taretha`, без timeline-ref. | «бывший раб-гладиатор» или добавить цитату. |
| Minor | 2 | «**громит лагеря**» | Привязано: вдохновляет сбросить ярмо и «liberation of **one** camp». Осада лагерей во множественном числе — в `ch05-durnholde-siege` без этого ref. | `ch05-past-decade`, `ch05-doomhammer-fell` | «освобождает orcs / лагеря» без «громит». |

`dateLabel` «почти 13 лет» + `dateNote` про «последнее десятилетие» — оба слоя SSF, ок.

### `plague-of-undeath` — Чума нежити
Чума, смерть Kel’Thuzad, рост Scourge — по 2004 manual. Лишний персонаж.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 7 | `characterIds`: **`uther-the-lightbringer`** | В summary и в привязанных цитатах Uther не участвует. | Привязано: Cult выпускает чуму; Arthas убивает Kel’Thuzad; силы растут. Расследование Uther — `ch06-uther-investigated` без этого ref. | Убрать id. |

### `stratholme` — Stratholme
Сам эпизод переведён точно (`might not yet have been infected`; Jaina уходит). Сбой только в списке источников.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | 6 | `dateNote`: «**Руководство 2004 года** этот эпизод не упоминает» | Источник назван в `dateNote`, но его нет в `sourceIds` (`jaina-hero-week`, `heroes-patch-notes-2018-10-16`). | `world-of-warcraft-2004-manual` | Добавить id в `sourceIds` (как источник отсутствия) либо не называть мануал. |

Это WC3, не Retail-спойлер; `dateNote` честно помечает, что в мануале 2004 эпизода нет.

### `frostmourne-and-fall-of-lordaeron` — Frostmourne и падение Lordaeron
Проблем нет. Northrend, Frostmourne, украденная душа, Uther и Terenas — `ch06-northrend-frostmourne`, `ch06-soul-stolen`, `ch06-terenas-murdered`.

### `fall-of-quelthalas` — Падение Quel’Thalas
Проблем нет. Прорыв к Sunwell, Sylvanas-banshee, Anasterian, Kel’Thuzad-lich.

### `archimonde-summoned` — Призыв Archimonde
Проблем нет. Книга Medivh в Dalaran, призыв, демоны за Scourge в Kalimdor.

### `voyage-to-kalimdor` — Путь в Kalimdor
Факты (пророк ведёт по отдельности; Barrens / Cairne) — по мануалу 2004. Порядок слота — нет.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | 4 | место после `archimonde-summoned` (`sortKey` 230 после 220) | Мануал 2004 рассказывает путь после призыва Archimonde. WC3 / SSF начинают путь Thrall параллельно с чумой. Таймлайн даёт только порядок мануала. | 2004: Medivh «deal with each race separately… to the legendary land of Kalimdor» после сюжета Dalaran. SSF: «As Warcraft III… begins… plague… **Meanwhile**, a young upstart rallies the orcs». | `dateNote`: WC3 идёт параллельно с чумой; мануал 2004 ставит путь после призыва. |

### `blood-curse-ended` — Конец проклятия крови
Проблем нет. Grom убивает Cenarius, затем помогает победить Mannoroth; проклятие кончается. Смерть Grom в summary нет — правильно: в привязанных цитатах её нет.

### `battle-of-mount-hyjal` — Битва за Mount Hyjal
Проблем нет. Medivh сводит Thrall и Jaina; ночные эльфы соединяются; Malfurion уничтожает Archimonde силой Nordrassil; плата бессмертием. «Смертные народы» читается как orcs/люди под Medivh, ночные эльфы — отдельным членом.

### `durotar-and-theramore` — Durotar, Theramore и флот Daelin
Проблем нет. Основание колоний, перемирие, флот Daelin, Jaina помогает победить отца. `eraId: third-war` после Hyjal совпадает с порядком мануала 2004 (до Frozen Throne).

### `forsaken-rise` — Мятеж Forsaken
Проблем нет. Слабеющий Lich King, мятеж Sylvanas, руины столицы, оплот под ними.

### `arthas-becomes-lich-king` — Arthas становится Lich King
Проблем нет. Приказ Kil’jaeden, Arthas первым у Frozen Throne, слияние с Ner’zhul.

### `forsaken-kingdom` — Forsaken Kingdom
Текст кампании совпадает с [What’s Next](https://news.blizzard.com/en-us/article/24302500/warcraft-iii-reforged-forsaken-kingdom-what-s-next-panel-recap); место на шкале — нет.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 4 / 7 | `sortKey` 290 **после** `forsaken-rise` (270) и `arthas-becomes-lich-king` (280); summary: «между **возвращением Arthas в Lordaeron** и **появлением Undercity**» | Слот стоит после того, как Forsaken уже заняли столицу и построили оплот, и после превращения Arthas в Lich King. Пролог кампании — возвращение Arthas (= `frostmourne-and-fall-of-lordaeron`, 200); конец окна — появление Undercity (= `forsaken-rise`). `dateLabel` («четыре года между WC3 и WoW») берёт вторую половину той же цитаты и тянет событие к Year 1. | «explores the events **between Arthas's return to Lordaeron and the emergence of the Undercity**, filling in the four-year gap between Warcraft III and World of Warcraft.» (`ch07-fk-four-year-gap`) | Либо сдвинуть `sortKey` в окно 200–270 и смягчить `dateLabel`, либо переписать summary под «кампания закрывает четырёхлетний разрыв» и не утверждать конец в «появлении Undercity». |

`sourceIds`: без замечаний. Garek / Anya — по `ch06-fk-heroes`.

### `gnomeregan-lost` — Потеря Gnomeregan
Проблем нет. Troggs, радиация по приказу Mekkatorque, ~80 %, бегство в Ironforge; «недавно» → «Незадолго до первого года».

### `varian-missing` — Исчезновение Varian Wrynn
Проблем нет. Пропал при подозрительных обстоятельствах по пути в Theramore; ребёнок-король Anduin.

### `forever` — Вы здесь: World of Warcraft: Forever
Факты совпадают с анонсом и Found Photos.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | 7 | `dateLabel`: «Year 1»; `approximate`: **false** | Источник говорит **early** Year 1. | «in the **early “Year 1”** period of Azeroth, before Kazzak reopened the Dark Portal» (`ch00-forever-year-one`) | `dateLabel` «Ранний Year 1» или `approximate: true`. |

После Forsaken Kingdom, до Molten Core, time bubble — по `ch03-forever-start` и `ch00-forever-time-bubble`. Kazzak/Dark Portal и Northrend даны как граница «до», не как текущее состояние. `sourceIds` оба используются.

---

**Итог:** критических выдуманных событий, ложных дат Forever и Retail-спойлеров как «сейчас» нет. Чинить в первую очередь: слой Dragonflight в двух прологовых слотах без ярлыка; «драконы сажают» Nordrassil; Dath’Remar и отказ от магии без `entryRefs`; «Sargeras помогает Gul’dan»; `sortKey` Forsaken Kingdom после Undercity/Lich King; лишние `grom-hellscream` и `uther-the-lightbringer`.