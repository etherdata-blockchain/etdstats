import { test, expect, type Page } from "@playwright/test";
import admin from "firebase-admin";
import config from "./secrets.json";

const url = process.env.TEST_URL ?? "http://localhost:3001";
admin.initializeApp({
  credential: admin.credential.cert(config as any),
});
const db = admin.firestore();
const collection = db.collection("tickets");

async function verifyBlockDetail(page: Page, id: string) {
  let link = id.startsWith("/") ? id : `/${id}`;
  await page.goto(url + link);
  await expect(page.locator("text=Block Details").first()).toBeVisible();
}

async function verifyTransactionDetail(page: Page, id: string) {
  let link = id.startsWith("/") ? id : `/${id}`;
  await page.goto(url + link);
  await expect
    .soft(page.locator("text=Transaction Details").first())
    .toBeVisible();
}

test.beforeEach(async ({ page }) => {
  // if environment is not set, set it to "localhost"
  await page.goto(url);
});

test.describe("Browser some pages", () => {
  test("Go to info page", async ({ page }) => {
    await expect.soft(page).toHaveTitle("ETDStats");
    await page
      .locator('[id="__next"] div[role="button"]:has-text("Info")')
      .click();

    await expect.soft(page).toHaveTitle("ETDStats");

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
      await verifyBlockDetail(page, link);
    }

    for (const link of transactionLinks) {
      await verifyTransactionDetail(page, link);
    }
  });
});

test.describe("Given a list of failed ids", async () => {
  /**
   * Ticket has four types of status. Open, solved, closed, and failed.
   * If ticket is in solved status, it is considered a success.
   * Then we will check if the problem has been solved.
   * If so, we will mark the ticket as closed.
   */
  test("Failed again", async ({ page }) => {
    const failed = await collection
      .where("status", "==", "solved")
      .limit(20)
      .get();

    failed.forEach(async (doc) => {
      const document = doc.data();
      if (document.status === "solved" && document.checkedCount > 3) {
        await collection.doc(doc.id).update({
          status: "closed",
        });
        return;
      }
      await collection.doc(doc.id).update({
        checkedCount: document.checkedCount.increment(1),
      });

      if (document.type === "block") {
        await verifyBlockDetail(page, document.id);
      }

      if (document.type === "transaction") {
        await verifyTransactionDetail(page, document.id);
      }
      await collection.doc(document.id).update({ status: "closed" });
    });
  });
});
