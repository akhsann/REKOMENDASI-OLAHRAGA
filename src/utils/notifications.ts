import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export interface WorkoutReminder {
  id: number;
  hour: number;
  minute: number;
  enabled: boolean;
  days: number[]; // 0 = Minggu, 1 = Senin, dst.
}

export const isNativeApp = () => {
  return Capacitor.isNativePlatform();
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!isNativeApp()) {
    console.log('Tidak berjalan di platform native');
    return false;
  }

  try {
    const permission = await LocalNotifications.requestPermissions();
    return permission.display === 'granted';
  } catch (error) {
    console.error('Kesalahan meminta izin notifikasi:', error);
    return false;
  }
};

export const checkNotificationPermission = async (): Promise<boolean> => {
  if (!isNativeApp()) {
    return false;
  }

  try {
    const permission = await LocalNotifications.checkPermissions();
    return permission.display === 'granted';
  } catch (error) {
    console.error('Kesalahan memeriksa izin notifikasi:', error);
    return false;
  }
};

export const scheduleWorkoutReminder = async (reminder: WorkoutReminder) => {
  if (!isNativeApp()) {
    console.log('Notifikasi hanya berfungsi di platform native');
    return false;
  }

  const hasPermission = await checkNotificationPermission();
  if (!hasPermission) {
    const granted = await requestNotificationPermission();
    if (!granted) {
      return false;
    }
  }

  try {
    // Batalkan SEMUA notifikasi harian yang ada untuk pengingat ini (hari 0–6)
    const allIds = Array.from({ length: 7 }, (_, i) => ({ id: reminder.id + i * 1000 }));
    await LocalNotifications.cancel({ notifications: allIds });

    if (!reminder.enabled) {
      return true;
    }

    const now = new Date();

    // Jadwalkan untuk setiap hari yang dipilih
    const notifications = reminder.days.map((day) => {
      const scheduledDate = new Date();

      // Atur ke hari target dalam seminggu
      const currentDay = now.getDay();
      let daysUntilTarget = (day - currentDay + 7) % 7;

      scheduledDate.setDate(now.getDate() + daysUntilTarget);

      // Atur waktu tepat, hapus milidetik untuk perbandingan yang presisi
      scheduledDate.setHours(reminder.hour);
      scheduledDate.setMinutes(reminder.minute);
      scheduledDate.setSeconds(0);
      scheduledDate.setMilliseconds(0);

      // Jika waktu terjadwal sudah lewat (hari yang sama atau sudah terlewati), geser ke minggu depan
      if (scheduledDate.getTime() <= now.getTime()) {
        scheduledDate.setDate(scheduledDate.getDate() + 7);
      }

      return {
        id: reminder.id + day * 1000, // ID unik per hari (mis. hari 0 = 1000, hari 1 = 2000, ...)
        title: '🏋️ Waktunya Olahraga!',
        body: 'Saatnya olahraga harian Anda. Ayo bergerak!',
        schedule: {
          at: scheduledDate,
          repeats: true,
          every: 'week' as const,
        },
        sound: 'beep.wav',
        smallIcon: 'ic_stat_icon_config_sample',
      };
    });

    if (notifications.length > 0) {
      await LocalNotifications.schedule({ notifications });
      return true;
    }

    return false;
  } catch (error) {
    console.error('Kesalahan menjadwalkan notifikasi:', error);
    return false;
  }
};

export const cancelWorkoutReminder = async (reminderId: number) => {
  if (!isNativeApp()) {
    return;
  }

  try {
    // Batalkan semua notifikasi untuk pengingat ini (termasuk semua hari)
    const notificationIds = Array.from({ length: 7 }, (_, i) => ({
      id: reminderId + i * 1000,
    }));
    await LocalNotifications.cancel({ notifications: notificationIds });
  } catch (error) {
    console.error('Kesalahan membatalkan notifikasi:', error);
  }
};

export const getPendingNotifications = async () => {
  if (!isNativeApp()) {
    return [];
  }

  try {
    const { notifications } = await LocalNotifications.getPending();
    return notifications;
  } catch (error) {
    console.error('Kesalahan mengambil notifikasi tertunda:', error);
    return [];
  }
};
