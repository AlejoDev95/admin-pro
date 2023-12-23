import { Router } from "express";
import { upload } from "../controllers";
import { validteJWT } from "../middlewares";
import fileupload from "express-fileupload";

const uploadRouter = Router();
uploadRouter.use(fileupload());
uploadRouter.put("/:collection/:id", [validteJWT], upload);

export { uploadRouter };
