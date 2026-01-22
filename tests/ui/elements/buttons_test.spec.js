import { test } from '../../setup.js';
import { expect } from '@playwright/test';
import { ButtonsPage } from '../../../pages/elements/buttons_page.js';

test.describe('Buttons tests', () => {
    let buttonsPage;
    test.beforeEach(async ({ page }) => {
        buttonsPage = new ButtonsPage(page);
        await buttonsPage.navigate();
        //await page.pause();
    });
    test('Double Click Button', async () => {
        await buttonsPage.doubleClick();
        const message = await buttonsPage.getDoubleClickMessage();
        expect(message).toBe('You have done a double click');
    });
    test('Right Click Button', async () => {
        await buttonsPage.rightClick();
        const message = await buttonsPage.getRightClickMessage();
        expect(message).toBe('You have done a right click');
    });
    test('Dynamic Click Button', async () => {
        await buttonsPage.dynamicClick();
        const message = await buttonsPage.getDynamicClickMessage();
        expect(message).toBe('You have done a dynamic click');
    });
});