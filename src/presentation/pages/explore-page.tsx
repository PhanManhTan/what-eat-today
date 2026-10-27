import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Dish, RegionId, DishCategory } from '@/domain/entities/dish';
import type { SupportedLocale } from '@/domain/entities/dish-media';
import { MockCatalogRepository } from '@/infrastructure/repositories/mock-catalog.repository';
import { LocalUserPreferencesRepository } from '@/infrastructure/repositories/local-user-preferences.repository';
import { formatPriceRange } from '@/infrastructure/i18n/formatters';
import { Search, Compass, Heart } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { DishDetailModal } from '../components/discover/dish-detail-modal';

const catalogRepo = new MockCatalogRepository();
const userPrefsRepo = new LocalUserPreferencesRepository();

export const ExplorePage: React.FC = () => {
  const { t, i18n } = useTranslation(['discover', 'common', 'navigation']);
  const locale = (i18n.language.startsWith('vi') ? 'vi-VN' : 'en-US') as SupportedLocale;

  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<RegionId | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<DishCategory | 'all'>('all');

  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  useEffect(() => {
    Promise.all([
      catalogRepo.getDishes(),
      userPrefsRepo.getFavorites(),
    ]).then(([dishList, favs]) => {
      setDishes(dishList);
      setFavoriteIds(new Set(favs.map((f) => f.dishId)));
      setLoading(false);
    });
  }, []);

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      if (selectedRegion !== 'all' && dish.originRegion !== selectedRegion) {
        return false;
      }
      if (selectedCategory !== 'all' && dish.categoryId !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const viName = (dish.names['vi-VN'] || '').toLowerCase();
        const enName = (dish.names['en-US'] || '').toLowerCase();
        const tags = dish.tags.join(' ').toLowerCase();
        if (!viName.includes(q) && !enName.includes(q) && !tags.includes(q)) {
          return false;
        }
      }
      return true;
    });
  }, [dishes, selectedRegion, selectedCategory, searchQuery]);

  const handleToggleFavorite = async (dishId: string) => {
    const isNowFav = await userPrefsRepo.toggleFavorite(dishId);
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (isNowFav) next.add(dishId);
      else next.delete(dishId);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col gap-2 border-b pb-5">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Compass className="h-5 w-5" />
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t('explore', { ns: 'navigation' })}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {t('exploreDesc', { ns: 'navigation' })} — Bản đồ tinh hoa ẩm thực ba miền hội tụ tại Sài Gòn
        </p>

        {/* Search Bar */}
        <div className="relative mt-2 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm món, nguyên liệu, hương vị... (vd: phở bò, sườn nướng)"
            className="w-full rounded-xl border bg-card pl-10 pr-4 py-2 text-sm shadow-sm placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-muted-foreground">Khu vực:</span>
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'south', label: 'Miền Nam' },
            { id: 'central', label: 'Miền Trung' },
            { id: 'north', label: 'Miền Bắc' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedRegion(tab.id as RegionId | 'all')}
              className={`rounded-lg px-3 py-1 font-medium transition-colors ${
                selectedRegion === tab.id
                  ? 'bg-primary text-primary-foreground font-semibold shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-muted-foreground">Chuyên mục:</span>
          {[
            { id: 'all', label: 'Tất cả món' },
            { id: 'noodles', label: 'Bún & Phở' },
            { id: 'rice', label: 'Cơm' },
            { id: 'baguette', label: 'Bánh Mì' },
            { id: 'pancake-roll', label: 'Bánh & Cuốn' },
            { id: 'drinks', label: 'Đồ Uống' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as DishCategory | 'all')}
              className={`rounded-lg px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-secondary text-foreground font-semibold border border-primary/30'
                  : 'bg-transparent text-muted-foreground hover:bg-muted/50 border border-transparent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Grid */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : filteredDishes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-10 text-center bg-card">
          <Compass className="h-10 w-10 text-muted-foreground/40 mb-2" />
          <p className="text-sm font-semibold">Không tìm thấy món ăn phù hợp với từ khóa</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedRegion('all');
            }}
            className="mt-3 text-xs font-semibold text-primary hover:underline"
          >
            Đặt lại bộ tìm kiếm
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDishes.map((dish) => {
            const name = dish.names[locale] || dish.names['vi-VN'];
            const desc = dish.descriptions[locale] || dish.descriptions['vi-VN'];
            const isFav = favoriteIds.has(dish.id);

            return (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer"
              >
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  <img
                    src={dish.primaryImage.url}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute top-3 left-3">
                    <Badge className="bg-background/85 text-foreground backdrop-blur-md text-[11px] font-semibold">
                      {dish.originRegion === 'south'
                        ? 'Miền Nam'
                        : dish.originRegion === 'central'
                        ? 'Miền Trung'
                        : 'Miền Bắc'}
                    </Badge>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(dish.id);
                    }}
                    className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md transition-colors ${
                      isFav
                        ? 'bg-rose-500 text-white'
                        : 'bg-black/40 text-white hover:bg-black/60'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-display text-lg font-bold leading-tight">
                      {name}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between p-4 space-y-2.5">
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {desc}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t text-xs">
                    <span className="font-bold text-foreground">
                      {dish.priceRange
                        ? formatPriceRange(dish.priceRange.min, dish.priceRange.max, locale, dish.priceRange.currency)
                        : '~ 45.000 ₫'}
                    </span>
                    <span className="font-semibold text-primary group-hover:underline">
                      Xem chi tiết →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Dish Detail Modal */}
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
