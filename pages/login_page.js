
class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'UserName' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }
    async navigate() {
        await this.page.goto('/login');
    }
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}

export { LoginPage };