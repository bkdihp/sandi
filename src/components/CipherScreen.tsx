import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Volume2, VolumeX, Copy, Check, Info, Sparkles, RotateCcw } from 'lucide-react';
import { convertToMorse, MorsePlayer } from '../utils/ciphers';

export type CipherType = 'morse' | 'rumput' | 'kotak' | 'semafor';

interface CipherScreenProps {
  type: CipherType;
  onBack: () => void;
}

const CIPHER_CONFIGS: Record<CipherType, {
  title: string;
  gradient: string;
  buttonGradient: string;
  fontClass: string;
  fontSizeClass: string;
  letterSpacing: string;
  hint: string;
  description: string;
}> = {
  morse: {
    title: 'sandi morse',
    gradient: 'linear-gradient(135deg, #F8416D, #9052E1)',
    buttonGradient: 'linear-gradient(135deg, #F8416D, #9052E1)',
    fontClass: 'font-mono font-bold',
    fontSizeClass: 'text-2xl leading-relaxed',
    letterSpacing: 'tracking-widest',
    hint: 'ex: rbayuokt',
    description: 'Sandi Morse menggunakan kombinasi titik (.) dan garis (-) untuk mewakili setiap huruf dan angka.',
  },
  rumput: {
    title: 'sandi rumput',
    gradient: 'linear-gradient(135deg, #FDA430, #FB6A13)',
    buttonGradient: 'linear-gradient(135deg, #FDA430, #FB6A13)',
    fontClass: 'font-sandi-rumput',
    fontSizeClass: 'text-4xl leading-normal',
    letterSpacing: 'tracking-normal',
    hint: 'ex: rbayuokt',
    description: 'Sandi Rumput merupakan turunan dari sandi morse dengan bentuk menyerupai rumput (rumput pendek untuk titik, rumput tinggi untuk garis).',
  },
  kotak: {
    title: 'sandi kotak',
    gradient: 'linear-gradient(135deg, #E436D7, #3C6BF4)',
    buttonGradient: 'linear-gradient(135deg, #E436D7, #3C6BF4)',
    fontClass: 'font-sandi-kotak',
    fontSizeClass: 'text-4xl leading-normal',
    letterSpacing: 'tracking-[0.2em]',
    hint: 'ex: rbayuokt',
    description: 'Sandi Kotak (Pigpen Cipher) menggunakan garis kisi kotak dan titik untuk menyandikan setiap karakter alfabet.',
  },
  semafor: {
    title: 'sandi semafor',
    gradient: 'linear-gradient(135deg, #F69E3F, #FD7964)',
    buttonGradient: 'linear-gradient(135deg, #F69E3F, #FD7964)',
    fontClass: 'font-sandi-semafor',
    fontSizeClass: 'text-6xl leading-normal',
    letterSpacing: 'tracking-[0.3em]',
    hint: 'ex: rbayuokt',
    description: 'Sandi Semaphore menyampaikan pesan menggunakan posisi sepasang bendera dengan sudut tertentu.',
  },
};

