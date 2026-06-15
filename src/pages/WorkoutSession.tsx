import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getExercises } from '@/utils/exerciseStore';
import { getUserProfile, saveUserProfile, updateDailyProgress, calculateStreak } from '@/utils/storage';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { Play, Pause, Square, Clock, Flame, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { caloriesBurnForDuration, parseSessionDurationMinutes } from '@/utils/exerciseSession';

export default function WorkoutSession() {
  const [searchParams] = useSearchParams();
  const exerciseId = searchParams.get('id');
  const sessionMinutes = parseSessionDurationMinutes(searchParams.get('mins'));
  const navigate = useNavigate();
  const { toast } = useToast();

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0); // in seconds
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [showCompleteDialog, setShowCompleteDialog] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const exercise = getExercises().find((ex) => ex.id === exerciseId);
  const sessionSeconds = sessionMinutes * 60;
  const sessionCalorieTarget = exercise ? caloriesBurnForDuration(exercise.caloriesBurn, sessionMinutes) : 0;

  useEffect(() => {
    if (!exercise) {
      navigate('/');
      return;
    }
  }, [exercise, navigate]);

  useEffect(() => {
    if (isActive && !isPaused && exercise) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed((prev) => {
          const newTime = prev + 1;
          const caloriesPerSecond = sessionCalorieTarget / sessionSeconds;
          setCaloriesBurned(Math.floor(newTime * caloriesPerSecond));
          return newTime;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, isPaused, exercise, sessionCalorieTarget, sessionSeconds]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = (): number => {
    if (!exercise) return 0;
    return Math.min((timeElapsed / sessionSeconds) * 100, 100);
  };

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    toast({
      title: 'Latihan dimulai!',
      description: 'Tetap semangat dan jaga form yang benar!',
    });
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeElapsed(0);
    setCaloriesBurned(0);
    toast({
      title: 'Latihan dihentikan',
      description: 'Progress tidak disimpan.',
    });
  };

  const handleComplete = () => {
    if (!exercise) return;

    const user = getUserProfile();
    if (!user) {
      toast({
        title: 'Error',
        description: 'User profile tidak ditemukan',
        variant: 'destructive',
      });
      return;
    }

    const timeSpent = Math.ceil(timeElapsed / 60); // Convert to minutes
    const finalCalories = caloriesBurned || sessionCalorieTarget;

    // Update progress
    const updatedUser = { ...user };
    updatedUser.preferences.completedExercises.push(exercise.id);
    updatedUser.progress.dailyLogs = updateDailyProgress(updatedUser.progress.dailyLogs, exercise.id, finalCalories, timeSpent);
    updatedUser.progress.totalExercisesCompleted += 1;
    updatedUser.progress.totalCaloriesBurned += finalCalories;

    // Recalculate streaks
    const streaks = calculateStreak(updatedUser.progress.dailyLogs);
    updatedUser.progress.currentStreak = streaks.current;
    updatedUser.progress.longestStreak = Math.max(updatedUser.progress.longestStreak, streaks.longest);

    saveUserProfile(updatedUser);

    toast({
      title: 'Latihan selesai!',
      description: `Anda telah membakar ${finalCalories} kalori dalam ${timeSpent} menit. Kerja bagus!`,
    });

    navigate('/');
  };

  if (!exercise) {
    return null;
  }

  const progress = getProgress();
  const timeRemaining = sessionSeconds - timeElapsed;
  const isComplete = timeElapsed >= sessionSeconds;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-24">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-4 animate-fade-in-up">
          <h1 className="text-2xl font-bold text-foreground">{exercise.name}</h1>
          <p className="text-sm text-muted-foreground">{exercise.description}</p>
        </div>

        {/* Progress Card */}
        <Card className="animate-scale-in">
          <CardContent className="p-6 space-y-4">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold text-primary mb-4">{formatTime(timeElapsed)}</div>
              <Progress value={progress} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0:00</span>
                <span>
                  {sessionMinutes}:00
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-secondary rounded-lg p-4 text-center">
                <Flame className="h-5 w-5 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{caloriesBurned}</div>
                <div className="text-xs text-muted-foreground">Kalori</div>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <Clock className="h-5 w-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{formatTime(Math.max(0, timeRemaining))}</div>
                <div className="text-xs text-muted-foreground">Tersisa</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Alert */}
        {isComplete && (
          <Alert className="border-emerald-500/20 bg-emerald-500/5 animate-fade-in">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <AlertDescription className="text-emerald-600">Latihan selesai! Klik tombol "Selesai" untuk menyimpan progress.</AlertDescription>
          </Alert>
        )}

        {!isActive && !isComplete && (
          <Alert className="animate-fade-in">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Siap untuk memulai? Pastikan Anda sudah melakukan pemanasan dan siap untuk latihan.</AlertDescription>
          </Alert>
        )}

        {/* Control Buttons */}
        <div className="space-y-3">
          {!isActive ? (
            <Button onClick={handleStart} className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 gap-2" size="lg">
              <Play className="h-5 w-5" />
              Mulai Latihan
            </Button>
          ) : (
            <div className="flex gap-3">
              {isPaused ? (
                <Button onClick={handleResume} className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 gap-2" size="lg">
                  <Play className="h-5 w-5" />
                  Lanjutkan
                </Button>
              ) : (
                <Button onClick={handlePause} variant="outline" className="flex-1 gap-2" size="lg">
                  <Pause className="h-5 w-5" />
                  Jeda
                </Button>
              )}
              <Button onClick={handleStop} variant="destructive" className="flex-1 gap-2" size="lg">
                <Square className="h-5 w-5" />
                Hentikan
              </Button>
            </div>
          )}

          {isComplete && (
            <Button onClick={() => setShowCompleteDialog(true)} className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:opacity-90 gap-2" size="lg">
              <CheckCircle2 className="h-5 w-5" />
              Selesai & Simpan
            </Button>
          )}
        </div>

        {/* Exercise Info */}
        <Card className="bg-secondary/50">
          <CardContent className="p-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Target Durasi:</span>
              <span className="font-semibold">{sessionMinutes} menit</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Target Kalori:</span>
              <span className="font-semibold">{sessionCalorieTarget} kal</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Intensitas:</span>
              <span className="font-semibold capitalize">{exercise.intensity}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Complete Dialog */}
      <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Latihan Selesai!</DialogTitle>
            <DialogDescription>Apakah Anda yakin ingin menyelesaikan latihan ini? Progress akan disimpan.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Waktu:</span>
              <span className="font-semibold">{formatTime(timeElapsed)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Kalori:</span>
              <span className="font-semibold">{caloriesBurned} kal</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCompleteDialog(false)}>
              Batal
            </Button>
            <Button onClick={handleComplete} className="bg-gradient-to-r from-primary to-primary-glow">
              Simpan & Selesai
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}





