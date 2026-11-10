import { defineConfig, devices } from "@playwright/test";

const basePath = "/enterprise-systematizer-landing";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: "http://127.0.0.1:4173",
    trace: "on-first-retry",
  },
  webServer: {
    command:
      "rm -rf /tmp/pages-root && mkdir -p /tmp/pages-root && cp -a out /tmp/pages-root/enterprise-systematizer-landing && python3 -m http.server 4173 --directory /tmp/pages-root",
    url: `http://127.0.0.1:4173${basePath}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
