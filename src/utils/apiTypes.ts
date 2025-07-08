import { RestaurantSearchParams } from "../types/restaurantTypes";

type MetaHealth = {
  timestamp: string;
  environment: string;
};

type MetaRestaurant = {
  query: string;
  parseParameters: RestaurantSearchParams;
  count: number;
  timestamp: string;
};

export type ApiResponseHealth<T> = {
  success: boolean;
  data: T;
  meta: MetaHealth | MetaRestaurant;
};
