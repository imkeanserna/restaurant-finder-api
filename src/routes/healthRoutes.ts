import { Router } from "express";
import { HealthController } from "../controllers/healthController";

const healthController = new HealthController();
const router = Router();

router.get("/", healthController.getHealth.bind(healthController));

export default router;
