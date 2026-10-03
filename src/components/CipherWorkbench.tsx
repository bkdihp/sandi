import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  BookOpen,
  Keyboard,
  ZoomIn,
  Square,
  Delete,
  Download,
} from 'lucide-react';
import {
  convertToMorse,
  decodeMorse,
  MorsePlayer,
  WhistleSoundType,
  WHISTLE_SOUND_OPTIONS,
} from '../utils/ciphers';
import {
  PeluitMorseIcon,
  SandiRumputIcon,
  SandiKotakIcon,
  BenderaSemaforIcon,
} from './ScoutIcons';
import { SemaphoreAnimatedFigure } from './SemaphoreAnimatedFigure';
import { SemaphoreTextDisplay } from './SemaphoreTextDisplay';
import {
  copyCipherSmart,
  renderCipherToCanvas,
  downloadCanvasAsPng,
} from '../utils/cipherImageExporter';

export type CipherType = 'morse' | 'rumput' | 'kotak' | 'semafor';

interface CipherWorkbenchProps {
  type: CipherType;
  initialText?: string;
  onOpenDictionary: () => void;
  onSelectType: (type: CipherType) => void;
}

const CIPHER_METADATA: Record<
  CipherType,
  {
    name: string;
    subtitle: string;
    icon: React.FC<{ className?: string; size?: number }>;
    themeColor: string;
    hint: string;
    presets: string[];
    description: string;
  }
> = {
  morse: {
    name: 'Sandi Morse',
    subtitle: 'Sandi akustik dan visual universal Gerakan Pramuka',
    icon: PeluitMorseIcon,
    themeColor: '#78350F',
    hint: 'Ketik pesan teks (contoh: Praja Muda Karana)...',
    presets: ['Praja Muda Karana', 'Tri Satya', 'Dasa Darma', 'Pancasila', 'Salam Pramuka'],
    description:
      'Sandi Morse menggunakan kombinasi titik dan garis untuk mentransmisikan pesan. Dalam kepramukaan, sandi ini dipraktikkan melalui tiupan peluit, sinar senter, atau tulisan titik-garis.',
  },
  rumput: {
    name: 'Sandi Rumput',
    subtitle: 'Kriptografi visual berbasis pola ilalang rumput',
    icon: SandiRumputIcon,
    themeColor: '#15803D',
    hint: 'Ketik pesan teks (contoh: berkemah)...',
    presets: ['siaga', 'penggalang', 'penegak', 'pandega', 'berkemah'],
    description:
      'Sandi Rumput merupakan kriptografi khas pramuka Indonesia. Rumput pendek melambangkan titik (.), sedangkan rumput tinggi melambangkan garis (-).',
  },
  kotak: {
    name: 'Sandi Kotak',
    subtitle: 'Pigpen cipher berbasis kisi kotak dan bidang silang',
    icon: SandiKotakIcon,
    themeColor: '#334155',
    hint: 'Ketik pesan teks untuk disandikan...',
    presets: ['pramuka', 'regu garuda', 'patroli', 'jejak rahasia'],
    description:
      'Sandi Kotak (Pigpen Cipher) menggunakan kisi pagar 3x3 untuk alfabet awal dan bidang silang (X) untuk alfabet akhir dengan penanda titik.',
  },
  semafor: {
    name: 'Sandi Semafor',
    subtitle: 'Komunikasi visual menggunakan sepasang bendera',
    icon: BenderaSemaforIcon,
    themeColor: '#B91C1C',
    hint: 'Ketik pesan teks untuk gerakan bendera...',
    presets: ['waspada', 'lapor', 'kirim', 'siap bergerak', 'pandu'],
    description:
      'Semafor memanfaatkan posisi kedua lengan dengan bendera merah-kuning berukuran 45x45 cm yang digerakkan pada 8 arah putaran.',
  },
};

