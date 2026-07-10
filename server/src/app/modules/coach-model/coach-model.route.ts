import { Router } from "express";
import { CoachModelController } from "./coach-model.controller";
import { AuthGuard } from "../../middleware/AuthGuard";
import { USER_ROLE } from "../../../generated/prisma/enums";
import { VALIDATE_REQUEST } from "../../middleware/validateRequest";
import { CREATE_COACH_MODEL_SCHEMA } from "./coach-model.validation";

const router = Router();

// CREATE COACH MODEL
router.post(
  "/create",
  AuthGuard(USER_ROLE.ADMIN),
  VALIDATE_REQUEST(CREATE_COACH_MODEL_SCHEMA),
  CoachModelController.createCoachModelController,
);

// GET COACH MODEL OPTIONS FOR CREATE NEW COACH
router.get(
  "/options",
  AuthGuard(USER_ROLE.ADMIN),
  CoachModelController.getCoachModelForCreateCoachController,
);

// GET ALL COACH MODEL
router.get(
  "/all",
  AuthGuard(USER_ROLE.ADMIN),
  CoachModelController.getAllCoachModelCoachCoachController,
);

// GET SINGLE COACH MODEL
router.get(
  "/single/:id",
  AuthGuard(USER_ROLE.ADMIN),
  CoachModelController.getSingleCoachModelCoachController,
);

export default router;
