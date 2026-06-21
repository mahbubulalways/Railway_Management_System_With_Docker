import { StatusCodes } from "http-status-codes";
import { bcryptHelper } from "../../../helper/bcryptHelper";
import prisma from "../../../helper/prisma";
import { AppError } from "../../error/AppError";
import { IAuth } from "./auth.interface";
import { jwtHelper } from "./auth.utils";
import { Config } from "../../../config";

const loginUserToSystemService = async (payload: IAuth) => {
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.auth);

  const user = await prisma.user.findFirst({
    where: isEmail ? { email: payload.auth } : { phone: payload.auth },
  });

  if (!user) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "No account found with the provided credentials.",
    );
  }
  const matchPassword = await bcryptHelper.comparePassword(
    payload.password,
    user?.password,
  );

  if (!matchPassword) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "No account found with the provided credentials.",
    );
  }

  const tokenInfo = {
    email: user.email,
    userId: user.id,
    role: user.role,
  };

  const accessToken = await jwtHelper.generateToken(
    tokenInfo,
    Config.ACCESS_TOKEN_SECRET as string,
    "5D",
  );
  const refreshToken = await jwtHelper.generateToken(
    tokenInfo,
    Config.REFRESH_TOKEN_SECRET as string,
    "30D",
  );
  return {
    accessToken,
    refreshToken,
  };
};

export const AuthService = { loginUserToSystemService };
