import type { FavoriteDish, SwipeAction } from '@/domain/entities/swipe';
import type { IUserPreferencesRepository } from '@/domain/repositories/user-preferences-repository.interface';

const FAVORITES_STORAGE_KEY = 'what_eat_today_favorites';
const SWIPE_HISTORY_STORAGE_KEY = 'what_eat_today_swipe_history';

export class LocalUserPreferencesRepository implements IUserPreferencesRepository {
  private getStoredFavorites(): FavoriteDish[] {
    try {
      const data = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveFavorites(favorites: FavoriteDish[]): void {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore write errors in restricted sandbox
    }
  }

  private getStoredHistory(): SwipeAction[] {
    try {
      const data = localStorage.getItem(SWIPE_HISTORY_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveHistory(history: SwipeAction[]): void {
    try {
      localStorage.setItem(SWIPE_HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch {
      // Ignore write errors in restricted sandbox
    }
  }

  async getFavorites(): Promise<FavoriteDish[]> {
    return this.getStoredFavorites();
  }

  async isFavorite(dishId: string): Promise<boolean> {
    const favorites = this.getStoredFavorites();
    return favorites.some((f) => f.dishId === dishId);
  }

  async toggleFavorite(dishId: string): Promise<boolean> {
    const favorites = this.getStoredFavorites();
    const existingIndex = favorites.findIndex((f) => f.dishId === dishId);

    if (existingIndex >= 0) {
      favorites.splice(existingIndex, 1);
      this.saveFavorites(favorites);
      return false; // Removed
    } else {
      favorites.push({
        dishId,
        savedAt: Date.now(),
      });
      this.saveFavorites(favorites);
      return true; // Added
    }
  }

  async removeFavorite(dishId: string): Promise<void> {
    const favorites = this.getStoredFavorites().filter((f) => f.dishId !== dishId);
    this.saveFavorites(favorites);
  }

  async getSwipeHistory(): Promise<SwipeAction[]> {
    return this.getStoredHistory();
  }

  async recordSwipe(action: SwipeAction): Promise<void> {
    const history = this.getStoredHistory();
    history.push(action);
    this.saveHistory(history);
  }

  async undoLastSwipe(): Promise<SwipeAction | null> {
    const history = this.getStoredHistory();
    if (history.length === 0) return null;
    const lastAction = history.pop();
    this.saveHistory(history);
    return lastAction ?? null;
  }

  async clearSwipeHistory(): Promise<void> {
    try {
      localStorage.removeItem(SWIPE_HISTORY_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
}
