// helpers.js
import { expect } from '@playwright/test';

/**
 * Navega a una URL con timeout extendido y espera al DOM.
 * @param {import('@playwright/test').Page} page
 * @param {string} url
 */
export async function safeGoto(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
}

/**
 * Espera a que un locator esté visible antes de interactuar.
 * @param {import('@playwright/test').Locator} locator
 */
export async function waitAndFill(locator, value) {
  await expect(locator).toBeVisible();
  await locator.fill(value);
}

/**
 * Hace click en un botón asegurando que esté visible.
 * @param {import('@playwright/test').Locator} locator
 */
export async function waitAndClick(locator) {
  await expect(locator).toBeVisible();
  await locator.click();
}
