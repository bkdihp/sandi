import React, { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { CipherWorkbench, CipherType } from './components/CipherWorkbench';
import { AboutScreen } from './components/AboutScreen';
import { CipherDictionary, SupportedCipher } from './components/CipherDictionary';
import {
  SandiAppLogo,
  TunasKelapaIcon,
  PeluitMorseIcon,
  SandiRumputIcon,
  SandiKotakIcon,
  BenderaSemaforIcon,
  BukuSakuIcon,
} from './components/ScoutIcons';
import { Info, Gamepad2, Maximize2, Share2, QrCode } from 'lucide-react';
import { InteractiveMediaArena } from './components/InteractiveMediaArena';
import { PWAInstallButton } from './components/PWAInstallButton';
import { SocialShareModal } from './components/SocialShareModal';

export type Screen = 'home' | CipherType | 'about' | 'game' | 'dictionary';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [workbenchInitialText, setWorkbenchInitialText] = useState<string | undefined>(undefined);

  // Sync with browser history for back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.screen) {
        setCurrentScreen(event.state.screen);
      } else {
        const hash = window.location.hash.replace('#', '') as Screen;
        if (['home', 'morse', 'rumput', 'kotak', 'semafor', 'about', 'game', 'dictionary'].includes(hash)) {
          setCurrentScreen(hash);
        } else {
          setCurrentScreen('home');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
    window.history.pushState({ screen }, '', `#${screen}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDictionaryModal = () => {
    setIsDictionaryOpen(true);
  };

  const handleUseInTranslator = (text: string, cipher: SupportedCipher = 'morse') => {
    setWorkbenchInitialText(text);
    setIsDictionaryOpen(false);
    navigateTo(cipher as Screen);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 flex flex-col font-['Poppins'] selection:bg-amber-100 selection:text-amber-900 pb-20 md:pb-6">
      {/* 1. Universal Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Wordmark with Scout Sandi custom logo */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 text-stone-900 hover:opacity-85 transition-opacity group cursor-pointer"
          >
            <SandiAppLogo className="w-9 h-9" />
            <span className="text-xl font-bold tracking-tight text-stone-900">
              Sandi
            </span>
          </button>

          {/* Zone 2: Clean navigation links */}
          <nav className="hidden md:flex items-center gap-4 text-xs font-semibold text-stone-600">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className={`hover:text-amber-800 transition-colors whitespace-nowrap cursor-pointer ${
                currentScreen === 'home' ? 'text-amber-800 font-bold border-b-2 border-amber-800 py-1' : ''
              }`}
            >
              Beranda
            </button>
            <button
              type="button"
              onClick={() => navigateTo('game')}
              className={`flex items-center gap-1.5 transition-colors whitespace-nowrap px-3 py-1.5 rounded-xl font-black cursor-pointer ${
                currentScreen === 'game'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-900 bg-amber-100/80 hover:bg-amber-200/80 border border-amber-300/60'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Arena</span>
            </button>
            <button
              type="button"
              onClick={() => navigateTo('dictionary')}
              className={`flex items-center gap-1.5 hover:text-amber-800 transition-colors whitespace-nowrap cursor-pointer ${
                currentScreen === 'dictionary' ? 'text-amber-800 font-bold border-b-2 border-amber-800 py-1' : ''
              }`}
            >
              <BukuSakuIcon className="w-4 h-4" />
              <span>Kamus</span>
            </button>
            <button
              type="button"
              onClick={() => navigateTo('morse')}
              className={`flex items-center gap-1.5 hover:text-amber-800 transition-colors whitespace-nowrap cursor-pointer ${
                currentScreen === 'morse' ? 'text-amber-800 font-bold border-b-2 border-amber-800 py-1' : ''
              }`}
            >
              <PeluitMorseIcon className="w-3.5 h-3.5" />
              <span>Morse</span>
            </button>
            <button
              type="button"
              onClick={() => navigateTo('rumput')}
              className={`flex items-center gap-1.5 hover:text-emerald-800 transition-colors whitespace-nowrap cursor-pointer ${
                currentScreen === 'rumput' ? 'text-emerald-800 font-bold border-b-2 border-emerald-800 py-1' : ''
              }`}
            >
              <SandiRumputIcon className="w-3.5 h-3.5" />
              <span>Rumput</span>
            </button>
            <button
              type="button"
              onClick={() => navigateTo('kotak')}
              className={`flex items-center gap-1.5 hover:text-slate-800 transition-colors whitespace-nowrap cursor-pointer ${
                currentScreen === 'kotak' ? 'text-slate-900 font-bold border-b-2 border-slate-900 py-1' : ''
              }`}
            >
              <SandiKotakIcon className="w-3.5 h-3.5" />
              <span>Kotak</span>
            </button>
            <button
              type="button"
              onClick={() => navigateTo('semafor')}
              className={`flex items-center gap-1.5 hover:text-red-800 transition-colors whitespace-nowrap cursor-pointer ${
                currentScreen === 'semafor' ? 'text-red-800 font-bold border-b-2 border-red-800 py-1' : ''
              }`}
            >
              <BenderaSemaforIcon className="w-3.5 h-3.5" />
              <span>Semafor</span>
            </button>
          </nav>

          {/* Zone 3: Fullscreen, PWA Install, Social Share & About */}
          <div className="flex items-center gap-2">
            <PWAInstallButton />

            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors flex items-center cursor-pointer"
              title="QR Code URL Aktif"
            >
              <QrCode className="w-4 h-4 text-stone-700" />
            </button>

            <button
              type="button"
              onClick={() => setIsShareModalOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              title="Bagikan Aplikasi ke Media Sosial"
            >
              <Share2 className="w-3.5 h-3.5 text-amber-800" />
              <span className="hidden sm:inline">Bagikan</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {});
                } else {
                  document.exitFullscreen().catch(() => {});
                }
              }}
              className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold border border-stone-300 transition-colors hidden md:flex items-center gap-1.5 cursor-pointer"
              title="Tampilkan Layar Penuh"
            >
              <Maximize2 className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden lg:inline">Layar</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('about')}
              className={`p-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                currentScreen === 'about'
                  ? 'bg-stone-200 text-stone-900'
                  : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
              }`}
              title="Tentang Pengembang & Pramuka"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Content Canvas */}
      <main className="flex-1">
        {currentScreen === 'home' && (
          <HomeScreen
            onNavigate={(screen) => {
              if (screen === 'dictionary') {
                navigateTo('dictionary');
              } else {
                navigateTo(screen as Screen);
              }
            }}
            onOpenShare={() => setIsShareModalOpen(true)}
          />
        )}

        {currentScreen === 'game' && (
          <InteractiveMediaArena onBack={() => navigateTo('home')} />
        )}

        {currentScreen === 'dictionary' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
            <CipherDictionary
              onUseInTranslator={handleUseInTranslator}
            />
          </div>
        )}

        {(currentScreen === 'morse' ||
          currentScreen === 'rumput' ||
          currentScreen === 'kotak' ||
          currentScreen === 'semafor') && (
          <CipherWorkbench
            type={currentScreen}
            initialText={workbenchInitialText}
            onOpenDictionary={handleOpenDictionaryModal}
            onSelectType={(cType) => navigateTo(cType)}
          />
        )}

        {currentScreen === 'about' && (
          <AboutScreen onBack={() => navigateTo('home')} />
        )}
      </main>

      {/* 3. Mobile Ergonomic Bottom Navigation Bar (< 768px viewports) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg px-2 py-1.5 flex items-center justify-around">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center min-w-[46px] min-h-[44px] rounded-lg transition-colors cursor-pointer ${
            currentScreen === 'home' ? 'text-amber-800 font-bold' : 'text-stone-400'
          }`}
        >
          <TunasKelapaIcon className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Beranda</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('game')}
          className={`flex flex-col items-center justify-center min-w-[46px] min-h-[44px] rounded-lg transition-colors cursor-pointer ${
            currentScreen === 'game' ? 'text-amber-600 font-bold' : 'text-amber-700/80 font-semibold'
          }`}
        >
          <Gamepad2 className="w-5 h-5 text-amber-600" />
          <span className="text-[10px] mt-0.5">Game</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('dictionary')}
          className={`flex flex-col items-center justify-center min-w-[46px] min-h-[44px] rounded-lg transition-colors cursor-pointer ${
            currentScreen === 'dictionary' ? 'text-amber-800 font-bold' : 'text-stone-400'
          }`}
        >
          <BukuSakuIcon className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Kamus</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('morse')}
          className={`flex flex-col items-center justify-center min-w-[46px] min-h-[44px] rounded-lg transition-colors cursor-pointer ${
            currentScreen === 'morse' ? 'text-amber-800 font-bold' : 'text-stone-400'
          }`}
        >
          <PeluitMorseIcon className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Morse</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('rumput')}
          className={`flex flex-col items-center justify-center min-w-[46px] min-h-[44px] rounded-lg transition-colors cursor-pointer ${
            currentScreen === 'rumput' ? 'text-emerald-800 font-bold' : 'text-stone-400'
          }`}
        >
          <SandiRumputIcon className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Rumput</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('kotak')}
          className={`flex flex-col items-center justify-center min-w-[46px] min-h-[44px] rounded-lg transition-colors cursor-pointer ${
            currentScreen === 'kotak' ? 'text-slate-900 font-bold' : 'text-stone-400'
          }`}
        >
          <SandiKotakIcon className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Kotak</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('semafor')}
          className={`flex flex-col items-center justify-center min-w-[46px] min-h-[44px] rounded-lg transition-colors cursor-pointer ${
            currentScreen === 'semafor' ? 'text-red-700 font-bold' : 'text-stone-400'
          }`}
        >
          <BenderaSemaforIcon className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Semafor</span>
        </button>
      </nav>

      {/* 4. Slide-Out Modal: Kamus Sandi Interaktif (when summoned from workbench) */}
      {isDictionaryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
            <CipherDictionary
              isModal
              onClose={() => setIsDictionaryOpen(false)}
              onUseInTranslator={handleUseInTranslator}
            />
          </div>
        </div>
      )}

      {/* 5. Modal: Bagikan Aplikasi ke Media Sosial */}
      <SocialShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};

export default App;
