import { StatusCodes } from "http-status-codes";
import { Permission } from "../../../generated/prisma/client";
import prisma from "../../../helper/prisma";
import { AppError } from "../../error/AppError";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import redisClient from "../../../redis";
import { TQuery } from "../../../interface/query";

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

// EXTENDED VERSION
// const CreatePermissionService = async (payload: Permission) => {
//   const permission = payload.permission.map((p) =>
//     p.toLocaleUpperCase().split(" ").join("_"),
//   );

//   const result = [];
//   const delay = (ms: number) =>
//     new Promise((resolve) => setTimeout(resolve, ms));

//   for (let i = 0; i < payload.permission.length; i++) {
//     const each = payload.permission[i];

//     const per = await prisma.permission.create({
//       data: { permission: each },
//     });

//     result.push(per);

//     await delay(5000);
//   }

//   return result;
// };

// GET ROLE FROM DB
const GetPermissionsService = async (query: TQuery) => {
  const limit = query?.limit as number;
  const page = query?.page as number;

  const skip = (page - 1) * limit;
  const redisData = await redisClient.get("permission");

  if (redisData) {
    await redisClient.flushAll();
    // return JSON.parse(redisData);
  }

  const result = await prisma.permission.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: "asc" },
  });

  const totalData = await prisma.permission.count();
  const meta = createMetaConfig({
    limit,
    page,
    totalData,
  });

  // await redisClient.set("permission", JSON.stringify(data));
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const data = {
    meta,
    data: result,
  };
  return data;
};

//  GET ALL PERMISSION FOR CREATE STAFF TYPE
const GetAllPermissionsForStaffTypeService = async () => {
  const redisData = await redisClient.get("permission");
  if (redisData) {
    await redisClient.flushAll();
    // return JSON.parse(redisData);
  }

  const result = await prisma.permission.findMany({
    select: { permission: true, id: true },
    orderBy: { createdAt: "asc" },
  });
  // await redisClient.set("permission", JSON.stringify(data));
  return result;
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
  GetAllPermissionsForStaffTypeService,
};
