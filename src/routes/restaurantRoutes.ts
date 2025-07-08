import { Router } from "express";
import { RestaurantController } from "../controllers/restaurantController";
import { validateQuery } from "../middlewares/validateQuery";
import { validateAccessCode } from "../middlewares/validateCodeAccess";

const router = Router();
const restaurantController = new RestaurantController();

router.get(
  "/execute",
  validateQuery,
  validateAccessCode,
  restaurantController.searchRestaurants.bind(restaurantController),
);

export default router;
