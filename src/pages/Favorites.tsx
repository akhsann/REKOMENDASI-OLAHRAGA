import { useState, useEffect } from 'react';
import { getUserProfile, saveUserProfile } from '@/utils/storage';
import { exercises } from '@/data/exercises';
import { ExerciseCard } from '@/components/ExerciseCard';
import { Navigation } from '@/components/Navigation';
import { Heart } from 'lucide-react';
import { UserProfile } from '@/types/exercise';
import { useToast } from '@/hooks/use-toast';

export default function Favorites() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const profile = getUserProfile();
    setUser(profile);
  }, []);

  const favoriteExercises = exercises.filter(
    (ex) => user?.preferences.favoriteExercises.includes(ex.id)
  );

  const handleUnfavorite = (exerciseId: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        favoriteExercises: user.preferences.favoriteExercises.filter((id) => id !== exerciseId),
      },
    };

    saveUserProfile(updatedUser);
    setUser(updatedUser);
    toast({
      title: 'Removed from favorites',
      description: 'Exercise removed from your favorites list.',
    });
  };

  const handleStart = (exerciseId: string) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        completedExercises: [...user.preferences.completedExercises, exerciseId],
      },
    };

    saveUserProfile(updatedUser);
    setUser(updatedUser);
    toast({
      title: 'Workout completed!',
      description: 'Great job! Keep up the momentum.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-20 animate-fade-in">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4 animate-fade-in-up">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-accent to-accent/80 shadow-glow animate-pulse-glow">
            <Heart className="h-6 w-6 text-accent-foreground fill-current animate-bounce-subtle" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Favorites</h1>
            <p className="text-sm text-muted-foreground">
              {favoriteExercises.length} saved exercise{favoriteExercises.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Favorites List */}
        {favoriteExercises.length === 0 ? (
          <div className="text-center py-12 animate-scale-in">
            <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No favorites yet</h3>
            <p className="text-sm text-muted-foreground">
              Start adding exercises to your favorites from the home page!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {favoriteExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                isFavorite={true}
                onFavorite={() => handleUnfavorite(exercise.id)}
                onStart={() => handleStart(exercise.id)}
              />
            ))}
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
}
