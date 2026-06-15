import { Exercise } from '@/types/exercise';
import { exercises as defaultExercises } from '@/data/exercises';

const CUSTOM_EXERCISES_KEY = 'fitness_custom_exercises';

// Get custom exercises from local storage
export function getCustomExercises(): Exercise[] {
  const stored = localStorage.getItem(CUSTOM_EXERCISES_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

// Save custom exercises to local storage
export function saveCustomExercises(exercises: Exercise[]): void {
  localStorage.setItem(CUSTOM_EXERCISES_KEY, JSON.stringify(exercises));
}

// Add a new custom exercise
export function addCustomExercise(exercise: Omit<Exercise, 'id'>): Exercise {
  const customExercises = getCustomExercises();
  const newExercise: Exercise = {
    ...exercise,
    id: `custom-ex-${Date.now()}`
  };
  
  customExercises.push(newExercise);
  saveCustomExercises(customExercises);
  
  // Sync to Supabase if authenticated
  import('./auth').then(({ getCurrentUser }) => {
    const user = getCurrentUser();
    if (user) {
      import('./supabase').then(({ supabase }) => {
        supabase.from('custom_exercises').insert([{
          id: crypto.randomUUID ? crypto.randomUUID() : undefined, // let postgres generate or pass valid uuid if needed, actually our id is not a uuid.
          // Wait, the table schema says id is UUID DEFAULT gen_random_uuid(). We can let it generate and just store exercise_data.
          user_id: user.id,
          exercise_data: newExercise
        }]).then(({ error }) => {
          if (error) console.error('Failed to sync custom exercise:', error);
        });
      });
    }
  });
  
  return newExercise;
}

// Get all exercises (default + custom)
export function getExercises(): Exercise[] {
  const customExercises = getCustomExercises();
  return [...defaultExercises, ...customExercises];
}

// Get an exercise by ID
export function getExerciseById(id: string): Exercise | undefined {
  const allExercises = getExercises();
  return allExercises.find(ex => ex.id === id);
}
