import { User } from '@/types/auth';
import { UserProfile } from '@/types/exercise';
import { supabase } from './supabase';

const AUTH_TOKEN_KEY = 'fitness_auth_token';
const CURRENT_USER_KEY = 'fitness_current_user';

export async function registerUser(name: string, email: string, password: string): Promise<User> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        role: 'user',
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('Gagal mendaftar pengguna');
  }

  const user: User = {
    id: data.user.id,
    name: data.user.user_metadata.name || name,
    email: data.user.email || email,
    createdAt: data.user.created_at,
    role: data.user.user_metadata.role || 'user',
  };

  // Create default user profile in Supabase profiles table
  const defaultProfile: UserProfile = {
    id: data.user.id,
    age: 0,
    gender: 'pria',
    goals: ['kebugaran-umum'],
    availableTime: 30,
    healthConditions: ['tidak-ada'],
    activityLevel: 'ringan',
    preferences: {
      favoriteExercises: [],
      completedExercises: [],
      skippedExercises: [],
    },
    progress: {
      currentStreak: 0,
      longestStreak: 0,
      totalExercisesCompleted: 0,
      totalCaloriesBurned: 0,
      dailyLogs: [],
    },
  };

  // We save the profile to the backend
  await supabase.from('profiles').insert([{
    id: data.user.id,
    profile_data: defaultProfile
  }]);

  // Keep a local copy for quick synchronous access if needed
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  if (data.session) {
    localStorage.setItem(AUTH_TOKEN_KEY, data.session.access_token);
  }

  return user;
}

export async function loginUser(email: string, password: string): Promise<User> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.toLowerCase().includes('email not confirmed') ||
        error.message.toLowerCase().includes('not confirmed')) {
      throw new Error('Email Anda belum dikonfirmasi. Silakan cek inbox email dan klik link verifikasi terlebih dahulu.');
    }
    if (error.message.toLowerCase().includes('invalid login credentials') ||
        error.message.toLowerCase().includes('invalid credentials')) {
      throw new Error('Email atau password salah.');
    }
    throw new Error(error.message);
  }

  if (!data.user) {
    throw new Error('Gagal masuk');
  }

  const userData: User = {
    id: data.user.id,
    name: data.user.user_metadata.name || 'User',
    email: data.user.email || email,
    createdAt: data.user.created_at,
    role: data.user.user_metadata.role || 'user',
  };

  // Sync profile from Supabase to local storage on login
  const { data: profileData } = await supabase
    .from('profiles')
    .select('profile_data')
    .eq('id', data.user.id)
    .single();

  if (profileData && profileData.profile_data) {
    // Embed email into profile_data so AdminDashboard can display it
    const profileWithEmail = { ...profileData.profile_data, email: data.user.email || email, id: data.user.id };
    localStorage.setItem('fitness_user_profile', JSON.stringify(profileWithEmail));
    // Also update Supabase with email embedded (so admin can see it)
    await supabase.from('profiles').upsert({
      id: data.user.id,
      profile_data: profileWithEmail,
    });
  } else {
    // Just in case it doesn't exist, we can clear it or set a default
    localStorage.removeItem('fitness_user_profile');
  }

  // Also sync ALL custom exercises from all users
  const { data: exercisesData } = await supabase
    .from('custom_exercises')
    .select('exercise_data');
  
  if (exercisesData && exercisesData.length > 0) {
    const customEx = exercisesData.map(e => e.exercise_data);
    localStorage.setItem('fitness_custom_exercises', JSON.stringify(customEx));
  } else {
    localStorage.removeItem('fitness_custom_exercises');
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData));
  if (data.session) {
    localStorage.setItem(AUTH_TOKEN_KEY, data.session.access_token);
  }

  return userData;
}

export function getCurrentUser(): User | null {
  const stored = localStorage.getItem(CURRENT_USER_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function getAuthToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return !!getAuthToken() && !!getCurrentUser();
}

export async function logoutUser(): Promise<void> {
  await supabase.auth.signOut();
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  // Also clear profile from localStorage to force fresh fetch next time
  localStorage.removeItem('fitness_user_profile');
}

// Get user profile for current user (Local wrapper for sync needs, full fetch is in storage.ts)
export function getCurrentUserProfile(): UserProfile | null {
  const user = getCurrentUser();
  if (!user) return null;

  // We try to get it from local storage first for immediate rendering
  const stored = localStorage.getItem('fitness_user_profile');
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function saveCurrentUserProfile(profile: UserProfile): void {
  // Sync wrapper
  localStorage.setItem('fitness_user_profile', JSON.stringify(profile));
}

// Get all users (Admin only function) - Now fetching from Supabase auth users requires Edge Functions or Service Role.
// For now, we will simulate this by returning empty or throwing error if not properly configured with an admin API.
export async function getAllUsers(): Promise<User[]> {
  throw new Error('Admin functionality requires Supabase Service Role Key setup on backend.');
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('profile_data')
    .eq('id', userId)
    .single();

  if (error || !data) return null;
  return data.profile_data as UserProfile;
}

