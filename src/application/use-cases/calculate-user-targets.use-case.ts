import type { UserProfile } from '@/domain/entities/user-profile';
import { roundToTenth } from '@/domain/value-objects/nutrition-facts';

export interface CalculatedTargets {
  bmrKcal: number;
  tdeeKcal: number;
  targetCaloriesKcal: number;
  targetProteinGrams: number;
  usesReferenceWeight: boolean;
  referenceWeightKg?: number;
  proteinPercentOfKcal: number;
}

const ACTIVITY_FACTORS: Record<UserProfile['activityLevel'], number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very: 1.725,
  athlete: 1.9,
};

const GOAL_FACTORS: Record<UserProfile['goal'], { kcalMultiplier: number; proteinPerKg: number }> =
  {
    cut: { kcalMultiplier: 0.8, proteinPerKg: 2.2 }, // ~1.0g/lb
    maintain: { kcalMultiplier: 1.0, proteinPerKg: 1.76 }, // ~0.8g/lb
    bulk: { kcalMultiplier: 1.1, proteinPerKg: 2.0 }, // ~0.9g/lb
  };

const KCAL_PER_GRAM_PROTEIN = 4;
const MAX_PROTEIN_CALORIE_PERCENT = 0.35; // 35% safety cap

/**
 * Pure Application Use Case:
 * Deterministically computes Mifflin–St Jeor BMR, TDEE, Calorie targets, and Protein targets.
 * Applies BMI 25 reference weight ceiling and 35% total calorie upper bound.
 */
export function calculateUserTargets(profile: UserProfile): CalculatedTargets {
  const { weightKg, heightCm, age, gender, activityLevel, goal } = profile;

  // 1. Mifflin–St Jeor BMR Calculation
  const genderOffset = gender === 'male' ? 5 : -161;
  const bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + genderOffset;

  // 2. TDEE
  const activityMultiplier = ACTIVITY_FACTORS[activityLevel] ?? 1.2;
  const tdee = bmr * activityMultiplier;

  // 3. Target Calories based on Goal
  const goalConfig = GOAL_FACTORS[goal] ?? GOAL_FACTORS.maintain;
  const calculatedKcal = tdee * goalConfig.kcalMultiplier;
  const targetCaloriesKcal = Math.round(profile.customDailyCalorieTarget ?? calculatedKcal);

  // 4. Reference Weight Check (BMI > 25 cap)
  const heightM = heightCm / 100;
  const currentBmi = weightKg / (heightM * heightM);
  let effectiveWeightForProtein = weightKg;
  let usesReferenceWeight = false;
  let referenceWeightKg: number | undefined;

  if (currentBmi > 25) {
    usesReferenceWeight = true;
    referenceWeightKg = roundToTenth(25 * (heightM * heightM));
    effectiveWeightForProtein = referenceWeightKg;
  }

  // 5. Protein calculation
  let rawProtein = effectiveWeightForProtein * goalConfig.proteinPerKg;

  // 6. Safety Cap: Max 35% of total calories
  const maxProteinByCalorieCap =
    (targetCaloriesKcal * MAX_PROTEIN_CALORIE_PERCENT) / KCAL_PER_GRAM_PROTEIN;
  if (rawProtein > maxProteinByCalorieCap) {
    rawProtein = maxProteinByCalorieCap;
  }

  const finalProteinGrams = Math.round(profile.customDailyProteinFloorG ?? rawProtein);
  const proteinPercentOfKcal = roundToTenth(
    ((finalProteinGrams * KCAL_PER_GRAM_PROTEIN) / targetCaloriesKcal) * 100
  );

  return {
    bmrKcal: Math.round(bmr),
    tdeeKcal: Math.round(tdee),
    targetCaloriesKcal,
    targetProteinGrams: finalProteinGrams,
    usesReferenceWeight,
    referenceWeightKg,
    proteinPercentOfKcal,
  };
}
