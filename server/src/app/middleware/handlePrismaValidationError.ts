import { Prisma } from "../../generated/prisma/client";
import { StatusCodes } from "http-status-codes";
import { IErrorResponse } from "../../interface/error";

export const handlePrismaValidationError = (
  err: Prisma.PrismaClientValidationError,
): IErrorResponse => {
  const match = err.message.match(/Argument `(.+?)` is missing/);

  const field = match?.[1] || "";

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: "MISSING_REQUIRED_FIELD",
    errorSources: [
      {
        path: field,
        message: field
          ? `The required field '${field}' is missing.`
          : err.message,
      },
    ],
  };
};
