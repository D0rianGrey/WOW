# Official-source research — checked 2026-09-17

## Corrections after the audit (2026-09-17, later the same day)

The verified evidence now lives in `docs/research/evidence/` and is machine-checked with `npm run verify:evidence`. Where this note disagrees with the ledger, the ledger wins. Corrections to the sections below:

- **H3, H4, P2 — Warcraft II and Warcraft III manuals are readable.** Both open over plain `http://ftp.blizzard.com/...` (the `https://` host has a certificate mismatch, which is why earlier fetches failed). The Warcraft III manual (PDF dated April 2002) contains full chapters on human, orc, undead and night elf history. Registered as `warcraft-iii-manual` and `warcraft-ii-manual`.
- **P3 — the Well of Eternity preview is not 403.** The page opened with HTTP 200 and full text during the audit. Registered as `well-of-eternity-preview`; the earlier ruling "do not restore dead links" does not apply to it.
- **K2 — the Legion Warrior artifact page opens** (`https://worldofwarcraft.blizzard.com/en-us/news/19942707`). Registered as `legion-warrior-artifact-reveal`.
- **P1 — confirmed accurate.** The Dragon Aspects article does name C’Thun, N’Zoth and Yogg-Saron and calls the Old Gods "physical manifestations of the Void". One audit pass by another model claimed otherwise; that claim was checked against the page and rejected.
- **Remaining gaps, narrowed.** The Warcraft III manual now covers the classic War of the Ancients, the exile of the Highborne to Quel’Thalas, the planting of Nordrassil and the night elves' immortality. Still without an open official text: the order of the Old Gods' arrival, the primordial elemental wars, Y’Shaarj and the Well's origin in later cosmology, the dark-troll origin of the kaldorei, the breakup of Arathor, and the gnomes' Curse of Flesh lineage.
- **Official texts that disagree** (keep both in content): First War length (Warcraft II manual "nearly five years" vs. the Reforged retrospective's march on Stormwind "three years after" the portal); the interwar gap ("nearly 13 years" and "the past decade" in the same retrospective); Lothar's death (a "titanic battle" vs. a "suicidal charge"); survivors of Quel’Thalas (2004 manual "not one living elf" vs. Burning Crusade Classic "most of its population"); the naga transformation (Well implosion vs. a later bargain with N’Zoth); Shen’dralas location ("south of Desolace through the Valley of Bones" vs. "between Mulgore and Desolace"); the Forever launch time zone (PDT and PST on the same announcement page).

Read-only web research for the WoW Forever encyclopedia. All substantive sources below are Blizzard publications. Community posts, search-engine date labels, and third-party speculation are not evidence. Some search metadata incorrectly says “last year”; use the publication page/BlizzCon context, not that metadata.

## F1 — Core announcement
https://news.blizzard.com/en-us/article/24302093/carve-a-new-path-with-world-of-warcraft-forever
Title: Carve a New Path with World of Warcraft: Forever. Blizzard Entertainment; September 12, 2026 announcement context. Successfully opened.
Confirmed: separate permanent offering beside modern and Classic WoW; original continents and level 60; starts after Warcraft III Reforged: Forsaken Kingdom and before Molten Core; announced November 4, 2026 launch and September 17 beta.
Exact excerpt (12 words): “Set after the events of Warcraft III Reforged: Forsaken Kingdom and before”.
Boundary: treat release dates as announced plans; do not infer beta availability simply from today's date. Announcement and What's Next disagree in PDT/PST labeling; avoid reproducing an exact launch timezone without clarification.

## F2 — Continuity, locations, races, paladins (primary anchor)
https://news.blizzard.com/en-us/article/24304071/world-of-warcraft-forever-found-photos-panel-recap
Title: World of Warcraft: Forever Found Photos Panel Recap. Blizzard Entertainment; September 13, 2026 panel context. Successfully opened.
Exact excerpt: “WoW: Forever occupies its own ‘time bubble,’” (quotation punctuation normalized).
Confirmed: starts in original WoW's Year 1, before Kazzak reopens the Portal. Skyborne/shen’dorei means hidden people: rebels departed Eldre’Thalas after the War of the Ancients, sheltered in Skywall; wind spirits anchored their island. Zephras now loses its benefactors and pylons; Windshapers, High Order, Al’Aketh compete. Forsaken paladins follow Forsaken Kingdom; mistrust and wielding Light in undeath frame their journey. Bandarion Keep, Whispering Wood, Tirisfal is important; level-60 mount quest emphasizes Retribution. Hyjal explores the battle's aftermath. Riverglades connects neighboring eastern regions, with Powderfuse Port, goblins, gnolls, ogres, Twilight’s Hammer and Brotherhood of the Horse. Shen’dralas south of Desolace expands Eldre’Thalas stories.
Boundary: “separate continuity” is a reasonable editorial label for “time bubble,” not proof every historical fact is reset. No confirmed eventual plot resolutions. Do not equate Shen’dralas (place), Shen’dralar (group), and shen’dorei (Skyborne).

## F3 — Geography and playable differences
https://news.blizzard.com/en-us/article/24303862/world-of-warcraft-forever-whats-next-panel-recap
Title: World of Warcraft: Forever What’s Next Panel Recap. Blizzard Entertainment; September 12, 2026 panel context. Successfully opened.
Exact excerpt: “Mount Hyjal invites you to explore the aftermath of Archimonde’s defeat”.
Confirmed: Hyjal restoration/Darkwhisper Gorge; Shen’dralas between Mulgore and Desolace, connected to Shen’dralar, Eldre’Thalas, Dire Maul and centaurs. Riverglades mid-30s–mid-40s; Zephras starter levels 1–12. Skyborne choose faction at creation: Horde follows elemental traditions and has Shaman; Alliance follows ancestral arcane traditions and has Mage. Both get Warrior/Hunter/Rogue/Druid. Hyjal Summit planned 20-player; Barrow Deeps 10-player.
Boundary: F3 says 150+ Riverglades quests, F2 nearly 200; avoid declaring contradiction or inventing an exact total. Do not silently substitute Cataclysm Hyjal narrative or Burning Crusade Hyjal raid narrative.

## F4 — Forsaken Kingdom itself
https://news.blizzard.com/en-us/article/24298590/warcraft-iii-reforged-forsaken-kingdom-deep-dive-recap
Title: Warcraft III Reforged: Forsaken Kingdom Deep Dive Recap. Blizzard Entertainment; BlizzCon September 2026 context. Successfully opened (old slug redirects here).
Exact excerpt: “the Last Days of Lordaeron prologue campaign and the main campaign”.
Confirmed: four linear prologue missions; main campaign uses a soft open-world RPG structure inspired by Rexxar; Stratholme and Undercity locations. Patch 3.0 adds Forsaken Paladin hero with Righteous Fury, Consecration, Sacred Aura, Cleansing Fire. Consecration neither harms nor benefits friendly undead.
Boundary: this source is not a mission transcript. It does not alone substantiate detailed Sylvanas/Putress/Scarlet Crusade plot, individual dialogue, endings, or how every Paladin reconciles undeath and Light. Separate Warcraft III hero mechanics from WoW class mechanics.

## H1 — Best readable official Warcraft I/II summary
https://news.blizzard.com/en-gb/article/23229617/warcraft-iii-the-story-so-far
Title: Warcraft III: The Story So Far. Blizzard Entertainment, Reforged-era retrospective; successfully opened.
Exact excerpt: “Seven nations united under a single banner”.
Sections cover Medivh/Gul’dan and the Dark Portal; fall of Stormwind, Garona and Llane; refugees and Alliance of Lordaeron; Gul’dan's desertion, Lothar's death, Turalyon's victory, internment; setup of Warcraft III.
Boundary: later official retrospective, not original 1994/1995 wording; label source era. It contains specific old cosmology and dates that may differ from other revisions; avoid casually merging them into a universal definitive chronology.

## H2 — Contemporary-to-vanilla historical baseline, usable PDF
https://assets.blz-contentstack.com/v3/assets/blt3452e3b114fab0cd/blt2e9295db02a222fc/6025bcbb6968b53d529edb2a/media_manual_classic_enUS.pdf
Title: World of Warcraft online manual; copyright 2004, Blizzard. Successfully opened, 114 PDF pages with two printed pages per spread.
Appendix I History begins printed p156; useful Warcraft III material at PDF indices 83–85 (zero-based). Covers Archimonde, Hyjal, Illidan, Frozen Throne, Sylvanas/Forsaken and Undercity. Appropriate baseline for original-WoW-era retrospective, not confirmation of new Forever quests. Appendix II Races in Conflict begins printed p168.
The older us.media.blizzard.com/manuals/wow/wow-classic-manual-enUS.pdf URL returned 502; above CDN copy works.

## H3 — Warcraft II official manual link and context
https://news.blizzard.com/en-us/article/24055598/fight-for-honor-in-warcraft-ii-tides-of-darkness-now-available-on-battle-net
Successfully opened Blizzard article; confirms ruined Stormwind/Second War, both campaigns, expansion, and links the manual.
https://ftp.blizzard.com/pub/misc/Warcraft%202%20Battlenet%20edition.PDF
Indexed official manual endpoint; retrieval through click failed. Do not claim full PDF was read.

## H4 — Warcraft III original manual endpoint
https://ftp.blizzard.com/pub/misc/Warcraft%20III%20Manual.pdf
Indexed official source; direct fetch returned 502. Use as optional reference link only until downloaded/read. No usable Blizzard-hosted Warcraft I original manual was verified in this pass; H1 supplies a readable official history substitute. Wiki transcriptions were found but deliberately not used as primary evidence.

## Integration guidance
Tag claims by shared RTS/vanilla background versus announced Forever content. Mark unknown names/quest endings as unknown. Page identity and wording were checked live; game/beta execution was not performed. Full detail of new campaigns requires actual campaign evidence, not expanding promotional blurbs into invented lore.

# Additional prehistory and RTS background pass — checked 2026-09-17

## P1 — Azeroth, Old Gods, Black Empire, keepers, titan-forged
https://news.blizzard.com/en-us/article/23876527/the-story-so-far-take-wing-through-time-with-the-dragon-aspects
Title: The Story So Far: Take Wing Through Time with the Dragon Aspects. Blizzard; Dragonflight-era retrospective (2022 context; exact date absent from parsed page). Opened and read.
Evidence sections: The Rise of the Aspects; Dragon Aspect Leaders; Tyr's Sacrifice; The Sting of Betrayal.
Confirmed: titans ordering Azeroth risk damaging its world-soul through direct intervention; Aggramar proposes constructs. Pantheon-empowered keepers lead titan-forged against Black Empire armies. Old Gods are Void manifestations; C’Thun, N’Zoth, Yogg-Saron named. Titans identified with Order. Tyr and five proto-dragons confront Galakrond; dragon Aspects receive guardianship. Neltharion's corruption and Dragon Soul betrayal feature in War of the Ancients.
Boundary: later cosmology, not wording established in Warcraft III/vanilla manuals. Use “later official account of ancient history,” not automatic Forever confirmation. The same article contains future deaths/afterlife facts: exclude those from a Year-1 political present. It does not establish the complete elemental-war sequence or Y’Shaarj-to-Well creation chain.

## P2 — Important direct revision evidence: Warcraft III manual
https://ftp.blizzard.com/pub/misc/Warcraft%20III%20Manual.pdf
2002 manual. Full fetch still fails (502 in browser; local download refused hostname-mismatched TLS certificate, not bypassed). Search index supplies a substantial paragraph for the exact official URL.
Indexed statement: Titans shape Azeroth from living stone, create sea giants, raise one continent, and craft the Well of Eternity centrally as life's source; empower the five dragon guardians. This is explicitly the older version, not the modern world-soul injury account.
Exact excerpt: “the Titans crafted a lake of scintillating energies.”
Boundary: indexed content only, not a complete PDF inspection. Do not blend this creation account silently with P1 or an unverified Chronicle summary. This is a useful source for explaining that Warcraft cosmology developed across editions, not for declaring one reconstruction universally authoritative.

## P3 — Ancient kaldorei, Azshara, war, Sundering
https://worldofwarcraft.blizzard.com/en-us/news/3502666/patch-43-dungeons-preview-part-two-well-of-eternity
Title: Patch 4.3 Dungeons Preview, Part Two: Well of Eternity. Zarhym; September 19, Cataclysm 2011 context. Official indexed text readable; direct open gives 403 and news counterpart failed.
Confirmed from indexed official article: Zin-Azshari stands by the Well; Highborne under Azshara open a Twisting Nether portal for the Legion and prepare Sargeras's entry; event approximately 10,000 years before dungeon frame. Tyrande and Illidan oppose the invasion; Xavius/Peroth’arn, Mannoroth and Varo’then identified. The catastrophe leads to Great Sundering and Maelstrom.
Boundary: patch dungeon preview includes time-travelling player heroes and Dragon Soul retrieval. Those are Cataclysm's framing, not a claim that Forever players participated. This page does not establish early kaldorei biological origin or provide the full novel/campaign sequence.

## P4 — Naga aftermath corroboration (indexed)
https://worldofwarcraft.blizzard.com/en-gb/news/9986542/vashjir-surviving-the-depths
Title: Vashj'ir: Surviving the Depths. Blizzard, Cataclysm context; page shows April 15, year not verified. Official indexed text read.
Confirms Vashj'ir's submersion during Sundering and transformation of Azshara/Highborne into naga after the Well's implosion. Boundary: does not by itself explain the exact bargain/agent causing transformation; later underwater gameplay is not Forever history.

## K1 — High elves, Quel'Thalas, human alliance, Third War
https://news.blizzard.com/en-gb/article/23679744/burning-crusade-classic-the-story-so-far
Title: Burning Crusade Classic: The Story So Far. Blizzard, 2021 prelaunch context. Opened and read; Legacy of the Blood Elves section.
Confirmed: exiles reach Lordaeron, fight trolls, found Quel’Thalas; vial from first Well used to establish Sunwell; Silvermoon grows. Amani assault prompts alliance with Arathor, exchanging instruction in magic for military help. Arthas devastates kingdom and Sunwell; Anasterian dies; Kael’thas gathers survivors under blood-elf name. Human hostility/naga aid lead to imprisonment, Vashj's rescue and Outland alliance with Illidan. Rommath returns as messenger.
Boundary: BC-era retrospective, not proof blood elves will join Forever Horde. Do not treat all high elves as blood elves or all trolls as Amani. Omit fixed population percentages absent here. Do not import prelaunch gameplay or post-vanilla campaign outcomes into the Forever present.

## K2 — Arathor founding corroboration (indexed)
https://worldofwarcraft.blizzard.com/en-gb/news/19942707/
Title: Legion: Warrior Artifact Reveal. Blizzard, Legion 2015 preview context; exact date not verified. Indexed passage; direct page open failed.
Stromkar passage identifies Thoradin as ruler who first united humanity, founded Arathor, and helped end Troll Wars. Boundary: Legion weapon-recovery story is later framing. Source does not list all seven later kingdoms or establish their detailed founding chronology. Use H1 for Alliance of Lordaeron rather than confusing ancient Arathor with the Second War alliance.

## K3 — Dwarven clans
https://news.blizzard.com/en-us/article/14301664/muradin-hero-week
Title: Muradin Hero Week. Blizzard, Heroes of the Storm promotional article, 2014 context. Opened and read, Warcraft-history section.
Confirmed: Bronzebeard/Wildhammer/Dark Iron once share Ironforge under Modimus Anvilmar; succession conflict after his death becomes War of the Three Hammers; Bronzebeards retain city and expel rivals. Magni's Ironforge joins Alliance against invading Horde.
Boundary: use specifically the Warcraft historical prose, not crossover combat mechanics or alternate skins. Article's Muradin history is later retrospective, while 2004 manual represents then-known belief that he died.

## K4 — Ragnaros and dwarven civil-war consequence
https://news.blizzard.com/en-us/article/24165121/20th-anniversary-realms-molten-core-and-onyxia-s-lair-now-live
Title: 20th Anniversary Realms: Molten Core and Onyxia's Lair Now Live. Blizzard; Classic Anniversary context, 2024. Opened through search content; source reproduces dungeon lore.
Confirms Thaurissan summons Ragnaros during dwarven civil war; Molten Core at Blackrock Depths; burning lake links plane of fire. Boundary: does not establish primordial elemental origin or titanic imprisonment. “Now live” refers to Anniversary realms, not Forever.

## K5 — Troll civilization and loa
https://news.blizzard.com/en-us/article/21701414/battle-for-azeroth-preview-zuldazar-visitors-guide
Title: Battle for Azeroth Preview: Zuldazar Visitor’s Guide. Blizzard, 2018 preview context. Opened and read.
Confirms Zuldazar's ancient imperial significance, millennia of royal tombs, Dazar as first king/founder, loa worship (Wild Gods or spirits). Boundary: Rastakhan/Zul/rebellion gameplay is BFA framing; not Forever's confirmed political state. Do not use this to invent dates of troll evolution, Aqir War, or precise ancient territorial maps.
Additional provenance caveat: https://news.blizzard.com/en-us/article/21182074/world-of-warcraft-at-blizzcon-2017 has indexed claim that trolls predate titans; avoid adopting this isolated sweeping statement as settled cross-edition chronology.

## K6 — Earthen terminology
https://news.blizzard.com/en-us/article/24104276/meet-the-earthen-a-new-playable-allied-race
Title: Meet the Earthen, A New Playable Allied Race. Blizzard, June 5, 2024 context. Opened and read.
Confirms earthen as titan-forged living-stone people, with distinct isolated Khaz Algar society. Boundary: does not by itself prove the full dwarf/gnome descent mechanism, and does not make modern playable earthen part of Forever's roster.

## H2 additional page index: 2004 baseline politics and character roles
Same 2004 manual URL as H2. Successfully inspected relevant passages; PDF indices below are zero-based.
- 82–86: Arthas/Frostmourne; Sylvanas and Kel’Thuzad; Thrall/Cairne/Grom; Tyrande/Malfurion/Illidan; Hyjal; Kael/Vashj; Daelin/Jaina; Frozen Throne.
- 86–89: Durotar/tauren/Darkspear coalition; Theramore; Arthas in Northrend; Kel’Thuzad in Plaguelands; Forsaken in Tirisfal; missing Varian and child Anduin.
- 89–93: Magni; Muradin considered dead; missing Brann; Gnomeregan radiation/refugees; Gelbin elected High Tinker; Malfurion missing, Fandral/Teldrassil.
Boundary: era-specific beliefs, not proof of deaths or future outcomes. Manual's rhetorical universal claims about annihilation should not erase known survivors. Avoid copying its moralizing racial descriptions. Keyword searches for Azshara/Arathor had no matches; this manual is chiefly Third War/vanilla baseline.

## Remaining evidence gaps and editorial implications
No sufficiently verified primary text in this bounded pass for full primordial elemental wars, Old God arrival order, Y’Shaarj removal creating the Well, dark-troll-to-kaldorei transformation, exact Arathor breakup chronology, or gnome/mechagnome Curse of Flesh sequence. These are research gaps, not claims that the lore is false. Either omit causal detail, explicitly source a verified book/game passage later, or label later-retail context. Do not fill with recollection or forum quotes. Distinguish Warcraft III manual (2002), vanilla manual (2004), later Blizzard retrospectives, and explicit Forever announcements as four source layers.

