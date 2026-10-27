import type { SupportedLocale } from '@/domain/entities/dish-media';

/**
 * Format currency according to the active locale.
 * Default for Vietnam is VND (e.g. 50.000 ₫).
 */
export function formatCurrency(
  amount: number,
  locale: SupportedLocale = 'vi-VN',
  currency: 'VND' | 'USD' = 'VND'
): string {
  try {
    const intlLocale = locale === 'vi-VN' ? 'vi-VN' : 'en-US';
    return new Intl.NumberFormat(intlLocale, {
      style: 'currency',
      currency,
      maximumFractionDigits: currency === 'VND' ? 0 : 2,
    }).format(amount);
  } catch {
    return `${amount.toLocaleString()} ${currency}`;
  }
}

/**
 * Format price range (e.g., "45.000 ₫ – 65.000 ₫")
 */
export function formatPriceRange(
  min: number,
  max: number,
  locale: SupportedLocale = 'vi-VN',
  currency: 'VND' | 'USD' = 'VND'
): string {
  return `${formatCurrency(min, locale, currency)} – ${formatCurrency(max, locale, currency)}`;
}

/**
 * Format distance in meters to a readable string (e.g. "450 m" or "2.3 km").
 */
export function formatDistance(
  meters: number,
  locale: SupportedLocale = 'vi-VN'
): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  const km = meters / 1000;
  const intlLocale = locale === 'vi-VN' ? 'vi-VN' : 'en-US';
  return `${new Intl.NumberFormat(intlLocale, { maximumFractionDigits: 1 }).format(km)} km`;
}
