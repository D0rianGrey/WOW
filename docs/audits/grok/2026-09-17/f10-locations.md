Проверяю все локации против леджера и официальных источников. Сначала сниму карту файлов и правило Year-1.Читаю все 15 локаций, леджер и источники параллельно.Собираю все `entryRefs` локаций в леджере и параллельно проверяю анонс Forever.Вытащу все записи леджера по локациям и сверю цитаты с текстами.Достаю остальные записи леджера по локациям из глав и forever.json.Сверил все 15 досье в `src/content/locations/` с `entryRefs` по всему леджеру (`dossiers.json`, главы, `forever.json`) и с живыми страницами Blizzard (анонс Forever, What’s Next, Found Photos, Story So Far, Burning Crusade Classic). Цитаты на страницах заново не искал. Выдуманного лора Forever нет. Критических фальсификаций нет.

---

### `azeroth` — есть проблемы (слой и неполная древность)

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | SPOILER / LAYER | «мир, который упорядочивали titans, опасаясь повредить его world-soul» | Это язык Dragonflight, без пометки позднего слоя. Глава 00 как раз разводит эту редакцию и мануал Warcraft III. Здесь world-soul выдана за текущее описание мира. | Ledger `ds-r2-36`: *«Aggramar feared the Pantheon would irreparably damage or even kill the world-soul»*. Источник в `core.json`: «Dragonflight-era cosmology… Later layer.» Глава 00: *«Ретроспектива о Dragon Aspects написана в эпоху Dragonflight и говорит поздним языком: world-soul»*. | Пометить как позднюю ретроспективу Dragonflight, как в главе 00. |
| Important | OVERSTATED | Тот же абзац как единственная древность | Официальные тексты расходятся: мануал WC3 — titans долго придавали форму земле и выковали Well of Eternity; поздний текст — страх повредить world-soul. Правило энциклопедии: показать обе версии. В досье есть `warcraft-iii-manual`, но WC3-версия не приведена. | Ledger `ch00-wc3-titans-crafted-well` (не привязан к этой локации, но это официальный текст того же источника): *«At the continent’s center, the Titans crafted a lake of scintillating energies»*. | Дать обе редакции, как в главе 00. |
| Minor | RELATIONS | `relatedLocationIds: northrend` | В тексте и в цитатах с `locations/azeroth` Northrend нет. Forever-абзац называет Eastern Kingdoms и Kalimdor. | `ds-r2-45`: *«The Eastern Kingdoms and Kalimdor still hold mysteries…»* | Убрать `northrend`. |

Каркас Year 1 (восемь рас, две фракции, «чёрно-белого деления больше нет», Sundering → несколько континентов, Forever на исходных континентах) цитатами закрыт. `sourceIds` совпадают с текстом.

---

