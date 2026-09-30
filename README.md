# kode.in

Aplikasi berbasis web untuk memudahkan para pandu/Pramuka menerjemahkan teks ke dalam berbagai sandi Pramuka (*Morse*, *Rumput*, *Kotak*, dan *Semafor*). Ditulis ulang dari aplikasi Android aslinya menjadi aplikasi modern berbasis **React + TypeScript + Tailwind CSS**.

## Fitur Utama

- **Sandi Morse**: Menerjemahkan alfabet dan angka ke kode titik dan garis Morse, lengkap dengan pemutar audio beeper frekuensi 650Hz.
- **Sandi Rumput**: Konversi ke visual sandi rumput autentik menggunakan font kustom `@font/sandi_rumput`.
- **Sandi Kotak**: Konversi ke lambang sandi kotak (Pigpen cipher) menggunakan font kustom `@font/sandi_kotak`.
- **Sandi Semafor**: Konversi visual sandi bendera semaphore menggunakan font kustom `@font/semapore`.
- **Salin Hasil**: Tombol satu-klik untuk menyalin kode hasil terjemahan ke clipboard.
- **Panduan Sandi**: Informasi dan contekan referensi dasar sandi Pramuka.
- **Halaman Credit**: Profil pembuat asli aplikasi.

## Teknologi

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Ikon**: Lucide React
- **Audio**: Web Audio API oscillator
- **Font Asli**: Poppins, Sandi Kotak, Sandi Rumput, Sandi Semafor

## Cara Menjalankan

```bash
# Instalasi dependencies
npm install

# Menjalankan development server (port 3000)
npm run dev

# Membangun versi produksi
npm run build
```

## Penulis & Kredit

- **Rizky Bayu Oktavian** - *Pembuat asli kode.in* - [@rbayuokt](https://www.instagram.com/rbayuokt/)
- Dibuat dengan ♥ di Cimahi

## Lisensi

Proyek ini berada di bawah lisensi MIT - lihat file [LICENSE](LICENSE) untuk informasi lebih lanjut.
