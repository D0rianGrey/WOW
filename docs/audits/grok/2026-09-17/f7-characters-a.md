Начинаю с инвентаризации карточек, леджера и источников — затем сверю каждую фактическую формулировку с цитатами и официальными материалами.Смотрю промпт, схему леджера и все девять карточек, параллельно собираю matching `entryRefs`.Вытягиваю полные записи леджера по всем девяти персонажам и параллельно сверю Forever-источники.Bash недоступен — читаю леджер кусками по номерам строк из поиска.Ищу в леджере формулировки, которых не хватает в карточках, и сверяю спорные факты с официальными страницами.Проверяю ещё пару спорных мест в официальных текстах — затем сверю формулировки карточек с цитатами.Forever сверен по живым страницам Blizzard (анонс 12 сентября 2026, старт в Year 1 после Forsaken Kingdom). Цитаты леджера заново на страницах не искал. Запись считается опорой карточки только при `entryRefs`, содержащем `characters/<id>`.

---

## anduin-wrynn

**Вердикт:** Year-1 портрет (10 лет, Varian пропал по пути в Theramore, армии ушли на Horde) держится мануала 2004; ломает карточку выдуманная причина коронации.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | OVERSTATED | «корону, **чтобы сохранить порядок в королевстве**, отдали мальчику» | В цитате есть пропажа отца и то, что Anduin уже king. Церемонии передачи короны и цели «сохранить порядок» нет. Тот же разрыв повторен в `ds-r2-42` (claim «корону дали Anduin»), но эта запись привязана к `locations/stormwind`, не к персонажу. | «Recently his father, King Varian Wrynn, went missing under suspicious circumstances while en route to a diplomatic summit at Theramore Isle.» (`ds-r1-101`) | «отец недавно пропал по пути на встречу в Theramore; к первому году королём назван десятилетний Anduin» |

Источник-список и связи: без замечаний (`alliance`, `stormwind`; алиас «король Anduin» = *King Anduin* / *child-king*). Forever-абзац — рамка, не новый факт.

---

## arthas-menethil

