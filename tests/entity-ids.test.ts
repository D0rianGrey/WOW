import { describe, expect, it } from 'vitest';

import { entityCollections, loadEntityIds } from './helpers/content-index';

describe('entity IDs', () => {
  const ids = loadEntityIds();

  it('are kebab-case and unique across collections', () => {
    const all = entityCollections.flatMap((collection) => ids[collection]);

    expect(all.length).toBeGreaterThan(20);

    for (const id of all) {
      expect(id, `${id} is not kebab-case`).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }

    expect(new Set(all).size, 'an ID is used in two collections').toBe(all.length);
  });
});
