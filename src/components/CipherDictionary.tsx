import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Volume2, VolumeX, Copy, Check, ArrowRight } from 'lucide-react';
import { SCOUT_ALPHABET_DATA, CipherItem, MorsePlayer } from '../utils/ciphers';
import {
  PeluitMorseIcon,
  SandiRumputIcon,
  SandiKotakIcon,
  BenderaSemaforIcon,
  BukuSakuIcon,
} from './ScoutIcons';
import { SemaphoreFigure } from './SemaphoreFigure';

export type SupportedCipher = 'morse' | 'rumput' | 'kotak' | 'semafor';

interface CipherDictionaryProps {
  onSelectLetter?: (char: string) => void;
  onUseInTranslator?: (char: string, cipher: SupportedCipher) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export const CipherDictionary: React.FC<CipherDictionaryProps> = ({
  onSelectLetter,
  onUseInTranslator,
  onClose,
  isModal = false,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'semua' | 'huruf' | 'angka' | 'tanda-baca'>('semua');
  const [activeItem, setActiveItem] = useState<CipherItem>(SCOUT_ALPHABET_DATA[0]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isPlayingMorse, setIsPlayingMorse] = useState(false);
  const [targetCipher, setTargetCipher] = useState<SupportedCipher>('morse');

  const playerRef = useRef<MorsePlayer | null>(null);

  useEffect(() => {
    playerRef.current = new MorsePlayer();
    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
      }
    };
  }, []);

