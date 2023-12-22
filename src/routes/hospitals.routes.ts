import { Router } from "express";
import {
  createHospital,
  getHospital,
  deleteHospital,
  updateHospitals,
} from "../controllers";
import { validteJWT } from "../middlewares";

const hospitalsRouter = Router();

hospitalsRouter.post("/", validteJWT, createHospital);
hospitalsRouter.get("/", validteJWT, getHospital);
hospitalsRouter.delete("/:id", validteJWT, deleteHospital);
hospitalsRouter.put("/:id", validteJWT, updateHospitals);

export { hospitalsRouter };
