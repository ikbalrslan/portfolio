import { test, expect, expectNoHorizontalScroll } from "./fixtures";
import { categories, projects } from "@/data/projects";

const usedCategories = categories.filter((c) => projects.some((p) => p.category === c));

test.beforeEach(async ({ page }) => {
  await page.goto("/projects");
});

const cards = (page: import("@playwright/test").Page) => page.locator("main a[target=_blank]");
const counter = (page: import("@playwright/test").Page) => page.getByText(/^\d+ projects?$/);

test("lists every project with a working outbound link", async ({ page }) => {
  await expect(page.getByText(`${projects.length} total`)).toBeVisible();
  await expect(cards(page)).toHaveCount(projects.length);
  for (const [i, p] of projects.entries()) {
    await expect(cards(page).nth(i)).toHaveAttribute("href", p.url);
  }
});

test("every category chip filters the list", async ({ page }) => {
  const group = page.getByRole("group", { name: "Filter by category" });
  await expect(group.getByRole("button")).toHaveCount(usedCategories.length + 1);

  for (const c of usedCategories) {
    const expected = projects.filter((p) => p.category === c);
    const chip = group.getByRole("button", { name: c, exact: true });
    await chip.click();
    await expect(chip).toHaveAttribute("aria-pressed", "true");
    await expect(cards(page)).toHaveCount(expected.length);
    await expect(counter(page)).toHaveText(`${expected.length} ${expected.length === 1 ? "project" : "projects"}`);
  }

  const all = group.getByRole("button", { name: "All", exact: true });
  await all.click();
  await expect(all).toHaveAttribute("aria-pressed", "true");
  await expect(cards(page)).toHaveCount(projects.length);
});

test("search matches title, tech and category, case-insensitively", async ({ page }) => {
  const search = page.getByRole("searchbox", { name: "Search projects" });
  for (const q of ["SPRING", "solidity", "machine learning"]) {
    const expected = projects.filter((p) =>
      [p.title, p.blurb, p.category, ...p.tech].join(" ").toLowerCase().includes(q.toLowerCase()),
    );
    expect(expected.length, `fixture query "${q}" should match something`).toBeGreaterThan(0);
    await search.fill(q);
    await expect(cards(page)).toHaveCount(expected.length);
  }
});

test("search combines with the category filter", async ({ page }) => {
  const c = usedCategories[0];
  await page.getByRole("group", { name: "Filter by category" }).getByRole("button", { name: c, exact: true }).click();
  const target = projects.find((p) => p.category === c)!;
  await page.getByRole("searchbox", { name: "Search projects" }).fill(target.title);
  await expect(cards(page).first()).toHaveAttribute("href", target.url);
});

test("no-match search shows the empty state and clearing restores the list", async ({ page }) => {
  const search = page.getByRole("searchbox", { name: "Search projects" });
  await search.fill("zzz-no-such-project");
  await expect(page.getByText("No projects match that search.")).toBeVisible();
  await expect(counter(page)).toHaveText("0 projects");
  await search.fill("");
  await expect(cards(page)).toHaveCount(projects.length);
});

test("no horizontal scroll", async ({ page }) => {
  await expectNoHorizontalScroll(page);
});
