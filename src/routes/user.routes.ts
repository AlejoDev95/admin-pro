import { Router } from "express";
import { check } from "express-validator";
import { validateFields, validteJWT } from "../middlewares";
import { createUsers, deleteUser, getUsers, updateUser } from "../controllers";

const userRoute = Router();

userRoute.get("/", validteJWT, getUsers);

userRoute.post(
  "/",
  [
    validteJWT,
    check("name", "Name is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    validateFields,
  ],
  createUsers
);

userRoute.put("/:id", validteJWT, updateUser);

userRoute.delete("/:id", validteJWT, deleteUser);

export { userRoute };