export const CipherWorkbench: React.FC<CipherWorkbenchProps> = ({
  type,
  initialText,
  onOpenDictionary,
  onSelectType,
}) => {
  const meta = CIPHER_METADATA[type];
  const IconComponent = meta.icon;

  // State
  const [inputText, setInputText] = useState('Praja Muda Karana');
  const [direction, setDirection] = useState<'encode' | 'decode'>('encode'); // for Morse
  const [copied, setCopied] = useState(false);
  const [showFineSpeedSlider, setShowFineSpeedSlider] = useState(false);

  // Sync initialText if provided (e.g. from Dictionary)
  useEffect(() => {
    if (initialText !== undefined && initialText !== null) {
      setInputText(initialText);
    }
  }, [initialText]);

  // Touch & Display Controls
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false);
  const [isJumboScale, setIsJumboScale] = useState(false);

  const handleVirtualKeyPress = (char: string) => {
    if (char === 'BACKSPACE') {
      setInputText((prev) => prev.slice(0, -1));
    } else if (char === 'SPACE') {
      setInputText((prev) => prev + ' ');
    } else if (char === 'CLEAR') {
      setInputText('');
    } else {
      setInputText((prev) => prev + char);
    }
  };

  // Morse Player controls (Only active for Morse module)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioSpeedWpm, setAudioSpeedWpm] = useState<number>(6);
  const [whistleSound, setWhistleSound] = useState<WhistleSoundType>('peluit-pramuka');
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

  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  // Resolve correct Morse code to play (Morse only)
  const getMorseCodeToPlay = () => {
    if (type !== 'morse') return '';
    if (direction === 'encode') {
      return outputResult;
    } else {
      if (inputText && (inputText.includes('.') || inputText.includes('-'))) {
        return inputText;
      }
      return convertToMorse(outputResult);
    }
  };

  const handleToggleAudio = () => {
    if (!playerRef.current || type !== 'morse') return;

    if (isPlayingAudio) {
      playerRef.current.stop();
      setIsPlayingAudio(false);
    } else {
      const codeToPlay = getMorseCodeToPlay();
      if (!codeToPlay || !codeToPlay.trim()) return;

      setIsPlayingAudio(true);
      playerRef.current.play(
        codeToPlay,
        { wpm: audioSpeedWpm, soundType: whistleSound },
        () => {
          setIsPlayingAudio(false);
        }
      );
    }
  };

  const handleSpeedChange = (newSpeed: number) => {
    setAudioSpeedWpm(newSpeed);
    if (isPlayingAudio && playerRef.current) {
      playerRef.current.stop();
      const codeToPlay = getMorseCodeToPlay();
      if (codeToPlay) {
        playerRef.current.play(
          codeToPlay,
          { wpm: newSpeed, soundType: whistleSound },
          () => setIsPlayingAudio(false)
        );
      }
    }
  };

  const handleWhistleSoundChange = (newSound: WhistleSoundType) => {
    setWhistleSound(newSound);
    if (isPlayingAudio && playerRef.current) {
      playerRef.current.stop();
      const codeToPlay = getMorseCodeToPlay();
      if (codeToPlay) {
        playerRef.current.play(
          codeToPlay,
          { wpm: audioSpeedWpm, soundType: newSound },
          () => setIsPlayingAudio(false)
        );
      }
    }
  };

  const handlePreviewSound = () => {
    if (!playerRef.current) return;
    playerRef.current.stop();
    setIsPlayingAudio(false);
    playerRef.current.preview(whistleSound, audioSpeedWpm);
  };

  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = async () => {
    if (!outputResult || isCopying) return;
    setIsCopying(true);
    try {
      await copyCipherSmart({
        type,
        text: inputText,
        outputResult,
      });
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsCopying(false);
      }, 2000);
    } catch {
      setIsCopying(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!outputResult) return;
    try {
      const canvas = await renderCipherToCanvas({
        type,
        text: inputText,
        outputResult,
      });
      downloadCanvasAsPng(canvas, `sandi-${type}-${Date.now()}.png`);
    } catch (err) {
      console.error('Download gambar sandi gagal:', err);
    }
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
      {/* 1. Header Toolbar */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center border border-stone-200/70 shrink-0"
              style={{ backgroundColor: `${meta.themeColor}10`, color: meta.themeColor }}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-stone-900 tracking-tight">
                {meta.name}
              </h1>
              <p className="text-xs text-stone-500 mt-0.5">
                {meta.subtitle}
              </p>
            </div>
          </div>

          {/* Cipher Type Switcher & Tools */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 p-1 bg-stone-100/90 rounded-xl">
              {(['morse', 'rumput', 'kotak', 'semafor'] as CipherType[]).map((cKey) => {
                const cMeta = CIPHER_METADATA[cKey];
                const CIcon = cMeta.icon;
                const isActive = type === cKey;
                return (
                  <button
                    key={cKey}
                    type="button"
                    onClick={() => {
                      if (playerRef.current) playerRef.current.stop();
                      setIsPlayingAudio(false);
                      onSelectType(cKey);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-stone-900 shadow-2xs border border-stone-200 font-bold'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <CIcon className="w-3.5 h-3.5" />
                    <span>{cMeta.name.replace('Sandi ', '')}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowVirtualKeyboard(!showVirtualKeyboard)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  showVirtualKeyboard
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
                title="Papan Ketik Layar"
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ketik</span>
              </button>

              <button
                type="button"
                onClick={() => setIsJumboScale(!isJumboScale)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isJumboScale
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                }`}
                title="Perbesar Ukuran Sandi"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Perbesar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Direction Switcher (Morse only) */}
        {type === 'morse' && (
          <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center gap-2">
            <span className="text-xs font-medium text-stone-500">
              Arah:
            </span>
            <div className="flex items-center p-0.5 bg-stone-100 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => {
                  setDirection('encode');
                  setInputText('Praja Muda Karana');
                }}
                className={`px-3 py-1 font-semibold rounded-md transition-all cursor-pointer ${
                  direction === 'encode'
                    ? 'bg-amber-800 text-white shadow-2xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Teks
              </button>
              <button
                type="button"
                onClick={() => {
                  setDirection('decode');
                  setInputText('.-. . --. ..-   --. .- .-. ..- -.. .-');
                }}
                className={`px-3 py-1 font-semibold rounded-md transition-all cursor-pointer ${
                  direction === 'decode'
                    ? 'bg-amber-800 text-white shadow-2xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Morse
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 2. Main Workbench Dual Stage (Input & Output) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Input Box */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs flex-1 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="font-semibold uppercase tracking-wider text-stone-700">
                    {direction === 'encode' ? 'Teks Masukan' : 'Kode Morse'}
                  </span>
                  <span>·</span>
                  <span>{charCount} karakter</span>
                  <span>·</span>
                  <span>{wordCount} kata</span>
                </div>
                {inputText && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-xs text-stone-400 hover:text-stone-700 flex items-center gap-1 transition-colors cursor-pointer"
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
                    : 'Ketik kode morse (contoh: ... --- ... / .- .-.)...'
                }
                rows={5}
                className="w-full mt-3 p-3 bg-stone-50/70 border border-stone-200/80 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-700 focus:border-amber-700 text-sm leading-relaxed transition-all resize-y min-h-[125px]"
              />

              {/* Presets */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-stone-400 mr-1">Contoh:</span>
                {meta.presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setInputText(preset)}
                    className="text-xs px-2 py-0.5 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition-colors cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              {/* Professional Elegant Virtual Keyboard */}
              {showVirtualKeyboard && (
                <div className="mt-3 p-3 bg-stone-100 rounded-2xl border border-stone-200 animate-fadeIn space-y-1.5 select-none shadow-2xs">
                  {type === 'morse' && direction === 'decode' ? (
                    /* Elegant Tactile Paddle Keyboard for Morse Decode */
                    <div className="grid grid-cols-6 gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => handleVirtualKeyPress('.')}
                        className="h-11 bg-white hover:bg-stone-50 active:translate-y-0.5 border border-stone-300/80 border-b-2 border-b-stone-400/80 rounded-xl font-mono font-bold text-2xl text-stone-900 shadow-2xs flex items-center justify-center cursor-pointer transition-all"
                        title="Titik (·)"
                      >
                        ·
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVirtualKeyPress('-')}
                        className="h-11 bg-white hover:bg-stone-50 active:translate-y-0.5 border border-stone-300/80 border-b-2 border-b-stone-400/80 rounded-xl font-mono font-bold text-2xl text-stone-900 shadow-2xs flex items-center justify-center cursor-pointer transition-all"
                        title="Garis (—)"
                      >
                        —
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVirtualKeyPress('/')}
                        className="h-11 bg-white hover:bg-stone-50 active:translate-y-0.5 border border-stone-300/80 border-b-2 border-b-stone-400/80 rounded-xl font-mono font-bold text-base text-stone-900 shadow-2xs flex items-center justify-center cursor-pointer transition-all"
                        title="Pemisah Kata (/)"
                      >
                        /
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVirtualKeyPress('SPACE')}
                        className="h-11 bg-white hover:bg-stone-50 active:translate-y-0.5 border border-stone-300/80 border-b-2 border-b-stone-400/80 rounded-xl font-mono text-sm text-stone-700 shadow-2xs flex items-center justify-center cursor-pointer transition-all"
                        title="Spasi"
                      >
                        ␣
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVirtualKeyPress('BACKSPACE')}
                        className="h-11 bg-white hover:bg-rose-50 active:translate-y-0.5 border border-stone-300/80 border-b-2 border-b-stone-400/80 rounded-xl text-stone-700 hover:text-rose-600 shadow-2xs flex items-center justify-center cursor-pointer transition-all"
                        title="Hapus"
                      >
                        <Delete className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleVirtualKeyPress('CLEAR')}
                        className="h-11 bg-stone-200 hover:bg-stone-300 active:translate-y-0.5 border border-stone-300 border-b-2 border-b-stone-400 rounded-xl text-stone-700 shadow-2xs flex items-center justify-center cursor-pointer transition-all"
                        title="Bersihkan"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    /* Refined Minimalist Tactile Hardware Keyboard */
                    <div className="space-y-1 pt-0.5">
                      {/* Numbers Row */}
                      <div className="flex justify-center gap-1">
                        {'1234567890'.split('').map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => handleVirtualKeyPress(num)}
                            className="flex-1 max-w-[42px] h-9 bg-white hover:bg-stone-50 active:translate-y-0.5 border border-stone-300/80 border-b-2 border-b-stone-400/80 rounded-lg font-mono font-semibold text-xs text-stone-800 shadow-2xs flex items-center justify-center cursor-pointer transition-all"
                          >
                            {num}
                          </button>
                        ))}
                      </div>

                      {/* QWERTY Row 1 */}
                      <div className="flex justify-center gap-1">
                        {'QWERTYUIOP'.split('').map((k) => (
                          <button
                            key={k}
                            type="button"
                            onClick={() => handleVirtualKeyPress(k)}
                            className="flex-1 max-w-[42px] h-9 bg-white hover:bg-stone-50 active:translate-y-0.5 border border-stone-300/80 border-b-2 border-b-stone-400/80 rounded-lg font-medium text-xs text-stone-800 shadow-2xs flex items-center justify-center cursor-pointer transition-all"
                          >
                            {k}
                          </button>
                        ))}
                      </div>

                      {/* QWERTY Row 2 */}
                      <div className="flex justify-center gap-1">
                        {'ASDFGHJKL'.split('').map((k) => (
                          <button
                            key={k}
                            type="button"
                            onClick={() => handleVirtualKeyPress(k)}
                            className="flex-1 max-w-[42px] h-9 bg-white hover:bg-stone-50 active:translate-y-0.5 border border-stone-300/80 border-b-2 border-b-stone-400/80 rounded-lg font-medium text-xs text-stone-800 shadow-2xs flex items-center justify-center cursor-pointer transition-all"
                          >
                            {k}
                          </button>
                        ))}
                      </div>

                      {/* QWERTY Row 3 */}
                      <div className="flex justify-center gap-1">
                        {'ZXCVBNM'.split('').map((k) => (
                          <button
                            key={k}
                            type="button"
                            onClick={() => handleVirtualKeyPress(k)}
                            className="flex-1 max-w-[42px] h-9 bg-white hover:bg-stone-50 active:translate-y-0.5 border border-stone-300/80 border-b-2 border-b-stone-400/80 rounded-lg font-medium text-xs text-stone-800 shadow-2xs flex items-center justify-center cursor-pointer transition-all"
                          >
                            {k}
                          </button>
                        ))}
                      </div>

                      {/* Punctuation Row */}
                      <div className="flex justify-center gap-1">
                        {['.', ',', '?', '!', '-', '/'].map((p) => (
                          <button
                            key={p}
                            type="button"
                            onClick={() => handleVirtualKeyPress(p)}
                            className="flex-1 max-w-[56px] h-8 bg-stone-200/70 hover:bg-stone-200 active:translate-y-0.5 border border-stone-300/80 border-b-2 border-b-stone-400/70 rounded-lg font-mono font-semibold text-xs text-stone-800 shadow-2xs flex items-center justify-center cursor-pointer transition-all"
                          >
                            {p}
                          </button>
                        ))}
                      </div>

                      {/* Space & Minimal Controls */}
                      <div className="flex justify-center gap-1.5 pt-0.5">
                        <button
                          type="button"
                          onClick={() => handleVirtualKeyPress('SPACE')}
                          className="flex-1 max-w-sm h-8 bg-stone-800 hover:bg-stone-700 active:translate-y-0.5 border border-stone-900 border-b-2 border-b-black text-white font-mono text-xs rounded-lg shadow-2xs flex items-center justify-center cursor-pointer"
                          title="Spasi"
                        >
                          ␣
                        </button>
                        <button
                          type="button"
                          onClick={() => handleVirtualKeyPress('BACKSPACE')}
                          className="px-3.5 h-8 bg-white hover:bg-rose-50 active:translate-y-0.5 border border-stone-300/80 border-b-2 border-b-stone-400/80 text-stone-700 hover:text-rose-600 text-xs rounded-lg shadow-2xs flex items-center justify-center cursor-pointer"
                          title="Hapus"
                        >
                          <Delete className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleVirtualKeyPress('CLEAR')}
                          className="px-3.5 h-8 bg-stone-200 hover:bg-stone-300 active:translate-y-0.5 border border-stone-300 border-b-2 border-b-stone-400 text-stone-700 text-xs rounded-lg shadow-2xs flex items-center justify-center cursor-pointer"
                          title="Bersihkan"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-end">
              <button
                type="button"
                onClick={onOpenDictionary}
                className="text-amber-800 hover:text-amber-950 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Kamus</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Output & Simulation */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="bg-white rounded-2xl border border-stone-200/90 p-5 shadow-xs flex-1 flex flex-col justify-between relative overflow-hidden">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 border-b border-stone-100">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                  Hasil Terjemahan
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handleDownloadImage}
                    disabled={!outputResult}
                    className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium flex items-center gap-1.5 transition-colors border border-stone-200/60 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Unduh sebagai Gambar PNG"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={!outputResult || isCopying}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors border cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                      copied
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200/60'
                    }`}
                    title={type === 'morse' ? 'Salin Kode Morse' : 'Salin Sandi sebagai Gambar PNG'}
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
                </div>
              </div>

              {/* MORSE ONLY: Single Ergonomic Audio Deck (Hidden for Rumput, Kotak, Semafor) */}
              {type === 'morse' && (
                <div className="mt-3 bg-stone-50 rounded-xl border border-stone-200 p-3 space-y-2.5 shadow-2xs">
                  {/* Play & Preview Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleToggleAudio}
                        disabled={!outputResult}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          !outputResult
                            ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                            : isPlayingAudio
                            ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                            : 'bg-amber-800 hover:bg-amber-900 text-white shadow-xs'
                        }`}
                      >
                        {isPlayingAudio ? (
                          <>
                            <Square className="w-3.5 h-3.5 fill-current shrink-0" />
                            <span>Henti</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 shrink-0" />
                            <span>Bunyi</span>
                          </>
                        )}
                      </button>

                      <span className="text-[11px] font-mono font-semibold text-stone-500 bg-stone-200/70 px-2 py-0.5 rounded">
                        {audioSpeedWpm} WPM
                      </span>

                      {isPlayingAudio && (
                        <span className="text-[11px] font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                          {isPulseActive ? 'TIUPAN' : 'JEDA'}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={handlePreviewSound}
                        className="px-2 py-1 rounded-md bg-white hover:bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200 cursor-pointer"
                        title="Dengar sampel nada"
                      >
                        Uji
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowFineSpeedSlider(!showFineSpeedSlider)}
                        className={`p-1 rounded-md border transition-colors cursor-pointer ${
                          showFineSpeedSlider
                            ? 'bg-amber-800 text-white border-amber-800'
                            : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                        }`}
                        title="Atur kecepatan teliti"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Whistle Presets */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
                    <span className="text-[11px] text-stone-500 font-medium mr-1 shrink-0">Suara:</span>
                    {WHISTLE_SOUND_OPTIONS.map((ws) => {
                      const isSelected = whistleSound === ws.id;
                      return (
                        <button
                          key={ws.id}
                          type="button"
                          onClick={() => handleWhistleSoundChange(ws.id)}
                          className={`px-2 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                            isSelected
                              ? 'bg-amber-800 text-white shadow-2xs font-bold'
                              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {ws.shortName}
                        </button>
                      );
                    })}
                  </div>

                  {/* Speed Presets */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
                    <span className="text-[11px] text-stone-500 font-medium mr-1 shrink-0">Tempo:</span>
                    {[
                      { speed: 4, label: '4 WPM' },
                      { speed: 6, label: '6 WPM' },
                      { speed: 10, label: '10 WPM' },
                      { speed: 16, label: '16 WPM' },
                    ].map((sp) => {
                      const isSelected = audioSpeedWpm === sp.speed;
                      return (
                        <button
                          key={sp.speed}
                          type="button"
                          onClick={() => handleSpeedChange(sp.speed)}
                          className={`px-2 py-0.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-800 text-white shadow-2xs font-bold'
                              : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {sp.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Optional Fine-Tuning Slider */}
                  {showFineSpeedSlider && (
                    <div className="pt-2 border-t border-stone-200 flex items-center gap-2 text-xs">
                      <span className="text-stone-400 font-mono text-[10px]">4</span>
                      <input
                        type="range"
                        min={4}
                        max={22}
                        step={1}
                        value={audioSpeedWpm}
                        onChange={(e) => handleSpeedChange(Number(e.target.value))}
                        className="flex-1 accent-amber-800 cursor-pointer"
                      />
                      <span className="text-stone-400 font-mono text-[10px]">22 WPM</span>
                    </div>
                  )}
                </div>
              )}

              {/* SEMAFOR ONLY: Semaphore Animated Figure Simulation */}
              {type === 'semafor' && (
                <div className="mt-3">
                  <SemaphoreAnimatedFigure text={inputText} compact />
                </div>
              )}

              {/* Output Content Display Canvas */}
              <div className="mt-3.5 p-4 rounded-xl bg-stone-50/70 border border-stone-200/80 min-h-[140px] flex items-center justify-center overflow-x-auto">
                {outputResult ? (
                  <div className={`w-full text-center transition-all ${isJumboScale ? 'py-6' : ''}`}>
                    {/* Sandi Morse Display */}
                    {type === 'morse' && (
                      <div
                        className={`font-mono font-black text-stone-900 tracking-widest break-words leading-relaxed select-all transition-all ${
                          isJumboScale
                            ? 'text-3xl sm:text-4xl lg:text-5xl text-amber-950'
                            : 'text-xl sm:text-2xl'
                        }`}
                      >
                        {outputResult}
                      </div>
                    )}

                    {/* Sandi Rumput Display */}
                    {type === 'rumput' && (
                      <div
                        className={`font-sandi-rumput text-emerald-900 break-words leading-normal select-all tracking-normal transition-all ${
                          isJumboScale
                            ? 'text-7xl sm:text-8xl'
                            : 'text-5xl sm:text-6xl'
                        }`}
                      >
                        {outputResult}
                      </div>
                    )}

                    {/* Sandi Kotak Display */}
                    {type === 'kotak' && (
                      <div
                        className={`font-sandi-kotak text-slate-800 break-words leading-normal select-all tracking-[0.25em] transition-all ${
                          isJumboScale
                            ? 'text-7xl sm:text-8xl'
                            : 'text-5xl sm:text-6xl'
                        }`}
                      >
                        {outputResult}
                      </div>
                    )}

                    {/* Sandi Semafor Display (Using Authentic Simulator Scout Model) */}
                    {type === 'semafor' && (
                      <div className="w-full">
                        <SemaphoreTextDisplay text={inputText} isJumbo={isJumboScale} />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-stone-400 text-xs py-6">
                    Ketik teks untuk melihat representasi sandi.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Educational Information Card */}
      <div className="bg-stone-50/90 rounded-2xl border border-stone-200/80 p-4 sm:p-5 text-stone-700 text-xs sm:text-sm leading-relaxed">
        <h3 className="text-stone-900 font-bold text-sm mb-1">
          Tentang {meta.name}
        </h3>
        <p className="text-stone-600">{meta.description}</p>
      </div>
    </div>
  );
};
