import { Router } from "express";
import { VALIDATE_REQUEST } from "../../middleware/validateRequest";
import { USER_VALIDATION } from "./user.validation";
import { UserController } from "./user.controller";

const router = Router();
router.post(
  "/create-admin",
  VALIDATE_REQUEST(USER_VALIDATION.CREATE_ADMIN_VALIDATION),
  UserController.CreateAdminController,
);

router.post(
  "/create-staff",
  // VALIDATE_REQUEST(USER_VALIDATION.CREATE_ADMIN_VALIDATION),
  UserController.CreateStaffController,
);

// VERIFY USER
router.patch(
  "/verify",
  VALIDATE_REQUEST(USER_VALIDATION.VERIFY_USER_VALIDATION),
  UserController.VerifyUserController,
);

// RESEND VERIFICATION CODE
router.patch(
  "/resend-otp",
  VALIDATE_REQUEST(USER_VALIDATION.RESEND_VERIFICATION_CODE_VALIDATION),
  UserController.ResendVerificationCodeController,
);

export default router;
