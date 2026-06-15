import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Clock, Save, AlertCircle, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { WorkoutReminder as ReminderType, scheduleWorkoutReminder, isNativeApp, checkNotificationPermission, requestNotificationPermission } from '@/utils/notifications';
import { cn } from '@/lib/utils';

const DAYS = [
  { value: 0, label: 'Min' },
  { value: 1, label: 'Sen' },
  { value: 2, label: 'Sel' },
  { value: 3, label: 'Rab' },
  { value: 4, label: 'Kam' },
  { value: 5, label: 'Jum' },
  { value: 6, label: 'Sab' },
];

export function WorkoutReminder() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [hasPermission, setHasPermission] = useState(false);

  // Kunci localStorage khusus per pengguna
  const storageKey = user ? `workoutReminder_${user.id}` : null;

  const [reminder, setReminder] = useState<ReminderType>(() => {
    if (!storageKey) {
      return { id: 1, hour: 7, minute: 0, enabled: true, days: [1, 2, 3, 4, 5] };
    }
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, enabled: true }; // Pengingat selalu aktif ketika disimpan
    }
    return {
      id: 1,
      hour: 7,
      minute: 0,
      enabled: true,
      days: [1, 2, 3, 4, 5], // Senin sampai Jumat
    };
  });

  // Muat ulang pengaturan saat pengguna berganti
  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setReminder(JSON.parse(saved));
    } else {
      setReminder({ id: 1, hour: 7, minute: 0, enabled: true, days: [1, 2, 3, 4, 5] });
    }
  }, [storageKey]);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    if (!isNativeApp()) {
      return;
    }
    const permitted = await checkNotificationPermission();
    setHasPermission(permitted);
  };

  const handleRequestPermission = async () => {
    const granted = await requestNotificationPermission();
    setHasPermission(granted);

    if (granted) {
      toast({
        title: 'Izin Diberikan',
        description: 'Anda sekarang dapat menerima notifikasi pengingat latihan!',
      });
    } else {
      toast({
        title: 'Izin Ditolak',
        description: 'Silakan aktifkan notifikasi di pengaturan perangkat Anda untuk menerima pengingat.',
        variant: 'destructive',
      });
    }
  };

  const handleSave = async () => {
    if (!isNativeApp()) {
      if (!storageKey) return;
      localStorage.setItem(storageKey, JSON.stringify(reminder));
      toast({
        title: 'Pengaturan Disimpan (Simulasi)',
        description: `Pengingat diatur pada pukul ${String(reminder.hour).padStart(2, '0')}:${String(reminder.minute).padStart(2, '0')} secara lokal di web.`,
      });
      return;
    }

    if (!hasPermission && reminder.enabled) {
      await handleRequestPermission();
      return;
    }

    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(reminder));

    const success = await scheduleWorkoutReminder(reminder);

    if (success) {
      toast({
        title: 'Pengingat Diaktifkan!',
        description: `Anda akan menerima notifikasi pada pukul ${String(reminder.hour).padStart(2, '0')}:${String(reminder.minute).padStart(2, '0')}.`,
      });
    } else {
      toast({
        title: 'Gagal Menyimpan',
        description: 'Gagal mengatur pengingat latihan. Silakan coba lagi.',
        variant: 'destructive',
      });
    }
  };

  const toggleDay = (day: number) => {
    setReminder((prev) => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter((d) => d !== day) : [...prev.days, day].sort(),
    }));
  };

  return (
    <Card className="p-6 space-y-6 animate-fade-in-up hover-lift bg-card border border-border shadow-card rounded-2xl relative overflow-hidden">
      {/* Simulation Badge */}
      {!isNativeApp() && (
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 flex gap-3 items-start animate-fade-in mb-1">
          <span className="text-lg mt-0.5">💡</span>
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-primary">Mode Simulasi Web</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Anda dapat menyesuaikan waktu dan hari latihan. Notifikasi push asli akan aktif sepenuhnya saat aplikasi diinstal sebagai aplikasi native di HP.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-5">
        {/* Time Picker */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Clock className="h-4 w-4 text-primary" />
            Waktu Pengingat
          </Label>
          
          <div className="flex gap-4 items-center justify-center py-5 bg-secondary/30 rounded-2xl border border-border/50 shadow-inner">
            {/* Hour selector */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Jam</span>
              <div className="flex items-center gap-1 bg-card rounded-xl border border-input shadow-sm p-1.5 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <button 
                  type="button" 
                  onClick={() => setReminder((prev) => ({ ...prev, hour: (prev.hour - 1 + 24) % 24 }))}
                  className="p-1 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground active:scale-95 transition-all"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={String(reminder.hour).padStart(2, '0')}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    const num = Math.min(23, parseInt(raw) || 0);
                    setReminder((prev) => ({ ...prev, hour: num }));
                  }}
                  className="w-10 text-center font-bold text-xl bg-transparent border-0 p-0 focus:outline-none focus:ring-0 text-foreground"
                />
                <button 
                  type="button" 
                  onClick={() => setReminder((prev) => ({ ...prev, hour: (prev.hour + 1) % 24 }))}
                  className="p-1 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground active:scale-95 transition-all"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <span className="text-3xl font-light text-muted-foreground/60 self-end mb-2.5">:</span>

            {/* Minute selector */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">Menit</span>
              <div className="flex items-center gap-1 bg-card rounded-xl border border-input shadow-sm p-1.5 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <button 
                  type="button" 
                  onClick={() => setReminder((prev) => ({ ...prev, minute: (prev.minute - 1 + 60) % 60 }))}
                  className="p-1 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground active:scale-95 transition-all"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={String(reminder.minute).padStart(2, '0')}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, '');
                    const num = Math.min(59, parseInt(raw) || 0);
                    setReminder((prev) => ({ ...prev, minute: num }));
                  }}
                  className="w-10 text-center font-bold text-xl bg-transparent border-0 p-0 focus:outline-none focus:ring-0 text-foreground"
                />
                <button 
                  type="button" 
                  onClick={() => setReminder((prev) => ({ ...prev, minute: (prev.minute + 1) % 60 }))}
                  className="p-1 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground active:scale-95 transition-all"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Days Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold text-foreground">Ulangi Pada</Label>
          <div className="flex justify-between items-center gap-1.5 py-1">
            {DAYS.map((day) => {
              const isActive = reminder.days.includes(day.value);
              return (
                <button
                  key={day.value}
                  type="button"
                  onClick={() => toggleDay(day.value)}
                  className={cn(
                    "flex items-center justify-center w-11 h-11 rounded-full text-xs font-bold transition-all duration-300 transform active:scale-95 shadow-sm border",
                    isActive 
                      ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-primary/20 shadow-glow scale-105" 
                      : "bg-card text-muted-foreground border-border hover:bg-secondary/50"
                  )}
                >
                  {day.label}
                </button>
              );
            })}
          </div>
        </div>

        {!hasPermission && isNativeApp() && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-4 flex gap-3 items-start animate-fade-in">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-semibold text-destructive">Izin Notifikasi Diperlukan</h4>
              <p className="text-[11px] text-destructive/80 leading-relaxed">
                Izin notifikasi dinonaktifkan di perangkat Anda. Ketuk tombol <strong>Simpan Pengingat</strong> di bawah untuk meminta izin.
              </p>
            </div>
          </div>
        )}

        <Button onClick={handleSave} className="w-full py-6 bg-gradient-to-r from-accent to-accent/90 text-white hover:opacity-95 hover:shadow-premium hover:-translate-y-0.5 active:translate-y-0 gap-2 rounded-xl transition-all duration-300 font-semibold shadow-glow">
          <Save className="h-5 w-5" />
          Simpan Pengingat
        </Button>
      </div>
    </Card>
  );
}
