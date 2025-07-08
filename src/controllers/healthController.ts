import { Request, Response } from "express";
import { ApiResponseHealth } from "../utils/apiTypes";

export class HealthController {
  getHealth(req: Request, res: Response): void {
    const response: ApiResponseHealth<{ status: string; uptime: number }> = {
      success: true,
      data: {
        status: "OK",
        uptime: process.uptime(),
      },
      meta: {
        timestamp: new Date().toString(),
        environment: process.env.NODE_ENV!,
      },
    };

    res.json(response);
  }
}
