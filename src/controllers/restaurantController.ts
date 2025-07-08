import { NextFunction, Request, Response } from "express";
import { LLMService } from "../services/llmService";
import {
  RestaurantResult,
  RestaurantSearchParams,
} from "../types/restaurantTypes";
import { FoursquareService } from "../services/foursquareService";
import { ApiResponseHealth } from "../utils/apiTypes";

export class RestaurantController {
  private llmService: LLMService;
  private fourSquareService: FoursquareService;

  constructor() {
    this.llmService = new LLMService();
    this.fourSquareService = new FoursquareService();
  }

  async searchRestaurants(req: Request, res: Response, next: NextFunction) {
    try {
      const { message } = req.query as { message: string };

      const searchParams: RestaurantSearchParams =
        await this.llmService.convertMessageToSearchParams(message);

      const restaurants: RestaurantResult[] =
        await this.fourSquareService.searchRestaurants(searchParams);

      const response: ApiResponseHealth<RestaurantResult[]> = {
        success: true,
        data: restaurants,
        meta: {
          query: message,
          parseParameters: searchParams,
          count: restaurants.length,
          timestamp: new Date().toString(),
        },
      };

      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
