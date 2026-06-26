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
  "/all",
  AuthGuard("ADMIN"),
  PermissionController.GetPermissionsController,
);

// GET PERMISSION FROM DB FOR CREARE STAFF TYTPE
router.get(
  "/all-permissions",
  AuthGuard("ADMIN"),
  PermissionController.GetAllPermissionsForStaffTypeController,
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
