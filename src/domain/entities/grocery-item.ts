import { z } from 'zod';
import { AisleCategorySchema } from './food-item';

export const GroceryItemSchema = z.object({
  id: z.string().min(1),
  foodItemId: z.string().optional(),
  name: z.string().min(1),
  aisle: AisleCategorySchema.default('other'),
  neededGrams: z.number().positive(),
  packSizeGrams: z.number().positive().optional(),
  packsToBuy: z.number().int().nonnegative().default(1),
  estimatedUnitPrice: z.number().nonnegative().optional(),
  isChecked: z.boolean().default(false),
  planId: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GroceryItem = z.infer<typeof GroceryItemSchema>;
