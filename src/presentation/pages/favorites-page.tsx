import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { Dish } from '@/domain/entities/dish';
import type { SupportedLocale } from '@/domain/entities/dish-media';
import { MockCatalogRepository } from '@/infrastructure/repositories/mock-catalog.repository';
import { LocalUserPreferencesRepository } from '@/infrastructure/repositories/local-user-preferences.repository';
import { formatPriceRange } from '@/infrastructure/i18n/formatters';
import { Heart, MapPin, Trash2, ExternalLink, Sparkles, Utensils } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { DishDetailModal } from '../components/discover/dish-detail-modal';

const catalogRepo = new MockCatalogRepository();
const userPrefsRepo = new LocalUserPreferencesRepository();

export const FavoritesPage: React.FC = () => {
  const { t, i18n } = useTranslation(['discover', 'common', 'navigation']);
  const locale = (i18n.language.startsWith('vi') ? 'vi-VN' : 'en-US') as SupportedLocale;

  const [favorites, setFavorites] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

  const loadFavorites = async () => {
    setLoading(true);
    const [allDishes, favItems] = await Promise.all([
      catalogRepo.getDishes(),
      userPrefsRepo.getFavorites(),
    ]);

    const favSet = new Set(favItems.map((f) => f.dishId));
    const matched = allDishes.filter((d) => favSet.has(d.id));
    setFavorites(matched);
    setLoading(false);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = async (e: React.MouseEvent, dishId: string) => {
    e.stopPropagation();
    await userPrefsRepo.removeFavorite(dishId);
    setFavorites((prev) => prev.filter((d) => d.id !== dishId));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-3 border-b pb-5 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
              <Heart className="h-5 w-5 fill-current" />
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t('favorites', { ns: 'navigation' })}
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
            {t('favoritesDesc', { ns: 'navigation' })} — Lưu trữ an toàn trên thiết bị của bạn
          </p>
        </div>

        <Link to="/">
          <Button className="gap-2 self-start sm:self-auto font-semibold">
            <Sparkles className="h-4 w-4" />
            <span>Tiếp tục vuốt món</span>
          </Button>
        </Link>
      </div>

      {/* Grid of Favorite Dishes */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <span className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-12 text-center bg-card/50">
          <Utensils className="h-12 w-12 text-muted-foreground/40 mb-3" />
          <h3 className="font-display text-lg font-bold">Chưa có món ăn yêu thích nào</h3>
          <p className="mt-1 text-xs text-muted-foreground max-w-sm">
            Hãy vuốt phải các món bạn thèm ở màn hình Khám phá để lưu lại danh sách quán ngon nhé!
          </p>
          <Link to="/" className="mt-5">
            <Button className="gap-2 font-bold shadow-md">
              <Sparkles className="h-4 w-4" /> Khám phá món ngon ngay
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((dish) => {
            const name = dish.names[locale] || dish.names['vi-VN'];
            const desc = dish.descriptions[locale] || dish.descriptions['vi-VN'];
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${dish.names['vi-VN']} TP Hồ Chí Minh`
            )}`;

            return (
              <div
                key={dish.id}
                onClick={() => setSelectedDish(dish)}
                className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <img
                    src={dish.primaryImage.url}
                    alt={name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  {/* Region badge */}
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-background/85 text-foreground backdrop-blur-md text-[11px] font-semibold">
                      {dish.originRegion === 'south'
                        ? 'Miền Nam'
                        : dish.originRegion === 'central'
                        ? 'Miền Trung'
                        : 'Miền Bắc'}
                    </Badge>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={(e) => handleRemove(e, dish.id)}
                    className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-rose-600 hover:text-white"
                    title="Xóa khỏi yêu thích"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>

                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-display text-lg font-bold leading-tight">
                      {name}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {desc}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t text-xs">
                    <span className="font-bold text-foreground">
                      {dish.priceRange
                        ? formatPriceRange(dish.priceRange.min, dish.priceRange.max, locale, dish.priceRange.currency)
                        : '~ 45.000 ₫'}
                    </span>

                    <a
                      href={googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                      <span>Tìm quán</span>
                      <ExternalLink className="h-3 w-3 opacity-70" />
                    </a>
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
        isFavorite={selectedDish ? true : false}
        onToggleFavorite={async () => {
          if (selectedDish) {
            await userPrefsRepo.removeFavorite(selectedDish.id);
            setFavorites((prev) => prev.filter((d) => d.id !== selectedDish.id));
            setSelectedDish(null);
          }
        }}
      />
    </div>
  );
};
