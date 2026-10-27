import { describe, it, expect, beforeEach } from 'vitest';
import { LocalUserPreferencesRepository } from './local-user-preferences.repository';

describe('LocalUserPreferencesRepository', () => {
  let repo: LocalUserPreferencesRepository;

  beforeEach(() => {
    localStorage.clear();
    repo = new LocalUserPreferencesRepository();
  });

  it('manages favorites toggle and removal', async () => {
    expect(await repo.isFavorite('pho-bo')).toBe(false);

    // Toggle on
    const isNowFav = await repo.toggleFavorite('pho-bo');
    expect(isNowFav).toBe(true);
    expect(await repo.isFavorite('pho-bo')).toBe(true);

    const list = await repo.getFavorites();
    expect(list.length).toBe(1);
    expect(list[0]?.dishId).toBe('pho-bo');

    // Toggle off
    const toggledOff = await repo.toggleFavorite('pho-bo');
    expect(toggledOff).toBe(false);
    expect(await repo.isFavorite('pho-bo')).toBe(false);
  });

  it('records swipe history and supports undo', async () => {
    await repo.recordSwipe({ dishId: 'pho-bo', decision: 'like', timestamp: 1000 });
    await repo.recordSwipe({ dishId: 'com-tam', decision: 'skip', timestamp: 2000 });

    let history = await repo.getSwipeHistory();
    expect(history.length).toBe(2);

    const undone = await repo.undoLastSwipe();
    expect(undone?.dishId).toBe('com-tam');
    expect(undone?.decision).toBe('skip');

    history = await repo.getSwipeHistory();
    expect(history.length).toBe(1);
    expect(history[0]?.dishId).toBe('pho-bo');
  });
});
