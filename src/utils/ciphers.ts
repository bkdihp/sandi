export interface CipherItem {
  char: string;
  morse: string;
  rumputDesc: string;
  kotakDesc: string;
  semaforDesc: string;
  category?: 'huruf' | 'angka' | 'tanda-baca';
}

export const MORSE_CHAR_MAP: Record<string, string> = {
  a: '.-',
  b: '-...',
  c: '-.-.',
  d: '-..',
  e: '.',
  f: '..-.',
  g: '--.',
  h: '....',
  i: '..',
  j: '.---',
  k: '-.-',
  l: '.-..',
  m: '--',
  n: '-.',
  o: '---',
  p: '.--.',
  q: '--.-',
  r: '.-.',
  s: '...',
  t: '-',
  u: '..-',
  v: '...-',
  w: '.--',
  x: '-..-',
  y: '-.--',
  z: '--..',
  '1': '.----',
  '2': '..---',
  '3': '...--',
  '4': '....-',
  '5': '.....',
  '6': '-....',
  '7': '--...',
  '8': '---..',
  '9': '----.',
  '0': '-----',
  '.': '.-.-.-',
  ',': '--..--',
  '?': '..--..',
  '/': '-..-.',
  '-': '-....-',
  '(': '-.--.',
  ')': '-.--.-',
  '=': '-...-',
  '+': '.-.-.',
  '@': '.--.-.',
};

// Inverted map for Morse decoding
export const REVERSE_MORSE_MAP: Record<string, string> = Object.entries(MORSE_CHAR_MAP).reduce(
  (acc, [char, code]) => {
    acc[code] = char;
    return acc;
  },
  {} as Record<string, string>
);

export function convertToMorse(input: string): string {
  const normalized = input.toLowerCase();
  const words = normalized.split(/\s+/);
  return words
    .map((word) =>
      word
        .split('')
        .map((ch) => MORSE_CHAR_MAP[ch] || ch)
        .join(' ')
    )
    .join('   ');
}

export function decodeMorse(morseInput: string): string {
  const trimmed = morseInput.trim();
  if (!trimmed) return '';

  // Standard morse uses 3 or more spaces between words, 1 space between letters
  const words = trimmed.split(/\s{3,}/);
  return words
    .map((word) => {
      const letters = word.trim().split(/\s+/);
      return letters
        .map((code) => {
          const cleanCode = code.replace(/[^.-]/g, '');
          return REVERSE_MORSE_MAP[cleanCode] || (code === '/' ? ' ' : code);
        })
        .join('');
    })
    .join(' ');
}

/**
 * Scout Cipher Reference Data for educational inspection
 */
