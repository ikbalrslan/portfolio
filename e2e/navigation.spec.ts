import { test, expect, NOT_FOUND_PATH } from "./fixtures";
import { site } from "@/data/site";

test.describe("header navigation", () => {
  test("logo goes home from any page", async ({ page }) => {
    await page.goto("/projects");
    await page.getByRole("link", { name: site.name, exact: true }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1, name: site.name })).toBeVisible();
  });

  test("Projects link opens /projects and marks it current", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await nav.getByRole("link", { name: "Projects" }).click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(nav.getByRole("link", { name: "Projects" })).toHaveAttribute("aria-current", "page");
  });

  test("Contact link reaches the contact section from another page", async ({ page }) => {
    await page.goto("/projects");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Contact" }).click();
    await expect(page).toHaveURL(/\/#contact$/);
    await expect(page.getByRole("heading", { name: "Contact" })).toBeInViewport();
  });

  test("GitHub icon points to the profile in a new tab", async ({ page }) => {
    await page.goto("/");
    const gh = page.getByRole("link", { name: "GitHub profile" });
    await expect(gh).toHaveAttribute("href", site.github);
    await expect(gh).toHaveAttribute("target", "_blank");
    await expect(gh).toHaveAttribute("rel", /noopener/);
  });

  test("header stays visible while scrolling", async ({ page }) => {
    await page.goto("/projects");
    await page.mouse.wheel(0, 2000);
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeInViewport();
  });
});

test.describe("footer", () => {
  test("links to GitHub, LinkedIn and email", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", site.github);
    await expect(footer.getByRole("link", { name: "LinkedIn" })).toHaveAttribute("href", site.linkedin);
    await expect(footer.getByRole("link", { name: "Email" })).toHaveAttribute("href", `mailto:${site.email}`);
  });
});

test.describe("not found page", () => {
  test("unknown URL returns 404 and Back home works", async ({ page }) => {
    const res = await page.goto(NOT_FOUND_PATH);
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await page.getByRole("link", { name: "Back home" }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
