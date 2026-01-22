import { test } from '../../setup.js';
import { expect } from '@playwright/test';
import { AccordianPage } from '../../../pages/widgets/accordian_page.js';

test.describe('accordian test', () => {
    let accordianPage;
    test.beforeEach(async ({ page }) => {
        accordianPage = new AccordianPage(page);
        await accordianPage.navigate();
        //await page.pause();
    });
    test('Section 1 visible; Sections 2 and 3 not visible.', async () => {
        await expect(await accordianPage.secction1Content()).toBeVisible();
        await expect(await accordianPage.secction2Content()).not.toBeVisible();
        await expect(await accordianPage.secction3Content()).not.toBeVisible();
    });
    test('Section 2 visible; Sections 1 and 3 not visible.', async () => {
        await accordianPage.clickSecction2();
        await expect(await accordianPage.secction1Content()).not.toBeVisible();
        await expect(await accordianPage.secction2Content()).toBeVisible();
        await expect(await accordianPage.secction3Content()).not.toBeVisible();
    });

    test('Section 3 visible; Sections 1 and 2 not visible.', async () => {
        await accordianPage.clickSecction3();
        await expect(await accordianPage.secction1Content()).not.toBeVisible();
        await expect(await accordianPage.secction2Content()).not.toBeVisible();
        await expect(await accordianPage.secction3Content()).toBeVisible();
    });
    test('Sections 1, 2 and 3 not visible.', async () => {
        await accordianPage.clickSecction1();
        await expect(await accordianPage.secction1Content()).not.toBeVisible();
        await expect(await accordianPage.secction2Content()).not.toBeVisible();
        await expect(await accordianPage.secction3Content()).not.toBeVisible();
    });
});


