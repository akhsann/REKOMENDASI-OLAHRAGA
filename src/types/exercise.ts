export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say';
export type ExerciseCategory = 'cardio' | 'strength' | 'flexibility' | 'balance' | 'hiit';
export type Intensity = 'low' | 'medium' | 'high';
export type FitnessGoal = 'weight-loss' | 'muscle-gain' | 'endurance' | 'flexibility' | 'general-fitness';

export interface UserProfile {
  id: string;
  age: number;
  gender: Gender;
  fitnessLevel: FitnessLevel;
  goals: FitnessGoal[];
  availableTime: number; // minutes per day
  preferences: {
    favoriteExercises: string[];
    completedExercises: string[];
    skippedExercises: string[];
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
