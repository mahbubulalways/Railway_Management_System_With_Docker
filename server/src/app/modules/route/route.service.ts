import { Prisma } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../helper/prisma";
import { TQuery } from "../../../interface/query";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { modifySearch } from "../../../utils/modifySearch";
import { ICreateRoute } from "./route.interface";

// CREATE ROUTE
const createRouteService = async (payload: ICreateRoute) => {
  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const { routeStations, ...rest } = payload;
      const totalDistance = routeStations.reduce(
        (acc, curr) => acc + Number(curr.distanceFromPrevious),
        0,
      );
      rest.distance = totalDistance;

      const route = await tx.route.create({ data: rest });

      let cumulativeDistance = 0;
      const modifyStations = routeStations.map((rs, idx) => {
        cumulativeDistance += Number(rs.distanceFromPrevious);
        return {
          stationId: rs.stationId,
          distanceFromPrevious: Number(rs.distanceFromPrevious),
          travelTimeFromPrevious: Number(rs.travelTimeFromPrevious),
          routeId: route.id,
          sequence: idx + 1,
          distanceFromStart: cumulativeDistance,
          stopTime: rs.stopTime,
          platform: rs.platform,
        };
      });

      await tx.routeStation.createMany({ data: modifyStations });
      return route;
    },
  );
  return result;
};

// GET ALL ROUTE
const GetAllRouteService = async (query: TQuery) => {
  const pagination = paginationHelper(query.page, query.limit);
  const where = modifySearch({
    search: query?.search!,
    stringFields: ["name"],
  });

  const [result, total] = await prisma.$transaction([
    prisma.route.findMany({
      where,
      skip: pagination.skip,
      take: pagination.limit,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        distance: true,
        sourceStation: {
          select: {
            name: true,
          },
        },
        destinationStation: {
          select: {
            name: true,
          },
        },
        _count: { select: { routeStations: true } },
      },
    }),

    prisma.route.count({
      where,
    }),
  ]);

  const meta = createMetaConfig({
    page: pagination.page,
    limit: pagination.limit,
    totalData: total,
  });

  return {
    meta,
    data: result,
  };
};

// GET SINGLE ROUTE AND DETAILS
const getSingleRouteService = async (id: string) => {
  return prisma.route.findFirst({
    where: { id },
    include: {
      destinationStation: { select: { name: true } },
      routeStations: {
        include: { station: { select: { name: true } } },
        orderBy: { sequence: "asc" },
      },
      sourceStation: { select: { name: true } },
    },
  });
};

export const RouteService = {
  createRouteService,
  GetAllRouteService,
  getSingleRouteService,
};
