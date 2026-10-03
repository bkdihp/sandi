export interface CipherItem {
  char: string;
  morse: string;
  rumputDesc: string;
  kotakDesc: string;
  semaforDesc: string;
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
  { char: 'A', morse: '.-', rumputDesc: '1 pendek, 1 tinggi', kotakDesc: 'Kotak sudut kiri-atas (tanpa titik)', semaforDesc: 'Tangan kiri arah jam 6, kanan jam 7' },
  { char: 'B', morse: '-...', rumputDesc: '1 tinggi, 3 pendek', kotakDesc: 'Kotak tengah-atas (tanpa titik)', semaforDesc: 'Tangan kiri arah jam 6, kanan jam 8' },
  { char: 'C', morse: '-.-.', rumputDesc: 'Tinggi, pendek, tinggi, pendek', kotakDesc: 'Kotak sudut kanan-atas (tanpa titik)', semaforDesc: 'Tangan kiri arah jam 6, kanan jam 9' },
  { char: 'D', morse: '-..', rumputDesc: '1 tinggi, 2 pendek', kotakDesc: 'Kotak tengah-kiri (tanpa titik)', semaforDesc: 'Tangan kiri arah jam 6, kanan jam 10' },
  { char: 'E', morse: '.', rumputDesc: '1 rumput pendek', kotakDesc: 'Kotak pusat tengah (tanpa titik)', semaforDesc: 'Tangan kiri arah jam 6, kanan jam 11' },
  { char: 'F', morse: '..-.', rumputDesc: '2 pendek, 1 tinggi, 1 pendek', kotakDesc: 'Kotak tengah-kanan (tanpa titik)', semaforDesc: 'Tangan kiri arah jam 6, kanan jam 12' },
  { char: 'G', morse: '--.', rumputDesc: '2 tinggi, 1 pendek', kotakDesc: 'Kotak sudut kiri-bawah (tanpa titik)', semaforDesc: 'Tangan kiri arah jam 6, kanan jam 1' },
  { char: 'H', morse: '....', rumputDesc: '4 rumput pendek', kotakDesc: 'Kotak tengah-bawah (tanpa titik)', semaforDesc: 'Tangan kiri arah jam 7, kanan jam 8' },
  { char: 'I', morse: '..', rumputDesc: '2 rumput pendek', kotakDesc: 'Kotak sudut kanan-bawah (tanpa titik)', semaforDesc: 'Tangan kiri arah jam 7, kanan jam 9' },
  { char: 'J', morse: '.---', rumputDesc: '1 pendek, 3 tinggi', kotakDesc: 'Kotak sudut kiri-atas (berisi titik)', semaforDesc: 'Tangan kiri arah jam 9, kanan jam 12' },
  { char: 'K', morse: '-.-', rumputDesc: '1 tinggi, 1 pendek, 1 tinggi', kotakDesc: 'Kotak tengah-atas (berisi titik)', semaforDesc: 'Tangan kiri arah jam 7, kanan jam 10' },
  { char: 'L', morse: '.-..', rumputDesc: '1 pendek, 1 tinggi, 2 pendek', kotakDesc: 'Kotak sudut kanan-atas (berisi titik)', semaforDesc: 'Tangan kiri arah jam 7, kanan jam 11' },
  { char: 'M', morse: '--', rumputDesc: '2 rumput tinggi', kotakDesc: 'Kotak tengah-kiri (berisi titik)', semaforDesc: 'Tangan kiri arah jam 7, kanan jam 12' },
  { char: 'N', morse: '-.', rumputDesc: '1 tinggi, 1 pendek', kotakDesc: 'Kotak pusat tengah (berisi titik)', semaforDesc: 'Tangan kiri arah jam 7, kanan jam 1' },
  { char: 'O', morse: '---', rumputDesc: '3 rumput tinggi', kotakDesc: 'Kotak tengah-kanan (berisi titik)', semaforDesc: 'Tangan kiri arah jam 8, kanan jam 9' },
  { char: 'P', morse: '.--.', rumputDesc: '1 pendek, 2 tinggi, 1 pendek', kotakDesc: 'Kotak sudut kiri-bawah (berisi titik)', semaforDesc: 'Tangan kiri arah jam 8, kanan jam 10' },
  { char: 'Q', morse: '--.-', rumputDesc: '2 tinggi, 1 pendek, 1 tinggi', kotakDesc: 'Kotak tengah-bawah (berisi titik)', semaforDesc: 'Tangan kiri arah jam 8, kanan jam 11' },
  { char: 'R', morse: '.-.', rumputDesc: '1 pendek, 1 tinggi, 1 pendek', kotakDesc: 'Kotak sudut kanan-bawah (berisi titik)', semaforDesc: 'Tangan kiri arah jam 8, kanan jam 12' },
  { char: 'S', morse: '...', rumputDesc: '3 rumput pendek', kotakDesc: 'Salang silang X atas (tanpa titik)', semaforDesc: 'Tangan kiri arah jam 8, kanan jam 1' },
  { char: 'T', morse: '-', rumputDesc: '1 rumput tinggi', kotakDesc: 'Salang silang X kiri (tanpa titik)', semaforDesc: 'Tangan kiri arah jam 9, kanan jam 10' },
  { char: 'U', morse: '..-', rumputDesc: '2 pendek, 1 tinggi', kotakDesc: 'Salang silang X kanan (tanpa titik)', semaforDesc: 'Tangan kiri arah jam 9, kanan jam 11' },
  { char: 'V', morse: '...-', rumputDesc: '3 pendek, 1 tinggi', kotakDesc: 'Salang silang X bawah (tanpa titik)', semaforDesc: 'Tangan kiri arah jam 9, kanan jam 1' },
  { char: 'W', morse: '.--', rumputDesc: '1 pendek, 2 tinggi', kotakDesc: 'Salang silang X atas (berisi titik)', semaforDesc: 'Tangan kiri arah jam 10, kanan jam 11' },
  { char: 'X', morse: '-..-', rumputDesc: '1 tinggi, 2 pendek, 1 tinggi', kotakDesc: 'Salang silang X kiri (berisi titik)', semaforDesc: 'Tangan kiri arah jam 10, kanan jam 1' },
  { char: 'Y', morse: '-.--', rumputDesc: '1 tinggi, 1 pendek, 2 tinggi', kotakDesc: 'Salang silang X kanan (berisi titik)', semaforDesc: 'Tangan kiri arah jam 10, kanan jam 12' },
  { char: 'Z', morse: '--..', rumputDesc: '2 tinggi, 2 pendek', kotakDesc: 'Salang silang X bawah (berisi titik)', semaforDesc: 'Tangan kiri arah jam 11, kanan jam 1' },
];

