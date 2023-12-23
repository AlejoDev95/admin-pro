import { Router } from "express";
import { validteJWT } from "../middlewares";
import { searchByCollection, totalSearch } from "../controllers";

const searchRoute = Router();

searchRoute.get("/total/:query", validteJWT, totalSearch);
searchRoute.get("/collection/:collection/:query", validteJWT, searchByCollection);

export { searchRoute  };
