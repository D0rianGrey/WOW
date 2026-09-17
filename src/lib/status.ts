// Anything newer or less certain than established history must show where it came from.
export const loreStatuses = [
  'ESTABLISHED',
  'FOREVER',
  'CHANGED',
  'BETA',
  'UNCONFIRMED'
] as const;

export type LoreStatus = (typeof loreStatuses)[number];

export interface StatusPresentation {
  symbol: string;
  label: string;
  description: string;
}

// One table for every place a status is shown: badge, search results, filters.
export const statusPresentation: Record<LoreStatus, StatusPresentation> = {
  ESTABLISHED: {
    symbol: '◆',
    label: 'История Warcraft',
    description: 'Устоявшаяся история Warcraft, используемая как предыстория.'
  },
  FOREVER: {
    symbol: '✦',
    label: 'Forever',
    description: 'Подтверждённое дополнение World of Warcraft: Forever.'
  },
  CHANGED: {
    symbol: '↔',
    label: 'Изменено',
    description: 'Документированное изменение или расхождение с прежней версией истории.'
  },
  BETA: {
    symbol: '△',
    label: 'Бета · может измениться',
    description: 'Сведения из беты. Не окончательный канон: содержание может измениться.'
  },
  UNCONFIRMED: {
    symbol: '?',
    label: 'Не подтверждено',
    description: 'Слух, интерпретация или датамайнинг. Не установленный факт.'
  }
};

export const statusLabels: Record<LoreStatus, string> = Object.fromEntries(
  loreStatuses.map((status) => [status, statusPresentation[status].label])
) as Record<LoreStatus, string>;