/**
 * Enterprise Audio Synthesizer for Morse Code
 * Supports live pitch adjusting, speed (WPM), active pulse visualizer callback.
 */
export class MorsePlayer {
  private audioCtx: AudioContext | null = null;
  private isPlaying = false;
  private timeoutIds: number[] = [];
  public onPulse?: (active: boolean, char?: string) => void;

  private initCtx() {
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  play(
    morse: string,
    options: { wpm?: number; frequency?: number } = {},
    onEnded?: () => void
  ) {
    this.stop();
    this.initCtx();
    if (!this.audioCtx) return;

    this.isPlaying = true;
    const wpm = options.wpm || 15; // standard PARIS standard 15 WPM
    const frequency = options.frequency || 650; // standard scout whistle tone

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
            this.beep(dotDuration, frequency);
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
            this.beep(dashDuration, frequency);
            if (this.onPulse) this.onPulse(true, '-');
          }
        }, playTime);
        const resetTid = window.setTimeout(() => {
          if (this.isPlaying && this.onPulse) this.onPulse(false);
        }, playTime + dashDuration);

        this.timeoutIds.push(tid, resetTid);
        currentTime += dashDuration + symbolGap;
      } else if (char === ' ') {
        currentTime += morse[i + 1] === ' ' ? wordGap : letterGap;
      }
    }

    const endTid = window.setTimeout(() => {
      this.isPlaying = false;
      if (this.onPulse) this.onPulse(false);
      if (onEnded) onEnded();
    }, currentTime + 100);

    this.timeoutIds.push(endTid);
  }

  private beep(durationMs: number, frequency: number) {
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

      // Smooth attack and decay to prevent audible pop/click
      gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.25, this.audioCtx.currentTime + 0.005);
      gain.gain.setValueAtTime(0.25, this.audioCtx.currentTime + durationMs / 1000 - 0.005);
      gain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + durationMs / 1000);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + durationMs / 1000);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  stop() {
    this.isPlaying = false;
    this.timeoutIds.forEach((id) => clearTimeout(id));
    this.timeoutIds = [];
    if (this.onPulse) this.onPulse(false);
  }

  getPlaying() {
    return this.isPlaying;
  }
}
