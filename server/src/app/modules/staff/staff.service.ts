import prisma from "../../../helper/prisma";
import { userPublicSelect } from "../user/user.field";

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

export const StaffService = { GetStaffService };
