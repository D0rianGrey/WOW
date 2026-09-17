import { route } from './routes';

// Turns a "collection/id" reference into the page (or anchor) that shows that entry.
export function entityRefHref(ref: string): string {
  const [collection, id] = ref.split('/');

  switch (collection) {
    case 'timeline':
      return route(`timeline#${id}`);
    case 'forever':
      return route(`forever-changes#${id}`);
    case 'glossary':
      return route(`glossary#${id}`);
    case 'chapters':
      return route(`chapters/${id}`);
    default:
      return route(`${collection}/${id}`);
  }
}
