import { Recipe } from '../entities/recipe';

export interface IRecipeRepository {
  getById(id: string): Promise<Recipe | undefined>;
  listAll(): Promise<Recipe[]>;
  search(query: string): Promise<Recipe[]>;
  save(recipe: Recipe): Promise<void>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}
