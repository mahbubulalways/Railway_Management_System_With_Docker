import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { AppError } from "../error/AppError";
import { jwtHelper } from "../modules/auth/auth.utils";
import { Config } from "../../config";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../helper/prisma";

export const AuthGuard = (...roles: string[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req?.headers?.authorization?.split(" ")[1] as string;

    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized access. You must be logged in to continue.",
      );
    }

    const tokenInfo = (await jwtHelper.verifyToken(
      token,
      Config.ACCESS_TOKEN_SECRET as string,
    )) as JwtPayload;

    if (!tokenInfo) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized access. You must be logged in to continue.",
      );
    }
    const user = await prisma.user.findFirst({
      where: { id: tokenInfo.userId },
    });

    if (!user?.id) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized access. You must be logged in to continue.",
      );
    }

    if (user.isDeleted || user.status !== "ACTIVE") {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Unauthorized access. You must be logged in to continue.",
      );
    }

    if (roles.length && !roles.includes(tokenInfo.role)) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Access forbidden. You do not have the required permissions to perform this action.",
      );
    }

    req.user = tokenInfo;
    next();
  });
};
