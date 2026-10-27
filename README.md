# Starter Playwright - Sesi D

## Untuk penyelenggara (sekali, sebelum hari tes)
1. Pasang Node.js (versi LTS).
2. Di folder ini jalankan:
       npm install
       npx playwright install chromium
3. Jalankan `npx playwright test`. Tes contoh harus hijau (1 passed).
4. Ulangi di setiap laptop tes.

## Untuk peserta
- Kamu tidak perlu menginstal apa pun.
- Jalankan tes: `npx playwright test`
- Tes contoh ada di `tests/contoh.spec.js`. Buat file baru `tests/namamu.spec.js` untuk tesmu.
- Aplikasi yang diuji adalah salinan lokal `toko-mini.html`. Alamatnya sudah diatur di `tests/app.js`;
  pakai `urlApp` dari file itu pada `page.goto(urlApp)`.
- Elemen aplikasi punya id yang bisa dilihat lewat DevTools browser (klik kanan lalu Inspect).
