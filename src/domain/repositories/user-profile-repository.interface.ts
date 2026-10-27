import { UserProfile } from '../entities/user-profile';

export interface IUserProfileRepository {
  getProfile(): Promise<UserProfile>;
  saveProfile(profile: UserProfile): Promise<void>;
  resetToDefault(): Promise<UserProfile>;
}
