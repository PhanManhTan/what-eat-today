import { describe, it, expect } from 'vitest';
import { removeVietnameseTones, matchesDiacriticInsensitive } from './string-utils';

describe('removeVietnameseTones', () => {
  it('correctly strips Vietnamese tones from common dish names', () => {
    expect(removeVietnameseTones('Bún bò Huế')).toBe('bun bo hue');
    expect(removeVietnameseTones('Phở Bò Tái Lăn')).toBe('pho bo tai lan');
    expect(removeVietnameseTones('Bánh Mì Thịt Nướng')).toBe('banh mi thit nuong');
    expect(removeVietnameseTones('Cơm Tấm Sườn Bì Chả')).toBe('com tam suon bi cha');
    expect(removeVietnameseTones('Hủ Tiếu Nam Vang')).toBe('hu tieu nam vang');
    expect(removeVietnameseTones('Đậu Hũ Sốt Cà')).toBe('dau hu sot ca');
  });

  it('handles empty strings and strings without tones', () => {
    expect(removeVietnameseTones('')).toBe('');
    expect(removeVietnameseTones('Pizza Margherita')).toBe('pizza margherita');
  });

  it('matches diacritic-insensitively', () => {
    expect(matchesDiacriticInsensitive('Bún Chả Hà Nội', 'bun cha')).toBe(true);
    expect(matchesDiacriticInsensitive('Bún Chả Hà Nội', 'HÀ NỘI')).toBe(true);
    expect(matchesDiacriticInsensitive('Cơm Tấm', 'pho')).toBe(false);
  });
});
