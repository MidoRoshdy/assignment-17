import mongoose, { HydratedDocument, Model, Schema } from "mongoose";
import {
  UserConfirmEmsil,
  UserGender,
  userprovider,
  UserRole,
  UserStatus,
} from "../../common/enums/user.enum";
import { IUser } from "../../common/interface/user.interface";

export type HUserDocument = HydratedDocument<IUser>;

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    confirmEmail: {
      type: String,
      enum: Object.values(UserConfirmEmsil),
      default: UserConfirmEmsil.no,
    },
    gender: {
      type: String,
      enum: Object.values(UserGender),
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
    provider: {
      type: String,
      enum: Object.values(userprovider),
      default: userprovider.system,
    },
  },
  { timestamps: true },
);

export const UserModel: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);
