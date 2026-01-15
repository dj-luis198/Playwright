class DatePickerPage {
    constructor(page) {
        this.page = page;
        this.datePicker1 = page.locator('#datePickerMonthYearInput');
        this.datePicker2 = page.locator('#dateAndTimePickerInput');
    }

    async navigate() {
        await this.page.goto('/date-picker');
    }

    async fillDate1(date) {
        await this.datePicker1.fill(date);
        await this.page.keyboard.press('Enter')
    }

    async getDate1() {
        return await this.datePicker1.inputValue();
    }

    getDateToDay() {
        const today = new Date();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // meses van de 0-11
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${month}/${day}/${year}`;
        return formattedDate;
    }

    async fillDate2(date) {
        await this.datePicker2.fill(date);
        await this.page.keyboard.press('Enter')
    }

    async getDate2() {
        return await this.datePicker2.inputValue();
    }

    getDateToDay2() {
        const now = new Date();

        const month = now.toLocaleString('en-US', { month: 'long' });
        const day = String(now.getDate()).padStart(2, '0');
        const year = now.getFullYear();
        const time = now.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

        const formatted = `${month} ${day}, ${year}`;
        return formatted;
    }
}

export { DatePickerPage }