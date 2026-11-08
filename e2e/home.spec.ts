import { expect, test } from "@playwright/test";

const windowTitle = (page: import("@playwright/test").Page, title: string) =>
  page.locator(".titlebar-title", { hasText: title });

test.describe("welcome screen", () => {
  test("shows once, then hides", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".welcome")).toBeVisible();
    await expect(page.locator(".welcome")).toBeHidden({ timeout: 5_000 });
  });
});

test.describe("home desktop", () => {
  test.beforeEach(async ({ page }) => {
    // Skip the welcome screen; it covers the desktop for ~2s on first load.
    await page.addInitScript(() => sessionStorage.setItem("welcomeShown", "1"));
  });

  test("shows the desktop icons", async ({ page }) => {
    await page.goto("/");
    for (const id of ["resume", "apps", "links", "talks", "thoughts", "trash"]) {
      await expect(page.locator(`[data-icon-id="${id}"]`)).toBeVisible();
    }
  });

  test("double-clicking an icon opens its window", async ({ page }) => {
    await page.goto("/");
    await page.locator('[data-icon-id="resume"]').dblclick();
    await expect(windowTitle(page, "Resume")).toBeVisible();
    await expect(page).toHaveURL(/#\/resume$/);
  });

  test("a hash URL opens the window directly", async ({ page }) => {
    await page.goto("/#/apps");
    await expect(windowTitle(page, "Apps")).toBeVisible();
  });
});
