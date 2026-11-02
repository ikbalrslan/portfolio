import { test, expect, NOT_FOUND_PATH } from "./fixtures";

/**
 * Crawls every page and checks every link and button, so a new button or link
 * is covered without writing a dedicated test for it.
 */
const pages = ["/", "/projects", NOT_FOUND_PATH];

// These sites block automated requests (LinkedIn answers 999), so only the URL shape is checked.
const NO_FETCH = [/linkedin\.com/];

test.describe("every link resolves", () => {
  for (const path of pages) {
    test(`links on ${path}`, async ({ page, request, baseURL }) => {
      await page.goto(path);
      const hrefs = await page
        .locator("a[href]")
        .evaluateAll((els) => [...new Set(els.map((a) => (a as HTMLAnchorElement).getAttribute("href")!))]);
      expect(hrefs.length).toBeGreaterThan(0);

      for (const href of hrefs) {
        if (href.startsWith("mailto:")) {
          expect(href, "mailto link").toMatch(/^mailto:[^@\s]+@[^@\s]+\.[a-z]+$/i);
          continue;
        }
        const url = new URL(href, page.url());
        if (url.hash && url.origin === new URL(baseURL!).origin) {
          // In-page anchor: the target element must exist on the destination page.
          await page.goto(url.toString());
          await expect(page.locator(url.hash), `anchor ${href}`).toHaveCount(1);
          continue;
        }
        if (NO_FETCH.some((re) => re.test(url.hostname))) {
          expect(url.protocol).toBe("https:");
          continue;
        }
        const res = await request.get(url.toString(), { maxRedirects: 5, timeout: 20_000 });
        expect(res.status(), `GET ${url}`).toBeLessThan(400);
      }
    });
  }
});

test.describe("every button works", () => {
  for (const path of pages) {
    test(`buttons on ${path}`, async ({ page }) => {
      await page.goto(path);
      const buttons = page.getByRole("button");
      const count = await buttons.count();
      for (let i = 0; i < count; i++) {
        const b = buttons.nth(i);
        await expect(b).toBeEnabled();
        await expect(b).toHaveAccessibleName(/.+/);
        await b.click();
      }
      // Console errors from any click fail the test via the fixture.
    });
  }
});

test("every link and button has an accessible name", async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);
    const unnamed = await page.locator("a, button").evaluateAll((els) =>
      els
        .filter((el) => !(el.getAttribute("aria-label") || el.textContent?.trim()))
        .map((el) => el.outerHTML.slice(0, 120)),
    );
    expect(unnamed, `unnamed controls on ${path}`).toEqual([]);
  }
});
