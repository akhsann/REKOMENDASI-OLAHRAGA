import { Exercise, UserProfile, RecommendationScore, Intensity, ExerciseCategory, FitnessGoal, ActivityLevel } from '@/types/exercise';
import { COACH_CONDITION_LABEL, getActiveHealthConditions, getCoachVerdictForExercise } from '@/utils/coachValidation';

// Constants for vector dimensions
const INTENSITIES: Intensity[] = ['rendah', 'sedang', 'tinggi'];
const CATEGORIES: ExerciseCategory[] = ['kardio', 'kekuatan', 'fleksibilitas', 'keseimbangan', 'hiit'];
const ALL_GOALS: FitnessGoal[] = ['penurunan-berat-badan', 'penambahan-otot', 'ketahanan', 'fleksibilitas', 'kebugaran-umum'];
const MAX_DURATION = 60; // Durasi latihan maksimum dalam menit
const MAX_CALORIES = 800; // Batas atas normalisasi (sesi 60 menit pada aktivitas sangat berat masih di bawah ini)
const MAX_AGE = 100; // Usia maksimum untuk normalisasi
const MAX_AVAILABLE_TIME = 180; // Waktu tersedia maksimum dalam menit

// Preferensi intensitas dasar berdasarkan kelompok aktivitas/pekerjaan harian
const ACTIVITY_INTENSITY_PREFERENCE: Record<
  ActivityLevel,
  {
    rendah: number;
    sedang: number;
    tinggi: number;
  }
> = {
  ringan: {
    rendah: 0.6,
    sedang: 0.3,
    tinggi: 0.1,
  },
  sedang: {
    rendah: 0.2,
    sedang: 0.5,
    tinggi: 0.3,
  },
  tinggi: {
    rendah: 0.1,
    sedang: 0.3,
    tinggi: 0.6,
  },
};

// ============================================================================
// IMPLEMENTASI KEMIRIPAN COSINE
// ============================================================================

/**
 * Hitung hasil kali titik (dot product) dari dua vektor
 * Rumus: dot(A, B) = Σ(A[i] * B[i])
 */
function dotProduct(vectorA: number[], vectorB: number[]): number {
  if (vectorA.length !== vectorB.length) {
    throw new Error('Vektor harus memiliki dimensi yang sama');
  }
  return vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);
}

/**
 * Hitung besaran (norma Euclidean) dari sebuah vektor
 * Rumus: ||A|| = √(Σ(A[i]²))
 */
function magnitude(vector: number[]): number {
  const sumOfSquares = vector.reduce((sum, val) => sum + val * val, 0);
  return Math.sqrt(sumOfSquares);
}

/**
 * Hitung kemiripan cosine antara dua vektor
 * Rumus: cos(θ) = (A · B) / (||A|| * ||B||)
 * Mengembalikan nilai antara -1 dan 1 (umumnya 0 hingga 1 untuk vektor positif)
 */
function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
  const dot = dotProduct(vectorA, vectorB);
  const magA = magnitude(vectorA);
  const magB = magnitude(vectorB);

  // Hindari pembagian dengan nol
  if (magA === 0 || magB === 0) {
    return 0;
  }

  return dot / (magA * magB);
}

/**
 * Konversi UserProfile ke vektor fitur untuk kemiripan cosine
 * Dimensi vektor (total 15):
 * - Bobot kategori (merata): 5 dimensi
 * - Bobot intensitas (dari tingkat aktivitas): 3 dimensi
 * - Tujuan (biner): 5 dimensi
 * - Waktu Tersedia (dinormalisasi): 1 dimensi
 * - Usia (dinormalisasi): 1 dimensi
 */
