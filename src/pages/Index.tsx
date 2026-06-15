import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, saveUserProfile, hasUserProfile } from '@/utils/storage';
import { getExercises } from '@/utils/exerciseStore';
import { getRecommendations, updateUserPreferences } from '@/utils/recommendation';
import { ExerciseCard } from '@/components/ExerciseCard';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { UserProfile, RecommendationScore } from '@/types/exercise';
import type { SessionDurationMinutes } from '@/utils/exerciseSession';
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
    const recs = getRecommendations(profile, getExercises(), 5);
    setRecommendations(recs);
    setIsLoading(false);
  };

  const handleFavorite = (exerciseId: string) => {
    if (!user) return;

    const isFavorite = user.preferences.favoriteExercises.includes(exerciseId);
    let updatedUser: UserProfile;

    if (!isFavorite) {
      // Tambahkan ke favorit — updateUserPreferences sudah menangani push
      updatedUser = updateUserPreferences(user, exerciseId, 'favorite');
    } else {
      // Hapus dari favorit — lakukan filter manual
      updatedUser = {
        ...user,
        preferences: {
          ...user.preferences,
          favoriteExercises: user.preferences.favoriteExercises.filter((id) => id !== exerciseId),
        },
      };
    }

    saveUserProfile(updatedUser);
    setUser(updatedUser);
    toast({
      title: isFavorite ? 'Dihapus dari favorit' : 'Ditambahkan ke favorit',
      description: isFavorite ? 'Latihan telah dihapus dari favorit Anda.' : 'Latihan telah tersimpan di favorit Anda!',
    });
  };

  const handleStart = (exerciseId: string, durationMinutes: SessionDurationMinutes) => {
    navigate(`/tutorial?id=${exerciseId}&mins=${durationMinutes}`);
  };

  const handleSkip = (exerciseId: string) => {
    if (!user) return;

    const updatedUser = updateUserPreferences(user, exerciseId, 'skip');
    saveUserProfile(updatedUser);
    setUser(updatedUser);
    loadRecommendations(updatedUser);

    toast({
      title: 'Latihan dilewati',
      description: 'Kami akan menampilkan latihan yang berbeda lain kali.',
    });
  };

  const handleRefresh = () => {
    if (user) {
      loadRecommendations(user);
      toast({
        title: 'Rekomendasi diperbarui',
        description: 'Saran latihan baru telah dimuat!',
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
              <h1 className="text-2xl font-bold text-foreground">Rekomendasi Olahraga</h1>
              <p className="text-sm text-muted-foreground">Disesuaikan khusus untuk Anda</p>
            </div>
            <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading} className="hover-scale">
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card rounded-xl p-3 border border-border text-center hover-lift cursor-pointer animate-scale-in">
              <div className="text-2xl font-bold text-primary">{user.progress?.totalExercisesCompleted ?? 0}</div>
              <div className="text-xs text-muted-foreground">Selesai</div>
            </div>
            <div className="bg-card rounded-xl p-3 border border-border text-center hover-lift cursor-pointer animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-2xl font-bold text-accent">{user.preferences.favoriteExercises.length}</div>
              <div className="text-xs text-muted-foreground">Favorit</div>
            </div>
            <div className="bg-card rounded-xl p-3 border border-border text-center hover-lift cursor-pointer animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-2xl font-bold text-foreground">{user.availableTime}m</div>
              <div className="text-xs text-muted-foreground">Waktu Harian</div>
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
              onStart={(mins) => handleStart(rec.exercise.id, mins)}
              onSkip={() => handleSkip(rec.exercise.id)}
              userDuration={user.availableTime}
            />
          ))}
        </div>


      </div>

      <Navigation />
    </div>
  );
};

export default Index;
