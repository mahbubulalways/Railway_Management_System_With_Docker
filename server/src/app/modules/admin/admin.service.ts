import { StatusCodes } from "http-status-codes";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../helper/prisma";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { AppError } from "../../error/AppError";
import { Admin } from "../../../generated/prisma/client";
import { userPublicSelect } from "../user/user.field";

// GET ALL ADMIN
const GetAdminsService = async () => {
  const result = await prisma.admin.findMany({
    include: { user: { select: userPublicSelect } },
  });

  return {
    meta: {
      limit: 0,
      page: 0,
      totalData: result.length,
    },
    data: result,
  };
};

// GET SINGLE ADMIN
const GetAdminService = async (id: string) => {
  const result = await prisma.admin.findFirst({
    where: { id },
    include: { user: { select: userPublicSelect } },
  });
  return result;
};

// UPDATE ADMIN
const UpdateAdminService = async (id: string, payload: Admin) => {
  const admin = await prisma.admin.count({
    where: { id },
  });
  if (!admin) {
    throw new AppError(StatusCodes.NOT_FOUND, "Admin not found.");
  }
  const result = await prisma.admin.update({ data: payload, where: { id } });
  return result;
};

export const AdminService = {
  GetAdminsService,
  GetAdminService,
  UpdateAdminService,
};
