import { test } from '../setup.js';
import { expect } from '@playwright/test';
import { DatePickerPage } from '../../pages/widgets/date_picker_page.js';

test.describe('Date pickers test', () => {
    let datePickerPage;
    test.beforeEach(async ({ page }) => {
        datePickerPage = new DatePickerPage(page);
        await datePickerPage.navigate();
        //await page.pause();
    })
    test('Date picker valid date', async () => {
        const date = '07/21/1984';
        await datePickerPage.fillDate1(date);
        const date1 = await datePickerPage.getDate1();
        expect(date1).toBe(date)
    })
    test('Date picker2 valid date', async () => {
        const date = 'January 21, 2026 10:00 PM';
        await datePickerPage.fillDate2(date);
        const date1 = await datePickerPage.getDate2();
        expect(date1).toBe(date)
    })
    test('Date piker invalid date', async ()=>{
        const invalidDate = '21/04/2000';
        await datePickerPage.fillDate1(invalidDate);
        const date = await datePickerPage.getDate1();
        const dateToDay = datePickerPage.getDateToDay();
        expect(date).toBe(dateToDay);
    })
    test('Date piker invalid date2', async ()=>{
        const invalidDate = '01 15, 2026 10:00';
        await datePickerPage.fillDate2(invalidDate);
        const date = await datePickerPage.getDate2();
        const dateToDay = datePickerPage.getDateToDay2();
        expect(date).toMatch(dateToDay);
    })
})