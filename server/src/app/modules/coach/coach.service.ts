import { StatusCodes } from "http-status-codes";
import {
  CoachLayoutType,
  CoachStatus,
  CoachType,
  SeatStatus,
} from "../../../generated/prisma/client";
import prisma from "../../../helper/prisma";
import { AppError } from "../../error/AppError";
import { ICoachCreate } from "./coach.interface";
import { generateCoachCode } from "./coach.utils";
import { TQuery } from "../../../interface/query";
import { paginationHelper } from "../../../helper/paginationHelper";
import { modifySearch } from "../../../utils/modifySearch";
import { createMetaConfig } from "../../../utils/createMetaConfig";

// CREATE COACH
const createCoachService = async (payload: ICoachCreate) => {
  const result = await prisma.$transaction(async (tx) => {
    const coachModel = await tx.coachModel.findFirst({
      where: { id: payload.coachModelId },
      select: {
        type: true,
        totalSeats: true,
        layoutType: true,
        seats: true,
        id: true,
      },
    });

    if (!coachModel?.id) {
      throw new AppError(StatusCodes.NOT_FOUND, "Coach model not found!");
    }

    const coachCount = await tx.coach.count();
    const coachCode = generateCoachCode(coachModel?.type!, coachCount);

    const coach = await tx.coach.create({
      data: {
        coachCode,
        coachNumber: payload.coachNumber.toUpperCase(),
        coachModelId: payload.coachModelId,
      },
    });

    const seats = coachModel.seats.map((seat) => ({
      coachId: coach.id,
      label: seat.label,
      row: seat.row,
      side: seat.side,
      position: seat.position,
      seatType: seat.seatType ?? undefined,
      status: SeatStatus.AVAILABLE,
    }));

    await tx.seat.createMany({ data: seats });
    return coach;
  });
  return result;
};

// GET ALL COACH
const getAllCoachService = async (query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where = modifySearch({
    search: query.search!,
    stringFields: ["coachNumber", "coachCode"],
  });

  const [result, total] = await prisma.$transaction([
    prisma.coach.findMany({
      where,
      include: {
        coachModel: {
          select: {
            type: true,
            name: true,
            layoutType: true,
            totalSeats: true,
          },
        },
      },
      skip,
      take: limit,
    }),
    prisma.coach.count(),
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

// GET COACH OPTIONS

const getCoachOptionService = async () => {
  const result = await prisma.coach.findMany({
    where: { status: "AVAILABLE" },
    select: {
      id: true,
      coachCode: true,
      coachNumber: true,
      _count: { select: { seats: true } },
    },
  });
  return result;
};

// GET SINGLE COACH
const getSingleCoachService = async (id: string) => {
  const result = await prisma.coach.findFirst({
    where: { id },
    include: { coachModel: true, seats: true },
  });
  return result;
};

// GET COACH VIA STATUS
const getCoachViaStatusService = async (query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);

  // MARGE HERE SEARCH AND STATUS CONDITIONS
  const where = {
    ...modifySearch({
      search: query.search || "",
      stringFields: ["coachNumber", "coachCode"],
    }),
    ...(query.status && {
      status: query.status.toUpperCase() as CoachStatus,
    }),
  };

  const [result, total] = await prisma.$transaction([
    prisma.coach.findMany({
      where,
      include: {
        coachModel: {
          select: {
            type: true,
            name: true,
            layoutType: true,
            totalSeats: true,
          },
        },
      },
      skip,
      take: limit,
    }),
    prisma.coach.count({ where }),
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

export const CoachService = {
  createCoachService,
  getAllCoachService,
  getSingleCoachService,
  getCoachOptionService,
  getCoachViaStatusService,
};
