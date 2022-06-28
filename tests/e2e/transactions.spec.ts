import { test, expect, type Page } from "@playwright/test";

const url = process.env.TEST_URL ?? "http://localhost:3001";

test.beforeEach(async ({ page }) => {
  // if environment is not set, set it to "localhost"
  await page.goto(url);
});

test.describe("Browser some pages", () => {
  test("Go to info page", async ({ page }) => {
    await expect(page).toHaveTitle("ETDStats");
    await page
      .locator('[id="__next"] div[role="button"]:has-text("Info")')
      .click();

    await expect(page).toHaveTitle("ETDStats");

    await page.waitForSelector("data-testid=general-block-link");
    await page.waitForSelector("data-testid=general-transaction-link");

    const transactionLinkSelector = page.locator(
      "data-testid=general-transaction-link"
    );
    const transactionCount = await transactionLinkSelector.count();

    const blockLinKSelector = page.locator("data-testid=general-block-link");
    const blockCount = await transactionLinkSelector.count();

    expect(transactionCount).toBeGreaterThan(0);
    expect(blockCount).toBeGreaterThan(0);

    const transactionLinks: string[] = [];
    const blockLinks: string[] = [];
    for (let i = 0; i < transactionCount; i++) {
      const hash = await transactionLinkSelector.nth(i).getAttribute("href");
      transactionLinks.push(hash!);
    }

    for (let i = 0; i < blockCount; i++) {
      const hash = await blockLinKSelector.nth(i).getAttribute("href");
      blockLinks.push(hash!);
    }

    for (const link of blockLinks) {
      await page.goto(url + link);
      await expect(page.locator("text=Block Details").first()).toBeVisible();
    }

    for (const link of transactionLinks) {
      await page.goto(url + link);
      await expect(
        page.locator("text=Transaction Details").first()
      ).toBeVisible();
    }
  });
});
