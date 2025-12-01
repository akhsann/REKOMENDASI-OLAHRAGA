export type FitnessLevel = 'pemula' | 'menengah' | 'lanjutan';
export type Gender = 'pria' | 'wanita' | 'lainnya' | 'lebih-baik-tidak-dikatakan';
export type ExerciseCategory = 'kardio' | 'kekuatan' | 'fleksibilitas' | 'keseimbangan' | 'hiit';
export type Intensity = 'rendah' | 'sedang' | 'tinggi';
export type FitnessGoal = 'penurunan-berat-badan' | 'penambahan-otot' | 'ketahanan' | 'fleksibilitas' | 'kebugaran-umum';

export type HealthCondition = 'hipertensi' | 'asma' | 'diabetes' | 'obesitas' | 'tidak-ada';

export interface DailyProgress {
  date: string; // YYYY-MM-DD format
  exercisesCompleted: string[]; // exercise IDs
  caloriesBurned: number;
  timeSpent: number; // minutes
}

export interface UserProfile {
  id: string;
  age: number;
  gender: Gender;
  fitnessLevel: FitnessLevel;
  goals: FitnessGoal[];
  availableTime: number; // minutes per day
  healthConditions: HealthCondition[];
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
  duration: number; // minutes
  intensity: Intensity;
  benefits: string[];
  description: string;
  equipment: string[];
  targetMuscles: string[];
  caloriesBurn: number; // per session
  imageUrl?: string;
}

export interface RecommendationScore {
  exercise: Exercise;
  score: number;
  reasons: string[];
}
