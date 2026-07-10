import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../error/AppError";
import sendResponse from "../../../utils/sendResponse";
import { parseListQuery } from "../../../utils/parseListQuery";
import { TrainService } from "./train.service";

// CREATE TRAIN
const createTrainController = catchAsync(async (req, res) => {
  const body = req.body.data;
  const result = await TrainService.createTrainService(body);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Opps! Failed to create Train.",
    );
  } else {
    sendResponse(res, {
      message: "Train created successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET ALL TRAIN
const getAllTrainController = catchAsync(async (req, res) => {
  const { page, limit, search } = await parseListQuery(req.query);
  const result = await TrainService.getAllTrainService({ page, limit, search });

  if (!result.data.length) {
    sendResponse(res, {
      message: "Opps! No Train found.",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "Train retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET SINGLE TRAIN AND DETAILS
const getSingleTrainController = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await TrainService.getSingleTrainService(id);

  if (!result) {
    sendResponse(res, {
      message: "Opps! No Train found.",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "Train retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// ADD COACH TO TRAIN
const addCoachToTrainController = catchAsync(async (req, res) => {
  const body = req.body.data;
  const result = await TrainService.addCoachToTrainService(body);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Opps! Failed to add coach to Train.",
    );
  } else {
    sendResponse(res, {
      message: "Train coach added successfully",
      statusCode: StatusCodes.OK,
      success: true,
    });
  }
});

export const TrainController = {
  createTrainController,
  getAllTrainController,
  getSingleTrainController,
  addCoachToTrainController,
};
