import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { StaffService } from "./staff.service";
import { AppError } from "../../error/AppError";

// GET ALL Staff
const GetStaffController = catchAsync(async (req, res) => {
  const result = await StaffService.GetStaffService();
  if (!result.length) {
    sendResponse(res, {
      message: "Opps! No staff found.",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "Staff retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET ALL Staff
const GetSingleStaffController = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await StaffService.GetSingleStaffService(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Opps! No staff found.");
  } else {
    sendResponse(res, {
      message: "Staff retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

export const StaffController = { GetStaffController, GetSingleStaffController };
