import Dexie, { type EntityTable } from 'dexie';
import { CURRENT_DATABASE_SCHEMA_VERSION, DATABASE_NAME } from './schema-version';
import type { FoodItem } from '@/domain/entities/food-item';
import type { Recipe } from '@/domain/entities/recipe';
import type { WeeklyMealPlan } from '@/domain/entities/meal-plan';
import type { GroceryItem } from '@/domain/entities/grocery-item';
import type { UserProfile } from '@/domain/entities/user-profile';

export class WhatEatTodayDatabase extends Dexie {
  foods!: EntityTable<FoodItem, 'id'>;
  recipes!: EntityTable<Recipe, 'id'>;
  mealPlans!: EntityTable<WeeklyMealPlan, 'id'>;
  groceryItems!: EntityTable<GroceryItem, 'id'>;
  userProfile!: EntityTable<UserProfile, 'id'>;

  constructor() {
    super(DATABASE_NAME);

    // Version 1 of IndexedDB Schema
    this.version(CURRENT_DATABASE_SCHEMA_VERSION).stores({
      foods: 'id, name, category, aisle, isUserCustom',
      recipes: 'id, title, createdAt',
      mealPlans: 'id, weekStartDate, createdAt',
      groceryItems: 'id, planId, aisle, isChecked',
      userProfile: 'id',
    });
  }
}

export const db = new WhatEatTodayDatabase();
