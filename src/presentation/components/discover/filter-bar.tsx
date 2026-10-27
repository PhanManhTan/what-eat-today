import React from 'react';
import { useTranslation } from 'react-i18next';
import type { MealType, RegionId } from '@/domain/entities/dish';

interface FilterBarProps {
  selectedMealType: MealType | 'all';
  onSelectMealType: (meal: MealType | 'all') => void;
  selectedRegion: RegionId | 'all';
  onSelectRegion: (region: RegionId | 'all') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedMealType,
  onSelectMealType,
  selectedRegion,
  onSelectRegion,
}) => {
  const { t } = useTranslation('discover');

  const mealOptions: { id: MealType | 'all'; label: string }[] = [
    { id: 'all', label: t('mealAll', { defaultValue: 'Tất cả bữa' }) },
    { id: 'breakfast', label: t('mealBreakfast') },
    { id: 'lunch', label: t('mealLunch') },
    { id: 'dinner', label: t('mealDinner') },
    { id: 'snack', label: t('mealSnack') },
  ];

  const regionOptions: { id: RegionId | 'all'; label: string }[] = [
    { id: 'all', label: t('regionAll') },
    { id: 'south', label: t('regionSouth') },
    { id: 'central', label: t('regionCentral') },
    { id: 'north', label: t('regionNorth') },
  ];

  return (
    <div className="flex flex-col gap-2.5 py-1">
      {/* Meal type filter chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
        <span className="font-semibold text-muted-foreground whitespace-nowrap pr-1">
          {t('filterMealType')}:
        </span>
        {mealOptions.map((opt) => {
          const isSelected = selectedMealType === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelectMealType(opt.id)}
              className={`rounded-full px-3 py-1 font-medium transition-all duration-150 whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Region filter chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
        <span className="font-semibold text-muted-foreground whitespace-nowrap pr-1">
          {t('filterRegion')}:
        </span>
        {regionOptions.map((opt) => {
          const isSelected = selectedRegion === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelectRegion(opt.id)}
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-all duration-150 whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-secondary text-foreground font-semibold border border-primary/30'
                  : 'bg-transparent text-muted-foreground hover:bg-muted/50 border border-transparent'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
