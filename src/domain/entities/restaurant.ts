import type { DishMedia } from './dish-media';

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface RestaurantLocation {
  address: string;
  ward?: string;
  district: string;
  city: string; // e.g. "Thành phố Hồ Chí Minh"
  coordinates: GeoCoordinates;
}

export interface RestaurantMenuItem {
  id: string;
  restaurantId: string;
  dishId: string;
  dishName: string;
  price: number;
  currency: 'VND';
  lastVerifiedAt: string; // ISO 8601 string
  isSpecialty?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  location: RestaurantLocation;
  googleMapsPlaceId?: string;
  googleMapsUrl: string;
  openingHours?: string;
  phoneNumber?: string;
  rating?: number;
  reviewCount?: number;
  images: DishMedia[];
  menuItems: RestaurantMenuItem[];
}

export interface RestaurantWithDistance extends Restaurant {
  distanceMeters?: number;
  matchedMenuItem?: RestaurantMenuItem;
}
