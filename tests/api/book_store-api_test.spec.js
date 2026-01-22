import { test, expect, request } from '@playwright/test';
import users from '../../data/users.json';
import { BookStoreAPI } from '../../api/book_store_api.js';
import { AccountAPI } from '../../api/account_api.js';

test.describe.configure({ mode: 'serial' });

test.describe('Book Store API Tests', () => {
    let apiContext;
    let accountApi;
    let bookStoreApi;
    let userId;
    let token;
    let isbn1, isbn2, isbn3;
    test.beforeAll(async () => {
        // 🔑 Crear un contexto de API independiente 
        apiContext = await request.newContext({ baseURL: 'https://demoqa.com' });
        accountApi = new AccountAPI(apiContext);
        bookStoreApi = new BookStoreAPI(apiContext);
        // Create user
        const createUserResponse = await accountApi.createUser(users.validUser.userName, users.validUser.password);
        //console.log(await createUserResponse.json());
        expect(createUserResponse.status()).toBe(201);
        userId = (await createUserResponse.json()).userID;
        // Generate token
        const generateTokenResponse = await accountApi.generateToken(users.validUser.userName, users.validUser.password);
        expect(generateTokenResponse.status()).toBe(200);
        token = (await generateTokenResponse.json()).token;
        // Authorize 
        const authRes = await accountApi.authorize(users.validUser.userName, users.validUser.password);
        expect(await authRes.json()).toBe(true);
        // Get some ISBNs for tests
        const booksResponse = await bookStoreApi.getBooks();
        const books = await booksResponse.json();
        isbn1 = books.books[0].isbn;
        isbn2 = books.books[1].isbn;
        isbn3 = books.books[2].isbn;
    });
    test.afterAll(async () => {
        // Clean up: delete user
        const deleteUserResponse = await accountApi.deleteUser(userId, token);
        expect(deleteUserResponse.status()).toBe(204);
        await apiContext.dispose();
    });
    test('Get user profile', async () => {
        const response = await accountApi.getUser(userId, token);
        expect(response.status()).toBe(200);
    });

    test('Get all books', async () => {
        const response = await bookStoreApi.getBooks();
        expect(response.status()).toBe(200);
        const books = await response.json();
        expect(books).toHaveProperty('books');
        expect(Array.isArray(books.books)).toBe(true);
    });
    test('Add book to user collection', async () => {
        const addBookResponse = await bookStoreApi.addBooksToUser(userId, token, [
            { isbn: isbn1 }, { isbn: isbn2 }]);
        expect(addBookResponse.status()).toBe(201);
    });
    test('Update book in user collection', async () => {
        const replaceIsbn = isbn3;
        const updateBookResponse = await bookStoreApi.updateUserBooks(userId, token, isbn2, replaceIsbn);
        //console.log(await updateBookResponse.json());
        expect(updateBookResponse.status()).toBe(200);
    });
    test('Delete book from user collection', async () => {
        const deleteBookResponse = await bookStoreApi.deleteBookFromUser(userId, isbn3, token);
        expect(deleteBookResponse.status()).toBe(204);
    });
    test('Clear user book collection', async () => {
        const clearBooksResponse = await bookStoreApi.clearUserBooks(userId, token);
        expect(clearBooksResponse.status()).toBe(204);
    });
});