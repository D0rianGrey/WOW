/** Keep internal links valid both at the site root and under GitHub Pages. */
export function route(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`;
}
