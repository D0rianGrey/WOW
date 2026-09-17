/** Keep internal links valid both at the site root and under GitHub Pages.
 *
 * Page paths get a trailing slash so a click lands on the served URL directly: the host answers
 * "/WOW/timeline" with a 301 to "/WOW/timeline/". Asset paths (anything with a file extension)
 * and fragments are left alone.
 */
export function route(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\/+/, '');
  const [pathname, fragment] = clean.split('#');
  const isFile = /\.[a-z0-9]+$/i.test(pathname);
  const suffix = pathname === '' || isFile || pathname.endsWith('/') ? '' : '/';
  const anchor = fragment === undefined ? '' : `#${fragment}`;

  return `${base}/${pathname}${suffix}${anchor}`;
}
