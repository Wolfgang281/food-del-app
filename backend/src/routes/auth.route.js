import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import {
  loginValidation,
  registerValidation,
} from "../validators/auth.validator.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerValidation), register);
authRouter.post("/login", validateBody(loginValidation), login);

export default authRouter;
