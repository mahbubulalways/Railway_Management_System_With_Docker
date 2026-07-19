import { Router } from "express";
import { ScheduleController } from "./schedule.controller";
import { AuthGuard } from "../../middleware/AuthGuard";
import { USER_ROLE } from "../../../generated/prisma/enums";

const router = Router();
// CREATE SCHEDULE
router.post(
  "/create",
  AuthGuard(USER_ROLE.ADMIN),
  ScheduleController.createScheduleController,
);

// GET ALL SCHEDULES
router.get(
  "/all",
  // AuthGuard(USER_ROLE.ADMIN),
  ScheduleController.getAllScheduleController,
);

// GET TRAIN-ROUTE OPTIONS
router.get(
  "/train-route-options",
  AuthGuard(USER_ROLE.ADMIN),
  ScheduleController.getTrainAndRouteOptionController,
);

// GET SINGLE SCHEDULE
router.get(
  "/single/:id",
  // AuthGuard(USER_ROLE.ADMIN),
  ScheduleController.getSingleScheduleController,
);
export default router;
