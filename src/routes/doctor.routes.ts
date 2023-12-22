import { Router } from "express";
import {
  createDoctor,
  getDoctors,
  deleteDoctor,
  updateDoctor,
} from "../controllers";
import { validteJWT } from "../middlewares";

const doctorRouter = Router();

doctorRouter.post("/", validteJWT, createDoctor);
doctorRouter.get("/", validteJWT, getDoctors);
doctorRouter.delete("/:id", validteJWT, deleteDoctor);
doctorRouter.put("/:id", validteJWT, updateDoctor);

export { doctorRouter };
