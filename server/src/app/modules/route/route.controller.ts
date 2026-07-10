import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../error/AppError";
import { RouteService } from "./route.service";
import sendResponse from "../../../utils/sendResponse";
import { parseListQuery } from "../../../utils/parseListQuery";

// CREATE ROUTE
const createRouteController = catchAsync(async (req, res) => {
  const body = req.body.data;
  const result = await RouteService.createRouteService(body);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Opps! Failed to create route.",
    );
  } else {
    sendResponse(res, {
      message: "Route created successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET ALL ROUTES
const getAllRouteController = catchAsync(async (req, res) => {
  const { page, limit, search } = await parseListQuery(req.query);
  const result = await RouteService.GetAllRouteService({ page, limit, search });

  if (!result.data.length) {
    sendResponse(res, {
      message: "Opps! No route found.",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "Route retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET SINGLE ROUTE AND DETAILS
const getSingleRouteController = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await RouteService.getSingleRouteService(id);

  if (!result) {
    sendResponse(res, {
      message: "Opps! No route found.",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "Route retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

export const RouteController = {
  createRouteController,
  getAllRouteController,
  getSingleRouteController,
};
