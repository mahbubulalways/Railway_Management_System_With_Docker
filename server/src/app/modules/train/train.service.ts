import { Prisma } from "../../../generated/prisma/client";
import { paginationHelper } from "../../../helper/paginationHelper";
import prisma from "../../../helper/prisma";
import { TQuery } from "../../../interface/query";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { modifySearch } from "../../../utils/modifySearch";
import { ITrain, ITrainCoach } from "./train.interface";
import { generateTrainId } from "./train.utils";

const createTrainService = async (payload: ITrain) => {
  const count = await prisma.train.count();
  payload.trainId = generateTrainId(payload.name, count);
  const result = await prisma.train.create({ data: payload });
  return result;
};

// GET ALL TRAINS
const getAllTrainService = async (query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where = modifySearch({
    search: query.search!,
    stringFields: ["name", "status", "trainId"],
    numberFields: ["maxSpeed", "manufactureYear"],
  });

  const [result, total] = await prisma.$transaction([
    prisma.train.findMany({
      where,
      take: limit,
      skip,
      orderBy: { createdAt: "asc" },
      include: { _count: { select: { coaches: true } } },
    }),
    prisma.train.count(),
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

// GET SINGLE TRAIN
const getSingleTrainService = async (trainId: string) => {
  const result = await prisma.train.findFirst({
    where: { trainId },
    include: {
      coaches: {
        include: {
          coach: {
            select: {
              coachCode: true,
              id: true,
              coachNumber: true,
              _count: { select: { seats: true } },
              coachModel: { select: { type: true } },
            },
          },
        },
      },
      schedules: { include: { route: { select: { name: true } } } },
    },
  });
  return result;
};

// ADD COACH TO TRAIN
const addCoachToTrainService = async (payload: ITrainCoach) => {
  const trainCoach = payload.coachId.map((ci: string, idx: number) => ({
    trainId: payload.trainId,
    coachId: ci,
    sequence: idx + 1,
  }));

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      const result = await tx.trainCoach.createMany({ data: trainCoach });
      await tx.coach.updateMany({
        where: { id: { in: payload.coachId } },
        data: { status: "ASSIGNED" },
      });
      return result;
    },
  );
  return result;
};

// EXPORT ALL FUNC
export const TrainService = {
  createTrainService,
  getAllTrainService,
  getSingleTrainService,
  addCoachToTrainService,
};
