import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AdminService } from "./admin.service";
import { AppError } from "../../error/AppError";

// GET ALL ADMIN
const GetAdminsController = catchAsync(async (req, res) => {
  const result = await AdminService.GetAdminsService();
  if (!result.data.length) {
    sendResponse(res, {
      message: "Opps! No admins found.",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "Admin retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET SINGLE ADMIN
const GetAdminController = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await AdminService.GetAdminService(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Opps! No admin found.");
  } else {
    sendResponse(res, {
      message: "Admin retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET SINGLE ADMIN
const UpdateAdminController = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const body = req.body.data;
  const result = await AdminService.GetAdminService(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Opps! No admin found.");
  } else {
    sendResponse(res, {
      message: "Admin retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

export const AdminController = {
  GetAdminsController,
  GetAdminController,
  UpdateAdminController,
};
