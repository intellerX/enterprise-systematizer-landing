import { expect, test } from "@playwright/test";

test("hero → assessment → contact happy path", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Pragmatic AI Software Engineering/i }),
  ).toBeVisible();

  await page.getByRole("link", { name: /Assess your AI maturity/i }).click();
  await expect(page.getByRole("heading", { name: /AI Maturity Assessment/i })).toBeVisible();

  for (let i = 0; i < 15; i++) {
    await page.getByRole("radio").first().click();
    const next = page.getByRole("button", { name: /Next|See results/i });
    await next.click();
  }

  await expect(page.getByText(/Your maturity:/i)).toBeVisible();
  await page.getByRole("link", { name: /Continue to contact/i }).click();
  await expect(page.getByRole("heading", { name: /Request a consultation/i })).toBeVisible();
});
