Начинаю аудит с чтения спецификации, реестра источников и заметок — затем открою каждый URL и сверю, как главы на них ссылаются.Ищу прошлые решения по источникам и параллельно читаю спеку, handoff, research notes и главы.Читаю главы и параллельно проверяю HTTP-статус всех URL из реестра.Запускаю HTTP-проверку всех URL и параллельно открываю страницы источников.Bash недоступен в этой копии — продолжаю проверку через открытие страниц. Дальше тяну оставшиеся источники и ищу официальные альтернативы.PDF скачан; дальше читаю его и проверяю удалённые ссылки плюс официальные альтернативы.**Метод.** Точные коды HEAD через shell в этой копии получить нельзя (bash запрещён). Для каждой строки ниже: **OK** = страница/PDF открыта в этой сессии и отдан полный текст; **FAIL** = запрос не удался. Редирект 3xx без заголовков **не проверен**. Paywall ни на одном из 12 URL не встретился.

---

## 1. Реестр `src/content/sources/core.json`

| id | HTTP | title | publisher | publishedAt | type | notes |
|---|---|---|---|---|---|---|
| `forever-announcement` | **OK** — [Carve a New Path…](https://news.blizzard.com/en-us/article/24302093/carve-a-new-path-with-world-of-warcraft-forever) | Точное совпадение | Blizzard — верно | `2026-09-12` в теле **нет штампа**; внутренне подтверждается («Return Sunday, September 13»). **Правдоподобно, не датировано на странице.** | `official-article` — верно | Верны: отдельное постоянное предложение, старт после Forsaken Kingdom / до Molten Core, Nov 4 / beta Sep 17. В той же статье **PDT и PST** для 3:00 p.m. Nov 4. |
| `forever-found-photos` | **OK** — [Found Photos Panel Recap](https://news.blizzard.com/en-us/article/24304071/world-of-warcraft-forever-found-photos-panel-recap) | Точное совпадение | верно | `2026-09-13` в теле **нет штампа**; панель 13 сен. **Правдоподобно.** | верно | Верны time bubble, Skyborne/shen’dorei, Forsaken Paladins, Riverglades/Hyjal/Shen’dralas/Zephras. Это recap панели, не квест-лог. |
| `forever-whats-next` | **OK** — [What’s Next Panel Recap](https://news.blizzard.com/en-us/article/24303862/world-of-warcraft-forever-whats-next-panel-recap) | Точное совпадение | верно | `2026-09-12` **подтверждается текстом** («Deep Dive tomorrow, September 13») | верно | Верны география, классы Skyborne, Hyjal Summit 20 / Barrow Deeps 10. Riverglades: «more than 150» vs Found Photos «nearly 200». Launch: **3:00 p.m. PST**. |
| `forsaken-kingdom-deep-dive` | **OK** — [Forsaken Kingdom Deep Dive Recap](https://news.blizzard.com/en-us/article/24298590/warcraft-iii-reforged-forsaken-kingdom-deep-dive-recap) | Почти: на странице `Warcraft III Reforged:` (двоеточие), в JSON em dash | верно | **отсутствует** в JSON и в теле | верно | Notes верны: пролог *Last Days of Lordaeron*, Rexxar-like кампания, Stratholme/Undercity, герой и способности. **Не** стенограмма сюжета. Редирект «old slug» в этой сессии **не проверен**. |
| `warcraft-iii-story-so-far` | **OK** — [Warcraft III: The Story So Far](https://news.blizzard.com/en-gb/article/23229617/warcraft-iii-the-story-so-far) | Точное совпадение | верно | **отсутствует**; контекст Reforged (~кон. 2019 по медиа, год на странице не напечатан) | `official-retrospective` — верно | Notes верны: I/II, «Seven nations united under a single banner», internment. Поздняя формулировка, не 1994/95. |
| `world-of-warcraft-2004-manual` | **OK**, PDF 2 514 987 байт — [media_manual_classic_enUS.pdf](https://assets.blz-contentstack.com/v3/assets/blt3452e3b114fab0cd/blt2e9295db02a222fc/6025bcbb6968b53d529edb2a/media_manual_classic_enUS.pdf) | Строка «World of Warcraft Online Manual» на обложке **не найдена** (с.1 — дисклеймер; с.2 — Copyright ©2004). Заголовок JSON чуть **не подтверждён**. | верно | нет `publishedAt`; copyright **2004** подтверждён | `official-manual` — верно | Notes верны: Appendix I = Third War / New Age, не титаны/Well. Hyjal, Illidan, Frozen Throne, Sylvanas/Forsaken, Durotar, Gnomeregan. |
| `warcraft-ii-battle-net-article` | **OK** — [Fight for honor…](https://news.blizzard.com/en-us/article/24055598/fight-for-honor-in-warcraft-ii-tides-of-darkness-now-available-on-battle-net) | Регистр: JSON Title Case, страница sentence case | страница «Battle.net — Blizzard News»; «Blizzard Entertainment» приемлемо | **отсутствует** (релиз Battle.net Edition, ~2024 по контексту; точная дата **не проверено**) | `official-article` — верно | Notes верны: руины Stormwind, Second War, обе кампании + Beyond the Dark Portal, ссылка на manual. Сам PDF: **FAIL**. |
| `dragon-aspects-story-so-far` | **OK** — [Take Wing Through Time with the Dragon Aspects](https://news.blizzard.com/en-us/article/23876527/the-story-so-far-take-wing-through-time-with-the-dragon-aspects) | Точное совпадение | верно | **отсутствует**; Dragonflight-контекст (конец: Dragon Isles). Точная дата **не проверено**. | верно | Notes верны: world-soul, keepers, Black Empire, C’Thun/N’Zoth/Yogg-Saron, Tyr/Galakrond, Dragon Soul в War of the Ancients. Нет Y’Shaarj и полной войны стихий. Есть поздние смерти/Ardenweald. |
| `burning-crusade-story-so-far` | **OK** — [Burning Crusade Classic: The Story So Far](https://news.blizzard.com/en-gb/article/23679744/burning-crusade-classic-the-story-so-far) | Точное совпадение | верно | **отсутствует**; «Dark Portal on June 1» = prelaunch BC Classic **2021** | верно | Notes верны для Quel’Thalas / Sunwell / Arathor / Amani. Дальше — blood elves / Outland / Illidan: глава 02 это не импортирует. |
| `muradin-hero-week` | **OK** — [Muradin Hero Week](https://news.blizzard.com/en-us/article/14301664/muradin-hero-week) | Точное совпадение | страница Heroes of the Storm; publisher Blizzard — формально верно | **отсутствует**; HotS-промо **2014** (в теле нет года) | `official-retrospective` — **натяжка** (это промо Nexus) | Исторический абзац про War of the Three Hammers / Ironforge **есть**. Crossover-механика отдельно. Статья также содержит Cataclysm (Council of Three Hammers, Magni-алмаз) — notes это не оговаривают. |
| `molten-core-anniversary` | **OK** — [Molten Core and Onyxia’s Lair Now Live](https://news.blizzard.com/en-us/article/24165121/20th-anniversary-realms-molten-core-and-onyxia-s-lair-now-live) | Точное совпадение | верно | **отсутствует**; Classic 20th Anniversary = **2024** | `official-retrospective` — **натяжка** (анонс «now live» с цитатой dungeon lore) | Цитата про Thaurissan / Ragnaros / Molten Core **есть**. «Now live» ≠ Forever. |
| `zuldazar-visitors-guide` | **OK** — [Zuldazar Visitor’s Guide](https://news.blizzard.com/en-us/article/21701414/battle-for-azeroth-preview-zuldazar-visitors-guide) | Апостроф: ASCII vs типографский | верно | **отсутствует**; BFA preview **2018** | `official-retrospective` — **натяжка** (это preview зоны) | Древность Zuldazar, loa = Wild Gods/spirits, Dazar как First King — **в dungeon-спойлере**. Политика Rastakhan/Zul — BFA-рамка; notes это правильно отсекают. |

**Не в JSON, проверены как «снятые»:**

| URL | Исход | Эта сессия |
|---|---|---|
| `https://ftp.blizzard.com/pub/misc/Warcraft%20III%20Manual.pdf` | 502 / недоступен | **FAIL** |
| `https://ftp.blizzard.com/pub/misc/Warcraft%202%20Battlenet%20edition.PDF` | click/fetch fail | **FAIL** |
| `https://us.media.blizzard.com/manuals/wow/wow-classic-manual-enUS.pdf` | 502 | **FAIL** |
| `https://worldofwarcraft.blizzard.com/en-us/news/3502666/patch-43-dungeons-preview-part-two-well-of-eternity` | notes: **403** | **OK, полный текст** |

---

## 2. Кто цитирует что, и уместно ли

| sourceId | Главы | Уместность |
|---|---|---|
| `forever-announcement` | 07 | Уместно: рамка продукта и точка старта, не исход квестов. |
| `forever-found-photos` | 01, 07 | Уместно для **FOREVER**-анонсов (time bubble, Skyborne, paladins, зоны). Не квест-исходы. |
| `forever-whats-next` | 01, 07 | Уместно: география, классы, рейды как **объявленный** контент. |
| `forsaken-kingdom-deep-dive` | 06, 07 | Уместно как мост (структура кампании, герой). Главы правильно не достраивают сюжет. |
| `warcraft-iii-story-so-far` | 02, 03, 04, 05, 06 | Уместно для I/II и Alliance of Lordaeron. Для главы 06 слишком тонкий (чума + Arthas «investigates»). |
| `world-of-warcraft-2004-manual` | 03, 05, 06, 07 | Уместно как Year-1 baseline (Thrall, Hyjal, Forsaken, Gnomeregan). Глава 03 опирается на него слабо (First War там почти нет). **Глава 06 выходит за текст.** |
| `warcraft-ii-battle-net-article` | 04 | Уместно как контекст Second War / наличие кампаний, не как транскрипт. Глава это оговаривает. |
| `dragon-aspects-story-so-far` | 00, 01 | Уместно для поздней космологии и Dragon Soul; главы честно маркируют слой. |
| `burning-crusade-story-so-far` | 02 | Уместно для Quel’Thalas/Arathor. Blood elf / Outland в главу не тащат. Не использован в главе 01, хотя там есть тонкий War of the Ancients (Illidan/портал). |
| `muradin-hero-week` | 02 | Исторический абзац про Three Hammers — да. Тип источника слабый (HotS). |
| `molten-core-anniversary` | 02 | Цитата dungeon lore — да; не как доказательство Forever. |
| `zuldazar-visitors-guide` | 02 | Масштаб империи/loa — да; не как политика Forever. |

**Пробелы цитирования (источник использован в прозе, но нет в `sourceIds`):**

- Глава 02 «Почему это важно»: Riverglades, Twilight’s Hammer, Brotherhood of the Horse — из Found Photos, sourceId нет.
- Глава 03: Riverglades — то же.
- Глава 04: старт Forever после Forsaken Kingdom / до Molten Core — из announcement, sourceId нет.
- Глава 05: фракционный выбор Skyborne — из What’s Next, sourceId нет.
- Глава 06: Bandarion Keep, Whispering Wood, mount Retribution — из Found Photos, sourceId нет.

Это не «промо как квест-исход», но нарушает контракт «каждое утверждение с sourceId».

---

## 3. Research notes — точность

**В целом notes аккуратнее JSON.** F1 excerpt, F2 time bubble, F3 Hyjal/150 vs 200, F4 Consecration, H1 «Seven nations», P1 граница world-soul, K1 Quel’Thalas, K3 Three Hammers, K4 Thaurissan, K5 loa/Dazar — **совпадают с открытыми страницами**.

**Завышения / устаревшее:**

| Тяжесть | Что | Вердикт |
|---|---|---|
| **Высокая** | P3: Well of Eternity «direct open gives 403» | **Опровергнуто в этой сессии.** Тот же URL открылся. Handoff «do not restore dead links» для *этого* URL сейчас ложный. |
| **Высокая** | K2: Stromkar «direct page open failed» | **Опровергнуто.** [Legion: Warrior Artifact Reveal](https://worldofwarcraft.blizzard.com/en-gb/news/19942707/) открылся; Thoradin / Arathor / Troll Wars на месте. |
| Средняя | F4 «old slug redirects here» | **не проверено** (нет заголовков). |
| Средняя | F2 «Tirisfal is important» | Сглажено: ключ — Bandarion Keep in the Whispering Wood of Tirisfal Glades. |
| Низкая | H2 «114 PDF pages / two pages per spread» | Совпадает с просмотренными разворотами; полный подсчёт страниц **не проверен** по всему файлу. |
| Честно | Remaining gaps | Для **бесплатного веб-текста Blizzard** пробелы всё ещё стоят: полной войны стихий, порядка Old Gods, цепи Y’Shaarj→Well, dark troll→kaldorei, распада Arathor, полной Curse of Flesh **на открытых страницах нет**. |

P4 Vashj’ir: URL из notes **открылся** — [Vashj'ir: Surviving the Depths](https://worldofwarcraft.blizzard.com/en-gb/news/9986542/vashjir-surviving-the-depths). Саммари верно: Sundering, Well implosion, naga; агент сделки не назван.

---

## Проблемы по тяжести

**Critical**

1. **Глава 06 дописывает кампанию Warcraft III сверх цитат.** В [2004 manual](https://assets.blz-contentstack.com/v3/assets/blt3452e3b114fab0cd/blt2e9295db02a222fc/6025bcbb6968b53d529edb2a/media_manual_classic_enUS.pdf) есть чума, Uther «losing his hold on humanity», Northrend, Frostmourne, Terenas, Quel’Thalas, Sylvanas. **Нет** зерна, Andorhal, Mal’Ganis, чистки Stratholme, разрыва с Uther/Jaina. [Story So Far](https://news.blizzard.com/en-gb/article/23229617/warcraft-iii-the-story-so-far) — только «Arthas to investigate». Forsaken Kingdom recap даёт Stratholme как **локацию новой кампании**, не как WC3-purge. Это заполнение из памяти — прямое нарушение правил проекта.

**High**

2. Снятый Well of Eternity preview **живой**; глава 01 из-за ложного 403 выхолощена (нет Azshara, портала, Sundering).
3. WC3 manual PDF по-прежнему мёртв; **рабочей Blizzard-копии 2002 PDF не найдено**. 2004 manual **не** восстанавливает титаническое сотворение Well («lake of scintillating energies»).
4. Для Y’Shaarj / порядка Old Gods / dark trolls / распада Arathor / полной Curse of Flesh **нет открытого бесплатного Blizzard-текста**. Единственный легитимный носитель — книга Chronicle; news-страница — только анонс продажи.

**Important**

5. Forever-факты в главах 02–06 без `sourceIds`.
6. `type: official-retrospective` для Muradin / Molten Core / Zuldazar маскирует промо, «now live» и preview.
7. `publishedAt` есть только у трёх Forever-статей и нигде не напечатан как timestamp.

---

## 4. Официальные замены снятым источникам

**Warcraft III Manual (2002) — живого Blizzard-PDF нет.** Индекс поисковика всё ещё цитирует ftp-текст; файл **FAIL**. Нельзя честно вернуть 2002-космологию как проверяемую ссылку.

Что **открылось** и законно закрывает древний слой (Titans/Old Gods/Black Empire уже частично в Dragon Aspects; ниже — Well / Ancients / Sundering / Arathor / trolls):

| Что закрывает | URL (открыт) | Оговорка |
|---|---|---|
| War of the Ancients, Azshara, Highborne, Well, Sargeras-портал, Tyrande/Illidan, Sundering, Maelstrom | [US 3502666 Well of Eternity](https://worldofwarcraft.blizzard.com/en-us/news/3502666/patch-43-dungeons-preview-part-two-well-of-eternity) и дубль [GB 9992814](https://worldofwarcraft.blizzard.com/en-gb/news/9992814/null) | Cataclysm 4.3 dungeon preview (Zarhym; в теле год не напечатан; индекс: 19 Sep). Игроки в прошлое / Dragon Soul — рамка патча, не Forever. |
| Sundering, Highborne, Azshara в пучине | [Warbringers: Azshara](https://news.blizzard.com/en-us/article/22358468/warbringers-azshara) | Короткий синопсис ролика; сделки с N’Zoth нет. Дата на странице **не проверено**. |
| Сделка Azshara с N’Zoth, превращение в naga | [Eternal Palace RF Wing 3](https://news.blizzard.com/en-us/article/23021200/the-eternal-palace-raid-finder-wing-3-now-available) | BFA raid blurb, ~2019. |
| Vashj’ir утонул при Sundering; Well implosion → naga | [Vashj'ir: Surviving the Depths](https://worldofwarcraft.blizzard.com/en-gb/news/9986542/vashjir-surviving-the-depths) | Cataclysm zone preview. Агент сделки не назван. |
| Thoradin объединил humanity, основал Arathor, Troll Wars | [Legion: Warrior Artifact Reveal](https://worldofwarcraft.blizzard.com/en-gb/news/19942707/) | Не распад на семь королевств. |
| Troll empires (уже в JSON) | Zuldazar Visitor’s Guide | Политику BFA не переносить. |

**Не замена 2002 manual:** 2004 PDF (только Third War); Dragon Aspects (другая космология); Story So Far («failed attack 10,000 years ago» — одна фраза).

Страницы рас [`night-elf`](https://worldofwarcraft.blizzard.com/en-us/game/races/night-elf), [`troll`](https://worldofwarcraft.blizzard.com/en-us/game/races/troll), [`gnome`](https://worldofwarcraft.blizzard.com/en-us/game/races/gnome) открылись **пустыми** (заголовок + соцкнопки) — как lore-источник непригодны.

---

## 5. До 10 primary sources под Remaining evidence gaps

Каждый URL открыт. Книга Chronicle **не** содержит лор на news-странице — это указано.

1. **Well of Eternity preview (4.3)** — Blizzard, ~19 Sep 2011 (индекс; в теле года нет). [US](https://worldofwarcraft.blizzard.com/en-us/news/3502666/patch-43-dungeons-preview-part-two-well-of-eternity). Глава 01: Azshara, Well, Legion, Sundering. Не Y’Shaarj и не dark trolls.

2. **Warbringers: Azshara** — Blizzard. [URL](https://news.blizzard.com/en-us/article/22358468/warbringers-azshara). Глава 01: Sundering / Highborne. Дата **не проверено**. Не закрывает цепь Well.

3. **Eternal Palace RF Wing 3** — Blizzard, BFA 2019 (график Aug 13 wing 3). [URL](https://news.blizzard.com/en-us/article/23021200/the-eternal-palace-raid-finder-wing-3-now-available). Глава 01: N’Zoth-сделка, naga. Поздняя рамка.

4. **Vashj'ir: Surviving the Depths** — Blizzard, Cataclysm. [URL](https://worldofwarcraft.blizzard.com/en-gb/news/9986542/vashjir-surviving-the-depths). Глава 01: submersion / implosion. Год на странице **не проверено**.

5. **Legion: Warrior Artifact Reveal** — Blizzard, Legion ~2015. [URL](https://worldofwarcraft.blizzard.com/en-gb/news/19942707/). Глава 02: Arathor founding / Troll Wars. **Не** хронология распада.

6. **Preview: Mechagon Island Visitor’s Guide** — Blizzard, Rise of Azshara 2019 (June 26 / July 10 в тексте). [URL](https://news.blizzard.com/en-gb/article/23021204/preview-mechagon-island-visitors-guide). Глава 02: термин Curse of Flesh (одержимость King Mechagon). **Не** цепочка titan-forged → gnome.

7. **Meet the Earthen** — Blizzard, 5 June 2024 в notes; в теле «The War Within». [URL](https://news.blizzard.com/en-us/article/24104276/meet-the-earthen-a-new-playable-allied-race). Частично: earthen = titan-forged living stone. **Не** доказательство гномьей Curse of Flesh и **не** ростер Forever.

8. **Firelands Timewalking** — Blizzard. [URL](https://news.blizzard.com/en-us/article/23237898/step-into-the-firelands-during-cataclysm-timewalking). Глава 00: Titans **заключили** Ragnaros в Firelands; есть Neptulon/Al’Akir как лорды. **Не** полная primordial elemental war.

9. **Cataclysm Classic zones** — Blizzard, May 20 (в тексте; год Classic-релиза на странице не напечатан, контекст 2024). [URL](https://news.blizzard.com/en-us/article/24095666/unveiling-cataclysm-classic-zones-dungeons-and-pvp-season-9). Al’Akir «foremost tactician in the Old Gods’ horrific armies»; Therazane; tol’vir Curse of Flesh. Обрывки, не полная последовательность.

10. **On Sale Now! Chronicle Volume 1** — Blizzard / Dark Horse. [URL](https://news.blizzard.com/en-us/article/20056877/on-sale-now-world-of-warcraft-chronicle-volume-1). Единственный **официальный** носитель, который по заявке книги покрывает космос, древние империи и (по сторонним оглавлениям, **не проверенным в полном тексте книги в этой сессии**) elemental wars, Old Gods, Y’Shaarj, Well, trolls, Arathor, Curse of Flesh. **Сама страница — продажа, не primary text.** Статус: `official-book`; цитировать только после чтения тома, с пометкой поздней реконструкции 2016, не Year-1 Forever.

**Итог по пробелам:** веб-Blizzard закрывает War of the Ancients / Sundering / naga / основание Arathor / куски elemental lords. **Не закрывает** без книги: порядок Old Gods, Y’Shaarj→Well, dark-troll origin, распад Arathor, полную gnome/mechagnome Curse of Flesh. Эти дыры notes назвали честно; ошибка была не в списке пробелов, а в том, что живой Well of Eternity preview сняли как «403».
