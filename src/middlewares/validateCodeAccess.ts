import { Request, Response, NextFunction } from "express";

export const validateAccessCode = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { code } = req.query as { code: string };

  if (code !== process.env.CODE) {
    res.status(401).json({
      success: false,
      error: "Unathorized access. Valid code is required.",
      code: "UNAUTHRIZED",
    });
    return;
  }
  next();
};
