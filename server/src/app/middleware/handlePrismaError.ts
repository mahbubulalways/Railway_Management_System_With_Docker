import { StatusCodes } from "http-status-codes";
import { IErrorResponse } from "../../interface/error";
import { Prisma } from "../../generated/prisma/client";

export const handlePrismaError = (
  err: Prisma.PrismaClientKnownRequestError,
): IErrorResponse => {
  let statusCode = StatusCodes.BAD_REQUEST;
  let message = "PRISMA_ERROR";
  let errorSources = [
    {
      path: "",
      message: err.message,
    },
  ];

  switch (err.code) {
    /**
     * P2002
     * Unique constraint failed.
     * Example: Duplicate email, phone, trainId, etc.
     */
    case "P2002":
      statusCode = StatusCodes.CONFLICT;
      message = "UNIQUE_CONSTRAINT_ERROR";
      errorSources = [
        {
          path: err.meta?.target
            ? (err.meta.target as string[]).join(", ")
            : "",
          message: "This value already exists.",
        },
      ];
      break;

    /**
     * P2003
     * Foreign key constraint failed.
     * Example: Invalid trainId, routeId, userId, etc.
     */
    case "P2003":
      statusCode = StatusCodes.BAD_REQUEST;
      message = "FOREIGN_KEY_CONSTRAINT_ERROR";
      errorSources = [
        {
          path: err.meta?.field_name ? String(err.meta.field_name) : "",
          message: "Referenced record does not exist.",
        },
      ];
      break;

    /**
     * P2025
     * Record not found.
     * Example: Update/Delete non-existing record.
     */
    case "P2025":
      statusCode = StatusCodes.NOT_FOUND;
      message = "RECORD_NOT_FOUND";
      errorSources = [
        {
          path: "",
          message: "Record not found.",
        },
      ];
      break;
  }

  return {
    statusCode,
    message,
    errorSources,
  };
};
