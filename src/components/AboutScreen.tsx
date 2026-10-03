import React from 'react';
import { ArrowLeft, Heart } from 'lucide-react';
import { SandiAppLogo, TunasKelapaIcon, WosmFleurIcon } from './ScoutIcons';

interface AboutScreenProps {
  onBack: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 lg:py-10 space-y-6">
      {/* Top Bar with back trigger */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 transition-colors py-1 px-2.5 -ml-2.5 rounded-lg hover:bg-stone-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
          <SandiAppLogo className="w-4 h-4" />
          <span>Sandi v2.0 Enterprise</span>
        </div>
      </div>

      {/* Main Author Card */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Subtle background scout seal */}
        <div className="absolute -right-8 -top-8 opacity-5 pointer-events-none">
          <TunasKelapaIcon className="w-48 h-48 text-stone-900" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {/* Avatar with Scout Honor Ring */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-amber-600/20 shadow-md ring-4 ring-stone-100">
              <img
                src="/assets/bayu2.png"
                alt="Rizky Bayu Oktavian"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amber-700 text-white flex items-center justify-center shadow-md border-2 border-white" title="Pramuka Developer">
              <TunasKelapaIcon className="w-4 h-4 text-white" />
            </div>
          </div>

          {/* Bio Details */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                Rizky Bayu Oktavian
              </h1>
              <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-full inline-block self-center sm:self-auto">
                Kreator & Pengembang Asli
              </span>
            </div>

            <p className="text-xs text-stone-500 mt-1">
              Lahir 06 Oktober 1998 · UI/UX & Software Engineering · Cimahi, Jawa Barat
            </p>

            <p className="text-sm text-stone-600 mt-3 leading-relaxed">
              Senang belajar sesuatu yang baru, sangat menyukai desain antarmuka (UI/UX)
              dan pemrograman modern. Dibuat dengan dedikasi untuk mendukung pembelajaran sandi
              di gugus depan Gerakan Pramuka Indonesia.
            </p>

            {/* Social Links */}
            <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <a
                href="https://www.instagram.com/rbayuokt"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-stone-50 hover:bg-pink-50 hover:text-pink-700 border border-stone-200/60 transition-colors flex items-center gap-2 text-stone-700"
              >
                <svg className="w-4 h-4 fill-current shrink-0 text-pink-600" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="truncate">@rbayuokt</span>
              </a>

              <a
                href="https://github.com/rbayuokt"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-stone-50 hover:bg-stone-200/80 hover:text-stone-900 border border-stone-200/60 transition-colors flex items-center gap-2 text-stone-700"
              >
                <svg className="w-4 h-4 fill-current shrink-0 text-stone-900" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span className="truncate">GitHub</span>
              </a>

              <a
                href="https://dribbble.com/rbayuokt_"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-stone-50 hover:bg-pink-50 hover:text-pink-600 border border-stone-200/60 transition-colors flex items-center gap-2 text-stone-700"
              >
                <svg className="w-4 h-4 fill-current shrink-0 text-pink-600" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10.198 10.742c-.08-.002-2.34-.055-4.708.799-.073-.16-.149-.323-.227-.487-1.025-2.15-2.28-4.041-2.39-4.204 2.973.902 5.333 3.14 7.325 3.892zm-8.878-6.195c.121.178 1.347 2.005 2.348 4.098-2.68.859-5.467 1.054-7.464 1.096 1.056-2.583 3.136-4.577 5.116-5.194zm-6.666 6.643c1.94-.047 4.542-.234 7.072-1.034.423.864.814 1.758 1.168 2.673-3.664 1.107-7.411 3.513-8.083 4.004-.265-1.637-.282-3.89-.157-5.643zm1.189 7.074c.677-.492 4.184-2.738 7.683-3.791.737 1.95 1.258 4.053 1.503 5.334-2.827 1.023-5.918.73-9.186-1.543zm10.638 1.353c-.234-1.206-.723-3.175-1.41-5.011 2.197-.837 4.19-.78 4.295-.776-.176 2.456-1.255 4.606-2.885 5.787zm3.171-7.424c-.139-.004-2.327-.058-4.745.836-.341-.884-.717-1.748-1.127-2.585 2.192-.806 4.32-.751 5.872-1.749z"/>
                </svg>
                <span className="truncate">Dribbble</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scout Heritage Card */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200/90 p-5 sm:p-6 text-stone-700 text-xs sm:text-sm space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold">
          <WosmFleurIcon className="w-5 h-5 text-amber-800" />
          <span>Dedikasi untuk Gerakan Pramuka Indonesia</span>
        </div>
        <p className="text-stone-600 leading-relaxed">
          Aplikasi ini dirancang untuk mendampingi para pembina, pelatih, pandega,
          penegak, penggalang, dan siaga dalam memahami esensi komunikasi sandi
          di alam terbuka secara interaktif dan mudah dipelajari.
        </p>
        <div className="flex items-center gap-1.5 text-stone-500 font-medium text-xs pt-1">
          <span>Made with</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
          <span>in Cimahi, Jawa Barat · Hak Cipta Terpelihara</span>
        </div>
      </div>

      {/* Return to Home CTA */}
      <button
        type="button"
        onClick={onBack}
        className="w-full py-3 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
      >
        Kembali ke Modul Sandi
      </button>
    </div>
  );
};
