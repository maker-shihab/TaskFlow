import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

UserSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const User = model<IUser>("user", UserSchema);
