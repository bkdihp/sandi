# Sandi - Aplikasi Kriptografi & Sandi Pramuka Interaktif

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-emerald?style=flat-square)](https://web.dev/progressive-web-apps/)
[![TWA Compatible](https://img.shields.io/badge/TWA-Android_Compatible-blue?style=flat-square)](https://developer.chrome.com/docs/android/trusted-web-activities/)
[![React 18](https://img.shields.io/badge/React-18.3-61dafb?style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178c6?style=flat-square)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square)](https://tailwindcss.com/)

**Sandi** adalah platform aplikasi web progresif (*Mobile-First Progressive Web App*) berstandar *enterprise* yang dirancang khusus untuk mendampingi para anggota, pembina, penggalang, penegak, dan pandega **Gerakan Pramuka Indonesia** dalam mempelajari, menyimulasikan, dan memecahkan berbagai sandi kepramukaan serta telegrafi lapangan secara interaktif, ergonomis, dan modern.

---

## 🌟 Fitur Utama & Modul Unggulan

### 1. 🚩 Simulator Isyarat Semafor Interaktif & Realistis
- **Model Peraga Berseragam Pramuka Lengkap**: Visualisasi vektor SVG interaktif peraga berseragam Pramuka, mengenakan baret coklat tua miring ke kanan, hasduk/kacu merah-putih ber-ring, dan sepasang bendera semafor resmi 45×45 cm merah-kuning.
- **Perspektif Ganda (Front & Back View)**:
  - *Tampak Depan*: Sudut pandang penerima pesan di seberang lapangan.
  - *Tampak Belakang*: Sudut pandang pengirim pesan (cermin posisi tangan sendiri).
- **Protokol Lapangan Alami (Rest-to-Rest)**:
  - Animasi selalu **diawali dari posisi bersiap/istirahat** (kedua bendera disilangkan di depan kaki) dan **diakhiri dengan kembali ke posisi istirahat**.
  - Tangan tidak menggantung di udara setelah huruf terakhir (seperti huruf U, Z, dsb.).
  - Navigasi scrubber urutan karakter ringkas menggunakan ikon modern.
- **Dial 8 Penjuru Mata Angin**: Panduan jarum jam posisi semafor secara visual.
- **Pengatur Kecepatan & Layar Penuh**: Pilihan tempo 0.5x, 1x, 1.5x, 2x, serta mode peragaan layar penuh (*fullscreen*).
- **Studio & Kuis Semafor**: Arena latihan tebak huruf semafor dengan pencatat skor dan efek selebrasi.

### 2. 🔊 Audio Telegrafi Sandi Morse & Peluit Akustik Lapangan
- **Sintesis Audio Web Audio API**: Frekuensi nada dan akustik menyerupai peluit pramuka asli dengan opsi karakter suara (*Peluit Lapangan*, *Peluit Siaga*, *Nada Murni 650Hz*).
- **Penerjemah Dua Arah**: Konversi teks alfabet ke kode titik dan garis (`•` / `—`) serta dekripsi kode morse kembali ke teks biasa.
- **Visualisasi Dinamis**: Indikator visual audio saat nada morse dibunyikan di lapangan.

### 3. 🌿 Sandi Rumput Otentik
- Pemetaan titik morse menjadi rumput pendek dan garis morse menjadi rumput tinggi yang saling menyambung rapi dan alami.

### 4. ⏹️ Sandi Kotak (Pigpen Ciphers)
- Dukungan lengkap Sandi Kotak 1, Sandi Kotak 2, dan varian sandi kotak bersilang dengan tipografi glif vektor yang presisi.

### 5. 📖 Ensiklopedia & Kamus Sandi Pramuka
- Buku saku digital referensi cepat alfabet lengkap A-Z dan angka 0-9 untuk Morse, Rumput, Kotak, dan Semafor (nama kunci & jarum jam).

### 6. 🏆 Arena Permainan & Tantangan Regu
- Mode kompetisi untuk menguji kecepatan membaca dan menerjemahkan sandi antar regu/pramuka.

---

## 🎨 Identitas & Master Logo Resmi (`sandiko.jpeg`)

Logo resmi **Sandi** menggunakan master `sandiko.jpeg` (resolusi 2048×2048 px) yang diekstraksi secara presisi dengan *alpha de-matting*:
- **Peluit Morse Pramuka**: Siluet hitam pekat dengan corong sudut 31° dan 3 garis kilatan akustik suara di atas lubang peluit.
- **Tunas Kelapa Emas**: Lambang resmi Gerakan Pramuka Indonesia dengan gradasi emas hangat berdiri tegak sempurna di dalam piringan hitam inti lingkaran.
- **Format Lengkap**:
  - `public/assets/logo.png` (512×512 px)
  - Varian raster: `16x16`, `32x32`, `48x48`, `64x64`, `128x128`, `192x192`, `256x256`, `512x512`, `1024x1024` px
  - PWA Adaptive & Maskable Icons (`pwa-192x192.png`, `pwa-512x512.png`, `pwa-maskable-512x512.png`)
  - iOS Apple Touch Icon (`apple-touch-icon.png`)
  - Social Share Card (`og-image.png`, 1200×630 px)

---

## 📱 Arsitektur & Desain Sistem

- **Platform Target**: Didesain khusus *Mobile-First* untuk layar *smartphone*, siap dibundel langsung menjadi **Android Trusted Web Application (TWA)**.
- **Navigasi**: Navigasi bawah (*Bottom Navigation Bar*) ergonomis, ramah jangkauan satu jempol.
- **Palet Warna**: Skema warna bernuansa Pramuka (coklat tanah, amber hangat, krem ramah mata) yang mencegah kelelahan mata (*visual fatigue*) selama penggunaan intensif di lapangan.
- **Offline First**: Dilengkapi Service Worker berbasis Workbox untuk penggunaan tanpa koneksi internet saat kegiatan perkemahan di alam terbuka.

---

## 🚀 Memulai Pengembangan

### Prasyarat
- **Node.js**: v18.0.0 atau lebih baru
- **npm** atau **bun**

### Instalasi & Menjalankan
```bash
# 1. Instal seluruh dependensi
npm install

# 2. Jalankan server pengembangan (port 3000)
npm run dev

# 3. Validasi tipe TypeScript dan sintaks
npm run lint

# 4. Bangun versi produksi (PWA & Service Worker)
npm run build
```

---

## 🔒 Privasi & Keamanan Repositori

Repositori ini ditujukan sebagai repositori pribadi (**Private Repository**) milik akun GitHub:
```
bkdihp/sandi
```

Untuk memastikan repositori berstatus **Private** melalui GitHub CLI atau konsol terminal:
```bash
gh repo edit bkdihp/sandi --visibility private
```
Atau melalui web GitHub:
1. Masuk ke halaman repositori `https://github.com/bkdihp/sandi`.
2. Klik tab **Settings** (Pengaturan).
3. Gulir ke bagian paling bawah (**Danger Zone**).
4. Klik **Change repository visibility** lalu pilih **Make private**.

---

## 👤 Pengembang & Hak Cipta

- **Pengembang & Arsitek**: **Budhystory (Budhy Susanto)** · *Banyumas, Jawa Tengah*
- **Dedikasi**: Gerakan Pramuka Indonesia (*Satyaku kudarmakan, darmaku kubaktikan*)
- **Lisensi**: Hak Cipta Terpelihara © 2026.
