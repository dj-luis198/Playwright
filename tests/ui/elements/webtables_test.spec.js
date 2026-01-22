import { test } from '../../setup.js';
import { expect } from '@playwright/test';
import { WebTablePage } from '../../../pages/elements/webtables_page.js';
import { faker } from '@faker-js/faker';

test.describe('Web Tables tests', () => {
    let webTablePage;
    test.beforeEach(async ({ page }) => {
        webTablePage = new WebTablePage(page);
        await webTablePage.navigate();
        //await page.pause();
    });

    test('Add new record to web table', async () => {
        const newRecord = {
            firstName: webTablePage.truncateField(faker.person.firstName()),
            lastName: webTablePage.truncateField(faker.person.lastName()),
            age: faker.number.int({ min: 18, max: 80 }),
            email: faker.internet.email(),
            salary: faker.number.int({ min: 30000, max: 100000 }),
            department: webTablePage.truncateField(faker.company.name())
        };

        await webTablePage.addNewRecord(newRecord);
        await webTablePage.search(newRecord.firstName);

        const rowValues = await webTablePage.getRowByEmail(newRecord.email);

        expect(rowValues).toContain(newRecord.firstName);
        expect(rowValues).toContain(newRecord.lastName);
        expect(rowValues).toContain(newRecord.age.toString());
        expect(rowValues).toContain(newRecord.email);
        expect(rowValues).toContain(newRecord.salary.toString());
        expect(rowValues).toContain(newRecord.department);
    });



    test('Search for a record in web table', async () => {
        await webTablePage.search('Cierra');
        const rowValues = await webTablePage.getRowValues(0);
        expect(rowValues).toContain('Cierra');
    });

    test('Edit a record in web table', async () => {
        await webTablePage.search('Alden');
        await webTablePage.clickEditByRow(0);
        await webTablePage.page.fill('#age', '29');
        await webTablePage.page.click('#submit');
        const rowValues = await webTablePage.getRowValues(0);
        expect(rowValues).toContain('29');
    });

    test('Delete a record from web table', async () => {
        await webTablePage.search('Kierra');
        await webTablePage.clickDeleteByRow(0);
        const nonEmptyRows = await webTablePage.getNonEmptyRows();
        expect(nonEmptyRows.length).toBe(0);
    });

    test('Change page size in web table', async () => {
        await webTablePage.setPageSize(10);
        const rowCount = await webTablePage.rows.count();
        expect(rowCount).toBeLessThanOrEqual(10);
    });

    test('Navigate between pages when enough records exist', async () => {

        // Configurar tamaño de página en 5
        await webTablePage.setPageSize(5);

        // Validar que inicialmente no hay paginación
        expect(await webTablePage.nextButton.isEnabled()).toBeFalsy();
        expect(await webTablePage.prevButton.isEnabled()).toBeFalsy();

        // Agregar 6 registros para forzar una segunda página
        for (let i = 0; i < 3; i++) {
            await webTablePage.addNewRecord({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                age: faker.number.int({ min: 18, max: 80 }),
                email: faker.internet.email(),
                salary: faker.number.int({ min: 30000, max: 100000 }),
                department: faker.company.name()
            });
        }
        // Ahora debería haber paginación
        let totalPages = await webTablePage.getTotalPages();
        expect(totalPages).toBe(2);

        // Ahora sí debería habilitarse el botón Next
        expect(await webTablePage.nextButton.isEnabled()).toBeTruthy();

        // Ir a la página siguiente
        await webTablePage.goToNextPage();
        expect(await webTablePage.getCurrentPageNumber()).toBe(2);

        // Validar que hay registros en la segunda página
        const rowValuesNext = await webTablePage.getNonEmptyRows();
        expect(rowValuesNext.length).toBeGreaterThan(0);

        // Ir a la página anterior
        expect(await webTablePage.prevButton.isEnabled()).toBeTruthy();
        await webTablePage.goToPreviousPage();

        // Validar que volvimos a la primera página
        expect(await webTablePage.getCurrentPageNumber()).toBe(1);
    });

});