import { Router } from "express";
import {
  createHospital,
  getHospital,
  deleteHospital,
  updateHospitals,
} from "../controllers";
import { validteJWT } from "../middlewares";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validateFields";

const hospitalsRouter = Router();

hospitalsRouter.post(
  "/",
  [
    validteJWT,
    check("name", "Name is required").not().isEmpty(),
    validateFields,
  ],
  createHospital
);
hospitalsRouter.get("/", validteJWT, getHospital);
hospitalsRouter.delete("/:id", validteJWT, deleteHospital);
hospitalsRouter.put("/:id", validteJWT, updateHospitals);

export { hospitalsRouter };
