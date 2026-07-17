import { StatusCodes } from "http-status-codes";
import prisma from "../../../helper/prisma";
import { AppError } from "../../error/AppError";
import { IQuery, IStationWithPlatforms } from "./station.interface";
import { separateStationInfo } from "./station.utils";
import { Prisma } from "../../../generated/prisma/client";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { paginationHelper } from "../../../helper/paginationHelper";
import { TQuery } from "../../../interface/query";
import { modifySearch } from "../../../utils/modifySearch";

// CREATE MULTIPLE STATION INTO DB
// const CreateMultipleStationService = async (
//   payload: IStationWithPlatforms[],
// ) => {
//   const info = separateStationInfo(payload);
//   const stations = info.stations;
//   const platforms = info.platforms;
//   const result = await prisma.$transaction(
//     async (tx: Prisma.TransactionClient) => {
//       const station = await tx.station.createMany({ data: stations });
//       await tx.platform.createMany({ data: platforms });
//       return station;
//     },
//   );
//   return result;
// };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const CreateMultipleStationService = async (
  payload: IStationWithPlatforms[],
) => {
  const info = separateStationInfo(payload);

  const stations = info.stations;
  const platforms = info.platforms;

  const result = [];

  for (const station of stations) {
    const created = await prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const stationData = await tx.station.create({
          data: station,
        });

        const stationPlatforms = platforms.filter(
          (platform) => platform.stationId === stationData.stationId,
        );

        await tx.platform.createMany({
          data: stationPlatforms,
        });

        return stationData;
      },
    );

    result.push(created);

    // wait 5 seconds
    await sleep(2000);
  }

  return result;
};

// CREATE STATION (PRIVATE ROUTE)
const CreateStationServicePrivate = async (payload: IStationWithPlatforms) => {
  const divisionCode = payload.station.division
    .split(" ")[0]
    .slice(0, 4)
    .toUpperCase();

  const stationCode = payload.station.name
    .split(" ")[0]
    .slice(0, 4)
    .toUpperCase();
  const isExist = await prisma.station.findFirst({
    where: { name: payload.station.name },
  });

  if (isExist) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Opps! This station is already exists.",
    );
  }

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      // COUNT STATIONS
      const count = await tx.station.count();
      // GENERATE STATION ID
      const stationId = `STN-${divisionCode}-${stationCode}-${(count + 1)
        .toString()
        .padStart(7, "0")}`;
      // SET STATION ID TO STATION
      payload.station.stationId = stationId;
      const station = await tx.station.create({ data: payload.station });

      // INVOLE STATION ID TO PLATFORM
      const platforms = payload.platforms.map((platform) => {
        return {
          ...platform,
          stationId,
        };
      });
      // CREATE PLATFORM
      await tx.platform.createMany({ data: platforms });
      return station;
    },
  );
  return result;
};

// ================= PRIVATE ROUTE ======================

// GET OWN STATION WHO HAVE THE PERMISSION
const GetOwnStationPermissionServicePrivate = async (userId: string) => {
  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const staff = await tx.staff.findFirst({
        where: { userId },
        select: { stationId: true },
      });
      console.log(staff?.stationId);
      return await tx.station.findFirst({
        where: { stationId: staff?.stationId },
        include: { platforms: true, staffs: { include: { user: true } } },
      });
    },
  );
  return result;
};

// ==================== PUBLIC ROUTE ======================

// CREATE STATION FROM DB (PUBLIC ROUTE)
const GetStationServicePublic = async (query: TQuery) => {
  const pagination = paginationHelper(query.page, query.limit);
  const where = modifySearch({
    search: query.search!,
    stringFields: [
      "stationId",
      "name",
      "division",
      "district",
      "status",
      "type",
    ],
  });

  const [result, total] = await prisma.$transaction([
    prisma.station.findMany({
      where,
      select: {
        name: true,
        district: true,
        division: true,
        type: true,
        id: true,
        stationId: true,
        status: true,
        established: true,
      },
      skip: pagination.skip,
      take: pagination.limit,
      orderBy: { createdAt: "asc" },
    }),

    prisma.station.count({ where }),
  ]);

  const meta = createMetaConfig({
    limit: pagination.limit,
    page: pagination.page,
    totalData: total,
  });

  return {
    meta,
    data: result,
  };
};

// GET SINGLE STATION  (PUBLIC ROUTE)
const GetSingleStationServicePublic = async (stationId: string) => {
  const result = await prisma.station.findFirst({
    where: { stationId },
    include: { platforms: true },
  });
  return result;
};

// GET STATIONS OPTIONS
const GetStationOptionsService = async () => {
  const result = await prisma.station.findMany({
    select: {
      id: true,
      name: true,
      stationId: true,
      platforms: { select: { name: true, id: true } },
    },
  });
  return result;
};
export const StationService = {
  CreateStationServicePrivate,
  GetStationServicePublic,
  GetSingleStationServicePublic,
  CreateMultipleStationService,
  GetOwnStationPermissionServicePrivate,
  GetStationOptionsService,
};
