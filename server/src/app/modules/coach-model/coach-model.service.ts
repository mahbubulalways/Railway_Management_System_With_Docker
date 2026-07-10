import { StatusCodes } from "http-status-codes";
import prisma from "../../../helper/prisma";
import { AppError } from "../../error/AppError";
import { ICreateCoachModel } from "./coach-model.interface";
import { generateCoachModelSeats } from "./coach-model.utils";

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
const getAllCoachModelCoachService = async () => {
  const result = await prisma.coachModel.findMany({});
  return result;
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
