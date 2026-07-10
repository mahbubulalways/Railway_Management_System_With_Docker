import { ZodError } from "zod";
import { IErrorResponse, IErrorSources } from "../../interface/error";
import { StatusCodes } from "http-status-codes";

export const handleZodError = (err: ZodError): IErrorResponse => {
  const errorSources: IErrorSources = err.issues.map((issue) => {
    const lastPath = issue.path[issue.path.length - 1];
    return {
      path: typeof lastPath === "symbol" ? lastPath.toString() : lastPath,
      message: issue.message,
    };
  });

  return {
    statusCode: StatusCodes.BAD_REQUEST,
    message: "ZOD_ERROR",
    errorSources: errorSources,
  };
};
