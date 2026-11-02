import { test, expect, expectNoHorizontalScroll } from "./fixtures";
import { site } from "@/data/site";

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

test("tells the story in order", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const chapters = await page.getByRole("heading", { level: 2 }).allTextContents();
  expect(chapters.length).toBeGreaterThanOrEqual(4);
  for (const company of ["Hacettepe", "Aselsan", "Inomera", "ASML"]) {
    await expect(page.getByText(company).first()).toBeVisible();
  }
});

test("keeps private CV details off the page", async ({ page }) => {
  const text = await page.locator("main").innerText();
  expect(text).not.toMatch(/\+31|\b6\s?\d{8}\b|Utrecht/);
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
