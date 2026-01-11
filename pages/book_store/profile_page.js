import { waitAndClick } from "../../utils/helpers";

class ProfilePage {
    constructor(page, username) {
        this.page = page;
        this.profileLink = page.getByText(username);
        this.logoutButton = page.getByRole('button', { name: 'Log out' });
    }

    // Locator dinámico para el nombre del usuario 
    getUserNameLocator(username) { 
        return this.page.getByText(username); 
    }

    async logout() {
        await this.logoutButton.click();
    }
}

export { ProfilePage };