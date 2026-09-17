Начинаю с глоссария, леджера и источников: сначала сниму все 18 терминов и все `entryRefs` вида `glossary/<id>`, затем сверю русские определения с цитатами.Глоссарий короткий — сейчас сниму все ledger-цитаты по `glossary/*` и сверю каждое определение с ними.Цитат больше, чем в `glossary.json` — вытащу полный набор записей по каждому `glossary/<id>`.Bash недоступен — читаю ledger по файлам и собираю цитаты вручную.Дальше сверю Forever и спорные формулировки с живыми страницами Blizzard — глоссарий опирается на них как на текущее состояние.Проверил все 18 терминов `src/content/glossary/core.json` против **всех** ledger-записей с `entryRefs`, содержащими `glossary/<id>` (не только `glossary.json`), списка источников и живых страниц Blizzard по Forever (Found Photos, 2026-09-13) и космологии Dragonflight. Цитаты на страницах заново не сверял.

Списки `sourceIds` ни у одного термина не сломаны: лишних нет, использованные не пропущены. Мета-термины (`dating`, `beta-canon`) лорных фактов сверх своего определения не добавляют.

---

### azeroth — проблемы есть

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | OVERSTATED | «Titans упорядочивали его, **опасаясь повредить его world-soul**» | В единственной cosmolog-цитате с `glossary/azeroth` боится **Aggramar**, не titans как группа. | «**Aggramar feared** the Pantheon would irreparably damage or even kill the world-soul.» [Dragon Aspects](https://news.blizzard.com/en-us/article/23876527/the-story-so-far-take-wing-through-time-with-the-dragon-aspects) (`ch00-world-soul-constructs`) | «Aggramar опасался, что Pantheon повредит world-soul» |
| Important | LAYER / DEFINITIONS | тот же world-soul как текущее определение мира | Это космология Dragonflight; Year-1/WC3 так Azeroth не описывает. Ярлыка «поздняя ретроспектива» нет — хотя соседний термин `lore-editions` как раз про этот разрыв. | Та же статья: later layer, `source.notes` в `core.json` | «в ретроспективе Dragonflight: world-soul…» |
| Minor | UNSUPPORTED | «**Titans упорядочивали его**» | В записях с `glossary/azeroth` этого нет. Фраза живёт в `ch00-titans-agents` без этого `entryRef`. | Tagged: world-soul + «The eight races in WoW are divided into two factions» (`ds-r2-01`) | Либо повесить `glossary/azeroth` на `ch00-titans-agents`, либо убрать «упорядочивали» |
| Minor | OVERSTATED | «восемь играбельных рас **делят его между** Horde и Alliance» | Источник делит расы на фракции, а не мир. | «The eight races in WoW are **divided into two factions**: the Horde and the Alliance.» | «восемь рас оригинального WoW входят в Horde и Alliance» |

---

### titans — проблемы есть

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | DEFINITIONS / LAYER | всё определение: «космические существа размером с планету, состоящие из магии Order и первозданной материи» | Это **единственный** смысл термина, и он целиком из Dragonflight. Мануал WC3 даёт другую картину: titans двигали и формировали землю, выковали озеро в центре континента — без Order/planet-sized. Правило энциклопедии: при расхождении давать обе версии. | Ledger: «planet-sized cosmic beings made up of Order magic and the primordial matter»; WC3: «For many ages the Titans moved and shaped the earth» / «the Titans crafted a lake» | Пометить «ретроспектива Dragonflight» и рядом дать WC3-версию |

Перевод самой Dragonflight-цитаты точный (`среди них Aman’Thul и Sargeras` = *Notable titans*). Список источников совпадает с цитатой.

---

### old-gods — проблемы есть

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | DEFINITIONS / LAYER | «физические проявления Void… среди них C’Thun, **N’Zoth и Yogg-Saron**» | Void-космология и имена N’Zoth / Yogg-Saron — не Year-1. В оригинальном первом годе игрокам известен C’Thun; остальные имена и «проявления Void» — поздний Retail, поданы как текущее определение. | «Physical manifestations of the Void… Notable Old Gods are C'Thun, N'Zoth, and Yogg-Saron.» [Dragon Aspects](https://news.blizzard.com/en-us/article/23876527/the-story-so-far-take-wing-through-time-with-the-dragon-aspects) | «в ретроспективе Dragonflight notable: C’Thun, N’Zoth, Yogg-Saron»; для Year-1 оставить C’Thun / древние ужасы без Void как единственного смысла |

Сама цитата передана верно (*паразитические ужасы*, *порча*). Источник один и он используется.

---

### well-of-eternity — проблем нет

Обе tagged-цитаты из мануала WC3: озеро энергий в центре континента, которое titans «crafted»; «true heart of the world’s magic». Текст прямо атрибутирует это руководству WC3. Источник один, совпадает.

---

### burning-legion — проблем нет

Sargeras «forged the demonic Burning Legion» (`ds-r2-21`); Highborne «first opened a portal… and invited the Burning Legion» (`ch01-zin-azshari-portal`). Оба `sourceIds` используются. «Впервые открыли путь» — сжатие *opened a portal and invited*, не добавленная уверенность.

---

### scourge — проблем нет

Почти дословный 2004 manual: Kil’jaeden created the Scourge — army of undead, united under the singular will of the Lich King (`ds-r2-18`).

---

### lich-king — проблемы есть

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | UNSUPPORTED | «**Повелитель Scourge**» | В записях с `glossary/lich-king` этого нет. Формула «united under the singular will of the dread Lich King» стоит на `glossary/scourge` (`ds-r2-18`), не здесь. | Tagged: «Ner’zhul and Arthas’ spirits fused»; «Currently Arthas, the new and immortal Lich King, resides in Northrend» | Повесить `ds-r2-18` на `glossary/lich-king` **или** начать с «новый бессмертный Lich King» по 2004 manual |

Остальное держится: слияние с Ner’zhul, Northrend, «в первый год» = *Currently* мануала 2004. Поздний Bolvar/снятие шлема не протащены. Источник один, используется.

---

### horde — проблемы есть

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | OVERSTATED | «**При Thrall** — рыхлая коалиция ради выживания» | Tagged-цитата меняет Horde **из-за конца демонического проклятия**, не из-за Thrall. Thrall в `glossary/horde` не появляется (есть в `ds-r2-11`, но `entryRefs` — `characters/thrall`, `factions/horde`). | «**Now that the demon curse was ended**, the Horde changed from a warlike juggernaut into more of a loose coalition, dedicated to survival and prosperity rather than conquest.» (`ds-r2-12`) | «После снятия демонического проклятия — рыхлая коалиция ради выживания…» |

Оркская «кровожадная армия» от демонов Legion (`gl-r4-22`) и состав Year 1: orcs, tauren, trolls, undead (`ds-r2-03`) — верны. Оба `sourceIds` используются.

---

### alliance — проблемы есть

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | UNSUPPORTED | «рождённый **во Second War**» | В записях с `glossary/alliance` слов Second War нет. На той же странице Blizzard союз семи наций стоит в блоке Warcraft II, и дальше текст называет Second War — факт верный, в ledger на этот термин не посажен. | Tagged: «Seven nations united under a single banner… giving birth to the Alliance of Lordaeron.» Дальше на [той же странице](https://news.blizzard.com/en-gb/article/23229617/warcraft-iii-the-story-so-far): «the flames of the **Second War** guttered out» | Добавить в ledger цитату, где этот союз явно привязан к Second War, **или** «в эпоху Warcraft II» |
| Minor | OVERSTATED | «семь **человеческих** государств» | Tagged-цитата: *Seven nations*, без *human*. Предыдущее предложение той же статьи говорит *human kingdoms* — снова верно по странице, не по цитате термина. | «Seven nations united under a single banner» (`ch02-seven-nations`); рядом: «leaders of the **human kingdoms**» | «семь государств» **или** добавить в `entryRefs` предложение про human kingdoms |

Состав Year 1 (dwarves, gnomes, humans, night elves) совпадает с мануалом 2004 (`ds-r2-02`). Оба источника используются.

---

### forsaken — проблем нет

Sylvanas, откол от Scourge / Lich King (`ds-r2-13`); «alliance of convenience with the savage orcs and the proud tauren» честно сжато в «союзники Horde по расчёту» на фоне того же мануала, где undead — одна из четырёх рас Horde. Источник один, используется.

---

### dark-portal — проблем нет

Две официальные версии кто создал врата даны обе: Gul’dan (`ch03-dark-portal`) и Medivh + Gul’dan (`ch03-timeline-gateway`). Azeroth/Draenor и вторжение Horde в мир людей — в тех же цитатах. Оба `sourceIds` используются.

---

### third-war — проблемы есть

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | UNSUPPORTED | «Война чумы, **падения Lordaeron** и нового вторжения Burning Legion» | Из трёх членов определения на `glossary/third-war` посажены чума (`ch06-cult-first-blow`) и возвращение Legion (`ch07-four-years`). Падение Lordaeron в этих записях не названо. | Appendix I называется «the Third War»; чума — «first blow… upon northern Lordaeron»; «Four years ago, their grand design came to fruition» | Убрать «падения Lordaeron» **или** повесить на термин цитату о падении столицы |

«Четыре года назад от первого года WoW» — корректное чтение *Four years ago* в презенсе мануала 2004. Источник один, используется.

---

### sunwell — проблем нет

«Vial of sacred water stolen from the first Well of Eternity» + «hidden within the high elves’ kingdom of Quel’Thalas». Оба источника используются. Древнее происхождение, не исход Retail после Year 1.

---

### frostmourne — проблем нет

«Cursed runeblade» в Northrend; «unfathomable power» / «stole his soul». Обе цитаты — 2004 manual, источник совпадает.

---

### time-bubble — проблемы есть (в алиасах; сам summary держится)

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | DEFINITIONS | Алиасы **«Year 1», «первый год»** (на странице: «Также: Year 1, первый год») | Forever **начинается** в early Year 1 и **занимает** отдельный time bubble — это не синонимы. Алиасы выдают Year 1 за другое имя пузыря. | «begins… in the early “Year 1” period»; отдельно: «occupies its own “time bubble,” allowing the team to explore those possibilities without disrupting original Azeroth’s foundational stories.» [Found Photos](https://news.blizzard.com/en-us/article/24304071/world-of-warcraft-forever-found-photos-panel-recap) | Убрать Year 1 / «первый год» из `aliases`; оставить отсылку в тексте («начинается в раннем Year 1») |

Сам summary («собственное время Forever… ранний Year 1… не разрушая фундаментальных историй») совпадает с двумя tagged-цитатами. `forever-found-photos` используется. Живая страница подтверждает формулировки.

---

### lore-editions — проблемы есть

Мета-термин, но внутри примера есть лорные факты.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | OVERSTATED | «поздняя ретроспектива рассказывает, как **titans опасались** повредить world-soul» | Снова Aggramar, не titans. | «**Aggramar feared** the Pantheon would irreparably damage or even kill the world-soul.» | «как Aggramar опасался повредить world-soul» |
| Important | OVERSTATED | «тексты разных лет описывают **одни события** по-разному. Например, … Well of Eternity создали titans, а поздняя ретроспектива рассказывает, как titans опасались повредить world-soul» | Это не две версии одного события. WC3: titans выковали озеро. Dragonflight: Aggramar боится за world-soul и предлагает конструкты против Black Empire. Поздняя цитата Well не упоминает. | WC3: «the Titans crafted a lake of scintillating energies.» Dragonflight: world-soul / constructs / Black Empire, без Well. | Либо пара «titans сами выковали Well» vs явная поздняя версия происхождения Well, либо не называть world-soul альтернативой создания Well |

WC3-половина примера («Well создали titans») цитатой `ch00-wc3-titans-crafted-well` держится. Оба `sourceIds` используются. Фраза про политику энциклопедии — не лорный факт.

---

### dating — проблем нет

«Intentionally a little bit vague about exact time periods in-game» (`gl-r4-36`). Политика «не выдумываем годы» — правило энциклопедии, не лор. Источник используется.

---

### beta-canon — проблем нет

Лорных утверждений нет. Подписи «Бета · может измениться» и «Не подтверждено» совпадают с `LoreBadge`. Пустой `sourceIds` у ESTABLISHED-метаправила допустим схемой.

---

**Итог:** 8 терминов чистые; 10 с замечаниями, Critical нет. Самый системный сбой — космология Dragonflight (world-soul / Order / Void / N’Zoth / Yogg-Saron) как **единственное** словарное значение без ярлыка позднего слоя, плюс смешение субъекта Aggramar → titans. По Forever живые страницы Blizzard подтверждают time bubble и early Year 1; ломают термин только алиасы.