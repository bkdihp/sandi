import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Sliders,
  RefreshCw,
  Maximize2,
  Minimize2,
  Repeat,
  Repeat1,
  CircleDot,
  Check,
  CheckCheck,
} from 'lucide-react';
import {
  getSemaphorePose,
  REST_POSE,
  getArmAnglesForView,
  SemaphorePose,
} from '../utils/semaphoreData';

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
  // Normalize characters from input (A-Z, 0-9, and spaces)
  // Aturan Isyarat Semafor Lapangan:
  // Selalu diawali dengan posisi bersiap/istirahat (spasi) dan diakhiri dengan posisi istirahat (spasi).
  // Hal ini memastikan bendera tidak terus tergantung di atas saat kata selesai (misal huruf terakhir U).
  const sequence = useMemo(() => {
    const raw = (text && text.trim() ? text : 'PRAMUKA').toUpperCase();
    const cleaned = raw.replace(/[^A-Z0-9\s]/g, '');
    const tokens = cleaned.length > 0 ? cleaned.split('') : ['P', 'R', 'A', 'M', 'U', 'K', 'A'];
    // Gabungkan spasi berturut-turut menjadi satu spasi
    const merged = tokens.filter((ch, i, arr) => !(ch === ' ' && arr[i - 1] === ' '));
    // Buang spasi di awal atau akhir jika pengguna mengetik spasi berlebih
    while (merged.length > 0 && merged[0] === ' ') merged.shift();
    while (merged.length > 0 && merged[merged.length - 1] === ' ') merged.pop();

    // Selalu pastikan diawali dan diakhiri dengan posisi istirahat / spasi (' ')
    return [' ', ...merged, ' '];
  }, [text]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false); // Default false: stop at last letter
  const [speedMs, setSpeedMs] = useState<number>(1000); // 1000ms default
  const [viewPerspective, setViewPerspective] = useState<'front' | 'back'>('front');
  const [showSpeedSlider, setShowSpeedSlider] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  // Sync index if sequence length drops
  useEffect(() => {
    if (currentIndex >= sequence.length) {
      setCurrentIndex(0);
    }
  }, [sequence, currentIndex]);

  // Animation playback interval: stops at last letter (posisi istirahat) if isLooping is false!
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev + 1 >= sequence.length) {
          if (isLooping) {
            return 0; // Seamless loop kembali ke posisi bersiap
          } else {
            setIsPlaying(false);
            return prev; // Berhenti dengan tenang pada posisi istirahat akhir!
          }
        }
        return prev + 1;
      });
    }, speedMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isLooping, speedMs, sequence.length]);

  // Sync with document fullscreenchange
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      setIsFullscreen(true);
      if (containerRef.current && containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
    } else {
      setIsFullscreen(false);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const isStartIndex = currentIndex === 0;
  const isEndIndex = currentIndex === sequence.length - 1;
  const isAtLastCharacter = currentIndex >= sequence.length - 1;

  const currentChar = sequence[currentIndex] || ' ';
  const currentPose: SemaphorePose = currentChar === ' ' ? REST_POSE : getSemaphorePose(currentChar);
  const { rightArmScreenDeg, leftArmScreenDeg } = getArmAnglesForView(currentPose, viewPerspective);

  // Arm transition speed based on animation tempo
  const armTransitionMs = Math.max(180, Math.min(speedMs * 0.45, 340));

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      // Jika sudah di karakter akhir, mulai putar kembali dari awal (posisi siap)
      if (isAtLastCharacter && !isLooping) {
        setCurrentIndex(0);
      }
      setIsPlaying(true);
    }
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

  const handleToggleView = () => {
    setViewPerspective((prev) => (prev === 'front' ? 'back' : 'front'));
  };

  const speedPresets = [
    { label: '0.5x', ms: 1800 },
    { label: '1x', ms: 1000 },
    { label: '1.5x', ms: 650 },
    { label: '2x', ms: 400 },
  ];

  // 8 Clock dial angles for visual compass guide
  const compassAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  // Check if a compass marker is active in the current pose
  const isAngleActive = (deg: number) => {
    const rMatch = Math.abs((rightArmScreenDeg % 360) - deg) < 5;
    const lMatch = Math.abs((leftArmScreenDeg % 360) - deg) < 5;
    return rMatch || lMatch;
  };

  return (
    <div
      ref={containerRef}
      className={`bg-stone-900 text-stone-100 rounded-2xl border border-stone-800 p-4 sm:p-5 select-none shadow-sm transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none border-0 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-stone-950'
          : className
      }`}
    >
      {/* 1. Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-800">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
          <h3 className="text-sm font-bold text-stone-100 tracking-tight">
            Simulasi Isyarat Semafor
          </h3>
          <span className="text-xs text-stone-400 font-mono">
            {currentIndex + 1}/{sequence.length}
          </span>
          {isAtLastCharacter && !isPlaying && !isLooping && (
            <span className="text-[10px] font-bold uppercase bg-amber-950/80 text-amber-400 border border-amber-800/80 px-2 py-0.5 rounded-md">
              Selesai
            </span>
          )}
        </div>

        {/* View Perspective, Loop Switch & Speed Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Loop / Replay Switch */}
          <button
            type="button"
            onClick={() => setIsLooping((l) => !l)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              isLooping
                ? 'bg-amber-600/30 border-amber-500 text-amber-300 font-bold'
                : 'bg-stone-800/80 border-stone-700 text-stone-400 hover:text-stone-200'
            }`}
            title={isLooping ? 'Putar Berulang: Aktif (Loop terus menerus)' : 'Putar 1 Kali (Berhenti di huruf terakhir)'}
          >
            {isLooping ? <Repeat className="w-3.5 h-3.5 text-amber-400" /> : <Repeat1 className="w-3.5 h-3.5 text-stone-400" />}
            <span>{isLooping ? 'Ulang' : 'Sekali'}</span>
          </button>

          {/* Flip Perspective Button */}
          <button
            type="button"
            onClick={handleToggleView}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              viewPerspective === 'back'
                ? 'bg-amber-600 border-amber-500 text-white shadow-2xs'
                : 'bg-stone-800 border-stone-700 text-stone-300 hover:text-white hover:bg-stone-700'
            }`}
            title="Ubah sudut pandang depan/belakang"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{viewPerspective === 'front' ? 'Depan' : 'Belakang'}</span>
          </button>

          {/* Speed Presets */}
          <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800 text-xs">
            <Gauge className="w-3.5 h-3.5 text-stone-500 ml-1 shrink-0" />
            {speedPresets.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setSpeedMs(opt.ms)}
                className={`px-2 py-0.5 rounded font-mono text-xs font-bold transition-all cursor-pointer ${
                  speedMs === opt.ms
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setShowSpeedSlider(!showSpeedSlider)}
              className={`p-1 rounded text-stone-400 hover:text-white transition-colors cursor-pointer ${
                showSpeedSlider ? 'bg-stone-800 text-amber-400' : ''
              }`}
              title="Atur tempo kustom"
            >
              <Sliders className="w-3 h-3" />
            </button>
          </div>

          {/* Fullscreen Toggle Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 hover:text-white transition-all cursor-pointer"
            title={isFullscreen ? 'Keluar dari Layar Penuh' : 'Tampilkan Layar Penuh'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-amber-400" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Speed Slider Dropdown */}
      {showSpeedSlider && (
        <div className="mt-2.5 p-2 bg-stone-950 rounded-xl border border-stone-800/80 flex items-center gap-3 text-xs">
          <span className="text-stone-400 font-medium">Tempo:</span>
          <input
            type="range"
            min={300}
            max={2200}
            step={50}
            value={speedMs}
            onChange={(e) => setSpeedMs(Number(e.target.value))}
            className="flex-1 accent-red-600 cursor-pointer"
          />
          <span className="font-mono text-xs text-amber-400 font-bold min-w-[55px] text-right">
            {(speedMs / 1000).toFixed(2)}s/huruf
          </span>
        </div>
      )}

      {/* 2. Main Avatar Arena (Expansive Unclipped ViewBox) */}
      <div className={`grid ${compact && !isFullscreen ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-12'} gap-4 sm:gap-6 items-center py-3.5 flex-1`}>
        {/* Left Column: Natural Animated Scout Vector Stage */}
        <div className={`${compact && !isFullscreen ? 'col-span-1' : 'sm:col-span-7'} flex flex-col items-center justify-center bg-stone-950/80 rounded-2xl p-4 sm:p-6 border border-stone-800/80 relative min-h-[280px] sm:min-h-[340px] overflow-visible`}>
          {/* Perspective Label */}
          <div className="absolute top-2.5 left-3 text-[11px] font-mono text-stone-500">
            {viewPerspective === 'front' ? 'Sudut Audiens (Penerima)' : 'Sudut Pengirim (Latihan)'}
          </div>

          {/* SVG Container: generous breathing room with overflow-visible to prevent any flag clipping */}
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-square flex items-center justify-center mt-2 overflow-visible">
            {/* ViewBox enlarged to -55 -55 350 340 so 360° swings never touch bounds */}
            <svg
              viewBox="-55 -55 350 340"
              className="w-full h-full overflow-visible drop-shadow-xl"
            >
              <defs>
                {/* Flag Staff Wood Gradient */}
                <linearGradient id="flagPoleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#D97706" />
                  <stop offset="50%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <filter id="shadowFilter" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.45" />
                </filter>
              </defs>

              {/* 8-Point Compass Reference Ring */}
              <circle
                cx="120"
                cy="115"
                r="92"
                fill="none"
                stroke="#334155"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                opacity="0.4"
              />

              {/* Compass Nodes (8 Directions) */}
              {compassAngles.map((ang) => {
                const rad = ((ang - 90) * Math.PI) / 180;
                const cx = 120 + 92 * Math.cos(rad);
                const cy = 115 + 92 * Math.sin(rad);
                const active = isAngleActive(ang);
                return (
                  <g key={ang}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={active ? '5.5' : '3'}
                      fill={active ? '#EF4444' : '#475569'}
                      stroke={active ? '#FCD34D' : 'none'}
                      strokeWidth={active ? '2' : '0'}
                      className="transition-all duration-300"
                    />
                    {active && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="9"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="1"
                        opacity="0.6"
                        className="animate-ping"
                      />
                    )}
                  </g>
                );
              })}

              {/* SCOUT FIGURE (Anatomically Natural) */}
              {viewPerspective === 'front' ? (
                /* FRONT VIEW (Tampak Depan - Menghadap Penonton) */
                <g id="scout-front">
                  {/* Boots */}
                  <ellipse cx="112" cy="188" rx="7" ry="4" fill="#291508" />
                  <ellipse cx="128" cy="188" rx="7" ry="4" fill="#291508" />

                  {/* Scout Pants (Coklat Tua) */}
                  <rect x="108" y="146" width="9" height="40" rx="3" fill="#451A03" />
                  <rect x="123" y="146" width="9" height="40" rx="3" fill="#451A03" />

                  {/* Scout Belt */}
                  <rect x="106" y="141" width="28" height="6" rx="1.5" fill="#1C1917" />
                  <rect x="117" y="140" width="6" height="8" rx="1" fill="#F59E0B" />

                  {/* Scout Shirt (Coklat Muda Pramuka) */}
                  <rect x="105" y="98" width="30" height="44" rx="5" fill="#92400E" />
                  {/* Breast Pockets */}
                  <rect x="108" y="112" width="9" height="10" rx="2" fill="#78350F" stroke="#B45309" strokeWidth="0.5" />
                  <rect x="123" y="112" width="9" height="10" rx="2" fill="#78350F" stroke="#B45309" strokeWidth="0.5" />
                  {/* Pocket Flaps */}
                  <polygon points="108,112 117,112 112.5,115" fill="#581C87" opacity="0.3" />
                  <polygon points="123,112 132,112 127.5,115" fill="#581C87" opacity="0.3" />

                  {/* Neckerchief (Hasduk Merah Putih) & Ring */}
                  {/* White collar layer */}
                  <polygon points="112,98 128,98 120,118" fill="#F8FAFC" />
                  {/* Red stripe layer */}
                  <polygon points="114,98 126,98 120,115" fill="#DC2626" />
                  {/* Gold Ring Hasduk */}
                  <ellipse cx="120" cy="116" rx="3.5" ry="2.5" fill="#F59E0B" stroke="#D97706" strokeWidth="0.8" />
                  {/* Hasduk ties hanging */}
                  <path d="M 119 118 L 118 132" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M 121 118 L 122 132" stroke="#F8FAFC" strokeWidth="1.5" strokeLinecap="round" />

                  {/* Head & Neck */}
                  <rect x="116" y="87" width="8" height="12" rx="2" fill="#FBBF24" />
                  {/* Face */}
                  <ellipse cx="120" cy="74" rx="14" ry="15" fill="#FCD34D" />
                  {/* Eyes */}
                  <circle cx="115" cy="73" r="1.6" fill="#1C1917" />
                  <circle cx="125" cy="73" r="1.6" fill="#1C1917" />
                  {/* Friendly Smile */}
                  <path d="M 117 79 Q 120 83 123 79" fill="none" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" />

                  {/* Scout Beret (Baret Pramuka Coklat Tua tilted right) */}
                  <ellipse cx="120" cy="62" rx="17" ry="7" fill="#451A03" />
                  <path d="M 103 62 Q 120 49 137 62 Q 139 67 131 68 Q 118 69 104 67 Z" fill="#78350F" />
                  {/* Scout Tunas Kelapa Badge on Beret */}
                  <circle cx="111" cy="63" r="2.5" fill="#F59E0B" />
                </g>
              ) : (
                /* BACK VIEW (Tampak Belakang - Sudut Pandang Pengirim) */
                <g id="scout-back">
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
                  {/* Back Yoke Seam */}
                  <path d="M 107 110 Q 120 114 133 110" stroke="#78350F" strokeWidth="1.2" fill="none" />

                  {/* Hasduk Back Drape (Segitiga Merah-Putih di Punggung) */}
                  <polygon points="110,98 130,98 120,122" fill="#F8FAFC" />
                  <polygon points="112,98 128,98 120,119" fill="#DC2626" />

                  {/* Neck Back */}
                  <rect x="116" y="87" width="8" height="12" rx="2" fill="#FBBF24" />

                  {/* Head Back */}
                  <ellipse cx="120" cy="74" rx="14" ry="15" fill="#F59E0B" />
                  {/* Hair / Back of Neck */}
                  <path d="M 108 77 Q 120 86 132 77 Z" fill="#291508" />

                  {/* Beret Back */}
                  <ellipse cx="120" cy="62" rx="17" ry="7" fill="#451A03" />
                  <path d="M 103 62 Q 120 49 137 62 Q 139 67 131 68 Q 118 69 104 67 Z" fill="#78350F" />
                </g>
              )}

              {/* FIGURE'S RIGHT ARM & FLAG (Viewer's Left side when in front view) */}
              <g
                style={{
                  transformOrigin: '108px 105px',
                  transform: `rotate(${rightArmScreenDeg}deg)`,
                  transition: `transform ${armTransitionMs}ms cubic-bezier(0.34, 1.3, 0.64, 1)`,
                }}
              >
                {/* Arm Sleeve & Hand */}
                <line x1="108" y1="105" x2="108" y2="40" stroke="#92400E" strokeWidth="5.5" strokeLinecap="round" />
                <circle cx="108" cy="40" r="3.5" fill="#FCD34D" />

                {/* Flag Staff Pole (Wood) */}
                <line x1="108" y1="44" x2="108" y2="-18" stroke="url(#flagPoleGrad)" strokeWidth="3.2" strokeLinecap="round" />

                {/* Official 45x45 Scout Semaphore Flag (Red/Yellow Split Diagonally) */}
                <g filter="url(#shadowFilter)">
                  {/* Red Triangle (attached along staff) */}
                  <polygon points="108,-18 58,-18 108,30" fill="#DC2626" />
                  {/* Yellow Triangle */}
                  <polygon points="58,-18 58,30 108,30" fill="#FBBF24" />
                  {/* Edge Border Line */}
                  <polygon points="108,-18 58,-18 58,30 108,30" fill="none" stroke="#F59E0B" strokeWidth="0.8" opacity="0.6" />
                </g>
              </g>

              {/* FIGURE'S LEFT ARM & FLAG (Viewer's Right side when in front view) */}
              <g
                style={{
                  transformOrigin: '132px 105px',
                  transform: `rotate(${leftArmScreenDeg}deg)`,
                  transition: `transform ${armTransitionMs}ms cubic-bezier(0.34, 1.3, 0.64, 1)`,
                }}
              >
                {/* Arm Sleeve & Hand */}
                <line x1="132" y1="105" x2="132" y2="40" stroke="#92400E" strokeWidth="5.5" strokeLinecap="round" />
                <circle cx="132" cy="40" r="3.5" fill="#FCD34D" />

                {/* Flag Staff Pole (Wood) */}
                <line x1="132" y1="44" x2="132" y2="-18" stroke="url(#flagPoleGrad)" strokeWidth="3.2" strokeLinecap="round" />

                {/* Official 45x45 Scout Semaphore Flag (Red/Yellow Split Diagonally) */}
                <g filter="url(#shadowFilter)">
                  {/* Red Triangle (attached along staff) */}
                  <polygon points="132,-18 182,-18 132,30" fill="#DC2626" />
                  {/* Yellow Triangle */}
                  <polygon points="182,-18 182,30 132,30" fill="#FBBF24" />
                  {/* Edge Border Line */}
                  <polygon points="132,-18 182,-18 182,30 132,30" fill="none" stroke="#F59E0B" strokeWidth="0.8" opacity="0.6" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* Right Column: Active Pose Details & Playback Controls */}
        <div className={`${compact && !isFullscreen ? 'col-span-1' : 'sm:col-span-5'} flex flex-col justify-between space-y-3`}>
          <div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-red-600 text-white font-mono font-black flex items-center justify-center shadow-xs border border-red-500/50">
                {isStartIndex ? (
                  <CircleDot className="w-7 h-7 text-amber-300" />
                ) : isEndIndex ? (
                  <CheckCheck className="w-7 h-7 text-emerald-300" />
                ) : currentChar === ' ' ? (
                  <span className="text-2xl text-stone-200">␣</span>
                ) : (
                  <span className="text-3xl">{currentChar}</span>
                )}
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-red-400 font-bold block">
                  {isStartIndex
                    ? 'Posisi Bersiap (Istirahat)'
                    : isEndIndex
                    ? 'Posisi Selesai (Istirahat)'
                    : currentChar === ' '
                    ? 'Pemisah Kata (Spasi)'
                    : `Huruf ${currentChar}`}
                </span>
                <span className="text-xs text-stone-300 font-mono">
                  {isStartIndex || isEndIndex
                    ? 'Kunci 0 (Istirahat Sempurna)'
                    : currentPose.kunciName}
                </span>
              </div>
            </div>

            <div className="mt-2.5 p-2.5 bg-stone-950/60 rounded-xl border border-stone-800/80 text-xs text-stone-300 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-stone-400">
                <span>Posisi Jarum Jam:</span>
                <span className="font-mono text-amber-400 font-bold">
                  {currentPose.rightClock} &amp; {currentPose.leftClock}
                </span>
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">
                {isStartIndex
                  ? 'Sebelum pengiriman sandi dimulai, kedua bendera disilangkan di depan kaki (posisi istirahat).'
                  : isEndIndex
                  ? 'Pengiriman sandi selesai, kedua bendera kembali diturunkan menyilang di depan kaki.'
                  : currentPose.desc}
              </p>
            </div>
          </div>

          {/* Stepper & Playback Controls */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={handleTogglePlay}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
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
              className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
              title="Karakter Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleStepNext}
              className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
              title="Karakter Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
              title="Ulangi dari Awal (Posisi Bersiap)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Letter Sequence Scrubber */}
      <div className="pt-3 border-t border-stone-800/80">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {sequence.map((char, idx) => {
            const isActive = idx === currentIndex;
            const isStart = idx === 0;
            const isEnd = idx === sequence.length - 1;

            return (
              <button
                key={`${char}-${idx}`}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentIndex(idx);
                }}
                className={`w-8 h-8 rounded-lg font-mono font-bold text-xs flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-xs scale-105 ring-2 ring-red-400'
                    : isStart || isEnd
                    ? 'bg-stone-800 text-amber-300 border border-amber-600/40 hover:bg-stone-700'
                    : 'bg-stone-800/70 hover:bg-stone-700 text-stone-300'
                }`}
                title={
                  isStart
                    ? 'Posisi Bersiap (Istirahat Awal)'
                    : isEnd
                    ? 'Posisi Selesai (Istirahat Akhir)'
                    : char === ' '
                    ? 'Spasi Antar Kata'
                    : `Lihat formasi '${char}'`
                }
              >
                {isStart ? (
                  <CircleDot className="w-3.5 h-3.5 text-amber-300" />
                ) : isEnd ? (
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                ) : char === ' ' ? (
                  <span className="text-stone-400">␣</span>
                ) : (
                  char
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
