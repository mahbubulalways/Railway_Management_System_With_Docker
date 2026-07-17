import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../error/AppError";
import { CoachModelService } from "./coach-model.service";
import sendResponse from "../../../utils/sendResponse";
import { parseListQuery } from "../../../utils/parseListQuery";

// CREATE PERMISSION INTO DB
const createCoachModelController = catchAsync(async (req, res) => {
  const body = req.body.data;
  const result = await CoachModelService.createCoachModelService(body);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Opps! Failed to create coach model.",
    );
  } else {
    sendResponse(res, {
      message: "Coach model created successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET COACH MODEL OPTIONS FOR CREATE COACH
const getCoachModelForCreateCoachController = catchAsync(async (req, res) => {
  const result = await CoachModelService.getCoachModelForCreateCoachService();
  if (!result.length) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Opps! Failed to find coach model.",
    );
  } else {
    sendResponse(res, {
      message: "Coach model found successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET ALL COACH MODEL
const getAllCoachModelCoachCoachController = catchAsync(async (req, res) => {
  const { page, limit, search } = await parseListQuery(req.query);
  const result = await CoachModelService.getAllCoachModelCoachService({
    page,
    limit,
    search,
  });
  if (!result.data.length) {
    sendResponse(res, {
      message: "Opps! Failed to find coach model.",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "Coach model found successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET SINGLE COACH MODEL
const getSingleCoachModelCoachController = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  console.log(id);
  const result = await CoachModelService.getSingleCoachModelCoachService(id);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Opps! Failed to find coach model.",
    );
  } else {
    sendResponse(res, {
      message: "Coach model found successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

export const CoachModelController = {
  createCoachModelController,
  getCoachModelForCreateCoachController,
  getAllCoachModelCoachCoachController,
  getSingleCoachModelCoachController,
};
