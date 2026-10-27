// Alamat aplikasi Toko Mini.
// Secara bawaan memakai salinan lokal (toko-mini.html di folder utama project).
// Untuk memakai alamat web, jalankan dengan: TOKO_URL=https://... npx playwright test
const path = require('path');
const { pathToFileURL } = require('url');

module.exports = {
  urlApp:
    process.env.TOKO_URL ||
    pathToFileURL(path.join(__dirname, '..', 'toko-mini.html')).href,
};
