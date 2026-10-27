export type SwipeDirection = 'left' | 'right' | 'up' | 'down';

export type SwipeDecision = 'skip' | 'like';

export interface SwipeAction {
  dishId: string;
  decision: SwipeDecision;
  timestamp: number;
}

export interface FavoriteDish {
  dishId: string;
  savedAt: number;
  note?: string;
}
