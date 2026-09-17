export const loreStatuses = [
  'ESTABLISHED',
  'FOREVER',
  'CHANGED',
  'BETA',
  'UNCONFIRMED'
] as const;

export type LoreStatus = (typeof loreStatuses)[number];
