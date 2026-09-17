import type { LoreStatus } from './status';

export interface SearchDocument {
  id: string;
  type: string;
  title: string;
  summary: string;
  href: string;
  status: LoreStatus;
  keywords: string[];
}

export interface SearchFilter {
  status?: LoreStatus;
  type?: string;
}

// Longest endings first; a light suffix strip lets «Орды», «Орде» and «Орда» meet on «орд».
const russianEndings = [
  'ами', 'ями', 'ого', 'его', 'ому', 'ему', 'ыми', 'ими', 'ах', 'ях', 'ов', 'ев', 'ей', 'ой', 'ий', 'ый',
  'ая', 'яя', 'ое', 'ее', 'ом', 'ем', 'ам', 'ям', 'их', 'ых', 'а', 'я', 'ы', 'и', 'у', 'ю', 'е', 'о'
];

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/ё/g, 'е')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’'`]/g, '');
}

export function stem(token: string): string {
  if (/[а-я]/.test(token)) {
    for (const ending of russianEndings) {
      if (token.length - ending.length >= 3 && token.endsWith(ending)) {
        return token.slice(0, -ending.length);
      }
    }

    return token;
  }

  if (token.length > 4 && token.endsWith('s')) {
    return token.slice(0, -1);
  }

  return token;
}

export function tokenize(text: string): string[] {
  return normalize(text)
    .split(/[^a-zа-я0-9]+/)
    .filter((token) => token.length > 0)
    .map(stem);
}

function tokenMatches(queryToken: string, documentToken: string): boolean {
  if (queryToken === documentToken) {
    return true;
  }

  if (queryToken.length < 3) {
    return false;
  }

  return documentToken.startsWith(queryToken) || (documentToken.length >= 3 && queryToken.startsWith(documentToken));
}

// Tokenising a document costs a stem per word, so the result is cached per document object:
// without this every keystroke re-tokenises the whole index.
const tokenCache = new WeakMap<SearchDocument, { title: string[]; body: string[] }>();

function documentTokens(document: SearchDocument): { title: string[]; body: string[] } {
  const cached = tokenCache.get(document);

  if (cached !== undefined) {
    return cached;
  }

  const tokens = {
    title: tokenize([document.title, ...document.keywords].join(' ')),
    body: tokenize(document.summary)
  };

  tokenCache.set(document, tokens);

  return tokens;
}

export function scoreDocument(document: SearchDocument, query: string): number {
  const queryTokens = tokenize(query);

  if (queryTokens.length === 0) {
    return 0;
  }

  const { title: titleTokens, body: bodyTokens } = documentTokens(document);
  let score = 0;

  for (const queryToken of queryTokens) {
    if (titleTokens.some((token) => tokenMatches(queryToken, token))) {
      score += 3;
    } else if (bodyTokens.some((token) => tokenMatches(queryToken, token))) {
      score += 1;
    } else {
      return 0;
    }
  }

  return score;
}

export function searchDocuments(documents: readonly SearchDocument[], query: string, filter: SearchFilter = {}): SearchDocument[] {
  return documents
    .filter((document) => !filter.status || document.status === filter.status)
    .filter((document) => !filter.type || document.type === filter.type)
    .map((document) => ({ document, score: scoreDocument(document, query) }))
    .filter((result) => result.score > 0)
    .sort((left, right) => right.score - left.score || left.document.title.localeCompare(right.document.title))
    .map((result) => result.document);
}

// The index is embedded in a <script> tag, so a "<" in any title, summary or alias must not be
// able to close that tag; JSON.parse decodes \u003c back to "<" in the browser.
export function serializeSearchIndex(documents: SearchDocument[]): string {
  return JSON.stringify(documents).replaceAll('<', '\\u003c');
}
