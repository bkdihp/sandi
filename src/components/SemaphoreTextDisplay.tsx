import React from 'react';
import { SemaphoreFigure } from './SemaphoreFigure';

interface SemaphoreTextDisplayProps {
  text: string;
  isJumbo?: boolean;
  viewPerspective?: 'front' | 'back';
  className?: string;
  showLabels?: boolean;
}

export const SemaphoreTextDisplay: React.FC<SemaphoreTextDisplayProps> = ({
  text,
  isJumbo = false,
  viewPerspective = 'front',
  className = '',
  showLabels = true,
}) => {
  if (!text || text.trim() === '') {
    return (
      <div className="text-center text-stone-400 text-xs py-4">
        Ketik teks untuk melihat formasi bendera semafor.
      </div>
    );
  }

  // Split text by words
  const words = text.split(/\s+/).filter(Boolean);
  const figureSize = isJumbo ? 76 : 54;

  return (
    <div className={`w-full flex flex-wrap items-center justify-center gap-y-6 gap-x-5 py-2 ${className}`}>
      {words.map((word, wIdx) => (
        <div
          key={`word-${wIdx}-${word}`}
          className="flex flex-wrap items-center justify-center gap-1.5 p-2 bg-white/70 rounded-2xl border border-stone-200/60 shadow-2xs"
        >
          {word.split('').map((char, cIdx) => (
            <SemaphoreFigure
              key={`char-${wIdx}-${cIdx}-${char}`}
              char={char}
              size={figureSize}
              viewPerspective={viewPerspective}
              showLabel={showLabels}
              className="p-1 hover:scale-105 transition-transform"
            />
          ))}
        </div>
      ))}
    </div>
  );
};
