import { Router } from "express";
import { StationController } from "./station.controller";
import { PermissionGuard } from "../../middleware/PermissionGuard";
import { AuthGuard } from "../../middleware/AuthGuard";
import { USER_ROLE } from "../../../generated/prisma/enums";
import { STAFF_PERMISSION } from "../permission/permission.interface";
import { VALIDATE_REQUEST } from "../../middleware/validateRequest";
import { STATION_VALIDATION_SCHEMA } from "./station.validation";

const router = Router();
router.post(
  "/multiple",
  AuthGuard(USER_ROLE.ADMIN),
  StationController.CreateMultipleStationController,
);

// CREATE STATION PRIVATE ROUTE
router.post(
  "/create",
  AuthGuard(USER_ROLE.ADMIN),
  VALIDATE_REQUEST(STATION_VALIDATION_SCHEMA.CREATE_STATION_VALIDATION),
  StationController.CreateStationController,
);

// GET OWN STATION (PRIVATE ROUTE) (PERMISSION)
router.get(
  "/",
  AuthGuard(USER_ROLE.STAFF),
  PermissionGuard(STAFF_PERMISSION.VIEW_STATION),
  StationController.GetOwnStationPermissionControllerPrivate,
);

// GET STATION OPTIONS
router.get(
  "/options",
  AuthGuard(USER_ROLE.ADMIN),
  StationController.GetStationOptionsControllerPublic,
);

// GET STATIONS (PUBLIC ROUTE)
router.get("/public", StationController.GetStationsControllerPublic);

// GET SINGLE STATION (PUBLIC ROUTE)
router.get("/public/:id", StationController.GetSingleStationControllerPublic);

export default router;
