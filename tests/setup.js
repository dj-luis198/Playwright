// tests/setup.js
import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ page }, use) => {
    // Bloqueo de requests externos
    await page.route('**/*', route => {
      const url = route.request().url();
      const bloqueados = [
        'doubleclick.net',
        'googlesyndication.com',
        'adservice.google.com',
        'googletagservices.com',
        'ads',
        'safeframe.googlesyndication.com'
      ];
      if (bloqueados.some(pattern => url.includes(pattern))) {
        route.abort();
      } else {
        route.continue();
      }
    });

    // Hook para limpiar anuncios del DOM después de cargar
    page.on('domcontentloaded', async () => {
      await page.evaluate(() => {
        document.querySelectorAll('.Advertisement-Section, .Google-Ad, [id^="google_ads_iframe"]').forEach(el => el.remove());
      });
    });

    await use(page);
  },
});
