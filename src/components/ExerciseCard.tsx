import { useState } from 'react';
import { Exercise } from '@/types/exercise';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Heart, Clock, Flame, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { caloriesBurnForDuration, type SessionDurationMinutes } from '@/utils/exerciseSession';
import { ExerciseVideoPlayer, exerciseVideoMap } from '@/components/ExerciseVideoPlayer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

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
  'seluruh-tubuh': 'Seluruh Tubuh',
  punggung: 'Punggung',
  kaki: 'Kaki',
  dada: 'Dada',
  lengan: 'Lengan',
  bahu: 'Bahu',
  inti: 'Inti',
  paha: 'Paha',
  bokong: 'Bokong',
  hamstring: 'Hamstring',
  betis: 'Betis',
};

const muscleImageMap: Record<string, string> = {
  'seluruh-tubuh': '/targetMuscles/seluruh-tubuh.png',
  punggung: '/targetMuscles/punggung.png',
  kaki: '/targetMuscles/kaki.png',
  dada: '/targetMuscles/dada.png',
  lengan: '/targetMuscles/lengan.png',
  bahu: '/targetMuscles/bahu.png',
  inti: '/targetMuscles/inti.png',
  paha: '/targetMuscles/paha.png',
  bokong: '/targetMuscles/bokong.jpg',
  hamstring: '/targetMuscles/hamstring.jpg',
  betis: '/targetMuscles/betis.png',
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
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  return (
    <>
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

          {/* Video Player Preview */}
          {exerciseVideoMap[exercise.id] && (
            <ExerciseVideoPlayer
              exerciseId={exercise.id}
              exerciseName={exercise.name}
              isPlaying={true}
              className="w-full aspect-video rounded-lg overflow-hidden border border-border/40 shadow-sm"
            />
          )}


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
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Otot Target</Label>
            <div className="flex flex-wrap gap-1.5">
              {exercise.targetMuscles.map((muscle) => (
                <button
                  key={muscle}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedMuscle(muscle);
                  }}
                  className="text-xs px-2.5 py-1 rounded-full bg-secondary hover:bg-primary/15 hover:text-primary text-secondary-foreground transition-all duration-300 font-medium cursor-pointer flex items-center gap-1.5 border border-border/40 hover:border-primary/20 hover:shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/70 inline-block animate-pulse" />
                  {muscleMap[muscle] ?? muscle}
                </button>
              ))}
            </div>
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

      <Dialog open={selectedMuscle !== null} onOpenChange={(open) => { if (!open) setSelectedMuscle(null); }}>
        <DialogContent className="sm:max-w-md max-w-[90%] rounded-2xl border-border bg-card p-0 overflow-hidden shadow-2xl animate-scale-in">
          {selectedMuscle && (
            <div className="flex flex-col">
              <div className="relative aspect-[4/3] bg-muted w-full overflow-hidden flex items-center justify-center">
                <img
                  src={muscleImageMap[selectedMuscle] || `/targetMuscles/${selectedMuscle}.png`}
                  alt={muscleMap[selectedMuscle] ?? selectedMuscle}
                  className="w-full h-full object-contain p-2 bg-slate-900/5 dark:bg-slate-950/20 animate-fade-in transition-all duration-500 hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-primary/30 shadow-sm">
                    Target Otot
                  </span>
                  <h4 className="text-xl font-bold mt-1 text-slate-900 dark:text-white drop-shadow-sm">
                    {muscleMap[selectedMuscle] ?? selectedMuscle}
                  </h4>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <DialogHeader className="p-0">
                  <DialogTitle className="text-lg font-bold text-foreground">
                    Visualisasi Otot: {muscleMap[selectedMuscle] ?? selectedMuscle}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground mt-1">
                    Latihan <strong className="text-primary font-semibold">{exercise.name}</strong> menargetkan area otot {muscleMap[selectedMuscle] ?? selectedMuscle} untuk membantu Anda mencapai kebugaran maksimal.
                  </DialogDescription>
                </DialogHeader>
                <div className="pt-2 flex justify-end">
                  <Button 
                    onClick={() => setSelectedMuscle(null)} 
                    className="w-full bg-gradient-to-r from-primary to-primary-glow text-white shadow-glow hover:opacity-90 transition-all duration-300 rounded-xl"
                  >
                    Tutup
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
