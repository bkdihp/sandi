import React from 'react';
import { ArrowLeft, Heart, Code2, Sparkles, ShieldCheck } from 'lucide-react';
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

      {/* 1. Main Developer Card (budhystory) */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Subtle background scout seal */}
        <div className="absolute -right-8 -top-8 opacity-5 pointer-events-none">
          <TunasKelapaIcon className="w-48 h-48 text-stone-900" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {/* Avatar with Scout & Code Badge */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-amber-700 via-amber-800 to-stone-900 flex items-center justify-center text-white shadow-md border-4 border-amber-600/20 ring-4 ring-stone-100">
              <span className="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono text-amber-200">
                bh
              </span>
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-md border-2 border-white"
              title="Pengembang"
            >
              <Code2 className="w-4 h-4 text-emerald-100" />
            </div>
          </div>

          {/* Bio Details */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                budhystory
              </h1>
              <span className="text-xs font-semibold text-amber-900 bg-amber-100/80 border border-amber-300/60 px-2.5 py-0.5 rounded-full inline-block self-center sm:self-auto">
                Pengembang & Arsitek Aplikasi
              </span>
            </div>

            <p className="text-xs text-stone-500 mt-1 flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Banyumas, Jawa Tengah · Platform Pembelajaran Kriptografi & Sandi Pramuka</span>
            </p>

            <p className="text-sm text-stone-600 mt-3 leading-relaxed">
              Mengembangkan platform sandi pramuka modern dengan integrasi Web Audio API synthesizer
              peluit morse langsung, tata visual autentik Sandi Rumput, Sandi Kotak, dan Sandi Semafor,
              serta ensiklopedia buku saku digital interaktif untuk para anggota Gerakan Pramuka.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Scout Heritage Card */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200/90 p-5 sm:p-6 text-stone-700 text-xs sm:text-sm space-y-3">
        <div className="flex items-center gap-2 text-stone-900 font-bold">
          <WosmFleurIcon className="w-5 h-5 text-amber-800" />
          <span>Dedikasi untuk Gerakan Pramuka Indonesia</span>
        </div>
        <p className="text-stone-600 leading-relaxed text-xs">
          Aplikasi ini didedikasikan secara terbuka untuk mendampingi para pembina, pelatih, pandega,
          penegak, penggalang, dan siaga dalam mempelajari teknik kriptografi dan komunikasi telegrafi
          lapangan di alam terbuka.
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2 text-stone-500 font-medium text-xs pt-2 border-t border-stone-200/70">
          <div className="flex items-center gap-1.5">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
            <span>di Banyumas, Jawa Tengah · oleh budhystory</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-stone-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Hak Cipta Terpelihara</span>
          </div>
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
