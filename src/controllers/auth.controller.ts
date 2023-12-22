import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { UserSchema } from "../models";
import { generateToken } from "../helpers";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userDB = await UserSchema.findOne({ email });

    if (!userDB) {
      res.status(400).json({ ok: true, message: "Incorrect credentials" });
      return;
    }

    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      res.status(400).json({ ok: true, message: "Incorrect credentials" });
      return;
    }
    const token = await generateToken(userDB.id);
    res.status(200).json({ ok: true, token });
  } catch (error) {
    console.error(`Unexpected error when logging in`);
    res
      .status(500)
      .json({ ok: false, message: `Unexpected error when logging in` });
  }
};
