import { expect, test } from "@playwright/test";

// Keep in sync with APP_PAGES in content/app-pages.ts. That file can't be imported
// here because it `require`s image assets, which only Metro can resolve.
const APPS = [{ slug: "podcast-duck", name: "Podcast Duck" }];

for (const app of APPS) {
  test.describe(`app page: ${app.slug}`, () => {
    test("renders the app home page", async ({ page }) => {
      await page.goto(`/apps/${app.slug}`);
      await expect(page).toHaveTitle(new RegExp(`^${app.name} — `));
      await expect(page.getByAltText(`${app.name} icon`)).toBeVisible();
    });

    test("renders the privacy policy", async ({ page }) => {
      const response = await page.goto(`/apps/${app.slug}/privacy`);
      expect(response?.ok()).toBe(true);
      await expect(page.getByText(/privacy/i).first()).toBeVisible();
    });
  });
}
