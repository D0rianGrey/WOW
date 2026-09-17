import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://d0riangrey.github.io',
  base: '/WOW',
  output: 'static',
  integrations: [sitemap()]
});
