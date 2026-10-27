import React from 'react';
import { useTranslation } from 'react-i18next';
import { RotateCcw, X, Heart, Info } from 'lucide-react';
import { Button } from '../ui/button';

interface SwipeControlsProps {
  onSkip: () => void;
  onLike: () => void;
  onUndo: () => void;
  onOpenDetails: () => void;
  canUndo: boolean;
  disabled?: boolean;
}

export const SwipeControls: React.FC<SwipeControlsProps> = ({
  onSkip,
  onLike,
  onUndo,
  onOpenDetails,
  canUndo,
  disabled = false,
}) => {
  const { t } = useTranslation('discover');

  return (
    <div className="flex flex-col items-center gap-3 pt-3">
      {/* Action buttons row */}
      <div className="flex items-center justify-center gap-4 sm:gap-6">
        {/* Undo button */}
        <Button
          variant="outline"
          size="icon"
          onClick={onUndo}
          disabled={!canUndo || disabled}
          aria-label={t('undo')}
          title={t('undo')}
          className="h-12 w-12 sm:h-13 sm:w-13 rounded-full border-muted-foreground/20 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-40 transition-transform active:scale-95 shadow-sm"
        >
          <RotateCcw className="h-5 w-5" />
        </Button>

        {/* Skip button (Left) */}
        <Button
          variant="outline"
          size="icon"
          onClick={onSkip}
          disabled={disabled}
          aria-label={t('skip')}
          title={t('skip')}
          className="h-16 w-16 sm:h-18 sm:w-18 rounded-full border-2 border-rose-300 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/40 hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          <X className="h-8 w-8 stroke-[2.5]" />
        </Button>

        {/* Dish Details button */}
        <Button
          variant="outline"
          size="icon"
          onClick={onOpenDetails}
          disabled={disabled}
          aria-label={t('details')}
          title={t('details')}
          className="h-12 w-12 sm:h-13 sm:w-13 rounded-full border-muted-foreground/20 text-muted-foreground hover:bg-muted hover:text-foreground transition-transform active:scale-95 shadow-sm"
        >
          <Info className="h-5 w-5" />
        </Button>

        {/* Like button (Right) */}
        <Button
          variant="default"
          size="icon"
          onClick={onLike}
          disabled={disabled}
          aria-label={t('like')}
          title={t('like')}
          className="h-16 w-16 sm:h-18 sm:w-18 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-primary/25"
        >
          <Heart className="h-8 w-8 fill-current stroke-[2]" />
        </Button>
      </div>

      {/* Keyboard hints for desktop */}
      <p className="hidden text-[11px] font-medium text-muted-foreground/80 md:block select-none">
        {t('keyboardHint')}
      </p>
    </div>
  );
};