export const SCOUT_ALPHABET_DATA: CipherItem[] = [
  // 1. Huruf A - Z
  { char: 'A', morse: '.-', rumputDesc: '1 pendek, 1 tinggi', kotakDesc: 'Kotak sudut kiri-atas (tanpa titik)', semaforDesc: 'Kanan serong bawah (jam 7:30), kiri lurus bawah (jam 6:00)', category: 'huruf' },
  { char: 'B', morse: '-...', rumputDesc: '1 tinggi, 3 pendek', kotakDesc: 'Kotak tengah-atas (tanpa titik)', semaforDesc: 'Kanan mendatar (jam 9:00), kiri lurus bawah (jam 6:00)', category: 'huruf' },
  { char: 'C', morse: '-.-.', rumputDesc: 'Tinggi, pendek, tinggi, pendek', kotakDesc: 'Kotak sudut kanan-atas (tanpa titik)', semaforDesc: 'Kanan serong atas (jam 10:30), kiri lurus bawah (jam 6:00)', category: 'huruf' },
  { char: 'D', morse: '-..', rumputDesc: '1 tinggi, 2 pendek', kotakDesc: 'Kotak tengah-kiri (tanpa titik)', semaforDesc: 'Kanan lurus atas (jam 12:00), kiri lurus bawah (jam 6:00)', category: 'huruf' },
  { char: 'E', morse: '.', rumputDesc: '1 rumput pendek', kotakDesc: 'Kotak pusat tengah (tanpa titik)', semaforDesc: 'Kanan lurus bawah (jam 6:00), kiri serong bawah (jam 4:30)', category: 'huruf' },
  { char: 'F', morse: '..-.', rumputDesc: '2 pendek, 1 tinggi, 1 pendek', kotakDesc: 'Kotak tengah-kanan (tanpa titik)', semaforDesc: 'Kanan lurus bawah (jam 6:00), kiri mendatar (jam 3:00)', category: 'huruf' },
  { char: 'G', morse: '--.', rumputDesc: '2 tinggi, 1 pendek', kotakDesc: 'Kotak sudut kiri-bawah (tanpa titik)', semaforDesc: 'Kanan lurus bawah (jam 6:00), kiri serong atas (jam 1:30)', category: 'huruf' },
  { char: 'H', morse: '....', rumputDesc: '4 rumput pendek', kotakDesc: 'Kotak tengah-bawah (tanpa titik)', semaforDesc: 'Kanan jam 7:30, kiri jam 4:30 (V bawah)', category: 'huruf' },
  { char: 'I', morse: '..', rumputDesc: '2 rumput pendek', kotakDesc: 'Kotak sudut kanan-bawah (tanpa titik)', semaforDesc: 'Kanan jam 7:30, kiri jam 3:00 mendatar', category: 'huruf' },
  { char: 'J', morse: '.---', rumputDesc: '1 pendek, 3 tinggi', kotakDesc: 'Kotak sudut kiri-atas (berisi titik)', semaforDesc: 'Kanan jam 9:00 mendatar, kiri jam 12:00 lurus atas', category: 'huruf' },
  { char: 'K', morse: '-.-', rumputDesc: '1 tinggi, 1 pendek, 1 tinggi', kotakDesc: 'Kotak tengah-atas (berisi titik)', semaforDesc: 'Kanan jam 7:30 serong bawah, kiri jam 12:00 lurus atas', category: 'huruf' },
  { char: 'L', morse: '.-..', rumputDesc: '1 pendek, 1 tinggi, 2 pendek', kotakDesc: 'Kotak sudut kanan-atas (berisi titik)', semaforDesc: 'Kanan jam 7:30, kiri jam 1:30 (diagonal menyilang)', category: 'huruf' },
  { char: 'M', morse: '--', rumputDesc: '2 rumput tinggi', kotakDesc: 'Kotak tengah-kiri (berisi titik)', semaforDesc: 'Kanan jam 7:30, kiri jam 10:30', category: 'huruf' },
  { char: 'N', morse: '-.', rumputDesc: '1 tinggi, 1 pendek', kotakDesc: 'Kotak pusat tengah (berisi titik)', semaforDesc: 'Kanan jam 7:30, kiri jam 9:00 mendatar', category: 'huruf' },
  { char: 'O', morse: '---', rumputDesc: '3 rumput tinggi', kotakDesc: 'Kotak tengah-kanan (berisi titik)', semaforDesc: 'Kanan jam 9:00 mendatar, kiri jam 1:30', category: 'huruf' },
  { char: 'P', morse: '.--.', rumputDesc: '1 pendek, 2 tinggi, 1 pendek', kotakDesc: 'Kotak sudut kiri-bawah (berisi titik)', semaforDesc: 'Kanan jam 9:00 mendatar, kiri jam 12:00 lurus atas', category: 'huruf' },
  { char: 'Q', morse: '--.-', rumputDesc: '2 tinggi, 1 pendek, 1 tinggi', kotakDesc: 'Kotak tengah-bawah (berisi titik)', semaforDesc: 'Kanan jam 9:00 mendatar, kiri jam 10:30 serong atas', category: 'huruf' },
  { char: 'R', morse: '.-.', rumputDesc: '1 pendek, 1 tinggi, 1 pendek', kotakDesc: 'Kotak sudut kanan-bawah (berisi titik)', semaforDesc: 'Kanan jam 9:00, kiri jam 3:00 (kedua lengan mendatar)', category: 'huruf' },
  { char: 'S', morse: '...', rumputDesc: '3 rumput pendek', kotakDesc: 'Salang silang X atas (tanpa titik)', semaforDesc: 'Kanan jam 9:00 mendatar, kiri jam 4:30 serong bawah', category: 'huruf' },
  { char: 'T', morse: '-', rumputDesc: '1 rumput tinggi', kotakDesc: 'Salang silang X kiri (tanpa titik)', semaforDesc: 'Kanan jam 10:30 serong atas, kiri jam 12:00 lurus atas', category: 'huruf' },
  { char: 'U', morse: '..-', rumputDesc: '2 pendek, 1 tinggi', kotakDesc: 'Salang silang X kanan (tanpa titik)', semaforDesc: 'Kanan jam 10:30, kiri jam 1:30 (kedua lengan V atas)', category: 'huruf' },
  { char: 'V', morse: '...-', rumputDesc: '3 pendek, 1 tinggi', kotakDesc: 'Salang silang X bawah (tanpa titik)', semaforDesc: 'Kanan jam 12:00 lurus atas, kiri jam 4:30 serong bawah', category: 'huruf' },
  { char: 'W', morse: '.--', rumputDesc: '1 pendek, 2 tinggi', kotakDesc: 'Salang silang X atas (berisi titik)', semaforDesc: 'Kanan jam 1:30, kiri jam 10:30 (silang atas)', category: 'huruf' },
  { char: 'X', morse: '-..-', rumputDesc: '1 tinggi, 2 pendek, 1 tinggi', kotakDesc: 'Salang silang X kiri (berisi titik)', semaforDesc: 'Kanan jam 4:30, kiri jam 10:30 (diagonal silang)', category: 'huruf' },
  { char: 'Y', morse: '-.--', rumputDesc: '1 tinggi, 1 pendek, 2 tinggi', kotakDesc: 'Salang silang X kanan (berisi titik)', semaforDesc: 'Kanan jam 10:30 serong atas, kiri jam 3:00 mendatar', category: 'huruf' },
  { char: 'Z', morse: '--..', rumputDesc: '2 tinggi, 2 pendek', kotakDesc: 'Salang silang X bawah (berisi titik)', semaforDesc: 'Kanan jam 3:00 mendatar, kiri jam 4:30 serong bawah', category: 'huruf' },

  // 2. Angka 0 - 9 (Formasi sama dengan A - K dengan tanda angka)
  { char: '1', morse: '.----', rumputDesc: '1 pendek, 4 tinggi', kotakDesc: 'Kotak Grid Angka 1 (Posisi A)', semaforDesc: 'Semafor Angka 1 (Formasi huruf A)', category: 'angka' },
  { char: '2', morse: '..---', rumputDesc: '2 pendek, 3 tinggi', kotakDesc: 'Kotak Grid Angka 2 (Posisi B)', semaforDesc: 'Semafor Angka 2 (Formasi huruf B)', category: 'angka' },
  { char: '3', morse: '...--', rumputDesc: '3 pendek, 2 tinggi', kotakDesc: 'Kotak Grid Angka 3 (Posisi C)', semaforDesc: 'Semafor Angka 3 (Formasi huruf C)', category: 'angka' },
  { char: '4', morse: '....-', rumputDesc: '4 pendek, 1 tinggi', kotakDesc: 'Kotak Grid Angka 4 (Posisi D)', semaforDesc: 'Semafor Angka 4 (Formasi huruf D)', category: 'angka' },
  { char: '5', morse: '.....', rumputDesc: '5 rumput pendek', kotakDesc: 'Kotak Grid Angka 5 (Posisi E)', semaforDesc: 'Semafor Angka 5 (Formasi huruf E)', category: 'angka' },
  { char: '6', morse: '-....', rumputDesc: '1 tinggi, 4 pendek', kotakDesc: 'Kotak Grid Angka 6 (Posisi F)', semaforDesc: 'Semafor Angka 6 (Formasi huruf F)', category: 'angka' },
  { char: '7', morse: '--...', rumputDesc: '2 tinggi, 3 pendek', kotakDesc: 'Kotak Grid Angka 7 (Posisi G)', semaforDesc: 'Semafor Angka 7 (Formasi huruf G)', category: 'angka' },
  { char: '8', morse: '---..', rumputDesc: '3 tinggi, 2 pendek', kotakDesc: 'Kotak Grid Angka 8 (Posisi H)', semaforDesc: 'Semafor Angka 8 (Formasi huruf H)', category: 'angka' },
  { char: '9', morse: '----.', rumputDesc: '4 tinggi, 1 pendek', kotakDesc: 'Kotak Grid Angka 9 (Posisi I)', semaforDesc: 'Semafor Angka 9 (Formasi huruf I)', category: 'angka' },
  { char: '0', morse: '-----', rumputDesc: '5 rumput tinggi', kotakDesc: 'Kotak Grid Angka 0 (Posisi K)', semaforDesc: 'Semafor Angka 0 (Formasi huruf K)', category: 'angka' },

  // 3. Tanda Baca Relevan Sandi
  { char: '.', morse: '.-.-.-', rumputDesc: 'Pendek-tinggi (diulang 3x)', kotakDesc: 'Simbol Titik (.) Tanda Henti', semaforDesc: 'Tanda Henti Kalimat', category: 'tanda-baca' },
  { char: ',', morse: '--..--', rumputDesc: '2 tinggi, 2 pendek, 2 tinggi', kotakDesc: 'Simbol Koma (,) Tanda Jeda', semaforDesc: 'Tanda Jeda Kalimat', category: 'tanda-baca' },
  { char: '?', morse: '..--..', rumputDesc: '2 pendek, 2 tinggi, 2 pendek', kotakDesc: 'Simbol Tanya (?) Pertanyaan', semaforDesc: 'Tanda Pertanyaan Sandi', category: 'tanda-baca' },
  { char: '-', morse: '-....-', rumputDesc: '1 tinggi, 4 pendek, 1 tinggi', kotakDesc: 'Simbol Hubung (-) Strip', semaforDesc: 'Tanda Sambung Kata', category: 'tanda-baca' },
  { char: '/', morse: '-..-.', rumputDesc: '1 tinggi, 2 pendek, 1 tinggi, 1 pendek', kotakDesc: 'Simbol Garis Miring (/) Pemisah', semaforDesc: 'Pemisah Kata Sandi', category: 'tanda-baca' },
  { char: '!', morse: '-.-.--', rumputDesc: 'Tinggi, pendek, tinggi, pendek, 2 tinggi', kotakDesc: 'Simbol Seru (!) Perintah', semaforDesc: 'Tanda Perintah Penting', category: 'tanda-baca' },
];

