import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import { AppError } from "../../error/AppError";
import sendResponse from "../../../utils/sendResponse";
import { UserService } from "./user.service";

// CREATE ADMIN INTO DB
const CreateAdminController = catchAsync(async (req, res) => {
  const body = req.body.data;
  const result = await UserService.CreateAdminService(body);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Opps! Failed to create admin.",
    );
  } else {
    sendResponse(res, {
      message: "A verification code sent on your email.",
      statusCode: StatusCodes.OK,
      success: true,
    });
  }
});

// CREATE ADMIN INTO DB
const CreateStaffController = catchAsync(async (req, res) => {
  const body = req.body.data;
  const result = await UserService.CreateStaffService(body);
  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Opps! Failed to create staff.",
    );
  } else {
    sendResponse(res, {
      message: "A verification code sent on your email.",
      statusCode: StatusCodes.OK,
      success: true,
    });
  }
});

// VERIFY USER
const VerifyUserController = catchAsync(async (req, res) => {
  const body = req.body.data;
  const result = await UserService.VerifyUserService(body.email, body.code);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email verification failed.");
  } else {
    sendResponse(res, {
      message: "Email verified successfully.",
      statusCode: StatusCodes.OK,
      success: true,
    });
  }
});

// RESEND VERIFICATION CODE
const ResendVerificationCodeController = catchAsync(async (req, res) => {
  const body = req.body.data;
  const result = await UserService.ResendVerificationCodeService(body.email);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Email verification failed.");
  } else {
    sendResponse(res, {
      message: "A verification code sent on your email.",
      statusCode: StatusCodes.OK,
      success: true,
    });
  }
});

export const UserController = {
  CreateAdminController,
  VerifyUserController,
  ResendVerificationCodeController,
  CreateStaffController,
};
