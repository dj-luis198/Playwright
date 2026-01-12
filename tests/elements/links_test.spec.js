import { test } from '../setup.js';
import { expect } from '@playwright/test';
import { LinksPage } from '../../pages/elements/links_page.js';

test.describe('Links tests', () => {
    let linksPage;

    test.beforeEach(async ({ page }) => {
        linksPage = new LinksPage(page);
        await linksPage.navigate();
    });

    test('Home link abre nueva pestaña', async ({ context }) => {
        let newPage = await linksPage.clickAndValidateNewTab(linksPage.homeLink, context);
        expect(newPage.url()).toBe('https://demoqa.com/');
    });

    test('Link Created dispara API y muestra mensaje', async () => {
        await linksPage.clickAndValidateApi(linksPage.createdLink, 201, 'Created');
        await expect(linksPage.linkResponse).toBeVisible();
        await expect(linksPage.linkResponse).toHaveText(/201/);
        await expect(linksPage.linkResponse).toHaveText(/Created/);
    });
});
