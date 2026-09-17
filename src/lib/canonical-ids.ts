// Canonical entity IDs shared by chapters, the timeline, dossiers and search.
// Register an ID here before any content references it, so every layer agrees on one spelling.
// Whether an entity gets a dossier (and what it says) is decided per task with ledger evidence.

export const canonicalIds = {
  characters: [
    'anduin-wrynn',
    'arthas-menethil',
    'cairne-bloodhoof',
    'dark-ranger-anya',
    'garek-bandarion',
    'grom-hellscream',
    'guldan',
    'illidan-stormrage',
    'jaina-proudmoore',
    'kelthuzad',
    'malfurion-stormrage',
    'medivh',
    'orgrim-doomhammer',
    'queen-azshara',
    'sylvanas-windrunner',
    'thrall',
    'tyrande-whisperwind',
    'uther-the-lightbringer'
  ],
  factions: [
    'alaketh',
    'alliance',
    'burning-legion',
    'forsaken',
    'high-order',
    'horde',
    'night-elves',
    'scarlet-crusade',
    'scourge',
    'windshapers'
  ],
  locations: [
    'azeroth',
    'bandarion-keep',
    'durotar',
    'kalimdor',
    'lordaeron',
    'mount-hyjal',
    'northrend',
    'quelthalas',
    'riverglades',
    'shendralas',
    'stormwind',
    'teldrassil',
    'tirisfal-glades',
    'undercity',
    'zephras-isle'
  ]
} as const;

// Display names for filters, chips and search. Canonical Warcraft names stay in English.
export const entityNames: Record<string, string> = {
  'anduin-wrynn': 'Anduin Wrynn',
  'arthas-menethil': 'Arthas Menethil',
  'cairne-bloodhoof': 'Cairne Bloodhoof',
  'dark-ranger-anya': 'Dark Ranger Anya',
  'garek-bandarion': 'Garek Bandarion',
  'grom-hellscream': 'Grom Hellscream',
  guldan: 'Gul’dan',
  'illidan-stormrage': 'Illidan Stormrage',
  'jaina-proudmoore': 'Jaina Proudmoore',
  kelthuzad: 'Kel’Thuzad',
  'malfurion-stormrage': 'Malfurion Stormrage',
  medivh: 'Medivh',
  'orgrim-doomhammer': 'Orgrim Doomhammer',
  'queen-azshara': 'Queen Azshara',
  'sylvanas-windrunner': 'Sylvanas Windrunner',
  thrall: 'Thrall',
  'tyrande-whisperwind': 'Tyrande Whisperwind',
  'uther-the-lightbringer': 'Uther the Lightbringer',
  alaketh: 'Al’Aketh',
  alliance: 'Alliance',
  'burning-legion': 'Burning Legion',
  forsaken: 'Forsaken',
  'high-order': 'High Order',
  horde: 'Horde',
  'night-elves': 'Night Elves',
  'scarlet-crusade': 'Scarlet Crusade',
  scourge: 'Scourge',
  windshapers: 'Windshapers',
  azeroth: 'Azeroth',
  'bandarion-keep': 'Bandarion Keep',
  durotar: 'Durotar',
  kalimdor: 'Kalimdor',
  lordaeron: 'Lordaeron',
  'mount-hyjal': 'Mount Hyjal',
  northrend: 'Northrend',
  quelthalas: 'Quel’Thalas',
  riverglades: 'Riverglades',
  shendralas: 'Shen’dralas',
  stormwind: 'Stormwind',
  teldrassil: 'Teldrassil',
  'tirisfal-glades': 'Tirisfal Glades',
  undercity: 'Undercity',
  'zephras-isle': 'Zephras Isle'
};

export type CanonicalCollection = keyof typeof canonicalIds;
export type CharacterId = (typeof canonicalIds.characters)[number];
export type FactionId = (typeof canonicalIds.factions)[number];
export type LocationId = (typeof canonicalIds.locations)[number];