### `bandarion-keep` — одна мелочь

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | RELATIONS | alias `Bandarion` | Официальное имя крепости — Bandarion Keep. Короткое «Bandarion» — фамилия Garek Bandarion, не имя места. | *«Bandarion Keep in the Whispering Wood of Tirisfal Glades becomes a key location»* ([Found Photos](https://news.blizzard.com/en-us/article/24304071/world-of-warcraft-forever-found-photos-panel-recap)) | Убрать alias или оставить полное имя. |

Путь паладинов, недоверие, Keep как ключевое место, скакун 60 уровня во имя Retribution — по леджеру. Источник один и он используется.

---

### `durotar` — есть проблемы

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | UNSUPPORTED | «после предательства Zalazane» | Имя Zalazane есть в *claim* `ds-r2-55` и в `ch05-zalazane`, но ни одна цитата с `entryRefs: locations/durotar` его не содержит. | Привязанная цитата `ds-r2-55`: *«Forced to flee from their island holdings, the Darkspears created the fishing village of Sen’jin on the Durotar coast»*. Полная фраза про Zalazane — в `ch05-zalazane`, без этого entryRef. | Привязать `ch05-zalazane` к локации или убрать имя. |
| Important | RELATIONS | alias `Orgrimmar` | Orgrimmar — город в Durotar, не другое имя земли. | `ds-r2-54`: *«Built within a huge, winding canyon in the harsh land of Durotar, Orgrimmar stands as…»* | Убрать из aliases. |
| Important | OVERSTATED | «Durotar — сердце Horde, с которой Forever начинает свою историю» | Forever начинается в Year 1 по всему исходному миру; Valley of Trials — один из стартов. | [Found Photos](https://news.blizzard.com/en-us/article/24304071/world-of-warcraft-forever-found-photos-panel-recap): *«Whether players begin in the Valley of Trials, Shadowglen, or another starting area»* | «один из стартов Horde в Year 1 Forever». |
| Minor | RELATIONS | `relatedCharacterIds: orgrim-doomhammer` | В тексте и привязанных цитатах человека Orgrim нет (есть только город Orgrimmar). | Привязанные цитаты называют Thrall, Durotan, Orgrimmar, Echo Isles, Sen’jin, Valley of Trials. | Убрать `orgrim-doomhammer`. |
| Minor | OVERSTATED | «одна из самых могучих воинских столиц» | Источник: warrior *cities*, не capitals. | *«one of the mightiest warrior cities in the world»* | «воинских городов». |

Имя Durotar, tauren, Orgrimmar в каньоне, Echo Isles, Sen’jin, Valley of Trials для orcs и trolls — закрыты. `sourceIds` в порядке.

---

### `kalimdor` — есть проблемы

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | OVERSTATED | «Древний континент ночных эльфов» | Сводит Kalimdor к ночным эльфам. Мануал WC3: один континент, «a number of disparate races»; ночные эльфы — один из народов. | `ch01-kalimdor-well` (к этой локации не привязан): *«That land mass, known as Kalimdor, was home to a number of disparate races and creatures»*. | «древний континент, где жили ночные эльфы» / убрать притяжательность. |
| Important | OVERSTATED | «новую область Shen’dralas между Mulgore и Desolace» | Два официальных описания места. Досье `shendralas.md` даёт оба; здесь только What’s Next. | What’s Next: *«a long-hidden mystery between Mulgore and Desolace»*. Found Photos: *«South of Desolace through the Valley of Bones»*. | Как в `shendralas.md`: обе формулы. |
| Minor | OVERSTATED | «повёл Horde и Alliance» | Цитата: each race, не фракции Year 1. | `ds-r2-43`: *«deal with each race separately… to the legendary land of Kalimdor»* | «повёл народы по отдельности» / Horde Thrall и людей Jaina. |
| Minor | OVERSTATED | «tauren заняли Mulgore» | В цитате — племя Bloodhoof Cairne, не tauren вообще. | `ds-r1-95`: *«Cairne and his Bloodhoof tribe were able to… claim the grasslands of Mulgore»* | «племя Bloodhoof заняло Mulgore». |
| Minor | OVERSTATED | «построили Theramore на юге континента» | Город — у восточного берега Dustwallow Marsh, не на южной суше. | `ds-r1-28`: *«Off the eastern coast of Dustwallow Marsh, they built the rugged port city of Theramore»* | «у восточного берега Dustwallow Marsh на юге Kalimdor». |

Medivh, финальная битва, потрясшая континент, Durotar, Teldrassil, Hyjal aftermath — закрыты. `sourceIds` совпадают; `related*` кроме спорного summary ночных эльфов текстом и цитатами держатся.

---

### `lordaeron` — есть проблемы

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | RELATIONS | alias `Plaguelands` | Plaguelands — регион внутри разорённого королевства (в тексте: Kel’Thuzad *в Plaguelands*), не имя Lordaeron. | `ds-r2-20`: *«Kel’Thuzad, commands the Scourge in the Plaguelands»* | Убрать alias. |
| Minor | UNSUPPORTED | «к его королю бежали выжившие Stormwind» | Привязанная цитата — «they sought support», без Stormwind. Имя беженцев есть на той же странице и в `ch03-lothar-retreat`, но не в entryRefs этой локации. | `ch04-mighty-lordaeron`: *«There, they sought support from the sovereign of the mighty human kingdom of Lordaeron»*. Соседнее предложение [Story So Far](https://news.blizzard.com/en-gb/article/23229617/warcraft-iii-the-story-so-far): *«Lothar and the survivors of Stormwind’s siege fled north»*. | Привязать цитату с Stormwind или написать «беженцы». |
| Minor | UNSUPPORTED | «семь человеческих государств» | В леджере — Seven nations. «Human kingdoms» есть на той же странице строкой выше, в реестр не внесено. | Ledger: *«Seven nations united… Alliance of Lordaeron»*. Страница: *«summoned the leaders of the human kingdoms»*. | Расширить цитату или убрать «человеческих». |
| Minor | OVERSTATED | «Кампания Forsaken Kingdom показывает последние дни Lordaeron» | Last Days of Lordaeron — пролог из четырёх миссий; привязанная цитата описывает разрыв от возвращения Arthas до Undercity. | `ch07-fk-four-year-gap`: *«explores the events between Arthas's return to Lordaeron and the emergence of the Undercity»*. Пролог — в `fv-34`, без entryRef локации. | «пролог Last Days of Lordaeron и годы до появления Undercity». |

Падение под Lich King, Forsaken в столице, Kel’Thuzad в Plaguelands, Forsaken только в Tirisfal, Scarlet Crusade, Ruins of Lordaeron как данж Forever — закрыты. `sourceIds` в порядке.

---

### `mount-hyjal` — есть проблемы

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | UNSUPPORTED | «драконы посадили здесь Мировое древо Nordrassil» | Ни одна цитата с `locations/mount-hyjal` не говорит, что драконы посадили древо. Имеется имя Nordrassil и то, что Hyjal уцелел. В WC3 жёлудь кладёт Alexstrasza; эта запись к локации не привязана. | Привязано: *«they found that the holy mountain, Hyjal, had survived»*; *«named their World Tree, Nordrassil»*. Посадка: `ch01-acorn` *«Alexstrasza… placed a single, enchanted acorn»* — без этого entryRef. | «на Hyjal выросло Nordrassil» и/или привязать цитату про жёлудь; не «драконы посадили». |
| Important | OVERSTATED | «смертные народы объединились, чтобы защитить древо» | Привязанная цитата — ночные эльфы Malfurion и Tyrande согласились объединиться. Союз с людьми/орками в других записях к этой локации не привязан. | `ds-r2-48`: *«the night elves, led by Malfurion and Tyrande, agreed that they must unite if they hoped to defend the World Tree»* | «ночные эльфы решили объединиться, чтобы защитить древо» — или привязать цитаты про Thrall/Jaina. |
| Minor | RELATIONS | `relatedCharacterIds: illidan-stormrage` | В тексте и привязанных цитатах Illidan не появляется. | Привязанные цитаты: Hyjal уцелел, Nordrassil, Malfurion/Tyrande, Archimonde, Darkwhisper Gorge, Hyjal Summit. | Убрать Illidan. |

Священная гора, победа Malfurion силой Nordrassil, плата бессмертием, Forever-зона, Darkwhisper Gorge, рейд Hyjal Summit на 20 — закрыты и совпадают с [What’s Next](https://news.blizzard.com/en-us/article/24303862/world-of-warcraft-forever-whats-next-panel-recap). `sourceIds` в порядке.

---

### `northrend` — одна мелочь

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | UNSUPPORTED | «у Frozen Throne он слился с Ner’zhul» | Слияние в шлеме привязано; Frozen Throne в цитатах этой локации нет (`ch07-arthas-throne` к ней не привязан). | `ds-r1-06`: *«Arthas placed the unimaginably powerful helm on his head, and Ner’zhul and Arthas’ spirits fused»* | Убрать «у Frozen Throne» или привязать цитату. |

Арктика, чума → Frostmourne, Lich King, слух про цитадель Icecrown, Forever до походов в Northrend — закрыты. «Цитадель Icecrown» здесь — формулировка мануала 2004, не рейд Wrath. `sourceIds` в порядке.

---

### `quelthalas` — есть проблемы

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | UNSUPPORTED | «основанное изгнанниками из Kalimdor» | Привязанная цитата: изгнанные high elves высадились на берегах Lordaeron. Kalimdor в entryRefs локации нет. | `ch02-quelthalas-founded`: *«the exiled high elves landed on the shores of Lordaeron»* ([BC Story So Far](https://news.blizzard.com/en-gb/article/23679744/burning-crusade-classic-the-story-so-far)) | Убрать «из Kalimdor» или привязать цитату изгнания Highborne. |
| Important | OVERSTATED | «изгнанные Highborne основали Quel’Thalas» | После изгнания их называют high elves; королевство основали уже high elves. Так же в главе 02 энциклопедии. | *«the exiled high elves… established the kingdom of Quel'Thalas»*; `ch02-high-elves-name`: *«Forever after, they would be known only as the “high elves.”»* | «изгнанные high elves основали Quel’Thalas». |
| Important | RELATIONS | `relatedCharacterIds: sylvanas-windrunner` | В тексте и привязанных цитатах Sylvanas нет (есть Arthas и Kel’Thuzad). | Привязано: основание, Sunwell, отзыв верности, вторжение Arthas, останки Kel’Thuzad, две версии населения. | Убрать Sylvanas или добавить её в текст с цитатой. |
| Minor | OVERSTATED | «к уходу Scourge… не осталось ни одного живого эльфа» | Источник: к моменту, когда Arthas и армия мёртвых повернули на юг — не «уход Scourge» как оставление королевства. | `ds-r2-57`: *«By the time Arthas and his army of the dead turned southward, not one living elf remained»* | «когда Arthas повернул на юг». |

Две версии населения (мануал 2004 vs поздняя ретроспектива) разведены правильно. Sunwell, отзыв верности после Second War, погружение останков Kel’Thuzad — закрыты. Forever действительно не описывает Quel’Thalas (нет ни на What’s Next, ни на Found Photos). `sourceIds` в порядке.

---

### `riverglades` — одна важная перетяжка

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | OVERSTATED | «первым крупным примером «нового, но знакомого» содержания» | Источник: *one of our first major examples*, не единственный первый. | `ds-r2-65`: *«one of our first major examples of “new, but familiar” content»* ([Found Photos](https://news.blizzard.com/en-us/article/24304071/world-of-warcraft-forever-found-photos-panel-recap)) | «одним из первых крупных примеров». |

Связь с Burning Steppes / Redridge / Swamp of Sorrows / Badlands, недоступность, Powderfuse / Twilight’s Hammer / Brotherhood of the Horse, Powderfuse Port и маршрут Steamwheedle, размер ≈ Stranglethorn — закрыты. «Новые» в русском относится к гоблинам Powderfuse, не ко всем трём группам — это верно. `sourceIds` в порядке.

---

### `shendralas` — проблем нет

Оба официальных места, связь с Eldre’Thalas / Shen’dralar / Dire Maul / кентаврами, статус новой области — совпадают с леджером и живыми страницами. Исходы сюжета не додуманы. `sourceIds` совпадают с текстом.

---

### `stormwind` — мелкие дыры в цитатах

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | UNSUPPORTED | «В First War» | Имени First War в привязанных цитатах нет. Story So Far описывает падение без этого ярлыка. | `ch03-lothar-retreat`: *«the city fell to the might of the Horde»* | «в войне орков и людей» / привязать цитату с First War. |
| Minor | UNSUPPORTED | «увёл выживших через Great Sea на север» | Great Sea в цитате есть; «на север» — соседнее предложение той же страницы, в леджер не внесено. | Ledger: *«retreated… across the Great Sea»*. Страница: *«fled north»*. | Убрать «на север» или расширить цитату. |
| Minor | OVERSTATED | «отправная точка Alliance в первый год Forever» | Столица без Varian — да; старт Alliance в Forever — не один Stormwind (Northshire, Coldridge, Shadowglen…). | Found Photos: *«Valley of Trials, Shadowglen, or another starting area»* | «столица Alliance в Year 1 Forever, без Varian». |

Падение, Lothar, отстройка после Second War, «marvel of human design», ребёнок-король, пропажа Varian по пути в Theramore, армии на дальних фронтах — закрыты. `sourceIds` в порядке.

---

### `teldrassil` — одна путаница имён

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | RELATIONS | alias `Darnassus` | Darnassus — город в ветвях, не другое имя древа. В теле так и написано. | `ds-r2-59`: *«Among the twilight boughs of the colossal tree, the wondrous city of Darnassus took root»* | Убрать из aliases. |

Потеря бессмертия, Fandral, посадка у штормового побережья, Darnassus, отсутствие благословения и порча Legion, Tyrande, Shadowglen, Hyjal как зона aftermath — закрыты. `sourceIds` в порядке.

---

### `tirisfal-glades` — проблем нет

Призрачные леса, Undercity под ними, Forsaken заняли руины столицы, держат только Tirisfal, Deathknell, Bandarion Keep в Whispering Wood — всё с привязанными цитатами. `sourceIds` и связи оправданы.

---

### `undercity` — проблем нет

Скрытый лабиринт под Tirisfal, замысел Arthas и брошенный «budding city», оплот Forsaken, правление Sylvanas, обещание кампании про основание, Forever вскоре после Forsaken Kingdom — закрыты. `sourceIds` совпадают.

---

### `zephras-isle` — одна сжатая хронология

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | OVERSTATED / CHRONOLOGY | «нашли убежище в Skywall после War of the Ancients» | Источник: бежали после войны и *eventually* нашли убежище. «После» склеивает бегство и приход в Skywall в один шаг. | `ds-r2-32`: *«rebels who fled Eldre’Thalas after the War of the Ancients and eventually found refuge in Skywall»* | «бежали после войны и со временем нашли убежище в Skywall». |

Остров духов ветра, небесный оазис, кризис покровителей и пилонов, спор Windshapers / High Order / Al’Aketh, старт 1–12 и архитектура Skywall — закрыты и совпадают с Found Photos, What’s Next и хабом. `sourceIds` и фракционные связи оправданы.

---

**Итог.** Чистые: `shendralas`, `tirisfal-glades`, `undercity`. Чаще всего ломаются aliases (Orgrimmar, Darnassus, Plaguelands), «first/only», немаркированный Dragonflight-слой на `azeroth` и фразы, которые стоят в *claim* леджера, но не в привязанной *quote* (Zalazane, драконы посадили Nordrassil, изгнанники из Kalimdor). Списки `sourceIds` нигде не разъехались с реально использованными источниками.