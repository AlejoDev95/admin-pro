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
  userCreation!: Ref<User>;

  @prop({ ref: () => Hospital })
  hospital!: Ref<Hospital>;
}

const DoctorSchema = getModelForClass(Doctor);

DoctorSchema.schema.set("toJSON", {
  transform: (_, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

export { Doctor, DoctorSchema };
