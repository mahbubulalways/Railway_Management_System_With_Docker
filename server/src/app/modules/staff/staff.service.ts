import prisma from "../../../helper/prisma";
import { userPublicSelect } from "../user/user.field";

// GET STAFFS (ADMIN)
const GetStaffService = async () => {
  const result = await prisma.staff.findMany({
    include: {
      staffPermissions: {
        select: { permission: { select: { id: true, permission: true } } },
      },
      station: {
        select: { id: true, name: true, district: true, stationId: true },
      },
      user: { select: userPublicSelect },
    },
  });
  return result;
};

// GET SINGLE STAFF DETAILS
const GetSingleStaffService = async (id: string) => {
  const result = await prisma.staff.findFirst({
    where: {
      id,
    },
    include: {
      staffPermissions: {
        select: { permission: { select: { id: true, permission: true } } },
      },
      station: {
        select: { id: true, name: true, district: true, stationId: true },
      },
      user: { select: userPublicSelect },
    },
  });
  return result;
};

export const StaffService = { GetStaffService, GetSingleStaffService };
