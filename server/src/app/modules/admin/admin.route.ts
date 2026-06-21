import { Router } from "express";
import { AdminController } from "./admin.controller";

const router = Router();

router.get("/", AdminController.GetAdminsController);

router.get("/:id", AdminController.GetAdminController);

export default router;
