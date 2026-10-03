import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  BookOpen,
  Sparkles,
  Share2,
} from 'lucide-react';
import {
  convertToMorse,
  decodeMorse,
  MorsePlayer,
} from '../utils/ciphers';
import {
  PeluitMorseIcon,
  SandiRumputIcon,
  SandiKotakIcon,
  BenderaSemaforIcon,
  TunasKelapaIcon,
} from './ScoutIcons';

export type CipherType = 'morse' | 'rumput' | 'kotak' | 'semafor';

interface CipherWorkbenchProps {
  type: CipherType;
  onOpenDictionary: () => void;
  onSelectType: (type: CipherType) => void;
}

const CIPHER_METADATA: Record<
  CipherType,
  {
    name: string;
    subtitle: string;
    kategori: string;
    icon: React.FC<{ className?: string; size?: number }>;
    themeColor: string;
    badgeBg: string;
    badgeText: string;
    hint: string;
    presets: string[];
    description: string;
  }
> = {
  morse: {
    name: 'Sandi Morse',
    subtitle: 'Sandi akustik dan visual universal Gerakan Pramuka',
    kategori: 'Akustik & Telegrafi',
    icon: PeluitMorseIcon,
    themeColor: '#78350F',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    hint: 'Ketik pesan teks (contoh: Praja Muda Karana)...',
    presets: ['Praja Muda Karana', 'Tri Satya', 'Dasa Darma', 'Pancasila', 'Salam Pramuka'],
    description:
      'Sandi Morse diciptakan oleh Samuel F.B. Morse dan Alfred Vail pada tahun 1835. Dalam kepramukaan Indonesia, sandi ini dipraktikkan menggunakan tiupan peluit, kedipan senter, kibasan bendera morse, atau tulisan titik-garis.',
  },
  rumput: {
    name: 'Sandi Rumput',
    subtitle: 'Turunan visual morse berbentuk ilalang rumput alam',
    kategori: 'Kriptografi Lapangan',
    icon: SandiRumputIcon,
    themeColor: '#15803D',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
    hint: 'Ketik teks alfabet (contoh: rbayuokt)...',
    presets: ['siaga', 'penggalang', 'penegak', 'pandega', 'berkemah'],
    description:
      'Sandi Rumput merupakan sistem kriptografi khas pramuka Indonesia yang diturunkan langsung dari Sandi Morse. Rumput pendek melambangkan titik (.), sedangkan rumput tinggi melambangkan garis (-).',
  },
  kotak: {
    name: 'Sandi Kotak',
    subtitle: 'Pigpen cipher berbasis kisi kotak pagar dan salang silang',
    kategori: 'Kriptografi Geometri',
    icon: SandiKotakIcon,
    themeColor: '#334155',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-800',
    hint: 'Ketik pesan teks untuk disandikan ke kotak...',
    presets: ['pramuka', 'regu garuda', 'patroli', 'jejak', 'sandi rahasia'],
    description:
      'Sandi Kotak (Pigpen Cipher) menggunakan petak kisi pagar (3x3) untuk huruf A–R dan petak salib (X) untuk huruf S–Z. Huruf pertama polos tanpa titik, huruf kedua ditandai dengan sebuah titik.',
  },
  semafor: {
    name: 'Sandi Semafor',
    subtitle: 'Sistem komunikasi visual 8 penjuru mata angin bendera',
    kategori: 'Sinyal Visual Optik',
    icon: BenderaSemaforIcon,
    themeColor: '#B91C1C',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-900',
    hint: 'Ketik pesan untuk konversi gerakan bendera semaphore...',
    presets: ['waspada', 'lapor', 'kirim', 'siap bergerak', 'pandu'],
    description:
      'Semaphore menggunakan sepasang bendera merah-kuning ukuran 45x45 cm pada tangkai 55 cm. Posisi lengan kedua bendera digerakkan searah jarum jam mengelilingi 8 titik penjuru mata angin tubuh pengirim.',
  },
};

