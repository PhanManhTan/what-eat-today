import { describe, it, expect, beforeEach } from 'vitest';
import { MockCatalogRepository } from './mock-catalog.repository';

describe('MockCatalogRepository', () => {
  let repo: MockCatalogRepository;

  beforeEach(() => {
    repo = new MockCatalogRepository();
  });

  it('retrieves all seed dishes', async () => {
    const dishes = await repo.getDishes();
    expect(dishes.length).toBeGreaterThanOrEqual(10);
  });

  it('filters by region correctly', async () => {
    const southDishes = await repo.getDishes({ regionId: 'south' });
    expect(southDishes.length).toBeGreaterThan(0);
    expect(southDishes.every((d) => d.originRegion === 'south')).toBe(true);

    const centralDishes = await repo.getDishes({ regionId: 'central' });
    expect(centralDishes.some((d) => d.id === 'bun-bo-hue')).toBe(true);
  });

  it('filters by meal type', async () => {
    const breakfastDishes = await repo.getDishes({ mealType: 'breakfast' });
    expect(breakfastDishes.length).toBeGreaterThan(0);
    expect(breakfastDishes.every((d) => d.mealTypes.includes('breakfast'))).toBe(true);
  });

  it('supports diacritic-insensitive search in Vietnamese', async () => {
    const results = await repo.getDishes({ searchQuery: 'pho bo' });
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((d) => d.id === 'pho-bo-tai-lan')).toBe(true);

    const hueResults = await repo.getDishes({ searchQuery: 'BÚN BÒ' });
    expect(hueResults.some((d) => d.id === 'bun-bo-hue')).toBe(true);
  });

  it('retrieves dish by id and slug', async () => {
    const dish = await repo.getDishById('com-tam-suon-bi-cha');
    expect(dish).not.toBeNull();
    expect(dish?.names['vi-VN']).toContain('Cơm Tấm');

    const bySlug = await repo.getDishBySlug('banh-mi-thit-nuong');
    expect(bySlug).not.toBeNull();
  });
});
