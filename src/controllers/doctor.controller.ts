import { Request, Response } from "express";

export const createDoctor = async (_req: Request, res: Response) => {
  try {
    res.json({ ok: true, message: "createDoctor" });
  } catch (error) {
    console.error(`Unexpected error when creating a doctor, check logs`);
    res.status(500).json({
      ok: false,
      message: `Unexpected error when creating a doctor, check logs`,
    });
  }
};

export const getDoctors = async (_req: Request, res: Response) => {
  try {
    res.json({ ok: true, message: "getDoctors" });
  } catch (error) {
    console.error(`Unexpected error in doctor consultation, check logs`);
    res.status(500).json({
      ok: false,
      message: `Unexpected error in doctor consultation, check logs`,
    });
  }
};

export const deleteDoctor = async (_req: Request, res: Response) => {
  try {
    res.json({ ok: true, message: "deleteDoctor" });
  } catch (error) {
    console.error(`Unexpected error in eliminating a doctors, check logs`);
    res.status(500).json({
      ok: false,
      message: `Unexpected error in eliminating a doctors, check logs`,
    });
  }
};

export const updateDoctor = async (_req: Request, res: Response) => {
  try {
    res.json({ ok: true, message: "updateDoctor" });
  } catch (error) {
    console.error(`Unexpected error in updating the a doctor, check logs`);
    res.status(500).json({
      ok: false,
      message: `Unexpected error in updating the a doctor, check logs`,
    });
  }
};
