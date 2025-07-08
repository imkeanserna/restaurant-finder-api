import { Request, Response, NextFunction } from "express";
import { CustomError } from "../utils/errors";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Error:" + error);

  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      success: false,
      error: error.message,
      code: error.code,
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: "Internal server error",
    code: "INTERNAL_SERVER_ERROR",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
};
