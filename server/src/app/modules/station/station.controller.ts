import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../error/AppError";
import sendResponse from "../../../utils/sendResponse";
import { StationService } from "./station.service";
import { IQuery } from "./station.interface";

// CREATE MULTIPLE STATIONS
const CreateMultipleStationController = catchAsync(async (req, res) => {
  const body = req.body.data;
  const result = await StationService.CreateMultipleStationService(body);

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Opps! Failed to create station.",
    );
  } else {
    sendResponse(res, {
      message: "Station created successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// CREATE STATION
const CreateStationController = catchAsync(async (req, res) => {
  const body = req.body.data;
  const result = await StationService.CreateStationService(body);

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Opps! Failed to create station.",
    );
  } else {
    sendResponse(res, {
      message: "Station created successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET ALL STATIONS
const GetStationsController = catchAsync(async (req, res) => {
  const query = { ...req.query } as IQuery;
  const result = await StationService.GetStationService(query);
  if (!result.data.length) {
    sendResponse(res, {
      message: "Opps! No station found.",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "Stations retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET SINGLE STATION
const GetSingleStationController = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await StationService.GetSingleStationService(id);
  if (!result) {
    sendResponse(res, {
      message: "Opps! No station found.",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "Station retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

export const StationController = {
  CreateStationController,
  GetStationsController,
  GetSingleStationController,
  CreateMultipleStationController,
};
