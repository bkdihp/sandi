import React from 'react';

interface ScoutIconProps {
  className?: string;
  size?: number;
}

/**
 * Logo Resmi Aplikasi Sandi:
 * Siluet Peluit Morse Hitam & Tunas Kelapa Emas (sandiko)
 */
export const SandiAppLogo: React.FC<ScoutIconProps> = ({ className = 'w-8 h-8', size }) => (
  <img
    src="/assets/logo.png"
    alt="Logo Sandi Pramuka"
    className={`${className} object-contain shrink-0`}
    style={size ? { width: size, height: size } : undefined}
  />
);

/**
 * Lambang Gerakan Pramuka: Siluet Tunas Kelapa (Coconut Sprout)
 */
export const TunasKelapaIcon: React.FC<ScoutIconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="currentColor"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Siluet Tunas Kelapa Alami: Butir kelapa di kiri, tunas kuncup kembar di kanan, akar tunggal di dasar */}
    <path
      d="M7 27
         C6.5 28 8 30.5 11 32.5
         C14.5 35.5 20 36 24 35.5
         C25 34 26 31 27 28
         C28 24 29.5 20 30 16
         C30.5 10.5 28.5 6 27.5 3
         C26 5.5 25 8.5 24.5 12
         C24 10.5 23 8 22 6
         C22.5 8 23 10.5 23.5 13
         C24.5 18 24.5 23 24.5 27
         C24 24.5 23 23 21 21.5
         C17.5 19.5 13 21 10 23.5
         C8 25.5 7 27 7 27 Z"
    />
    <path d="M23 35.5 C23.5 37 24 38.5 24.5 39.5 C25 38.5 25.5 37 25.5 35.5 Z" opacity="0.9" />
  </svg>
);

/**
 * Lambang WOSM (World Organization of the Scout Movement - Pandu Sedunia)
 */
export const WosmFleurIcon: React.FC<ScoutIconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Outer rope ring */}
    <circle cx="24" cy="24" r="21" strokeWidth="2.5" strokeDasharray="3 2" />
    {/* Central Fleur-de-lis petal with compass needle */}
    <path
      d="M24 8C22 13 20 18 20 22C20 25 21.5 27 24 29C26.5 27 28 25 28 22C28 18 26 13 24 8Z"
      fill="currentColor"
    />
    <path
      d="M24 7V30"
      stroke="#FFF"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Left petal */}
    <path
      d="M19 22C14 18 10 20 10 23C10 26 13 28 19 27C17 25 17 23 19 22Z"
      fill="currentColor"
    />
    {/* Right petal */}
    <path
      d="M29 22C34 18 38 20 38 23C38 26 35 28 29 27C31 25 31 23 29 22Z"
      fill="currentColor"
    />
    {/* Center collar knot */}
    <rect x="18" y="27" width="12" height="3" rx="1.5" fill="currentColor" />
    <path
      d="M20 30L22 36C22 38 24 39 24 39C24 39 26 38 26 36L28 30"
      fill="currentColor"
    />
  </svg>
);

/**
 * Peluit Morse Pramuka (Scout Morse Whistle & Signal Waves)
 */
export const PeluitMorseIcon: React.FC<ScoutIconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Whistle lanyard ring */}
    <circle cx="8" cy="24" r="4.5" stroke="currentColor" strokeWidth="2.5" />
    {/* Whistle barrel */}
    <path
      d="M12.5 21.5H23L27 15H36V28C36 33.5 31.5 38 26 38C20.5 38 16 33.5 16 28H12.5C11.5 28 10.5 26.5 10.5 24.5C10.5 22.5 11.5 21.5 12.5 21.5Z"
      fill="currentColor"
      fillOpacity="0.15"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Sound escape hole */}
    <path d="M23 21.5V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Whistle pea sphere indicator */}
    <circle cx="26" cy="28" r="4.5" fill="currentColor" />
    {/* Morse audio sound wave pulses */}
    <path
      d="M38 18C40.5 20 42 22.8 42 26C42 29.2 40.5 32 38 34"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M42 14C45.5 17 47.5 21.2 47.5 26C47.5 30.8 45.5 35 42 38"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

