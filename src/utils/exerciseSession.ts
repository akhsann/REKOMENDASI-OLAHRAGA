/** Durasi sesi yang boleh dipilih pengguna (menit). */
export const SESSION_DURATION_OPTIONS = [15, 30, 60] as const;

export type SessionDurationMinutes = (typeof SESSION_DURATION_OPTIONS)[number];

export function isSessionDurationMinutes(n: number): n is SessionDurationMinutes {
  return n === 15 || n === 30 || n === 60;
}

/** Parse query `mins` dari URL; fallback 30 menit. */
export function parseSessionDurationMinutes(raw: string | null): SessionDurationMinutes {
  const n = parseInt(raw ?? '', 10);
  return isSessionDurationMinutes(n) ? n : 30;
}

/**
 * `caloriesBurn` pada Exercise = kalori untuk sesi referensi **30 menit**.
 * Skala linear ke durasi pilihan pengguna.
 */
export function caloriesBurnForDuration(caloriesBurnAt30Min: number, minutes: SessionDurationMinutes): number {
  return Math.round((caloriesBurnAt30Min / 30) * minutes);
}
