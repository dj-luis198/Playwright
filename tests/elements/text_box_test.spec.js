import { test } from '../setup.js';
import { expect } from '@playwright/test';
import { TextBoxPage } from '../../pages/elements/text_box_page.js';
import { faker } from '@faker-js/faker';

test("Text Box Input and Output Verification", async ({ page }) => {
    const randomName = faker.person.fullName();
    const randomEmail = faker.internet.email();
    const randomCurrentAddress = faker.location.streetAddress();
    const randomPermanentAddress = faker.location.streetAddress();

    const textBoxPage = new TextBoxPage(page);

    await textBoxPage.navigate();
    await textBoxPage.fillTextBox(randomName, randomEmail, randomCurrentAddress, randomPermanentAddress);
    await textBoxPage.clickSubmit();
    await expect(page.locator('#name')).toContainText(randomName);
    await expect(page.locator('#email')).toContainText(randomEmail);
    await expect(page.locator('#output')).toContainText(randomCurrentAddress);
    await expect(page.locator('#output')).toContainText(randomPermanentAddress);
});