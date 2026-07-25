const { test, expect } = require('@playwright/test');

async function waitForReveal(page) {
  await page.waitForFunction(() => window.Reveal && window.Reveal.isReady());
}

test.describe('Raw layout (client-side markdown)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('raw-example.html');
    await waitForReveal(page);
  });

  test('markdown is split into slides by the reveal markdown plugin', async ({ page }) => {
    // More than one horizontal slide means the "---" separators were parsed.
    const horizontal = await page.evaluate(() => window.Reveal.getHorizontalSlides().length);
    expect(horizontal).toBeGreaterThan(1);
  });

  test('first slide renders the markdown heading', async ({ page }) => {
    const slide = page.locator('section.present:not(.stack)');
    await expect(slide).toContainText('Raw Markdown');
    await expect(slide.locator('strong')).toContainText('Markdown');
  });

  test('basement slide is created from "___"', async ({ page }) => {
    const before = await page.evaluate(() => window.Reveal.getIndices().v);
    await page.evaluate(() => window.Reveal.down());
    await page.waitForFunction((v) => window.Reveal.getIndices().v > v, before);
    await expect(page.locator('section.present:not(.stack)')).toContainText('Basement slide');
  });

  test('code blocks get syntax highlighting from the highlight plugin', async ({ page }) => {
    await page.evaluate(() => window.Reveal.slide(1));
    const code = page.locator('section.present:not(.stack) pre code');
    await expect(code.first()).toBeVisible();
    // highlight.js wraps tokens in spans.
    const spans = await page.locator('section.present:not(.stack) pre code span').count();
    expect(spans).toBeGreaterThan(0);
  });

  test('fragments are hidden until stepped through', async ({ page }) => {
    await page.evaluate(() => window.Reveal.slide(2));
    const fragmentCount = await page.locator('section.present:not(.stack) .fragment').count();
    expect(fragmentCount).toBeGreaterThan(0);
    const visibleBefore = await page.locator('section.present:not(.stack) .fragment.visible').count();
    await page.evaluate(() => window.Reveal.next());
    await page.waitForFunction(
      (n) => document.querySelectorAll('section.present .fragment.visible').length > n,
      visibleBefore
    );
  });

  test('all built-in plugins are registered (highlight included in raw mode)', async ({ page }) => {
    const plugins = await page.evaluate(() =>
      ['markdown', 'highlight', 'search', 'zoom', 'notes', 'mathjax3'].map((id) => window.Reveal.hasPlugin(id))
    );
    expect(plugins.every(Boolean)).toBe(true);
  });

  test('speaker notes are parsed from "Note:"', async ({ page }) => {
    // The code slide carries a "Note:" block that becomes an <aside class="notes">.
    await page.evaluate(() => window.Reveal.slide(1));
    await expect(page.locator('section.present:not(.stack) aside.notes')).toHaveCount(1);
    await expect(page.locator('section.present:not(.stack) aside.notes')).toContainText('speaker view');
  });

  test('math is typeset by MathJax', async ({ page }) => {
    // Jump to the last horizontal slide which contains $$ E = mc^2 $$.
    await page.evaluate(() => window.Reveal.slide(window.Reveal.getHorizontalSlides().length - 1));
    // MathJax loads from a CDN and typesets asynchronously into <mjx-container>.
    await expect(page.locator('section.present:not(.stack) mjx-container').first()).toBeVisible({ timeout: 15000 });
  });
});
