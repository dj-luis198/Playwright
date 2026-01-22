import { test } from '../../setup.js';
import { expect } from '@playwright/test';
import { RadioButtonPage } from '../../../pages/elements/radio_button_page';

test.describe('Radio Button tests', () => {
    let radioButtonPage;   
    test.beforeEach(async ({ page }) => {
        radioButtonPage = new RadioButtonPage(page);
        await radioButtonPage.navigate();
    });

    test('Select Yes radio button', async () => {
        await radioButtonPage.clickYes();
        const resultText = await radioButtonPage.getResultText();
        expect(resultText).toContain('You have selected Yes');
    }); 
    test('Select Impressive radio button', async () => {
        await radioButtonPage.clickImpressive();
        const resultText = await radioButtonPage.getResultText();
        expect(resultText).toContain('You have selected Impressive');
    });
    test('Verify No radio button is disabled', async () => {
        const isDisabled = await radioButtonPage.noButton.isDisabled();
        expect(isDisabled).toBe(true);
    });
});