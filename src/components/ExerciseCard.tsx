import { Exercise } from '@/types/exercise';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Clock, Flame, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { categoryMap, intensityMap, benefitsMap, equipmentMap, muscleMap } from '@/utils/translationMaps';

interface ExerciseCardProps {
  exercise: Exercise;
  score?: number;
  reasons?: string[];
  isFavorite?: boolean;
  onFavorite?: () => void;
  onStart?: () => void;
  onSkip?: () => void;
}

const categoryColors: Record<Exercise['category'], string> = {
  cardio: 'bg-primary/10 text-primary border-primary/20',
  strength: 'bg-accent/10 text-accent border-accent/20',
  flexibility: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  balance: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
  hiit: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const intensityColors: Record<Exercise['intensity'], string> = {
  low: 'text-emerald-600',
  medium: 'text-amber-600',
  high: 'text-red-600',
};

export function ExerciseCard({ exercise, score, reasons, isFavorite = false, onFavorite, onStart, onSkip }: ExerciseCardProps) {
  return (
    <Card className="p-5 hover-lift border-border bg-card animate-fade-in-up overflow-hidden group relative">
      <div className="absolute inset-0 shimmer-bg animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
            <p className="text-sm text-muted-foreground line-clamp-2">{exercise.description}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onFavorite} className="shrink-0 hover-scale">
            <Heart className={cn('h-5 w-5 transition-all duration-300', isFavorite ? 'fill-accent text-accent scale-110' : 'text-muted-foreground')} />
          </Button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge className={categoryColors[exercise.category]}>{categoryMap[exercise.category]}</Badge>
          <Badge variant="outline" className="gap-1">
            <Clock className="h-3 w-3" />
            {exercise.duration} menit
          </Badge>
          <Badge variant="outline" className={cn('gap-1', intensityColors[exercise.intensity])}>
            <TrendingUp className="h-3 w-3" />
            {intensityMap[exercise.intensity]}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <Flame className="h-3 w-3 text-accent" />
            {exercise.caloriesBurn} kal
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
              <Button onClick={onStart} className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-glow">
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
