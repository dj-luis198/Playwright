// tests/setup.js
import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route('**/*', route => {
      const url = route.request().url();
      const bloqueados = [
        'doubleclick.net',
        'googlesyndication.com',
        'adservice.google.com',
        'facebook.net',
        'analytics',
        'ads'
      ];
      if (bloqueados.some(pattern => url.includes(pattern))) {
        route.abort();
      } else {
        route.continue();
      }
    });
    await use(page);
  },
});
