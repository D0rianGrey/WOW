import { describe, expect, it } from 'vitest';

import { canonicalIds } from '../src/lib/canonical-ids';

describe('canonical entity IDs', () => {
  it('uses unique kebab-case IDs within and across collections', () => {
    const all = Object.values(canonicalIds).flat();

    for (const id of all) {
      expect(id, `${id} is not kebab-case`).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }

    expect(new Set(all).size).toBe(all.length);
  });
});
