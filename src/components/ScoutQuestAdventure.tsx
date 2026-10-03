import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Star,
  Lock,
  CheckCircle2,
  RotateCcw,
  Volume2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { convertToMorse, MorsePlayer, WhistleSoundType } from '../utils/ciphers';

export interface LevelConfig {
  id: number;
  title: string;
  subtitle: string;
  badgeName: string;
  badgeEmoji: string;
  cipherType: 'morse' | 'rumput' | 'kotak' | 'semafor' | 'campuran';
  questions: {
    questionText: string;
    hint: string;
    cipherText: string; // The text to encode/display
    correctAnswer: string;
    options: string[];
  }[];
}

export const SCOUT_LEVELS: LevelConfig[] = [
  {
    id: 1,
    title: 'Tunas Baru',
    subtitle: 'Mengenal Huruf Morse Paling Singkat',
    badgeName: 'Lencana Tunas Cikal',
    badgeEmoji: '🌱',
    cipherType: 'morse',
    questions: [
      {
        questionText: 'Huruf apakah yang kodenya satu titik ( · )?',
        hint: 'Huruf vokal paling sering digunakan',
        cipherText: 'e',
        correctAnswer: 'E',
        options: ['E', 'T', 'A', 'I'],
      },
      {
        questionText: 'Huruf apakah yang kodenya satu garis panjang ( — )?',
        hint: 'Huruf awal kata Tenda',
        cipherText: 't',
        correctAnswer: 'T',
        options: ['T', 'M', 'N', 'E'],
      },
      {
        questionText: 'Kode ( · · ) dua titik melambangkan huruf apa?',
        hint: 'Huruf awal kata Indonesia',
        cipherText: 'i',
        correctAnswer: 'I',
        options: ['I', 'S', 'U', 'A'],
      },
      {
        questionText: 'Kode ( · — ) titik dan garis adalah huruf apa?',
        hint: 'Huruf pertama dalam abjad',
        cipherText: 'a',
        correctAnswer: 'A',
        options: ['A', 'N', 'M', 'W'],
      },
    ],
  },
  {
    id: 2,
    title: 'Siaga Mula',
    subtitle: 'Kata Rahasia Morse Perkemahan',
    badgeName: 'Lencana Peluit Emas',
    badgeEmoji: '🏕️',
    cipherType: 'morse',
    questions: [
      {
        questionText: 'Dengarkan atau baca kode morse ini:',
        hint: 'Yang dinyalakan saat malam akrab perkemahan',
        cipherText: 'api',
        correctAnswer: 'API',
        options: ['API', 'AIR', 'ASA', 'ALAM'],
      },
      {
        questionText: 'Pecahkan kode morse kata ini:',
        hint: 'Sebutan untuk pramuka muda',
        cipherText: 'siaga',
        correctAnswer: 'SIAGA',
        options: ['SIAGA', 'SETIA', 'SAPA', 'SUKA'],
      },
      {
        questionText: 'Apa kata sandi morse berikut?',
        hint: 'Tempat tidur di alam terbuka',
        cipherText: 'tenda',
        correctAnswer: 'TENDA',
        options: ['TENDA', 'TUNAS', 'TANDU', 'TAMAN'],
      },
      {
        questionText: 'Terjemahkan pesan morse ini:',
        hint: 'Tempat bertualang pramuka',
        cipherText: 'kemah',
        correctAnswer: 'KEMAH',
        options: ['KEMAH', 'KARYA', 'KORSA', 'KILAT'],
      },
    ],
  },
  {
    id: 3,
    title: 'Siaga Bantu',
    subtitle: 'Membaca Sandi Rumput Alam',
    badgeName: 'Lencana Rumput Rimba',
    badgeEmoji: '🌿',
    cipherType: 'rumput',
    questions: [
      {
        questionText: 'Baca bilah Sandi Rumput di bawah ini:',
        hint: 'Satu rumput pendek melambangkan titik (E)',
        cipherText: 'esa',
        correctAnswer: 'ESA',
        options: ['ESA', 'ADA', 'ASA', 'AIR'],
      },
      {
        questionText: 'Apa bacaan dari Sandi Rumput ini?',
        hint: 'Kelompok regu dalam kepramukaan',
        cipherText: 'regu',
        correctAnswer: 'REGU',
        options: ['REGU', 'RUSA', 'RIMBA', 'RAWA'],
      },
      {
        questionText: 'Pecahkan Sandi Rumput berikut:',
        hint: 'Sikap mulia anggota pramuka',
        cipherText: 'bantu',
        correctAnswer: 'BANTU',
        options: ['BANTU', 'BAKTI', 'BERANI', 'BANGSA'],
      },
      {
        questionText: 'Terjemahkan Sandi Rumput ini:',
        hint: 'Lambang kehormatan pramuka',
        cipherText: 'tunas',
        correctAnswer: 'TUNAS',
        options: ['TUNAS', 'TENDA', 'TANDU', 'TOTAL'],
      },
    ],
  },
  {
    id: 4,
    title: 'Siaga Tata',
    subtitle: 'Misteri Sandi Kotak Rahasia',
    badgeName: 'Lencana Kotak Rahasia',
    badgeEmoji: '📦',
    cipherType: 'kotak',
    questions: [
      {
        questionText: 'Pecahkan simbol Sandi Kotak berikut:',
        hint: 'Burung lambang negara kita',
        cipherText: 'garuda',
        correctAnswer: 'GARUDA',
        options: ['GARUDA', 'GANDUM', 'GEMBIRA', 'GAGAH'],
      },
      {
        questionText: 'Apa kata dari bentuk Sandi Kotak ini?',
        hint: 'Warna bendera merah putih',
        cipherText: 'merah',
        correctAnswer: 'MERAH',
        options: ['MERAH', 'MEKAR', 'MANIS', 'MAWAR'],
      },
      {
        questionText: 'Terjemahkan Sandi Kotak rahasia ini:',
        hint: 'Pramuka selalu cinta tanah air',
        cipherText: 'bangsa',
        correctAnswer: 'BANGSA',
        options: ['BANGSA', 'BAKTI', 'BERANI', 'BANTU'],
      },
      {
        questionText: 'Baca simbol Sandi Kotak di bawah:',
        hint: 'Dasar negara Indonesia',
        cipherText: 'pancasila',
        correctAnswer: 'PANCASILA',
        options: ['PANCASILA', 'PRAJA MUDA', 'PANDU KITA', 'PATRIOT'],
      },
    ],
  },
  {
    id: 5,
    title: 'Penggalang Ramu',
    subtitle: 'Isyarat Bendera Semafor Pramuka',
    badgeName: 'Lencana Bendera Kilat',
    badgeEmoji: '🚩',
    cipherType: 'semafor',
    questions: [
      {
        questionText: 'Kedua tangan lurus ke bawah (arah jam 6 dan jam 7) adalah huruf?',
        hint: 'Huruf pertama dalam abjad',
        cipherText: 'a',
        correctAnswer: 'A',
        options: ['A', 'B', 'C', 'D'],
      },
      {
        questionText: 'Tangan kiri ke arah jam 6, tangan kanan mendatar ke jam 8 adalah huruf?',
        hint: 'Huruf kedua abjad',
        cipherText: 'b',
        correctAnswer: 'B',
        options: ['B', 'A', 'C', 'H'],
      },
      {
        questionText: 'Tangan kiri arah jam 6, tangan kanan lurus ke atas jam 12 adalah huruf?',
        hint: 'Huruf keempat abjad',
        cipherText: 'd',
        correctAnswer: 'D',
        options: ['D', 'E', 'F', 'G'],
      },
      {
        questionText: 'Bila bendera semafor membentuk kata di bawah, apakah katanya?',
        hint: 'Anggota pandu',
        cipherText: 'pandu',
        correctAnswer: 'PANDU',
        options: ['PANDU', 'PRAJA', 'PATROLI', 'PINTAR'],
      },
    ],
  },
  {
    id: 6,
    title: 'Penggalang Rakit',
    subtitle: 'Tantangan Cepat Morse & Rumput',
    badgeName: 'Lencana Penjelajah Alam',
    badgeEmoji: '🧭',
    cipherType: 'campuran',
    questions: [
      {
        questionText: 'Terjemahkan Sandi Rumput ini dengan cepat:',
        hint: 'Semboyan kebanggaan pramuka',
        cipherText: 'praja',
        correctAnswer: 'PRAJA',
        options: ['PRAJA', 'PANDU', 'PATROLI', 'PANTANG'],
      },
      {
        questionText: 'Apa kata dari Sandi Morse berikut: ( — · ·   ·   — · — ·   · ·   — · · — )?',
        hint: 'Kecakapan berpikir cepat',
        cipherText: 'cerdik',
        correctAnswer: 'CERDIK',
        options: ['CERDIK', 'CERDAS', 'CEPAT', 'CAKAP'],
      },
      {
        questionText: 'Pecahkan Sandi Kotak berikut ini:',
        hint: 'Janji suci pramuka penggalang',
        cipherText: 'tri satya',
        correctAnswer: 'TRI SATYA',
        options: ['TRI SATYA', 'DASA DARMA', 'DWISATYA', 'PANCASILA'],
      },
    ],
  },
  {
    id: 7,
    title: 'Penggalang Terap',
    subtitle: 'Pesan Rahasia Dasa Darma',
    badgeName: 'Lencana Pandu Sejati',
    badgeEmoji: '⭐',
    cipherType: 'campuran',
    questions: [
      {
        questionText: 'Darma ke-1 Pramuka: Takwa kepada Tuhan Yang Maha...',
        hint: 'Kata penutup darma pertama',
        cipherText: 'esa',
        correctAnswer: 'ESA',
        options: ['ESA', 'AGUNG', 'MULIA', 'KUASA'],
      },
      {
        questionText: 'Pecahkan pesan morse darma ke-2: Cinta alam dan kasih sayang sesama...',
        hint: 'Makhluk ciptaan Tuhan',
        cipherText: 'manusia',
        correctAnswer: 'MANUSIA',
        options: ['MANUSIA', 'MAKHLUK', 'MASYARAKAT', 'MITRA'],
      },
      {
        questionText: 'Terjemahkan Sandi Rumput sifat mulia pramuka berikut:',
        hint: 'Darma ke-5 pramuka',
        cipherText: 'rela menolong',
        correctAnswer: 'RELA MENOLONG',
        options: ['RELA MENOLONG', 'RAJIN TERAMPIL', 'HEMAT CERMAT', 'DISIPLIN BERANI'],
      },
    ],
  },
  {
    id: 8,
    title: 'Pramuka Garuda',
    subtitle: 'Ujian Tingkat Tertinggi Master Sandi',
    badgeName: 'Bintang Pramuka Garuda',
    badgeEmoji: '🦅',
    cipherType: 'campuran',
    questions: [
      {
        questionText: 'Ujian 1: Pecahkan sandi kehormatan pramuka tertinggi ini:',
        hint: 'Arti dari singkatan Pramuka',
        cipherText: 'praja muda karana',
        correctAnswer: 'PRAJA MUDA KARANA',
        options: ['PRAJA MUDA KARANA', 'PANDU INDONESIA JAYA', 'PANCASILA ABADI', 'PATRIOT BANGSA INDONESIA'],
      },
      {
        questionText: 'Ujian 2: Apa semboyan persatuan bangsa kita?',
        hint: 'Berbeda-beda tetapi tetap satu jua',
        cipherText: 'bhinneka tunggal ika',
        correctAnswer: 'BHINNEKA TUNGGAL IKA',
        options: ['BHINNEKA TUNGGAL IKA', 'BERSATU KITA TEGUH', 'PANCASILA SAKTI', 'INDONESIA RAYA'],
      },
    ],
  },
];

