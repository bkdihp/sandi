/**
 * Definitive Indonesian Scout (Gerakan Pramuka) & International Semaphore Code
 *
 * Sesuai metode resmi 8 Penjuru Mata Angin / Rumus Jarum Jam:
 * Titik 1: 180° (Arah Jam 6:00 - Bawah Lurus / Siap)
 * Titik 2: 225° (Arah Jam 7:30 - Kiri Bawah Layar / Kanan Bawah Pengirim)
 * Titik 3: 270° (Arah Jam 9:00 - Kiri Mendatar Layar / Kanan Mendatar Pengirim)
 * Titik 4: 315° (Arah Jam 10:30 - Kiri Atas Layar / Kanan Atas Pengirim)
 * Titik 5: 0°   (Arah Jam 12:00 - Atas Lurus)
 * Titik 6: 45°  (Arah Jam 1:30 - Kanan Atas Layar / Kiri Atas Pengirim)
 * Titik 7: 90°  (Arah Jam 3:00 - Kanan Mendatar Layar / Kiri Mendatar Pengirim)
 * Titik 8: 135° (Arah Jam 4:30 - Kanan Bawah Layar / Kiri Bawah Pengirim)
 */

export interface SemaphorePose {
  char: string;
  circle: number;       // Lingkaran / Kunci 1 - 7
  point1: number;       // Titik pertama (1-8)
  point2: number;       // Titik kedua (1-8)
  // Sudut pada layar saat Menghadap Penonton (Tampak Depan / Audiens)
  // 0° = Atas lurus (Jam 12), searah jarum jam
  rightArmDeg: number;  // Lengan Kanan Figur (tampak di sebelah kiri layar penonton)
  leftArmDeg: number;   // Lengan Kiri Figur (tampak di sebelah kanan layar penonton)
  rightClock: string;   // e.g. "Jam 7:30"
  leftClock: string;    // e.g. "Jam 6:00"
  desc: string;         // Deskripsi posisi
  kunciName: string;    // e.g. "Kunci 1 (Titik 1 & 2)"
}

export const REST_POSE: SemaphorePose = {
  char: ' ',
  circle: 0,
  point1: 1,
  point2: 1,
  rightArmDeg: 180,
  leftArmDeg: 180,
  rightClock: 'Jam 6:00',
  leftClock: 'Jam 6:00',
  desc: 'Posisi istirahat / siap (kedua bendera lurus menyilang ke bawah)',
  kunciName: 'Posisi Siap (Titik 1 & 1)',
};

