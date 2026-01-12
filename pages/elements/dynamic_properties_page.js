class DynamicPropertiesPage {
    constructor(page) {
        this.page = page;
        this.randomId = page.getByText('This text has random Id');
        this.enableAfterButton = page.locator('#enableAfter');
        this.colorChangeButton = page.locator('#colorChange');
        this.visibleAfterButton = page.locator('#visibleAfter');
    }
    async navigate() {
        await this.page.goto('/dynamic-properties');
    }

    async getTextRandomId() {
        return await this.randomId.textContent();
    }

    async getEnableAfterButton() {
        return this.enableAfterButton;
    }   
    async getColorChangeButton() {
        return this.colorChangeButton;
    }

    async getInitialColorChangeButton() {
        return await this.colorChangeButton.evaluate((button) => {
            return window.getComputedStyle(button).getPropertyValue('color');
        });
    }
    async getVisibleAfterButton() {
        return this.visibleAfterButton;
    }
}

export { DynamicPropertiesPage };