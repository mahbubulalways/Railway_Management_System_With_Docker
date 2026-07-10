import { Router } from "express";
import { TrainController } from "./train.controller";
import { VALIDATE_REQUEST } from "../../middleware/validateRequest";
import { CREATE_TRAIN_SCHEMA } from "./train.validation";
import { AuthGuard } from "../../middleware/AuthGuard";
import { USER_ROLE } from "../../../generated/prisma/enums";

const router = Router();

router.post(
  "/create",
  VALIDATE_REQUEST(CREATE_TRAIN_SCHEMA),
  // AuthGuard(USER_ROLE.ADMIN),
  TrainController.createTrainController,
);

// ADD COACH TO TRAIN
router.post(
  "/add-coach",
  // AuthGuard(USER_ROLE.ADMIN),
  TrainController.addCoachToTrainController,
);

router.get(
  "/all",
  // AuthGuard(USER_ROLE.ADMIN),
  TrainController.getAllTrainController,
);

export default router;
