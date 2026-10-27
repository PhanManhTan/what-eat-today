import { z } from 'zod';

export const NutritionFactsSchema = z.object({
  caloriesKcal: z.number().min(0),
  proteinGrams: z.number().min(0),
  fatGrams: z.number().min(0),
  carbsGrams: z.number().min(0),
  fiberGrams: z.number().min(0).optional(),
  sodiumMilligrams: z.number().min(0).optional(),
});

export type NutritionFacts = z.infer<typeof NutritionFactsSchema>;

/**
 * Pure function: Deterministically calculates nutritional yield for a given ingredient gram weight.
 * Nutrition facts in databases are stored per 100g of edible portion.
 */
export function calculateNutrientsForWeight(
  per100g: NutritionFacts,
  grams: number
): NutritionFacts {
  if (grams < 0) {
    throw new Error('Weight in grams cannot be negative.');
  }

  const factor = grams / 100;

  return {
    caloriesKcal: roundToTenth(per100g.caloriesKcal * factor),
    proteinGrams: roundToTenth(per100g.proteinGrams * factor),
    fatGrams: roundToTenth(per100g.fatGrams * factor),
    carbsGrams: roundToTenth(per100g.carbsGrams * factor),
    fiberGrams:
      per100g.fiberGrams !== undefined ? roundToTenth(per100g.fiberGrams * factor) : undefined,
    sodiumMilligrams:
      per100g.sodiumMilligrams !== undefined
        ? roundToTenth(per100g.sodiumMilligrams * factor)
        : undefined,
  };
}

/**
 * Pure function: Sums multiple nutrition facts objects together deterministically.
 */
export function sumNutritionFacts(list: readonly NutritionFacts[]): NutritionFacts {
  return list.reduce(
    (acc, curr) => ({
      caloriesKcal: roundToTenth(acc.caloriesKcal + curr.caloriesKcal),
      proteinGrams: roundToTenth(acc.proteinGrams + curr.proteinGrams),
      fatGrams: roundToTenth(acc.fatGrams + curr.fatGrams),
      carbsGrams: roundToTenth(acc.carbsGrams + curr.carbsGrams),
      fiberGrams:
        acc.fiberGrams !== undefined || curr.fiberGrams !== undefined
          ? roundToTenth((acc.fiberGrams ?? 0) + (curr.fiberGrams ?? 0))
          : undefined,
      sodiumMilligrams:
        acc.sodiumMilligrams !== undefined || curr.sodiumMilligrams !== undefined
          ? roundToTenth((acc.sodiumMilligrams ?? 0) + (curr.sodiumMilligrams ?? 0))
          : undefined,
    }),
    {
      caloriesKcal: 0,
      proteinGrams: 0,
      fatGrams: 0,
      carbsGrams: 0,
      fiberGrams: 0,
      sodiumMilligrams: 0,
    }
  );
}

export function roundToTenth(value: number): number {
  return Math.round(value * 10) / 10;
}
