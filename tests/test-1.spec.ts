import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/date-picker');
  await page.locator('#datePickerMonthYearInput').click();
  await page.locator('#datePickerMonthYearInput').click();
  await page.locator('#datePickerMonthYearInput').click();
  await page.locator('#datePickerMonthYearInput').fill('21071984');
  await page.locator('#datePickerMonthYear').click();
  await page.locator('#datePickerMonthYearInput').click();
  await page.locator('#datePickerMonthYearInput').click();
  await page.locator('#datePickerMonthYearInput').fill('21071984');
  await page.locator('#datePickerMonthYearInput').press('Enter');
  await page.locator('#datePickerMonthYearInput').press('Enter');
});