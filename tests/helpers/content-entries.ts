import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

import { parse } from 'yaml';

// Frontmatter is parsed as YAML, not matched with regular expressions: a list written inline
// (`sourceIds: [a, b]`) used to read as empty, and every check over it passed while testing nothing.
export function parseFrontmatter(markdown: string, where: string): Record<string, unknown> {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/);

  if (!match) {
    throw new Error(`${where}: no frontmatter block`);
  }

  const data = parse(match[1]);

  if (data === null || typeof data !== 'object') {
    throw new Error(`${where}: frontmatter is not a mapping`);
  }

  return data as Record<string, unknown>;
}

export interface ContentEntry {
  collection: string;
  file: string;
  data: Record<string, unknown>;
}

export function loadMarkdownEntries(collection: string): ContentEntry[] {
  const directory = resolve('src/content', collection);

  if (!existsSync(directory)) {
    return [];
  }

  return readdirSync(directory)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => ({
      collection,
      file,
      data: parseFrontmatter(readFileSync(resolve(directory, file), 'utf8'), `${collection}/${file}`)
    }));
}

export function loadJsonEntries(collection: string, file: string): ContentEntry[] {
  const path = resolve('src/content', collection, file);

  if (!existsSync(path)) {
    return [];
  }

  const parsed = JSON.parse(readFileSync(path, 'utf8')) as Record<string, unknown>[];

  if (!Array.isArray(parsed)) {
    throw new Error(`${collection}/${file}: expected an array of entries`);
  }

  return parsed.map((data) => ({ collection, file, data }));
}

/** Every value of a frontmatter list field, whatever YAML shape it was written in. */
export function listField(entry: ContentEntry, field: string): string[] {
  const value = entry.data[field];

  if (value === undefined || value === null) {
    return [];
  }

  if (!Array.isArray(value)) {
    throw new Error(`${entry.collection}/${entry.file}: "${field}" is not a list`);
  }

  return value.map(String);
}
