import { test, expect } from '@playwright/test';

test('Verify Login using Invalid Credentials ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.fill('#user-name', 'Nebula');
    await page.fill('#password', 'CR7');
    await page.click('#login-button');
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
})