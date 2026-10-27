import { db } from '../db/dexie-db';
import type { IUserProfileRepository } from '@/domain/repositories/user-profile-repository.interface';
import { UserProfileSchema, type UserProfile } from '@/domain/entities/user-profile';

const DEFAULT_PROFILE_ID = 'local_default_user';

export class DexieUserProfileRepository implements IUserProfileRepository {
  async getProfile(): Promise<UserProfile> {
    const found = await db.userProfile.get(DEFAULT_PROFILE_ID);
    if (found) {
      return found;
    }
    const defaultProfile = this.createDefaultProfile();
    await db.userProfile.put(defaultProfile);
    return defaultProfile;
  }

  async saveProfile(profile: UserProfile): Promise<void> {
    const updated = {
      ...profile,
      id: DEFAULT_PROFILE_ID,
      updatedAt: new Date().toISOString(),
    };
    await db.userProfile.put(updated);
  }

  async resetToDefault(): Promise<UserProfile> {
    const defaultProfile = this.createDefaultProfile();
    await db.userProfile.put(defaultProfile);
    return defaultProfile;
  }

  private createDefaultProfile(): UserProfile {
    return UserProfileSchema.parse({
      id: DEFAULT_PROFILE_ID,
      age: 30,
      gender: 'male',
      heightCm: 175,
      weightKg: 75,
      activityLevel: 'sedentary',
      goal: 'maintain',
      allergies: [],
      dislikedIngredients: [],
      isDarkMode: false,
      language: 'en',
      updatedAt: new Date().toISOString(),
    });
  }
}
