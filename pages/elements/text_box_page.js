class TextBoxPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator('#userName');
        this.userEmail = page.locator('#userEmail');
        this.currentAddress = page.locator('#currentAddress');
        this.permanentAddress = page.locator('#permanentAddress');
        this.submitButton = page.getByRole('button', { name: 'Submit' });
    }

    async navigate() {
        return this.page.goto('https://demoqa.com/text-box');
    }

    async fillTextBox(name, email, currentAddress, permanentAddress) {
        await this.userName.fill(name);
        await this.userEmail.fill(email);
        await this.currentAddress.fill(currentAddress);
        await this.permanentAddress.fill(permanentAddress);
    }

    async clickSubmit() {
        await this.submitButton.click();
    }
}

export { TextBoxPage };