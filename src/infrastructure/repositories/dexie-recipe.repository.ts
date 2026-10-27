import { db } from '../db/dexie-db';
import type { IRecipeRepository } from '@/domain/repositories/recipe-repository.interface';
import type { Recipe } from '@/domain/entities/recipe';

export class DexieRecipeRepository implements IRecipeRepository {
  async getById(id: string): Promise<Recipe | undefined> {
    return await db.recipes.get(id);
  }

  async listAll(): Promise<Recipe[]> {
    return await db.recipes.toArray();
  }

  async search(query: string): Promise<Recipe[]> {
    const q = query.trim().toLowerCase();
    if (!q) return await this.listAll();
    return await db.recipes
      .filter(
        (r) => r.title.toLowerCase().includes(q) || r.tags.some((t) => t.toLowerCase().includes(q))
      )
      .toArray();
  }

  async save(recipe: Recipe): Promise<void> {
    await db.recipes.put(recipe);
  }

  async delete(id: string): Promise<void> {
    await db.recipes.delete(id);
  }

  async count(): Promise<number> {
    return await db.recipes.count();
  }
}
