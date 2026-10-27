import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { Dish } from '@/domain/entities/dish';
import type { SupportedLocale } from '@/domain/entities/dish-media';
import { formatPriceRange } from '@/infrastructure/i18n/formatters';
import { Flame, Heart, Info } from 'lucide-react';
import { Badge } from '../ui/badge';

interface SwipeCardProps {
  dish: Dish;
  isFront: boolean;
  onSwipe: (decision: 'like' | 'skip') => void;
  onOpenDetails: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  dish,
  isFront,
  onSwipe,
  onOpenDetails,
  isFavorite,
  onToggleFavorite,
}) => {
  const { t, i18n } = useTranslation(['discover', 'common']);
  const cardRef = useRef<HTMLDivElement>(null);

  // Dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  const locale = (i18n.language.startsWith('vi') ? 'vi-VN' : 'en-US') as SupportedLocale;
  const isVi = locale === 'vi-VN';

  const primaryName = dish.names[locale] || dish.names['vi-VN'];
  const secondaryName = isVi ? dish.names['en-US'] : dish.names['vi-VN'];
  const description = dish.descriptions[locale] || dish.descriptions['vi-VN'];

  const SWIPE_THRESHOLD = 110; // Pixels to trigger swipe

  // Pointer event handlers for touch and mouse
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isFront) return;
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !isFront) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;

    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
      hasMovedRef.current = true;
    }

    setDragOffset({ x: dx, y: dy * 0.3 }); // Dampen vertical movement
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || !isFront) return;
    setIsDragging(false);

    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    // Check if threshold reached
    if (dragOffset.x > SWIPE_THRESHOLD) {
      onSwipe('like');
    } else if (dragOffset.x < -SWIPE_THRESHOLD) {
      onSwipe('skip');
    } else {
      // Snap back to center
      setDragOffset({ x: 0, y: 0 });
      // If user tapped without dragging, open details
      if (!hasMovedRef.current) {
        onOpenDetails();
      }
    }
  };

  // Reset offset if front changes
  useEffect(() => {
    if (!isFront) {
      setDragOffset({ x: 0, y: 0 });
      setIsDragging(false);
    }
  }, [isFront]);

  // Compute rotation & opacity based on drag
  const rotation = isFront ? (dragOffset.x / SWIPE_THRESHOLD) * 12 : 0;
  const likeOpacity = isFront ? Math.min(Math.max(dragOffset.x / SWIPE_THRESHOLD, 0), 1) : 0;
  const skipOpacity = isFront ? Math.min(Math.max(-dragOffset.x / SWIPE_THRESHOLD, 0), 1) : 0;

  const cardStyle: React.CSSProperties = isFront
    ? {
        transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0) rotate(${rotation}deg)`,
        transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
        cursor: isDragging ? 'grabbing' : 'grab',
      }
    : {
        transform: 'scale(0.96) translateY(12px)',
        pointerEvents: 'none',
        opacity: 0.85,
      };

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={cardStyle}
      className={`absolute inset-0 select-none overflow-hidden rounded-3xl border bg-card shadow-card will-change-transform touch-action-pan-y ${
        isFront ? 'z-20 hover:shadow-card-hover' : 'z-10'
      }`}
    >
      {/* Background Food Photography */}
      <div className="relative h-full w-full bg-muted">
        <img
          src={dish.primaryImage.url}
          alt={dish.primaryImage.altText[locale] || primaryName}
          className="h-full w-full object-cover pointer-events-none"
          loading="eager"
        />

        {/* Ambient Dark Gradient Overlays for readable editorial text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10" />

        {/* Top Badges & Actions */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <Badge className="bg-background/85 text-foreground backdrop-blur-md border shadow-sm text-xs font-semibold px-2.5 py-0.5">
              {dish.originRegion === 'south'
                ? 'Miền Nam'
                : dish.originRegion === 'central'
                ? 'Miền Trung'
                : 'Miền Bắc'}
            </Badge>
            {dish.isSignature && (
              <Badge className="bg-accent/90 text-white backdrop-blur-md text-[11px] font-semibold px-2">
                ⭐ Nổi bật
              </Badge>
            )}
          </div>

          {/* Favorite toggle on card */}
          <button
            onClick={onToggleFavorite}
            className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-transform active:scale-90 ${
              isFavorite
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-black/40 text-white hover:bg-black/60'
            }`}
            aria-label={isFavorite ? 'Saved to favorites' : 'Save to favorites'}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Like Stamp Indicator (Green/Primary on drag right) */}
        {likeOpacity > 0.05 && (
          <div
            style={{ opacity: likeOpacity }}
            className="absolute top-16 left-6 z-30 rounded-2xl border-4 border-emerald-400 bg-emerald-500/80 px-4 py-2 font-display text-2xl font-black uppercase tracking-wider text-white shadow-xl rotate-[-14deg] pointer-events-none"
          >
            {t('like')}
          </div>
        )}

        {/* Skip Stamp Indicator (Rose on drag left) */}
        {skipOpacity > 0.05 && (
          <div
            style={{ opacity: skipOpacity }}
            className="absolute top-16 right-6 z-30 rounded-2xl border-4 border-rose-400 bg-rose-500/80 px-4 py-2 font-display text-2xl font-black uppercase tracking-wider text-white shadow-xl rotate-[14deg] pointer-events-none"
          >
            {t('skip')}
          </div>
        )}

        {/* Bottom Editorial Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white z-10">
          {/* Price & Spiciness row */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="rounded-lg bg-black/50 backdrop-blur-md px-2.5 py-1 text-xs font-bold text-amber-300">
              {dish.priceRange
                ? formatPriceRange(dish.priceRange.min, dish.priceRange.max, locale, dish.priceRange.currency)
                : '~ 45.000 ₫'}
            </span>

            {dish.spicyLevel !== undefined && dish.spicyLevel > 0 && (
              <span className="flex items-center gap-1 rounded-lg bg-black/50 backdrop-blur-md px-2 py-1 text-xs text-chili font-semibold">
                <Flame className="h-3.5 w-3.5 fill-current" />
                <span>{dish.spicyLevel === 1 ? 'Cay vừa' : 'Cay nồng'}</span>
              </span>
            )}
          </div>

          {/* Dish Title */}
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight drop-shadow-sm">
            {primaryName}
          </h2>

          {/* Secondary Subtitle */}
          {secondaryName && secondaryName !== primaryName && (
            <p className="text-xs sm:text-sm font-medium text-white/80 italic mt-0.5">
              {secondaryName}
            </p>
          )}

          {/* Description Snippet */}
          <p className="mt-2 text-xs sm:text-sm text-white/90 line-clamp-2 leading-relaxed">
            {description}
          </p>

          {/* Tap hint */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-white/60 border-t border-white/10 pt-2.5">
            <span className="flex items-center gap-1">
              <Info className="h-3 w-3" />
              <span>Chạm thẻ để xem quán ngon & công thức</span>
            </span>
            <span className="font-semibold text-white/80">TP. Hồ Chí Minh</span>
          </div>
        </div>
      </div>
    </div>
  );
};