export type WhistleSoundType =
  | 'peluit-pramuka'
  | 'fox-40'
  | 'peluit-kayu'
  | 'telegraf'
  | 'nada-lembut';

export interface WhistleSoundMeta {
  id: WhistleSoundType;
  name: string;
  shortName: string;
  badge: string;
  icon: string;
  desc: string;
  defaultPitch: number;
}

export const WHISTLE_SOUND_OPTIONS: WhistleSoundMeta[] = [
  {
    id: 'peluit-pramuka',
    name: 'Peluit Logam Pramuka',
    shortName: 'Logam',
    badge: 'Klasik',
    icon: '🪙',
    desc: 'Suara peluit beroda khas pramuka dengan getaran kelereng nyata',
    defaultPitch: 2400,
  },
  {
    id: 'fox-40',
    name: 'Peluit Fox 40 Sonik',
    shortName: 'Sonik',
    badge: 'Nyaring',
    icon: '⚡',
    desc: 'Peluit tanpa kelereng, nada tinggi jernih dan tajam',
    defaultPitch: 2900,
  },
  {
    id: 'peluit-kayu',
    name: 'Peluit Bambu Rimba',
    shortName: 'Bambu',
    badge: 'Alami',
    icon: '🎋',
    desc: 'Nada kayu bambu tradisional yang hangat dan merdu',
    defaultPitch: 880,
  },
  {
    id: 'telegraf',
    name: 'Nada Telegraf Radio',
    shortName: 'Radio',
    badge: 'Elektronik',
    icon: '📻',
    desc: 'Sinyal morse radio telegrafi klasik (650Hz)',
    defaultPitch: 650,
  },
  {
    id: 'nada-lembut',
    name: 'Peluit Lembut Siaga',
    shortName: 'Lembut',
    badge: 'Nyaman',
    icon: '🧸',
    desc: 'Nada halus dan empuk, nyaman didengar berulang kali',
    defaultPitch: 480,
  },
];

