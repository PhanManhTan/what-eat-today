export type SupportedLocale = 'vi-VN' | 'en-US';

export type MediaLicense =
  | 'CC0'
  | 'CC-BY'
  | 'CC-BY-SA'
  | 'Public Domain'
  | 'Original';

export interface DishMedia {
  id: string;
  storageKey: string;
  url: string;
  thumbnailUrl?: string;
  width?: number;
  height?: number;
  altText: Record<SupportedLocale, string>;
  license: MediaLicense;
  attribution: string;
}
