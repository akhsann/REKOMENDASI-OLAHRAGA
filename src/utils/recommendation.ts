import { Exercise, UserProfile, RecommendationScore, FitnessLevel, Intensity } from '@/types/exercise';

// Fitness level to intensity mapping
const fitnessIntensityMap: Record<FitnessLevel, Intensity[]> = {
  pemula: ['rendah', 'sedang'],
  menengah: ['sedang', 'tinggi'],
  lanjutan: ['tinggi'],
};

// Calculate similarity score between user profile and exercise
export function calculateSimilarityScore(user: UserProfile, exercise: Exercise): number {
  let score = 0;
  const reasons: string[] = [];

  // 1. Fitness level compatibility (20 points)
  const suitableIntensities = fitnessIntensityMap[user.fitnessLevel];
  if (suitableIntensities.includes(exercise.intensity)) {
    score += 20;
  } else if (user.fitnessLevel === 'menengah' && exercise.intensity === 'rendah') {
    score += 10; // Partial match
  }

  // 2. Goals alignment (30 points)
  const matchingGoals = exercise.benefits.filter((benefit) => user.goals.includes(benefit as any));
  score += matchingGoals.length * 10;
  if (matchingGoals.length > 0) {
    reasons.push(`Aligns with ${matchingGoals.join(', ')} goals`);
  }

  // 3. Time availability (20 points)
  if (exercise.duration <= user.availableTime) {
    score += 20;
  } else if (exercise.duration <= user.availableTime + 10) {
    score += 10; // Close enough
  }

  // 4. User interaction history (30 points)
  if (user.preferences.favoriteExercises.includes(exercise.id)) {
    score += 30;
    reasons.push('You favorited similar exercises');
  } else if (user.preferences.completedExercises.includes(exercise.id)) {
    score += 15;
    reasons.push('You completed this before');
  } else if (user.preferences.skippedExercises.includes(exercise.id)) {
    score -= 20; // Penalize skipped exercises
  }

  // 5. Category diversity bonus (10 points)
  // Note: This would require passing exercises array, simplified for now
  if (user.preferences.completedExercises.length > 0) {
    // Give bonus for trying different exercises
    if (!user.preferences.completedExercises.includes(exercise.id)) {
      score += 10;
      reasons.push('Adds variety to your routine');
    }
  }

  return Math.max(0, Math.min(100, score)); // Normalize to 0-100
}

// Get personalized recommendations
export function getRecommendations(user: UserProfile, exercises: Exercise[], limit: number = 5): RecommendationScore[] {
  const scoredExercises = exercises.map((exercise) => {
    const score = calculateSimilarityScore(user, exercise);
    const reasons: string[] = [];

    // Add contextual reasons
    if (score >= 70) {
      reasons.push('Highly recommended for you');
    }
    if (exercise.duration <= user.availableTime) {
      reasons.push(`Fits your ${user.availableTime}min schedule`);
    }
    if (exercise.intensity === 'rendah' && user.fitnessLevel === 'pemula') {
      reasons.push('Perfect for beginners');
    }

    return {
      exercise,
      score,
      reasons,
    };
  });

  // Sort by score and return top recommendations
  return scoredExercises.sort((a, b) => b.score - a.score).slice(0, limit);
}

// Learn from user interaction
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
