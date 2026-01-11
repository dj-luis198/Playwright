class CheckboxPage {
    constructor(page) {
        this.page = page;
        this.expandAllButton = page.getByRole('button', { name: 'Expand all' });
        this.collapseAllButton = page.getByRole('button', { name: 'Collapse all' });
    }
    async navigate() {
        return this.page.goto('/checkbox');
    }
    async expandAll() {
        await this.expandAllButton.click();
    }

    async collapseAll() {
        await this.collapseAllButton.click();
    }

    /** * Hace click en el checkbox de un nodo del árbol por su nombre visible.
     *  * @param {string} nodeName - Texto del nodo (ej. "Desktop", "Notes", "Commands") 
     * */
    async clickCheckboxByName(nodeName) {
        const locator = this.page.locator(`.rct-node .rct-text:has-text("${nodeName}") .rct-checkbox`);
        await locator.click();
    }

    get result() {
        return this.page.locator('#result');
    }
}

export { CheckboxPage };