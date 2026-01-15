import { test } from '../setup.js';
import { expect } from '@playwright/test';
import { SelectMenuPage } from '../../pages/widgets/select_menu_page.js';


test.describe('Select Menu Widget Tests', () => {
    let selectMenuPage;
    test.beforeEach(async ({ page, browserName }) => {
        selectMenuPage = new SelectMenuPage(page, browserName);
        await selectMenuPage.navigate();
        //await page.pause();
    });

    test('Select an option from Select Option dropdown', async () => {
        const options = ['Group 1, option 1', 'Group 1, option 2', 'Group 2, option 1', 'Group 2, option 2', 'A root option', 'Another root option'];
        const randomOption = options[Math.floor(Math.random() * options.length)];
        await selectMenuPage.selectOption(randomOption);
        const selectedOptionText = await selectMenuPage.getSelectedOptionText();
        expect(selectedOptionText).toBe(randomOption);
    });

    test('Select a title from Select Title dropdown', async () => {
        const options = ['Dr.', 'Mr.', 'Mrs.', 'Ms.', 'Prof.', 'Other'];
        const randomOption = options[Math.floor(Math.random() * options.length)];
        await selectMenuPage.selectTitleOption(randomOption);
        const selectedTitleText = await selectMenuPage.getSelectedTitleText();
        expect(selectedTitleText).toBe(randomOption);
    });

    test('Select an option from Old Style Select Menu', async () => {
        const options = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Black', 'White', 'Voilet', 'Indigo', 'Magenta', 'Aqua'];
        const randomOption = options[Math.floor(Math.random() * options.length)];
        await selectMenuPage.selectOldMenuOption(randomOption);
        const selectedColor = await selectMenuPage.getOptionChecked();
        await expect(selectedColor).toHaveText(randomOption);
    });

    test('Select multiple options from Multi Select Dropdown', async () => {
        const optionsToSelect = ['Green', 'Blue', 'Black', 'Red'];
        const selectOptions = await selectMenuPage.generateOptions(optionsToSelect);
        await selectMenuPage.selectMultiOptions(selectOptions);
        const selected = await selectMenuPage.getTextOptionsSelected();
        expect(selected).toEqual(selectOptions);
    });



    test('Select multiple options from Standard Multi Select', async () => {
        const options = ['Volvo', 'Saab', 'Opel', 'Audi'];
        const randomOption = options[Math.floor(Math.random() * options.length)];
        await selectMenuPage.selectStandardMultiOptions(randomOption);
        const selectedOption = selectMenuPage.standardMultiSelect.locator('option:checked');
        await expect(selectedOption.filter({ hasText: randomOption })).toBeVisible();
    });
});