/**
 * Authentic Audio Synthesizer for Scout Morse Code
 * Supports multiple whistle sound types, realistic acoustic models,
 * beginner-friendly slow speeds (4 - 25 WPM), and pulse visualizer.
 */
export class MorsePlayer {
  private audioCtx: AudioContext | null = null;
  private masterGainNode: GainNode | null = null;
  private isPlaying = false;
  private timeoutIds: number[] = [];
  public onPulse?: (active: boolean, char?: string) => void;

  private initCtx() {
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      this.masterGainNode = this.audioCtx.createGain();
      this.masterGainNode.gain.setValueAtTime(1, this.audioCtx.currentTime);
      this.masterGainNode.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    if (this.masterGainNode) {
      this.masterGainNode.gain.setValueAtTime(1, this.audioCtx.currentTime);
    }
  }

  play(
    morse: string,
    options: {
      wpm?: number;
      frequency?: number;
      soundType?: WhistleSoundType;
    } = {},
    onEnded?: () => void
  ) {
    this.stop();
    this.initCtx();
    if (!this.audioCtx || !this.masterGainNode) return;

    this.isPlaying = true;
    this.masterGainNode.gain.setValueAtTime(1, this.audioCtx.currentTime);
    // Default speed: 6 WPM (beginner friendly for school kids!)
    const wpm = Math.max(3, options.wpm || 6);
    const soundType = options.soundType || 'peluit-pramuka';
    const defaultMeta = WHISTLE_SOUND_OPTIONS.find((s) => s.id === soundType);
    const frequency = options.frequency || defaultMeta?.defaultPitch || 2400;

    // Standard Morse timing: dot = 1200 / WPM ms
    const dotDuration = Math.round(1200 / wpm);
    const dashDuration = dotDuration * 3;
    const symbolGap = dotDuration;
    const letterGap = dotDuration * 3;
    const wordGap = dotDuration * 7;

    let currentTime = 0;

    for (let i = 0; i < morse.length; i++) {
      const char = morse[i];
      if (char === '.') {
        const playTime = currentTime;
        const tid = window.setTimeout(() => {
          if (this.isPlaying) {
            this.beep(dotDuration, frequency, soundType);
            if (this.onPulse) this.onPulse(true, '.');
          }
        }, playTime);
        const resetTid = window.setTimeout(() => {
          if (this.isPlaying && this.onPulse) this.onPulse(false);
        }, playTime + dotDuration);

        this.timeoutIds.push(tid, resetTid);
        currentTime += dotDuration + symbolGap;
      } else if (char === '-') {
        const playTime = currentTime;
        const tid = window.setTimeout(() => {
          if (this.isPlaying) {
            this.beep(dashDuration, frequency, soundType);
            if (this.onPulse) this.onPulse(true, '-');
          }
        }, playTime);
        const resetTid = window.setTimeout(() => {
          if (this.isPlaying && this.onPulse) this.onPulse(false);
        }, playTime + dashDuration);

        this.timeoutIds.push(tid, resetTid);
        currentTime += dashDuration + symbolGap;
      } else if (char === ' ') {
        // Count consecutive spaces to distinguish letter gap vs word gap
        let spaceCount = 0;
        while (i < morse.length && morse[i] === ' ') {
          spaceCount++;
          i++;
        }
        i--; // decrement back so outer loop index aligns

        // Subtract symbolGap since previous dot/dash already added 1 unit of gap
        if (spaceCount >= 2) {
          currentTime += Math.max(0, wordGap - symbolGap);
        } else {
          currentTime += Math.max(0, letterGap - symbolGap);
        }
      }
    }

    const endTid = window.setTimeout(() => {
      this.isPlaying = false;
      if (this.onPulse) this.onPulse(false);
      if (onEnded) onEnded();
    }, currentTime + 100);

    this.timeoutIds.push(endTid);
  }

