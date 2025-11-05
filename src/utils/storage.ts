import { UserProfile } from '@/types/exercise';

const USER_PROFILE_KEY = 'fitness_user_profile';

export function saveUserProfile(profile: UserProfile): void {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
}

export function getUserProfile(): UserProfile | null {
  const stored = localStorage.getItem(USER_PROFILE_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function clearUserProfile(): void {
  localStorage.removeItem(USER_PROFILE_KEY);
}

export function hasUserProfile(): boolean {
  return localStorage.getItem(USER_PROFILE_KEY) !== null;
}
