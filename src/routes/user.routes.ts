import { Router } from 'express';
import { check } from "express-validator";
import { validateFields } from '../middlewares';
import { createUsers, deleteUser, getUsers, updateUser } from '../controllers';

export const userRoute = Router();

userRoute.get("/", getUsers);

userRoute.post("/",[
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    validateFields
],createUsers);

userRoute.put("/:id", updateUser);

userRoute.delete("/:id", deleteUser);