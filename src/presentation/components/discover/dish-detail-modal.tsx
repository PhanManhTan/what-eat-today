import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Dish } from '@/domain/entities/dish';
import type { SupportedLocale } from '@/domain/entities/dish-media';
import { formatPriceRange } from '@/infrastructure/i18n/formatters';
import {
  X,
  MapPin,
  Heart,
  Flame,
  ExternalLink,
  ChefHat,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface DishDetailModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
}) => {
  const { t, i18n } = useTranslation(['discover', 'common']);

  if (!isOpen || !dish) return null;

  const locale = (i18n.language.startsWith('vi') ? 'vi-VN' : 'en-US') as SupportedLocale;
  const dishName = dish.names[locale] || dish.names['vi-VN'];
  const dishDesc = dish.descriptions[locale] || dish.descriptions['vi-VN'];

  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${dish.names['vi-VN']} TP Hồ Chí Minh`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dish-modal-title"
    >
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border bg-card shadow-2xl transition-all">
        {/* Modal Image Header */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-muted">
          <img
            src={dish.primaryImage.url}
            alt={dish.primaryImage.altText[locale] || dishName}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60"
            aria-label={t('close', { ns: 'common' })}
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Favorite button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleFavorite}
            className={`absolute top-3 left-3 h-9 w-9 rounded-full backdrop-blur-md transition-colors ${
              isFavorite
                ? 'bg-rose-500 text-white hover:bg-rose-600'
                : 'bg-black/40 text-white hover:bg-black/60'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </Button>

          {/* Title overlay */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <Badge variant="default" className="bg-primary/90 text-white text-[11px] font-semibold">
                {dish.originRegion === 'south'
                  ? 'Miền Nam'
                  : dish.originRegion === 'central'
                  ? 'Miền Trung'
                  : 'Miền Bắc'}
              </Badge>
              {dish.isSignature && (
                <Badge variant="outline" className="border-amber-400 text-amber-300 text-[11px]">
                  ⭐ Món Đặc Trưng
                </Badge>
              )}
            </div>
            <h2 id="dish-modal-title" className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              {dishName}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Price & Spiciness row */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-muted/50 border">
            <div>
              <span className="text-xs text-muted-foreground block">{t('priceEstimate')}:</span>
              <span className="text-base font-bold text-foreground">
                {dish.priceRange
                  ? formatPriceRange(dish.priceRange.min, dish.priceRange.max, locale, dish.priceRange.currency)
                  : 'Giá tham khảo tùy quán'}
              </span>
            </div>

            {dish.spicyLevel !== undefined && (
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <span className="text-muted-foreground">{t('spicyLevel')}:</span>
                <span className="flex items-center text-chili font-semibold">
                  {dish.spicyLevel === 0 ? (
                    t('notSpicy')
                  ) : (
                    <>
                      {Array.from({ length: dish.spicyLevel }).map((_, i) => (
                        <Flame key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                      <span className="ml-1">
                        {dish.spicyLevel === 1 ? t('mildSpicy') : t('hotSpicy')}
                      </span>
                    </>
                  )}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-1.5">
              {t('origin')}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {dishDesc}
            </p>
          </div>

          {/* Key ingredients */}
          {dish.ingredients.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-foreground uppercase tracking-wider mb-2">
                <ChefHat className="h-4 w-4 text-primary" />
                <span>{t('ingredients')}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {dish.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-secondary/80 px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {dish.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
              {dish.tags.map((tag, idx) => (
                <span key={idx} className="text-xs text-muted-foreground">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* External Google Maps Discovery Action */}
          <div className="pt-2 border-t">
            <a
              href={googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block"
            >
              <Button className="w-full gap-2 py-5 text-sm font-bold shadow-md hover:shadow-lg transition-shadow">
                <MapPin className="h-4 w-4" />
                <span>{t('nearbyRestaurants')} (Google Maps)</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </Button>
            </a>
            <p className="mt-2 text-center text-[11px] text-muted-foreground flex items-center justify-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-600" />
              <span>Liên kết ngoài miễn phí, không thu thập tọa độ người dùng</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
