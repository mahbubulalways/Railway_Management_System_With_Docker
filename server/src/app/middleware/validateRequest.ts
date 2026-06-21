import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodObject } from "zod";

export const VALIDATE_REQUEST = (payload: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
      await payload.parseAsync(body);
      next();
    } catch (error) {
      next(error);
    }
  };
};
