import { WeeklyMealPlan } from '../entities/meal-plan';

export interface IMealPlanRepository {
  getCurrentWeekPlan(weekStartDate: string): Promise<WeeklyMealPlan | undefined>;
  saveWeekPlan(plan: WeeklyMealPlan): Promise<void>;
  listAll(): Promise<WeeklyMealPlan[]>;
  delete(id: string): Promise<void>;
}
