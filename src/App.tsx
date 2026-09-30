import React, { useState, useEffect } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { CipherScreen, CipherType } from './components/CipherScreen';
import { AboutScreen } from './components/AboutScreen';

type Screen = 'home' | CipherType | 'about';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  // Sync with browser history for intuitive Back button support
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
  };

  const handleBack = () => {
    if (window.history.state && window.history.state.screen) {
      window.history.back();
    } else {
      setCurrentScreen('home');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-0 sm:py-6 selection:bg-rose-100 selection:text-rose-900">
      <div className="w-full max-w-md shadow-2xl rounded-none sm:rounded-3xl overflow-hidden bg-white min-h-screen sm:min-h-[844px] flex flex-col">
        {currentScreen === 'home' && (
          <HomeScreen onNavigate={(screen) => navigateTo(screen)} />
        )}

        {(currentScreen === 'morse' ||
          currentScreen === 'rumput' ||
          currentScreen === 'kotak' ||
          currentScreen === 'semafor') && (
          <CipherScreen type={currentScreen} onBack={handleBack} />
        )}

        {currentScreen === 'about' && <AboutScreen onBack={handleBack} />}
      </div>
    </div>
  );
};

export default App;
