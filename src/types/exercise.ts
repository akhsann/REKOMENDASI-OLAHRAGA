export type Gender = 'pria' | 'wanita' | 'lainnya' | 'lebih-baik-tidak-dikatakan';
export type ExerciseCategory = 'kardio' | 'kekuatan' | 'fleksibilitas' | 'keseimbangan' | 'hiit';
export type Intensity = 'rendah' | 'sedang' | 'tinggi';
export type FitnessGoal = 'penurunan-berat-badan' | 'penambahan-otot' | 'ketahanan' | 'fleksibilitas' | 'kebugaran-umum';

// Tingkat aktivitas/pekerjaan harian pengguna
export type ActivityLevel = 'ringan' | 'sedang' | 'tinggi';

export type HealthCondition = 'hipertensi' | 'asma' | 'diabetes' | 'obesitas' | 'nyeri-sendi' | 'tidak-ada';

/** Subset dari HealthCondition yang dipakai di safeConditions & medicalNotes */
export type MedicalKey = 'hipertensi' | 'asma' | 'diabetes' | 'obesitas' | 'nyeriSendi';

export interface CompletedExerciseEntry {
  id: string;            // exercise ID
  durationMinutes: number; // actual duration performed
}

export interface DailyProgress {
  date: string; // YYYY-MM-DD format
  exercisesCompleted: CompletedExerciseEntry[]; // each entry = { id, durationMinutes }
  caloriesBurned: number;
  timeSpent: number; // minutes
}

export interface UserProfile {
  id: string;
  age: number;
  gender: Gender;
  goals: FitnessGoal[];
  availableTime: number; // minutes per day
  healthConditions: HealthCondition[];
  // Informasi tingkat aktivitas/pekerjaan harian
  activityLevel?: ActivityLevel;
  preferences: {
    favoriteExercises: string[];
    completedExercises: string[];
    skippedExercises: string[];
  };
  progress: {
    dailyLogs: DailyProgress[];
    currentStreak: number; // consecutive days with at least one exercise
    longestStreak: number;
    totalCaloriesBurned: number;
    totalExercisesCompleted: number;
  };
}

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  /** Referensi durasi (menit) yang dipakai untuk kalori & skor rekomendasi — selalu 30; sesi aktual dipilih 15/30/60 di UI. */
  duration: number;
  intensity: Intensity;
  benefits: string[];
  /** Daftar kondisi kesehatan yang AMAN melakukan olahraga ini (termasuk 'tidak-ada' = sehat). */
  safeConditions: HealthCondition[];
  /** Catatan/modifikasi khusus per kondisi medis tertentu (opsional). Kunci = nama kondisi (camelCase). */
  medicalNotes?: Partial<Record<MedicalKey, string>>;
  description: string;
  equipment: string[];
  targetMuscles: string[];
  /** Kalori estimasi untuk sesi **30 menit** (referensi tarif tetap). */
  caloriesBurn: number;
  imageUrl?: string;
}

export interface RecommendationScore {
  exercise: Exercise;
  score: number;
  reasons: string[];
}
