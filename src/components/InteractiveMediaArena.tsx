import React, { useState } from 'react';
import {
  Map,
  Zap,
  Users,
  Compass,
  Maximize2,
  Minimize2,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { ScoutQuestAdventure } from './ScoutQuestAdventure';
import { PhaserMorseGame } from './PhaserMorseGame';
import { ClassroomCipherDuel } from './ClassroomCipherDuel';
import { InteractiveSemaphoreStudio } from './InteractiveSemaphoreStudio';

interface InteractiveMediaArenaProps {
  onBack: () => void;
  defaultTab?: 'misi' | 'telegraf' | 'duel' | 'semafor';
}

export const InteractiveMediaArena: React.FC<InteractiveMediaArenaProps> = ({
  onBack,
  defaultTab = 'misi',
}) => {
  const [activeTab, setActiveTab] = useState<'misi' | 'telegraf' | 'duel' | 'semafor'>(defaultTab);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-4 lg:py-8 space-y-6">
      {/* Friendly Scout Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-stone-900/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-stone-800 shadow-xl text-white">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-3 bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 rounded-2xl border border-stone-700 transition-all flex items-center gap-2 cursor-pointer text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali ke Beranda</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                Gerakan Pramuka Indonesia
              </span>
              <span className="text-xs text-stone-500">·</span>
              <span className="text-xs text-stone-400">Pramuka Siaga & Penggalang</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Arena Game & Petualangan Sandi</span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </h2>
          </div>
        </div>

        {/* Fullscreen Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="px-4 py-2.5 rounded-2xl bg-amber-600 hover:bg-amber-500 active:scale-95 text-white text-xs sm:text-sm font-black shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            title="Tampilkan Layar Penuh"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{isFullscreen ? 'Kecilkan Layar' : 'Layar Penuh'}</span>
          </button>
        </div>
      </div>

      {/* 4 Kid-Friendly Game Mode Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Tab 1: Peta Misi Petualangan */}
        <button
          type="button"
          onClick={() => setActiveTab('misi')}
          className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
            activeTab === 'misi'
              ? 'bg-amber-950/40 border-amber-500 shadow-xl'
              : 'bg-white border-stone-200 hover:border-amber-400 shadow-xs'
          }`}
        >
          <div
            className={`p-3 rounded-xl ${
              activeTab === 'misi'
                ? 'bg-amber-500 text-stone-900'
                : 'bg-amber-50 text-amber-800'
            }`}
          >
            <Map className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span
              className={`text-[10px] sm:text-xs uppercase font-bold tracking-wider block ${
                activeTab === 'misi' ? 'text-amber-400' : 'text-stone-500'
              }`}
            >
              8 Level Berjenjang
            </span>
            <span
              className={`text-sm sm:text-base font-black ${
                activeTab === 'misi' ? 'text-white' : 'text-stone-900'
              }`}
            >
              Peta Petualangan
            </span>
          </div>
        </button>

        {/* Tab 2: Ketukan Cepat Morse */}
        <button
          type="button"
          onClick={() => setActiveTab('telegraf')}
          className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
            activeTab === 'telegraf'
              ? 'bg-amber-950/40 border-amber-500 shadow-xl'
              : 'bg-white border-stone-200 hover:border-amber-400 shadow-xs'
          }`}
        >
          <div
            className={`p-3 rounded-xl ${
              activeTab === 'telegraf'
                ? 'bg-amber-500 text-stone-900'
                : 'bg-amber-50 text-amber-800'
            }`}
          >
            <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span
              className={`text-[10px] sm:text-xs uppercase font-bold tracking-wider block ${
                activeTab === 'telegraf' ? 'text-amber-400' : 'text-stone-500'
              }`}
            >
              Uji Kecepatan Morse
            </span>
            <span
              className={`text-sm sm:text-base font-black ${
                activeTab === 'telegraf' ? 'text-white' : 'text-stone-900'
              }`}
            >
              Ketukan Telegraf
            </span>
          </div>
        </button>

        {/* Tab 3: Lomba Cepat 2 Regu */}
        <button
          type="button"
          onClick={() => setActiveTab('duel')}
          className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
            activeTab === 'duel'
              ? 'bg-blue-950/40 border-blue-500 shadow-xl'
              : 'bg-white border-stone-200 hover:border-blue-400 shadow-xs'
          }`}
        >
          <div
            className={`p-3 rounded-xl ${
              activeTab === 'duel'
                ? 'bg-blue-500 text-white'
                : 'bg-blue-50 text-blue-800'
            }`}
          >
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span
              className={`text-[10px] sm:text-xs uppercase font-bold tracking-wider block ${
                activeTab === 'duel' ? 'text-blue-400' : 'text-stone-500'
              }`}
            >
              Bermain Bersama Teman
            </span>
            <span
              className={`text-sm sm:text-base font-black ${
                activeTab === 'duel' ? 'text-white' : 'text-stone-900'
              }`}
            >
              Lomba 2 Regu
            </span>
          </div>
        </button>

        {/* Tab 4: Latihan Bendera Semafor */}
        <button
          type="button"
          onClick={() => setActiveTab('semafor')}
          className={`p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
            activeTab === 'semafor'
              ? 'bg-red-950/40 border-red-500 shadow-xl'
              : 'bg-white border-stone-200 hover:border-red-400 shadow-xs'
          }`}
        >
          <div
            className={`p-3 rounded-xl ${
              activeTab === 'semafor'
                ? 'bg-red-500 text-white'
                : 'bg-red-50 text-red-800'
            }`}
          >
            <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <span
              className={`text-[10px] sm:text-xs uppercase font-bold tracking-wider block ${
                activeTab === 'semafor' ? 'text-red-400' : 'text-stone-500'
              }`}
            >
              Isyarat Bendera
            </span>
            <span
              className={`text-sm sm:text-base font-black ${
                activeTab === 'semafor' ? 'text-white' : 'text-stone-900'
              }`}
            >
              Latihan Semafor
            </span>
          </div>
        </button>
      </div>

      {/* Active Game Stage */}
      <div className="animate-fadeIn">
        {activeTab === 'misi' && <ScoutQuestAdventure />}
        {activeTab === 'telegraf' && <PhaserMorseGame />}
        {activeTab === 'duel' && <ClassroomCipherDuel />}
        {activeTab === 'semafor' && <InteractiveSemaphoreStudio />}
      </div>
    </div>
  );
};
