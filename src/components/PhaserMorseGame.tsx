import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import confetti from 'canvas-confetti';
import {
  RotateCcw,
  Zap,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { WhistleSoundType, WHISTLE_SOUND_OPTIONS } from '../utils/ciphers';

interface PhaserMorseGameProps {
  onBack?: () => void;
}

interface TargetSignal {
  char: string;
  morse: string;
}

const EASY_TARGETS: TargetSignal[] = [
  { char: 'E', morse: '.' },
  { char: 'T', morse: '-' },
  { char: 'A', morse: '.-' },
  { char: 'I', morse: '..' },
  { char: 'M', morse: '--' },
  { char: 'N', morse: '-.' },
  { char: 'S', morse: '...' },
  { char: 'O', morse: '---' },
];

const MEDIUM_TARGETS: TargetSignal[] = [
  { char: 'P', morse: '.--.' },
  { char: 'R', morse: '.-.' },
  { char: 'A', morse: '.-' },
  { char: 'M', morse: '--' },
  { char: 'U', morse: '..-' },
  { char: 'K', morse: '-.-' },
  { char: 'B', morse: '-...' },
  { char: 'D', morse: '-..' },
  { char: 'G', morse: '--.' },
  { char: 'L', morse: '.-..' },
];

export const PhaserMorseGame: React.FC<PhaserMorseGameProps> = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [level, setLevel] = useState<'siaga' | 'penggalang'>('siaga');
  const [currentTarget, setCurrentTarget] = useState<TargetSignal>(EASY_TARGETS[0]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [feedback, setFeedback] = useState<{ text: string; color: string } | null>(null);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [gameActive] = useState(true);
  const [whistleType, setWhistleType] = useState<WhistleSoundType>('peluit-pramuka');
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('sandi_morse_highscore') || '0', 10);
  });

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Web Audio for responsive tactile beeps with multiple whistle acoustic options
  const playBeep = (isDash: boolean) => {
    if (!isSoundOn) return;
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
      const duration = isDash ? 0.32 : 0.12; // slow, clear duration for school students!
      const masterGain = audioCtxRef.current.createGain();
      masterGain.connect(audioCtxRef.current.destination);

      if (whistleType === 'peluit-pramuka') {
        const osc1 = audioCtxRef.current.createOscillator();
        const osc2 = audioCtxRef.current.createOscillator();
        const lfo = audioCtxRef.current.createOscillator();
        const lfoGain = audioCtxRef.current.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(2400, now);
        osc2.frequency.setValueAtTime(2850, now);

        lfo.frequency.setValueAtTime(28, now);
        lfoGain.gain.setValueAtTime(45, now);
        lfo.connect(lfoGain);
        lfoGain.connect(osc1.frequency);
        lfoGain.connect(osc2.frequency);

        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.22, now + 0.01);
        masterGain.gain.setValueAtTime(0.22, now + duration - 0.015);
        masterGain.gain.linearRampToValueAtTime(0, now + duration);

        osc1.connect(masterGain);
        osc2.connect(masterGain);
        osc1.start(now);
        osc2.start(now);
        lfo.start(now);
        osc1.stop(now + duration);
        osc2.stop(now + duration);
        lfo.stop(now + duration);
      } else if (whistleType === 'fox-40') {
        const osc1 = audioCtxRef.current.createOscillator();
        const osc2 = audioCtxRef.current.createOscillator();
        osc1.frequency.setValueAtTime(2900, now);
        osc2.frequency.setValueAtTime(3350, now);

        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.18, now + 0.008);
        masterGain.gain.setValueAtTime(0.18, now + duration - 0.01);
        masterGain.gain.linearRampToValueAtTime(0, now + duration);

        osc1.connect(masterGain);
        osc2.connect(masterGain);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + duration);
        osc2.stop(now + duration);
      } else if (whistleType === 'peluit-kayu') {
        const osc = audioCtxRef.current.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);

        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.24, now + 0.015);
        masterGain.gain.setValueAtTime(0.24, now + duration - 0.015);
        masterGain.gain.linearRampToValueAtTime(0, now + duration);

        osc.connect(masterGain);
        osc.start(now);
        osc.stop(now + duration);
      } else if (whistleType === 'nada-lembut') {
        const osc = audioCtxRef.current.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(480, now);

        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.2, now + 0.02);
        masterGain.gain.setValueAtTime(0.2, now + duration - 0.02);
        masterGain.gain.linearRampToValueAtTime(0, now + duration);

        osc.connect(masterGain);
        osc.start(now);
        osc.stop(now + duration);
      } else {
        // Telegraf Radio
        const osc = audioCtxRef.current.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(650, now);

        masterGain.gain.setValueAtTime(0, now);
        masterGain.gain.linearRampToValueAtTime(0.22, now + 0.005);
        masterGain.gain.setValueAtTime(0.22, now + duration - 0.005);
        masterGain.gain.linearRampToValueAtTime(0, now + duration);

        osc.connect(masterGain);
        osc.start(now);
        osc.stop(now + duration);
      }
    } catch {
      // Audio fallback
    }
  };

  // Setup Phaser Scene
  useEffect(() => {
    if (!gameContainerRef.current) return;

    class RadarMorseScene extends Phaser.Scene {
      private radarCircle!: Phaser.GameObjects.Arc;
      private sweepLine!: Phaser.GameObjects.Line;
      private particles!: Phaser.GameObjects.Particles.ParticleEmitter;
      private pulseRing!: Phaser.GameObjects.Arc;
      private angleSweep = 0;

      constructor() {
        super({ key: 'RadarMorseScene' });
      }

      create() {
        const { width, height } = this.scale;
        const centerX = width / 2;
        const centerY = height / 2;

        // Background grid styling (Classroom 75in High-Tech Scout Radar)
        const gridGfx = this.add.graphics();
        gridGfx.lineStyle(1, 0x334155, 0.4);

        for (let x = 0; x < width; x += 40) {
          gridGfx.lineBetween(x, 0, x, height);
        }
        for (let y = 0; y < height; y += 40) {
          gridGfx.lineBetween(0, y, width, y);
        }

        // Concentric Range Rings
        const ringGfx = this.add.graphics();
        ringGfx.lineStyle(2, 0xd97706, 0.3);
        ringGfx.strokeCircle(centerX, centerY, 80);
        ringGfx.strokeCircle(centerX, centerY, 160);
        ringGfx.strokeCircle(centerX, centerY, 240);

        // Radar Center Hub
        this.radarCircle = this.add.circle(centerX, centerY, 24, 0xd97706, 0.85);

        // Pulsing Wave Ring
        this.pulseRing = this.add.circle(centerX, centerY, 26, 0xfbbf24, 0.5);
        this.pulseRing.setStrokeStyle(3, 0xf59e0b);

        // Sweep Radar Line
        this.sweepLine = this.add.line(centerX, centerY, 0, 0, 240, 0, 0x22c55e, 0.7);
        this.sweepLine.setLineWidth(2.5);

        // Particle Emitter for hits
        const particleGfx = this.make.graphics({ x: 0, y: 0 });
        particleGfx.fillStyle(0xfbbf24, 1);
        particleGfx.fillCircle(4, 4, 4);
        particleGfx.generateTexture('goldParticle', 8, 8);

        this.particles = this.add.particles(centerX, centerY, 'goldParticle', {
          speed: { min: 60, max: 200 },
          scale: { start: 1, end: 0 },
          alpha: { start: 1, end: 0 },
          lifespan: 600,
          emitting: false,
        });

        // Event listener from React
        this.events.on('triggerHit', () => {
          this.particles.explode(25);
          this.tweens.add({
            targets: this.radarCircle,
            scale: 1.5,
            duration: 120,
            yoyo: true,
          });
        });

        this.events.on('triggerPulse', (isDash: boolean) => {
          this.tweens.add({
            targets: this.pulseRing,
            radius: isDash ? 220 : 120,
            alpha: 0,
            duration: isDash ? 350 : 200,
            onComplete: () => {
              this.pulseRing.setRadius(26);
              this.pulseRing.setAlpha(0.6);
            },
          });
        });
      }

      override update() {
        this.angleSweep += 0.035;
        const { width, height } = this.scale;
        const centerX = width / 2;
        const centerY = height / 2;
        const length = 240;
        const endX = centerX + Math.cos(this.angleSweep) * length;
        const endY = centerY + Math.sin(this.angleSweep) * length;
        this.sweepLine.setTo(centerX, centerY, endX, endY);
      }
    }

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: gameContainerRef.current,
      width: gameContainerRef.current.clientWidth || 600,
      height: 320,
      transparent: true,
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: RadarMorseScene,
    };

    const game = new Phaser.Game(config);
    gameInstanceRef.current = game;

    return () => {
      game.destroy(true);
      gameInstanceRef.current = null;
    };
  }, []);

  // Check user input against target
  const handleInput = (symbol: '.' | '-') => {
    if (!gameActive) return;

    playBeep(symbol === '-');
    const nextInput = currentInput + symbol;
    setCurrentInput(nextInput);

    // Trigger visual pulse on Phaser radar
    const scene = gameInstanceRef.current?.scene.getScene('RadarMorseScene');
    scene?.events.emit('triggerPulse', symbol === '-');

    // Check if matching target so far
    if (currentTarget.morse.startsWith(nextInput)) {
      if (nextInput === currentTarget.morse) {
        // Complete Match!
        scene?.events.emit('triggerHit');
        const points = 100 + combo * 25;
        const newScore = score + points;
        const newCombo = combo + 1;
        setScore(newScore);
        setCombo(newCombo);

        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('sandi_morse_highscore', newScore.toString());
        }

        setFeedback({ text: `+${points} TEPAT & CEPAT!`, color: 'text-emerald-400' });

        if (newCombo % 5 === 0) {
          confetti({
            particleCount: 40,
            spread: 70,
            origin: { y: 0.6 },
          });
        }

        // Pick next random target
        setTimeout(() => {
          pickNextTarget();
          setCurrentInput('');
        }, 220);
      }
    } else {
      // Miss!
      setCombo(0);
      setFeedback({ text: 'SINYAL SALAH - COBA LAGI', color: 'text-rose-400' });
      setTimeout(() => {
        setCurrentInput('');
      }, 350);
    }
  };

  const pickNextTarget = () => {
    const list = level === 'siaga' ? EASY_TARGETS : MEDIUM_TARGETS;
    const remaining = list.filter((t) => t.char !== currentTarget.char);
    const next = remaining[Math.floor(Math.random() * remaining.length)] || list[0];
    setCurrentTarget(next);
    setFeedback(null);
  };

  const resetGame = () => {
    setScore(0);
    setCombo(0);
    setCurrentInput('');
    setFeedback(null);
    pickNextTarget();
  };

  return (
    <div className="w-full bg-stone-900 rounded-3xl border-2 border-amber-600/40 shadow-2xl p-4 sm:p-6 lg:p-8 text-white relative overflow-hidden select-none">
      {/* Top Telemetry Header for 75" PID (High Visibility) */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-600/20 border border-amber-500/40 rounded-2xl text-amber-400">
            <Zap className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                Radar Sandi Pramuka
              </span>
              <span className="text-xs text-stone-500">·</span>
              <span className="text-xs text-stone-400">Ketukan Suara Peluit</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Tantangan Telegraf Sandi Morse
            </h3>
          </div>
        </div>

        {/* Big Dashboard Stats for Classroom Viewing */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-center px-4 py-2 bg-stone-800/80 rounded-2xl border border-stone-700">
            <span className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest">
              Skor
            </span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400">{score}</span>
          </div>

          <div className="text-center px-4 py-2 bg-stone-800/80 rounded-2xl border border-stone-700">
            <span className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest">
              Kombo
            </span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">
              {combo}x
            </span>
          </div>

          <div className="text-center px-4 py-2 bg-stone-800/80 rounded-2xl border border-stone-700 hidden sm:block">
            <span className="block text-[11px] font-bold text-stone-400 uppercase tracking-widest">
              Tertinggi
            </span>
            <span className="text-2xl sm:text-3xl font-black text-stone-300">
              {highScore}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsSoundOn(!isSoundOn)}
              className="p-3 bg-stone-800 hover:bg-stone-700 rounded-xl border border-stone-700 text-stone-300 transition-colors"
              title={isSoundOn ? 'Matikan Suara' : 'Nyalakan Suara'}
            >
              {isSoundOn ? <Volume2 className="w-5 h-5 text-amber-400" /> : <VolumeX className="w-5 h-5 text-stone-500" />}
            </button>
            <button
              type="button"
              onClick={resetGame}
              className="p-3 bg-stone-800 hover:bg-stone-700 rounded-xl border border-stone-700 text-stone-300 transition-colors"
              title="Mulai Ulang Permainan"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 75" Landscape Arena: 2-Column Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Column: Phaser 3 60fps Radar Canvas */}
        <div className="lg:col-span-7 bg-stone-950/80 rounded-2xl border border-stone-800 p-2 relative flex flex-col items-center justify-center overflow-hidden min-h-[300px]">
          <div ref={gameContainerRef} className="w-full h-[300px] rounded-xl overflow-hidden" />

          {/* Central Target Display overlayed on Radar */}
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
            <div className="bg-stone-900/90 backdrop-blur-md px-6 py-3 rounded-2xl border-2 border-amber-500/80 shadow-2xl flex flex-col items-center animate-pulse">
              <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                Huruf Target
              </span>
              <span className="text-5xl sm:text-6xl font-black text-white my-1 font-mono">
                {currentTarget.char}
              </span>
              <span className="text-lg font-bold text-amber-300 tracking-widest font-mono">
                {currentTarget.morse}
              </span>
            </div>

            {feedback && (
              <div
                className={`mt-4 px-4 py-1.5 rounded-full bg-stone-950/90 font-black text-sm tracking-wider uppercase border border-stone-700 ${feedback.color} animate-bounce`}
              >
                {feedback.text}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Giant Touch Telegraf Paddles for 75" Interactive Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Level Switcher */}
          <div className="flex items-center gap-2 p-1.5 bg-stone-800/90 rounded-2xl border border-stone-700">
            <button
              type="button"
              onClick={() => {
                setLevel('siaga');
                resetGame();
              }}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                level === 'siaga'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Tingkat Siaga (Dasar)
            </button>
            <button
              type="button"
              onClick={() => {
                setLevel('penggalang');
                resetGame();
              }}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                level === 'penggalang'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Tingkat Penggalang (Lanjut)
            </button>
          </div>

          {/* Whistle Sound Selector */}
          <div className="bg-stone-800/80 p-2.5 rounded-2xl border border-stone-700 space-y-1.5">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
              Pilihan Suara Peluit:
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {WHISTLE_SOUND_OPTIONS.map((ws) => (
                <button
                  key={ws.id}
                  type="button"
                  onClick={() => setWhistleType(ws.id)}
                  className={`py-1.5 px-2 rounded-xl text-[10px] font-bold border transition-all text-center truncate cursor-pointer ${
                    whistleType === ws.id
                      ? 'bg-amber-600 text-white border-amber-500 shadow-xs'
                      : 'bg-stone-900/60 text-stone-300 border-stone-700 hover:bg-stone-700'
                  }`}
                  title={ws.desc}
                >
                  {ws.name.replace('Peluit ', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Current Progress Visualizer */}
          <div className="bg-stone-950/70 rounded-2xl border border-stone-800 p-4 text-center">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest block mb-2">
              Sinyal Input Anda Saat Ini
            </span>
            <div className="min-h-[50px] flex items-center justify-center gap-3">
              {currentTarget.morse.split('').map((_, idx) => {
                const enteredSymbol = currentInput[idx];
                const isCurrent = idx === currentInput.length;
                return (
                  <div
                    key={idx}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-black text-2xl border-2 transition-all ${
                      enteredSymbol
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : isCurrent
                        ? 'border-dashed border-stone-500 bg-stone-900/50 text-stone-600 animate-pulse'
                        : 'border-stone-800 bg-stone-900/30 text-stone-700'
                    }`}
                  >
                    {enteredSymbol || '?'}
                  </div>
                );
              })}
            </div>
          </div>

          {/* GIANT TOUCH TELEGRAF PADDLE (Ergonomic for 75" touch panel fingertips) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Big Dot Button */}
            <button
              type="button"
              onClick={() => handleInput('.')}
              className="group min-h-[96px] bg-gradient-to-b from-stone-800 to-stone-900 hover:from-amber-600 hover:to-amber-700 active:scale-95 rounded-2xl border-2 border-stone-700 hover:border-amber-400 shadow-xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-amber-400 shadow-md group-hover:scale-125 transition-transform" />
              <span className="text-base sm:text-lg font-black tracking-wide text-white">
                TITIK ( · )
              </span>
              <span className="text-[11px] text-stone-400 uppercase font-semibold">
                Ketuk Cepat
              </span>
            </button>

            {/* Big Dash Button */}
            <button
              type="button"
              onClick={() => handleInput('-')}
              className="group min-h-[96px] bg-gradient-to-b from-stone-800 to-stone-900 hover:from-amber-600 hover:to-amber-700 active:scale-95 rounded-2xl border-2 border-stone-700 hover:border-amber-400 shadow-xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <div className="w-16 h-5 rounded-full bg-amber-400 shadow-md group-hover:scale-110 transition-transform" />
              <span className="text-base sm:text-lg font-black tracking-wide text-white">
                GARIS ( — )
              </span>
              <span className="text-[11px] text-stone-400 uppercase font-semibold">
                Ketuk Panjang
              </span>
            </button>
          </div>

          {/* Friendly Instructions for Students */}
          <p className="text-xs text-stone-300 text-center leading-relaxed">
            💡 <strong className="text-amber-400">Cara Bermain:</strong> Ketuk tombol <strong>TITIK</strong> (ketukan cepat) atau <strong>GARIS</strong> (ketukan panjang) sesuai kode huruf di radar untuk mencetak skor tertinggi!
          </p>
        </div>
      </div>
    </div>
  );
};
