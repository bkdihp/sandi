import React from 'react';
import { ArrowLeft, Heart } from 'lucide-react';

interface AboutScreenProps {
  onBack: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white shadow-xl flex flex-col justify-between">
      <div className="px-9 pt-6 pb-8">
        {/* Top bar with back button */}
        <div className="flex items-center justify-between mb-6">
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
          <div className="w-6" /> {/* spacer */}
        </div>

        {/* Profile Avatar */}
        <div className="flex justify-center mt-2">
          <div className="w-[172px] h-[172px] rounded-full overflow-hidden shadow-lg border-4 border-slate-50 ring-2 ring-emerald-400/20">
            <img
              src="/assets/bayu2.png"
              alt="Rizky Bayu Oktavian"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-bold text-[#605F5F] tracking-tight">
            Rizky Bayu Oktavian
          </h2>
          <p className="text-xs text-emerald-600 font-medium mt-0.5">Author & Creator</p>
        </div>

        {/* Bio Description */}
        <div className="mt-5 text-sm text-[#A1A1A1] leading-relaxed space-y-3 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
          <p className="text-slate-600">
            lahir 06 Oktober 1998<br />
            senang belajar sesuatu yang baru,<br />
            sangat menyukai UI / UX<br />
            dan pemrograman.
          </p>

          <div className="pt-2 border-t border-slate-200/70 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <svg className="w-4 h-4 text-pink-500 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram : <strong>@rbayuokt</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <svg className="w-4 h-4 text-slate-900 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub : <strong>rbayuokt</strong></span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <svg className="w-4 h-4 text-pink-600 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10.198 10.742c-.08-.002-2.34-.055-4.708.799-.073-.16-.149-.323-.227-.487-1.025-2.15-2.28-4.041-2.39-4.204 2.973.902 5.333 3.14 7.325 3.892zm-8.878-6.195c.121.178 1.347 2.005 2.348 4.098-2.68.859-5.467 1.054-7.464 1.096 1.056-2.583 3.136-4.577 5.116-5.194zm-6.666 6.643c1.94-.047 4.542-.234 7.072-1.034.423.864.814 1.758 1.168 2.673-3.664 1.107-7.411 3.513-8.083 4.004-.265-1.637-.282-3.89-.157-5.643zm1.189 7.074c.677-.492 4.184-2.738 7.683-3.791.737 1.95 1.258 4.053 1.503 5.334-2.827 1.023-5.918.73-9.186-1.543zm10.638 1.353c-.234-1.206-.723-3.175-1.41-5.011 2.197-.837 4.19-.78 4.295-.776-.176 2.456-1.255 4.606-2.885 5.787zm3.171-7.424c-.139-.004-2.327-.058-4.745.836-.341-.884-.717-1.748-1.127-2.585 2.192-.806 4.32-.751 5.872-1.749z"/>
              </svg>
              <span>Dribbble : <strong>rbayuokt_</strong></span>
            </div>
          </div>

          <div className="pt-2 text-center text-xs text-slate-500 flex items-center justify-center gap-1 font-medium">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> in Cimahi
          </div>
        </div>

        {/* Kembali Button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={onBack}
            className="w-full py-3.5 rounded-2xl font-bold text-white text-base shadow-md hover:shadow-lg active:scale-[0.98] transition-all transform tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #1DDBAD, #2E67DA)',
            }}
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

