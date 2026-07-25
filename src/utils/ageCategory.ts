export type AgeCategoryKey = 'remaja' | 'dewasa' | 'lansia' | 'anak-anak';

export interface AgeCategoryInfo {
  key: AgeCategoryKey;
  label: string;
  rangeLabel: string;
  description: string;
  badgeClass: string;
}

/**
 * Pengelompokan Usia:
 * - Remaja : 10 - 18 Tahun
 * - Dewasa : 19 - 59 Tahun
 * - Lansia : 60 Tahun Ke atas
 */
export function getAgeCategoryInfo(age: number): AgeCategoryInfo {
  if (age < 10) {
    return {
      key: 'anak-anak',
      label: 'Anak-anak',
      rangeLabel: '< 10 Tahun',
      description: 'Di bawah 10 Tahun',
      badgeClass: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
    };
  }

  if (age >= 10 && age <= 18) {
    return {
      key: 'remaja',
      label: 'Remaja',
      rangeLabel: '10 - 18 Tahun',
      description: 'Kelompok Usia Remaja (10 - 18 Tahun)',
      badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    };
  }

  if (age >= 19 && age <= 59) {
    return {
      key: 'dewasa',
      label: 'Dewasa',
      rangeLabel: '19 - 59 Tahun',
      description: 'Kelompok Usia Dewasa (19 - 59 Tahun)',
      badgeClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    };
  }

  return {
    key: 'lansia',
    label: 'Lansia',
    rangeLabel: '60+ Tahun',
    description: 'Kelompok Usia Lansia (60 Tahun Ke atas)',
    badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  };
}

export function getAgeCategoryLabel(age: number): string {
  const info = getAgeCategoryInfo(age);
  return `${info.label} (${info.rangeLabel})`;
}
