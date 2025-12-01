import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Bell, Clock, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WorkoutReminder as ReminderType, scheduleWorkoutReminder, isNativeApp, checkNotificationPermission, requestNotificationPermission } from '@/utils/notifications';

const DAYS = [
  { value: 0, label: 'Sun' },
  { value: 1, label: 'Mon' },
  { value: 2, label: 'Tue' },
  { value: 3, label: 'Wed' },
  { value: 4, label: 'Thu' },
  { value: 5, label: 'Fri' },
  { value: 6, label: 'Sat' },
];

export function WorkoutReminder() {
  const { toast } = useToast();
  const [hasPermission, setHasPermission] = useState(false);
  const [reminder, setReminder] = useState<ReminderType>(() => {
    const saved = localStorage.getItem('workoutReminder');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      id: 1,
      hour: 7,
      minute: 0,
      enabled: false,
      days: [1, 2, 3, 4, 5], // Monday to Friday
    };
  });

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
        title: 'Permission Granted',
        description: 'You can now receive workout reminders!',
      });
    } else {
      toast({
        title: 'Permission Denied',
        description: 'Please enable notifications in your device settings.',
        variant: 'destructive',
      });
    }
  };

  const handleSave = async () => {
    if (!isNativeApp()) {
      toast({
        title: 'Native App Required',
        description: 'Notifications only work in the native mobile app. Please follow the setup instructions.',
        variant: 'destructive',
      });
      return;
    }

    if (!hasPermission && reminder.enabled) {
      await handleRequestPermission();
      return;
    }

    localStorage.setItem('workoutReminder', JSON.stringify(reminder));

    const success = await scheduleWorkoutReminder(reminder);

    if (success) {
      toast({
        title: reminder.enabled ? 'Reminder Set!' : 'Reminder Disabled',
        description: reminder.enabled ? `You'll get notifications at ${String(reminder.hour).padStart(2, '0')}:${String(reminder.minute).padStart(2, '0')}` : 'Your workout reminders have been disabled.',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to set reminder. Please try again.',
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

  if (!isNativeApp()) {
    return (
      <Card className="p-5 animate-fade-in-up bg-accent/5 border-accent/20">
        <div className="flex items-start gap-3">
          <Bell className="h-5 w-5 text-accent shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">Notifikasi Latihan</h3>
            <p className="text-sm text-muted-foreground">Untuk mengaktifkan pengingat latihan, Anda perlu menjalankan aplikasi ini sebagai aplikasi seluler asli.</p>
            <p className="text-xs text-muted-foreground mt-2">Ikuti petunjuk pemasangan di bawah ini untuk menginstal aplikasi asli di perangkat Anda.</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5 space-y-5 animate-fade-in-up hover-lift">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-accent to-accent/80 shadow-glow">
            <Bell className="h-5 w-5 text-accent-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Pengingat Latihan Harian</h3>
            <p className="text-xs text-muted-foreground">Dapatkan notifikasi untuk latihan harian Anda</p>
          </div>
        </div>
        <Switch checked={reminder.enabled} onCheckedChange={(enabled) => setReminder((prev) => ({ ...prev, enabled }))} />
      </div>

      {reminder.enabled && (
        <div className="space-y-4 animate-scale-in">
          {/* Time Picker */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Waktu Pengingat
            </Label>
            <div className="flex gap-2 items-center">
              <Input type="number" min="0" max="23" value={reminder.hour} onChange={(e) => setReminder((prev) => ({ ...prev, hour: parseInt(e.target.value) || 0 }))} className="w-20 text-center" placeholder="HH" />
              <span className="text-2xl font-bold">:</span>
              <Input type="number" min="0" max="59" value={reminder.minute} onChange={(e) => setReminder((prev) => ({ ...prev, minute: parseInt(e.target.value) || 0 }))} className="w-20 text-center" placeholder="MM" />
            </div>
          </div>

          {/* Days Selection */}
          <div className="space-y-2">
            <Label>Ulangi Pada</Label>
            <div className="flex flex-wrap gap-2">
              {DAYS.map((day) => (
                <div
                  key={day.value}
                  onClick={() => toggleDay(day.value)}
                  className={`
                  flex items-center justify-center w-12 h-12 rounded-full cursor-pointer
                  transition-all duration-300 hover-scale
                  ${reminder.days.includes(day.value) ? 'bg-primary text-primary-foreground shadow-glow' : 'bg-secondary text-secondary-foreground'}
                `}
                >
                  <span className="text-xs font-semibold">{day.label}</span>
                </div>
              ))}
            </div>
          </div>

          {!hasPermission && (
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-sm">
              <p className="text-accent-foreground">📱 Izin notifikasi diperlukan. Ketuk "Simpan Pengingat" untuk mengaktifkan notifikasi.</p>
            </div>
          )}

          <Button onClick={handleSave} className="w-full bg-gradient-to-r from-accent to-accent/80 hover:opacity-90 gap-2 hover-scale shadow-glow">
            <Save className="h-4 w-4" />
            Simpan Pengingat
          </Button>
        </div>
      )}

      {!reminder.enabled && (
        <Button onClick={handleSave} variant="outline" className="w-full hover-scale">
          Simpan Pengaturan
        </Button>
      )}
    </Card>
  );
}
