import { Request, Response } from "express";
import { DoctorSchema, HospitalSchema, UserSchema } from "../models";

export const totalSearch = async (req: Request, res: Response) => {
  try {
    const query = req.params.query;
    const regex = new RegExp(query, "i");

    const [listOfUsers, listOfHospitals, listOfDoctors] = await Promise.all([
      await UserSchema.find({ name: regex }),
      await HospitalSchema.find({ name: regex }).populate(
        "userCreation",
        "-_id name"
      ),
      await DoctorSchema.find({ name: regex })
        .populate("userCreation", "-_id name")
        .populate("hospital", "-_id name"),
    ]);
    res
      .status(200)
      .json({ ok: true, listOfUsers, listOfHospitals, listOfDoctors });
  } catch (error) {
    console.error(`Unexpected error when querying all tables`, error);
    res.status(500).json({
      ok: false,
      message: `Unexpected error when querying all tables, check logs`,
    });
  }
};

export const searchByCollection = async (req: Request, res: Response) => {
  try {
    const collection = req.params.collection;
    const query = req.params.query;
    const regex = new RegExp(query, "i");
    let result: unknown[] = [];

    switch (collection) {
      case "users":
        result = await UserSchema.find({ name: regex });
        break;

      case "hospitals":
        result = await HospitalSchema.find({ name: regex }).populate(
          "userCreation",
          "-_id name"
        );
        break;
      case "doctors":
        result = await DoctorSchema.find({ name: regex })
          .populate("userCreation", "-_id name")
          .populate("hospital", "-_id name");
        break;

      default:
        res
          .status(400)
          .json({
            ok: false,
            message:
              "Collection not allowed, only users, hospitals and doctors value are accepted",
          });
        break;
    }

    res.status(200).json({ ok: true, result });
  } catch (error) {
    console.error(`Unexpected error when searching by collection`, error);
    res.status(500).json({
      ok: false,
      message: `Unexpected error when searching by collection, check error`,
    });
  }
};
