import { Router } from "express";
import { StationController } from "./station.controller";
import { PermissionGuard } from "../../middleware/PermissionGuard";
import { AuthGuard } from "../../middleware/AuthGuard";
import { USER_ROLE } from "../../../generated/prisma/enums";

const router = Router();
router.post("/multiple", StationController.CreateMultipleStationController);

// CREATE STATION
router.post("/", StationController.CreateStationController);

// GET STATIONS
router.get(
  "/",
  AuthGuard(USER_ROLE.ADMIN, USER_ROLE.STAFF),
  PermissionGuard("abc"),
  StationController.GetStationsController,
);

// GET SINGLE STATION
router.get("/:id", StationController.GetSingleStationController);
export default router;
