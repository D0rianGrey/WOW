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

export type CanonicalCollection = keyof typeof canonicalIds;
export type CharacterId = (typeof canonicalIds.characters)[number];
export type FactionId = (typeof canonicalIds.factions)[number];
export type LocationId = (typeof canonicalIds.locations)[number];
