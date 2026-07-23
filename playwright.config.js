// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// The Jekyll site is served under its `baseurl` (see _config.yml).
const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:4000/Reveal-Jekyll/';

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['html', { open: 'never' }], ['list']] : 'list',

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Build and serve the Jekyll site before the tests run.
  webServer: {
    command: 'bundle exec jekyll serve --host 127.0.0.1 --port 4000',
    url: BASE_URL,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
});
