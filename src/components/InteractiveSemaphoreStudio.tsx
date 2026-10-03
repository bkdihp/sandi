import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Compass } from 'lucide-react';
import { ALL_SEMAPHORE_POSES, getSemaphorePose, SemaphorePose } from '../utils/semaphoreData';

export const InteractiveSemaphoreStudio: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [quizMode, setQuizMode] = useState(false);
  const [quizTarget, setQuizTarget] = useState<SemaphorePose>(ALL_SEMAPHORE_POSES[0]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const currentPose = getSemaphorePose(selectedLetter);

  const handleLetterSelect = (char: string) => {
    setSelectedLetter(char);
    if (quizMode) {
      if (char === quizTarget.char) {
        setQuizScore((s) => s + 10);
        setQuizFeedback('Tepat');
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.6 },
        });
        setTimeout(() => {
          pickRandomQuiz();
          setQuizFeedback(null);
        }, 1000);
      } else {
        setQuizFeedback(`Huruf ${char}`);
      }
    }
  };

  const pickRandomQuiz = () => {
    const lettersOnly = ALL_SEMAPHORE_POSES.filter((p) => p.char >= 'A' && p.char <= 'Z');
    const next = lettersOnly[Math.floor(Math.random() * lettersOnly.length)];
    setQuizTarget(next);
  };

  const startQuiz = () => {
    setQuizMode(true);
    setQuizScore(0);
    setQuizFeedback(null);
    pickRandomQuiz();
  };

  return (
    <div className="w-full bg-stone-900 rounded-3xl border border-stone-800 shadow-xl p-4 sm:p-6 lg:p-7 text-white select-none">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-red-600/20 border border-red-500/30 rounded-xl text-red-400">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Studio Isyarat Semafor
            </h3>
            <p className="text-xs text-stone-400">
              Formasi 8 arah putaran bendera semafor
            </p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQuizMode(false)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              !quizMode
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            Eksplorasi
          </button>
          <button
            type="button"
            onClick={startQuiz}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              quizMode
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            Tebak Formasi {quizMode && `(${quizScore})`}
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Avatar */}
        <div className="lg:col-span-5 bg-stone-950 rounded-2xl border border-stone-800/80 p-5 flex flex-col items-center justify-center relative min-h-[320px]">
          {quizMode && (
            <div className="absolute top-3 left-3 right-3 bg-stone-900/90 border border-stone-700 rounded-xl p-2.5 flex items-center justify-between z-10">
              <span className="text-xs text-stone-300">
                Pilih Huruf:{' '}
                <strong className="text-xl font-bold text-amber-400 font-mono ml-1">
                  {quizTarget.char}
                </strong>
              </span>
              {quizFeedback && (
                <span className="text-xs font-bold text-emerald-400">
                  {quizFeedback}
                </span>
              )}
            </div>
          )}

          {/* SVG Animated Avatar */}
          <div className="relative w-56 h-56 flex items-center justify-center mt-3">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
              <circle cx="100" cy="100" r="78" fill="none" stroke="#334155" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

              {/* Scout Body */}
              <circle cx="100" cy="72" r="14" fill="#F59E0B" />
              <rect x="91" y="60" width="18" height="6" rx="2" fill="#92400E" />
              <rect x="89" y="88" width="22" height="42" rx="4" fill="#78350F" />
              <rect x="90" y="130" width="8" height="30" fill="#451A03" />
              <rect x="102" y="130" width="8" height="30" fill="#451A03" />

              {/* LEFT ARM & FLAG */}
              <g
                style={{
                  transformOrigin: '92px 96px',
                  transform: `rotate(${currentPose.leftAngleDeg}deg)`,
                  transition: 'transform 260ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <line x1="92" y1="96" x2="92" y2="38" stroke="#E2E8F0" strokeWidth="3.5" strokeLinecap="round" />
                <polygon points="92,38 52,38 52,72 92,72" fill="#DC2626" />
                <polygon points="52,38 92,72 52,72" fill="#FBBF24" />
              </g>

              {/* RIGHT ARM & FLAG */}
              <g
                style={{
                  transformOrigin: '108px 96px',
                  transform: `rotate(${currentPose.rightAngleDeg}deg)`,
                  transition: 'transform 260ms cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <line x1="108" y1="96" x2="108" y2="38" stroke="#E2E8F0" strokeWidth="3.5" strokeLinecap="round" />
                <polygon points="108,38 148,38 148,72 108,72" fill="#DC2626" />
                <polygon points="148,38 108,72 148,72" fill="#FBBF24" />
              </g>
            </svg>
          </div>

          {/* Active Letter Badge */}
          <div className="mt-3 text-center">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-stone-900 rounded-xl border border-stone-800">
              <span className="text-3xl font-black text-amber-400 font-mono">
                {currentPose.char}
              </span>
              <div className="text-left text-xs text-stone-300">
                <span className="block font-medium">{currentPose.leftClock} · {currentPose.rightClock}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clean Letter Grid */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          <div className="grid grid-cols-6 sm:grid-cols-7 gap-2">
            {ALL_SEMAPHORE_POSES.filter((p) => p.char !== ' ').map((pose) => {
              const isSelected = selectedLetter === pose.char;
              return (
                <button
                  key={pose.char}
                  type="button"
                  onClick={() => handleLetterSelect(pose.char)}
                  className={`h-11 rounded-lg font-mono font-bold text-base flex items-center justify-center border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-red-600 border-red-500 text-white shadow-xs scale-105'
                      : 'bg-stone-800/80 hover:bg-stone-700 border-stone-700/80 text-stone-200'
                  }`}
                >
                  {pose.char}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
