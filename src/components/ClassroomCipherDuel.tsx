import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Clock,
  RotateCcw,
  Users,
  Sparkles,
} from 'lucide-react';
import { convertToMorse } from '../utils/ciphers';

interface Question {
  id: number;
  cipherType: 'rumput' | 'kotak' | 'morse' | 'semafor';
  questionText: string;
  cipherInput: string;
  correctAnswer: string;
  options: string[];
}

const DUEL_QUESTIONS: Question[] = [
  {
    id: 1,
    cipherType: 'rumput',
    questionText: 'Pecahkan Sandi Rumput berikut:',
    cipherInput: 'siaga',
    correctAnswer: 'SIAGA',
    options: ['SIAGA', 'SAPA', 'SETIA', 'PANDU'],
  },
  {
    id: 2,
    cipherType: 'morse',
    questionText: 'Apa terjemahan Sandi Morse berikut:',
    cipherInput: 'pandu',
    correctAnswer: 'PANDU',
    options: ['PANDU', 'PRAJA', 'PANCASILA', 'PATROLI'],
  },
  {
    id: 3,
    cipherType: 'kotak',
    questionText: 'Baca simbol Sandi Kotak berikut:',
    cipherInput: 'regu',
    correctAnswer: 'REGU',
    options: ['REGU', 'RUSA', 'RAWA', 'RIMBA'],
  },
  {
    id: 4,
    cipherType: 'rumput',
    questionText: 'Terjemahkan Sandi Rumput berikut:',
    cipherInput: 'bantu',
    correctAnswer: 'BANTU',
    options: ['BANTU', 'BAKTI', 'BANGSA', 'BERANI'],
  },
  {
    id: 5,
    cipherType: 'kotak',
    questionText: 'Apa kata rahasia Sandi Kotak ini:',
    cipherInput: 'kemah',
    correctAnswer: 'KEMAH',
    options: ['KEMAH', 'KARYA', 'KILAT', 'KORSA'],
  },
  {
    id: 6,
    cipherType: 'morse',
    questionText: 'Dengarkan/baca isyarat morse ini:',
    cipherInput: 'api',
    correctAnswer: 'API',
    options: ['API', 'ASA', 'ALAM', 'AKAR'],
  },
];

