// The ten eras of spec §6. They group chapters and timeline events; every factual statement
// about an era lives in the chapters and timeline entries, not here.

export interface Era {
  id: string;
  title: string;
  topics: string;
  chapterSlugs: string[];
}

export const eras = [
  {
    id: 'prologue',
    title: 'Пролог: Azeroth до знакомого мира',
    topics: 'Titans, Old Gods, Black Empire, titan-forged, Dragon Aspects',
    chapterSlugs: ['azeroth-before-civilization']
  },
  {
    id: 'ancient',
    title: 'Эпоха I: Древний Azeroth',
    topics: 'Kaldorei, Queen Azshara, Highborne, Burning Legion, War of the Ancients, Great Sundering',
    chapterSlugs: ['war-of-the-ancients']
  },
  {
    id: 'kingdoms',
    title: 'Эпоха II: Народы и королевства',
    topics: 'High elves, Quel’Thalas, Arathor, trolls, dwarves, gnomes',
    chapterSlugs: ['kingdoms-and-peoples']
  },
  {
    id: 'orcs-and-humans',
    title: 'Эпоха III: Orcs & Humans',
    topics: 'Draenor, Gul’dan, Medivh, Dark Portal, First War, падение Stormwind',
    chapterSlugs: ['orcs-and-humans']
  },
  {
    id: 'alliance-and-horde',
    title: 'Эпоха IV: Alliance и Horde',
    topics: 'Second War, Alliance of Lordaeron, Orgrim Doomhammer, лагеря для интернированных',
    chapterSlugs: ['second-war']
  },
  {
    id: 'new-horde',
    title: 'Эпоха V: New Horde',
    topics: 'Thrall, освобождение orcs, шаманизм, Kalimdor, tauren, Darkspear',
    chapterSlugs: ['thrall-and-new-horde']
  },
  {
    id: 'fall-of-lordaeron',
    title: 'Эпоха VI: Arthas и падение Lordaeron',
    topics: 'Чума, Stratholme, Frostmourne, Quel’Thalas, Scourge',
    chapterSlugs: ['arthas-and-lordaeron']
  },
  {
    id: 'third-war',
    title: 'Эпоха VII: Third War',
    topics: 'Возвращение Burning Legion, Jaina, Thrall, ночные эльфы, Mount Hyjal',
    chapterSlugs: ['third-war-to-forever']
  },
  {
    id: 'bridge',
    title: 'Эпоха VIII: Мост к Forever',
    topics: 'Frozen Throne, Forsaken, Undercity, Forsaken Kingdom, мир первого года',
    chapterSlugs: ['third-war-to-forever']
  },
  {
    id: 'forever',
    title: 'Эпоха IX: World of Warcraft: Forever',
    topics: 'Year 1, time bubble, новые области, Skyborne, Forsaken Paladins',
    chapterSlugs: ['third-war-to-forever']
  }
] as const satisfies readonly Era[];

export type EraId = (typeof eras)[number]['id'];

export const eraIds = eras.map((era) => era.id) as [EraId, ...EraId[]];
