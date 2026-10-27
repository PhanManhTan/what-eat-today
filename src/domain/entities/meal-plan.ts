import { z } from 'zod';
import { NutritionFactsSchema } from '../value-objects/nutrition-facts';

export const MealSlotSchema = z.enum(['breakfast', 'lunch', 'dinner', 'snack']);
export type MealSlot = z.infer<typeof MealSlotSchema>;

export const PlannedMealSchema = z.object({
  id: z.string().min(1),
  slot: MealSlotSchema,
  recipeId: z.string().optional(),
  title: z.string().min(1),
  servings: z.number().positive().default(1),
  nutrition: NutritionFactsSchema,
  isBatchLeftover: z.boolean().default(false),
  isDiningOut: z.boolean().default(false),
  notes: z.string().optional(),
});

export type PlannedMeal = z.infer<typeof PlannedMealSchema>;

export const MealPlanDaySchema = z.object({
  date: z.string(), // YYYY-MM-DD
  dayLabel: z.string(), // e.g. "Monday"
  meals: z.array(PlannedMealSchema).default([]),
  targetNutrition: NutritionFactsSchema.optional(),
  dayTotalNutrition: NutritionFactsSchema,
});

export type MealPlanDay = z.infer<typeof MealPlanDaySchema>;

export const WeeklyMealPlanSchema = z.object({
  id: z.string().min(1),
  weekStartDate: z.string(), // YYYY-MM-DD
  days: z.array(MealPlanDaySchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type WeeklyMealPlan = z.infer<typeof WeeklyMealPlanSchema>;
