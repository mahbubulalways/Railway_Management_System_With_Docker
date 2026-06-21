import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { StaffService } from "./staff.service";

// GET ALL ADMIN
const GetAdminsController = catchAsync(async (req, res) => {
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

export const StaffController = { GetAdminsController };
