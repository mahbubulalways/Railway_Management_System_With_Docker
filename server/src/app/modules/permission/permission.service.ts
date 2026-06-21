import { StatusCodes } from "http-status-codes";
import { Permission, Role } from "../../../generated/prisma/client";
import prisma from "../../../helper/prisma";
import { AppError } from "../../error/AppError";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import redisClient from "../../../redis";

// CREATE PERMISSION INTO DB
const CreatePermissionService = async (payload: Permission) => {
  const permission = payload.permission
    .toLocaleUpperCase()
    .split(" ")
    .join("_");

  const isExists = await prisma.permission.findFirst({
    where: { permission: permission },
  });

  if (isExists) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Opps! This permission is permission exist in database.",
    );
  }

  const result = await prisma.permission.create({
    data: { permission: permission },
  });
  return result;
};

// GET ROLE FROM DB
const GetPermissionsService = async () => {
  const limit = 10;
  const page = 1;

  const skip = (page - 1) * limit;

  const redisData = await redisClient.get("permission");

  if (redisData) {
    await redisClient.flushAll();
    return JSON.parse(redisData);
  }

  const result = await prisma.permission.findMany({
    // skip,
    // take: limit,
    orderBy: { createdAt: "asc" },
  });

  const totalData = await prisma.permission.count();
  const meta = createMetaConfig({
    limit,
    page,
    totalData,
  });

  const data = {
    meta,
    data: result,
  };
  await redisClient.set("permission", JSON.stringify(data));
  return data;
};

// UPDATE ROLE FROM DB
const UpdatePermissionServivce = async (id: string, payload: Permission) => {
  const isExists = await prisma.permission.findFirst({ where: { id } });
  if (!isExists) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Opps! This permission is not exist in database.",
    );
  }

  const permission = payload.permission
    .toLocaleUpperCase()
    .split(" ")
    .join("_");
  return await prisma.permission.update({
    data: { permission: permission },
    where: { id },
  });
};

// HARD DELETE ROLE FROM DB
const HardDeleteRoleServivce = async (id: string) => {
  return await prisma.permission.delete({
    where: { id },
  });
};

export const PermissionService = {
  CreatePermissionService,
  GetPermissionsService,
  UpdatePermissionServivce,
  HardDeleteRoleServivce,
};