  /**
   * Play a quick sample of the whistle ("· —") to preview sound & speed
   */
  preview(soundType: WhistleSoundType, wpm = 6, frequency?: number) {
    this.play('.-', { wpm, soundType, frequency });
  }

  private beep(durationMs: number, frequency: number, soundType: WhistleSoundType) {
    if (!this.audioCtx) return;
    try {
      const now = this.audioCtx.currentTime;
      const durSec = Math.max(0.02, durationMs / 1000);
      const masterGain = this.audioCtx.createGain();
      if (this.masterGainNode) {
        masterGain.connect(this.masterGainNode);
      } else {
        masterGain.connect(this.audioCtx.destination);
      }

      const attack = Math.min(0.012, durSec * 0.25);
      const release = Math.min(0.015, durSec * 0.25);
      const sustainEnd = Math.max(now + attack, now + durSec - release);

      if (soundType === 'peluit-pramuka') {
        // Authentic Metal Pea Whistle with trill/vibrato
        const osc1 = this.audioCtx.createOscillator();
        const osc2 = this.audioCtx.createOscillator();
        const lfo = this.audioCtx.createOscillator();
        const lfoGain = this.audioCtx.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';
        osc1.frequency.setValueAtTime(frequency, now);
        osc2.frequency.setValueAtTime(frequency * 1.18, now);

        // Pea rotation vibrato (28 Hz flutter, depth 45 Hz)
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(28, now);
        lfoGain.gain.setValueAtTime(45, now);
        lfo.connect(lfoGain);
        lfoGain.connect(osc1.frequency);
        lfoGain.connect(osc2.frequency);

        // Whistle breath envelope
        masterGain.gain.setValueAtTime(0.0001, now);
        masterGain.gain.linearRampToValueAtTime(0.24, now + attack);
        masterGain.gain.setValueAtTime(0.24, sustainEnd);
        masterGain.gain.linearRampToValueAtTime(0.0001, now + durSec);

        osc1.connect(masterGain);
        osc2.connect(masterGain);

        osc1.start(now);
        osc2.start(now);
        lfo.start(now);
        osc1.stop(now + durSec);
        osc2.stop(now + durSec);
        lfo.stop(now + durSec);
      } else if (soundType === 'fox-40') {
        // High-pitched pealess harmonic whistle
        const osc1 = this.audioCtx.createOscillator();
        const osc2 = this.audioCtx.createOscillator();

        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(frequency, now);
        osc2.frequency.setValueAtTime(frequency * 1.15, now);

        masterGain.gain.setValueAtTime(0.0001, now);
        masterGain.gain.linearRampToValueAtTime(0.18, now + attack);
        masterGain.gain.setValueAtTime(0.18, sustainEnd);
        masterGain.gain.linearRampToValueAtTime(0.0001, now + durSec);

        osc1.connect(masterGain);
        osc2.connect(masterGain);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + durSec);
        osc2.stop(now + durSec);
      } else if (soundType === 'peluit-kayu') {
        // Bamboo/Wood whistle with warm organic undertone
        const osc1 = this.audioCtx.createOscillator();
        const osc2 = this.audioCtx.createOscillator();

        osc1.type = 'triangle';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(frequency, now);
        osc2.frequency.setValueAtTime(frequency * 2, now);

        masterGain.gain.setValueAtTime(0.0001, now);
        masterGain.gain.linearRampToValueAtTime(0.25, now + attack);
        masterGain.gain.setValueAtTime(0.25, sustainEnd);
        masterGain.gain.linearRampToValueAtTime(0.0001, now + durSec);

        const subGain = this.audioCtx.createGain();
        subGain.gain.setValueAtTime(0.15, now);
        osc2.connect(subGain);
        subGain.connect(masterGain);
        osc1.connect(masterGain);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + durSec);
        osc2.stop(now + durSec);
      } else if (soundType === 'telegraf') {
        // Classic Radio Morse Beep (Pure Sine 650Hz)
        const osc = this.audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, now);

