import {
  FoursquareRestaurantVenue,
  Operator,
  RatingFilter,
  RestaurantResult,
  RestaurantSearchParams,
} from "../types/restaurantTypes";
import axios from "axios";
import { FoursquareError } from "../utils/errors";

export class FoursquareService {
  private readonly baseURL: string;
  private readonly apiKey: string;

  constructor() {
    this.baseURL = process.env.FOURSQUARE_BASE_URL!;
    this.apiKey = process.env.FOURSQUARE_API_KEY!;
  }

  async searchRestaurants(
    params: RestaurantSearchParams,
  ): Promise<RestaurantResult[]> {
    try {
      const queryParams = this.buildQueryParams(params);

      const response = await axios.get(`${this.baseURL}/places/search`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          Accept: "application/json",
          "X-Places-Api-Version": "2025-06-17",
        },
        params: queryParams,
      });

      const restaurants: FoursquareRestaurantVenue[] =
        response.data.results || [];

      // Filter the data into rating based on the message
      const filteredRestaurantsByRatings = this.filterByRating(
        restaurants,
        params.rating,
      );

      return this.mapToRestaurantsResults(filteredRestaurantsByRatings);
    } catch (error) {
      throw new FoursquareError("Failed ot search restaurants");
    }
  }

  private filterByRating(
    restaurants: FoursquareRestaurantVenue[],
    ratingFilter?: RatingFilter,
  ) {
    if (!ratingFilter) return restaurants;

    return restaurants.filter((restaurant: FoursquareRestaurantVenue) => {
      if (!restaurant.rating) return false;

      const rating = restaurant.rating;
      const { min, max, operator } = ratingFilter;

      switch (operator) {
        case Operator.GTE:
          return min !== undefined && rating >= min;
        case Operator.LTE:
          return max !== undefined && rating <= max;
        case Operator.EQ:
          return min !== undefined && rating === min;
        case Operator.BETWEEN:
          return (
            min !== undefined &&
            max !== undefined &&
            rating >= min &&
            rating <= max
          );
        default:
          if (min !== undefined) return rating >= min;
          if (max !== undefined) return rating <= max;
          return true;
      }
    });
  }

  private mapToRestaurantsResults(
    restaurants: FoursquareRestaurantVenue[],
  ): RestaurantResult[] {
    return restaurants.map((restaurant: FoursquareRestaurantVenue) => ({
      id: restaurant.fsq_place_id,
      name: restaurant.name,
      address:
        restaurant.location.formatted_address || "Address is not available",
      cuisine:
        restaurant.categories.map((category) => category.name).join(", ") ||
        "Cuisine is not specified",
      rating: restaurant.rating || null,
      price_level: restaurant.price || null,
      operating_hours: restaurant.hours || null,
      distance: restaurant.distance,
    }));
  }

  private buildQueryParams(
    params: RestaurantSearchParams,
  ): Record<string, string> {
    const queryParams: Record<string, string> = {
      categories: "13000",
      limit: (params.limit || 10).toString(),
    };

    if (params.query) queryParams.query = params.query;
    if (params.near) queryParams.near = params.near;
    if (params.price) queryParams.price = params.price;
    if (params.limit) queryParams.limit = params.limit.toString();
    if (params.open_at) queryParams.open_at = params.open_at.toString();
    if (params.open_now) queryParams.open_now = "true";

    return queryParams;
  }
}
