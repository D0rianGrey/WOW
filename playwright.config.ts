import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:4321/WOW'
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1 --ignore-lock',
    url: 'http://127.0.0.1:4321/WOW/',
    reuseExistingServer: true
  }
});
