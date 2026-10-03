export interface SemaphorePose {
  char: string;
  leftAngleDeg: number;
  rightAngleDeg: number;
  leftClock: string;
  rightClock: string;
  desc: string;
}

export const REST_POSE: SemaphorePose = {
  char: ' ',
  leftAngleDeg: 180,
  rightAngleDeg: 180,
  leftClock: 'Jam 6',
  rightClock: 'Jam 6',
  desc: 'Posisi siap / istirahat (kedua bendera lurus ke bawah)',
};

export const SEMAPHORE_POSES_RECORD: Record<string, SemaphorePose> = {
  A: { char: 'A', leftAngleDeg: 180, rightAngleDeg: 135, leftClock: 'Jam 6', rightClock: 'Jam 7', desc: 'Kiri jam 6, kanan jam 7' },
  B: { char: 'B', leftAngleDeg: 180, rightAngleDeg: 90, leftClock: 'Jam 6', rightClock: 'Jam 8', desc: 'Kiri jam 6, kanan jam 8' },
  C: { char: 'C', leftAngleDeg: 180, rightAngleDeg: 45, leftClock: 'Jam 6', rightClock: 'Jam 9', desc: 'Kiri jam 6, kanan jam 9' },
  D: { char: 'D', leftAngleDeg: 180, rightAngleDeg: 0, leftClock: 'Jam 6', rightClock: 'Jam 12', desc: 'Kiri jam 6, kanan jam 12' },
  E: { char: 'E', leftAngleDeg: 225, rightAngleDeg: 180, leftClock: 'Jam 5', rightClock: 'Jam 6', desc: 'Kiri jam 5, kanan jam 6' },
  F: { char: 'F', leftAngleDeg: 270, rightAngleDeg: 180, leftClock: 'Jam 4', rightClock: 'Jam 6', desc: 'Kiri jam 4, kanan jam 6' },
  G: { char: 'G', leftAngleDeg: 315, rightAngleDeg: 180, leftClock: 'Jam 3', rightClock: 'Jam 6', desc: 'Kiri jam 3, kanan jam 6' },
  H: { char: 'H', leftAngleDeg: 225, rightAngleDeg: 90, leftClock: 'Jam 5', rightClock: 'Jam 8', desc: 'Kiri jam 5, kanan jam 8' },
  I: { char: 'I', leftAngleDeg: 225, rightAngleDeg: 45, leftClock: 'Jam 5', rightClock: 'Jam 9', desc: 'Kiri jam 5, kanan jam 9' },
  J: { char: 'J', leftAngleDeg: 90, rightAngleDeg: 0, leftClock: 'Jam 8', rightClock: 'Jam 12', desc: 'Kiri jam 8, kanan jam 12' },
  K: { char: 'K', leftAngleDeg: 225, rightAngleDeg: 0, leftClock: 'Jam 5', rightClock: 'Jam 12', desc: 'Kiri jam 5, kanan jam 12' },
  L: { char: 'L', leftAngleDeg: 225, rightAngleDeg: 315, leftClock: 'Jam 5', rightClock: 'Jam 11', desc: 'Kiri jam 5, kanan jam 11' },
  M: { char: 'M', leftAngleDeg: 225, rightAngleDeg: 270, leftClock: 'Jam 5', rightClock: 'Jam 10', desc: 'Kiri jam 5, kanan jam 10' },
  N: { char: 'N', leftAngleDeg: 225, rightAngleDeg: 135, leftClock: 'Jam 5', rightClock: 'Jam 7', desc: 'Kiri jam 5, kanan jam 7' },
  O: { char: 'O', leftAngleDeg: 270, rightAngleDeg: 45, leftClock: 'Jam 4', rightClock: 'Jam 9', desc: 'Kiri jam 4, kanan jam 9' },
  P: { char: 'P', leftAngleDeg: 270, rightAngleDeg: 0, leftClock: 'Jam 4', rightClock: 'Jam 12', desc: 'Kiri jam 4, kanan jam 12' },
  Q: { char: 'Q', leftAngleDeg: 270, rightAngleDeg: 315, leftClock: 'Jam 4', rightClock: 'Jam 11', desc: 'Kiri jam 4, kanan jam 11' },
  R: { char: 'R', leftAngleDeg: 270, rightAngleDeg: 90, leftClock: 'Jam 4', rightClock: 'Jam 8', desc: 'Kiri jam 4, kanan jam 8' },
  S: { char: 'S', leftAngleDeg: 270, rightAngleDeg: 135, leftClock: 'Jam 4', rightClock: 'Jam 7', desc: 'Kiri jam 4, kanan jam 7' },
  T: { char: 'T', leftAngleDeg: 315, rightAngleDeg: 0, leftClock: 'Jam 3', rightClock: 'Jam 12', desc: 'Kiri jam 3, kanan jam 12' },
  U: { char: 'U', leftAngleDeg: 315, rightAngleDeg: 45, leftClock: 'Jam 3', rightClock: 'Jam 9', desc: 'Kiri jam 3, kanan jam 9' },
  V: { char: 'V', leftAngleDeg: 180, rightAngleDeg: 315, leftClock: 'Jam 6', rightClock: 'Jam 11', desc: 'Kiri jam 6, kanan jam 11' },
  W: { char: 'W', leftAngleDeg: 315, rightAngleDeg: 45, leftClock: 'Jam 3', rightClock: 'Jam 9', desc: 'Kiri jam 3, kanan jam 9' },
  X: { char: 'X', leftAngleDeg: 225, rightAngleDeg: 315, leftClock: 'Jam 5', rightClock: 'Jam 11', desc: 'Kiri jam 5, kanan jam 11' },
  Y: { char: 'Y', leftAngleDeg: 315, rightAngleDeg: 90, leftClock: 'Jam 3', rightClock: 'Jam 8', desc: 'Kiri jam 3, kanan jam 8' },
  Z: { char: 'Z', leftAngleDeg: 90, rightAngleDeg: 315, leftClock: 'Jam 8', rightClock: 'Jam 11', desc: 'Kiri jam 8, kanan jam 11' },

  // Numbers 1 - 0 share positions with A - K (preceded by numeral sign in semaphore practice)
  '1': { char: '1', leftAngleDeg: 180, rightAngleDeg: 135, leftClock: 'Jam 6', rightClock: 'Jam 7', desc: 'Angka 1 (posisi A)' },
  '2': { char: '2', leftAngleDeg: 180, rightAngleDeg: 90, leftClock: 'Jam 6', rightClock: 'Jam 8', desc: 'Angka 2 (posisi B)' },
  '3': { char: '3', leftAngleDeg: 180, rightAngleDeg: 45, leftClock: 'Jam 6', rightClock: 'Jam 9', desc: 'Angka 3 (posisi C)' },
  '4': { char: '4', leftAngleDeg: 180, rightAngleDeg: 0, leftClock: 'Jam 6', rightClock: 'Jam 12', desc: 'Angka 4 (posisi D)' },
  '5': { char: '5', leftAngleDeg: 225, rightAngleDeg: 180, leftClock: 'Jam 5', rightClock: 'Jam 6', desc: 'Angka 5 (posisi E)' },
  '6': { char: '6', leftAngleDeg: 270, rightAngleDeg: 180, leftClock: 'Jam 4', rightClock: 'Jam 6', desc: 'Angka 6 (posisi F)' },
  '7': { char: '7', leftAngleDeg: 315, rightAngleDeg: 180, leftClock: 'Jam 3', rightClock: 'Jam 6', desc: 'Angka 7 (posisi G)' },
  '8': { char: '8', leftAngleDeg: 225, rightAngleDeg: 90, leftClock: 'Jam 5', rightClock: 'Jam 8', desc: 'Angka 8 (posisi H)' },
  '9': { char: '9', leftAngleDeg: 225, rightAngleDeg: 45, leftClock: 'Jam 5', rightClock: 'Jam 9', desc: 'Angka 9 (posisi I)' },
  '0': { char: '0', leftAngleDeg: 225, rightAngleDeg: 0, leftClock: 'Jam 5', rightClock: 'Jam 12', desc: 'Angka 0 (posisi K)' },
};

export const ALL_SEMAPHORE_POSES: SemaphorePose[] = Object.values(SEMAPHORE_POSES_RECORD);

export function getSemaphorePose(char: string): SemaphorePose {
  const upper = char.toUpperCase();
  return SEMAPHORE_POSES_RECORD[upper] || REST_POSE;
}
