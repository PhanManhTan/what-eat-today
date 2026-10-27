import type { FavoriteDish, SwipeAction } from '../entities/swipe';

export interface IUserPreferencesRepository {
  getFavorites(): Promise<FavoriteDish[]>;
  isFavorite(dishId: string): Promise<boolean>;
  toggleFavorite(dishId: string): Promise<boolean>;
  removeFavorite(dishId: string): Promise<void>;

  getSwipeHistory(): Promise<SwipeAction[]>;
  recordSwipe(action: SwipeAction): Promise<void>;
  undoLastSwipe(): Promise<SwipeAction | null>;
  clearSwipeHistory(): Promise<void>;
}