/**
 * Sandi Rumput: Reeds & Grass Clump (Alternating Low & High Blades)
 */
export const SandiRumputIcon: React.FC<ScoutIconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Ground baseline */}
    <line x1="4" y1="42" x2="44" y2="42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {/* Grass zigzag cipher waves (Dot = short, Dash = tall) */}
    {/* Short blade (dot) */}
    <path
      d="M8 42L11 26L14 42"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Tall blade (dash) */}
    <path
      d="M14 42L19 12L24 42"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Short blade (dot) */}
    <path
      d="M24 42L27 26L30 42"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Tall blade (dash) */}
    <path
      d="M30 42L35 12L40 42"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Stylized leaf accent */}
    <path
      d="M19 12C20.5 7 23 6 25 7C24.5 10 22 12 19 12Z"
      fill="currentColor"
      opacity="0.8"
    />
  </svg>
);

/**
 * Sandi Kotak: Authentic Pigpen Grid & Cross matrix with dots
 */
export const SandiKotakIcon: React.FC<ScoutIconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Outer container border */}
    <rect x="6" y="6" width="36" height="36" rx="8" stroke="currentColor" strokeWidth="2" opacity="0.25" />
    {/* 3x3 Tic-tac-toe Grid lines */}
    <line x1="18" y1="10" x2="18" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="30" y1="10" x2="30" y2="38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="10" y1="18" x2="38" y2="18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="10" y1="30" x2="38" y2="30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Distinct cipher dots in selective cells */}
    <circle cx="24" cy="14" r="2" fill="currentColor" />
    <circle cx="14" cy="24" r="2" fill="currentColor" />
    <circle cx="34" cy="24" r="2" fill="currentColor" />
    <circle cx="24" cy="34" r="2" fill="currentColor" />
  </svg>
);

/**
 * Bendera Semafor (Crossed Red-Yellow Scout Signaling Flags)
 */
export const BenderaSemaforIcon: React.FC<ScoutIconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Left Flagpole */}
    <line x1="12" y1="42" x2="36" y2="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Right Flagpole */}
    <line x1="36" y1="42" x2="12" y2="8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

    {/* Left Semaphore Flag (diagonal red/yellow) */}
    <g transform="translate(4, 6)">
      <polygon points="12,4 28,4 28,20 12,20" fill="#DC2626" />
      <polygon points="12,4 28,20 12,20" fill="#EAB308" />
      <polygon points="12,4 28,4 28,20 12,20" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </g>

    {/* Right Semaphore Flag (diagonal red/yellow) */}
    <g transform="translate(16, 6)">
      <polygon points="4,4 20,4 20,20 4,20" fill="#EAB308" />
      <polygon points="4,4 20,4 4,20" fill="#DC2626" />
      <polygon points="4,4 20,4 20,20 4,20" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </g>
  </svg>
);

/**
 * Kompas Bidik Pramuka (Orienteering Compass with Azimuth needle)
 */
export const KompasBidikIcon: React.FC<ScoutIconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Compass outer casing ring */}
    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" opacity="0.6" />
    {/* Cardinal ticks */}
    <line x1="24" y1="7" x2="24" y2="10" stroke="currentColor" strokeWidth="2.5" />
    <line x1="24" y1="38" x2="24" y2="41" stroke="currentColor" strokeWidth="2" />
    <line x1="7" y1="24" x2="10" y2="24" stroke="currentColor" strokeWidth="2" />
    <line x1="38" y1="24" x2="41" y2="24" stroke="currentColor" strokeWidth="2" />
    {/* Compass North needle (filled red tone) */}
    <polygon points="24,12 28,24 24,22" fill="#DC2626" />
    <polygon points="24,12 20,24 24,22" fill="#EF4444" />
    {/* Compass South needle */}
    <polygon points="24,36 28,24 24,26" fill="currentColor" opacity="0.6" />
    <polygon points="24,36 20,24 24,26" fill="currentColor" opacity="0.4" />
    {/* Center pivot point */}
    <circle cx="24" cy="24" r="2.5" fill="currentColor" />
  </svg>
);

