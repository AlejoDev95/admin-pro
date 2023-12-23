import { Request, Response } from "express";
import { HospitalSchema } from "../models";

export const createHospital = async (req: Request, res: Response) => {
  try {
    const uid = req.uid;
    const hospitalSchema = new HospitalSchema({
      userCreation: uid,
      ...req.body,
    });
    const hospitalCreated = await hospitalSchema.save();
    res.json({ ok: true, hospital: hospitalCreated });
  } catch (error) {
    console.error(`Unexpected error when creating a hospital, check logs`);
    res.status(500).json({
      ok: false,
      message: `Unexpected error when creating a hospital, check logs`,
    });
  }
};

export const getHospital = async (_req: Request, res: Response) => {
  try {
    const listOfHospitals = await HospitalSchema.find().populate("userCreation", "name email -_id");
    res.json({ ok: true, listOfHospitals });
  } catch (error) {
    console.error(`Unexpected error in hospital consultation, check logs`, error);
    res.status(500).json({
      ok: false,
      message: `Unexpected error in hospital consultation, check logs`,
    });
  }
};

export const deleteHospital = async (_req: Request, res: Response) => {
  try {
    res.json({ ok: true, message: "deleteHospital" });
  } catch (error) {
    console.error(`Unexpected error in eliminating hospitals, check logs`);
    res.status(500).json({
      ok: false,
      message: `Unexpected error in eliminating hospitals, check logs`,
    });
  }
};

export const updateHospitals = async (_req: Request, res: Response) => {
  try {
    res.json({ ok: true, message: "updateHospital" });
  } catch (error) {
    console.error(`Unexpected error in updating the hospitals, check logs`);
    res.status(500).json({
      ok: false,
      message: `Unexpected error in updating the hospitals, check logs`,
    });
  }
};
