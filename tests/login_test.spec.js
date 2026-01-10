import { test } from './setup.js';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/login_page';
import { ProfilePage } from '../pages/profile_page';

test("Successful Login", async ({ page }) => {
    const username = test.info().project.use.env.TEST_USERNAME; 
    const password = test.info().project.use.env.TEST_PASSWORD;
    const loginPage = new LoginPage(page);
    const profilePage = new ProfilePage(page, username);

    await loginPage.navigate();
    await loginPage.login(username, password);
    await expect(profilePage.getUserNameLocator(username)).toBeVisible();
    await profilePage.logout();
    await expect(loginPage.loginButton).toBeVisible();
});