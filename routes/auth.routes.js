import { Router } from "express";
import * as authControllers from "../controllers/auth.controllers.js";

const router = Router();

router.get("/", authControllers.getHomePage);

router
  .route("/register")
  .get(authControllers.getRegisterPage)
  .post(authControllers.postRegister);

router
  .route("/login")
  .get(authControllers.getLoginPage)
  .post(authControllers.postLogin);

export const authRoutes = router;
