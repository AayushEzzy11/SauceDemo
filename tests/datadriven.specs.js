import { test, expect } from '@playwright/test';
import fs from 'fs';
import { parse } from 'csv-parse/sync';

const users = parse(
    fs.readFileSync('./loginData.csv'),
    { columns: true }
);

for (const user of users) {
    test(`login as ${user.username}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', user.username);
        await page.fill('#password', user.password);
        await page.click('#login-button');

        if (user.expectSuccess === 'true') {
            await expect(page).toHaveURL(
                'https://www.saucedemo.com/inventory.html'
            );
        } else {
            await expect(
                page.getByText(
                    'Epic sadface: Sorry, this user has been locked out.'
                )
            ).toBeVisible();
        }
    });
}