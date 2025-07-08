import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../utils/errors";

export const validateQuery = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { message } = req.query as { message: string };

  if (!message || typeof message !== "string") {
    const error = new ValidationError(
      "Message paramater is required and it must be a string.",
    );
    next(error);
    return;
  }

  if (message.trim().length === 0) {
    const error = new ValidationError("Message cannot be empty.");
    next(error);
    return;
  }

  next();
};
