import { StatusCodes } from "http-status-codes";
import prisma from "../../helper/prisma";
import catchAsync from "../../utils/catchAsync";
import { AppError } from "../error/AppError";

export const PermissionGuard = (...permissions: string[]) => {
  return catchAsync(async (req, res, next) => {
    const user = req.user;
    if (user.role === "ADMIN") {
      return next();
    }
    console.log(permissions);
    const staff = await prisma.staff.findFirst({
      where: {
        userId: user.userId,
      },
      select: {
        id: true,
        staffId: true,
        stationId: true,
        staffPermissions: { select: { permission: true } },
      },
    });
    console.log(staff?.staffPermissions[0]);
    const userPermissions =
      staff?.staffPermissions.map((item) => item.permission.permission) || [];

    console.log(userPermissions);
    const hasPermission = permissions.some((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        "Access forbidden. You do not have the required permissions.",
      );
    }

    next();
  });
};
