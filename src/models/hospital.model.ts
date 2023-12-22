import {
  prop,
  getModelForClass,
  modelOptions,
  Ref,
} from "@typegoose/typegoose";
import { User } from "./user.model";

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Hospital {
  @prop({ type: String, required: true, trim: true })
  name: string = "";

  @prop({ type: String, trim: true })
  image?: string = "";

  @prop({ ref: () => User })
  userCreation: Ref<User> | undefined;
}

export const HospitalSchema = getModelForClass(Hospital);
