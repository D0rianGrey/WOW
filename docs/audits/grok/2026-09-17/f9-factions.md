Проверяю все 10 фракций против леджера и официальных источников: сначала сниму карту файлов, правила Year-1 и записи evidence.Собираю тексты фракций, правила леджера и все `entryRefs` с префиксом `factions/`.Ищу все записи леджера с `factions/*` и сверю `sourceIds` с реестром источников.Выгружаю все записи леджера по каждой фракции и сверю цитаты с русским текстом.Bash недоступен — вытаскиваю записи леджера чтением JSON вокруг найденных `entryRefs`.Ищу в леджере спорные формулировки: Emerald Dream, Second War, New Horde, Gnomeregan, первую Орду и связанные персонажи.Проверяю ещё пару стыков: состав Alliance of Lordaeron на живой странице и нет ли у Al’Aketh деталей вне Found Photos.Проверил все 10 файлов в `src/content/factions/` против **всех** JSON в `docs/research/evidence/` (не только `dossiers.json`): запись считается опорой, только если в `entryRefs` есть `factions/<id>`. Цитаты на живых страницах заново не искал. Forever сверял по официальным страницам Blizzard от сентября 2026: [анонс](https://news.blizzard.com/en-us/article/24302093/carve-a-new-path-with-world-of-warcraft-forever), [Found Photos](https://news.blizzard.com/en-us/article/24304071/world-of-warcraft-forever-found-photos-panel-recap), [What’s Next](https://news.blizzard.com/en-us/article/24303862/world-of-warcraft-forever-whats-next-panel-recap), [Deep Dive](https://news.blizzard.com/en-us/article/24303313/world-of-warcraft-forever-deep-dive-panel-recap), плюс [Warcraft III: The Story So Far](https://news.blizzard.com/en-gb/article/23229617/warcraft-iii-the-story-so-far).

Критических противоречий с открытым официальным текстом нет: проблемы — это факты без `entryRefs` на эту статью, сверхцитатные добавки и связи в frontmatter.

---

## Alliance

**Вердикт:** состав Year 1, Anduin/Magni, Paladin-only, перемирие и «не чёрное/белое» держатся цитат; ломают карточку имя Gnomeregan, старт Forever без Forever-источника и лишние связи.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 1 / 2 | «потеряв **Gnomeregan**, выжившие укрылись в Ironforge» | В `entryRefs` на `factions/alliance` город не назван. `ds-r2-09` говорит только *the great city*. Имя есть в `claim` той же записи и в других файлах леджера (`timeline`, гл. 07), но не в цитате этой статьи. | «Those that survived evacuated **the great city** and fled to the protection of their dwarven cousins in Ironforge.» `ds-r2-09` | Либо расширить цитату до имени Gnomeregan, либо «эвакуировали великий город / укрылись в Ironforge» |
| Important | 1 / 6 | «шаткое перемирие — **с этой точки начинается Forever**» | Перемирие держит `ds-r2-10`. Старт Forever в tagged-цитатах Alliance нет; в `sourceIds` нет ни одного Forever-источника. | Старт Year 1: «before Kazzak reopened the Dark Portal» — [Found Photos](https://news.blizzard.com/en-us/article/24304071/world-of-warcraft-forever-found-photos-panel-recap), в леджере без `factions/alliance` | Снять вторую половину **или** добавить Forever-источник и `entryRefs` |
| Important | 7 | `relatedCharacterIds: jaina-proudmoore` | В тексте и в цитатах Alliance Jaina нет. | — | Убрать Jaina (она живёт в досье Theramore) |
| Minor | 2 | «**Во Second War** семь человеческих государств» | В `ds-r2-05` нет имени войны. На той же странице абзац стоит в блоке *Warcraft II’s Turning Tides*, и дальше текст называет Second War — факт верный, в цитате его нет. | «Seven nations united under a single banner for the first time in three thousand years, giving birth to the Alliance of Lordaeron.» [Story So Far](https://news.blizzard.com/en-gb/article/23229617/warcraft-iii-the-story-so-far) | Расширить цитату соседним предложением про Terenas / Second War **или** не ставить имя войны в essential |
| Minor | 7 | `tyrande-whisperwind`, `teldrassil` | Ночные эльфы как раса Alliance в тексте есть; Tyrande и Teldrassil — нет. | `ds-r2-02` называет night elves, не столицу и не жрицу | Убрать из related **или** назвать Tyrande/Darnassus в тексте |

**Источник-список:** оба `sourceIds` реально используются (`warcraft-iii-story-so-far` → `ds-r2-05`; manual 2004 — остальное). Лишних нет; не хватает Forever-источника, если оставлять фразу про старт Forever.

**Что держится:** Anduin — child-king Stormwind, верность Grand Alliance; Magni / ослабленный Alliance; gnomes снабжали оружием; состав dwarves/gnomes/humans/night elves; Paladin только Alliance (`fv-04`); uneasy truce.

---

## Horde

**Вердикт:** Year-1 состав, Thrall как warchief Darkspear/tauren, снятие демонического проклятия, Shaman-only и перемирие верны; происхождение «первой Horde» и «освобождение из лагерей» цитаты этой статьи не держат, Skyborne записаны сильнее источника.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 2 | «**Первую Horde развратили демоны**» | Tagged-цитата — один demon lord (Kil’jaeden) портит **orcs** через Ner’zhul, затем ученика. Ни «Horde», ни множественные демоны, ни уже собранная «первая Horde». Horde как *newly formed* после порчи есть в `ds-r1-45`, но `entryRefs` там только `characters/guldan`. | «Working through the shaman Ner'zhul, **the demon lord** gradually began corrupting **the orcs**.» `ch03-kiljaeden-nerzhul` | «Kil’jaeden развращал orcs через Ner’zhul (затем через ученика)» |
| Important | 2 | «новую собрал Thrall, **освободив orcs из лагерей**» | `ch05-durnholde-siege` — осада internment camps, не освобождение. `ch05-shaman-heritage` — освобождение от *demonic corruption*, не от лагерей. Свобода из лагерей есть в Story So Far, этого источника в `sourceIds` Horde нет. | «laying **siege to the internment camps**» `ch05-durnholde-siege`; «orcs **freed themselves from the chains of demonic corruption**» `ch05-shaman-heritage` | «осадил internment camps» + отдельно «при нём orcs сняли демоническую порчу и вернули шаманизм» |
| Important | 2 | «Horde получает **новых союзников — Skyborne**» | `ds-r2-34` предлагает игроку путь Windshaper Horde. Что Skyborne *вступают в Horde*, сказано в What’s Next (`ds-r2-35`) — tagged на windshapers/high-order, не на `factions/horde`. | «Follow the path of the **Windshaper Horde** or the High Order Alliance» `ds-r2-34` | «Skyborne могут выбрать путь Windshaper Horde» |
| Minor | 7 | alias **«New Horde»** | В цитатах с `factions/horde` этого имени нет (есть revitalizing/loose coalition). В леджере «New Horde» не встречается. Это ярлык энциклопедии, не официальное имя фракции. | `ds-r2-12`, `ch05-shaman-heritage` | Снять alias **или** оставить только как внутренний ярлык эпохи, не как имя |
| Minor | 7 | `cairne-bloodhoof`, `sylvanas-windrunner`, `durotar` | В тексте — tauren/Forsaken/Thrall; имён Cairne и Sylvanas и Durotar нет. Цитаты Horde их тоже не называют. | `ds-r2-11` — Darkspear trolls and tauren tribes, без Cairne | Убрать три id **или** назвать их в тексте |

**Источник-список:** все четыре `sourceIds` используются (`burning-crusade-story-so-far`, `warcraft-iii-manual`, manual 2004, `forever-hub`). Лишних нет.

**Что держится:** состав orcs/tauren/trolls/undead; Thrall — warchief всей Horde, включая Darkspear и tauren; loose coalition after the demon curse; союз Forsaken по расчёту с orcs и tauren; Shaman только Horde (`fv-05`); uneasy truce.

---

## Night Elves

**Вердикт:** Elune, 10 000 лет в Ashenvale, Tyrande/Darnassus, Fandral как Arch-Druid, раса Alliance и Hyjal в Forever — верны; бессмертие пришито к Archimonde/Hyjal, Emerald Dream в эту статью не привязан.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 1 | «**Дух Malfurion затерялся в Emerald Dream**, и новым Arch-Druid стал Fandral Staghelm» | Fandral держит `ds-r2-28` (*Malfurion missing*). Emerald Dream есть в `ds-r1-72` / `ch07-malfurion-lost`, но `entryRefs` — `characters/malfurion-stormrage` и глава 07, **не** `factions/night-elves`. | Статья: «With Malfurion **missing**, Fandral Staghelm … became the new Arch-Druid.» `ds-r2-28`. Нужная цитата: «Malfurion’s spirit was somehow lost within the depths of the **Emerald Dream**.» `ds-r1-72` | Добавить `factions/night-elves` в `ds-r1-72` **или** в статье: «Malfurion исчез / missing» |
| Important | 2 | «**Победа над Archimonde на Mount Hyjal** стоила ночным эльфам бессмертия» | `ds-r2-25` — победа стоила бессмертия, без имени врага и места. `ds-r2-49` — Forever-зона Hyjal как aftermath поражения Archimonde, не цена бессмертия. Связка двух цитат не доказана. Уничтожение Archimonde у Nordrassil — `ds-r1-71`, tagged только на Malfurion. | «Though **victorious**, the night elves were forced to sacrifice their cherished immortality» `ds-r2-25` | «Победа стоила бессмертия» без Archimonde/Hyjal **или** привязать `ds-r1-71` |
| Important | 7 | `relatedCharacterIds: illidan-stormrage` | В тексте Illidan не появляется (ни War of the Ancients, ни тюрьма, ни Hyjal). | — | Убрать Illidan |
| Minor | 1 | summary: «потерявший бессмертие **в Third War**» | Имя Third War в tagged-цитатах night-elves нет. | `ds-r2-25` | «после победы на Hyjal / после войны с Legion» после фикса строки про Archimonde |

**Источник-список:** все четыре источника используются (WC3 manual → Elune; 2004 → общество/Tyrande/Fandral; What’s Next → Hyjal; Found Photos → мятежники Eldre’Thalas). Лишних нет.

**Что держится:** Kaldorei / Elune; 10 000 лет immortal druidic society в Ashenvale; Tyrande — High Priestess, sole ruler after Malfurion lost; night elves — раса Alliance; Skyborne от rebels who fled Eldre’Thalas.

---

## Forsaken

**Вердикт:** откол от Scourge, Sylvanas-banshee queen, оплот под столицей, Tirisfal only, союз по расчёту, недоверие к paladins и вход в Horde через Forsaken Kingdom — верны; в связях висят персонажи и локация, которых статья не касается.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 7 | `garek-bandarion`, `dark-ranger-anya` | Статья называет кампанию Forsaken Kingdom и paladins, не Garek и не Anya. Их цитаты (`ds-r1-104`–`109`) tagged на персонажей, не на `factions/forsaken`. | `ds-r2-16` — Sylvanas and the Forsaken join the Horde | Убрать обоих **или** назвать «через Garek и Anya» с привязкой цитат |
| Important | 7 | `relatedLocationIds: bandarion-keep` | В тексте keep нет. `ds-r2-69` (tagged forsaken) — mistrust paladins, без keep. Keep — `ds-r2-68`, tagged только locations. | «Bandarion Keep in the Whispering Wood…» `ds-r2-68` | Убрать **или** вписать Bandarion Keep и добавить `entryRefs` |

**Источник-список:** все три источника используются. Лишних нет. Alias `undead` — официальное расовое имя 2004 года для играбельных Forsaken; это не выдумка.

**Что держится:** «Led by the banshee Sylvanas… These renegades call themselves the Forsaken»; dark stronghold / vow against Scourge; hold only Tirisfal Glades; alliance of convenience, no true loyalty; former paladins deeply mistrusted.

---

## Scourge

**Вердикт:** создание Kil’jaeden, падение Lordaeron, Lich King в Northrend, Kel’Thuzad в Plaguelands и «до походов в Northrend» — верны; Quel’Thalas в summary не опирается на цитаты этой статьи, «распространяли чуму» сильнее *planned*.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 1 | summary: «опустошившая Lordaeron **и Quel’Thalas**» | Lordaeron — `ds-r2-38`. Quel’Thalas в `entryRefs` `factions/scourge` нет (есть в `locations/quelthalas` и гл. 06). | «Lordaeron was crushed under the Lich King's iron heel.» `ds-r2-38` | Снять Quel’Thalas **или** привязать `ds-r2-57` / `ch06-*` |
| Important | 2 | «Lich King и … Kel’Thuzad **распространяли** чуму, чтобы пополнять Scourge» | Tagged-цитата — *planned to spread*, не свершившийся факт. Выпуск чумы — `ds-r1-90`, tagged только `characters/kelthuzad`. | «The Lich King and his mortal servant, Kel’Thuzad, **planned to spread** a terrible plague» `ds-r1-89` | «задумали / планировали распространить чуму» **или** добавить `ds-r1-90` |
| Minor | 1 | «угроза севера, **соседствующая с землями Forsaken**» | Соседство Tirisfal/Plaguelands в одной фразе есть в `ds-r1-21`, tagged на Sylvanas, не на Scourge. | `ds-r2-20` + `ds-r2-47` не говорят о соседстве | «Kel’Thuzad в Plaguelands; Forever — до поздних походов в Northrend» |

**Источник-список:** оба источника используются. `relatedFactionIds: burning-legion` оправдан формулой «demon Kil’jaeden created the Scourge».

**Что держится:** Kil’jaeden создал Scourge под will of the Lich King; Arthas — immortal Lich King in Northrend; Kel’Thuzad commands Scourge in the Plaguelands; Forever до later journeys to Northrend.

---

## Burning Legion

**Вердикт:** ковка Legion Sargeras (как ретроспектива), поход Archimonde к Nordrassil, обрушение без силы Well и Hyjal в Forever — верны; «дважды», «впервые / War of the Ancients / Highborne» и имя Gul’dan цитаты этой статьи не держат.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 1 | summary: «**дважды** вторгавшаяся в Azeroth» | В tagged-цитатах нет счёта вторжений. Следующее предложение **того же** Story So Far («After a failed attack on Azeroth 10,000 years ago, Sargeras saw an opportunity to **once again** strike») в `ds-r2-21` не вошло. | `ds-r2-21` обрывается на «he forged the demonic Burning Legion.» Живая страница: [Story So Far](https://news.blizzard.com/en-gb/article/23229617/warcraft-iii-the-story-so-far) | Расширить `ds-r2-21` следующим предложением **или** снять «дважды» |
| Important | 1 / 2 | «**Магия Highborne привлекла** Sargeras, и Legion **впервые вторгся** … **во время War of the Ancients**» | `ch01-sargeras-drawn` — Sargeras почувствовал ripples и был drawn to their origin. Нет Highborne, нет invasion, нет имени войны, нет «впервые». Вторжение в War of the Ancients — `ch01-bc-ten-thousand`, tagged на timeline, не на фракцию. | «Sargeras … felt the potent ripples and was drawn to their distant point of origin.» `ch01-sargeras-drawn` | «Sargeras почувствовал волны магии и пришёл к их источнику» без Highborne/first/WotA — пока не привязаны цитаты |
| Important | 2 | «Kil’jaeden развратил orcs через Ner’zhul **и Gul’dan**» | В `ch03-kiljaeden-nerzhul` ученик не назван. Gul’dan как apprentice — `ds-r1-45`, tagged `characters/guldan`. | «Kil'jaeden turned to **Ner'zhul's apprentice**.» `ch03-kiljaeden-nerzhul` | «через Ner’zhul, затем через его ученика» **или** привязать `ds-r1-45` |
| Important | 7 | `queen-azshara`, `medivh` | В тексте и в цитатах Legion для этой статьи их нет (есть Sargeras, Kil’jaeden, Archimonde, Ner’zhul, «ученик»). | — | Убрать обоих; Gul’dan оставлять только после фикса цитаты |
| Minor | 2 | «После гибели Archimonde **на Mount Hyjal** Legion, лишённый силы Well, рухнул» | «Unable to draw power from the Well… crumbled» — `ds-r2-23`, без Hyjal и без смерти Archimonde. Hyjal как aftermath поражения — Forever, `ds-r2-49`. | `ds-r2-23`, `ds-r2-49` | «После того как Legion не смог черпать силу Well, он рухнул»; Hyjal оставить во Forever-абзаце |

**Источник-список:** все пять `sourceIds` используются. Ретроспектива Story So Far в происхождении честно помечена («Официальная ретроспектива»). Слоя Retail-как-сейчас нет.

**Что держится:** Sargeras forged the Burning Legion, чтобы purge/cleanse all life; Archimonde по приказу Kil’jaeden шёл уничтожить Nordrassil; Legion crumbled, unable to draw from the Well; Forever открывает Hyjal как aftermath of Archimonde’s defeat.

---

## Scarlet Crusade

**Вердикт:** портрет 2004 года точен; лишняя только привязка кампании к старту Forever.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Important | 1 / 6 | «Кампания Forsaken Kingdom, **после которой начинается Forever**, называет … Sally Whitemane и Renault Mograine» | Имена держит `ds-r2-31`. «Forever начинается после кампании» в tagged-цитатах Scarlet нет; нужный источник (`forsaken-kingdom-wage-war` / анонс Forever) в `sourceIds` не стоит. | «familiar figures including … **Sally Whitemane, Renault Mograine**» `ds-r2-31`. Старт Forever: «continues shortly after the events of the Forsaken Kingdom campaign» — [Wage War](https://news.blizzard.com/en-us/article/24302499/wage-war-once-more-with-warcraft-iii-reforged-forsaken-kingdom) | Оставить имена; снять «после которой начинается Forever» **или** добавить источник |

**Источник-список:** оба источника используются для своих кусков (manual 2004 — владения/одержимость; Forsaken Kingdom — имена). «Имён лидеров в этом описании нет» — метапро источник 2004, оно верно. Alias «Алый орден» — официальная русская локализация, не выдумка. Пустые `relatedCharacterIds` при названных Whitemane/Mograine — не ошибка типа 7 (тип ловит лишние связи, не недостающие).

---

## Al’Aketh

**Вердикт:** проблем нет.

Имя, участие в борьбе за Zephras и кризис острова (пропавшие benefactors, отказывающие pylons) совпадают с `ds-r2-33` и `ds-r2-62`. Оговорка «кроме названия и участия Blizzard ничего не сообщила» на открытых страницах [Found Photos](https://news.blizzard.com/en-us/article/24304071/world-of-warcraft-forever-found-photos-panel-recap), [What’s Next](https://news.blizzard.com/en-us/article/24303862/world-of-warcraft-forever-whats-next-panel-recap) и [Deep Dive](https://news.blizzard.com/en-us/article/24303313/world-of-warcraft-forever-deep-dive-panel-recap) подтверждается: Al’Aketh больше нигде не раскрыт. `including` трёх групп не превращается в «ровно три» в теле статьи (слово «третья» только в summary — допустимое сжатие списка). `sourceIds` = `forever-found-photos` — оба факта оттуда. Связи windshapers/high-order/zephras-isle оправданы.

---

## High Order

**Вердикт:** путь Alliance, Mage/arcane legacy и борьба за остров верны; «группа Skyborne» — склейка двух разных формулировок Blizzard.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | 2 | summary: «**Одна из групп Skyborne**, спорящих за Zephras Isle» | Found Photos: группы, *включая* High Order, борются за остров — без «это Skyborne». Хаб/What’s Next: Skyborne **выбирают путь** High Order Alliance / Alliance-aligned. Al’Aketh в том же списке пути Horde/Alliance не получает — значит список групп ≠ «подгруппы Skyborne». | «Several groups are vying … including the Windshapers, the High Order, and the Al’Aketh.» [Found Photos](https://news.blizzard.com/en-us/article/24304071/world-of-warcraft-forever-found-photos-panel-recap); «Follow the path of … the **High Order Alliance**» `ds-r2-34` | «группа, за которую Blizzard предлагает Skyborne путь High Order Alliance» |

**Источник-список:** все три источника используются. «Подробности истории не публиковала» — на проверенных страницах сюжета High Order действительно нет (есть только alignment + Mage/arcane). Это не ложь. Alias «High Order Alliance» официален.

---

## Windshapers

**Вердикт:** то же, что у High Order: факты пути Horde / Shaman / elemental traditions верны; «группа Skyborne» — склейка.

| Severity | Type | Фрагмент | В чём ошибка | Цитата / URL | Минимальный фикс |
|---|---|---|---|---|---|
| Minor | 2 | summary: «**Одна из групп Skyborne**, спорящих за Zephras Isle» | Та же склейка, что у High Order. Тело статьи точнее: «одна из групп, которые … борются за контроль», плюс отдельно путь Windshaper Horde. | `ds-r2-33`, `ds-r2-34`, `ds-r2-35` | Как в теле: не называть их «группой Skyborne» в summary |

**Источник-список:** все три источника используются. Фраза «пока кризис острова углубляется» — дословный *as the crisis deepens*. Shaman + elemental traditions — `ds-r2-35`. Alias «Windshaper Horde» официален.

---

## Сводка

| Статья | Критических | Важных | Мелких |
|---|---|---|---|
| Alliance | 0 | 3 | 2 |
| Horde | 0 | 3 | 2 |
| Night Elves | 0 | 3 | 1 |
| Forsaken | 0 | 2 | 0 |
| Scourge | 0 | 2 | 1 |
| Burning Legion | 0 | 4 | 1 |
| Scarlet Crusade | 0 | 1 | 0 |
| Al’Aketh | 0 | 0 | 0 |
| High Order | 0 | 0 | 1 |
| Windshapers | 0 | 0 | 1 |

Ни одна статья не выдаёт поздний Retail (Wrath/Cata/BFA) за текущее состояние Year 1. Расхождения официальных текстов (PDT/PST, две географии Shen’dralas, «not one living elf» vs BC) во фракциях не всплывают. Самый частый класс ошибок: факт **есть в леджере у соседнего досье/главы**, но `entryRefs` на `factions/*` не проставлен — энциклопедия при этом пишет его как доказанный для карточки фракции.