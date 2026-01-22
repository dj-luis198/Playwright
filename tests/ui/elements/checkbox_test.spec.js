import { test } from '../../setup.js';
import { expect } from '@playwright/test';
import { CheckboxPage } from '../../../pages/elements/checkbox_page.js';

test.describe('Checkbox Element Tests', () => {
    let checkboxPage;
    test.beforeEach(async ({ page }) => {
        checkboxPage = new CheckboxPage(page);
        await checkboxPage.navigate();
    });

    test('Expand and Collapse All Checkboxes', async () => {
        await checkboxPage.expandAll();
        // Verify that all checkboxes are expanded
        const expandedNodes = await checkboxPage.page.locator('.rct-node-expanded').count();
        expect(expandedNodes).toBeGreaterThan(0);
        await checkboxPage.collapseAll();
        // Verify that all checkboxes are collapsed
        const collapsedNodes = await checkboxPage.page.locator('.rct-node-collapsed').count();
        expect(collapsedNodes).toBeGreaterThan(0);
    });

    test('Select Single Checkbox and Verify Result', async () => {
        await checkboxPage.expandAll();
        await checkboxPage.clickCheckboxByName('Desktop');
        await expect(checkboxPage.result).toContainText('desktop');
        await expect(checkboxPage.result).toContainText('notes');
        await expect(checkboxPage.result).toContainText('commands');
    });
    test('Select Multiple Checkboxes and Verify Result', async () => {
        await checkboxPage.expandAll();
        await checkboxPage.clickCheckboxByName('Documents');
        await checkboxPage.clickCheckboxByName('Downloads');
        await expect(checkboxPage.result).toContainText('documents');
        await expect(checkboxPage.result).toContainText('workspace');
        await expect(checkboxPage.result).toContainText('react');
        await expect(checkboxPage.result).toContainText('angular');
        await expect(checkboxPage.result).toContainText('downloads');
        await expect(checkboxPage.result).toContainText('wordFile');
        await expect(checkboxPage.result).toContainText('excelFile');
    });
});