import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../error/AppError";
import { StaffTypeService } from "./staff-types.service";
import sendResponse from "../../../utils/sendResponse";

// CREATE Staff Type INTO DB
const CreateStaffTypeController = catchAsync(async (req, res) => {
  const body = req.body.data;
  const result = await StaffTypeService.createStaffTypeService(body);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Opps! Failed to create staff type.",
    );
  } else {
    sendResponse(res, {
      message: "Staff type created successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET Staff Type FROM DB
const GetStaffTypesController = catchAsync(async (req, res) => {
  const page = Number(req.query.page) ?? 1;
  const limit = Number(req.query.limit) ?? 10;
  const result = await StaffTypeService.getStaffTypesService({ page, limit });

  if (!result.data.length) {
    sendResponse(res, {
      message: "Opps! No staff type found.",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "Staff type retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET SINGLE Staff Type FROM DB
const GetSingleStaffTypesController = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await StaffTypeService.getSingleStaffTypeService(id);

  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Opps! No Staff type found.");
  } else {
    sendResponse(res, {
      message: "Staff type retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

export const StaffTypeController = {
  CreateStaffTypeController,
  GetStaffTypesController,
  GetSingleStaffTypesController,
};
