import type { LoreStatus } from './status';

export interface TimelineFilterable {
  eraId: string;
  status: LoreStatus;
  characterIds: readonly string[];
  factionIds: readonly string[];
  locationIds: readonly string[];
}

export interface TimelineFilter {
  eraId?: string;
  status?: LoreStatus;
  characterId?: string;
  factionId?: string;
  locationId?: string;
}

// sortKey only orders events; it is never shown and never stands for a calendar year.
export function sortTimeline<T extends { sortKey: number; id: string }>(events: readonly T[]): T[] {
  return [...events].sort((left, right) => {
    if (left.sortKey !== right.sortKey) {
      return left.sortKey - right.sortKey;
    }

    return left.id.localeCompare(right.id);
  });
}

export function matchesTimelineFilter(event: TimelineFilterable, filter: TimelineFilter): boolean {
  if (filter.eraId && event.eraId !== filter.eraId) {
    return false;
  }

  if (filter.status && event.status !== filter.status) {
    return false;
  }

  if (filter.characterId && !event.characterIds.includes(filter.characterId)) {
    return false;
  }

  if (filter.factionId && !event.factionIds.includes(filter.factionId)) {
    return false;
  }

  if (filter.locationId && !event.locationIds.includes(filter.locationId)) {
    return false;
  }

  return true;
}

export function filterTimeline<T extends TimelineFilterable & { sortKey: number; id: string }>(
  events: readonly T[],
  filter: TimelineFilter
): T[] {
  return sortTimeline(events).filter((event) => matchesTimelineFilter(event, filter));
}
