import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserSchema } from "../models";
import { generateToken } from "../helpers";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const listOfUsers = await UserSchema.find();
    res.status(200).json({ ok: true, listOfUsers });
  } catch (error) {
    console.error(`Unexpected error querying, check logs: ${error}`);
    res
      .status(500)
      .json({ ok: false, user: "Unexpected error querying, check logs" });
  }
};

export const createUsers = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const emailExists = await UserSchema.findOne({ email });
    if (emailExists) {
      res.status(400).json({
        ok: false,
        message: `There is already a user with the email '${email}'`,
      });
      return;
    }

    const salt = bcrypt.genSaltSync();
    const user = new UserSchema(req.body);
    user.password = bcrypt.hashSync(password, salt);
    const token = await generateToken(user.id);
    const newUser = await user.save();
    res.status(200).json({ ok: true, user: newUser, token });
  } catch (error) {
    console.error(`Unexpected error creating user: ${error}`);
    res
      .status(500)
      .json({ ok: false, user: "Unexpected error creating user, check logs" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const uid = req.params.id;
  try {
    const userDB = await UserSchema.findById(uid);

    if (!userDB) {
      res
        .status(400)
        .json({ ok: true, message: `The user does not exist for id ${uid}` });
      return;
    }

    const { password, role, email, google, ...fields } = req.body;

    if (email !== userDB.email) {
      const emailExist = await UserSchema.findOne({ email });
      if (emailExist) {
        res.status(400).json({
          ok: true,
          message: `There is already a user with email ${email}`,
        });
        return;
      }
    }

    fields.email = email;

    const updatedUser = await UserSchema.findByIdAndUpdate(uid, fields, {
      new: true,
    });
    res.status(200).json({ ok: true, user: updatedUser });
  } catch (error) {
    console.error(`Unexpected error when updating, check log`, error);
    res.status(500).json({
      ok: false,
      message: `Unexpected error when updating, check log`,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userExist = await UserSchema.findById(id);
    if (!userExist) {
      res.status(400).json({
        ok: false,
        message: `The user does not exist for id ${id}`,
      });
      return;
    }
    const userDeleted = await UserSchema.findByIdAndDelete(id);
    res.status(200).json({ ok: true, user: userDeleted });
  } catch (error) {
    console.error(`Unexpected error when deleting a user`);
    res
      .status(500)
      .json({ ok: false, message: `Unexpected error when deleting a user` });
  }
};
