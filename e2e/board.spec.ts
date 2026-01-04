import { expect, test } from "@playwright/test"

test("board flow works", async ({ page }) => {
  await page.goto("/")

  await expect(
    page.getByRole("heading", { name: "Signal Workflow Hub" }),
  ).toBeVisible()

  const intakeColumn = page.locator("section").filter({ hasText: "Intake" }).first()
  await intakeColumn.getByPlaceholder("Task title").fill("E2E task")
  await intakeColumn.getByRole("button", { name: "Add" }).click()

  await expect(intakeColumn.getByText("E2E task")).toBeVisible()

  await page.getByRole("link", { name: "Analytics" }).click()
  await expect(page.getByRole("heading", { name: "Flow Insights" })).toBeVisible()

  await page.getByRole("link", { name: "Board" }).click()
  await expect(page.getByText("E2E task")).toBeVisible()
})
