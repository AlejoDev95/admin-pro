import { Request, Response } from "express";

export const createHospital = async (_req: Request, res: Response) => {
  try {
    res.json({ ok: true, message: "CreateHospital" });
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
    res.json({ ok: true, message: "getHospital" });
  } catch (error) {
    console.error(`Unexpected error in hospital consultation, check logs`);
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
