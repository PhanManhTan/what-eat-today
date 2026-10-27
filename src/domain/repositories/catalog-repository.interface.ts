import type { Dish, DishFilter } from '../entities/dish';

export interface RegionMetadata {
  id: string;
  names: Record<string, string>;
  description?: Record<string, string>;
}

export interface CategoryMetadata {
  id: string;
  names: Record<string, string>;
  iconName?: string;
}

export interface ICatalogRepository {
  getDishes(filter?: DishFilter): Promise<Dish[]>;
  getDishById(id: string): Promise<Dish | null>;
  getDishBySlug(slug: string): Promise<Dish | null>;
  getFeaturedDishes(): Promise<Dish[]>;
  getCategories(): Promise<CategoryMetadata[]>;
  getRegions(): Promise<RegionMetadata[]>;
}
