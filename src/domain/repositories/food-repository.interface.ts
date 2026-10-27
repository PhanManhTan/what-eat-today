import { FoodItem } from '../entities/food-item';

export interface IFoodRepository {
  getById(id: string): Promise<FoodItem | undefined>;
  listAll(): Promise<FoodItem[]>;
  searchByName(query: string): Promise<FoodItem[]>;
  save(item: FoodItem): Promise<void>;
  saveBatch(items: FoodItem[]): Promise<void>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}
