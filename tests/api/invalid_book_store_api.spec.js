import { test, expect, request } from '@playwright/test';
import users from '../../data/users.json';
import { BookStoreAPI } from '../../api/book_store_api.js';
import { AccountAPI } from '../../api/account_api.js';

test('Invalid user credentials, UserName and Password empty', async ({ request }) => {
    let accountApi = new AccountAPI(request);
    const user = await accountApi.createUser(users.invalidUser.userName, users.invalidUser.password);
    if (user.status() === 201) {
        console.log('User was created with invalid credentials, deleting user...');
        const userId = (await user.json()).userID;
        const deleteUser = await accountApi.deleteUser(userId);
        expect(deleteUser.status()).toBe(204);
    }
    expect(user.status()).toBe(400);
    console.log(await user.json());
    console.log('User creation with invalid credentials failed as expected.');
});
test('Invalid user credentials, UserName valid and Password empty', async ({ request }) => {
    let accountApi = new AccountAPI(request);
    const user = await accountApi.createUser(users.invalidUser2.userName, users.invalidUser2.password);
    if (user.status() === 201) {
        console.log('User was created with invalid credentials, deleting user...');
        const userId = (await user.json()).userID;
        const deleteUser = await accountApi.deleteUser(userId);
        expect(deleteUser.status()).toBe(204);
    }
    expect(user.status()).toBe(400);
    console.log(await user.json());
    console.log('User creation with invalid credentials failed as expected.');
});
test('Invalid user credentials, UserName empty and Password valid', async ({ request }) => {
    let accountApi = new AccountAPI(request);
    const user = await accountApi.createUser(users.invalidUser3.userName, users.invalidUser3.password);
    if (user.status() === 201) {
        console.log('User was created with invalid credentials, deleting user...');
        const userId = (await user.json()).userID;
        const deleteUser = await accountApi.deleteUser(userId);
        expect(deleteUser.status()).toBe(204);
    }
    expect(user.status()).toBe(400);
    console.log(await user.json());
    console.log('User creation with invalid credentials failed as expected.');
});
test('Invalid user credentials, UserName and Password too short', async ({ request }) => {
    let accountApi = new AccountAPI(request);
    const user = await accountApi.createUser(users.invalidUser4.userName, users.invalidUser4.password);
    if (user.status() === 201) {
        console.log('User was created with invalid credentials, deleting user...');
        const userId = (await user.json()).userID;
        const deleteUser = await accountApi.deleteUser(userId);
        expect(deleteUser.status()).toBe(204);
    }
    expect(user.status()).toBe(400);
    console.log(await user.json());
    console.log('User creation with invalid credentials failed as expected.');
});

    // tewst skippeado porque se crean usuarios con credenciales invalidas y no se pueden borrar
test.skip('Invalid user credentials, UserName and Password too long', async ({ request }) => {
    let accountApi = new AccountAPI(request);
    const user = await accountApi.createUser(users.invalidUser5.userName, users.invalidUser5.password);
    if (user.status() === 201) {
        console.log('User was created with invalid credentials, deleting user...');
        const userId = (await user.json()).userID;
        // Generate token
        const generateTokenResponse = await accountApi.generateToken(users.invalidUser5.userName, users.invalidUser5.password);
        if (generateTokenResponse.status() === 200) {
            expect(generateTokenResponse.status()).toBe(200);
            token = (await generateTokenResponse.json()).token;
            // Authorize 
            const authRes = await accountApi.authorize(users.invalidUser5.userName, users.invalidUser5.password);
            expect(await authRes.json()).toBe(true);
            const deleteUser = await accountApi.deleteUser(userId);
            expect(deleteUser.status()).toBe(204);
        } else {
            console.log('Token generation failed, cannot delete user.');
            expect(generateTokenResponse.status()).toBe(200);
        }

    } else {
        expect(user.status()).toBe(400);
        console.log(await user.json());
        console.log('User creation with invalid credentials failed as expected.');
    }

});

