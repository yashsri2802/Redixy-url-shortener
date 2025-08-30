import { Router } from "express";
import * as authControllers from "../controllers/auth.controllers.js";

const router = Router();

router
  .route("/register")
  .get(authControllers.getRegisterPage)
  .post(authControllers.postRegister);

router
  .route("/login")
  .get(authControllers.getLoginPage)
  .post(authControllers.postLogin);

router.route("/me").get(authControllers.getMe);
router.route("/logout").get(authControllers.logoutUser);

export const authRoutes = router;
