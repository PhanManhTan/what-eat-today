import { z } from 'zod';
import { NutritionFactsSchema } from '../value-objects/nutrition-facts';
import { DataProvenanceSchema } from '../value-objects/provenance';

export const AisleCategorySchema = z.enum([
  'produce',
  'meat_poultry',
  'seafood',
  'dairy_eggs',
  'pantry_grains',
  'canned_goods',
  'condiments_spices',
  'bakery',
  'frozen',
  'beverages',
  'other',
]);

export type AisleCategory = z.infer<typeof AisleCategorySchema>;

export const FoodItemSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  localName: z.string().optional(),
  category: z.string().default('General'),
  aisle: AisleCategorySchema.default('other'),
  per100g: NutritionFactsSchema,
  defaultServingGrams: z.number().positive().default(100),
  provenance: DataProvenanceSchema,
  isUserCustom: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type FoodItem = z.infer<typeof FoodItemSchema>;