**Вердикт:** Серебряная длань, убийство Kel’Thuzad, Stratholme, смерть Uther и Terenas, слияние с Ner’zhul и Year-1 Lich King в Northrend держатся; в карточку не привязаны место взятия Frostmourne и Frozen Throne, а во frontmatter торчат Quel’Thalas и Sylvanas, которых текст не касается.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | UNSUPPORTED | «**В Northrend** Arthas взял Frostmourne» | Имя клинка и кража души есть в записях карточки; **место** взятия — только в `ch06-northrend-frostmourne`, без `characters/arthas-menethil`. | «He tracked the plague’s source to the arctic land of Northrend… he fell into the Lich King’s trap when he took up the cursed runeblade Frostmourne» (`ch06-northrend-frostmourne`) | Добавить `characters/arthas-menethil` в `entryRefs` этой записи **или** не называть Northrend местом взятия клинка |
| Important | UNSUPPORTED | «Позже, **у Frozen Throne**, он надел шлем Ner’zhul» | Слияние духов шлемом есть (`ds-r1-06`). Слова Frozen Throne в записях Arthas нет; гонка к трону сидит на Illidan (`ds-r1-79`). | «Even weakened as he was, Arthas outmaneuvered Illidan and reached the Frozen Throne first.» (`ds-r1-79`, entryRefs только Illidan) | Либо привязать цитату к Arthas, либо «надел шлем Ner’zhul; духи слились» без Frozen Throne |
| Important | RELATIONS | `relatedCharacterIds: sylvanas-windrunner`; `relatedLocationIds: quelthalas` | Ни текст, ни цитаты с `characters/arthas-menethil` не называют Sylvanas и Quel’Thalas. Падение Quel’Thalas и подъём banshee есть в леджере, но на `characters/sylvanas-windrunner` / главу 06. | — | Убрать оба id **или** дописать поход на Quel’Thalas / судьбу Sylvanas и привязать цитаты |
| Important | UNSUPPORTED | «Судьба, которую он приготовил Lordaeron, **определяет жизнь Forsaken в Tirisfal Glades**» | На этой карточке нет цитаты про Forsaken и Tirisfal (`ds-r1-93` сидит на Kel’Thuzad). | «Sylvanas and her rebel Forsaken hold only the Tirisfal Glades» (`ds-r1-93`) | Снять фразу **или** привязать цитату к Arthas и явно пометить как следствие, не как состояние самого Arthas |
| Minor | OVERSTATED | «**demon** Mal’Ganis» | В урезанной цитате леджера слова *demon* нет. На той же странице патча, двумя клаузами ниже, оно есть. | Ledger: «After manipulating the prince into purging Stratholme of life, he finally fell to Frostmourne». Живая страница: «…yet **a demon** does not die so easily.» [HotS 2018-10-16](https://news.blizzard.com/en-us/article/22548919/heroes-of-the-storm-patch-notes-october-16-2018) | Дописать цитату до *demon* |

Слой Mal’Ganis помечен («поздний официальный текст»). `sourceIds` все реально используются, в том числе `forever-found-photos` через `ds-r2-47`. Алиасы «Lich King» / «принц Arthas» официальны.

---

## cairne-bloodhoof

**Вердикт:** проблем нет. Вождь, дружба с Thrall, Mulgore, Thunder Bluff и Year-1 правление совпадают с мануалом 2004 (`ds-r1-94`–`ds-r1-98`). Связи `thrall` / `horde` / `kalimdor` текст и цитаты держат; алиас «вождь tauren» — его должность в тех же цитатах (*chieftain* / *mighty chief*).

---

## dark-ranger-anya

**Вердикт:** роль в Forsaken Kingdom и мост в Forever держатся; во frontmatter лишняя Sylvanas.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | RELATIONS | `relatedCharacterIds: sylvanas-windrunner` | Текст Anya Sylvanas не называет. Список «Sylvanas, Putress, …» стоит в `ds-r1-106` только на Garek. | «Their story unfolds alongside familiar figures including Sylvanas Windrunner…» (`ds-r1-106`, entryRefs: `characters/garek-bandarion`) | Убрать id **или** написать, что история идёт рядом с Sylvanas, и добавить `characters/dark-ranger-anya` в `ds-r1-106` |

«Больше о ней официально не рассказано» на открытых страницах What’s Next и Wage War подтверждается: именитого бэкстори нет. Оба `sourceIds` используются. Алиас «Anya» — имя из анонса.

---

## garek-bandarion

**Вердикт:** проблем нет. «Newly risen Forsaken warrior», сердце кампании вместе с Anya, четырёхлетний разрыв, список знакомых фигур (подмножество цитаты), обещание про Undercity / культуру / почему Scourge не вернул Lordaeron и «Forever continues shortly after» совпадают с привязанными цитатами. «Судьба официально не пересказана» на открытых анонсах 12–13 сентября 2026 не опровергается. Связи и оба источника оправданы.

---

## grom-hellscream

**Вердикт:** Warsong, предательство, Cenarius, снятие проклятия и пометка поздних текстов (очищение Jaina+Thrall, смерть) держатся; в путь до первого года вставлены лагеря, которых в цитате карточки нет.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | OVERSTATED | «Когда Thrall не нашёл гордых воинов **в лагерях**» | Цитата карточки — только «не нашёл гордых воинов». Лагеря есть в других записях (Thrall / глава 05), не на Grom. Claim `ds-r1-56` уже пересказывает шире цитаты; текст это повторил. | «Having not found the proud warriors he hoped to discover, Thrall set out to find the last undefeated orc chieftain, Grom Hellscream.» (`ds-r1-56`) | Снять «в лагерях» **или** привязать цитату про internment camps |

Алиас **Grommash Hellscream** — официальное полное имя (в т.ч. [Blizzard Gear](http://worldofwarcraft.blizzard.com/en-us/news/20056873)); в Year-1 цитатах карточки его нет, но это имя, не реткон-состояние. `jaina-hero-week` и `garrosh-heart-of-war` в секции «В первый год» честно помечены как поздние тексты. `sourceIds` все используются.

---

## guldan

**Вердикт:** титулы Hero Week, кровь Mannoroth, дезертирство и смерть у гробницы держатся; на карточку повешены воспоминания Illidan без своей цитаты, BC-цепочка Ner’zhul дана как бесслойный канон, а во frontmatter — чужой Medivh и алиас-организация.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | UNSUPPORTED / OVERSTATED | «Illidan поглотил силу артефакта Skull of Gul’dan **и получил часть его воспоминаний**» | Привязанная к Gul’dan цитата заканчивается на поглощении энергий. Воспоминания — `ds-r1-77`, entryRefs только Illidan. | Gul’dan: «consumed the energies of a powerful warlock artifact known as the Skull of Gul’dan.» (`ds-r1-49`). Illidan: «He also gained some of Gul’dan’s old memories» (`ds-r1-77`) | Снять воспоминания здесь **или** добавить `characters/guldan` в `ds-r1-77` |
| Important | SPOILER / LAYER | «Когда **шаман** Ner’zhul отказался дальше служить Legion, Kil’jaeden обратился к его ученику Gul’dan» | Цепочка ученик/Kil’jaeden взята из ретроспективы Burning Crusade Classic (2021) и подана как обычная предыстория. На карточке Malfurion тот же источник честно назван «поздним». Слово *shaman* в урезанной цитате леджера нет (оно в предыдущем предложении той же статьи). | «When Ner'zhul refused to serve the Legion's agenda past a certain point, Kil'jaeden turned to Ner'zhul's apprentice.» (`ds-r1-45`); предыдущее предложение на [той же странице](https://news.blizzard.com/en-gb/article/23679744/burning-crusade-classic-the-story-so-far): «Working through **the shaman Ner'zhul**…» | «Поздний официальный рассказ: …»; дописать цитату, если оставляете «шаман» |
| Important | RELATIONS | `relatedCharacterIds: medivh` | Текст Medivh не называет. В привязанных цитатах его тоже нет (сделка Medivh–Gul’dan есть в той же статье Story So Far, но не вынесена в запись с `characters/guldan`). | — | Убрать id **или** дописать сделку о Dark Portal и привязать цитату |
| Important | RELATIONS | `aliases: "Shadow Council"` | Это организация, которую он основал, не имя и не титул персонажа. В Hero Week *Founder of the Shadow Council* — отдельный титул-описание. | «Founder of the Shadow Council» (`ds-r1-43`) | Убрать из `aliases`; титул уже есть в теле («основателем Shadow Council») |

Остальное (дезертирство, подъём гробницы, разорван демонами) совпадает с WC3 Manual и помечено как рассказ руководства 2002. Все пять `sourceIds` используются. `orgrim-doomhammer` в цитате `ds-r1-46` есть, связь удержана.

---

## illidan-stormrage

**Вердикт:** бегство к Highborne, Hyjal, 10 000 лет, Kil’jaeden и бегство в Outland держатся; братство, новый Well, «украденная» вода и имя Skull на эту карточку не привязаны, а расхождение 2004 / TFT–BC о финале у Frozen Throne не показано.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | UNSUPPORTED | «Illidan — **брат** Furion (Malfurion) Stormrage»; «плане **брата**» | Факт в леджере есть (*whose own brother, Illidan*), но `ds-r1-68` / `ch01-illidan-magic` висят на Malfurion / главе 01, не на Illidan. | «Stormrage, whose own brother, Illidan, practiced the high-borne’s magics» (`ds-r1-68`, entryRefs: `characters/malfurion-stormrage`) | Добавить `characters/illidan-stormrage` в `ds-r1-68` (и лучше в `ds-r1-70`) |
| Important | OVERSTATED / LAYER | «брат **Furion (Malfurion)**» | Оба имени верны, но без слоя. Карточка брата это делает: 2002 = Furion, поздние тексты = Malfurion. Здесь скобки уравнивают их. | `ds-r1-68` (Furion, WC3 Manual) vs `ds-r1-70` (Malfurion, BC Classic) | Как у Malfurion: «в руководстве 2002 — Furion; поздние тексты — Malfurion» |
| Important | OVERSTATED | «вылил **украденную** воду Well» | Цитата: *precious waters*, не *stolen*. *Stolen* в леджере относится к **high elves** и Sunwell, не к Illidan. Claim `ch01-illidan-vials` уже врёт шире цитаты и на персонажа не привязан. | Illidan: «poured his vials, containing the **precious** waters from the Well of Eternity» (`ds-r1-75`). High elves: «a vial of sacred water **stolen** from the first Well» (`ch02` / `ds-r2`) | «воду Well из своих сосудов» |
| Important | UNSUPPORTED | «**создав новый Well of Eternity**» | Привязанная цитата заканчивается на озере. Коалесценция нового Well — `ch01-new-well`, без Illidan. | «The Well’s potent energies quickly ignited and coalesced into a new Well of Eternity.» (`ch01-new-well`) | Привязать `ch01-new-well` **или** остановиться на «вылил воду в горное озеро» |
| Important | UNSUPPORTED | «Поглотив силу **Skull of Gul’dan**» | На Illidan повешено следствие (*By doing so, demonic features*), без антецедента. Имя артефакта — `ds-r1-49` на Gul’dan. | «consumed the energies of a powerful warlock artifact known as the Skull of Gul’dan» (`ds-r1-49`) | Добавить `characters/illidan-stormrage` в `ds-r1-49` **или** не называть Skull |
| Important | CHRONOLOGY / оба текста | «Kil’jaeden приказал ему уничтожить Ner’zhul, **но Arthas опередил** Illidan у Frozen Throne»; «**После поражения** … бежать обратно в Outland» | Мануал 2004: гонка, Arthas дошёл первым, Illidan бежал *in disgrace* (не «проиграл бой»). BC Classic (и кампания TFT): долгий бой, Arthas **срубил** Illidan и оставил в снегу; союзники унесли его в Outland. Правило энциклопедии: при расхождении давать оба. На карточке только сжатая версия 2004, плюс «поражение», которого в этой цитате нет. | 2004: «Arthas outmaneuvered Illidan and reached the Frozen Throne first.» / «flee back to Outland **in disgrace**» (`ds-r1-79`, `ds-r1-80`). BC: «After a long, bloody battle, Arthas … **cut down Illidan** and left him for dead in the snow. Illidan was recovered by his allies and returned to Outland» ([Story So Far](https://news.blizzard.com/en-gb/article/23679744/burning-crusade-classic-the-story-so-far)) | Две версии рядом; «in disgrace» ≠ автоматически «после поражения в бою» |
| Minor | UNSUPPORTED | «во время **War of the Ancients**» | Название войны в цитатах карточки не появляется (оно в главе 01 без entryRef на Illidan). | — | Снять имя войны **или** привязать запись главы |

`sourceIds` оба используются. Алиас «Betrayer» официален (в т.ч. та же BC-статья: *the Betrayer*). Связи Malfurion / Tyrande / Arthas / Gul’dan, night-elves / burning-legion, Hyjal — по тексту и цитатам уместны; Northrend держится только через Frozen Throne — после фикса «у Frozen Throne» это перестанет быть дырой.

---

## jaina-proudmoore

**Вердикт:** происхождение, Stratholme, Theramore, Daelin и Year-1 «сильнейшая живая человеческая волшебница» держатся; summary приписывает ей Hyjal, а тело делает Medivh автором её командования и расследование чумы без своей цитаты.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | UNSUPPORTED | summary: «**союзница Thrall на Hyjal**» | В теле Hyjal нет. Ни одна запись с `characters/jaina-proudmoore` Hyjal не называет. На странице Hero Week сотрудничество у последнего рубежа Legion есть, в леджер персонажа оно не вынесено. | Привязано: «Thrall and Jaina Proudmoore … realized that they had to put aside their differences.» (`ds-r1-27`). На [Hero Week](https://news.blizzard.com/en-us/article/16887806/jaina-hero-week), но не в entryRefs: «Jaina and Thrall worked together to delay the Legion’s advance while night elf druids prepared one last defense» | Убрать Hyjal из summary **или** завести/привязать цитату и написать в теле с пометкой источника |
| Important | OVERSTATED | «**Под руководством Medivh она возглавила** человеческие силы в Kalimdor» | В рабочей цитате 2004 Medivh ведёт к **перемирию**; Jaina уже названа *the leader of the human forces*. Руководство Medivh ≠ назначение главой. | «**Under Medivh’s guidance**, Thrall and Jaina Proudmoore – **the leader of** the human forces in Kalimdor – realized that they had to put aside their differences.» (`ds-r1-27`) | «Уже глава человеческих сил в Kalimdor, вместе с Thrall под руководством Medivh отложила вражду» |
| Important | UNSUPPORTED | «Вместе с Arthas Jaina **расследовала чуму**» | В `ds-r1-26` только уход из Stratholme. Расследование — `ch06-jaina-investigated`, без `characters/jaina-proudmoore`. | «Jaina was asked to investigate it along with Arthas Menethil» (`ch06-jaina-investigated`) | Привязать эту запись **или** начать с Stratholme |
| Minor | UNSUPPORTED | «**Шаткий мир между Theramore и Durotar** — одна из опор политики первого года» | *Uneasy truce* в леджере есть (`ds-r2-10`), но на Alliance/Horde, не на Jaina. | «starting with the uneasy truce between the Alliance and Horde» (`ds-r2-10`) | Привязать цитату **или** оставить только то, что уже на карточке (Theramore, смерть Daelin) |

Слой: Hero Week полон Retail (взрыв Theramore, глава Kirin Tor, Vol’jin); в тело Year 1 это не утекло, статус «В первый год» берётся из мануала 2004. `sourceIds` все используются. Связи arthas / thrall / medivh, alliance, kalimdor / lordaeron оправданы. Алиас «леди Proudmoore» — обычный официальный титул Lady Jaina Proudmoore.

---

### Сводка по тяжести

Больше всего дыр на **Illidan**, **Arthas**, **Gul’dan** и **Jaina**: факты часто *есть* в леджере, но `entryRefs` смотрят в другую карточку/главу, и русский текст от этого становится шире своей опоры. **Garek** и **Cairne** чистые. **Anduin**, **Anya**, **Grom** — точечные правки.