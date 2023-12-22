import {
  prop,
  getModelForClass,
  modelOptions,
  Ref,
} from "@typegoose/typegoose";
import { User } from "./user.model";
import { Hospital } from "./hospital.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
class Doctor {
  @prop({ type: String, required: true, trim: true })
  name: string = "";

  @prop({ type: String, trim: true })
  image?: string = "";

  @prop({ ref: () => User })
  userCreation: Ref<User> | undefined;

  @prop({ ref: () => Hospital })
  hospital: Ref<Hospital> | undefined;
}

export const DoctorSchema = getModelForClass(Doctor);
