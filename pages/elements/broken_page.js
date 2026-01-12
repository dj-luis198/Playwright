class BrokenPage {
    constructor(page) {
        this.page = page;
        this.validImage = page.locator('img').nth(2);
        this.brokenImage = page.locator('img').nth(3);
        this.validLink = page.getByRole('link', { name: 'Click Here for Valid Link' });
        this.brokenLink = page.getByRole('link', { name: 'Click Here for Broken Link' });
    }
    async navigate() {
        await this.page.goto('/broken');
    }
    async clickValidImage() {
        await this.validImage.click();
    }
    async clickBrokenImage() {
        await this.brokenImage.click();
    }
    async clickValidLink() {
        const [validResponse] = await Promise.all([
            this.page.waitForResponse(resp => resp.url().includes('demoqa.com') && resp.status() === 200),
            this.page.getByRole('link', { name: 'Click Here for Valid Link' }).click()]);
        return validResponse;
    }
    async clickBrokenLink() {
        await this.page.getByRole('link', { name: 'Click Here for Broken Link' }).click(); 
        await this.page.waitForLoadState();
    }
}

export { BrokenPage };