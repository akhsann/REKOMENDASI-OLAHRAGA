/**
 * Nama olahraga pada kuesioner validasi pelatih → satu ID latihan di `exercises.ts`
 * (urutan ex1–ex30 sama dengan baris kuesioner).
 */
export const QUESTIONNAIRE_NAME_TO_EXERCISE_IDS: Record<string, readonly string[]> = {
  'Angkat Beban (Angkat Besi)': ['ex1'],
  Dumbbell: ['ex2'],
  Squats: ['ex3'],
  HIIT: ['ex4'],
  'Berjalan Santai': ['ex5'],
  'Lari Santai (Jogging)': ['ex6'],
  'Bersepeda Statis': ['ex7'],
  'Bersepeda Luar': ['ex8'],
  'Berenang (Gaya bebas)': ['ex9'],
  Yoga: ['ex10'],
  Stepper: ['ex11'],
  Aerobik: ['ex12'],
  'Rowing Machine': ['ex13'],
  'Mesin Elipse (Elliptical)': ['ex14'],
  'Sepatu Roda': ['ex15'],
  'Lompat Tali': ['ex16'],
  Pilates: ['ex17'],
  Zumba: ['ex18'],
  Golf: ['ex19'],
  'Bulu Tangkis': ['ex20'],
  Tenis: ['ex21'],
  Padel: ['ex22'],
  'Bola basket': ['ex23'],
  'Bola Voli': ['ex24'],
  'Sepak Bola': ['ex25'],
  'Tenis Meja': ['ex26'],
};
