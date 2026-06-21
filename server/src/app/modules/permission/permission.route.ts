import { Router } from "express";
import { VALIDATE_REQUEST } from "../../middleware/validateRequest";
import { PERMISSION_VALIDATION } from "./permission.validation";
import { PermissionController } from "./permission.controller";
import { AuthGuard } from "../../middleware/AuthGuard";

const router = Router();

// CREATE PERMISSION
router.post(
  "/",
  AuthGuard("ADMIN"),
  VALIDATE_REQUEST(PERMISSION_VALIDATION),
  PermissionController.CreatePermissionController,
);

// GET PERMISSION FROM DB
router.get(
  "/",
  AuthGuard("ADMIN"),
  PermissionController.GetPermissionsController,
);

// UPDATE PERMISSION IN DB
router.get(
  "/update/:id",
  VALIDATE_REQUEST(PERMISSION_VALIDATION),
  PermissionController.UpdatePermissionController,
);

// HARD DELETE PERMISSION FROM DB
router.delete(
  "/force-delete/:id",
  PermissionController.HardDeletePermissionController,
);

export default router;
