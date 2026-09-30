import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (screen: 'morse' | 'rumput' | 'kotak' | 'semafor' | 'about') => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white shadow-xl flex flex-col justify-between">
      <div className="px-9 pt-8 pb-6">
        {/* App Title */}
        <div className="flex items-center gap-3">
          <img src="/assets/logo_fix.png" alt="kode.in logo" className="w-8 h-8 object-contain" />
          <h1 className="text-2xl font-bold text-black tracking-tight font-['Poppins']">
            kode.in
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-base text-[#6E6E6E] mt-3 font-normal leading-relaxed">
          aplikasi untuk membuat sandi pramuka menjadi lebih mudah.
        </p>

        {/* Menu Cards */}
        <div className="mt-6 space-y-5">
          {/* Menu 1: Sandi Morse */}
          <button
            type="button"
            onClick={() => onNavigate('morse')}
            className="w-full h-[93px] rounded-2xl flex items-center px-6 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-left overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #F8416D, #9052E1)',
            }}
          >
            <div className="w-1/2 flex items-center justify-center pr-3">
              <img
                src="/assets/m1.png"
                alt="Morse"
                className="max-h-3 w-auto object-contain filter brightness-100 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <div className="w-1/2 flex items-center justify-between">
              <span className="text-lg font-bold text-white capitalize">
                sandi morse
              </span>
              <ChevronRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Menu 2: Sandi Rumput */}
          <button
            type="button"
            onClick={() => onNavigate('rumput')}
            className="w-full h-[93px] rounded-2xl flex items-center px-6 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-left overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #FDA430, #FB6A13)',
            }}
          >
            <div className="w-1/2 flex items-center justify-center pr-3">
              <img
                src="/assets/m2.png"
                alt="Rumput"
                className="max-h-9 w-auto object-contain filter brightness-100 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <div className="w-1/2 flex items-center justify-between">
              <span className="text-lg font-bold text-white capitalize">
                sandi rumput
              </span>
              <ChevronRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Menu 3: Sandi Kotak */}
          <button
            type="button"
            onClick={() => onNavigate('kotak')}
            className="w-full h-[93px] rounded-2xl flex items-center px-6 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-left overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #E436D7, #3C6BF4)',
            }}
          >
            <div className="w-1/2 flex items-center justify-center pr-3">
              <img
                src="/assets/m3.png"
                alt="Kotak"
                className="max-h-10 w-auto object-contain filter brightness-100 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <div className="w-1/2 flex items-center justify-between">
              <span className="text-lg font-bold text-white capitalize">
                sandi kotak
              </span>
              <ChevronRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Menu 4: Sandi Semafor */}
          <button
            type="button"
            onClick={() => onNavigate('semafor')}
            className="w-full h-[93px] rounded-2xl flex items-center px-6 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-left overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #F69E3F, #FD7964)',
            }}
          >
            <div className="w-1/2 flex items-center justify-center pr-3">
              <img
                src="/assets/m4.png"
                alt="Semafor"
                className="max-h-14 w-auto object-contain filter brightness-100 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <div className="w-1/2 flex items-center justify-between">
              <span className="text-lg font-bold text-white capitalize">
                sandi semafor
              </span>
              <ChevronRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Menu 5: Credit */}
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="w-full h-[93px] rounded-2xl flex items-center justify-center px-6 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-center overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #1DDBAD, #2E67DA)',
            }}
          >
            <span className="text-lg font-bold text-white uppercase tracking-wider">
              credit
            </span>
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-9 py-4 text-center text-xs text-gray-400">
        Kode.in &bull; Media Pembelajaran Sandi Pramuka
      </div>
    </div>
  );
};
