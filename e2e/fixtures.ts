import { test as base, expect, type Page } from "@playwright/test";

/** A URL that must not exist; used to test the 404 page. */
export const NOT_FOUND_PATH = "/this-page-does-not-exist";

/**
 * Every test fails if the page logs a console error or throws, so broken
 * scripts or hydration errors surface even when the visible UI looks fine.
 */
export const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: [
    async ({ page }, use) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
      page.on("console", (m) => {
        if (m.type() !== "error") return;
        // Opening the 404 page on purpose makes the browser log its 404 status; that one is expected.
        const from = m.location().url;
        if (from && new URL(from).pathname === NOT_FOUND_PATH && m.text().includes("404")) return;
        errors.push(`console: ${m.text()} (${from})`);
      });
      await use(errors);
      expect(errors, "console errors / uncaught exceptions").toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1280) < 640;

/** Fails if the page scrolls sideways (a common mobile layout bug). */
export async function expectNoHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow, "horizontal overflow in px").toBeLessThanOrEqual(0);
}
