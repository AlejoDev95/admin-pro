import { prop, getModelForClass } from "@typegoose/typegoose";

class User {
  @prop({ type: String, required: true, trim: true })
  name: string = "";

  @prop({ type: String, required: true, unique: true })
  email: string = "";

  @prop({ type: String, required: true, minlength: 6 })
  password: string = "";

  @prop({ type: String, lowercase: true })
  image?: string = "";

  @prop({ type: String, default: "USER_ROLE" })
  role?: string = "";

  @prop({ type: Boolean, default: false })
  google?: boolean = false;
}

export const UserSchema = getModelForClass(User);

UserSchema.schema.set('toJSON', {
  transform: (_, ret) => {
    ret.uid = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.password;
  },
});




