import { Router } from "express";
import { check } from "express-validator";

import { validateFields } from "../middlewares";
import { login } from "../controllers";

const authRoute = Router();

authRoute.post(
  "/login",
  [
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

export { authRoute };
