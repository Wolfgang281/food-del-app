import express from "express";

import {
  login,
  register,
  resetPassword,
  sendOTP,
  verifyOTP,
} from "../controllers/auth.controller.js";

import { validateBody } from "../middlewares/validate.middleware.js";

import {
  loginValidation,
  registerValidation,
} from "../validators/auth.validator.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerValidation), register);
authRouter.post("/login", validateBody(loginValidation), login);
authRouter.post("/send-otp", sendOTP);
authRouter.post("/verify-otp", verifyOTP);
authRouter.post("/reset-password", resetPassword);

export default authRouter;
