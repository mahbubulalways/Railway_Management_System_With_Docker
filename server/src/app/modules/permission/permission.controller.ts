import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { AppError } from "../../error/AppError";
import { PermissionService } from "./permission.service";
import { parseListQuery } from "../../../utils/parseListQuery";

// CREATE PERMISSION INTO DB
const CreatePermissionController = catchAsync(async (req, res) => {
  const body = req.body.data;
  const result = await PermissionService.CreatePermissionService(body);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Opps! Failed to create permission.",
    );
  } else {
    sendResponse(res, {
      message: "Permission created successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// GET PERMISSION FROM DB
const GetPermissionsController = catchAsync(async (req, res) => {
  const { limit, page, search } = await parseListQuery(req.query);

  const result = await PermissionService.GetPermissionsService({
    page,
    limit,
    search,
  });
  if (!result.data.length) {
    sendResponse(res, {
      message: "Opps! No permission found.",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "Permission retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

//  GET ALL PERMISSION FOR CREATE STAFF TYPE
const GetAllPermissionsForStaffTypeController = catchAsync(async (req, res) => {
  const result = await PermissionService.GetAllPermissionsForStaffTypeService();
  if (!result.length) {
    sendResponse(res, {
      message: "Opps! No permission found.",
      statusCode: StatusCodes.OK,
      success: true,
      data: [],
    });
  } else {
    sendResponse(res, {
      message: "Permission retrieved successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// UPDATE PERMISSION INTO DB BY ID
const UpdatePermissionController = catchAsync(async (req, res) => {
  const body = req.body.data;
  const id = req.params.id as string;
  const result = await PermissionService.UpdatePermissionServivce(id, body);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Opps! Failed to update permission.",
    );
  } else {
    sendResponse(res, {
      message: "Permission updated successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

// HARD DELETE PERMISSION INTO DB BY ID
const HardDeletePermissionController = catchAsync(async (req, res) => {
  const id = req.params.id as string;
  const result = await PermissionService.HardDeleteRoleServivce(id);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Opps! Failed to delete permission.",
    );
  } else {
    sendResponse(res, {
      message: "Permission deleted successfully",
      statusCode: StatusCodes.OK,
      success: true,
      data: result,
    });
  }
});

export const PermissionController = {
  CreatePermissionController,
  GetPermissionsController,
  UpdatePermissionController,
  HardDeletePermissionController,
  GetAllPermissionsForStaffTypeController,
};
