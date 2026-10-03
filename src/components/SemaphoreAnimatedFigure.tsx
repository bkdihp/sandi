import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Gauge } from 'lucide-react';
import { getSemaphorePose, REST_POSE, SemaphorePose } from '../utils/semaphoreData';

interface SemaphoreAnimatedFigureProps {
  text: string;
  className?: string;
  compact?: boolean;
}

export const SemaphoreAnimatedFigure: React.FC<SemaphoreAnimatedFigureProps> = ({
  text,
  className = '',
  compact = false,
}) => {
  // Normalize characters from input (alphanumeric and spaces)
  const sequence = React.useMemo(() => {
    const cleaned = (text || 'PRAMUKA').toUpperCase().replace(/[^A-Z0-9\s]/g, '');
    return cleaned.length > 0 ? cleaned.split('') : [' '];
  }, [text]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState<number>(1000); // 1000ms default (1x)
  const timerRef = useRef<number | null>(null);

  // Keep index within bounds if sequence changes
  useEffect(() => {
    if (currentIndex >= sequence.length) {
      setCurrentIndex(0);
    }
  }, [sequence, currentIndex]);

  // Animation playback loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev + 1 >= sequence.length) {
          return 0; // Loop smoothly
        }
        return prev + 1;
      });
    }, speedMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speedMs, sequence.length]);

  const currentChar = sequence[currentIndex] || ' ';
  const currentPose: SemaphorePose = currentChar === ' ' ? REST_POSE : getSemaphorePose(currentChar);

  const handleTogglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  const handleStepNext = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev + 1 < sequence.length ? prev + 1 : 0));
  };

  const handleStepPrev = () => {
    setIsPlaying(false);
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : sequence.length - 1));
  };

  const speedOptions = [
    { label: '0.5x', ms: 1800 },
    { label: '1x', ms: 1000 },
    { label: '1.5x', ms: 650 },
    { label: '2x', ms: 400 },
  ];

  return (
    <div className={`bg-stone-900 text-stone-100 rounded-2xl border border-stone-800 p-4 sm:p-5 select-none shadow-sm ${className}`}>
      {/* Header bar: Title & Speed Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-stone-800/80">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <h3 className="text-sm font-semibold text-stone-100 tracking-tight">
            Simulasi Gerakan Semafor
          </h3>
          <span className="text-xs text-stone-400 font-mono">
            [{currentIndex + 1}/{sequence.length}]
          </span>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center gap-1.5 bg-stone-950 px-2 py-1 rounded-xl border border-stone-800 text-xs">
          <Gauge className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="text-[11px] text-stone-400 font-medium mr-1">Kecepatan:</span>
          {speedOptions.map((opt) => (
            <button
              key={opt.label}
              type="button"
              onClick={() => setSpeedMs(opt.ms)}
              className={`px-2 py-0.5 rounded-md font-mono text-xs font-bold transition-all cursor-pointer ${
                speedMs === opt.ms
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Avatar Stage & Active Letter Display */}
      <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-12'} gap-4 items-center py-4`}>
        {/* Left Stage: SVG Single Animated Scout Figure */}
        <div className={`${compact ? 'col-span-1' : 'sm:col-span-7'} flex flex-col items-center justify-center bg-stone-950/70 rounded-xl p-3 border border-stone-800/60 relative min-h-[220px]`}>
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
              {/* Compass Reference Ring */}
              <circle
                cx="100"
                cy="100"
                r="78"
                fill="none"
                stroke="#334155"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.6"
              />

              {/* 8 Clock Direction markers */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => {
                const rad = ((ang - 90) * Math.PI) / 180;
                const x = 100 + 78 * Math.cos(rad);
                const y = 100 + 78 * Math.sin(rad);
                return (
                  <circle
                    key={ang}
                    cx={x}
                    cy={y}
                    r="2.5"
                    fill="#64748B"
                    opacity="0.7"
                  />
                );
              })}

              {/* Scout Figure Body */}
              <circle cx="100" cy="72" r="14" fill="#F59E0B" /> {/* Face */}
              <rect x="91" y="60" width="18" height="6" rx="2" fill="#92400E" /> {/* Cap */}
              <rect x="89" y="88" width="22" height="42" rx="4" fill="#78350F" /> {/* Shirt */}
              <rect x="90" y="130" width="8" height="30" fill="#451A03" /> {/* Left leg */}
              <rect x="102" y="130" width="8" height="30" fill="#451A03" /> {/* Right leg */}

              {/* LEFT ARM & FLAG (viewer's left = person's right) */}
              <g
                style={{
                  transformOrigin: '92px 96px',
                  transform: `rotate(${currentPose.leftAngleDeg}deg)`,
                  transition: `transform ${Math.min(speedMs * 0.45, 280)}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                {/* Staff */}
                <line x1="92" y1="96" x2="92" y2="38" stroke="#E2E8F0" strokeWidth="3.5" strokeLinecap="round" />
                {/* Diagonal Split Semaphore Flag (Red / Yellow) */}
                <polygon points="92,38 52,38 52,72 92,72" fill="#DC2626" />
                <polygon points="52,38 92,72 52,72" fill="#FBBF24" />
              </g>

              {/* RIGHT ARM & FLAG (viewer's right = person's left) */}
              <g
                style={{
                  transformOrigin: '108px 96px',
                  transform: `rotate(${currentPose.rightAngleDeg}deg)`,
                  transition: `transform ${Math.min(speedMs * 0.45, 280)}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                }}
              >
                {/* Staff */}
                <line x1="108" y1="96" x2="108" y2="38" stroke="#E2E8F0" strokeWidth="3.5" strokeLinecap="round" />
                {/* Diagonal Split Semaphore Flag (Red / Yellow) */}
                <polygon points="108,38 148,38 148,72 108,72" fill="#DC2626" />
                <polygon points="148,38 108,72 148,72" fill="#FBBF24" />
              </g>
            </svg>
          </div>
        </div>

        {/* Right Stage: Current Character Details */}
        <div className={`${compact ? 'col-span-1' : 'sm:col-span-5'} flex flex-col items-center sm:items-start text-center sm:text-left space-y-2`}>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-xl bg-red-600/90 text-white font-mono font-black text-3xl flex items-center justify-center shadow-xs border border-red-500/50">
              {currentChar === ' ' ? '⎵' : currentChar}
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-red-400 font-bold block">
                {currentChar === ' ' ? 'Spasi / Siap' : `Huruf ${currentChar}`}
              </span>
              <span className="text-xs text-stone-300 font-medium">
                {currentPose.leftClock} · {currentPose.rightClock}
              </span>
            </div>
          </div>

          <p className="text-xs text-stone-400 leading-relaxed font-normal">
            {currentPose.desc}
          </p>

          {/* Stepper & Playback Toolbar */}
          <div className="pt-2 flex items-center gap-1.5 w-full justify-center sm:justify-start">
            <button
              type="button"
              onClick={handleTogglePlay}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                  : 'bg-red-600 hover:bg-red-700 text-white shadow-xs'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Jeda</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Putar</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleStepPrev}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
              title="Karakter Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleStepNext}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
              title="Karakter Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
              title="Ulangi dari Awal"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Letter Sequence Scrubber */}
      <div className="pt-3 border-t border-stone-800/80">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
          {sequence.map((char, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={`${char}-${idx}`}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`min-w-[28px] h-8 px-1.5 rounded-lg font-mono font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-xs scale-105 ring-1 ring-red-400'
                    : 'bg-stone-800/70 hover:bg-stone-700 text-stone-300'
                }`}
                title={`Lihat formasi '${char}'`}
              >
                {char === ' ' ? '⎵' : char}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
