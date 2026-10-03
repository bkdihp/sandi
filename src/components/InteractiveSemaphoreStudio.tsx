import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Compass, RefreshCw } from 'lucide-react';
import {
  ALL_SEMAPHORE_POSES,
  getSemaphorePose,
  getArmAnglesForView,
  SemaphorePose,
} from '../utils/semaphoreData';

export const InteractiveSemaphoreStudio: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [viewPerspective, setViewPerspective] = useState<'front' | 'back'>('front');
  const [quizMode, setQuizMode] = useState(false);
  const [quizTarget, setQuizTarget] = useState<SemaphorePose>(ALL_SEMAPHORE_POSES[0]);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  const displayedPose = quizMode ? quizTarget : getSemaphorePose(selectedLetter);
  const { rightArmScreenDeg, leftArmScreenDeg } = getArmAnglesForView(displayedPose, viewPerspective);

  const handleLetterSelect = (char: string) => {
    setSelectedLetter(char);
    if (quizMode) {
      if (char === quizTarget.char) {
        setQuizScore((s) => s + 10);
        setQuizFeedback('Benar! +10');
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.6 },
        });
        setTimeout(() => {
          pickRandomQuiz();
          setQuizFeedback(null);
        }, 800);
      } else {
        setQuizFeedback(`Coba lagi! Pilihan: ${char}`);
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

  const compassAngles = [0, 45, 90, 135, 180, 225, 270, 315];
  const isAngleActive = (deg: number) => {
    const rMatch = Math.abs((rightArmScreenDeg % 360) - deg) < 5;
    const lMatch = Math.abs((leftArmScreenDeg % 360) - deg) < 5;
    return rMatch || lMatch;
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
              Formasi 8 penjuru mata angin Pramuka Indonesia
            </p>
          </div>
        </div>

        {/* View & Mode Toggles */}
        <div className="flex items-center gap-2">
          {/* Flip Perspective Button */}
          <button
            type="button"
            onClick={() => setViewPerspective((p) => (p === 'front' ? 'back' : 'front'))}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              viewPerspective === 'back'
                ? 'bg-amber-600 border-amber-500 text-white'
                : 'bg-stone-800 border-stone-700 text-stone-300 hover:text-white'
            }`}
            title="Ubah sudut pandang depan/belakang"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{viewPerspective === 'front' ? 'Tampak Depan' : 'Tampak Belakang'}</span>
          </button>

          {/* Mode Switcher */}
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
            Kuis Tebak {quizMode && `(${quizScore})`}
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Natural Scout Avatar Stage */}
        <div className="lg:col-span-5 bg-stone-950 rounded-2xl border border-stone-800/80 p-5 flex flex-col items-center justify-center relative min-h-[340px]">
          {quizMode && (
            <div className="absolute top-3 left-3 right-3 bg-stone-900/90 border border-stone-700 rounded-xl p-2.5 flex items-center justify-between z-10">
              <span className="text-xs text-stone-300">
                Pilih Huruf untuk Gerakan Ini
              </span>
              {quizFeedback && (
                <span className="text-xs font-bold text-emerald-400">
                  {quizFeedback}
                </span>
              )}
            </div>
          )}

          {/* Perspective Indicator */}
          <div className="absolute top-3 right-3 text-[11px] font-mono text-stone-500">
            {viewPerspective === 'front' ? 'Menghadap Audiens' : 'Membalik Badan'}
          </div>

          {/* SVG Animated Scout Avatar */}
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center mt-3 overflow-visible">
            <svg viewBox="-55 -55 350 340" className="w-full h-full overflow-visible drop-shadow-md">
              <defs>
                <linearGradient id="studioPoleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
              </defs>

              {/* 8-Point Compass Reference Ring */}
              <circle cx="120" cy="115" r="92" fill="none" stroke="#334155" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.4" />

              {/* Compass Nodes */}
              {compassAngles.map((ang) => {
                const rad = ((ang - 90) * Math.PI) / 180;
                const cx = 120 + 92 * Math.cos(rad);
                const cy = 115 + 92 * Math.sin(rad);
                const active = isAngleActive(ang);
                return (
                  <circle
                    key={ang}
                    cx={cx}
                    cy={cy}
                    r={active ? '5' : '3'}
                    fill={active ? '#EF4444' : '#475569'}
                    stroke={active ? '#FCD34D' : 'none'}
                    strokeWidth={active ? '2' : '0'}
                  />
                );
              })}

              {/* Scout Body */}
              {viewPerspective === 'front' ? (
                <g id="scout-body-front">
                  {/* Boots */}
                  <ellipse cx="112" cy="188" rx="7" ry="4" fill="#291508" />
                  <ellipse cx="128" cy="188" rx="7" ry="4" fill="#291508" />
                  {/* Pants */}
                  <rect x="108" y="146" width="9" height="40" rx="3" fill="#451A03" />
                  <rect x="123" y="146" width="9" height="40" rx="3" fill="#451A03" />
                  {/* Belt */}
                  <rect x="106" y="141" width="28" height="6" rx="1.5" fill="#1C1917" />
                  <rect x="117" y="140" width="6" height="8" rx="1" fill="#F59E0B" />
                  {/* Shirt */}
                  <rect x="105" y="98" width="30" height="44" rx="5" fill="#92400E" />
                  <rect x="108" y="112" width="9" height="10" rx="2" fill="#78350F" />
                  <rect x="123" y="112" width="9" height="10" rx="2" fill="#78350F" />
                  {/* Hasduk Merah-Putih & Ring */}
                  <polygon points="112,98 128,98 120,118" fill="#F8FAFC" />
                  <polygon points="114,98 126,98 120,115" fill="#DC2626" />
                  <ellipse cx="120" cy="116" rx="3.5" ry="2.5" fill="#F59E0B" />
                  <path d="M 119 118 L 118 132" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 121 118 L 122 132" stroke="#F8FAFC" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Neck */}
                  <rect x="116" y="87" width="8" height="12" rx="2" fill="#FBBF24" />
                  {/* Face */}
                  <ellipse cx="120" cy="74" rx="14" ry="15" fill="#FCD34D" />
                  <circle cx="115" cy="73" r="1.6" fill="#1C1917" />
                  <circle cx="125" cy="73" r="1.6" fill="#1C1917" />
                  <path d="M 117 79 Q 120 83 123 79" fill="none" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" />
                  {/* Beret */}
                  <ellipse cx="120" cy="62" rx="17" ry="7" fill="#451A03" />
                  <path d="M 103 62 Q 120 49 137 62 Q 139 67 131 68 Q 118 69 104 67 Z" fill="#78350F" />
                  <circle cx="111" cy="63" r="2.5" fill="#F59E0B" />
                </g>
              ) : (
                <g id="scout-body-back">
                  {/* Boots Back */}
                  <ellipse cx="112" cy="188" rx="7" ry="4" fill="#1C1917" />
                  <ellipse cx="128" cy="188" rx="7" ry="4" fill="#1C1917" />
                  {/* Pants Back */}
                  <rect x="108" y="146" width="9" height="40" rx="3" fill="#451A03" />
                  <rect x="123" y="146" width="9" height="40" rx="3" fill="#451A03" />
                  {/* Belt Back */}
                  <rect x="106" y="141" width="28" height="6" rx="1.5" fill="#1C1917" />
                  {/* Shirt Back */}
                  <rect x="105" y="98" width="30" height="44" rx="5" fill="#92400E" />
                  <polygon points="110,98 130,98 120,122" fill="#F8FAFC" />
                  <polygon points="112,98 128,98 120,119" fill="#DC2626" />
                  {/* Neck Back */}
                  <rect x="116" y="87" width="8" height="12" rx="2" fill="#FBBF24" />
                  <ellipse cx="120" cy="74" rx="14" ry="15" fill="#F59E0B" />
                  <path d="M 108 77 Q 120 86 132 77 Z" fill="#291508" />
                  {/* Beret Back */}
                  <ellipse cx="120" cy="62" rx="17" ry="7" fill="#451A03" />
                  <path d="M 103 62 Q 120 49 137 62 Q 139 67 131 68 Q 118 69 104 67 Z" fill="#78350F" />
                </g>
              )}

              {/* FIGURE'S RIGHT ARM & FLAG */}
              <g
                style={{
                  transformOrigin: '108px 105px',
                  transform: `rotate(${rightArmScreenDeg}deg)`,
                  transition: 'transform 260ms cubic-bezier(0.34, 1.3, 0.64, 1)',
                }}
              >
                <line x1="108" y1="105" x2="108" y2="40" stroke="#92400E" strokeWidth="5.5" strokeLinecap="round" />
                <circle cx="108" cy="40" r="3.5" fill="#FCD34D" />
                <line x1="108" y1="44" x2="108" y2="-18" stroke="url(#studioPoleGrad)" strokeWidth="3.2" strokeLinecap="round" />
                <polygon points="108,-18 58,-18 108,30" fill="#DC2626" />
                <polygon points="58,-18 58,30 108,30" fill="#FBBF24" />
                <polygon points="108,-18 58,-18 58,30 108,30" fill="none" stroke="#F59E0B" strokeWidth="0.8" opacity="0.6" />
              </g>

              {/* FIGURE'S LEFT ARM & FLAG */}
              <g
                style={{
                  transformOrigin: '132px 105px',
                  transform: `rotate(${leftArmScreenDeg}deg)`,
                  transition: 'transform 260ms cubic-bezier(0.34, 1.3, 0.64, 1)',
                }}
              >
                <line x1="132" y1="105" x2="132" y2="40" stroke="#92400E" strokeWidth="5.5" strokeLinecap="round" />
                <circle cx="132" cy="40" r="3.5" fill="#FCD34D" />
                <line x1="132" y1="44" x2="132" y2="-18" stroke="url(#studioPoleGrad)" strokeWidth="3.2" strokeLinecap="round" />
                <polygon points="132,-18 182,-18 132,30" fill="#DC2626" />
                <polygon points="182,-18 182,30 132,30" fill="#FBBF24" />
                <polygon points="132,-18 182,-18 182,30 132,30" fill="none" stroke="#F59E0B" strokeWidth="0.8" opacity="0.6" />
              </g>
            </svg>
          </div>

          {/* Active Letter Badge (Hidden during quiz mode to avoid giving answer away) */}
          {!quizMode && (
            <div className="mt-3 text-center">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-stone-900 rounded-xl border border-stone-800">
                <span className="text-3xl font-black text-amber-400 font-mono">
                  {displayedPose.char}
                </span>
                <div className="text-left text-xs text-stone-300">
                  <span className="block font-bold text-stone-200">{displayedPose.kunciName}</span>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {displayedPose.rightClock} &amp; {displayedPose.leftClock}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Clean Letter Grid */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          <div className="text-xs text-stone-400 font-medium">
            {quizMode ? 'Pilih huruf yang cocok dengan formasi di atas:' : 'Pilih huruf atau angka untuk melihat gerakan semafor:'}
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-7 gap-2">
            {ALL_SEMAPHORE_POSES.filter((p) => p.char !== ' ').map((pose) => {
              const isSelected = (!quizMode && selectedLetter === pose.char) || (quizMode && selectedLetter === pose.char);
              return (
                <button
                  key={pose.char}
                  type="button"
                  onClick={() => handleLetterSelect(pose.char)}
                  className={`h-11 rounded-xl font-mono font-bold text-base flex items-center justify-center border transition-all cursor-pointer ${
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

          {!quizMode && (
            <div className="p-3 bg-stone-950/60 rounded-xl border border-stone-800 text-xs text-stone-400 leading-relaxed">
              <span className="font-semibold text-stone-200 mr-1.5">Penjelasan Posisi:</span>
              {displayedPose.desc}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
