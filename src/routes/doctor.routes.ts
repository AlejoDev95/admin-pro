import { Router } from "express";
import {
  createDoctor,
  getDoctors,
  deleteDoctor,
  updateDoctor,
} from "../controllers";
import { validateFields, validteJWT } from "../middlewares";
import { check } from "express-validator";

const doctorRouter = Router();

doctorRouter.post(
  "/",
  [
    validteJWT,
    check("name", "Name is required").not().isEmpty(),
    check("hospital", "The hospital Id must be valid").isMongoId(),
    validateFields,
  ],
  createDoctor
);
doctorRouter.get("/", validteJWT, getDoctors);
doctorRouter.delete("/:id", validteJWT, deleteDoctor);
doctorRouter.put("/:id", validteJWT, updateDoctor);

export { doctorRouter };
