import React, { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { CipherWorkbench, CipherType } from './components/CipherWorkbench';
import { AboutScreen } from './components/AboutScreen';
import { CipherDictionary } from './components/CipherDictionary';
import {
  SandiAppLogo,
  TunasKelapaIcon,
  PeluitMorseIcon,
  SandiRumputIcon,
  SandiKotakIcon,
  BenderaSemaforIcon,
  BukuSakuIcon,
} from './components/ScoutIcons';
import { Info } from 'lucide-react';

type Screen = 'home' | CipherType | 'about';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false);

  // Sync with browser history for back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.screen) {
        setCurrentScreen(event.state.screen);
      } else {
        setCurrentScreen('home');
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

  const handleOpenDictionary = () => {
    setIsDictionaryOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 flex flex-col font-['Poppins'] selection:bg-amber-100 selection:text-amber-900 pb-20 md:pb-6">
      {/* 1. Universal Top Navigation Bar (Strict 3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark with Scout Sandi custom logo */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 text-stone-900 hover:opacity-85 transition-opacity group"
          >
            <SandiAppLogo className="w-9 h-9" />
            <span className="text-xl font-bold tracking-tight text-stone-900">
              Sandi
            </span>
          </button>

          {/* Zone 2: Clean 4–6 text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-stone-600">
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className={`hover:text-amber-800 transition-colors whitespace-nowrap ${
                currentScreen === 'home' ? 'text-amber-800 font-bold border-b-2 border-amber-800 py-1' : ''
              }`}
            >
              Beranda
            </button>
            <button
              type="button"
              onClick={() => navigateTo('morse')}
              className={`flex items-center gap-1.5 hover:text-amber-800 transition-colors whitespace-nowrap ${
                currentScreen === 'morse' ? 'text-amber-800 font-bold border-b-2 border-amber-800 py-1' : ''
              }`}
            >
              <PeluitMorseIcon className="w-3.5 h-3.5" />
              <span>Sandi Morse</span>
            </button>
            <button
              type="button"
              onClick={() => navigateTo('rumput')}
              className={`flex items-center gap-1.5 hover:text-emerald-800 transition-colors whitespace-nowrap ${
                currentScreen === 'rumput' ? 'text-emerald-800 font-bold border-b-2 border-emerald-800 py-1' : ''
              }`}
            >
              <SandiRumputIcon className="w-3.5 h-3.5" />
              <span>Sandi Rumput</span>
            </button>
            <button
              type="button"
              onClick={() => navigateTo('kotak')}
              className={`flex items-center gap-1.5 hover:text-slate-800 transition-colors whitespace-nowrap ${
                currentScreen === 'kotak' ? 'text-slate-900 font-bold border-b-2 border-slate-900 py-1' : ''
              }`}
            >
              <SandiKotakIcon className="w-3.5 h-3.5" />
              <span>Sandi Kotak</span>
            </button>
            <button
              type="button"
              onClick={() => navigateTo('semafor')}
              className={`flex items-center gap-1.5 hover:text-red-800 transition-colors whitespace-nowrap ${
                currentScreen === 'semafor' ? 'text-red-800 font-bold border-b-2 border-red-800 py-1' : ''
              }`}
            >
              <BenderaSemaforIcon className="w-3.5 h-3.5" />
              <span>Sandi Semafor</span>
            </button>
          </nav>

          {/* Zone 3: 1–2 primary action buttons */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleOpenDictionary}
              className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold border border-amber-200/80 transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <BukuSakuIcon className="w-4 h-4 text-amber-800" />
              <span className="hidden sm:inline">Kamus Sandi</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('about')}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
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
                setIsDictionaryOpen(true);
              } else {
                navigateTo(screen);
              }
            }}
          />
        )}

        {(currentScreen === 'morse' ||
          currentScreen === 'rumput' ||
          currentScreen === 'kotak' ||
          currentScreen === 'semafor') && (
          <CipherWorkbench
            type={currentScreen}
            onOpenDictionary={handleOpenDictionary}
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
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] rounded-lg transition-colors ${
            currentScreen === 'home' ? 'text-amber-800 font-bold' : 'text-stone-400'
          }`}
        >
          <TunasKelapaIcon className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Beranda</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('morse')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] rounded-lg transition-colors ${
            currentScreen === 'morse' ? 'text-amber-800 font-bold' : 'text-stone-400'
          }`}
        >
          <PeluitMorseIcon className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Morse</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('rumput')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] rounded-lg transition-colors ${
            currentScreen === 'rumput' ? 'text-emerald-800 font-bold' : 'text-stone-400'
          }`}
        >
          <SandiRumputIcon className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Rumput</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('kotak')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] rounded-lg transition-colors ${
            currentScreen === 'kotak' ? 'text-slate-900 font-bold' : 'text-stone-400'
          }`}
        >
          <SandiKotakIcon className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Kotak</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('semafor')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] rounded-lg transition-colors ${
            currentScreen === 'semafor' ? 'text-red-700 font-bold' : 'text-stone-400'
          }`}
        >
          <BenderaSemaforIcon className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Semafor</span>
        </button>

        <button
          type="button"
          onClick={handleOpenDictionary}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[44px] rounded-lg text-amber-900 font-semibold"
        >
          <BukuSakuIcon className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Kamus</span>
        </button>
      </nav>

      {/* 4. Slide-Out Modal: Kamus Sandi Interaktif */}
      {isDictionaryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200">
            <CipherDictionary
              isModal
              onClose={() => setIsDictionaryOpen(false)}
              onSelectLetter={() => {
                setIsDictionaryOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
