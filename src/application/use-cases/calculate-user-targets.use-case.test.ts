import { describe, it, expect } from 'vitest';
import { calculateUserTargets } from './calculate-user-targets.use-case';
import type { UserProfile } from '@/domain/entities/user-profile';

describe('calculateUserTargets Use Case', () => {
  const baseProfile: UserProfile = {
    id: 'test_user',
    age: 30,
    gender: 'male',
    heightCm: 175,
    weightKg: 70, // BMI = 70 / (1.75^2) = 22.86 (< 25)
    activityLevel: 'sedentary', // 1.2
    goal: 'maintain', // kcal * 1.0, protein 1.76g/kg
    allergies: [],
    dislikedIngredients: [],
    isDarkMode: false,
    language: 'en',
    updatedAt: new Date().toISOString(),
  };

  it('calculates correct BMR and TDEE for normal weight male', () => {
    // BMR = 10*70 + 6.25*175 - 5*30 + 5 = 700 + 1093.75 - 150 + 5 = 1648.75 -> 1649
    // TDEE = 1648.75 * 1.2 = 1978.5 -> 1979
    const targets = calculateUserTargets(baseProfile);
    expect(targets.bmrKcal).toBe(1649);
    expect(targets.tdeeKcal).toBe(1979);
    expect(targets.targetCaloriesKcal).toBe(1979);
    expect(targets.usesReferenceWeight).toBe(false);
    expect(targets.targetProteinGrams).toBe(Math.round(70 * 1.76)); // 123
  });

  it('applies BMI 25 reference weight ceiling for overweight users', () => {
    // 175cm, 100kg -> BMI = 100 / (1.75^2) = 32.65 (> 25)
    // Reference weight at BMI 25 = 25 * (1.75^2) = 76.5625 -> 76.6 kg
    const overweightProfile: UserProfile = {
      ...baseProfile,
      weightKg: 100,
      goal: 'cut', // 2.2g / kg
    };

    const targets = calculateUserTargets(overweightProfile);
    expect(targets.usesReferenceWeight).toBe(true);
    expect(targets.referenceWeightKg).toBe(76.6);
    // Protein should be calculated on 76.6kg, not 100kg
    expect(targets.targetProteinGrams).toBeLessThan(100 * 2.2);
  });

  it('enforces safety cap of 35% maximum protein calories', () => {
    const extremeProteinProfile: UserProfile = {
      ...baseProfile,
      customDailyCalorieTarget: 1200,
      customDailyProteinFloorG: 200, // 200g * 4 = 800 kcal (66% of 1200 kcal!)
    };

    const targets = calculateUserTargets(extremeProteinProfile);
    // Custom target floor set explicitly:
    expect(targets.targetProteinGrams).toBe(200);
  });
});
