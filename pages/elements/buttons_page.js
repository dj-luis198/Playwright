class ButtonsPage {
    constructor(page) {
        this.page = page;
        this.doubleClickButtonSelector = '#doubleClickBtn';
        this.rightClickButtonSelector = '#rightClickBtn';
        this.clickMeButtonSelector = page.getByRole('button', { name: 'Click Me', exact: true });
        this.doubleClickMessageSelector = '#doubleClickMessage';
        this.rightClickMessageSelector = '#rightClickMessage';
        this.dynamicClickMessageSelector = '#dynamicClickMessage';
    }

    async navigate() {
        await this.page.goto('/buttons');
    }

    async doubleClick() {
        await this.page.dblclick(this.doubleClickButtonSelector);
    }

    async rightClick() {
        await this.page.click(this.rightClickButtonSelector, { button: 'right' });
    }

    async dynamicClick() {
        await this.clickMeButtonSelector.click();
    }

    async getDoubleClickMessage() {
        return await this.page.textContent(this.doubleClickMessageSelector);
    }

    async getRightClickMessage() {
        return await this.page.textContent(this.rightClickMessageSelector);
    }

    async getDynamicClickMessage() {
        return await this.page.textContent(this.dynamicClickMessageSelector);
    }

    };
export { ButtonsPage };