  const filteredItems = SCOUT_ALPHABET_DATA.filter((item) => {
    const matchSearch =
      item.char.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.morse.includes(searchTerm) ||
      item.kotakDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.rumputDesc.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchSearch) return false;
    if (activeCategory === 'semua') return true;
    return item.category === activeCategory;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 1800);
  };

  const handleTogglePlayMorse = (morse: string) => {
    if (!playerRef.current) return;

    if (isPlayingMorse) {
      playerRef.current.stop();
      setIsPlayingMorse(false);
    } else {
      setIsPlayingMorse(true);
      playerRef.current.play(
        morse,
        { wpm: 6, soundType: 'peluit-pramuka' },
        () => {
          setIsPlayingMorse(false);
        }
      );
    }
  };

  const handleApplyToTranslator = (cipher: SupportedCipher = targetCipher) => {
    if (playerRef.current) {
      playerRef.current.stop();
    }
    if (onUseInTranslator) {
      onUseInTranslator(activeItem.char, cipher);
    } else if (onSelectLetter) {
      onSelectLetter(activeItem.char);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`flex flex-col bg-white rounded-3xl ${isModal ? 'max-h-[88vh]' : 'min-h-[640px] shadow-sm border border-stone-200'}`}>
      {/* Dictionary Header */}
      <div className="p-4 sm:p-5 border-b border-stone-200/80 flex items-center justify-between bg-stone-50/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100/90 text-amber-800 flex items-center justify-center border border-amber-200/80 shadow-2xs">
            <BukuSakuIcon className="w-6 h-6 text-amber-800" />
          </div>
          <div>
            <h2 className="text-base font-bold text-stone-900 tracking-tight">
              Buku Saku Sandi
            </h2>
            <p className="text-xs text-stone-500 font-normal">
              Referensi karakter alfabet, angka, dan tanda baca
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={() => {
              if (playerRef.current) playerRef.current.stop();
              onClose();
            }}
            className="w-9 h-9 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-200/70 flex items-center justify-center transition-colors cursor-pointer"
            title="Tutup Kamus"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Search Input Bar & Category Tabs */}
      <div className="px-4 sm:px-5 py-3 border-b border-stone-100 bg-white space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari huruf, angka, atau pola morse (contoh: S, 7, ... --- ...)..."
            className="w-full pl-10 pr-9 py-2.5 text-sm bg-stone-50/90 border border-stone-200 rounded-xl text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 transition-all font-medium"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 p-0.5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills with Child-Friendly Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
          <button
            type="button"
            onClick={() => setActiveCategory('semua')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'semua'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            Semua ({SCOUT_ALPHABET_DATA.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('huruf')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'huruf'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            🔤 Huruf (26)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('angka')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'angka'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            🔢 Angka (10)
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('tanda-baca')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'tanda-baca'
                ? 'bg-amber-800 text-white shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            🔣 Tanda Baca (6)
          </button>
        </div>
      </div>

      {/* Main Split Body: Alphabet Grid & Detail Inspector */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Letter Selector Grid */}
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Pilih Simbol ({filteredItems.length})
            </span>
            <span className="text-xs text-stone-400">Ketuk untuk bedah 4 sandi</span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {filteredItems.map((item) => {
              const isSelected = activeItem.char === item.char;
              return (
                <button
                  key={item.char}
                  type="button"
                  onClick={() => {
                    if (playerRef.current) playerRef.current.stop();
                    setIsPlayingMorse(false);
                    setActiveItem(item);
                  }}
                  className={`relative p-2.5 rounded-2xl text-center border transition-all flex flex-col items-center justify-center min-h-[60px] cursor-pointer group active:scale-95 ${
                    isSelected
                      ? 'bg-amber-50 border-amber-600 ring-2 ring-amber-500/25 shadow-xs text-amber-950 font-black'
                      : 'bg-white hover:bg-stone-50 border-stone-200/90 text-stone-800 hover:border-stone-300'
                  }`}
                >
                  <span className="text-lg font-black font-mono tracking-tight leading-none">
                    {item.char}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 group-hover:text-amber-800 mt-1 truncate max-w-full font-bold">
                    {item.morse}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Multi-Cipher Inspector for Selected Letter */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-50/90 border border-stone-200/90 flex-1 flex flex-col justify-between shadow-xs">
            <div>
              {/* Selected Letter Top Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-13 h-13 rounded-2xl bg-amber-800 text-white font-black text-3xl flex items-center justify-center shadow-xs">
                    {activeItem.char}
                  </div>
                  <div>
                    <h3 className="text-base font-black text-stone-900">
                      Karakter &quot;{activeItem.char}&quot;
                    </h3>
                    <p className="text-xs text-stone-500">
                      {activeItem.category === 'huruf'
                        ? 'Alfabet Pramuka'
                        : activeItem.category === 'angka'
                        ? 'Angka Numerik Sandi'
                        : 'Tanda Baca Resmi'}
                    </p>
                  </div>
                </div>

              </div>

              {/* 4 Cipher Cards Grid */}
              <div className="mt-3.5 space-y-2.5">
                {/* 1. Sandi Morse (Audio only in Morse module) */}
                <div className="p-3 bg-white rounded-xl border border-stone-200/80 hover:border-amber-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PeluitMorseIcon className="w-4 h-4 text-amber-800" />
                      <span className="text-xs font-bold text-stone-800">Sandi Morse</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleTogglePlayMorse(activeItem.morse)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          isPlayingMorse
                            ? 'bg-rose-600 text-white animate-pulse shadow-xs'
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300/60 shadow-2xs'
                        }`}
                        title="Dengar Bunyi Morse"
                      >
                        {isPlayingMorse ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>Henti</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-amber-800" />
                            <span>Bunyi</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(activeItem.morse, 'morse')}
                        className="text-stone-400 hover:text-stone-700 p-1 rounded cursor-pointer"
                        title="Salin Morse"
                      >
                        {copiedCode === 'morse' ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="mt-1 font-mono font-black text-xl text-amber-950 tracking-widest bg-amber-50/70 px-3 py-1 rounded-lg inline-block border border-amber-100">
                    {activeItem.morse}
                  </div>
                </div>

                {/* 2. Sandi Rumput */}
                <div className="p-3 bg-white rounded-xl border border-stone-200/80 hover:border-emerald-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <SandiRumputIcon className="w-4 h-4 text-emerald-700" />
                      <span className="text-xs font-bold text-stone-800">Sandi Rumput</span>
                    </div>
                    <span className="text-[11px] text-stone-400 font-medium">{activeItem.rumputDesc}</span>
                  </div>
                  <div className="mt-1 px-3 py-1 bg-emerald-50/50 rounded-lg border border-emerald-100 flex items-center justify-between">
                    <span className="font-sandi-rumput text-3xl text-emerald-900 leading-none">
                      {activeItem.char.toLowerCase()}
                    </span>
                    <span className="text-xs text-stone-500 font-mono">
                      {activeItem.morse.replace(/\./g, 'v').replace(/-/g, 'V')}
                    </span>
                  </div>
                </div>

                {/* 3. Sandi Kotak */}
                <div className="p-3 bg-white rounded-xl border border-stone-200/80 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <SandiKotakIcon className="w-4 h-4 text-slate-700" />
                      <span className="text-xs font-bold text-stone-800">Sandi Kotak</span>
                    </div>
                    <span className="text-[11px] text-stone-400 truncate max-w-[150px]">
                      {activeItem.kotakDesc}
                    </span>
                  </div>
                  <div className="mt-1 px-3 py-1 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                    <span className="font-sandi-kotak text-3xl text-slate-900 leading-none">
                      {activeItem.char.toLowerCase()}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {activeItem.kotakDesc}
                    </span>
                  </div>
                </div>

                {/* 4. Sandi Semafor */}
                <div className="p-3 bg-white rounded-xl border border-stone-200/80 hover:border-rose-300 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BenderaSemaforIcon className="w-4 h-4 text-rose-600" />
                      <span className="text-xs font-bold text-stone-800">Sandi Semafor</span>
                    </div>
                    <span className="text-[11px] text-stone-400 font-medium">{activeItem.semaforDesc}</span>
                  </div>
                  <div className="mt-1 px-3 py-1.5 bg-rose-50/40 rounded-lg border border-rose-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <SemaphoreFigure char={activeItem.char} size={60} showLabel={false} />
                      <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-white text-stone-800 border border-stone-200">
                        {activeItem.char}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 font-sans text-right max-w-[190px]">
                      {activeItem.semaforDesc}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Seamless Action Footer: Buka di Translator */}
            <div className="mt-4 pt-3.5 border-t border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>Tujuan:</span>
                <div className="flex items-center gap-1">
                  {(['morse', 'rumput', 'kotak', 'semafor'] as SupportedCipher[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setTargetCipher(c)}
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold capitalize transition-colors cursor-pointer ${
                        targetCipher === c
                          ? 'bg-amber-800 text-white'
                          : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleApplyToTranslator(targetCipher)}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer active:scale-98"
              >
                <span>Gunakan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
