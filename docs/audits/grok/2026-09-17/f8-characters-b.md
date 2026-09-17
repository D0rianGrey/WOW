Проверяю персонажей по леджеру и официальным источникам: сначала соберу тексты, все matching `entryRefs` и регистрацию источников, затем сверю формулировки с цитатами и объявлением WoW: Forever.Сначала читаю девять досье, леджер и источники, параллельно ищу все `entryRefs` по этим персонажам.Дальше вытащу все `entryRefs` по девяти персонажам и сверю их с `dossiers.json` и `core.json`.`dossiers.json` оборвался на Azshara — дочитываю хвост и все связанные записи в главах и Forever.Проверяю спорные места в мануале 2004 и живых статьях Forever — «shortly thereafter», благословение Teldrassil, N’Zoth и гибель Kel’Thuzad.Проверил живые страницы Forever, Hero Week и Eternal Palace. Цитаты в леджере заново не искал — сверял, держит ли русский текст `entryRefs` персонажа и не спорит ли с открытыми материалами Blizzard.Цитаты в леджере заново не сверял. Forever сверен по живым страницам Blizzard ([What’s Next](https://news.blizzard.com/en-us/article/24303862/world-of-warcraft-forever-whats-next-panel-recap), [Found Photos](https://news.blizzard.com/en-us/article/24304071/world-of-warcraft-forever-found-photos-panel-recap), [Forsaken Kingdom What’s Next](https://news.blizzard.com/en-us/article/24302500/warcraft-iii-reforged-forsaken-kingdom-what-s-next-panel-recap)). Для спорных биографий открыты [Kel’Thuzad Enters the Nexus](https://news.blizzard.com/en-us/article/21033386/kelthuzad-enters-the-nexus), [Thrall Hero Week](https://news.blizzard.com/en-gb/article/17528770/thrall-hero-week), [Sylvanas Hero Week](https://news.blizzard.com/en-gb/article/18443711/sylvanas-hero-week) и [Eternal Palace](https://news.blizzard.com/en-us/article/23021200/the-eternal-palace-raid-finder-wing-3-now-available). Правило backing: запись держит досье только если в `entryRefs` есть `characters/<id>`.

Критических выдумок и Retail-спойлеров как «сейчас» нет. Ломают набор: благословение Teldrassil, схлопывание Well без цитаты, пропуск N’Zoth, алиас Cult of the Damned, связи, которых нет в тексте.

---

## kelthuzad — есть проблемы

Хребет (Kirin Tor, клятва Lich King, чума, Sunwell → lich, книга Medivh, Plaguelands) совпадает с `ds-r1-87`–`93`. `sourceIds` оба используются.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 1 | «Arthas убил его» | У `characters/kelthuzad` нет цитаты об убийце: `ds-r1-91` даёт только останки в Sunwell; «Arthas succeeded in killing Kel’Thuzad» живёт в `ds-r1-03` / `ch06-forces-grew` без этого `entryRef`. Факт при этом верный. | «Kel’Thuzad was eventually hunted and slain by the Paladin, Arthas Menethil.» [Nexus](https://news.blizzard.com/en-us/article/21033386/kelthuzad-enters-the-nexus) · 2004: «Arthas succeeded in killing Kel’Thuzad» | Добавить `characters/kelthuzad` к `ds-r1-03` или внести фразу Nexus в леджер |
| Important | 7 | alias `Cult of the Damned` | Это организация, не имя и не титул Kel’Thuzad. | «Kel’Thuzad and his Cult of the Damned» (`ds-r1-90`) | Убрать из `aliases` |

Связи arthas / scourge / lordaeron / quelthalas (через Sunwell) оправданы. Forever-абзац — редактура, не отдельный факт.

---

## malfurion-stormrage — есть проблемы

Furion/Malfurion, заточение Illidan, Hyjal/Archimonde, Emerald Dream, Fandral как новый Arch-Druid и портрет «величайший друид» держатся (`ds-r1-68`–`73`, `ds-r2-28`). `sourceIds` все используются.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 2 | «древо Teldrassil посадили **без его благословения**» | В backing Malfurion этого нет. Ближайшая цитата — *nature’s blessing*, не благословение Malfurion; она привязана к `locations/teldrassil`, не к персонажу. `ds-r2-28` говорит лишь, что Fandral возглавлял желавших посадить древо, пока Malfurion пропал. | «However, the tree was not consecrated with **nature’s blessing**» (`ds-r2-59`) · «Fandral Staghelm – the leader of those who wished to plant the new World Tree – became the new Arch-Druid» (`ds-r2-28`) | «друиды Fandral посадили Teldrassil, пока Malfurion пропал; древо не получило благословения природы» |
| Minor | 1 | «почему ночными эльфами первого года правит Tyrande» | Верно по 2004, но цитата «sole ruler» стоит на `characters/tyrande-whisperwind`, не на Malfurion. | «With Malfurion inexplicably lost, Tyrande has again become the sole ruler of her prideful people.» (`ds-r2-27`) | Добавить `characters/malfurion-stormrage` в `entryRefs` `ds-r2-27` |
| Minor | 7 | `relatedCharacterIds: queen-azshara` | Ни текст, ни quotes Malfurion Azshara не называют. | — | Убрать Azshara из связей |

«Вскоре после войны» для Emerald Dream — допустимое чтение «Shortly thereafter» на p. 94 после Third War. Alias `Furion Stormrage` официален (мануал WC3). `Arch-Druid` оправдан тем, что Fandral стал *новым* Arch-Druid.

---

## medivh — есть проблемы

Одержимость Sargeras, сделка с Gul’dan, смерть от Lothar/Khadgar, возвращение пророком и переход в Kalimdor совпадают с `ds-r1-37`–`42`. Ретроспектива помечена. Оба `sourceIds` используются.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 7 | `relatedCharacterIds: thrall`, `jaina-proudmoore` | В тексте и в quotes Medivh — Horde/Alliance/orcs/humans, без имён Thrall и Jaina. | `ds-r1-41`, `ds-r1-42` | Убрать оба id **или** назвать их в тексте и повесить цитату (`ds-r1-27` — «Under Medivh’s guidance, Thrall and Jaina…») |
| Minor | 1 | «ни союза смертных на Mount Hyjal» | Quotes Medivh доводят народы до Kalimdor, не до союза на Hyjal. | «using prophecy and trickery to guide them across the sea to the legendary land of Kalimdor» (`ds-r1-42`) | Оставить только Horde/Alliance в Kalimdor |
| Minor | 7 | `relatedFactionIds: burning-legion` | Названы Sargeras и Nether, не Burning Legion. | `ds-r1-37` | Убрать фракцию **или** явно сказать, что Sargeras вёл Legion |

---

## orgrim-doomhammer — есть проблемы

Вызов Blackhand, плен после войны, отшельник, гибель в лагере, молот/латы у Thrall, имя Orgrimmar — по `ds-r1-50`–`55` и `ds-r1-12`. Все три `sourceIds` используются.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 5 | «сошёлся с Anduin Lothar в титаническом поединке и с трудом одолел его» | Только версия мануала 2002. Тот же `warcraft-iii-story-so-far`, который уже в `sourceIds`, даёт другую гибель Lothar. Глава 04 обе версии даёт, досье — нет. | WC3: «Doomhammer and Lothar squared off in a **titanic battle**… narrowly succeeded in vanquishing Lothar» (`ds-r1-51`) · SSF: «putting an end to Lothar’s life in a **suicidal charge**» (`ch04-ssf-suicidal-charge`) | Как в гл. 04: поединок WC3 + «поздняя ретроспектива называет атаку самоубийственной» |
| Important | 1 | «Столица orcs **в Durotar** названа Orgrimmar» | Quotes Orgrim называют родину orcs, не Durotar. | «Orgrimmar was founded as the capital city of the orcs’ new homeland» (`ds-r1-55`) | «столица orcs названа Orgrimmar» **или** добавить `characters/orgrim-doomhammer` к цитате про Durotar |
| Minor | 2 | «**Великий вождь** orcs Orgrim Doomhammer разочаровался… бросил Blackhand вызов за титул Warchief» | До победы он *great orc chieftain*, не Warchief Horde. «Великий вождь» читается как уже титул. | «The **great orc chieftain** Orgrim Doomhammer… challenged Blackhand for the mantle of Warchief» (`ds-r1-50`) | «вождь / великий вожак … стал Warchief» |

Связи thrall / guldan / horde оправданы.

---

## queen-azshara — есть проблемы

Дворец, впуск Sargeras, тщеславие как поздняя причина, бой с Furion, 2002 «дно моря» vs Vashj’ir «выжила и стала naga» — каркас верный и слой 2002/позднее разведён. `sourceIds` все используются.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 5 | «Поздний официальный текст продолжает: королева избежала смерти… навсегда превратилась в naga» | Один поздний рассказ подан как *the* продолжение. Официальный BFA-текст даёт другую механику (сделка с N’Zoth); гл. 01 обе версии уже держит. | Vashj’ir: «escaped death… forever transformed into the monstrous naga» (`ds-r1-86`) · «Queen Azshara forged a dark bargain with N’Zoth that transformed her loyal subjects into the sinister naga.» [Eternal Palace](https://news.blizzard.com/en-us/article/23021200/the-eternal-palace-raid-finder-wing-3-now-available) (`ch01-nzoth-bargain`) | Как в гл. 01: Vashj’ir = implosion; BFA = сделка с N’Zoth, поздний слой |
| Important | 2 | «Схватка Furion с Azshara ввергла заклинание Highborne в хаос, **и Well of Eternity схлопнулся**» | Вторая клауза. Цитата боя Well не рушит; collapse — отдельная фраза PDF без `characters/queen-azshara`. Ledger-claim `ds-r1-84` сам шире своей quote. | «The ensuing battle between Furion and Azshara threw the high-borne’s carefully crafted spellwork into chaos.» (`ds-r1-84`) · collapse: «the surging Well of Eternity buckled in upon itself and collapsed.» (`ch01-well-collapsed`) | Точка после «хаос»; collapse — следующей фразой, с `entryRef` |
| Minor | 2 | «оказались на дне моря» | 2002: *smashed* to the bottom, не «оказались». | «had been **smashed** to the bottom of the raging sea» (`ds-r1-85`) | «были разбиты о дно моря» |
| Minor | 2 | «Наследие **её двора** живёт в Forever: предки Skyborne ушли из Eldre’Thalas» | Skyborne — мятежники Eldre’Thalas после войны, не двор Zin-Azshari. | «rebels who fled Eldre’Thalas after the War of the Ancients» (`ch00-forever-skyborne-origin`) | «после войны, которую начала магия Highborne, мятежники ушли из Eldre’Thalas» |
| Minor | 7 | `relatedCharacterIds: illidan-stormrage` | Illidan в тексте и quotes Azshara нет. | — | Убрать |

---

## sylvanas-windrunner — есть проблемы

Ranger-General, Sunwell, banshee, мятеж, столица Lordaeron, Undercity, Tirisfal, месть, вход в Horde через Forsaken Kingdom — по `ds-r1-17`–`23`, `ds-r2-16`–`17`. Три `sourceIds` используются. Wrath/val’kyr из Hero Week в Year 1 не утекли.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 1 | «**Когда власть Lich King ослабла**, половина нежити во главе с Sylvanas подняла мятеж» | Причина не в quotes Sylvanas. Coup — `ds-r1-19` без ослабления; waning — `ch07-strength-waned` только на timeline. | «Half of the standing undead forces, led by the banshee Sylvanas Windrunner, staged a coup» (`ds-r1-19`) · та же p. 86: «As the Lich King's strength waned…» (`ch07-strength-waned`) | Либо убрать причину, либо повесить waning на `characters/sylvanas-windrunner` |
| Important | 7 | `relatedCharacterIds: garek-bandarion`, `dark-ranger-anya` | Текст говорит о кампании и Horde, не о Garek/Anya. Их цитаты на них самих, не на Sylvanas. | `ds-r2-16` · Garek/Anya: `ds-r1-104`/`107` | Убрать оба id **или** назвать их в Forever-абзаце |
| Minor | 2 | «Arthas **не дал ей достойной смерти**» | 2004 в леджере — *cruel gesture* / raised body. Близкая формула есть на Hero Week, но этой фразы в леджере Sylvanas нет. | 2004: «In a cruel gesture of his dominance, he even raised Sylvanas’ defeated body as a banshee» (`ds-r1-18`) · Hero Week: «He denied her a clean death» [Sylvanas Hero Week](https://news.blizzard.com/en-gb/article/18443711/sylvanas-hero-week) | Либо «жестокий жест господства: поднял тело как banshee», либо внести Hero Week *clean death* в леджер |

---

## thrall — есть проблемы

Сын Durotan, раб/гладиатор, Drek’Thar, молот Doomhammer, warchief, Durotar, «perhaps the mightiest», шаманизм, Skyborne Horde → Shaman — по `ds-r1-09`–`16`, `ds-r2-11`, `ch01-skyborne-factions`. Живая страница What’s Next подтверждает Shaman у Horde-aligned Skyborne. Все четыре `sourceIds` используются. Cataclysm/Earthen Ring из Hero Week не попали в Year 1.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 1 | summary: «**освободивший orcs из лагерей**» | У `characters/thrall` нет цитаты об освобождении лагерей. Гибель Doomhammer «during the liberation of one camp» — `ds-r1-54`, только Orgrim. Факт на цитируемой Hero Week есть, в леджере персонажа — нет. | «Thrall subsequently **freed the orcs from slavery**» [Thrall Hero Week](https://news.blizzard.com/en-gb/article/17528770/thrall-hero-week) | Внести эту фразу в леджер с `characters/thrall` **или** убрать из summary |
| Important | 7 | `relatedCharacterIds: grom-hellscream`, `cairne-bloodhoof`, `jaina-proudmoore` | В тексте — Durotan, Blackmoore, Drek’Thar, Gul’dan, Orgrim, Medivh, tauren. Grom, Cairne и Jaina не названы; в quotes Thrall их тоже нет. | `ds-r1-09`–`16` | Убрать три id |
| Minor | 2 | «Thrall **вместе с tauren основал** новую родину» | Орки основали родину *с помощью* tauren; Thrall их привёл. | «Thrall led the orcs… where they founded a new homeland **with the help of** their tauren brethren» (`ds-r1-14`) | «привёл orcs в Kalimdor, где они с помощью tauren основали Durotar» |

---

## tyrande-whisperwind — есть проблемы

High Priestess Elune, ~10 000 лет Sentinels, Ashenvale, освобождение Illidan, союз ради World Tree, Darnassus, единоличная власть после пропажи Malfurion, Hyjal в Forever — по `ds-r1-63`–`67`, `ds-r2-27`, `ds-r2-49`. Оба `sourceIds` используются. Бессмертие Third War в Year 1 не перенесено.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | 7 | `relatedFactionIds: alliance` | Alliance в тексте и quotes Tyrande нет (есть night-elves, Sentinels, Darnassus). | `ds-r1-63`–`67` | Убрать Alliance **или** сказать, что ночные эльфы Year 1 — в Alliance (`ds-r2-02`) |
| Minor | 7 | `relatedLocationIds: teldrassil` | В тексте — Darnassus, Ashenvale, Hyjal; имя Teldrassil не звучит. | `ds-r1-66` про Darnassus | Заменить на то, что страница реально называет, либо написать, что Darnassus стоит на Teldrassil |

---

## uther-the-lightbringer — есть проблемы

Первый паладин Faol, Paladin Order, мир в Lordaeron, «брат» Terenas, расследование чумы, предупреждение Arthas, гибель в бою, mistrust Forsaken paladins — по `ds-r1-31`–`36` и `ch06-forsaken-paladins`. Три `sourceIds` используются.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | 1 | summary: «Первый паладин **Silver Hand**» | Quotes Uther: *first of the paladins* / *Paladin Order*. «Silver Hand» на Uther не повешен (есть у Arthas: `ds-r1-02`). | «Uther was the first of the paladins blessed by the Archbishop Faol» (`ds-r1-36`) · «supreme commander of the Paladin Order» (`ds-r1-31`) | «первый из паладинов» / «Paladin Order» |
| Minor | 1 | «**вернувшийся с Frostmourne** Arthas убил его в бою» | Убийство в бою есть; Frostmourne в quotes Uther нет. | «slew Uther in battle» (`ds-r1-35`) | «Arthas убил его в бою» |
| Minor | 2 | «подавляя **мятежи**» | Источник — *demi-human uprisings*, не мятежи вообще. | «quelling **demi-human uprisings** throughout the realm» (`ds-r1-31`) | «подавляя восстания demi-humans» |
| Minor | 7 | `relatedFactionIds: alliance` | Alliance в тексте и quotes Uther нет (Lordaeron, Paladin Order). | `ds-r1-31` | Убрать **или** явно привязать орден к Alliance |

---

**Итог:** ни одно досье не выдумывает Forever и не выдаёт Wrath/Cataclysm за состояние Year 1. Чинить в первую очередь: Teldrassil «без благословения Malfurion»; Well collapse без цитаты и пропуск N’Zoth у Azshara; алиас Cult of the Damned; связь Garek/Anya у Sylvanas и Grom/Cairne/Jaina у Thrall; у Orgrim — вторая версия гибели Lothar из уже процитированного Story So Far.