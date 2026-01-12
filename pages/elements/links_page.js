import { expect } from '@playwright/test';

export class LinksPage {
    constructor(page) {
        this.page = page;
        // Links que abren nueva pestaña
        this.homeLink = page.getByRole('link', { name: 'Home', exact: true });
        this.homeDynamicLink = page.getByRole('link', { name: 'HomehvevO', exact: true });

        // Links que disparan API
        this.createdLink = page.getByRole('link', { name: 'Created' });
        this.noContentLink = page.getByRole('link', { name: 'No Content' });
        this.movedLink = page.getByRole('link', { name: 'Moved' });
        this.badRequestLink = page.getByRole('link', { name: 'Bad Request' });
        this.unauthorizedLink = page.getByRole('link', { name: 'Unauthorized' });
        this.forbiddenLink = page.getByRole('link', { name: 'Forbidden' });
        this.notFoundLink = page.getByRole('link', { name: 'Not Found' });

        // Mensaje de respuesta de API
        this.linkResponse = page.locator('#linkResponse');
    }

    async navigate() {
        await this.page.goto('https://demoqa.com/links');
    }

    // Método para links que abren nueva pestaña
    async clickAndValidateNewTab(linkLocator, context) {
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            linkLocator.click()
        ]);
        await newPage.waitForLoadState();
        return newPage;
    }

    // Método para links que disparan API
    async clickAndValidateApi(linkLocator, expectedStatus, expectedText) {
        await linkLocator.click();
        await expect(this.linkResponse).toContainText(expectedStatus.toString());
        await expect(this.linkResponse).toContainText(expectedText);
    }
}
