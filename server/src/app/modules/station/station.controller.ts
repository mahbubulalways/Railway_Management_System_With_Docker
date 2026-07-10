import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../error/AppError";
import sendResponse from "../../../utils/sendResponse";
import { StationService } from "./station.service";
import { IQuery } from "./station.interface";
import { parseListQuery } from "../../../utils/parseListQuery";

// ====================== PRIVATE ROUTE ========================

// CREATE MULTIPLE STATIONS (PRIVATE ROUTE)
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

// CREATE STATION (PRIVATE ROUTE)
const CreateStationController = catchAsync(async (req, res) => {
  const body = req.body.data;
  const result = await StationService.CreateStationServicePrivate(body);

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

// GET OWN STATION WHO HAVE THE PERMISSION
const GetOwnStationPermissionControllerPrivate = catchAsync(
  async (req, res) => {
    const userId = req.user.userId;
    const result =
      await StationService.GetOwnStationPermissionServicePrivate(userId);
    if (!result) {
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
  },
);

// ====================== PUBLIC ROUTE ========================

// GET ALL STATIONS (PUBLIC ROUTE)
const GetStationsControllerPublic = catchAsync(async (req, res) => {
  const { limit, page, search } = await parseListQuery(req.query);
  const result = await StationService.GetStationServicePublic({
    limit,
    page,
    search,
  });
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
// GET SINGLE STATION (PUBLIC ROUTE)
const GetSingleStationControllerPublic = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await StationService.GetSingleStationServicePublic(id);
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

const GetStationOptionsControllerPublic = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await StationService.GetStationOptionsService();
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
  GetStationsControllerPublic,
  GetSingleStationControllerPublic,
  CreateMultipleStationController,
  GetOwnStationPermissionControllerPrivate,
  GetStationOptionsControllerPublic,
};
