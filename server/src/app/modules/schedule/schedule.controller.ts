import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { ScheduleService } from "./schedule.service";
import { AppError } from "../../error/AppError";
import { parseListQuery } from "../../../utils/parseListQuery";

// CREATE SCHEDULE
const createScheduleController = catchAsync(async (req, res) => {
  const body = req.body.data;
  const result = await ScheduleService.createScheduleService(body);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Opps! Failed to create Schedule.",
    );
  } else {
    sendResponse(res, {
      message: "Schedule created successfully",
      statusCode: StatusCodes.OK,
      success: true,
    });
  }
});

//  GET TRAIN ROUTE OPTIONS FOR CREATE SCHEDULE
const getTrainAndRouteOptionController = catchAsync(async (req, res) => {
  const result = await ScheduleService.getTrainAndRouteOptionService();
  if (!result.routes.length || !result.routes.length) {
    sendResponse(res, {
      message: "Opps! No data found.",
      statusCode: StatusCodes.OK,
      success: true,
      data: { trains: [], routes: [] },
    });
  } else {
    sendResponse(res, {
      message: "Data retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET ALL SCHEDULES
const getAllScheduleController = catchAsync(async (req, res) => {
  const { page, limit, search } = await parseListQuery(req.query);
  const result = await ScheduleService.getAllScheduleService({
    page,
    limit,
    search,
  });
  if (!result.data.length) {
    sendResponse(res, {
      message: "Opps! No Schedules found.",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "Schedules retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET SINGLE SCHEDULE
const getSingleScheduleController = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await ScheduleService.getSingleScheduleService(id);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Opps! No schedule found.");
  } else {
    sendResponse(res, {
      message: "Schedule found successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

export const ScheduleController = {
  getTrainAndRouteOptionController,
  createScheduleController,
  getAllScheduleController,
  getSingleScheduleController,
};
