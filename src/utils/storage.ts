import { UserProfile, DailyProgress } from '@/types/exercise';
import { getCurrentUser, getCurrentUserProfile, saveCurrentUserProfile } from './auth';

import { supabase } from './supabase';

const USER_PROFILE_KEY = 'fitness_user_profile'; // Legacy key for backward compatibility

export function saveUserProfile(profile: UserProfile): void {
  // Try to save using auth system first
  try {
    saveCurrentUserProfile(profile);
    
    // Also sync to Supabase asynchronously if user is logged in
    const currentUser = getCurrentUser(); // Use authenticated User (has valid Supabase UUID)
    if (currentUser?.id) {
      const profileWithId = { ...profile, id: currentUser.id };
      supabase.from('profiles').upsert({
        id: currentUser.id,
        profile_data: profileWithId
      }).then(({ error }) => {
        if (error) console.error('Failed to sync profile to Supabase:', error);
      });
    }
  } catch {
    // Fallback to legacy storage if not authenticated
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  }
}

export function getUserProfile(): UserProfile | null {
  // Try to get from auth system first
  const authProfile = getCurrentUserProfile();
  if (authProfile) return authProfile;

  // Fallback to legacy storage
  const stored = localStorage.getItem(USER_PROFILE_KEY);
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    // Ensure progress fields exist for backward compatibility
    if (!parsed.progress) {
      parsed.progress = {
        dailyLogs: [],
        currentStreak: 0,
        longestStreak: 0,
        totalCaloriesBurned: 0,
        totalExercisesCompleted: 0,
      };
    }
    return parsed;
  } catch {
    return null;
  }
}

export function clearUserProfile(): void {
  localStorage.removeItem(USER_PROFILE_KEY);
}

export function hasUserProfile(): boolean {
  // Check auth system first
  const authProfile = getCurrentUserProfile();
  if (authProfile) return true;

  // Fallback to legacy check
  return localStorage.getItem(USER_PROFILE_KEY) !== null;
}

// Progress tracking utilities
export function calculateStreak(dailyLogs: DailyProgress[]): { current: number; longest: number } {
  if (dailyLogs.length === 0) return { current: 0, longest: 0 };

  // Sort logs by date (most recent first)
  const sortedLogs = [...dailyLogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Check if user exercised today or yesterday to continue streak
  const hasRecentActivity = sortedLogs.some((log) => log.date === today || log.date === yesterday);

  if (!hasRecentActivity) {
    currentStreak = 0;
  } else {
    // Calculate current streak
    let checkDate = new Date();
    while (true) {
      const dateStr = checkDate.toISOString().split('T')[0];
      const hasActivity = sortedLogs.some((log) => log.date === dateStr);

      if (hasActivity) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  // Calculate longest streak
  for (let i = 0; i < sortedLogs.length; i++) {
    if (sortedLogs[i].exercisesCompleted.length > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return { current: currentStreak, longest: longestStreak };
}

export function getTodayProgress(dailyLogs: DailyProgress[]): DailyProgress | null {
  const today = new Date().toISOString().split('T')[0];
  return dailyLogs.find((log) => log.date === today) || null;
}

export function updateDailyProgress(dailyLogs: DailyProgress[], exerciseId: string, caloriesBurned: number, timeSpent: number): DailyProgress[] {
  const today = new Date().toISOString().split('T')[0];
  const existingLog = dailyLogs.find((log) => log.date === today);

  if (existingLog) {
    // Update existing log
    existingLog.exercisesCompleted.push(exerciseId);
    existingLog.caloriesBurned += caloriesBurned;
    existingLog.timeSpent += timeSpent;
    return dailyLogs;
  } else {
    // Create new log
    const newLog: DailyProgress = {
      date: today,
      exercisesCompleted: [exerciseId],
      caloriesBurned,
      timeSpent,
    };
    return [...dailyLogs, newLog];
  }
}
