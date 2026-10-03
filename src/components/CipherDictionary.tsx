import React, { useState } from 'react';
import { Search, X, Volume2, Copy, Check, ArrowRight } from 'lucide-react';
import { SCOUT_ALPHABET_DATA, CipherItem, MorsePlayer } from '../utils/ciphers';
import {
  PeluitMorseIcon,
  SandiRumputIcon,
  SandiKotakIcon,
  BenderaSemaforIcon,
  BukuSakuIcon,
} from './ScoutIcons';

interface CipherDictionaryProps {
  onSelectLetter?: (char: string) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const CipherDictionary: React.FC<CipherDictionaryProps> = ({
  onSelectLetter,
  onClose,
  isModal = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeItem, setActiveItem] = useState<CipherItem>(SCOUT_ALPHABET_DATA[0]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const filteredItems = SCOUT_ALPHABET_DATA.filter(
    (item) =>
      item.char.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.morse.includes(searchTerm) ||
      item.kotakDesc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  const handlePlayMorse = (morse: string) => {
    const player = new MorsePlayer();
    player.play(morse, { wpm: 12, frequency: 650 });
  };

  return (
    <div className={`flex flex-col h-full bg-white ${isModal ? 'max-h-[85vh]' : ''}`}>
      {/* Dictionary Header */}
      <div className="p-4 sm:p-5 border-b border-stone-200/80 flex items-center justify-between bg-stone-50/50">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center border border-amber-200/60 shadow-xs">
            <BukuSakuIcon className="w-5 h-5 text-amber-800" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-stone-900 tracking-tight">
              Buku Saku Sandi Pramuka
            </h2>
            <p className="text-xs text-stone-500 font-normal">
              Tabel referensi komprehensif alfabet & simbol sandi
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 flex items-center justify-center transition-colors"
            title="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Search Input Bar */}
      <div className="px-4 sm:px-5 py-3 border-b border-stone-100 bg-white">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari huruf atau kode morse (contoh: S, SOS, .-)..."
            className="w-full pl-9 pr-8 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Split Body: Alphabet Grid & Detail Inspector */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Letter Selector Grid */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Pilih Karakter ({filteredItems.length})
            </span>
            <span className="text-xs text-stone-400">Klik untuk melihat detail 4 sandi</span>
          </div>

          <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
            {filteredItems.map((item) => {
              const isSelected = activeItem.char === item.char;
              return (
                <button
                  key={item.char}
                  type="button"
                  onClick={() => {
                    setActiveItem(item);
                    if (onSelectLetter) onSelectLetter(item.char);
                  }}
                  className={`relative p-2 rounded-xl text-center border transition-all flex flex-col items-center justify-center min-h-[56px] group ${
                    isSelected
                      ? 'bg-amber-50 border-amber-600/60 ring-2 ring-amber-500/20 shadow-xs text-amber-900'
                      : 'bg-white hover:bg-stone-50 border-stone-200/90 text-stone-800 hover:border-stone-300'
                  }`}
                >
                  <span className="text-base font-bold font-mono tracking-tight leading-none">
                    {item.char}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 group-hover:text-stone-600 mt-1 truncate max-w-full">
                    {item.morse}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Multi-Cipher Inspector for Selected Letter */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/90 flex-1 flex flex-col justify-between shadow-xs">
            <div>
              {/* Selected Letter Top Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-700 text-white font-bold text-2xl flex items-center justify-center shadow-xs">
                    {activeItem.char}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-stone-900">
                      Karakter Huruf {activeItem.char}
                    </h3>
                    <p className="text-xs text-stone-500">
                      Representasi empat sandi utama
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handlePlayMorse(activeItem.morse)}
                  className="px-2.5 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200/80 text-amber-900 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-amber-300/50"
                  title="Dengarkan Nada Morse"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengar</span>
                </button>
              </div>

              {/* 4 Cipher Cards Grid */}
              <div className="mt-4 space-y-3">
                {/* 1. Sandi Morse */}
                <div className="p-3 bg-white rounded-xl border border-stone-200/70 hover:border-amber-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PeluitMorseIcon className="w-4 h-4 text-amber-700" />
                      <span className="text-xs font-bold text-stone-800">Sandi Morse</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(activeItem.morse, 'morse')}
                      className="text-stone-400 hover:text-stone-700 p-1 rounded"
                    >
                      {copiedCode === 'morse' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                  <div className="mt-1.5 font-mono font-bold text-lg text-amber-900 tracking-widest bg-amber-50/50 px-2.5 py-1 rounded-lg inline-block border border-amber-100">
                    {activeItem.morse}
                  </div>
                </div>

                {/* 2. Sandi Rumput */}
                <div className="p-3 bg-white rounded-xl border border-stone-200/70 hover:border-emerald-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <SandiRumputIcon className="w-4 h-4 text-emerald-700" />
                      <span className="text-xs font-bold text-stone-800">Sandi Rumput</span>
                    </div>
                    <span className="text-[11px] text-stone-400">{activeItem.rumputDesc}</span>
                  </div>
                  <div className="mt-1.5 px-3 py-1 bg-emerald-50/40 rounded-lg border border-emerald-100 flex items-center justify-between">
                    <span className="font-sandi-rumput text-3xl text-emerald-900 leading-none">
                      {activeItem.char.toLowerCase()}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">
                      {activeItem.morse.replace(/\./g, 'v').replace(/-/g, 'V')}
                    </span>
                  </div>
                </div>

                {/* 3. Sandi Kotak */}
                <div className="p-3 bg-white rounded-xl border border-stone-200/70 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <SandiKotakIcon className="w-4 h-4 text-slate-700" />
                      <span className="text-xs font-bold text-stone-800">Sandi Kotak (Pigpen)</span>
                    </div>
                    <span className="text-[11px] text-stone-400 truncate max-w-[140px]">
                      {activeItem.kotakDesc}
                    </span>
                  </div>
                  <div className="mt-1.5 px-3 py-1 bg-slate-50/80 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="font-sandi-kotak text-3xl text-slate-800 leading-none">
                      {activeItem.char.toLowerCase()}
                    </span>
                    <span className="text-[11px] text-stone-500 font-sans">
                      {activeItem.kotakDesc}
                    </span>
                  </div>
                </div>

                {/* 4. Sandi Semafor */}
                <div className="p-3 bg-white rounded-xl border border-stone-200/70 hover:border-rose-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BenderaSemaforIcon className="w-4 h-4 text-rose-600" />
                      <span className="text-xs font-bold text-stone-800">Sandi Semafor</span>
                    </div>
                    <span className="text-[11px] text-stone-400">{activeItem.semaforDesc}</span>
                  </div>
                  <div className="mt-1.5 px-3 py-1 bg-rose-50/30 rounded-lg border border-rose-100 flex items-center justify-between">
                    <span className="font-sandi-semafor text-4xl text-stone-800 leading-none">
                      {activeItem.char.toLowerCase()}
                    </span>
                    <span className="text-[11px] text-stone-500 font-sans text-right max-w-[200px]">
                      {activeItem.semaforDesc}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Footer */}
            {onSelectLetter && (
              <div className="mt-4 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => onSelectLetter(activeItem.char)}
                  className="w-full py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Masukkan Huruf &quot;{activeItem.char}&quot; ke Translator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
