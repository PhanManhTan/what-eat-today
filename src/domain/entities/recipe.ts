import { z } from 'zod';
import { NutritionFactsSchema } from '../value-objects/nutrition-facts';

export const RecipeIngredientSchema = z.object({
  foodItemId: z.string().min(1),
  name: z.string().min(1),
  grams: z.number().positive(),
  unitLabel: z.string().default('g'),
  notes: z.string().optional(),
});

export type RecipeIngredient = z.infer<typeof RecipeIngredientSchema>;

export const RecipeSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().default(''),
  prepTimeMinutes: z.number().min(0).default(10),
  cookTimeMinutes: z.number().min(0).default(20),
  servings: z.number().int().positive().default(1),
  ingredients: z.array(RecipeIngredientSchema).default([]),
  instructions: z.array(z.string()).default([]),
  totalNutrition: NutritionFactsSchema,
  perServingNutrition: NutritionFactsSchema,
  tags: z.array(z.string()).default([]),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Recipe = z.infer<typeof RecipeSchema>;