export const CipherScreen: React.FC<CipherScreenProps> = ({ type, onBack }) => {
  const config = CIPHER_CONFIGS[type];
  const [inputText, setInputText] = useState('');
  const [translatedResult, setTranslatedResult] = useState<string | null>(null);
  const [hasTranslated, setHasTranslated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const playerRef = useRef<MorsePlayer | null>(null);

  useEffect(() => {
    playerRef.current = new MorsePlayer();
    return () => {
      if (playerRef.current) {
        playerRef.current.stop();
      }
    };
  }, []);

  const handleTranslate = () => {
    if (!inputText.trim()) {
      setHasTranslated(false);
      setTranslatedResult(null);
      return;
    }

    if (type === 'morse') {
      const morseResult = convertToMorse(inputText);
      setTranslatedResult(morseResult);
    } else {
      // In Android source: hsl.setText(text.toLowerCase())
      // The custom font renders the characters directly!
      setTranslatedResult(inputText.toLowerCase());
    }
    setHasTranslated(true);
  };

  const handleCopy = () => {
    if (!translatedResult) return;
    navigator.clipboard.writeText(translatedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleAudio = () => {
    if (!playerRef.current || !translatedResult) return;

    if (isPlayingAudio) {
      playerRef.current.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      playerRef.current.play(translatedResult, () => {
        setIsPlayingAudio(false);
      });
    }
  };

  const handleReset = () => {
    setInputText('');
    setHasTranslated(false);
    setTranslatedResult(null);
    if (playerRef.current) {
      playerRef.current.stop();
      setIsPlayingAudio(false);
    }
  };

  const handlePreset = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white shadow-xl flex flex-col justify-between">
      <div className="pb-10">
        {/* Top Header */}
        <div className="px-9 pt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="p-2 -ml-2 text-slate-700 hover:text-black hover:bg-slate-100 rounded-full transition-colors"
            title="Kembali"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-black tracking-tight font-['Poppins']">
            kode.in
          </h1>
          <button
            type="button"
            onClick={() => setShowGuide(!showGuide)}
            className={`p-2 -mr-2 rounded-full transition-colors ${
              showGuide ? 'bg-amber-100 text-amber-700' : 'text-slate-500 hover:text-black hover:bg-slate-100'
            }`}
            title="Panduan Sandi"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>

        {/* Gray Banner for Menu Name */}
        <div className="bg-[#A1A1A1] mt-5 py-2 px-9">
          <h2 className="text-lg font-bold text-white capitalize">
            {config.title}
          </h2>
        </div>

        {/* Content Body */}
        <div className="px-9 mt-5">
          {/* Label */}
          <div className="flex items-center justify-between">
            <label htmlFor="cipher-input" className="text-base text-[#6E6E6E] font-normal">
              masukan text :
            </label>
            {inputText && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Hapus
              </button>
            )}
          </div>

          {/* Text Area */}
          <textarea
            id="cipher-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={config.hint}
            rows={5}
            className="w-full mt-2.5 p-3 text-base text-slate-800 placeholder-slate-400 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all resize-y shadow-inner"
          />

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            <span className="text-xs text-slate-400 mr-1">Contoh:</span>
            {['pramuka', 'siaga', 'penggalang', 'semangat'].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePreset(preset)}
                className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Action Button: terjemahin */}
          <button
            type="button"
            onClick={handleTranslate}
            className="w-full mt-5 py-3.5 rounded-2xl font-bold text-white text-base shadow-md hover:shadow-lg active:scale-[0.98] transition-all transform tracking-wide capitalize"
            style={{
              background: config.buttonGradient,
            }}
          >
            terjemahin
          </button>

          {/* Result Section */}
          {hasTranslated && translatedResult !== null && (
            <div className="mt-6 pt-5 border-t border-slate-100 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#605F5F] tracking-wide">
                  HASIL :
                </span>
                <div className="flex items-center gap-2">
                  {type === 'morse' && (
                    <button
                      type="button"
                      onClick={handleToggleAudio}
                      className={`p-2 rounded-xl flex items-center gap-1.5 text-xs font-semibold transition-all ${
                        isPlayingAudio
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                      title={isPlayingAudio ? 'Stop Bunyi' : 'Bunyikan Morse'}
                    >
                      {isPlayingAudio ? (
                        <>
                          <VolumeX className="w-4 h-4" /> Stop
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-4 h-4" /> Bunyi
                        </>
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                    title="Salin Hasil"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" /> Tersalin
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Salin
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Render Output */}
              <div className="mt-4 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 min-h-[100px] flex items-center justify-center overflow-x-auto">
                <div
                  className={`text-[#605F5F] select-all break-words max-w-full text-center ${config.fontClass} ${config.fontSizeClass} ${config.letterSpacing}`}
                  style={{
                    wordBreak: 'break-word',
                  }}
                >
                  {translatedResult}
                </div>
              </div>

              {/* Font Notice for visual ciphers */}
              {type !== 'morse' && (
                <p className="mt-2 text-center text-xs text-slate-400">
                  Tip: Karakter hasil disandikan menggunakan font khas Pramuka. Anda dapat menyalin teks tersebut.
                </p>
              )}
            </div>
          )}

          {/* Guide Drawer / Information Accordion */}
          {showGuide && (
            <div className="mt-6 p-4 bg-amber-50/90 rounded-2xl border border-amber-200 text-slate-700 text-xs leading-relaxed space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Panduan {config.title}
              </div>
              <p>{config.description}</p>

              {type === 'morse' && (
                <div className="grid grid-cols-3 gap-2 bg-white/80 p-2.5 rounded-xl border border-amber-100 font-mono text-[11px]">
                  <div>A: .-</div>
                  <div>B: -...</div>
                  <div>C: -.-.</div>
                  <div>D: -..</div>
                  <div>E: .</div>
                  <div>F: ..-.</div>
                  <div>G: --.</div>
                  <div>H: ....</div>
                  <div>I: ..</div>
                  <div>J: .---</div>
                  <div>K: -.-</div>
                  <div>L: .-..</div>
                  <div>M: --</div>
                  <div>N: -.</div>
                  <div>O: ---</div>
                  <div>P: .--.</div>
                  <div>Q: --.-</div>
                  <div>R: .-.</div>
                  <div>S: ...</div>
                  <div>T: -</div>
                  <div>U: ..-</div>
                  <div>V: ...-</div>
                  <div>W: .--</div>
                  <div>X: -..-</div>
                  <div>Y: -.--</div>
                  <div>Z: --..</div>
                </div>
              )}

              {type === 'rumput' && (
                <div className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                  <p className="font-semibold text-amber-900 mb-1">Prinsip Sandi Rumput:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Titik Morse (.) dilambangkan dengan rumput rendah.</li>
                    <li>Garis Morse (-) dilambangkan dengan rumput tinggi.</li>
                    <li>Pemisah antar huruf dilambangkan dengan garis bawah/ruang rumput.</li>
                  </ul>
                </div>
              )}

              {type === 'kotak' && (
                <div className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                  <p className="font-semibold text-amber-900 mb-1">Prinsip Sandi Kotak (Pigpen):</p>
                  <p>
                    Menggunakan kotak salib berpola pagar 3x3 dan bentuk X. Huruf pertama tanpa titik, huruf kedua menggunakan satu titik di dalam petak kotak.
                  </p>
                </div>
              )}

              {type === 'semafor' && (
                <div className="bg-white/80 p-2.5 rounded-xl border border-amber-100">
                  <p className="font-semibold text-amber-900 mb-1">Prinsip Sandi Semafor:</p>
                  <p>
                    Komunikasi visual bendera berukuran 45x45 cm warna merah-kuning, dibentuk menurut rotasi jarum jam sekeliling tubuh pandu.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
