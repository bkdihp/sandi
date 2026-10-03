import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { SandiAppLogo } from './ScoutIcons';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'header' | 'hero' | 'bar';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'header',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed, hide the button
  if (isInstalled) {
    return null;
  }

  // Android / Chromium / Desktop PWA flow
  if (isInstallable) {
    if (variant === 'hero') {
      return (
        <button
          type="button"
          onClick={install}
          className={`px-5 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 active:scale-95 text-white text-xs sm:text-sm font-black shadow-lg transition-all flex items-center gap-2 cursor-pointer ${className}`}
        >
          <Download className="w-4 h-4" />
          <span>Pasang Aplikasi (PWA)</span>
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={install}
        className={`px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300/80 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95 ${className}`}
        title="Pasang aplikasi ke layar utama (PWA / TWA)"
      >
        <Smartphone className="w-3.5 h-3.5 text-amber-800" />
        <span className="hidden sm:inline">Pasang App</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported on WebKit)
  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className={`px-3 py-1.5 rounded-xl bg-amber-100/80 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer ${className}`}
          title="Pasang aplikasi di iPhone / iPad"
        >
          <Smartphone className="w-3.5 h-3.5 text-amber-800" />
          <span className="hidden sm:inline">Pasang App</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-stone-200 text-center space-y-4">
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex justify-center">
                <SandiAppLogo className="w-14 h-14" />
              </div>

              <div>
                <h3 className="text-base font-bold text-stone-900">
                  Pasang di iPhone / iPad
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Jadikan aplikasi Sandi seperti aplikasi asli di ponsel Anda:
                </p>
              </div>

              <div className="bg-stone-50 rounded-2xl p-4 text-left text-xs text-stone-700 space-y-2 border border-stone-200">
                <p className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-700 text-white font-bold text-[11px] flex items-center justify-center shrink-0">1</span>
                  <span>Ketuk tombol <strong>Bagikan (Share)</strong> pada bilah bawah Safari.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-700 text-white font-bold text-[11px] flex items-center justify-center shrink-0">2</span>
                  <span>Gulir ke bawah dan pilih <strong>Tambah ke Layar Utama (Add to Home Screen)</strong>.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-700 text-white font-bold text-[11px] flex items-center justify-center shrink-0">3</span>
                  <span>Ketuk <strong>Tambah</strong> di sudut kanan atas.</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs transition-colors shadow-xs"
              >
                Mengerti
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
