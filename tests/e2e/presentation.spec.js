const { test, expect } = require('@playwright/test');

// Wait until reveal.js has finished booting.
async function waitForReveal(page) {
  await page.waitForFunction(() => window.Reveal && window.Reveal.isReady());
}

test.describe('Presentation layout (Jekyll-rendered markdown)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('index.html');
    await waitForReveal(page);
  });

  test('reveal.js boots and shows the first slide', async ({ page }) => {
    await expect(page.locator('.reveal .slides')).toBeVisible();
    const present = page.locator('section.present:not(.stack)');
    await expect(present).toBeVisible();
    await expect(present).toContainText('Introduction');
  });

  test('loads the vendored reveal.js 6.x core', async ({ page }) => {
    const version = await page.evaluate(() => window.Reveal.VERSION);
    expect(version).toBe('6.0.1');
  });

  test('navigates horizontally between slides', async ({ page }) => {
    const start = await page.evaluate(() => window.Reveal.getIndices().h);
    await page.evaluate(() => window.Reveal.right());
    await page.waitForFunction((h) => window.Reveal.getIndices().h > h, start);
    const next = await page.evaluate(() => window.Reveal.getIndices().h);
    expect(next).toBeGreaterThan(start);
  });

  test('markdown is rendered to HTML (headings)', async ({ page }) => {
    // The intro slide is authored in Markdown and rendered server-side by Jekyll.
    const headings = page.locator('section.present:not(.stack) :is(h1,h2,h3)');
    expect(await headings.count()).toBeGreaterThan(0);
  });

  test('code blocks are highlighted (Rouge)', async ({ page }) => {
    // Jump to the "Getting started" slide which contains a fenced code block.
    await page.evaluate(() => window.Reveal.slide(1));
    const code = page.locator('section.present:not(.stack) pre code');
    await expect(code.first()).toBeVisible();
    // Rouge wraps tokens in spans server-side.
    expect(await page.locator('section.present:not(.stack) .highlight, section.present:not(.stack) pre code span').count()).toBeGreaterThan(0);
  });

  test('basement (vertical) slides are reachable', async ({ page }) => {
    await page.evaluate(() => window.Reveal.slide(1));
    const before = await page.evaluate(() => window.Reveal.getIndices().v);
    await page.evaluate(() => window.Reveal.down());
    await page.waitForFunction((v) => window.Reveal.getIndices().v > v, before);
    const after = await page.evaluate(() => window.Reveal.getIndices().v);
    expect(after).toBeGreaterThan(before);
  });

  test('slide numbers are enabled via config', async ({ page }) => {
    await expect(page.locator('.reveal .slide-number')).toBeVisible();
  });

  test('markdown fragments are generated (kramdown inline attributes)', async ({ page }) => {
    // Fragments are authored in Markdown with {:.fragment} and rendered server-side.
    const fragments = await page.locator('.reveal .slides .fragment').count();
    expect(fragments).toBeGreaterThan(0);
  });

  test('global _config.yml reveal options are applied', async ({ page }) => {
    const cfg = await page.evaluate(() => window.Reveal.getConfig());
    expect(cfg.controls).toBe(true);
    expect(cfg.progress).toBe(true);
    expect(cfg.center).toBe(true);
    expect(cfg.hash).toBe(true);
    expect(cfg.autoAnimate).toBe(true);
    expect(cfg.transition).toBe('slide');
    expect(cfg.slideNumber).toBe('c');
    expect(cfg.width).toBe(960);
    expect(cfg.height).toBe(700);
  });

  test('built-in plugins are registered (highlight is server-side here)', async ({ page }) => {
    const plugins = await page.evaluate(() => ({
      markdown: window.Reveal.hasPlugin('markdown'),
      search: window.Reveal.hasPlugin('search'),
      zoom: window.Reveal.hasPlugin('zoom'),
      notes: window.Reveal.hasPlugin('notes'),
      math: window.Reveal.hasPlugin('mathjax3'),
      highlight: window.Reveal.hasPlugin('highlight'),
    }));
    expect(plugins.markdown).toBe(true);
    expect(plugins.search).toBe(true);
    expect(plugins.zoom).toBe(true);
    expect(plugins.notes).toBe(true);
    expect(plugins.math).toBe(true);
    // This layout highlights code with Rouge server-side, so the client plugin is off.
    expect(plugins.highlight).toBe(false);
  });

  test('per-slide transitions from front matter are wired', async ({ page }) => {
    await expect(page.locator('.reveal .slides section[data-transition="zoom"]')).toHaveCount(1);
    await expect(page.locator('.reveal .slides section[data-transition="concave"]')).toHaveCount(1);
    await expect(page.locator('.reveal .slides section[data-transition="fade"]')).toHaveCount(1);
  });

  test('per-slide backgrounds (image, color, video) are wired', async ({ page }) => {
    await expect(page.locator('.reveal .slides section[data-background-color]').first()).toHaveCount(1);
    await expect(page.locator('.reveal .slides section[data-background-video]')).toHaveCount(1);
    await expect(page.locator('.reveal .slides section[data-background]').first()).toBeAttached();
  });

  test('a color background is actually rendered by reveal', async ({ page }) => {
    // reveal.js turns data-background="#dddddd" into a rendered background element.
    const colored = await page
      .locator('.reveal .backgrounds .slide-background')
      .evaluateAll((els) => els.filter((e) => getComputedStyle(e).backgroundColor === 'rgb(221, 221, 221)').length);
    expect(colored).toBe(1);
  });

  test('search plugin opens a search box on Ctrl+Shift+F', async ({ page }) => {
    await expect(page.locator('.reveal .searchbox')).toHaveCount(0);
    await page.locator('.reveal').click();
    await page.keyboard.press('Control+Shift+KeyF');
    await expect(page.locator('.reveal .searchbox')).toBeVisible();
  });
});
