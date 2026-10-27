// Sesi 4.1 — Otomasi Toko Mini (tiga skenario)
// Selector stabil (id), assertion bermakna, tanpa waitForTimeout.
// Jalankan: npx playwright test
const { test, expect } = require('@playwright/test');
const { urlApp } = require('./app');

// Data uji valid dipakai ulang antar tes (tetap bisa dibaca & dirawat).
const dataValid = {
  nama: 'Siti Aminah',
  email: 'siti.aminah@mail.com',
  password: 'rahasia1', // 8 karakter + 1 angka
  usia: '25',
};

test.beforeEach(async ({ page }) => {
  await page.goto(urlApp);
});

test('1. Registrasi berhasil dengan data valid', async ({ page }) => {
  await page.fill('#nama', dataValid.nama);
  await page.fill('#email', dataValid.email);
  await page.fill('#password', dataValid.password);
  await page.fill('#usia', dataValid.usia);
  await page.click('#btn-daftar');

  // Assertion bermakna: pesan sukses benar-benar tampil.
  await expect(page.locator('#pesan-registrasi')).toHaveText('Registrasi berhasil');
});

test('2a. Registrasi gagal: nama kosong', async ({ page }) => {
  // Nama sengaja tidak diisi.
  await page.fill('#email', dataValid.email);
  await page.fill('#password', dataValid.password);
  await page.fill('#usia', dataValid.usia);
  await page.click('#btn-daftar');

  await expect(page.locator('#pesan-registrasi')).toHaveText('Nama wajib diisi');
});

test('2b. Registrasi gagal: usia 16', async ({ page }) => {
  await page.fill('#nama', dataValid.nama);
  await page.fill('#email', dataValid.email);
  await page.fill('#password', dataValid.password);
  await page.fill('#usia', '16');
  await page.click('#btn-daftar');

  await expect(page.locator('#pesan-registrasi')).toHaveText('Usia harus 17-60 tahun');
});

test('3. Tambah produk, bayar, saldo berkurang & pesanan masuk riwayat', async ({ page }) => {
  // Tambah 1 Keyboard (harga Rp150.000, tidak kena diskon 10% karena < Rp500.000).
  await page.fill('#qty-1', '1');
  await page.click('#tambah-1');

  // Total dan saldo sebelum bayar.
  await expect(page.locator('#total')).toHaveText('Rp150.000');
  await expect(page.locator('#saldo')).toHaveText('Rp2.000.000');

  await page.click('#btn-bayar');

  // Auto-wait: Playwright menunggu pesan akhir setelah proses async (0,8 dtk),
  // tanpa perlu waitForTimeout.
  await expect(page.locator('#pesan-checkout')).toHaveText('Pembayaran berhasil');

  // Saldo berkurang sesuai total: 2.000.000 - 150.000 = 1.850.000.
  await expect(page.locator('#saldo')).toHaveText('Rp1.850.000');

  // Pesanan tercatat di riwayat.
  await expect(page.locator('#riwayat')).toContainText('Pesanan #1');
  await expect(page.locator('#riwayat')).toContainText('Rp150.000');
});
