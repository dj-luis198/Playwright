class RadioButtonPage {
    constructor(page) {
        this.page = page;
        this.yesButton = page.getByText('Yes');
        this.impressiveButton = page.getByText('Impressive');
        this.noButton = page.getByText('No');
        this.resultParagraph = page.getByRole('paragraph');
    }

    async navigate() {
        return this.page.goto('/radio-button');
    }

    async clickYes() {
        await this.yesButton.click();
    }

    async clickImpressive() {
        await this.impressiveButton.click();
    }

    async clickNo() {
        await this.noButton.click();
    }

    async getResultText() {
        return await this.resultParagraph.textContent();
    }
}

export { RadioButtonPage };