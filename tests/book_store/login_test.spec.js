import { test } from '../setup.js';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/book_store/login_page';
import { ProfilePage } from '../../pages/book_store/profile_page';

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

test("Failed Login with Incorrect Password", async ({ page }) => {
    const username = test.info().project.use.env.TEST_USERNAME; 
    const incorrectPassword = "wrongPassword123";
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(username, incorrectPassword);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText("Invalid username or password!");
});

test("Failed Login with Empty Credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login("", "");
    await expect(loginPage.usernameInput).toHaveClass(/is-invalid/);
    await expect(loginPage.passwordInput).toHaveClass(/is-invalid/);
});

test("Failed Login with Incorrect Username", async ({ page }) => {
    const incorrectUsername = "nonExistentUser";
    const password = test.info().project.use.env.TEST_PASSWORD; 
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(incorrectUsername, password);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText("Invalid username or password!");
});