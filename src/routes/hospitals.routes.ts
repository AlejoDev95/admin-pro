import { Router } from "express";
import {
  createHospital,
  getHospital,
  deleteHospital,
  updateHospital,
} from "../controllers";
import { validteJWT } from "../middlewares";

const hospitalsRouter = Router();

hospitalsRouter.post("/", validteJWT, createHospital);
hospitalsRouter.get("/", validteJWT, getHospital);
hospitalsRouter.delete("/:id", validteJWT, deleteHospital);
hospitalsRouter.put("/:id", validteJWT, updateHospital);

export { hospitalsRouter };
