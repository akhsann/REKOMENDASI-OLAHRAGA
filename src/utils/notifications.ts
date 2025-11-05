import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export interface WorkoutReminder {
  id: number;
  hour: number;
  minute: number;
  enabled: boolean;
  days: number[]; // 0 = Sunday, 1 = Monday, etc.
}

export const isNativeApp = () => {
  return Capacitor.isNativePlatform();
};

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!isNativeApp()) {
    console.log('Not running on native platform');
    return false;
  }

  try {
    const permission = await LocalNotifications.requestPermissions();
    return permission.display === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
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
    console.error('Error checking notification permission:', error);
    return false;
  }
};

export const scheduleWorkoutReminder = async (reminder: WorkoutReminder) => {
  if (!isNativeApp()) {
    console.log('Notifications only work on native platform');
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
    // Cancel existing notification with this ID
    await LocalNotifications.cancel({ notifications: [{ id: reminder.id }] });

    if (!reminder.enabled) {
      return true;
    }

    // Schedule for each selected day
    const notifications = reminder.days.map((day) => {
      const now = new Date();
      const scheduledDate = new Date();
      
      // Set to target day
      const currentDay = now.getDay();
      const daysUntilTarget = (day - currentDay + 7) % 7;
      scheduledDate.setDate(now.getDate() + daysUntilTarget);
      
      // Set time
      scheduledDate.setHours(reminder.hour);
      scheduledDate.setMinutes(reminder.minute);
      scheduledDate.setSeconds(0);

      // If the time has passed today and it's the same day, schedule for next week
      if (daysUntilTarget === 0 && scheduledDate.getTime() < now.getTime()) {
        scheduledDate.setDate(scheduledDate.getDate() + 7);
      }

      return {
        id: reminder.id + day * 1000, // Unique ID per day
        title: '🏋️ Workout Time!',
        body: "It's time for your daily exercise. Let's get moving!",
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
    console.error('Error scheduling notification:', error);
    return false;
  }
};

export const cancelWorkoutReminder = async (reminderId: number) => {
  if (!isNativeApp()) {
    return;
  }

  try {
    // Cancel all notifications for this reminder (including all days)
    const notificationIds = Array.from({ length: 7 }, (_, i) => ({
      id: reminderId + i * 1000,
    }));
    await LocalNotifications.cancel({ notifications: notificationIds });
  } catch (error) {
    console.error('Error canceling notification:', error);
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
    console.error('Error getting pending notifications:', error);
    return [];
  }
};