export const ScoutQuestAdventure: React.FC = () => {
  // State for user progress (Saved in localStorage)
  const [userStars, setUserStars] = useState<Record<number, number>>(() => {
    try {
      const saved = localStorage.getItem('sandi_pramuka_stars');
      return saved ? JSON.parse(saved) : { 1: 0 };
    } catch {
      return { 1: 0 };
    }
  });

  const [activeLevelId, setActiveLevelId] = useState<number | null>(null);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isLevelFinished, setIsLevelFinished] = useState(false);
  const [earnedStars, setEarnedStars] = useState(0);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const morsePlayerRef = useRef<MorsePlayer | null>(null);
  const [questMorseSpeed, setQuestMorseSpeed] = useState<number>(4); // Super slow 4 WPM for beginners
  const [questWhistleSound] = useState<WhistleSoundType>('peluit-pramuka');
  const [isMorsePlaying, setIsMorsePlaying] = useState(false);

  useEffect(() => {
    morsePlayerRef.current = new MorsePlayer();
    return () => {
      if (morsePlayerRef.current) {
        morsePlayerRef.current.stop();
      }
    };
  }, []);

  const handlePlayMorseCode = (text: string) => {
    if (!morsePlayerRef.current) return;
    if (isMorsePlaying) {
      morsePlayerRef.current.stop();
      setIsMorsePlaying(false);
      return;
    }

    const morse = convertToMorse(text);
    setIsMorsePlaying(true);
    morsePlayerRef.current.play(
      morse,
      { wpm: questMorseSpeed, soundType: questWhistleSound },
      () => {
        setIsMorsePlaying(false);
      }
    );
  };

  // Sound effects (cheerful friendly chimes for school kids)
  const playSoundEffect = (type: 'correct' | 'wrong' | 'victory') => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      const now = audioCtxRef.current.currentTime;
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      if (type === 'correct') {
        // Cheerful major chord arpeggio (C5 -> E5 -> G5)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'wrong') {
        // Gentle soft buzz (no harsh sound)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.setValueAtTime(220, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'victory') {
        // Fanfare
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        osc.frequency.setValueAtTime(1046.5, now + 0.3);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start(now);
        osc.stop(now + 0.7);
      }
    } catch {
      // Audio fallback
    }
  };

  const totalEarnedStars = Object.values(userStars).reduce((a, b) => a + b, 0);
  const maxPossibleStars = SCOUT_LEVELS.length * 3;

  const startLevel = (lvlId: number) => {
    setActiveLevelId(lvlId);
    setCurrentQIdx(0);
    setCorrectCount(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsLevelFinished(false);
    setEarnedStars(0);
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(opt);
  };

  const handleConfirmAnswer = () => {
    if (!selectedOption || !activeLevelId) return;

    const currentLevel = SCOUT_LEVELS.find((l) => l.id === activeLevelId);
    if (!currentLevel) return;

    const currentQuestion = currentLevel.questions[currentQIdx];
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    setIsAnswerChecked(true);

    if (isCorrect) {
      playSoundEffect('correct');
      setCorrectCount((c) => c + 1);
    } else {
      playSoundEffect('wrong');
    }
  };

  const handleNextQuestion = () => {
    if (!activeLevelId) return;
    const currentLevel = SCOUT_LEVELS.find((l) => l.id === activeLevelId);
    if (!currentLevel) return;

    if (currentQIdx + 1 < currentLevel.questions.length) {
      setCurrentQIdx((idx) => idx + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      // Calculate stars
      const totalQ = currentLevel.questions.length;
      let stars = 1;
      if (correctCount === totalQ) {
        stars = 3;
      } else if (correctCount >= Math.ceil(totalQ * 0.7)) {
        stars = 2;
      }

      setEarnedStars(stars);
      setIsLevelFinished(true);
      playSoundEffect('victory');

      // Confetti for completing level
      confetti({
        particleCount: stars === 3 ? 80 : 40,
        spread: 70,
        origin: { y: 0.6 },
      });

      // Save stars and unlock next level
      setUserStars((prev) => {
        const currentBest = prev[activeLevelId] || 0;
        const newBest = Math.max(currentBest, stars);
        const nextLevelId = activeLevelId + 1;
        const updated = {
          ...prev,
          [activeLevelId]: newBest,
        };
        // Unlock next level if not unlocked yet
        if (nextLevelId <= SCOUT_LEVELS.length && !updated[nextLevelId]) {
          updated[nextLevelId] = 0;
        }
        try {
          localStorage.setItem('sandi_pramuka_stars', JSON.stringify(updated));
        } catch {
          // Ignore storage error
        }
        return updated;
      });
    }
  };

  const handleRepeatLevel = () => {
    if (activeLevelId) {
      startLevel(activeLevelId);
    }
  };

  const handleBackToMap = () => {
    setActiveLevelId(null);
  };

  // If a level is currently active, render the interactive quiz screen
  if (activeLevelId !== null) {
    const currentLevel = SCOUT_LEVELS.find((l) => l.id === activeLevelId)!;
    const currentQuestion = currentLevel.questions[currentQIdx];

    return (
      <div className="w-full bg-white rounded-3xl border border-stone-200 shadow-xl p-5 sm:p-8 space-y-6">
        {/* Level Navigation Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <button
            type="button"
            onClick={handleBackToMap}
            className="flex items-center gap-2 text-stone-600 hover:text-stone-900 font-bold text-sm bg-stone-100 hover:bg-stone-200 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Peta</span>
          </button>

          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
              Level {currentLevel.id} · {currentLevel.title}
            </span>
            <span className="text-xs text-stone-400">
              Soal {currentQIdx + 1} dari {currentLevel.questions.length}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span className="text-xs font-black text-amber-900">
              {correctCount} Benar
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-amber-500 h-full transition-all duration-300 rounded-full"
            style={{
              width: `${((currentQIdx + (isAnswerChecked ? 1 : 0)) / currentLevel.questions.length) * 100}%`,
            }}
          />
        </div>

        {isLevelFinished ? (
          /* Level Finished Celebration Card */
          <div className="py-8 flex flex-col items-center text-center space-y-5 animate-fadeIn">
            <div className="text-6xl animate-bounce">{currentLevel.badgeEmoji}</div>
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900">
              {earnedStars === 3 ? '🎉 Luar Biasa! Sempurna!' : '👏 Hebat! Level Selesai!'}
            </h3>
            <p className="text-stone-600 text-sm max-w-md">
              Kamu berhasil menyelesaikan <strong>{currentLevel.title}</strong> dan menjawab{' '}
              <strong className="text-amber-700">{correctCount}</strong> dari{' '}
              <strong>{currentLevel.questions.length}</strong> soal dengan tepat!
            </p>

            {/* Stars Won */}
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3].map((starNum) => (
                <Star
                  key={starNum}
                  className={`w-12 h-12 transition-transform duration-300 ${
                    starNum <= earnedStars
                      ? 'fill-amber-400 text-amber-500 scale-110 drop-shadow-md'
                      : 'text-stone-300'
                  }`}
                />
              ))}
            </div>

            {/* Badge Unlocked Notification */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 max-w-sm w-full flex items-center gap-3 text-left">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-2xl flex items-center justify-center">
                {currentLevel.badgeEmoji}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-amber-700 tracking-wider block">
                  Lencana Dibuka!
                </span>
                <span className="text-sm font-bold text-stone-900">
                  {currentLevel.badgeName}
                </span>
              </div>
            </div>

            {/* Next / Repeat Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                type="button"
                onClick={handleRepeatLevel}
                className="px-5 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-sm transition-colors flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulang</span>
              </button>
              {activeLevelId < SCOUT_LEVELS.length && (
                <button
                  type="button"
                  onClick={() => startLevel(activeLevelId + 1)}
                  className="px-7 py-3 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Lanjut</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={handleBackToMap}
                className="px-5 py-3 rounded-2xl bg-stone-800 hover:bg-stone-900 text-white font-bold text-sm transition-colors cursor-pointer"
              >
                Peta
              </button>
            </div>
          </div>
        ) : (
          /* Active Question Stage */
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h4 className="text-lg sm:text-xl font-bold text-stone-900">
                {currentQuestion.questionText}
              </h4>
              <p className="text-xs text-stone-500 italic">
                Petunjuk: {currentQuestion.hint}
              </p>
            </div>

            {/* Secret Cipher Clue Box */}
            <div className="bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[140px] text-center shadow-inner">
              {currentLevel.cipherType === 'morse' && (
                <div className="space-y-3">
                  <div className="font-mono text-3xl sm:text-4xl font-black text-amber-800 tracking-widest">
                    {convertToMorse(currentQuestion.cipherText)}
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handlePlayMorseCode(currentQuestion.cipherText)}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                        isMorsePlaying
                          ? 'bg-amber-700 text-white animate-pulse shadow-md'
                          : 'text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 shadow-xs'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isMorsePlaying ? 'Hentikan Bunyi' : 'Dengarkan Peluit Pelan'}</span>
                    </button>

                    {/* Speed options for beginner students */}
                    <div className="inline-flex items-center text-[10px] bg-white rounded-xl p-1 border border-stone-200 shadow-2xs gap-1">
                      <button
                        type="button"
                        onClick={() => setQuestMorseSpeed(4)}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          questMorseSpeed === 4
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        4 WPM (Sangat Pelan)
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuestMorseSpeed(6)}
                        className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          questMorseSpeed === 6
                            ? 'bg-amber-600 text-white shadow-xs'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        6 WPM (Pelan)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentLevel.cipherType === 'rumput' && (
                <div className="space-y-1">
                  <div className="font-sandi-rumput text-6xl sm:text-7xl text-emerald-800 leading-none select-none tracking-normal">
                    {currentQuestion.cipherText}
                  </div>
                  <span className="text-[11px] text-stone-400 font-semibold block">
                    (Rumput Pendek = Titik, Rumput Tinggi = Garis)
                  </span>
                </div>
              )}

              {currentLevel.cipherType === 'kotak' && (
                <div className="space-y-1">
                  <div className="font-sandi-kotak text-6xl sm:text-7xl text-slate-800 leading-none select-none tracking-[0.25em]">
                    {currentQuestion.cipherText}
                  </div>
                  <span className="text-[11px] text-stone-400 font-semibold block">
                    (Bentuk Kotak & Titik Rahasia)
                  </span>
                </div>
              )}

              {currentLevel.cipherType === 'semafor' && (
                <div className="space-y-2">
                  <div className="font-sandi-semafor text-6xl sm:text-7xl text-stone-900 leading-none select-none tracking-[0.3em]">
                    {currentQuestion.cipherText}
                  </div>
                  <span className="text-[11px] text-stone-400 font-semibold block">
                    (Arah Kibasan Bendera Semafor)
                  </span>
                </div>
              )}

              {currentLevel.cipherType === 'campuran' && (
                <div className="space-y-1">
                  {currentQIdx % 2 === 0 ? (
                    <div className="font-sandi-rumput text-6xl text-emerald-800 leading-none select-none tracking-normal">
                      {currentQuestion.cipherText}
                    </div>
                  ) : (
                    <div className="font-mono text-3xl font-black text-amber-800 tracking-widest">
                      {convertToMorse(currentQuestion.cipherText)}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Answer Options Grid (Big touch-friendly buttons for students) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((opt, i) => {
                const isSelected = selectedOption === opt;
                let btnStyle =
                  'bg-white hover:bg-stone-50 border-stone-200 text-stone-800';

                if (isAnswerChecked) {
                  if (opt === currentQuestion.correctAnswer) {
                    btnStyle =
                      'bg-emerald-500 border-emerald-600 text-white font-black shadow-md';
                  } else if (isSelected) {
                    btnStyle =
                      'bg-rose-500 border-rose-600 text-white line-through opacity-85';
                  } else {
                    btnStyle = 'bg-stone-100 border-stone-200 text-stone-400';
                  }
                } else if (isSelected) {
                  btnStyle =
                    'bg-amber-100 border-amber-500 text-amber-950 font-black shadow-sm ring-2 ring-amber-400/40';
                }

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectOption(opt)}
                    disabled={isAnswerChecked}
                    className={`min-h-[64px] rounded-2xl border-2 p-3 text-base sm:text-lg font-bold flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-stone-900/10 flex items-center justify-center text-xs font-black">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {isAnswerChecked && opt === currentQuestion.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex items-center justify-end gap-3">
              {!isAnswerChecked ? (
                <button
                  type="button"
                  onClick={handleConfirmAnswer}
                  disabled={!selectedOption}
                  className={`px-8 py-3.5 rounded-2xl font-black text-sm transition-all cursor-pointer ${
                    selectedOption
                      ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg active:scale-95'
                      : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  Periksa
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-8 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-sm shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>
                    {currentQIdx + 1 < currentLevel.questions.length
                      ? 'Lanjut'
                      : 'Hasil'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Level Selection Map (Peta Petualangan Pramuka)
  return (
    <div className="space-y-6 select-none">
      {/* Scout Achievement Summary Header */}
      <div className="bg-gradient-to-r from-amber-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-amber-900 flex flex-wrap items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Petualangan Pramuka Penjelajah</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Peta Misi Sandi Pramuka
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm max-w-md">
            Selesaikan misi tiap level untuk mengumpulkan bintang dan membuka lencana kecakapan khusus!
          </p>
        </div>

        {/* Total Stars & Badges Collector */}
        <div className="flex items-center gap-4 bg-stone-900/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-amber-700/50">
          <div className="flex items-center gap-2">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
            <div>
              <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                Total Bintang
              </span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono">
                {totalEarnedStars} / {maxPossibleStars}
              </span>
            </div>
          </div>
          <div className="h-8 w-px bg-stone-700" />
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            <div>
              <span className="block text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                Lencana Terbuka
              </span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono">
                {Object.keys(userStars).length} / {SCOUT_LEVELS.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of 8 Levels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {SCOUT_LEVELS.map((lvl) => {
          const isUnlocked = lvl.id in userStars;
          const starsEarned = userStars[lvl.id] || 0;

          return (
            <div
              key={lvl.id}
              onClick={() => {
                if (isUnlocked) startLevel(lvl.id);
              }}
              className={`rounded-3xl border-2 p-5 flex flex-col justify-between transition-all relative overflow-hidden ${
                isUnlocked
                  ? 'bg-white hover:border-amber-500 hover:shadow-xl cursor-pointer border-stone-200 group active:scale-98'
                  : 'bg-stone-100/80 border-stone-200 opacity-60 cursor-not-allowed'
              }`}
            >
              <div>
                {/* Level Top Bar */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-xs ${
                      isUnlocked
                        ? 'bg-amber-100 text-amber-900 group-hover:scale-110 transition-transform'
                        : 'bg-stone-200 text-stone-400'
                    }`}
                  >
                    {isUnlocked ? lvl.badgeEmoji : <Lock className="w-5 h-5 text-stone-400" />}
                  </div>

                  {/* Stars counter */}
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          s <= starsEarned
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Level Info */}
                <span className="text-[11px] font-black uppercase text-amber-800 tracking-wider">
                  Level {lvl.id}
                </span>
                <h4 className="text-lg font-black text-stone-900 mt-0.5 group-hover:text-amber-800 transition-colors">
                  {lvl.title}
                </h4>
                <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                  {lvl.subtitle}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-400 font-semibold text-[11px]">
                  {lvl.questions.length} Tantangan
                </span>
                {isUnlocked ? (
                  <span className="text-amber-800 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{starsEarned > 0 ? 'Main Lagi' : 'Mulai'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                ) : (
                  <span className="text-stone-400 font-semibold flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Terkunci</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
