import { test, expect } from '@playwright/test';

test('Have auth', async ({ page }) => {
    await page.goto('http://localhost:5173/auth');
    await page.waitForLoadState('domcontentloaded')
    const h1Element = await page.locator('h1');
    const h1Text = await h1Element.textContent();

    expect(h1Text).toBe('Авторизация');
});

test('Error auth', async ({ page }) => {
    await page.goto('http://localhost:5173/auth');
    await page.locator('input[name="login"]').fill('login');
    await page.locator('input[name="password"]').fill('pass');
    const errorDiv = await page.locator('.p-message-text[data-pc-section="text"]');
    const errorText = await errorDiv.textContent();

    expect(errorText).toBe('Пароль должен содержать минимум 8 символов');
});