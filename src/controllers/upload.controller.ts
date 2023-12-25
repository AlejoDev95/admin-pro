import { Request, Response } from "express";
import path from "path";
import sharp from "sharp";

const optimizePath = path.join(__dirname, "../../optimize");
const helperImage = (filePath: string, fileName: string, size = 300) => {
  return sharp(filePath).resize(size).toFile(`${optimizePath}/${fileName}`);
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    if (req.file) {
      helperImage(req.file?.path, `xs-resize-${req.file.filename}`, 50);
      helperImage(req.file?.path, `sm-resize-${req.file.filename}`, 150);
      helperImage(req.file?.path, `md-resize-${req.file.filename}`, 300);
      helperImage(req.file?.path, `lg-resize-${req.file.filename}`, 500);
    }
    res.send("imagen Uploading");
  } catch (error) {
    console.error(`Unexpected error when uploading images`);
    res
      .status(500)
      .json({ ok: false, message: `Unexpected error when uploading images` });
  }
};
