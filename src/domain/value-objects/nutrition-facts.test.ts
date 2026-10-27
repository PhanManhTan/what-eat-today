import { describe, it, expect } from 'vitest';
import {
  calculateNutrientsForWeight,
  sumNutritionFacts,
  roundToTenth,
  type NutritionFacts,
} from '@/domain/value-objects/nutrition-facts';

describe('NutritionFacts Deterministic Math', () => {
  const chickenBreastPer100g: NutritionFacts = {
    caloriesKcal: 165,
    proteinGrams: 31,
    fatGrams: 3.6,
    carbsGrams: 0,
  };

  it('correctly calculates nutrients for 200g of chicken breast', () => {
    const result = calculateNutrientsForWeight(chickenBreastPer100g, 200);
    expect(result.caloriesKcal).toBe(330);
    expect(result.proteinGrams).toBe(62);
    expect(result.fatGrams).toBe(7.2);
    expect(result.carbsGrams).toBe(0);
  });

  it('correctly calculates nutrients for 150g with fractional rounding', () => {
    const result = calculateNutrientsForWeight(chickenBreastPer100g, 150);
    expect(result.caloriesKcal).toBe(247.5);
    expect(result.proteinGrams).toBe(46.5);
    expect(result.fatGrams).toBe(5.4);
    expect(result.carbsGrams).toBe(0);
  });

  it('throws an error if weight is negative', () => {
    expect(() => calculateNutrientsForWeight(chickenBreastPer100g, -10)).toThrow(
      'Weight in grams cannot be negative.'
    );
  });

  it('deterministically sums multiple nutrition items', () => {
    const items: NutritionFacts[] = [
      { caloriesKcal: 100, proteinGrams: 10, fatGrams: 2, carbsGrams: 10 },
      { caloriesKcal: 250, proteinGrams: 20.5, fatGrams: 5.2, carbsGrams: 30 },
      { caloriesKcal: 80, proteinGrams: 1.2, fatGrams: 0.1, carbsGrams: 18.3 },
    ];

    const total = sumNutritionFacts(items);
    expect(total.caloriesKcal).toBe(430);
    expect(total.proteinGrams).toBe(31.7);
    expect(total.fatGrams).toBe(7.3);
    expect(total.carbsGrams).toBe(58.3);
  });

  it('rounds numbers to the nearest tenth correctly', () => {
    expect(roundToTenth(10.14)).toBe(10.1);
    expect(roundToTenth(10.16)).toBe(10.2);
    expect(roundToTenth(10.15)).toBe(10.2);
  });
});
