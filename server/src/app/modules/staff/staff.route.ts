import { Router } from "express";
import { AuthGuard } from "../../middleware/AuthGuard";
import { USER_ROLE } from "../../../generated/prisma/enums";
import { StaffController } from "./staff.controller";

const router = Router();
router.get("/", AuthGuard(USER_ROLE.ADMIN), StaffController.GetStaffController);
router.get(
  "/single-staff/:id",
  AuthGuard(USER_ROLE.ADMIN),
  StaffController.GetStaffController,
);

export default router;
