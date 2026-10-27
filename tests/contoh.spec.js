// Tes contoh. Pastikan tes ini hijau saat kamu menjalankan "npx playwright test".
// Tambahkan tes barumu di folder ini (file baru berakhiran .spec.js) dengan pola yang sama.
const { test, expect } = require('@playwright/test');
const { urlApp } = require('./app');

test('halaman Toko Mini terbuka dan menampilkan saldo awal', async ({ page }) => {
  await page.goto(urlApp);
  await expect(page.locator('h1')).toHaveText('Toko Mini');
  await expect(page.locator('#saldo')).toContainText('2.000.000');
});
