import { defineConfig, devices } from "@playwright/test";

/**
 * QA suite for the portfolio.
 *
 * - BASE_URL set (CI): tests run against a deployed host, e.g.
 *   https://acceptance.ikbalarslan.dev, and no local server is started.
 * - BASE_URL unset (local): builds output is served with `next start` on :3000.
 *
 * Tests tagged @smoke are the subset re-run against production after a deploy.
 */
const baseURL = process.env.BASE_URL ?? "http://127.0.0.1:3000";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "npm run start -- -p 3000",
        url: `${baseURL}/api/health`,
        reuseExistingServer: !process.env.CI,
      },
});
