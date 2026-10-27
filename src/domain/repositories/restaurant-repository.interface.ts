import type {
  Restaurant,
  RestaurantWithDistance,
  GeoCoordinates,
} from '../entities/restaurant';

export interface IRestaurantRepository {
  getRestaurantsForDish(
    dishId: string,
    userLocation?: GeoCoordinates,
    maxDistanceMeters?: number
  ): Promise<RestaurantWithDistance[]>;
  getRestaurantById(id: string): Promise<Restaurant | null>;
  searchRestaurants(query: string, city?: string): Promise<Restaurant[]>;
}
