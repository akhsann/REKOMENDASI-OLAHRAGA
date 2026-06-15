
import { Exercise } from '@/types/exercise';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Heart, Clock, Flame, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { caloriesBurnForDuration, type SessionDurationMinutes } from '@/utils/exerciseSession';

const categoryMap: Record<string, string> = {
  kardio: 'Kardio',
  kekuatan: 'Kekuatan',
  fleksibilitas: 'Fleksibilitas',
  keseimbangan: 'Keseimbangan',
  hiit: 'HIIT',
  cardio: 'Kardio',
  strength: 'Kekuatan',
  flexibility: 'Fleksibilitas',
  balance: 'Keseimbangan',
};

const intensityMap: Record<string, string> = {
  rendah: 'Rendah',
  sedang: 'Sedang',
  tinggi: 'Tinggi',
  low: 'Rendah',
  medium: 'Sedang',
  high: 'Tinggi',
};

const benefitsMap: Record<string, string> = {
  'weight-loss': 'Penurunan Berat Badan',
  endurance: 'Daya Tahan',
  'general-fitness': 'Kebugaran Umum',
  'muscle-gain': 'Penambahan Otot',
  flexibility: 'Fleksibilitas',
};

const muscleMap: Record<string, string> = {
  legs: 'Kaki',
  core: 'Inti',
  glutes: 'Gluteus',
  chest: 'Dada',
  shoulders: 'Bahu',
  triceps: 'Triceps',
  'full-body': 'Seluruh Tubuh',
  back: 'Punggung',
};

interface ExerciseCardProps {
  exercise: Exercise;
  score?: number;
  reasons?: string[];
  isFavorite?: boolean;
  onFavorite?: () => void;
  /** Dipanggil dengan durasi sesi yang dipilih (15 / 30 / 60 menit). */
  onStart?: (durationMinutes: SessionDurationMinutes) => void;
  onSkip?: () => void;
  /** Waktu tersedia harian dari profil pengguna */
  userDuration?: number;
}

const categoryColors: Record<Exercise['category'], string> = {
  kardio: 'bg-primary/10 text-primary border-primary/20',
  kekuatan: 'bg-accent/10 text-accent border-accent/20',
  fleksibilitas: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  keseimbangan: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  hiit: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const intensityColors: Record<Exercise['intensity'], string> = {
  rendah: 'text-emerald-600',
  sedang: 'text-amber-600',
  tinggi: 'text-red-600',
};

export function ExerciseCard({ exercise, score, reasons, isFavorite = false, onFavorite, onStart, onSkip, userDuration }: ExerciseCardProps) {
  const sessionMinutes = (userDuration as SessionDurationMinutes) || 30;
  const caloriesDisplay = caloriesBurnForDuration(exercise.caloriesBurn, sessionMinutes);

  return (
    <Card className="p-5 hover-lift border-border bg-card animate-fade-in-up overflow-hidden group relative">

      <div className="flex flex-col gap-4 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">{exercise.name}</h3>
              {score !== undefined && (
                <Badge variant="secondary" className="text-xs animate-scale-in">
                  {score}% kecocokan
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{exercise.description}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onFavorite} className="shrink-0 hover-scale">
            <Heart className={cn('h-5 w-5 transition-all duration-300', isFavorite ? 'fill-accent text-accent scale-110' : 'text-muted-foreground')} />
          </Button>
        </div>


        {/* Durasi sesi */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Durasi sesi</Label>
          <div className="flex">
            <Badge variant="secondary" className="px-3 py-1 text-sm bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20">
              {sessionMinutes} menit
            </Badge>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge className={cn(categoryColors[exercise.category], 'border')}>{categoryMap[exercise.category]}</Badge>
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            {sessionMinutes} menit
          </Badge>
          <Badge variant="outline" className={cn('gap-1', intensityColors[exercise.intensity])}>
            <TrendingUp className="h-3 w-3" />
            {intensityMap[exercise.intensity]}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Flame className="h-3 w-3 text-accent" />
            ~{caloriesDisplay} kal
          </Badge>
        </div>

        {/* Target Muscles */}
        <div className="flex flex-wrap gap-1">
          {exercise.targetMuscles.map((muscle) => (
            <span key={muscle} className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
              {muscleMap[muscle] ?? muscle}
            </span>
          ))}
        </div>

        {/* Reasons */}
        {reasons && reasons.length > 0 && (
          <div className="text-xs text-muted-foreground space-y-1">
            {reasons.map((reason, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <span className="text-primary">✓</span>
                {benefitsMap[reason] ?? reason}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {(onStart || onSkip) && (
          <div className="flex gap-2 pt-2">
            {onStart && (
              <Button
                onClick={() => onStart(sessionMinutes)}
                className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-glow"
              >
                Mulai Latihan
              </Button>
            )}
            {onSkip && (
              <Button onClick={onSkip} variant="outline" className="flex-1 hover:scale-105 transition-all duration-300">
                Lewati
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
