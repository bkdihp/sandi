import React from 'react';
import { getSemaphorePose, getArmAnglesForView, REST_POSE } from '../utils/semaphoreData';

interface SemaphoreFigureProps {
  char: string;
  size?: number; // width/height in px, default 56
  viewPerspective?: 'front' | 'back';
  showLabel?: boolean;
  className?: string;
  compact?: boolean;
}

export const SemaphoreFigure: React.FC<SemaphoreFigureProps> = ({
  char,
  size = 56,
  viewPerspective = 'front',
  showLabel = false,
  className = '',
  compact = false,
}) => {
  const isSpace = char === ' ' || char === '';
  const pose = isSpace ? REST_POSE : getSemaphorePose(char);
  const { rightArmScreenDeg, leftArmScreenDeg } = getArmAnglesForView(pose, viewPerspective);

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <div
        style={{ width: size, height: size }}
        className="relative flex items-center justify-center overflow-visible"
        title={isSpace ? 'Spasi / Posisi Istirahat' : `Sandi Semafor: ${char.toUpperCase()} (${pose.rightClock} & ${pose.leftClock})`}
      >
        <svg
          viewBox="-55 -55 350 340"
          className="w-full h-full overflow-visible drop-shadow-xs"
        >
          <defs>
            <linearGradient id={`figureStaff-${char}-${viewPerspective}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>

          {/* Scout Body */}
          {viewPerspective === 'front' ? (
            /* FRONT VIEW */
            <g id="figure-scout-front">
              {/* Boots */}
              <ellipse cx="112" cy="188" rx="7" ry="4" fill="#291508" />
              <ellipse cx="128" cy="188" rx="7" ry="4" fill="#291508" />

              {/* Scout Pants */}
              <rect x="108" y="146" width="9" height="40" rx="3" fill="#451A03" />
              <rect x="123" y="146" width="9" height="40" rx="3" fill="#451A03" />

              {/* Scout Belt */}
              <rect x="106" y="141" width="28" height="6" rx="1.5" fill="#1C1917" />
              <rect x="117" y="140" width="6" height="8" rx="1" fill="#F59E0B" />

              {/* Scout Shirt */}
              <rect x="105" y="98" width="30" height="44" rx="5" fill="#92400E" />
              <rect x="108" y="112" width="9" height="10" rx="2" fill="#78350F" stroke="#B45309" strokeWidth="0.5" />
              <rect x="123" y="112" width="9" height="10" rx="2" fill="#78350F" stroke="#B45309" strokeWidth="0.5" />

              {/* Hasduk Merah Putih & Ring */}
              <polygon points="112,98 128,98 120,118" fill="#F8FAFC" />
              <polygon points="114,98 126,98 120,115" fill="#DC2626" />
              <ellipse cx="120" cy="116" rx="3.5" ry="2.5" fill="#F59E0B" stroke="#D97706" strokeWidth="0.8" />
              <path d="M 119 118 L 118 132" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 121 118 L 122 132" stroke="#F8FAFC" strokeWidth="1.5" strokeLinecap="round" />

              {/* Head & Neck */}
              <rect x="116" y="87" width="8" height="12" rx="2" fill="#FBBF24" />
              <ellipse cx="120" cy="74" rx="14" ry="15" fill="#FCD34D" />
              <circle cx="115" cy="73" r="1.6" fill="#1C1917" />
              <circle cx="125" cy="73" r="1.6" fill="#1C1917" />
              <path d="M 117 79 Q 120 83 123 79" fill="none" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" />

              {/* Scout Beret */}
              <ellipse cx="120" cy="62" rx="17" ry="7" fill="#451A03" />
              <path d="M 103 62 Q 120 49 137 62 Q 139 67 131 68 Q 118 69 104 67 Z" fill="#78350F" />
              <circle cx="111" cy="63" r="2.5" fill="#F59E0B" />
            </g>
          ) : (
            /* BACK VIEW */
            <g id="figure-scout-back">
              <ellipse cx="112" cy="188" rx="7" ry="4" fill="#1C1917" />
              <ellipse cx="128" cy="188" rx="7" ry="4" fill="#1C1917" />
              <rect x="108" y="146" width="9" height="40" rx="3" fill="#451A03" />
              <rect x="123" y="146" width="9" height="40" rx="3" fill="#451A03" />
              <rect x="106" y="141" width="28" height="6" rx="1.5" fill="#1C1917" />
              <rect x="105" y="98" width="30" height="44" rx="5" fill="#92400E" />
              <polygon points="110,98 130,98 120,122" fill="#F8FAFC" />
              <polygon points="112,98 128,98 120,119" fill="#DC2626" />
              <rect x="116" y="87" width="8" height="12" rx="2" fill="#FBBF24" />
              <ellipse cx="120" cy="74" rx="14" ry="15" fill="#F59E0B" />
              <ellipse cx="120" cy="62" rx="17" ry="7" fill="#451A03" />
              <path d="M 103 62 Q 120 49 137 62 Q 139 67 131 68 Q 118 69 104 67 Z" fill="#78350F" />
            </g>
          )}

          {/* Right Arm & Flag */}
          <g
            style={{
              transformOrigin: '108px 105px',
              transform: `rotate(${rightArmScreenDeg}deg)`,
            }}
          >
            <line x1="108" y1="105" x2="108" y2="40" stroke="#92400E" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="108" cy="40" r="3.5" fill="#FCD34D" />
            <line x1="108" y1="44" x2="108" y2="-18" stroke={`url(#figureStaff-${char}-${viewPerspective})`} strokeWidth="3.2" strokeLinecap="round" />
            {/* 45x45 Official Flag */}
            <polygon points="108,-18 58,-18 108,30" fill="#DC2626" />
            <polygon points="58,-18 58,30 108,30" fill="#FBBF24" />
            <polygon points="108,-18 58,-18 58,30 108,30" fill="none" stroke="#F59E0B" strokeWidth="0.8" opacity="0.6" />
          </g>

          {/* Left Arm & Flag */}
          <g
            style={{
              transformOrigin: '132px 105px',
              transform: `rotate(${leftArmScreenDeg}deg)`,
            }}
          >
            <line x1="132" y1="105" x2="132" y2="40" stroke="#92400E" strokeWidth="5.5" strokeLinecap="round" />
            <circle cx="132" cy="40" r="3.5" fill="#FCD34D" />
            <line x1="132" y1="44" x2="132" y2="-18" stroke={`url(#figureStaff-${char}-${viewPerspective})`} strokeWidth="3.2" strokeLinecap="round" />
            {/* 45x45 Official Flag */}
            <polygon points="132,-18 182,-18 132,30" fill="#DC2626" />
            <polygon points="182,-18 182,30 132,30" fill="#FBBF24" />
            <polygon points="132,-18 182,-18 182,30 132,30" fill="none" stroke="#F59E0B" strokeWidth="0.8" opacity="0.6" />
          </g>
        </svg>
      </div>

      {showLabel && !compact && (
        <span className="mt-1 font-mono font-bold text-xs px-1.5 py-0.5 rounded bg-stone-100 text-stone-800 border border-stone-200/80">
          {isSpace ? '␣' : char.toUpperCase()}
        </span>
      )}
    </div>
  );
};
