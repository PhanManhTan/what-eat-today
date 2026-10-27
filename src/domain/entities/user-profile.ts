import { z } from 'zod';

export const GenderSchema = z.enum(['male', 'female']);
export type Gender = z.infer<typeof GenderSchema>;

export const ActivityLevelSchema = z.enum(['sedentary', 'light', 'moderate', 'very', 'athlete']);
export type ActivityLevel = z.infer<typeof ActivityLevelSchema>;

export const NutritionGoalSchema = z.enum(['cut', 'maintain', 'bulk']);
export type NutritionGoal = z.infer<typeof NutritionGoalSchema>;

export const UserProfileSchema = z.object({
  id: z.string().default('local_default_user'),
  age: z.number().int().min(10).max(120).default(30),
  gender: GenderSchema.default('male'),
  heightCm: z.number().positive().default(175),
  weightKg: z.number().positive().default(75),
  activityLevel: ActivityLevelSchema.default('sedentary'),
  goal: NutritionGoalSchema.default('maintain'),
  customDailyProteinFloorG: z.number().positive().optional(),
  customDailyCalorieTarget: z.number().positive().optional(),
  allergies: z.array(z.string()).default([]),
  dislikedIngredients: z.array(z.string()).default([]),
  isDarkMode: z.boolean().default(false),
  language: z.enum(['en', 'vi']).default('en'),
  updatedAt: z.string(),
});

export type UserProfile = z.infer<typeof UserProfileSchema>;
