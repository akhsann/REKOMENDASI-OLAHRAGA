import coachJson from '@/data/coachQuestionnaire.generated.json';
import { QUESTIONNAIRE_NAME_TO_EXERCISE_IDS } from '@/data/coachExerciseMapping';
import type { HealthCondition } from '@/types/exercise';

export type CoachSafetyFlag = 'aman' | 'tidak_aman' | 'aman_dengan_catatan';

const SAFETY_RANK: Record<CoachSafetyFlag, number> = {
  aman: 1,
  aman_dengan_catatan: 2,
  tidak_aman: 3,
};

function mergeSafety(a: CoachSafetyFlag, b: CoachSafetyFlag): CoachSafetyFlag {
  return SAFETY_RANK[a] >= SAFETY_RANK[b] ? a : b;
}

function normalizeCoachSafety(raw: string): CoachSafetyFlag {
  if (raw === 'tidak_aman' || raw === 'aman_dengan_catatan' || raw === 'aman') return raw;
  return 'aman';
}

function buildExerciseConditionLookup(): Map<string, { safety: CoachSafetyFlag; catatan: string[] }> {
  const map = new Map<string, { safety: CoachSafetyFlag; catatan: string[] }>();

  for (const rule of coachJson.rules) {
    const ids = QUESTIONNAIRE_NAME_TO_EXERCISE_IDS[rule.questionnaireExerciseName];
    if (!ids?.length) continue;

    const ruleSafety = normalizeCoachSafety(rule.safety);

    for (const exerciseId of ids) {
      const key = `${rule.condition}:${exerciseId}`;
      const prev = map.get(key);
      const safety = prev ? mergeSafety(prev.safety, ruleSafety) : ruleSafety;
      const catatan = [...(prev?.catatan ?? [])];
      if (rule.catatan && !catatan.includes(rule.catatan)) catatan.push(rule.catatan);
      map.set(key, { safety, catatan });
    }
  }

  return map;
}

const exerciseConditionLookup = buildExerciseConditionLookup();

export const COACH_CONDITION_LABEL: Record<Exclude<HealthCondition, 'tidak-ada'>, string> = {
  hipertensi: 'Hipertensi',
  asma: 'Asma',
  diabetes: 'Diabetes',
  obesitas: 'Obesitas',
  'nyeri-sendi': 'Nyeri sendi',
};

export type CoachExerciseVerdict = {
  safety: CoachSafetyFlag;
  catatanLines: string[];
};

export function getCoachVerdictForExercise(
  exerciseId: string,
  condition: Exclude<HealthCondition, 'tidak-ada'>
): CoachExerciseVerdict | null {
  const row = exerciseConditionLookup.get(`${condition}:${exerciseId}`);
  if (!row) return null;
  return { safety: row.safety, catatanLines: row.catatan };
}

export function getActiveHealthConditions(conditions: HealthCondition[]): Exclude<HealthCondition, 'tidak-ada'>[] {
  return conditions.filter((c): c is Exclude<HealthCondition, 'tidak-ada'> => c !== 'tidak-ada');
}
