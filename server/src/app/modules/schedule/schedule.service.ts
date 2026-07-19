import { StatusCodes } from "http-status-codes";
import { Prisma, Schedule, TripStatus } from "../../../generated/prisma/client";
import prisma from "../../../helper/prisma";
import { AppError } from "../../error/AppError";
import { trainTimeManagement, WEEK_DAYS } from "./schedule.utils";
import { TQuery } from "../../../interface/query";
import { paginationHelper } from "../../../helper/paginationHelper";
import { modifySearch } from "../../../utils/modifySearch";
import { createMetaConfig } from "../../../utils/createMetaConfig";

// GET TRAIN-ROUTE OPTIONS
const getTrainAndRouteOptionService = async () => {
  const [trains, routes] = await prisma.$transaction([
    prisma.train.findMany({
      select: { trainId: true, name: true, id: true },
    }),
    prisma.route.findMany({
      select: { name: true, id: true },
    }),
  ]);
  return {
    trains,
    routes,
  };
};
// CREATE SCHEDULE
const createScheduleService = async (payload: Schedule) => {
  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      // Check if this train already has an active schedule for the same direction
      const existingTrainSchedule = await tx.schedule.findFirst({
        where: {
          trainId: payload.trainId,
          direction: payload.direction,
          isActive: true,
        },
        include: { route: { select: { name: true } } },
      });
      if (existingTrainSchedule) {
        throw new AppError(
          StatusCodes.CONFLICT,
          `This train already has an active ${payload.direction} schedule to ${existingTrainSchedule.route.name}. Please update the existing schedule instead of creating a new one.`,
        );
      }

      // Check if another train is already scheduled at the same time
      const existingSchedules = await tx.schedule.findMany({
        where: {
          direction: payload.direction,
          startTime: payload.startTime,
          isActive: true,
        },
        include: {
          train: {
            select: {
              name: true,
              trainId: true,
            },
          },
        },
      });

      const conflictSchedule = existingSchedules.find((schedule) =>
        schedule.runningDays.some((day) => payload.runningDays.includes(day)),
      );

      if (conflictSchedule) {
        const conflictingDays = conflictSchedule.runningDays.filter((day) =>
          payload.runningDays.includes(day),
        );

        throw new AppError(
          StatusCodes.CONFLICT,
          `Schedule conflict! Train "${conflictSchedule.train.name}" is already scheduled at ${conflictSchedule.startTime} on ${conflictingDays.join(", ")}. Please choose a different departure time or running day.`,
        );
      }

      // Create Schedule
      const schedule = await tx.schedule.create({
        data: { ...payload, bookingOpenDays: 7 },
      });

      const tripInstances = [];
      const train = await tx.train.findFirst({
        where: { trainId: payload.trainId },
        select: {
          coaches: {
            select: {
              coach: {
                select: {
                  coachModel: {
                    select: {
                      totalSeats: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const totalSeatCount =
        train?.coaches.reduce(
          (total, item) => total + item.coach.coachModel.totalSeats,
          0,
        ) ?? 0;
      let currentDate = new Date(schedule.validFrom);
      const endDate = new Date(schedule.validUntil!);

      while (currentDate <= endDate) {
        const weekDay = WEEK_DAYS[currentDate.getDay()];

        if (schedule.runningDays.includes(weekDay)) {
          tripInstances.push({
            scheduleId: schedule.id,
            journeyDate: new Date(currentDate),
            status: TripStatus.SCHEDULED,
            totalSeats: totalSeatCount,
            availableSeats: totalSeatCount,
          });
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      if (tripInstances.length) {
        await tx.tripInstance.createMany({
          data: tripInstances,
          skipDuplicates: true,
        });
      }

      return schedule;
    },
  );

  return result;
};

// GET ALL SCHEDULES
const getAllScheduleService = async (query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where = modifySearch({
    search: query.search!,
    stringFields: ["name", "startTime"],
  });
  const [result, total] = await prisma.$transaction([
    prisma.schedule.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "asc" },
    }),
    prisma.schedule.count({ where }),
  ]);
  const meta = createMetaConfig({
    page: page,
    limit: limit,
    totalData: total,
  });

  return {
    meta,
    data: result,
  };
};

// GET SINGLE SCHEDULE
const getSingleScheduleService = async (id: string) => {
  const result = await prisma.schedule.findFirst({
    where: { id },
    include: {
      route: {
        select: {
          name: true,
          routeStations: {
            include: { station: { select: { name: true, stationId: true } } },
            orderBy: { sequence: "asc" },
          },
        },
      },
      train: { select: { name: true, trainId: true } },
      tripInstances: { orderBy: { journeyDate: "desc" } },
    },
  });

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Schedule not found.");
  }
  const formatStationData = result?.route?.routeStations.map((rs) => ({
    stopTime: rs?.stopTime,
    travelTimeFromPrevious: rs?.travelTimeFromPrevious!,
  }));

  const times = trainTimeManagement(result?.startTime, formatStationData);
  const routeStations = result.route.routeStations.map((station, index) => ({
    ...station,
    ...times[index],
  }));

  return {
    ...result,
    route: {
      ...result.route,
      routeStations,
    },
  };
};

export const ScheduleService = {
  getTrainAndRouteOptionService,
  createScheduleService,
  getAllScheduleService,
  getSingleScheduleService,
};

// day time train  direction
