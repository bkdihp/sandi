# Sandi - Kriptografi & Sandi Pramuka

Aplikasi berbasis web untuk memudahkan para pandu/Pramuka menerjemahkan teks ke dalam berbagai sandi Pramuka (*Morse*, *Rumput*, *Kotak*, dan *Semafor*). Dibangun dengan arsitektur modern berbasis **React + TypeScript + Tailwind CSS**.

## Fitur Utama

- **Sandi Morse**: Menerjemahkan alfabet dan angka ke kode titik dan garis Morse, lengkap dengan pemutar audio beeper frekuensi 650Hz dan fitur dekode balik.
- **Sandi Rumput**: Konversi ke visual sandi rumput autentik menggunakan font kustom `@font/sandi_rumput`.
- **Sandi Kotak**: Konversi ke lambang sandi kotak (Pigpen cipher) menggunakan font kustom `@font/sandi_kotak`.
- **Sandi Semafor**: Konversi visual sandi bendera semaphore menggunakan font kustom `@font/semapore`.
- **Salin Hasil & Bagikan**: Tombol satu-klik untuk menyalin kode hasil terjemahan ke clipboard.
- **Buku Saku Sandi**: Informasi dan ensiklopedia referensi alfabet lengkap sandi Pramuka.
- **Halaman Credit**: Profil pembuat asli aplikasi.

## Logo Resmi Aplikasi

Logo resmi aplikasi **Sandi** memadukan:
- **Tunas Kelapa**: Lambang resmi Gerakan Pramuka Indonesia
- **Sandi Rumput**: Rerumputan ilalang morse pada bagian dasar logo
- **Bendera Semafor**: Sepasang bendera merah-kuning bersilang di latar belakang

Logo tersimpan sebagai aset vektor statis di `/assets/logo.svg`.

## Teknologi

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Ikon**: Vektor SVG Kepramukaan Khusus + Lucide React
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

- **budhystory** - *Pengembang & Pemelihara Saat Ini (Banyumas, Jawa Tengah)*
- Terinspirasi dari proyek awal: [kode.in oleh rbayuokt](https://github.com/rbayuokt/kode.in)
- Didedikasikan untuk kemajuan Gerakan Pramuka Indonesia

## Lisensi

Proyek ini berada di bawah lisensi MIT - lihat file [LICENSE](LICENSE) untuk informasi lebih lanjut.
