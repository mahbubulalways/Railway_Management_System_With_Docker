import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../error/AppError";
import { CoachService } from "./coach.service";
import sendResponse from "../../../utils/sendResponse";
import { parseListQuery } from "../../../utils/parseListQuery";

const createCoachController = catchAsync(async (req, res) => {
  const body = req.body.data;
  const result = await CoachService.createCoachService(body);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Opps! Failed to create coach.",
    );
  } else {
    sendResponse(res, {
      message: "Coach created successfully",
      statusCode: StatusCodes.OK,
      success: true,
    });
  }
});

// GET ALL COACH
const getAllCoachController = catchAsync(async (req, res) => {
  const { page, limit, search } = await parseListQuery(req.query);
  const result = await CoachService.getAllCoachService({
    page,
    limit,
    search,
  });
  if (!result.data.length) {
    sendResponse(res, {
      message: "Coach not found",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "Coach  found successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET COACH OPTIONS
const getCoachOptionController = catchAsync(async (req, res) => {
  const result = await CoachService.getCoachOptionService();
  if (!result.length) {
    sendResponse(res, {
      message: "Coach not found",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "Coach  found successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET SINGLE COACH
const getSingleCoachController = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  console.log(id);
  const result = await CoachService.getSingleCoachService(id);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Opps! Failed to find coach .");
  } else {
    sendResponse(res, {
      message: "Coach found successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

export const CoachController = {
  createCoachController,
  getAllCoachController,
  getSingleCoachController,
  getCoachOptionController,
};
