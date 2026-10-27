import React, { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { Dish } from '@/domain/entities/dish';
import { SwipeCard } from './swipe-card';
import { SwipeControls } from './swipe-controls';
import { Sparkles, Heart, RotateCcw, Utensils } from 'lucide-react';
import { Button } from '../ui/button';

interface SwipeDeckProps {
  dishes: Dish[];
  currentIndex: number;
  onSwipe: (decision: 'like' | 'skip') => void;
  onUndo: () => void;
  canUndo: boolean;
  onOpenDetails: (dish: Dish) => void;
  onReset: () => void;
  isFavorite: (dishId: string) => boolean;
  onToggleFavorite: (dishId: string) => void;
}

export const SwipeDeck: React.FC<SwipeDeckProps> = ({
  dishes,
  currentIndex,
  onSwipe,
  onUndo,
  canUndo,
  onOpenDetails,
  onReset,
  isFavorite,
  onToggleFavorite,
}) => {
  const { t } = useTranslation('discover');

  const currentDish = dishes[currentIndex] ?? null;
  const nextDish = dishes[currentIndex + 1] ?? null;
  const isFinished = currentIndex >= dishes.length;

  // Global keyboard listeners
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't trigger if inside an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (isFinished) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onSwipe('skip');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onSwipe('like');
      } else if (e.key === ' ' && currentDish) {
        e.preventDefault();
        onOpenDetails(currentDish);
      } else if ((e.key === 'z' || e.key === 'Z') && canUndo) {
        e.preventDefault();
        onUndo();
      }
    },
    [isFinished, currentDish, onSwipe, onOpenDetails, onUndo, canUndo]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (dishes.length === 0) {
    return (
      <div className="flex h-[480px] w-full max-w-sm sm:max-w-md flex-col items-center justify-center rounded-3xl border border-dashed p-8 text-center bg-card">
        <Utensils className="h-12 w-12 text-muted-foreground/40 mb-3" />
        <h3 className="font-display text-lg font-bold">Không tìm thấy món ăn phù hợp</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Hãy thử đổi bộ lọc bữa ăn hoặc vùng miền khác xem sao nhé!
        </p>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="flex h-[480px] w-full max-w-sm sm:max-w-md flex-col items-center justify-center rounded-3xl border bg-card p-6 text-center shadow-card animate-in fade-in zoom-in-95 duration-200">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
          <Sparkles className="h-8 w-8" />
        </span>
        <h3 className="font-display text-2xl font-bold text-foreground">
          {t('emptyDeckTitle')}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {t('emptyDeckDesc')}
        </p>

        <div className="mt-6 flex flex-col w-full gap-2.5">
          <Button onClick={onReset} className="w-full gap-2 py-5 font-bold shadow-md">
            <RotateCcw className="h-4 w-4" />
            <span>{t('resetDeck')}</span>
          </Button>

          <Link to="/favorites" className="w-full">
            <Button variant="outline" className="w-full gap-2 py-5 font-semibold">
              <Heart className="h-4 w-4 text-rose-500 fill-current" />
              <span>{t('viewFavorites')}</span>
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-sm sm:max-w-md">
      {/* Card Stage Container */}
      <div className="relative h-[480px] sm:h-[530px] w-full">
        {/* Next card beneath (preview) */}
        {nextDish && (
          <SwipeCard
            key={nextDish.id}
            dish={nextDish}
            isFront={false}
            onSwipe={onSwipe}
            onOpenDetails={() => onOpenDetails(nextDish)}
            isFavorite={isFavorite(nextDish.id)}
            onToggleFavorite={(e) => {
              e.stopPropagation();
              onToggleFavorite(nextDish.id);
            }}
          />
        )}

        {/* Current top card */}
        {currentDish && (
          <SwipeCard
            key={currentDish.id}
            dish={currentDish}
            isFront={true}
            onSwipe={onSwipe}
            onOpenDetails={() => onOpenDetails(currentDish)}
            isFavorite={isFavorite(currentDish.id)}
            onToggleFavorite={(e) => {
              e.stopPropagation();
              onToggleFavorite(currentDish.id);
            }}
          />
        )}
      </div>

      {/* Swipe Physical Controls */}
      <SwipeControls
        onSkip={() => onSwipe('skip')}
        onLike={() => onSwipe('like')}
        onUndo={onUndo}
        onOpenDetails={() => currentDish && onOpenDetails(currentDish)}
        canUndo={canUndo}
        disabled={isFinished}
      />
    </div>
  );
};
