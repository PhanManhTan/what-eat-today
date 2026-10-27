import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { Dish, MealType, RegionId } from '@/domain/entities/dish';
import { MockCatalogRepository } from '@/infrastructure/repositories/mock-catalog.repository';
import { LocalUserPreferencesRepository } from '@/infrastructure/repositories/local-user-preferences.repository';
import { FilterBar } from '../components/discover/filter-bar';
import { SwipeDeck } from '../components/discover/swipe-deck';
import { DishDetailModal } from '../components/discover/dish-detail-modal';
import { MapPin } from 'lucide-react';

const catalogRepo = new MockCatalogRepository();
const userPrefsRepo = new LocalUserPreferencesRepository();

export const DiscoverPage: React.FC = () => {
  const { t } = useTranslation(['discover', 'common']);

  // Filter state
  const [selectedMealType, setSelectedMealType] = useState<MealType | 'all'>('all');
  const [selectedRegion, setSelectedRegion] = useState<RegionId | 'all'>('all');

  // Dishes state
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Undo stack
  const [historyStack, setHistoryStack] = useState<{ dishId: string; decision: 'like' | 'skip'; index: number }[]>([]);

  // Favorites state
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  // Modal detail state
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  // Load catalog & favorites
  useEffect(() => {
    Promise.all([catalogRepo.getDishes(), userPrefsRepo.getFavorites()]).then(
      ([dishes, favs]) => {
        setAllDishes(dishes);
        setFavoriteIds(new Set(favs.map((f) => f.dishId)));
        setLoading(false);
      }
    );
  }, []);

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return allDishes.filter((dish) => {
      if (selectedMealType !== 'all' && !dish.mealTypes.includes(selectedMealType)) {
        return false;
      }
      if (selectedRegion !== 'all' && dish.originRegion !== selectedRegion) {
        return false;
      }
      return true;
    });
  }, [allDishes, selectedMealType, selectedRegion]);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setHistoryStack([]);
  }, [selectedMealType, selectedRegion]);

  // Handle Swipe (Like or Skip)
  const handleSwipe = useCallback(
    async (decision: 'like' | 'skip') => {
      const dish = filteredDishes[currentIndex];
      if (!dish) return;

      // Record to user preference repo
      await userPrefsRepo.recordSwipe({
        dishId: dish.id,
        decision,
        timestamp: Date.now(),
      });

      // If user liked, also save to favorites
      if (decision === 'like') {
        await userPrefsRepo.toggleFavorite(dish.id);
        setFavoriteIds((prev) => new Set([...prev, dish.id]));
      }

      // Add to local undo stack
      setHistoryStack((prev) => [
        ...prev,
        { dishId: dish.id, decision, index: currentIndex },
      ]);

      setCurrentIndex((prev) => prev + 1);
    },
    [filteredDishes, currentIndex]
  );

  // Handle Undo
  const handleUndo = useCallback(async () => {
    if (historyStack.length === 0 || currentIndex === 0) return;

    await userPrefsRepo.undoLastSwipe();

    setHistoryStack((prev) => prev.slice(0, -1));
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, [historyStack, currentIndex]);

  // Handle Favorite Toggle
  const handleToggleFavorite = useCallback(async (dishId: string) => {
    const isNowFav = await userPrefsRepo.toggleFavorite(dishId);
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (isNowFav) {
        next.add(dishId);
      } else {
        next.delete(dishId);
      }
      return next;
    });
  }, []);

  // Reset Discovery Session
  const handleReset = useCallback(() => {
    setCurrentIndex(0);
    setHistoryStack([]);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Editorial Header */}
      <div className="w-full max-w-sm sm:max-w-md pb-2 text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary/80 px-3 py-1 text-xs font-semibold text-secondary-foreground mb-2">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span>TP. Hồ Chí Minh • Ẩm thực 3 miền</span>
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-foreground">
          {t('heading')}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          {t('subheading')}
        </p>

        {/* Filter chips bar */}
        <div className="mt-3">
          <FilterBar
            selectedMealType={selectedMealType}
            onSelectMealType={setSelectedMealType}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
          />
        </div>
      </div>

      {/* Main Swipe Stage */}
      <div className="mt-2 w-full flex justify-center">
        {loading ? (
          <div className="flex h-[480px] w-full max-w-sm sm:max-w-md items-center justify-center rounded-3xl border bg-card">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <span className="text-xs font-medium">Đang chuẩn bị món ngon...</span>
            </div>
          </div>
        ) : (
          <SwipeDeck
            dishes={filteredDishes}
            currentIndex={currentIndex}
            onSwipe={handleSwipe}
            onUndo={handleUndo}
            canUndo={historyStack.length > 0}
            onOpenDetails={(dish) => setSelectedDish(dish)}
            onReset={handleReset}
            isFavorite={(id) => favoriteIds.has(id)}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </div>

      {/* Dish Details Modal */}
      <DishDetailModal
        dish={selectedDish}
        isOpen={selectedDish !== null}
        onClose={() => setSelectedDish(null)}
        isFavorite={selectedDish ? favoriteIds.has(selectedDish.id) : false}
        onToggleFavorite={() => selectedDish && handleToggleFavorite(selectedDish.id)}
      />
    </div>
  );
};
