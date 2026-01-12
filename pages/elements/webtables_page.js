// pages/WebTablePage.js
import { expect } from '@playwright/test';

class WebTablePage {
    constructor(page) {
        this.page = page;
        this.addButton = page.locator('#addNewRecordButton');
        this.searchBox = page.locator('#searchBox');
        this.rows = page.locator('.rt-tr-group');
        this.pageSizeSelect = page.locator('select[aria-label="rows per page"]');
        this.nextButton = page.locator('.-next .-btn');
        this.prevButton = page.locator('.-previous .-btn');
        this.pageNumber = page.locator('input[aria-label="jump to page"]');
        this.totalPages = page.locator('.-totalPages');
    }

    async navigate() {
        await this.page.goto('/webtables');
    }

    async search(text) {
        await this.searchBox.fill(text);
    }

    async addNewRecord({ firstName, lastName, age, email, salary, department }) {
        await this.addButton.click();
        await this.page.fill('#firstName', firstName);
        await this.page.fill('#lastName', lastName);
        await this.page.fill('#age', age.toString());
        await this.page.fill('#userEmail', email);
        await this.page.fill('#salary', salary.toString());
        await this.page.fill('#department', department);
        await this.page.click('#submit');
    }

    async setPageSize(size) {
        await this.pageSizeSelect.selectOption(size.toString());
    }

    async goToNextPage() {
        if (await this.nextButton.isEnabled()) {
            await this.nextButton.click();
        }
    }

    async goToPreviousPage() {
        if (await this.prevButton.isEnabled()) {
            await this.prevButton.click();
        }
    }

    async getRowValues(rowIndex) {
        return await this.rows.nth(rowIndex).locator('.rt-td').allInnerTexts();
    }

    async clickEditByRow(rowIndex) {
        await this.rows.nth(rowIndex).locator('[id^="edit-record"]').click();
    }

    async clickDeleteByRow(rowIndex) {
        await this.rows.nth(rowIndex).locator('[id^="delete-record"]').click();
    }

    async getNonEmptyRows() {
        const allRows = await this.rows.all();
        const nonEmpty = [];
        for (const row of allRows) {
            const text = await row.innerText();
            if (text.trim() !== '') {
                nonEmpty.push(row);
            }
        }
        return nonEmpty;
    }

    async getCurrentPageNumber() {
        const value = await this.pageNumber.inputValue(); // devuelve string 
        return parseInt(value, 10); // lo convierte a número;
    }

    async getTotalPages() {
        return parseInt(await this.totalPages.textContent());
    }

    truncateField(text, max = 25) {
        return text.substring(0, max);
    }

    async getRowByEmail(email) {
        const row = this.rows.filter({ hasText: email }).first();
        await expect(row).toBeVisible();
        return row.locator('.rt-td').allInnerTexts();
    }



}
export { WebTablePage };