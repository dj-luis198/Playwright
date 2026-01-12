import { test } from '../setup.js';
import { expect } from '@playwright/test';
import { BrokenPage } from '../../pages/elements/broken_page.js';

test.describe('Broken Page tests', () => {
    let brokenPage;
    test.beforeEach(async ({ page }) => {
        brokenPage = new BrokenPage(page);
        await brokenPage.navigate();
        //page.pause();
    });
    test('Valid image should load correctly', async () => {
        await brokenPage.clickValidImage();
        expect(await brokenPage.validImage.evaluate(img => img.naturalWidth)).toBeGreaterThan(0);
    });
    test('Broken image should not load', async () => {
        await brokenPage.clickBrokenImage();
        expect(await brokenPage.brokenImage.evaluate(img => img.naturalWidth)).toBe(0);
    });
    test('Valid link should navigate correctly', async () => {
        const validResponse = await brokenPage.clickValidLink();
        expect(validResponse.status()).toBe(200);
    });

    test('Broken link should show error', async ()  => {
        await brokenPage.clickBrokenLink();
        expect(brokenPage.page.url()).toContain('/status_codes/500');
    });
});