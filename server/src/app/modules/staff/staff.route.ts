import { Router } from "express";
import { AuthGuard } from "../../middleware/AuthGuard";
import { USER_ROLE } from "../../../generated/prisma/enums";
import { StaffController } from "./staff.controller";

const router = Router();
router.get(
  "/",
  AuthGuard(USER_ROLE.ADMIN),
  StaffController.GetAdminsController,
);
export default router;
