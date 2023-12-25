import { Router } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { uploadImage } from "../controllers";

const uploadRouete = Router();
const pathFile = path.join(__dirname, "../../uploads");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, pathFile);
  },
  filename: (_req, file, cb) => {
    const extension = file.originalname.split(".").pop();
    cb(null, `${uuidv4()}.${extension}`);
  },
});

const upload = multer({ storage });

uploadRouete.put("/", upload.single("file"), uploadImage);

export { uploadRouete };
