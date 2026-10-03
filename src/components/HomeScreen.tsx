import React from 'react';
import {
  ArrowRight,
  Volume2,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import {
  SandiAppLogo,
  TunasKelapaIcon,
  WosmFleurIcon,
  PeluitMorseIcon,
  SandiRumputIcon,
  SandiKotakIcon,
  BenderaSemaforIcon,
  KompasBidikIcon,
  BukuSakuIcon,
} from './ScoutIcons';

interface HomeScreenProps {
  onNavigate: (screen: 'morse' | 'rumput' | 'kotak' | 'semafor' | 'about' | 'dictionary') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-10 space-y-8">
      {/* 1. Hero Section (Clean Minimalist Enterprise Scout Canvas) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950 text-white p-6 sm:p-10 shadow-lg border border-stone-800">
        {/* Subtle decorative vector watermark icons */}
        <div className="absolute right-4 -bottom-8 opacity-10 pointer-events-none">
          <TunasKelapaIcon className="w-64 h-64 text-amber-300" />
        </div>
        <div className="absolute right-48 -top-12 opacity-10 pointer-events-none hidden md:block">
          <WosmFleurIcon className="w-48 h-48 text-amber-200" />
        </div>

        <div className="relative z-10 max-w-2xl">
          {/* Unboxed Metadata Header (Zero-Pill discipline) */}
          <div className="flex items-center gap-2.5 text-xs font-semibold text-amber-400/90 tracking-wide uppercase">
            <SandiAppLogo className="w-6 h-6" />
            <span>Gerakan Pramuka Indonesia</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span>Aplikasi Sandi</span>
            <span aria-hidden="true" className="text-stone-500">·</span>
            <span>Standar SKU & SKK</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-3 text-balance leading-tight font-['Poppins']">
            Sandi — Kriptografi Pramuka
          </h1>

          <p className="text-stone-300 text-sm sm:text-base mt-3 leading-relaxed">
            Platform kriptografi dan telegrafi lapangan berstandar enterprise.
            Terjemahkan, dengarkan sinyal peluit morse, pelajari formasi bendera semafor,
            serta eksplorasi sandi rumput dan sandi kotak secara instan.
          </p>

          {/* Action CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('morse')}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Mulai Sandi Morse</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate('dictionary')}
              className="px-4 py-2.5 rounded-xl bg-stone-800/90 hover:bg-stone-700/90 text-stone-200 text-xs sm:text-sm font-semibold border border-stone-700 transition-all flex items-center gap-2"
            >
              <BukuSakuIcon className="w-4 h-4 text-amber-400" />
              <span>Buka Kamus Sandi</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. 4 Primary Scout Cipher Modules (Balanced 2x2 Grid) */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900 tracking-tight">
              Modul Sandi Utama
            </h2>
            <p className="text-xs text-stone-500">
              Pilih salah satu metode sandi pramuka untuk memulai translasi
            </p>
          </div>
          <span className="text-xs text-stone-400 hidden sm:inline">
            4 Metode Komunikasi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {/* Card 1: Sandi Morse */}
          <div
            onClick={() => onNavigate('morse')}
            className="group p-5 rounded-2xl bg-white border border-stone-200/90 hover:border-amber-600/50 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/60 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <PeluitMorseIcon className="w-7 h-7 text-amber-800" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-400 group-hover:text-amber-800 transition-colors">
                  <span>Buka Modul</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    Sandi Morse
                  </h3>
                  <span className="text-[11px] text-stone-500">· Akustik & Visual</span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Konversi teks ke pola titik-garis dengan audio synthesizer peluit morse (650Hz) dan mode dekode balik.
                </p>
              </div>
            </div>

            {/* Visual Preview Snippet */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 px-2 py-1 rounded border border-amber-200/50">
                .-. . --. ..-   --. .- .-. ..- -.. .-
              </span>
              <span className="text-[11px] text-stone-400 font-medium flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-amber-700" /> Audio aktif
              </span>
            </div>
          </div>

          {/* Card 2: Sandi Rumput */}
          <div
            onClick={() => onNavigate('rumput')}
            className="group p-5 rounded-2xl bg-white border border-stone-200/90 hover:border-emerald-600/50 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <SandiRumputIcon className="w-7 h-7 text-emerald-800" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-400 group-hover:text-emerald-800 transition-colors">
                  <span>Buka Modul</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                    Sandi Rumput
                  </h3>
                  <span className="text-[11px] text-stone-500">· Ilalang Morse</span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Sandi turunan morse berbentuk bilah rumput pendek dan tinggi khas kegiatan penjelajahan alam Pramuka.
                </p>
              </div>
            </div>

            {/* Visual Preview Snippet */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="font-sandi-rumput text-2xl text-emerald-900 leading-none">
                pramuka
              </span>
              <span className="text-[11px] text-stone-400 font-medium">
                Font Vektor Asli
              </span>
            </div>
          </div>

          {/* Card 3: Sandi Kotak */}
          <div
            onClick={() => onNavigate('kotak')}
            className="group p-5 rounded-2xl bg-white border border-stone-200/90 hover:border-slate-600/50 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <SandiKotakIcon className="w-7 h-7 text-slate-800" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-400 group-hover:text-slate-800 transition-colors">
                  <span>Buka Modul</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-slate-800 transition-colors">
                    Sandi Kotak (Pigpen)
                  </h3>
                  <span className="text-[11px] text-stone-500">· Geometri Kotak 1 & 2</span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Penyandian berdasar kisi petak 3x3 dan salib silang X dengan titik diferensiasi huruf.
                </p>
              </div>
            </div>

            {/* Visual Preview Snippet */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="font-sandi-kotak text-2xl text-slate-800 leading-none tracking-wider">
                pramuka
              </span>
              <span className="text-[11px] text-stone-400 font-medium">
                Sandi Kotak I & II
              </span>
            </div>
          </div>

          {/* Card 4: Sandi Semafor */}
          <div
            onClick={() => onNavigate('semafor')}
            className="group p-5 rounded-2xl bg-white border border-stone-200/90 hover:border-red-600/50 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-800 border border-red-200/60 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                  <BenderaSemaforIcon className="w-7 h-7 text-red-800" />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-400 group-hover:text-red-800 transition-colors">
                  <span>Buka Modul</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-red-800 transition-colors">
                    Sandi Semafor
                  </h3>
                  <span className="text-[11px] text-stone-500">· 8 Penjuru Bendera</span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  Komunikasi optik bendera merah-kuning menggunakan sudut rotasi jarum jam sekeliling tubuh pandu.
                </p>
              </div>
            </div>

            {/* Visual Preview Snippet */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="font-sandi-semafor text-3xl text-stone-900 leading-none tracking-widest">
                pramuka
              </span>
              <span className="text-[11px] text-stone-400 font-medium">
                Bendera 45x45 cm
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Scout Encyclopedia & Interactive Field Guide */}
      <section className="bg-stone-50/90 rounded-2xl border border-stone-200/80 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center border border-amber-200 shrink-0">
              <KompasBidikIcon className="w-6 h-6 text-amber-900" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Kamus Interaktif 26 Huruf Alfabet & Angka
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Lihat representasi setiap karakter A–Z secara serentak di empat jenis sandi
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('dictionary')}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors self-start sm:self-center"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Buka Kamus Lengkap</span>
          </button>
        </div>
      </section>

      {/* 4. Scout Values & Attribution Card */}
      <footer className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <TunasKelapaIcon className="w-4 h-4 text-amber-800" />
          <span>Satyaku Kudarmakan, Darmaku Kubaktikan · Gerakan Pramuka</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="text-stone-600 hover:text-stone-900 font-medium underline underline-offset-2"
          >
            Credit Pengembang
          </button>
          <span>·</span>
          <span>Cimahi, Jawa Barat</span>
        </div>
      </footer>
    </div>
  );
};
