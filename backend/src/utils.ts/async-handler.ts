import { NextFunction } from "express";

/**
 * This function is a wrapper that monitors controllers for any error,
 * and passes the error in next.
 */
export async function asyncHandler(
  fn: (
    req: any,
    res: any,
    next: NextFunction
  ) => Promise<(req: any, res: any, next: NextFunction) => Promise<void>>
) {
  return async function (req: any, res: any, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
