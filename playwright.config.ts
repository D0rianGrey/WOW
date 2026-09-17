import { defineConfig } from '@playwright/test';

// E2E runs against the production build served by `astro preview`,
// so base-path, asset and static-output bugs surface before deployment.
// `--ignore-lock` keeps preview in the foreground: when Astro detects an AI agent it otherwise
// detaches into a background server and Playwright treats the exited process as a crash.
// Playwright forces colour for the web server and workers; an inherited NO_COLOR (set by some agent
// shells) is then ignored anyway and only makes Node print a warning in every process.
if (process.env.NO_COLOR !== undefined) {
  delete process.env.NO_COLOR;
}

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:4321/WOW'
  },
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4321 --ignore-lock',
    url: 'http://127.0.0.1:4321/WOW/',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000
  }
});
