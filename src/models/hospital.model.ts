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

  @prop({ ref: () => User, required: true })
    userCreation!: Ref<User>;
}

const HospitalSchema = getModelForClass(Hospital);

HospitalSchema.schema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export { HospitalSchema };
