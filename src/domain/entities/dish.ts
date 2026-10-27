import type { DishMedia, SupportedLocale } from './dish-media';

export type RegionId = 'north' | 'central' | 'south' | 'international';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'late-night';

export type DishCategory =
  | 'noodles'
  | 'rice'
  | 'baguette'
  | 'soup'
  | 'pancake-roll'
  | 'snack'
  | 'drinks'
  | 'dessert';

export interface PriceRange {
  min: number;
  max: number;
  currency: 'VND' | 'USD';
}

export interface Dish {
  id: string; // Stable identifier, e.g. "bun-bo-hue"
  slug: string;
  names: Record<SupportedLocale, string>;
  descriptions: Record<SupportedLocale, string>;
  originRegion: RegionId;
  cuisineId: string; // e.g. "hue", "saigon-street", "hanoi"
  categoryId: DishCategory;
  mealTypes: MealType[];
  primaryImage: DishMedia;
  gallery: DishMedia[];
  ingredients: string[];
  priceRange?: PriceRange;
  spicyLevel?: 0 | 1 | 2 | 3;
  tags: string[];
  isSignature?: boolean;
}

export interface DishFilter {
  regionId?: RegionId;
  mealType?: MealType;
  categoryId?: DishCategory;
  searchQuery?: string;
  maxBudget?: number;
}
