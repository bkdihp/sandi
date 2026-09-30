export const MORSE_CHAR_MAP: Record<string, string> = {
  a: '.- ',
  b: '-... ',
  c: '-.-. ',
  d: '-.. ',
  e: '. ',
  f: '..-. ',
  g: '--. ',
  h: '.... ',
  i: '.. ',
  j: '.--- ',
  k: '-.- ',
  l: '.-.. ',
  m: '-- ',
  n: '-. ',
  o: '--- ',
  p: '.--. ',
  q: '--.- ',
  r: '.-. ',
  s: '... ',
  t: '- ',
  u: '..- ',
  v: '...- ',
  w: '.-- ',
  x: '-..- ',
  y: '-.-- ',
  z: '--.. ',
  '1': '.---- ',
  '2': '..--- ',
  '3': '...-- ',
  '4': '....- ',
  '5': '..... ',
  '6': '-.... ',
  '7': '--... ',
  '8': '---.. ',
  '9': '----. ',
  '0': '---- ',
  ' ': '   ',
  '.': '.-.-.- ',
  ',': '--..-- ',
  '?': '..--.. ',
  '/': '-..-. ',
  '-': '-....- ',
  '(': '-.--. ',
  ')': '-.--.- ',
};

export function convertToMorse(input: string): string {
  const normalized = input.toLowerCase();
  let result = '';
  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i];
    if (MORSE_CHAR_MAP[ch]) {
      result += MORSE_CHAR_MAP[ch];
    } else if (ch === '\n') {
      result += '\n';
    } else {
      result += ch + ' ';
    }
  }
  return result.trimEnd();
}

/**
 * Audio beeper for Morse code using Web Audio API
 */
export class MorsePlayer {
  private audioCtx: AudioContext | null = null;
  private isPlaying = false;
  private timeoutIds: number[] = [];

  private initCtx() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  play(morse: string, onEnded?: () => void) {
    this.stop();
    this.initCtx();
    if (!this.audioCtx) return;

    this.isPlaying = true;
    const dotDuration = 80; // ms
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
          if (this.isPlaying) this.beep(dotDuration);
        }, playTime);
        this.timeoutIds.push(tid);
        currentTime += dotDuration + symbolGap;
      } else if (char === '-') {
        const playTime = currentTime;
        const tid = window.setTimeout(() => {
          if (this.isPlaying) this.beep(dashDuration);
        }, playTime);
        this.timeoutIds.push(tid);
        currentTime += dashDuration + symbolGap;
      } else if (char === ' ') {
        currentTime += (morse[i + 1] === ' ') ? wordGap : letterGap;
      }
    }

    const endTid = window.setTimeout(() => {
      this.isPlaying = false;
      if (onEnded) onEnded();
    }, currentTime + 100);
    this.timeoutIds.push(endTid);
  }

  private beep(durationMs: number) {
    if (!this.audioCtx) return;
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, this.audioCtx.currentTime); // standard 650Hz pitch

      gain.gain.setValueAtTime(0, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, this.audioCtx.currentTime + 0.005);
      gain.gain.setValueAtTime(0.2, this.audioCtx.currentTime + (durationMs / 1000) - 0.005);
      gain.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + (durationMs / 1000));

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + durationMs / 1000);
    } catch {
      // ignore audio context restrictions
    }
  }

  stop() {
    this.isPlaying = false;
    this.timeoutIds.forEach((id) => clearTimeout(id));
    this.timeoutIds = [];
  }

  getPlaying() {
    return this.isPlaying;
  }
}