function userProfileToVector(user: UserProfile, allExercises: Exercise[]): number[] {
  const vector: number[] = [];

  // 1. Kategori (5 dimensi) - Bobot merata untuk semua kategori
  // Menggunakan bobot seragam 0.2 agar hasil konsisten antara perhitungan manual dan sistem
  CATEGORIES.forEach(() => {
    vector.push(0.2);
  });

  // 2. Intensitas (3 dimensi) - 100% berdasarkan tingkat aktivitas pengguna
  // Menggunakan preferensi intensitas murni dari tingkat aktivitas harian
  const activityLevel: ActivityLevel = user.activityLevel ?? 'ringan';
  INTENSITIES.forEach((intensity) => {
    const weight = ACTIVITY_INTENSITY_PREFERENCE[activityLevel][intensity];
    vector.push(weight);
  });

  // 3. Tujuan (5 dimensi) - pengkodean biner
  ALL_GOALS.forEach((goal) => {
    vector.push(user.goals.includes(goal) ? 1 : 0);
  });

  // 4. Waktu (1 dimensi) - dinormalisasi
  vector.push(Math.min(user.availableTime / MAX_AVAILABLE_TIME, 1));

  // 5. Proksi usia (1 dimensi) - dinormalisasi
  vector.push(Math.min(user.age / MAX_AGE, 1));

  return vector;
}

/**
 * Konversi Exercise ke vektor fitur untuk kemiripan cosine
 * Dimensi vektor (total 19):
 * - Kategori (one-hot): 5 dimensi
 * - Intensitas (one-hot): 3 dimensi
 * - Manfaat/Tujuan (biner): 5 dimensi
 * - Durasi (dinormalisasi): 1 dimensi
 * - Kalori (dinormalisasi): 1 dimensi
 * - Jumlah Otot Target (dinormalisasi): 1 dimensi
 * - Jumlah Peralatan (dinormalisasi): 1 dimensi
 * - Bobot kecocokan kategori: 1 dimensi
 * - Bobot kecocokan intensitas: 1 dimensi
 */
function exerciseToVector(exercise: Exercise): number[] {
  const vector: number[] = [];

  // 1. Kategori (5 dimensi) - pengkodean one-hot
  CATEGORIES.forEach((category) => {
    vector.push(exercise.category === category ? 1 : 0);
  });

  // 2. Intensitas (3 dimensi) - pengkodean one-hot
  INTENSITIES.forEach((intensity) => {
    vector.push(exercise.intensity === intensity ? 1 : 0);
  });

  // 3. Tujuan/Manfaat (5 dimensi) - pengkodean biner
  ALL_GOALS.forEach((goal) => {
    vector.push(exercise.benefits.includes(goal) ? 1 : 0);
  });

  // 4. Durasi (1 dimensi) - dinormalisasi
  vector.push(Math.min(exercise.duration / MAX_DURATION, 1));

  // 5. Kalori (1 dimensi) - dinormalisasi
  vector.push(Math.min(exercise.caloriesBurn / MAX_CALORIES, 1));

  return vector;
}

function applyCoachQuestionnaireRules(user: UserProfile, scored: RecommendationScore[]): RecommendationScore[] {
  const conditions = getActiveHealthConditions(user.healthConditions);
  if (conditions.length === 0) return scored;

  const adjusted = scored
    .map((rec) => {
      let blocked = false;
      const coachReasons: string[] = [];
      let factor = 1;

      for (const condition of conditions) {
        const verdict = getCoachVerdictForExercise(rec.exercise.id, condition);
        if (!verdict) continue;
        if (verdict.safety === 'tidak_aman') blocked = true;
        if (verdict.safety === 'aman_dengan_catatan') {
          factor *= 0.92;
          const tag = COACH_CONDITION_LABEL[condition];
          verdict.catatanLines.forEach((line) => {
            coachReasons.push(`Validasi pelatih (${tag}): ${line}`);
          });
        }
      }

      if (blocked) return null;

      return {
        ...rec,
        score: Math.round(rec.score * factor * 100) / 100,
        reasons: [...coachReasons, ...rec.reasons],
      };
    })
    .filter((item): item is RecommendationScore => item !== null);

  return adjusted.sort((a, b) => b.score - a.score);
}

/**
 * Hitung skor kemiripan cosine antara profil pengguna dan latihan
 * Mengembalikan skor kemiripan dari 0 hingga 100
 */
