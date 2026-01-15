class SelectMenuPage {
    constructor(page) {
        this.page = page;
        this.selectOptions = page.locator('div').filter({ hasText: /^Select Option$/ }).nth(4);
        this.optGroupOption = page.locator('div[class*="singleValue"]');
        this.selectTitle = page.locator('div').filter({ hasText: /^Select Title$/ }).nth(4);
        this.oldSelectMenu = page.locator('#oldSelectMenu');
        this.multiSelectDropDown = page.locator('.css-1wy0on6').nth(2);
        this.multiValueOptiosSelects = page.locator('div[class*="multiValue"]');
        this.standardMultiSelect = page.locator('#cars');
    }

    async navigate() {
        await this.page.goto('/select-menu');
    }

    async selectOption(option) {
        await this.selectOptions.click();
        const optionLocator = this.page.getByText(option, { exact: true });
        await optionLocator.click();
    }

    async getSelectedOptionText() {
        return await this.optGroupOption.textContent();
    }

    async selectTitleOption(title) {
        await this.selectTitle.click();
        const titleLocator = this.page.getByText(title, { exact: true });
        await titleLocator.click();
    }

    async getSelectedTitleText() {
        return await this.optGroupOption.textContent();
    }

    async selectOldMenuOption(option) {
        await this.oldSelectMenu.click();
        await this.oldSelectMenu.selectOption(option);
        await this.oldSelectMenu.press('Escape');
    }

    async getOptionChecked() {
        return await this.oldSelectMenu.locator('option:checked');
    }

    async generateOptions(options) {
        const shuffled = options
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort).map(({ value }) => value);
        // Elegir cuántas opciones quieres (ejemplo: 2 al azar) 
        const randomCount = Math.floor(Math.random() * options.length) + 1;
        return shuffled.slice(0, randomCount);
    }

    async selectMultiOptions(options) {
        for (const text of options) {
            // Reabrir menú si está cerrado
            const menu = this.page.locator('div.css-11unzgr');
            if (!(await menu.isVisible())) {
                await this.multiSelectDropDown.click();
                await menu.waitFor({ state: 'visible' });
            }

            // Seleccionar la opción visible dentro del menú
            const locator = this.page.locator('div.css-11unzgr div', { hasText: text });
            await locator.click();
        }

        await this.page.keyboard.press('Escape');
    }

    async getTextOptionsSelected() {
        return await this.page.locator('.css-1rhbuit-multiValue .css-12jo7m5').allTextContents();
    }

    async selectStandardMultiOptions(option) {
        await this.standardMultiSelect.selectOption(option);
    }
}

export { SelectMenuPage };