        masterGain.gain.setValueAtTime(0.0001, now);
        masterGain.gain.linearRampToValueAtTime(0.25, now + attack);
        masterGain.gain.setValueAtTime(0.25, sustainEnd);
        masterGain.gain.linearRampToValueAtTime(0.0001, now + durSec);

        osc.connect(masterGain);
        osc.start(now);
        osc.stop(now + durSec);
      } else {
        // Nada Lembut Siaga (Gentle & soft for beginners' ears)
        const osc = this.audioCtx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(frequency, now);

        masterGain.gain.setValueAtTime(0.0001, now);
        masterGain.gain.linearRampToValueAtTime(0.2, now + attack);
        masterGain.gain.setValueAtTime(0.2, sustainEnd);
        masterGain.gain.linearRampToValueAtTime(0.0001, now + durSec);

        osc.connect(masterGain);
        osc.start(now);
        osc.stop(now + durSec);
      }
    } catch {
      // Audio context might need user gesture
    }
  }

  stop() {
    this.isPlaying = false;
    this.timeoutIds.forEach((id) => clearTimeout(id));
    this.timeoutIds = [];
    if (this.masterGainNode && this.audioCtx) {
      try {
        this.masterGainNode.gain.setValueAtTime(0, this.audioCtx.currentTime);
      } catch {
        // Safe fallback
      }
    }
    if (this.onPulse) this.onPulse(false);
  }

  getPlaying() {
    return this.isPlaying;
  }
}
