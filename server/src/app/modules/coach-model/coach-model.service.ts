import { StatusCodes } from "http-status-codes";
import prisma from "../../../helper/prisma";
import { AppError } from "../../error/AppError";
import { ICreateCoachModel } from "./coach-model.interface";
import { generateCoachModelSeats } from "./coach-model.utils";
import { TQuery } from "../../../interface/query";
import { paginationHelper } from "../../../helper/paginationHelper";
import { modifySearch } from "../../../utils/modifySearch";
import { createMetaConfig } from "../../../utils/createMetaConfig";
import { CoachType } from "../../../generated/prisma/enums";

// CREATE COACH MODEL. ITS THE BLUE PRINT OF A COACH
const createCoachModelService = async (payload: ICreateCoachModel) => {
  const { layout, ...coach } = payload;
  const name = coach.name.trim().toUpperCase().split(" ").join("_");
  coach.name = name;
  const isExist = await prisma.coachModel.findFirst({ where: { name } });
  if (isExist) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "This model name is already exists",
    );
  }
  const result = await prisma.$transaction(async (tx) => {
    const coachModel = await tx.coachModel.create({ data: coach });
    const seatModel = generateCoachModelSeats(coachModel.id, layout);
    await tx.coachModelSeat.createMany({ data: seatModel });
    return coachModel;
  });
  return result;
};

// GET COACH MODEL OPTIONS FOR CREATE COACH
const getCoachModelForCreateCoachService = async () => {
  const result = await prisma.coachModel.findMany({
    select: {
      name: true,
      id: true,
    },
  });
  return result;
};

// GET ALL COACH MODEL
const getAllCoachModelCoachService = async (query: TQuery) => {
  const { limit, page, skip } = paginationHelper(query.page, query.limit);
  const where = modifySearch({
    search: query.search!,
    stringFields: ["name"],
    enumFields: [
      {
        field: "type",
        values: Object.values(CoachType),
      },
    ],
    numberFields: ["totalSeats"],
  });

  const [result, total] = await prisma.$transaction([
    prisma.coachModel.findMany({ where }),
    prisma.coachModel.count({ where }),
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

// GET SINGLE COACH MODEL
const getSingleCoachModelCoachService = async (id: string) => {
  console.log(id);
  const result = await prisma.coachModel.findFirst({
    where: { id },
    include: { coaches: true, seats: true },
  });
  return result;
};

export const CoachModelService = {
  createCoachModelService,
  getCoachModelForCreateCoachService,
  getAllCoachModelCoachService,
  getSingleCoachModelCoachService,
};
