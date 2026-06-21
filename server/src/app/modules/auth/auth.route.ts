import { Router } from "express";
import { VALIDATE_REQUEST } from "../../middleware/validateRequest";
import { AUTH_LOGIN_VALIDATION } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = Router();

router.post(
  "/login",
  VALIDATE_REQUEST(AUTH_LOGIN_VALIDATION),
  AuthController.loginUserToSystemController,
);

export default router;
