import { Router } from "express";
import { CoachController } from "./coach.controller";
import { AuthGuard } from "../../middleware/AuthGuard";
import { USER_ROLE } from "../../../generated/prisma/enums";

const router = Router();

// CREATE COACH
router.post(
  "/create",
  AuthGuard(USER_ROLE.ADMIN),
  CoachController.createCoachController,
);

// GET ALL COACH
router.get(
  "/all",
  AuthGuard(USER_ROLE.ADMIN),
  CoachController.getAllCoachController,
);

// OPTIONS
router.get(
  "/options",
  // AuthGuard(USER_ROLE.ADMIN),
  CoachController.getCoachOptionController,
);

// GET SINGLE COACH
router.get(
  "/single/:id",
  AuthGuard(USER_ROLE.ADMIN),
  CoachController.getSingleCoachController,
);

export default router;
