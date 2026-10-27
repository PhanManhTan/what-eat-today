import { db } from '../db/dexie-db';
import type { IMealPlanRepository } from '@/domain/repositories/meal-plan-repository.interface';
import type { WeeklyMealPlan } from '@/domain/entities/meal-plan';

export class DexieMealPlanRepository implements IMealPlanRepository {
  async getCurrentWeekPlan(weekStartDate: string): Promise<WeeklyMealPlan | undefined> {
    return await db.mealPlans.where('weekStartDate').equals(weekStartDate).first();
  }

  async saveWeekPlan(plan: WeeklyMealPlan): Promise<void> {
    await db.mealPlans.put(plan);
  }

  async listAll(): Promise<WeeklyMealPlan[]> {
    return await db.mealPlans.toArray();
  }

  async delete(id: string): Promise<void> {
    await db.mealPlans.delete(id);
  }
}
