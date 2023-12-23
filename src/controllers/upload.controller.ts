import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import fileUpload from "express-fileupload";
import path from "path";
import { updateImage } from "../helpers";
import { isValidObjectId } from "mongoose";
import { DoctorSchema, HospitalSchema, UserSchema } from "../models";

const validCollections = ["doctors", "hospitals", "users"];
const validExtension = ["png", "jpg", "jpeg", "gif"];

export const upload = async (req: Request, res: Response) => {
  const { collection, id } = req.params;
  let schemaSelected: any;
  if (!isValidObjectId(id)) {
    res.status(400).json({ ok: false, message: `the id ${id} is invalid` });
    return;
  }

  // Validating collection
  if (!validCollections.includes(collection)) {
    res.status(400).json({
      ok: true,
      message: `The name of the collection is no valid. Only the following are accepted ${validCollections.toString()}`,
    });
    return;
  }

  switch (collection) {
    case "doctors":
      schemaSelected = await DoctorSchema.findById(id);
      break;
    case "hospitals":
      schemaSelected = await HospitalSchema.findById(id);
      break;
    case "users":
      schemaSelected = await UserSchema.findById(id);
      break;
  }

  if (!schemaSelected) {
    res
      .status(400)
      .json({ ok: false, message: `there is not ${collection} with id ${id}` });
    return;
  }

  // validating file existence
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).json({ ok: false, messages: "No files were uploaded." });
    return;
  }

  // getting the file extension
  const image = req.files.image as fileUpload.UploadedFile;
  const nameCut = image.name.split(".");
  const fileExtension = nameCut[nameCut.length - 1];

  // validating file extension
  if (!validExtension.includes(fileExtension)) {
    res.status(400).json({
      ok: true,
      message: `The file extension is not valid. Only the following are accepted ${validExtension.toString()}`,
    });
    return;
  }

  // Generating random image name
  const fileName = `${uuidv4()}.${fileExtension}`;
  // path to save the image
  const destinationPath = path.join(__dirname, "../../uploads");
  const uploadPath = `${destinationPath}/${collection}/${fileName}`;

  // Saving the image
  image.mv(uploadPath, (error) => {
    if (error) {
      console.error("Error loading image", error);
      res.status(500).json({
        ok: false,
        message: "Error loading image",
      });
      return;
    }

    updateImage({
      type: collection as "doctors" | "hospitals" | "users",
      schemaSelected,
      fileName,
    });

    res
      .status(200)
      .json({ ok: true, message: "File successfully uploaded", fileName });
  });
};
