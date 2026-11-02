import { test, expect, expectNoHorizontalScroll } from "./fixtures";
import { site } from "@/data/site";

/**
 * The site describes past and current work anonymously. The names that must
 * never appear (employers, clients, university, internal projects, private
 * contact details) live in the CONFIDENTIAL_TERMS secret, comma- or
 * newline-separated, so this public repo doesn't list them either.
 * In CI the secret is required; locally the name check is skipped without it.
 */
const TERMS = (process.env.CONFIDENTIAL_TERMS ?? "")
  .split(/[,\n]/)
  .map((t) => t.trim().toLowerCase())
  .filter(Boolean);

// Metrics are only checked in visible text: the HTML has CSS/JS full of percentages.
const METRICS = [/\b\d+(\.\d+)?\s?M\b/, /\b\d+\s?%/];

for (const path of ["/", "/about", "/projects"]) {
  test(`@smoke ${path} keeps employers, projects and private details anonymous`, async ({ page, request }) => {
    if (process.env.CI) expect(TERMS.length, "CONFIDENTIAL_TERMS secret is not set").toBeGreaterThan(0);
    await page.goto(path);
    const text = (await page.locator("body").innerText()).toLowerCase();
    const html = (await (await request.get(path)).text()).toLowerCase(); // includes <meta> tags
    // Report only the index so a failing log doesn't print the term itself.
    TERMS.forEach((term, i) => {
      expect(text.includes(term), `confidential term #${i + 1} in visible text`).toBe(false);
      expect(html.includes(term), `confidential term #${i + 1} in HTML`).toBe(false);
    });
    for (const re of METRICS) expect(text, `visible text matches ${re}`).not.toMatch(re);
  });
}

test.describe("about page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("About nav link opens the page and marks it current", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await nav.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "page");
  });

  test("is one continuous text", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("main").getByRole("heading", { level: 2 })).toHaveCount(0);
    expect(await page.locator("article p").count()).toBeGreaterThanOrEqual(5);
  });

  test("Get in touch goes to the contact section", async ({ page }) => {
    await page.getByRole("main").getByRole("link", { name: "Get in touch" }).click();
    await expect(page).toHaveURL(/\/#contact$/);
    await expect(page.getByRole("heading", { name: "Contact" })).toBeInViewport();
  });

  test("LinkedIn button opens the profile in a new tab", async ({ page }) => {
    const link = page.getByRole("main").getByRole("link", { name: "LinkedIn" });
    await expect(link).toHaveAttribute("href", site.linkedin);
    await expect(link).toHaveAttribute("target", "_blank");
  });

  test("inline links to the projects page work", async ({ page }) => {
    await page.getByRole("main").getByRole("link", { name: "projects page" }).first().click();
    await expect(page).toHaveURL(/\/projects$/);
  });

  test("no horizontal scroll", async ({ page }) => {
    await expectNoHorizontalScroll(page);
  });
});