export const SEMAPHORE_POSES_RECORD: Record<string, SemaphorePose> = {
  // LINGKARAN 1 (Kunci 1: Patokan Titik 1 = 180° / Jam 6:00)
  A: {
    char: 'A',
    circle: 1,
    point1: 1,
    point2: 2,
    rightArmDeg: 225,
    leftArmDeg: 180,
    rightClock: 'Jam 7:30',
    leftClock: 'Jam 6:00',
    desc: 'Tangan kanan serong bawah (jam 7:30), tangan kiri lurus bawah (jam 6:00)',
    kunciName: 'Kunci 1 (Titik 1 & 2)',
  },
  B: {
    char: 'B',
    circle: 1,
    point1: 1,
    point2: 3,
    rightArmDeg: 270,
    leftArmDeg: 180,
    rightClock: 'Jam 9:00',
    leftClock: 'Jam 6:00',
    desc: 'Tangan kanan mendatar ke samping (jam 9:00), tangan kiri lurus bawah (jam 6:00)',
    kunciName: 'Kunci 1 (Titik 1 & 3)',
  },
  C: {
    char: 'C',
    circle: 1,
    point1: 1,
    point2: 4,
    rightArmDeg: 315,
    leftArmDeg: 180,
    rightClock: 'Jam 10:30',
    leftClock: 'Jam 6:00',
    desc: 'Tangan kanan serong atas (jam 10:30), tangan kiri lurus bawah (jam 6:00)',
    kunciName: 'Kunci 1 (Titik 1 & 4)',
  },
  D: {
    char: 'D',
    circle: 1,
    point1: 1,
    point2: 5,
    rightArmDeg: 0,
    leftArmDeg: 180,
    rightClock: 'Jam 12:00',
    leftClock: 'Jam 6:00',
    desc: 'Tangan kanan tegak lurus atas (jam 12:00), tangan kiri lurus bawah (jam 6:00)',
    kunciName: 'Kunci 1 (Titik 1 & 5)',
  },
  E: {
    char: 'E',
    circle: 1,
    point1: 1,
    point2: 6,
    rightArmDeg: 180,
    leftArmDeg: 45,
    rightClock: 'Jam 6:00',
    leftClock: 'Jam 1:30',
    desc: 'Tangan kanan lurus bawah (jam 6:00), tangan kiri serong atas (jam 1:30)',
    kunciName: 'Kunci 1 (Titik 1 & 6)',
  },
  F: {
    char: 'F',
    circle: 1,
    point1: 1,
    point2: 7,
    rightArmDeg: 180,
    leftArmDeg: 90,
    rightClock: 'Jam 6:00',
    leftClock: 'Jam 3:00',
    desc: 'Tangan kanan lurus bawah (jam 6:00), tangan kiri mendatar ke samping (jam 3:00)',
    kunciName: 'Kunci 1 (Titik 1 & 7)',
  },
  G: {
    char: 'G',
    circle: 1,
    point1: 1,
    point2: 8,
    rightArmDeg: 180,
    leftArmDeg: 135,
    rightClock: 'Jam 6:00',
    leftClock: 'Jam 4:30',
    desc: 'Tangan kanan lurus bawah (jam 6:00), tangan kiri serong bawah (jam 4:30)',
    kunciName: 'Kunci 1 (Titik 1 & 8)',
  },

  // LINGKARAN 2 (Kunci 2: Patokan Titik 2 = 225° / Jam 7:30)
  H: {
    char: 'H',
    circle: 2,
    point1: 2,
    point2: 3,
    rightArmDeg: 270,
    leftArmDeg: 225,
    rightClock: 'Jam 9:00',
    leftClock: 'Jam 7:30',
    desc: 'Tangan kanan mendatar (jam 9:00), tangan kiri menyilang serong bawah (jam 7:30)',
    kunciName: 'Kunci 2 (Titik 2 & 3)',
  },
  I: {
    char: 'I',
    circle: 2,
    point1: 2,
    point2: 4,
    rightArmDeg: 315,
    leftArmDeg: 225,
    rightClock: 'Jam 10:30',
    leftClock: 'Jam 7:30',
    desc: 'Tangan kanan serong atas (jam 10:30), tangan kiri menyilang serong bawah (jam 7:30)',
    kunciName: 'Kunci 2 (Titik 2 & 4)',
  },
  K: {
    char: 'K',
    circle: 2,
    point1: 2,
    point2: 5,
    rightArmDeg: 225,
    leftArmDeg: 0,
    rightClock: 'Jam 7:30',
    leftClock: 'Jam 12:00',
    desc: 'Tangan kanan serong bawah (jam 7:30), tangan kiri tegak lurus atas (jam 12:00)',
    kunciName: 'Kunci 2 (Titik 2 & 5)',
  },
  L: {
    char: 'L',
    circle: 2,
    point1: 2,
    point2: 6,
    rightArmDeg: 225,
    leftArmDeg: 45,
    rightClock: 'Jam 7:30',
    leftClock: 'Jam 1:30',
    desc: 'Tangan kanan serong bawah (jam 7:30), tangan kiri serong atas (jam 1:30)',
    kunciName: 'Kunci 2 (Titik 2 & 6)',
  },
  M: {
    char: 'M',
    circle: 2,
    point1: 2,
    point2: 7,
    rightArmDeg: 225,
    leftArmDeg: 90,
    rightClock: 'Jam 7:30',
    leftClock: 'Jam 3:00',
    desc: 'Tangan kanan serong bawah (jam 7:30), tangan kiri mendatar (jam 3:00)',
    kunciName: 'Kunci 2 (Titik 2 & 7)',
  },
  N: {
    char: 'N',
    circle: 2,
    point1: 2,
    point2: 8,
    rightArmDeg: 225,
    leftArmDeg: 135,
    rightClock: 'Jam 7:30',
    leftClock: 'Jam 4:30',
    desc: 'Kedua tangan serong ke bawah membentuk huruf V terbalik (jam 7:30 & jam 4:30)',
    kunciName: 'Kunci 2 (Titik 2 & 8)',
  },

  // LINGKARAN 3 (Kunci 3: Patokan Titik 3 = 270° / Jam 9:00)
  O: {
    char: 'O',
    circle: 3,
    point1: 3,
    point2: 4,
    rightArmDeg: 315,
    leftArmDeg: 270,
    rightClock: 'Jam 10:30',
    leftClock: 'Jam 9:00',
    desc: 'Tangan kanan serong atas (jam 10:30), tangan kiri mendatar kiri (jam 9:00)',
    kunciName: 'Kunci 3 (Titik 3 & 4)',
  },
  P: {
    char: 'P',
    circle: 3,
    point1: 3,
    point2: 5,
    rightArmDeg: 270,
    leftArmDeg: 0,
    rightClock: 'Jam 9:00',
    leftClock: 'Jam 12:00',
    desc: 'Tangan kanan mendatar ke kiri (jam 9:00), tangan kiri tegak lurus atas (jam 12:00)',
    kunciName: 'Kunci 3 (Titik 3 & 5)',
  },
  Q: {
    char: 'Q',
    circle: 3,
    point1: 3,
    point2: 6,
    rightArmDeg: 270,
    leftArmDeg: 45,
    rightClock: 'Jam 9:00',
    leftClock: 'Jam 1:30',
    desc: 'Tangan kanan mendatar ke kiri (jam 9:00), tangan kiri serong atas kanan (jam 1:30)',
    kunciName: 'Kunci 3 (Titik 3 & 6)',
  },
  R: {
    char: 'R',
    circle: 3,
    point1: 3,
    point2: 7,
    rightArmDeg: 270,
    leftArmDeg: 90,
    rightClock: 'Jam 9:00',
    leftClock: 'Jam 3:00',
    desc: 'Kedua tangan mendatar lurus horizontal sejajar bahu (jam 9:00 & jam 3:00)',
    kunciName: 'Kunci 3 (Titik 3 & 7)',
  },
  S: {
    char: 'S',
    circle: 3,
    point1: 3,
    point2: 8,
    rightArmDeg: 270,
    leftArmDeg: 135,
    rightClock: 'Jam 9:00',
    leftClock: 'Jam 4:30',
    desc: 'Tangan kanan mendatar ke kiri (jam 9:00), tangan kiri serong bawah (jam 4:30)',
    kunciName: 'Kunci 3 (Titik 3 & 8)',
  },

  // LINGKARAN 4 (Kunci 4: Patokan Titik 4 = 315° / Jam 10:30)
  T: {
    char: 'T',
    circle: 4,
    point1: 4,
    point2: 5,
    rightArmDeg: 315,
    leftArmDeg: 0,
    rightClock: 'Jam 10:30',
    leftClock: 'Jam 12:00',
    desc: 'Tangan kanan serong atas (jam 10:30), tangan kiri tegak lurus atas (jam 12:00)',
    kunciName: 'Kunci 4 (Titik 4 & 5)',
  },
  U: {
    char: 'U',
    circle: 4,
    point1: 4,
    point2: 6,
    rightArmDeg: 315,
    leftArmDeg: 45,
    rightClock: 'Jam 10:30',
    leftClock: 'Jam 1:30',
    desc: 'Kedua tangan serong ke atas membentuk huruf V terbuka (jam 10:30 & jam 1:30)',
    kunciName: 'Kunci 4 (Titik 4 & 6)',
  },
  Y: {
    char: 'Y',
    circle: 4,
    point1: 4,
    point2: 7,
    rightArmDeg: 315,
    leftArmDeg: 90,
    rightClock: 'Jam 10:30',
    leftClock: 'Jam 3:00',
    desc: 'Tangan kanan serong atas (jam 10:30), tangan kiri mendatar ke kanan (jam 3:00)',
    kunciName: 'Kunci 4 (Titik 4 & 7)',
  },

  // LINGKARAN 5 (Kunci 5: Patokan Titik 5 = 0° / Jam 12:00)
  J: {
    char: 'J',
    circle: 5,
    point1: 5,
    point2: 7,
    rightArmDeg: 0,
    leftArmDeg: 90,
    rightClock: 'Jam 12:00',
    leftClock: 'Jam 3:00',
    desc: 'Tangan kanan tegak lurus atas (jam 12:00), tangan kiri mendatar ke kanan (jam 3:00)',
    kunciName: 'Kunci 5 (Titik 5 & 7)',
  },
  V: {
    char: 'V',
    circle: 5,
    point1: 5,
    point2: 8,
    rightArmDeg: 0,
    leftArmDeg: 135,
    rightClock: 'Jam 12:00',
    leftClock: 'Jam 4:30',
    desc: 'Tangan kanan tegak lurus atas (jam 12:00), tangan kiri serong bawah (jam 4:30)',
    kunciName: 'Kunci 5 (Titik 5 & 8)',
  },

  // LINGKARAN 6 (Kunci 6: Patokan Titik 6 = 45° / Jam 1:30)
  W: {
    char: 'W',
    circle: 6,
    point1: 6,
    point2: 7,
    rightArmDeg: 45,
    leftArmDeg: 90,
    rightClock: 'Jam 1:30',
    leftClock: 'Jam 3:00',
    desc: 'Tangan kanan serong atas kanan (jam 1:30), tangan kiri mendatar kanan (jam 3:00)',
    kunciName: 'Kunci 6 (Titik 6 & 7)',
  },
  X: {
    char: 'X',
    circle: 6,
    point1: 6,
    point2: 8,
    rightArmDeg: 45,
    leftArmDeg: 135,
    rightClock: 'Jam 1:30',
    leftClock: 'Jam 4:30',
    desc: 'Tangan kanan serong atas kanan (jam 1:30), tangan kiri serong bawah (jam 4:30)',
    kunciName: 'Kunci 6 (Titik 6 & 8)',
  },

  // LINGKARAN 7 (Kunci 7: Patokan Titik 7 = 90° / Jam 3:00)
  Z: {
    char: 'Z',
    circle: 7,
    point1: 7,
    point2: 8,
    rightArmDeg: 90,
    leftArmDeg: 135,
    rightClock: 'Jam 3:00',
    leftClock: 'Jam 4:30',
    desc: 'Tangan kanan mendatar ke kanan (jam 3:00), tangan kiri serong bawah (jam 4:30)',
    kunciName: 'Kunci 7 (Titik 7 & 8)',
  },

  // ANGKA (1 - 0 mengikuti posisi A - K, dengan K melambangkan 0)
  '1': {
    char: '1',
    circle: 1,
    point1: 1,
    point2: 2,
    rightArmDeg: 225,
    leftArmDeg: 180,
    rightClock: 'Jam 7:30',
    leftClock: 'Jam 6:00',
    desc: 'Angka 1 (sama dengan huruf A: Titik 1 & 2)',
    kunciName: 'Angka 1 (Sama dengan A)',
  },
  '2': {
    char: '2',
    circle: 1,
    point1: 1,
    point2: 3,
    rightArmDeg: 270,
    leftArmDeg: 180,
    rightClock: 'Jam 9:00',
    leftClock: 'Jam 6:00',
    desc: 'Angka 2 (sama dengan huruf B: Titik 1 & 3)',
    kunciName: 'Angka 2 (Sama dengan B)',
  },
  '3': {
    char: '3',
    circle: 1,
    point1: 1,
    point2: 4,
    rightArmDeg: 315,
    leftArmDeg: 180,
    rightClock: 'Jam 10:30',
    leftClock: 'Jam 6:00',
    desc: 'Angka 3 (sama dengan huruf C: Titik 1 & 4)',
    kunciName: 'Angka 3 (Sama dengan C)',
  },
  '4': {
    char: '4',
    circle: 1,
    point1: 1,
    point2: 5,
    rightArmDeg: 0,
    leftArmDeg: 180,
    rightClock: 'Jam 12:00',
    leftClock: 'Jam 6:00',
    desc: 'Angka 4 (sama dengan huruf D: Titik 1 & 5)',
    kunciName: 'Angka 4 (Sama dengan D)',
  },
  '5': {
    char: '5',
    circle: 1,
    point1: 1,
    point2: 6,
    rightArmDeg: 180,
    leftArmDeg: 45,
    rightClock: 'Jam 6:00',
    leftClock: 'Jam 1:30',
    desc: 'Angka 5 (sama dengan huruf E: Titik 1 & 6)',
    kunciName: 'Angka 5 (Sama dengan E)',
  },
  '6': {
    char: '6',
    circle: 1,
    point1: 1,
    point2: 7,
    rightArmDeg: 180,
    leftArmDeg: 90,
    rightClock: 'Jam 6:00',
    leftClock: 'Jam 3:00',
    desc: 'Angka 6 (sama dengan huruf F: Titik 1 & 7)',
    kunciName: 'Angka 6 (Sama dengan F)',
  },
  '7': {
    char: '7',
    circle: 1,
    point1: 1,
    point2: 8,
    rightArmDeg: 180,
    leftArmDeg: 135,
    rightClock: 'Jam 6:00',
    leftClock: 'Jam 4:30',
    desc: 'Angka 7 (sama dengan huruf G: Titik 1 & 8)',
    kunciName: 'Angka 7 (Sama dengan G)',
  },
  '8': {
    char: '8',
    circle: 2,
    point1: 2,
    point2: 3,
    rightArmDeg: 270,
    leftArmDeg: 225,
    rightClock: 'Jam 9:00',
    leftClock: 'Jam 7:30',
    desc: 'Angka 8 (sama dengan huruf H: Titik 2 & 3)',
    kunciName: 'Angka 8 (Sama dengan H)',
  },
  '9': {
    char: '9',
    circle: 2,
    point1: 2,
    point2: 4,
    rightArmDeg: 315,
    leftArmDeg: 225,
    rightClock: 'Jam 10:30',
    leftClock: 'Jam 7:30',
    desc: 'Angka 9 (sama dengan huruf I: Titik 2 & 4)',
    kunciName: 'Angka 9 (Sama dengan I)',
  },
  '0': {
    char: '0',
    circle: 2,
    point1: 2,
    point2: 5,
    rightArmDeg: 225,
    leftArmDeg: 0,
    rightClock: 'Jam 7:30',
    leftClock: 'Jam 12:00',
    desc: 'Angka 0 (sama dengan huruf K: Titik 2 & 5)',
    kunciName: 'Angka 0 (Sama dengan K)',
  },
};

