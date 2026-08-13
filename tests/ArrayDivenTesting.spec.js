import { test, expect } from '@playwright/test';

const user = [
    {username: 'standard_user', expectSuccess: true},
    {username: 'locked_out_user', expectSuccess: false},
    {username: 'problem_user', expectSuccess: true},
    {username: 'performance_glitch_user', expectSuccess: true},
    {username: 'error_user', expectSuccess: true},
    {username: 'virtual_user', expectSuccess: true},
];

for (const user of users) {
    test(`login as ${user.username}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', user.username);
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        if (user.expectSuccess) {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        } else {
            await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
        }
    });
}