export const ClassroomCipherDuel: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const team1Name = 'Regu Rajawali';
  const team2Name = 'Regu Melati';
  const [timeLeft, setTimeLeft] = useState(15);
  const [roundWinner, setRoundWinner] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentQ = DUEL_QUESTIONS[currentQIndex];

  // Timer countdown per question
  useEffect(() => {
    if (isGameOver || roundWinner) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQIndex, isGameOver, roundWinner]);

  const handleTimeOut = () => {
    setRoundWinner('WAKTU HABIS!');
    setTimeout(nextQuestion, 1500);
  };

  const handleTeamAnswer = (team: 1 | 2, selectedOption: string) => {
    if (roundWinner || isGameOver) return;

    if (selectedOption === currentQ.correctAnswer) {
      if (team === 1) {
        setTeam1Score((s) => s + 10);
        setRoundWinner(`${team1Name} Benar (+10)!`);
      } else {
        setTeam2Score((s) => s + 10);
        setRoundWinner(`${team2Name} Benar (+10)!`);
      }

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: team === 1 ? 0.25 : 0.75, y: 0.6 },
      });
    } else {
      if (team === 1) {
        setTeam1Score((s) => Math.max(0, s - 5));
        setRoundWinner(`${team1Name} Salah (-5)!`);
      } else {
        setTeam2Score((s) => Math.max(0, s - 5));
        setRoundWinner(`${team2Name} Salah (-5)!`);
      }
    }

    setTimeout(nextQuestion, 1400);
  };

  const nextQuestion = () => {
    setRoundWinner(null);
    if (currentQIndex + 1 < DUEL_QUESTIONS.length) {
      setCurrentQIndex((idx) => idx + 1);
      setTimeLeft(15);
    } else {
      setIsGameOver(true);
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
      });
    }
  };

  const resetGame = () => {
    setCurrentQIndex(0);
    setTeam1Score(0);
    setTeam2Score(0);
    setTimeLeft(15);
    setRoundWinner(null);
    setIsGameOver(false);
  };

  return (
    <div className="w-full bg-stone-900 rounded-3xl border-2 border-stone-800 shadow-2xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden select-none">
      {/* 75" PID Top Banner: Title & Match Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 border border-amber-500/40 rounded-2xl text-amber-400">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                Lomba Regu Pramuka
              </span>
              <span className="text-xs text-stone-500">·</span>
              <span className="text-xs text-stone-400">Siapa Cepat & Tepat!</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Cepat Tangkas Sandi 2 Regu
            </h3>
          </div>
        </div>

        {/* Central Timer & Round Counter */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-stone-800 rounded-2xl border border-stone-700">
            <Clock className={`w-5 h-5 ${timeLeft <= 5 ? 'text-rose-500 animate-bounce' : 'text-amber-400'}`} />
            <span className="text-2xl font-black font-mono text-white">
              {timeLeft}s
            </span>
          </div>

          <div className="px-4 py-2 bg-stone-800 rounded-2xl border border-stone-700 text-xs font-bold text-stone-300">
            Soal {currentQIndex + 1} / {DUEL_QUESTIONS.length}
          </div>

          <button
            type="button"
            onClick={resetGame}
            className="p-2.5 bg-stone-800 hover:bg-stone-700 rounded-xl border border-stone-700 text-stone-300 transition-colors"
            title="Mulai Ulang Duel"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {isGameOver ? (
        /* Game Over Podium for 75" Screen */
        <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
          <Trophy className="w-24 h-24 text-amber-400 animate-bounce" />
          <h4 className="text-3xl sm:text-5xl font-black text-white">
            {team1Score > team2Score
              ? `🏆 ${team1Name} Menang!`
              : team2Score > team1Score
              ? `🏆 ${team2Name} Menang!`
              : '🤝 Hasil Imbang! Keduanya Hebat!'}
          </h4>
          <p className="text-stone-300 text-base max-w-lg">
            Skor Akhir: <strong className="text-amber-400">{team1Name} ({team1Score})</strong> vs{' '}
            <strong className="text-emerald-400">{team2Name} ({team2Score})</strong>
          </p>
          <button
            type="button"
            onClick={resetGame}
            className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl text-lg font-black shadow-xl hover:shadow-2xl transition-all cursor-pointer"
          >
            Ulang
          </button>
        </div>
      ) : (
        /* Widescreen 3-Zone Layout: Left Team Pad (40%) | Center Display (20%) | Right Team Pad (40%) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* ZONE 1 (LEFT): Team 1 Touch Answer Console (Standing at Left Side of 75" Screen) */}
          <div className="lg:col-span-3 bg-gradient-to-b from-blue-950/40 to-stone-900 rounded-2xl border-2 border-blue-500/40 p-4 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b border-blue-500/30 pb-3">
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">
                  Regu Sisi Kiri
                </span>
                <span className="text-lg font-black text-white">{team1Name}</span>
              </div>
              <span className="text-3xl font-black text-blue-400 font-mono">
                {team1Score}
              </span>
            </div>

            {/* Giant Touch Buttons for Team 1 */}
            <div className="grid grid-cols-1 gap-2.5 flex-1">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleTeamAnswer(1, opt)}
                  className="min-h-[58px] bg-stone-800/90 hover:bg-blue-600 active:scale-95 text-white font-black text-lg rounded-xl border border-stone-700 hover:border-blue-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span className="w-7 h-7 rounded-lg bg-stone-900/60 text-xs font-bold text-blue-300 flex items-center justify-center">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-blue-300/80 text-center font-medium">
              👉 Ketuk jawaban di sisi kiri layar
            </p>
          </div>

          {/* ZONE 2 (CENTER): Giant Question Board (High Contrast & Visible from 10 meters) */}
          <div className="lg:col-span-6 bg-stone-950 rounded-2xl border-2 border-amber-500/50 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[340px]">
            {roundWinner && (
              <div className="absolute inset-0 bg-stone-950/90 z-20 flex items-center justify-center backdrop-blur-xs">
                <span className="text-2xl sm:text-3xl font-black text-amber-400 animate-pulse">
                  {roundWinner}
                </span>
              </div>
            )}

            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">
              {currentQ.questionText}
            </span>

            {/* Render the actual visual cipher question */}
            <div className="my-4 p-4 bg-white/5 rounded-2xl border border-stone-800 w-full flex items-center justify-center min-h-[160px]">
              {currentQ.cipherType === 'rumput' && (
                <div className="font-sandi-rumput text-6xl sm:text-7xl text-emerald-400 py-4 select-none tracking-normal">
                  {currentQ.cipherInput}
                </div>
              )}

              {currentQ.cipherType === 'kotak' && (
                <div className="font-sandi-kotak text-6xl sm:text-7xl text-slate-200 py-4 select-none tracking-[0.25em]">
                  {currentQ.cipherInput}
                </div>
              )}

              {currentQ.cipherType === 'morse' && (
                <div className="space-y-3">
                  <div className="text-3xl sm:text-4xl font-mono font-black text-amber-400 tracking-widest">
                    {convertToMorse(currentQ.cipherInput)}
                  </div>
                  <span className="text-xs text-stone-400 font-semibold block">
                    (Titik & Garis Morse)
                  </span>
                </div>
              )}
            </div>

            <div className="text-xs text-stone-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Regu tercepat dan tepat mendapatkan 10 poin!</span>
            </div>
          </div>

          {/* ZONE 3 (RIGHT): Team 2 Touch Answer Console (Standing at Right Side of 75" Screen) */}
          <div className="lg:col-span-3 bg-gradient-to-b from-emerald-950/40 to-stone-900 rounded-2xl border-2 border-emerald-500/40 p-4 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
                  Regu Sisi Kanan
                </span>
                <span className="text-lg font-black text-white">{team2Name}</span>
              </div>
              <span className="text-3xl font-black text-emerald-400 font-mono">
                {team2Score}
              </span>
            </div>

            {/* Giant Touch Buttons for Team 2 */}
            <div className="grid grid-cols-1 gap-2.5 flex-1">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleTeamAnswer(2, opt)}
                  className="min-h-[58px] bg-stone-800/90 hover:bg-emerald-600 active:scale-95 text-white font-black text-lg rounded-xl border border-stone-700 hover:border-emerald-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <span className="w-7 h-7 rounded-lg bg-stone-900/60 text-xs font-bold text-emerald-300 flex items-center justify-center">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-emerald-300/80 text-center font-medium">
              👈 Ketuk jawaban di sisi kanan layar
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
