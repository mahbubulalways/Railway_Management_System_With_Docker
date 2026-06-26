import { Router } from "express";
import { StaffTypeController } from "./staff-types.controller";
import { AuthGuard } from "../../middleware/AuthGuard";
import { USER_ROLE } from "../../../generated/prisma/enums";

const router = Router();
router.post(
  "/create",
  AuthGuard(USER_ROLE.ADMIN),
  StaffTypeController.CreateStaffTypeController,
);

// GET STAFF TYPES
router.get(
  "/all",
  AuthGuard(USER_ROLE.ADMIN),
  StaffTypeController.GetStaffTypesController,
);

// GET SINGLE STAFF TYPES
router.get(
  "/single/:id",
  AuthGuard(USER_ROLE.ADMIN),
  StaffTypeController.GetSingleStaffTypesController,
);

export default router;
