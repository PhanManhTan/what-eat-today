import { db } from '../db/dexie-db';
import type { IFoodRepository } from '@/domain/repositories/food-repository.interface';
import type { FoodItem } from '@/domain/entities/food-item';

export class DexieFoodRepository implements IFoodRepository {
  async getById(id: string): Promise<FoodItem | undefined> {
    return await db.foods.get(id);
  }

  async listAll(): Promise<FoodItem[]> {
    return await db.foods.toArray();
  }

  async searchByName(query: string): Promise<FoodItem[]> {
    const q = query.trim().toLowerCase();
    if (!q) return await this.listAll();
    return await db.foods
      .filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.localName?.toLowerCase().includes(q) ?? false)
      )
      .toArray();
  }

  async save(item: FoodItem): Promise<void> {
    await db.foods.put(item);
  }

  async saveBatch(items: FoodItem[]): Promise<void> {
    await db.foods.bulkPut(items);
  }

  async delete(id: string): Promise<void> {
    await db.foods.delete(id);
  }

  async count(): Promise<number> {
    return await db.foods.count();
  }
}
