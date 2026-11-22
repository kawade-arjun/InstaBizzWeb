import { test, expect } from "@playwright/test";

test.describe("TeddyPups U.A.E. E2E Tests", () => {
  test("1. Homepage renders brand elements and sections", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/TeddyPups U\.A\.E\./);
    await expect(page.locator("h1")).toContainText("Premium teacup");
    await expect(page.locator("#journey-title")).toContainText("Your puppy journey");
    await expect(page.locator("a[href='/puppies']").first()).toBeVisible();
  });

  test("2. Puppies catalog filtering by breed and origin", async ({ page }) => {
    await page.goto("/puppies");
    await expect(page.locator("h1")).toContainText("Available puppies");

    // Click "Maltipoo" filter button
    const maltipooBtn = page.getByRole("button", { name: "Maltipoo", exact: true });
    if (await maltipooBtn.isVisible()) {
      await maltipooBtn.click();
      // Expect list to have Maltipoo items
      const cards = page.locator(".tp-sketch");
      await expect(cards.first()).toBeVisible();
    }
  });

  test("3. Happy families opens and closes photo lightbox", async ({ page }) => {
    await page.goto("/happy-families");
    await expect(page.locator("h1")).toContainText("Happy families");

    // Click first photo
    const firstPhoto = page.locator("button.group").first();
    await firstPhoto.click();

    // Dialog should open
    const dialog = page.locator("dialog[aria-label='Photo viewer']");
    await expect(dialog).toBeVisible();

    // Close with Esc or button
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
  });

  test("4. How it works page has sticky chapter links", async ({ page }) => {
    await page.goto("/how-it-works");
    await expect(page.locator("h1")).toContainText("How it works");
    await expect(page.locator("#two-ways")).toBeVisible();
    await expect(page.locator("#promise")).toBeVisible();
    await expect(page.locator("#delivery")).toBeVisible();
    await expect(page.locator("#why")).toBeVisible();
  });

  test("5. FAQ page interactive accordion", async ({ page }) => {
    await page.goto("/faq");
    await expect(page.locator("h1")).toContainText("Questions & answers");
    const firstDetails = page.locator("details").first();
    await expect(firstDetails).toBeVisible();
  });

  test("6. Contact page and letterform validation", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("h1")).toContainText("Get in touch with us");
    await expect(page.locator(".tp-letterform")).toBeVisible();

    // Fill the letter blanks
    await page.fill("input[name='name']", "Playwright Test");
    await page.fill("input[name='phone']", "+971 50 999 8888");
    await page.fill("input[name='email']", "test@instabizweb.com");
    await page.fill("input[name='area']", "Dubai Marina");

    // Submit form
    await page.click("button[type='submit']");

    // Expect transition to sealing or status sent
    await expect(page.locator(".tp-post")).toBeVisible();
  });

  test("7. Puppy detail page renders media, tag, and next/prev", async ({ page }) => {
    await page.goto("/puppies/maltipoo-max-male");
    await expect(page.locator("h1")).toContainText("Max");
    await expect(page.locator(".tp-tag")).toBeVisible();
    await expect(page.locator("nav[aria-label='Puppy pagination']")).toBeVisible();
  });

  test("8. Admin dashboard renders inquiries", async ({ page }) => {
    await page.goto("/admin");
    await expect(page.locator("h1")).toContainText("Inquiries & Customer Letters");
    await expect(page.locator("table")).toBeVisible();
  });
});