export function calculateSimilarityScore(user: UserProfile, exercise: Exercise, allExercises: Exercise[] = []): number {
  // Konversi ke vektor
  const userVector = userProfileToVector(user, allExercises);
  const exerciseVector = exerciseToVector(exercise);

  // Hitung kemiripan cosine (mengembalikan nilai antara -1 dan 1, umumnya 0 hingga 1)
  const similarity = cosineSimilarity(userVector, exerciseVector);

  // Tangani kemiripan negatif (jarang, tapi mungkin terjadi)
  // Geser ke rentang 0-1: (similarity + 1) / 2, lalu skala ke 0-100
  const normalizedSimilarity = (similarity + 1) / 2;
  const score = normalizedSimilarity * 100;

  // Pastikan skor berada antara 0 dan 100
  return Math.max(0, Math.min(100, score));
}

/**
 * Dapatkan rekomendasi personal menggunakan Kemiripan Cosine
 * Fungsi ini menghitung kemiripan cosine antara vektor profil pengguna dan vektor latihan
 * untuk semua latihan, lalu mengembalikan N rekomendasi teratas yang diurutkan berdasarkan skor kemiripan
 */
export function getRecommendations(user: UserProfile, exercises: Exercise[], limit: number = 5): RecommendationScore[] {
  // Hitung skor kemiripan cosine untuk setiap latihan
  const scoredExercises = exercises.map((exercise) => {
    // Kirim allExercises untuk menghitung bobot preferensi dari riwayat pengguna
    const score = calculateSimilarityScore(user, exercise, exercises);
    const reasons: string[] = [];

    // Hasilkan alasan kontekstual berdasarkan skor cosine similarity
    if (score >= 80) {
      reasons.push('Sangat direkomendasikan untuk profil Anda');
    } else if (score >= 60) {
      reasons.push('Cocok dengan preferensi Anda');
    } else if (score >= 40) {
      reasons.push('Cukup sesuai dengan profil Anda');
    }

    // Tambahkan alasan spesifik berdasarkan komponen vektor
    const matchingGoals = exercise.benefits.filter((benefit) => user.goals.includes(benefit as any));
    if (matchingGoals.length > 0) {
      reasons.push(`Sesuai dengan ${matchingGoals.length} tujuan kebugaran Anda`);
    }

    if (exercise.duration <= user.availableTime) {
      reasons.push(`Sesuai jadwal ${user.availableTime} menit Anda`);
    }

    // Cek kompatibilitas intensitas berdasarkan tingkat aktivitas
    const activityLevel = user.activityLevel ?? 'ringan';
    const intensityMap: Record<ActivityLevel, Intensity[]> = {
      ringan: ['rendah', 'sedang'],
      sedang: ['sedang', 'tinggi'],
      tinggi: ['sedang', 'tinggi'],
    };
    if (intensityMap[activityLevel].includes(exercise.intensity)) {
      reasons.push('Sesuai tingkat aktivitas Anda');
    }

    // Riwayat interaksi pengguna
    if (user.preferences.favoriteExercises.includes(exercise.id)) {
      reasons.push('Anda telah menyukai latihan ini');
    } else if (user.preferences.completedExercises.includes(exercise.id)) {
      reasons.push('Anda pernah menyelesaikan latihan ini');
    }

    return {
      exercise,
      score: Math.round(score * 100) / 100, // Bulatkan ke 2 desimal
      reasons,
    };
  });

  scoredExercises.sort((a, b) => b.score - a.score);
  const withCoachRules = applyCoachQuestionnaireRules(user, scoredExercises);
  return withCoachRules.slice(0, limit);
}

// Belajar dari interaksi pengguna
export function updateUserPreferences(user: UserProfile, exerciseId: string, action: 'favorite' | 'complete' | 'skip'): UserProfile {
  const updatedUser = { ...user };

  switch (action) {
    case 'favorite':
      if (!updatedUser.preferences.favoriteExercises.includes(exerciseId)) {
        updatedUser.preferences.favoriteExercises.push(exerciseId);
      }
      break;
    case 'complete':
      if (!updatedUser.preferences.completedExercises.includes(exerciseId)) {
        updatedUser.preferences.completedExercises.push(exerciseId);
      }
      break;
    case 'skip':
      if (!updatedUser.preferences.skippedExercises.includes(exerciseId)) {
        updatedUser.preferences.skippedExercises.push(exerciseId);
      }
      break;
  }

  return updatedUser;
}
