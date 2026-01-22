import { test } from '../../setup.js';
import { expect } from '@playwright/test';
import { DynamicPropertiesPage } from '../../../pages/elements/dynamic_properties_page.js';

test.describe('Dynamic Properties Page tests', () => {
    let dynamicPropertiesPage;
    test.beforeEach(async ({ page }) => {
        dynamicPropertiesPage = new DynamicPropertiesPage(page);
        await dynamicPropertiesPage.navigate();
        //page.pause();
    });

    test('Random ID text should be present', async () => {
        const text = await dynamicPropertiesPage.getTextRandomId();
        expect(text).toBe('This text has random Id');
    });

    test('Button should be enabled after 5 seconds', async () => {
        const enableAfterButton = await dynamicPropertiesPage.getEnableAfterButton();
        await expect(enableAfterButton).toBeEnabled({ timeout: 6000 });
    });

    test('Button color should change after 5 seconds', async () => {
        const initialColor = await dynamicPropertiesPage.getInitialColorChangeButton();
        const colorChangeButton = await dynamicPropertiesPage.getColorChangeButton();
        await expect(colorChangeButton).toHaveCSS('color',initialColor);
        await expect(colorChangeButton).not.toHaveCSS('color', initialColor, { timeout: 6000 });
    });

    test('Button should be visible after 5 seconds', async ()  => {
        const visibleAfterButton = await dynamicPropertiesPage.getVisibleAfterButton();
        await expect(visibleAfterButton).toBeVisible({ timeout: 6000 });
    });
});