export const ALL_SEMAPHORE_POSES: SemaphorePose[] = Object.values(SEMAPHORE_POSES_RECORD);

export function getSemaphorePose(char: string): SemaphorePose {
  const upper = char.toUpperCase();
  return SEMAPHORE_POSES_RECORD[upper] || REST_POSE;
}

/**
 * Returns arm angles on the screen depending on perspective:
 * - 'front': Receiver / Audience View (Figur menghadap ke penonton)
 *   Lengan kanan figur berada di sisi KIRI layar, lengan kiri figur berada di sisi KANAN layar.
 * - 'back': Sender View (Figur membalik badan / Tampak belakang)
 *   Lengan kanan figur berada di sisi KANAN layar (dicerminkan secara horizontal).
 */
export function getArmAnglesForView(pose: SemaphorePose, view: 'front' | 'back') {
  if (view === 'front') {
    return {
      // Pada tampak depan:
      // rightArmDeg adalah lengan kanan figur (muncul di sisi kiri layar)
      // leftArmDeg adalah lengan kiri figur (muncul di sisi kanan layar)
      rightArmScreenDeg: pose.rightArmDeg,
      leftArmScreenDeg: pose.leftArmDeg,
    };
  } else {
    // Pada tampak belakang (membalik badan):
    // Horizontal mirror: angle -> (360 - angle) % 360
    // Sisi kanan pengirim kini berada di sebelah kanan layar penonton!
    const mirror = (deg: number) => (360 - (deg % 360)) % 360;
    return {
      rightArmScreenDeg: mirror(pose.rightArmDeg),
      leftArmScreenDeg: mirror(pose.leftArmDeg),
    };
  }
}