/**
 * Tenda Pramuka & Kemah (Scout Camp Ridge Tent)
 */
export const TendaPramukaIcon: React.FC<ScoutIconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Ground baseline */}
    <line x1="4" y1="40" x2="44" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Tent front triangular frame */}
    <polygon points="24,12 8,40 24,40" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    <polygon points="24,12 24,40 40,40" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    {/* Front center door opening */}
    <polygon points="24,22 17,40 24,40" fill="currentColor" fillOpacity="0.3" stroke="currentColor" strokeWidth="1.5" />
    <polygon points="24,22 31,40 24,40" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5" />
    {/* Guy ropes to ground pegs */}
    <line x1="24" y1="12" x2="4" y2="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1="24" y1="12" x2="44" y2="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
    {/* Scout flag on top of ridge pole */}
    <line x1="24" y1="12" x2="24" y2="6" stroke="currentColor" strokeWidth="2" />
    <polygon points="24,6 30,9 24,12" fill="#D97706" />
  </svg>
);

/**
 * Api Unggun Pramuka (Campfire with Firewood)
 */
export const ApiUnggunIcon: React.FC<ScoutIconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Crossed fire logs */}
    <line x1="8" y1="38" x2="40" y2="38" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
    <line x1="12" y1="42" x2="36" y2="34" stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="12" y1="34" x2="36" y2="42" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" />
    {/* Outer flame */}
    <path
      d="M24 6C27 12 34 16 34 25C34 31 29.5 35 24 35C18.5 35 14 31 14 25C14 18 19 13 24 6Z"
      fill="#F59E0B"
    />
    {/* Inner energetic flame */}
    <path
      d="M24 14C26 18 29 21 29 27C29 30.5 26.8 33 24 33C21.2 33 19 30.5 19 27C19 22 21.5 19 24 14Z"
      fill="#EF4444"
    />
    {/* Core ember */}
    <path
      d="M24 23C25 25 26 27 26 29C26 30.5 25 32 24 32C23 32 22 30.5 22 29C22 27 23 25 24 23Z"
      fill="#FDE047"
    />
  </svg>
);

/**
 * Buku Saku Pramuka (Scout Handbook / Cipher Field Journal)
 */
export const BukuSakuIcon: React.FC<ScoutIconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Book spine & pages */}
    <rect x="10" y="8" width="28" height="34" rx="3" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2.5" />
    <line x1="16" y1="8" x2="16" y2="42" stroke="currentColor" strokeWidth="2.5" />
    {/* Cover badge emblem */}
    <circle cx="26" cy="20" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M26 17V23M23 20H29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Horizontal page lines */}
    <line x1="20" y1="28" x2="32" y2="28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <line x1="20" y1="33" x2="30" y2="33" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    {/* Bookmark ribbon */}
    <polygon points="29,8 33,8 33,18 31,16 29,18" fill="#DC2626" />
  </svg>
);

/**
 * Lencana Tanda Kecakapan / SKU Scout Badge
 */
export const LencanaPramukaIcon: React.FC<ScoutIconProps> = ({ className = 'w-6 h-6', size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    aria-hidden="true"
  >
    {/* Shield shape */}
    <path
      d="M24 6L38 12V25C38 34 32 41 24 44C16 41 10 34 10 25V12L24 6Z"
      fill="currentColor"
      fillOpacity="0.1"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Internal star / fleur emblem */}
    <polygon
      points="24,14 26.5,21 34,21 28,25.5 30.5,33 24,28.5 17.5,33 20,25.5 14,21 21.5,21"
      fill="#D97706"
      stroke="#B45309"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);
