import { NextFunction, Request, Response } from "express";

import { IErrorSources } from "../../interface/error";
import { Config } from "../../config";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";
import { handleZodError } from "./handleZodError";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let message = err.message || "Something went wrong";
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  let errorSources: IErrorSources = [
    {
      message: message,
      path: "",
    },
  ];

  if (err instanceof ZodError) {
    const simplyfliedError = handleZodError(err);
    errorSources = simplyfliedError.errorSources;
    statusCode = simplyfliedError.statusCode;
    message = simplyfliedError.message;
  }

  res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errorSources,
    stack: Config.NODE_ENV === "development" && err.stack,
  });
};

export default globalErrorHandler;
