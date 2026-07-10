import { Router } from "express";
import { RouteController } from "./route.controller";
import { USER_ROLE } from "../../../generated/prisma/enums";
import { AuthGuard } from "../../middleware/AuthGuard";
import { VALIDATE_REQUEST } from "../../middleware/validateRequest";
import { CREATE_ROUTE_SCHEMA } from "./route.validation";

const router = Router();

router.post(
  "/create",
  AuthGuard(USER_ROLE.ADMIN),
  VALIDATE_REQUEST(CREATE_ROUTE_SCHEMA),
  RouteController.createRouteController,
);

// GET ALL ROUTES
router.get(
  "/all",
  AuthGuard(USER_ROLE.ADMIN),
  RouteController.getAllRouteController,
);

//  GET SINGLE ROUTE
router.get(
  "/single/:id",
  AuthGuard(USER_ROLE.ADMIN),
  RouteController.getSingleRouteController,
);
export default router;
