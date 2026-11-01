import { test, expect, expectNoHorizontalScroll } from "./fixtures";
import { featuredProjects, projects } from "@/data/projects";
import { site } from "@/data/site";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("hero shows name and both buttons", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(site.name);
  await expect(page.getByRole("link", { name: "View projects" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Get in touch" })).toBeVisible();
});

test("View projects button opens the projects page", async ({ page }) => {
  await page.getByRole("link", { name: "View projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
});

test("Get in touch button scrolls to contact", async ({ page }) => {
  await page.getByRole("link", { name: "Get in touch" }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.getByRole("heading", { name: "Contact" })).toBeInViewport();
});

test("selected work lists exactly the featured projects", async ({ page }) => {
  const section = page.locator("section", { has: page.getByRole("heading", { name: "Selected work" }) });
  await expect(section.getByText(`${featuredProjects.length} of ${projects.length}`)).toBeVisible();

  const cards = section.locator("a[target=_blank]");
  await expect(cards).toHaveCount(featuredProjects.length);
  for (const [i, p] of featuredProjects.entries()) {
    const card = cards.nth(i);
    await expect(card).toHaveAttribute("href", p.url);
    await expect(card).toHaveAttribute("rel", /noopener/);
    await expect(card.getByRole("heading", { name: p.title })).toBeVisible();
  }
});

test("project screenshots load", async ({ page }) => {
  for (const p of featuredProjects.filter((p) => p.image)) {
    const img = page.getByRole("img", { name: `${p.title} preview` });
    await img.scrollIntoViewIfNeeded();
    await expect(img).toBeVisible();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
  }
});

test("All projects link opens the projects page", async ({ page }) => {
  await page.getByRole("link", { name: "All projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
});

test("contact section links are correct", async ({ page }) => {
  const contact = page.locator("#contact");
  const email = contact.getByRole("link", { name: new RegExp(site.email) });
  await expect(email).toHaveAttribute("href", `mailto:${site.email}`);
  await expect(email).not.toHaveAttribute("target", "_blank");

  for (const [name, href] of [
    ["LinkedIn", site.linkedin],
    ["GitHub", site.github],
  ] as const) {
    const link = contact.getByRole("link", { name: new RegExp(name) });
    await expect(link).toHaveAttribute("href", href);
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", /noopener/);
  }
});

test("no horizontal scroll", async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
