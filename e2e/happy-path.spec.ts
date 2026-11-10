import { expect, test } from "@playwright/test";

test("el hero lleva al contacto", async ({ page }) => {
  await page.goto("/enterprise-systematizer-landing/");
  await expect(
    page.getByRole("heading", { level: 1, name: /Le falta una fábrica/i }),
  ).toBeVisible();

  await page.getByRole("link", { name: /Quiero hablar con el equipo/i }).click();
  await expect(page.getByRole("heading", { name: /Conversemos/i })).toBeVisible();
  await expect(page.getByLabel(/Nombre completo/i)).toBeVisible();
});

test("el diagrama de la fábrica se amplía y el paso se puede elegir", async ({ page }) => {
  await page.goto("/enterprise-systematizer-landing/");
  await expect(page.getByRole("img", { name: /Bucle de Auto-Mejora/i })).toBeVisible();
  await page.getByRole("button", { name: /Bucle de Auto-Mejora/i }).click();
  await expect(page.getByRole("dialog", { name: "Fábrica de Software" })).toBeVisible();
  await page.getByRole("button", { name: "Cerrar" }).click();
  await page.getByRole("button", { name: /QA calidad/i }).click();
  await expect(page.getByRole("heading", { level: 3, name: "QA calidad" })).toBeVisible();
});
