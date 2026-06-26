import { Prisma } from "../../../generated/prisma/client";
import prisma from "../../../helper/prisma";
import { TQuery } from "../../../interface/query";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { IStaffType } from "./staff-types.interface";

// CREATE STAFF TYPE (PRIVATE ROUTE ADMIN)
const createStaffTypeService = async (payload: IStaffType) => {
  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const staffType = await tx.staffType.create({
        data: { type: payload.type },
      });
      const formatData = payload.permissions.map((pm) => {
        return {
          permissionId: pm,
          staffTypeId: staffType.id,
        };
      });
      await tx.staffPermission.createMany({
        data: formatData,
      });
      return staffType;
    },
  );
  return result;
};

// GET STAFF TYPES (PRIVATE ROUTE ADMIN)
const getStaffTypesService = async (query: TQuery) => {
  const limit = query?.limit as number;
  const page = query?.page as number;
  const skip = (page - 1) * limit;

  const result = await prisma.staffType.findMany({
    select: {
      type: true,
      createdAt: true,
      id: true,
      updatedAt: true,
      staffPermissions: {
        select: { permission: { select: { id: true, permission: true } } },
      },
    },
    skip: skip,
    take: limit,
    orderBy: { createdAt: "asc" },
  });
  const totalData = await prisma.staffType.count();
  const meta = createMetaConfig({
    limit,
    page,
    totalData,
  });
  return { meta, data: result };
};

// GET STAFF TYPES (PRIVATE ROUTE ADMIN)
const getSingleStaffTypeService = async (id: string) => {
  const result = await prisma.staffType.findFirst({
    where: { id },
    select: {
      type: true,
      createdAt: true,
      id: true,
      updatedAt: true,
      staffPermissions: {
        select: { permission: { select: { id: true, permission: true } } },
      },
    },
  });
  return result;
};

export const StaffTypeService = {
  createStaffTypeService,
  getStaffTypesService,
  getSingleStaffTypeService,
};
