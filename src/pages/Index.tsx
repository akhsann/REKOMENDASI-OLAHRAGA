import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, saveUserProfile, hasUserProfile } from '@/utils/storage';
import { exercises } from '@/data/exercises';
import { getRecommendations, updateUserPreferences } from '@/utils/recommendation';
import { ExerciseCard } from '@/components/ExerciseCard';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { UserProfile, RecommendationScore } from '@/types/exercise';
import { Sparkles, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<RecommendationScore[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user has a profile
    if (!hasUserProfile()) {
      navigate('/profile');
      return;
    }

    const profile = getUserProfile();
    if (profile) {
      setUser(profile);
      loadRecommendations(profile);
    }
  }, [navigate]);

  const loadRecommendations = (profile: UserProfile) => {
    setIsLoading(true);
    const recs = getRecommendations(profile, exercises, 5);
    setRecommendations(recs);
    setIsLoading(false);
  };

  const handleFavorite = (exerciseId: string) => {
    if (!user) return;

    const isFavorite = user.preferences.favoriteExercises.includes(exerciseId);
    const updatedUser = updateUserPreferences(
      user,
      exerciseId,
      isFavorite ? 'complete' : 'favorite'
    );

    if (!isFavorite) {
      updatedUser.preferences.favoriteExercises.push(exerciseId);
    } else {
      updatedUser.preferences.favoriteExercises = 
        updatedUser.preferences.favoriteExercises.filter(id => id !== exerciseId);
    }

    saveUserProfile(updatedUser);
    setUser(updatedUser);
    toast({
      title: isFavorite ? 'Removed from favorites' : 'Added to favorites',
      description: isFavorite
        ? 'Exercise removed from your favorites.'
        : 'Exercise saved to your favorites!',
    });
  };

  const handleStart = (exerciseId: string) => {
    if (!user) return;

    const updatedUser = updateUserPreferences(user, exerciseId, 'complete');
    saveUserProfile(updatedUser);
    setUser(updatedUser);
    loadRecommendations(updatedUser);

    toast({
      title: 'Workout completed!',
      description: "Great job! We're learning your preferences to improve recommendations.",
    });
  };

  const handleSkip = (exerciseId: string) => {
    if (!user) return;

    const updatedUser = updateUserPreferences(user, exerciseId, 'skip');
    saveUserProfile(updatedUser);
    setUser(updatedUser);
    loadRecommendations(updatedUser);

    toast({
      title: 'Exercise skipped',
      description: "We'll show you different exercises next time.",
    });
  };

  const handleRefresh = () => {
    if (user) {
      loadRecommendations(user);
      toast({
        title: 'Recommendations refreshed',
        description: 'New exercise suggestions loaded!',
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-20 animate-fade-in">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="pt-4 space-y-4 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary-glow animate-pulse-glow shadow-glow">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">Today's Recommendations</h1>
              <p className="text-sm text-muted-foreground">
                Personalized just for you
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={isLoading}
              className="hover-scale"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-xl p-3 border border-border text-center hover-lift cursor-pointer animate-scale-in">
              <div className="text-2xl font-bold text-primary animate-pulse">
                {user.preferences.completedExercises.length}
              </div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="bg-card rounded-xl p-3 border border-border text-center hover-lift cursor-pointer animate-scale-in" style={{animationDelay: '0.1s'}}>
              <div className="text-2xl font-bold text-accent animate-pulse">
                {user.preferences.favoriteExercises.length}
              </div>
              <div className="text-xs text-muted-foreground">Favorites</div>
            </div>
            <div className="bg-card rounded-xl p-3 border border-border text-center hover-lift cursor-pointer animate-scale-in" style={{animationDelay: '0.2s'}}>
              <div className="text-2xl font-bold text-foreground animate-pulse">
                {user.availableTime}m
              </div>
              <div className="text-xs text-muted-foreground">Daily Time</div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <ExerciseCard
              key={rec.exercise.id}
              exercise={rec.exercise}
              score={rec.score}
              reasons={rec.reasons}
              isFavorite={user.preferences.favoriteExercises.includes(rec.exercise.id)}
              onFavorite={() => handleFavorite(rec.exercise.id)}
              onStart={() => handleStart(rec.exercise.id)}
              onSkip={() => handleSkip(rec.exercise.id)}
            />
          ))}
        </div>

        {/* AI Learning Notice */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm animate-fade-in-up hover-lift">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5 animate-pulse-glow" />
            <div className="space-y-1">
              <div className="font-semibold text-foreground">Smart Recommendations</div>
              <div className="text-muted-foreground text-xs">
                Our system learns from your interactions - completing, favoriting, and skipping exercises
                helps us suggest better workouts tailored to your preferences.
              </div>
            </div>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default Index;