export const CipherWorkbench: React.FC<CipherWorkbenchProps> = ({
  type,
  onOpenDictionary,
  onSelectType,
}) => {
  const meta = CIPHER_METADATA[type];
  const IconComponent = meta.icon;

  // State
  const [inputText, setInputText] = useState('Praja Muda Karana');
  const [direction, setDirection] = useState<'encode' | 'decode'>('encode'); // for Morse
  const [copied, setCopied] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  // Morse Player controls
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeedWpm, setAudioSpeedWpm] = useState<number>(15);
  const [audioPitchHz, setAudioPitchHz] = useState<number>(650);
  const [isPulseActive, setIsPulseActive] = useState(false);
  const playerRef = useRef<MorsePlayer | null>(null);

  useEffect(() => {
    playerRef.current = new MorsePlayer();
    playerRef.current.onPulse = (active) => {
      setIsPulseActive(active);
    };

    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
      }
    };
  }, []);

  // Compute output
  const outputResult = React.useMemo(() => {
    if (!inputText.trim()) return '';

    if (type === 'morse') {
      if (direction === 'encode') {
        return convertToMorse(inputText);
      } else {
        return decodeMorse(inputText);
      }
    }

    // Rumput, Kotak, Semafor
    return inputText.toLowerCase();
  }, [inputText, type, direction]);

  // Telemetry estimations
  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const estimatedMorseSeconds = React.useMemo(() => {
    if (type !== 'morse' || !outputResult) return 0;
    // Standard morse PARIS formula at current WPM
    const dotDurationSec = 1.2 / audioSpeedWpm;
    let totalUnits = 0;
    for (const ch of outputResult) {
      if (ch === '.') totalUnits += 2;
      else if (ch === '-') totalUnits += 4;
      else if (ch === ' ') totalUnits += 2;
    }
    return Math.max(1, Math.round(totalUnits * dotDurationSec));
  }, [type, outputResult, audioSpeedWpm]);

  // Handlers
  const handleToggleAudio = () => {
    if (!playerRef.current) return;

    if (isPlayingAudio) {
      playerRef.current.stop();
      setIsPlayingAudio(false);
    } else {
      const codeToPlay =
        direction === 'encode' ? outputResult : convertToMorse(outputResult);
      if (!codeToPlay) return;

      setIsPlayingAudio(true);
      playerRef.current.play(
        codeToPlay,
        { wpm: audioSpeedWpm, frequency: audioPitchHz },
        () => {
          setIsPlayingAudio(false);
        }
      );
    }
  };

  const handleCopy = () => {
    if (!outputResult) return;
    navigator.clipboard.writeText(outputResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareFormatted = () => {
    const formatted = `[SANDI - ${meta.name.toUpperCase()}]\nInput: ${inputText}\nHasil: ${outputResult}\nDiolah via Aplikasi Sandi Gerakan Pramuka`;
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    if (playerRef.current) {
      playerRef.current.stop();
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 lg:py-8 space-y-6">
      {/* 1. Cipher Header & Segmented Selector Bar */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-4 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center shadow-xs border border-stone-200/60"
              style={{ backgroundColor: `${meta.themeColor}12`, color: meta.themeColor }}
            >
              <IconComponent className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                  {meta.name}
                </h1>
                <span className="text-xs text-stone-500">· {meta.kategori}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5 line-clamp-1">
                {meta.subtitle}
              </p>
            </div>
          </div>

          {/* Cipher Type Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100/90 rounded-xl overflow-x-auto max-w-full">
            {(['morse', 'rumput', 'kotak', 'semafor'] as CipherType[]).map((cKey) => {
              const cMeta = CIPHER_METADATA[cKey];
              const CIcon = cMeta.icon;
              const isActive = type === cKey;
              return (
                <button
                  key={cKey}
                  type="button"
                  onClick={() => onSelectType(cKey)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-stone-900 shadow-xs border border-stone-200/70 font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-white/50'
                  }`}
                >
                  <CIcon className="w-4 h-4" />
                  <span className="capitalize">{cMeta.name.replace('Sandi ', '')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Direction Switcher (Exclusive for Morse: Encode vs Decode) */}
        {type === 'morse' && (
          <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                Mode Aliran:
              </span>
              <div className="flex items-center p-0.5 bg-stone-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => {
                    setDirection('encode');
                    setInputText('Praja Muda Karana');
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    direction === 'encode'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Teks &rarr; Sandi Morse
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDirection('decode');
                    setInputText('.-. . --. ..-   --. .- .-. ..- -.. .-');
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    direction === 'decode'
                      ? 'bg-amber-800 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  Sandi Morse &rarr; Teks
                </button>
              </div>
            </div>

            {/* Audio Settings Trigger */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowConfig(!showConfig)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 transition-colors ${
                  showConfig
                    ? 'bg-stone-800 text-white border-stone-800'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Pengaturan Audio ({audioSpeedWpm} WPM · {audioPitchHz} Hz)</span>
              </button>
            </div>
          </div>
        )}

        {/* Audio Tuning Drawer (Expandable) */}
        {type === 'morse' && showConfig && (
          <div className="mt-3 p-4 bg-stone-50 rounded-xl border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs animate-fadeIn">
            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Kecepatan Transmisi (WPM - Words Per Minute):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={6}
                  max={30}
                  step={1}
                  value={audioSpeedWpm}
                  onChange={(e) => setAudioSpeedWpm(Number(e.target.value))}
                  className="flex-1 accent-amber-700"
                />
                <span className="font-mono font-bold text-stone-900 w-16 text-right">
                  {audioSpeedWpm} WPM
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>Siaga (8 WPM)</span>
                <span>Penggalang (15 WPM)</span>
                <span>Penegak (24 WPM)</span>
              </div>
            </div>

            <div>
              <label className="font-semibold text-stone-700 block mb-1">
                Frekuensi Nada Peluit Morse (Pitch):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={400}
                  max={1000}
                  step={50}
                  value={audioPitchHz}
                  onChange={(e) => setAudioPitchHz(Number(e.target.value))}
                  className="flex-1 accent-amber-700"
                />
                <span className="font-mono font-bold text-stone-900 w-16 text-right">
                  {audioPitchHz} Hz
                </span>
              </div>
              <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                <span>Peluit Berat (550Hz)</span>
                <span>Standar (650Hz)</span>
                <span>Nyaring (800Hz)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Main Workbench Dual Stage (Input & Output) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Workbench Area */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs flex-1 flex flex-col justify-between">
            <div>
              {/* Input Header & Clear */}
              <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    {direction === 'encode' ? 'Teks Masukan' : 'Kode Morse Masukan'}
                  </span>
                  <span className="text-stone-400">·</span>
                  <span className="text-xs text-stone-400">
                    {charCount} karakter · {wordCount} kata
                  </span>
                </div>
                {inputText && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-xs text-stone-400 hover:text-stone-700 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                )}
              </div>

              {/* Text Area */}
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  direction === 'encode'
                    ? meta.hint
                    : 'Ketik atau tempel kode morse (contoh: ... --- ...)...'
                }
                rows={6}
                className="w-full mt-3 p-3.5 bg-stone-50/70 border border-stone-200/80 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/20 focus:border-amber-700 text-sm leading-relaxed transition-all resize-y min-h-[140px]"
              />

              {/* Quick Presets */}
              <div className="mt-3 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-medium text-stone-400 mr-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" /> Contoh:
                </span>
                {meta.presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setInputText(preset);
                    }}
                    className="text-xs px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Workbench Hint Footer */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <span>Konversi instan aktif secara otomatis</span>
              <button
                type="button"
                onClick={onOpenDictionary}
                className="text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Buka Kamus Sandi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Translated Result Canvas */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs flex-1 flex flex-col justify-between relative overflow-hidden">
            <div>
              {/* Output Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Hasil Terjemahan
                  </span>
                  {type === 'morse' && (
                    <>
                      <span className="text-stone-400">·</span>
                      <span className="text-xs text-stone-400">
                        Est. durasi {estimatedMorseSeconds}s
                      </span>
                    </>
                  )}
                </div>

                {/* Primary Action Buttons */}
                <div className="flex items-center gap-1.5">
                  {type === 'morse' && (
                    <button
                      type="button"
                      onClick={handleToggleAudio}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        isPlayingAudio
                          ? 'bg-amber-700 text-white animate-pulse shadow-sm'
                          : 'bg-amber-100 hover:bg-amber-200/80 text-amber-900 border border-amber-200'
                      }`}
                      title={isPlayingAudio ? 'Hentikan Bunyi' : 'Dengarkan Peluit Morse'}
                    >
                      {isPlayingAudio ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>Stop Bunyi</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Bunyikan</span>
                        </>
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-stone-200/60"
                    title="Salin Hasil ke Clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleShareFormatted}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100"
                    title="Salin Kartu Sandi Lengkap"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Sound Pulse Indicator Bar (during Morse playback) */}
              {type === 'morse' && isPlayingAudio && (
                <div className="mt-3 p-2 bg-amber-50 rounded-lg border border-amber-200/70 flex items-center justify-between text-xs text-amber-900 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-75 ${
                        isPulseActive
                          ? 'bg-amber-600 scale-125 shadow-md shadow-amber-500/50'
                          : 'bg-stone-300 scale-90'
                      }`}
                    />
                    <span className="font-medium">
                      {isPulseActive ? 'Mengirim Sinyal Nada...' : 'Jeda Interval...'}
                    </span>
                  </div>
                  <span className="font-mono text-[11px]">{audioSpeedWpm} WPM</span>
                </div>
              )}

              {/* Output Content Display Canvas */}
              <div className="mt-4 p-5 rounded-xl bg-stone-50/80 border border-stone-200/80 min-h-[170px] flex items-center justify-center overflow-x-auto">
                {outputResult ? (
                  <div className="w-full text-center">
                    {/* Sandi Morse Display */}
                    {type === 'morse' && (
                      <div className="font-mono text-2xl sm:text-3xl font-bold text-stone-900 tracking-widest break-words leading-relaxed select-all">
                        {outputResult}
                      </div>
                    )}

                    {/* Sandi Rumput Display */}
                    {type === 'rumput' && (
                      <div className="space-y-3">
                        <div className="font-sandi-rumput text-5xl sm:text-6xl text-emerald-900 break-words leading-normal select-all tracking-normal">
                          {outputResult}
                        </div>
                        <p className="text-xs text-stone-400 font-mono">
                          Font Sandi Rumput Pramuka Autentik
                        </p>
                      </div>
                    )}

                    {/* Sandi Kotak Display */}
                    {type === 'kotak' && (
                      <div className="space-y-3">
                        <div className="font-sandi-kotak text-5xl sm:text-6xl text-slate-800 break-words leading-normal select-all tracking-[0.25em]">
                          {outputResult}
                        </div>
                        <p className="text-xs text-stone-400 font-sans">
                          Font Sandi Kotak (Pigpen Cipher)
                        </p>
                      </div>
                    )}

                    {/* Sandi Semafor Display */}
                    {type === 'semafor' && (
                      <div className="space-y-3">
                        <div className="font-sandi-semafor text-6xl sm:text-7xl text-stone-900 break-words leading-normal select-all tracking-[0.35em]">
                          {outputResult}
                        </div>
                        <p className="text-xs text-stone-400 font-sans">
                          Font Posisi Bendera Semafor
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-stone-400 text-xs py-8">
                    Masukkan teks pada kotak sebelah kiri untuk melihat hasil sandi.
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Insight Footer */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <TunasKelapaIcon className="w-3.5 h-3.5 text-amber-800" />
                <span>Standar Kepramukaan Kwarnas Gerakan Pramuka</span>
              </span>
              <span>v2.0 Enterprise</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Educational Information Accordion / Card */}
      <div className="bg-stone-50/90 rounded-2xl border border-stone-200/80 p-5 sm:p-6 text-stone-700 text-xs sm:text-sm leading-relaxed">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-stone-900 font-bold text-sm sm:text-base">
            <IconComponent className="w-4 h-4 text-amber-800" />
            <span>Mengenal {meta.name}</span>
          </div>
          <span className="text-xs text-amber-800 font-semibold bg-amber-100/70 px-2.5 py-0.5 rounded-full">
            Panduan SKU & SKK
          </span>
        </div>
        <p className="text-stone-600 mt-1">{meta.description}</p>
      </div>
    </div>
  );
};
