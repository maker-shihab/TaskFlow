import { model, Schema } from "mongoose";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { IUser } from "./user.interface";

const UserSchema = new Schema({
  name: {
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
  role: {
    type: String,
    required: true,
    enum: ENUM_USER_ROLE,
  },
  teams: {
    type: [String],
  },
  address: {
    type: String,
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
      match: /^[0-9]{5}$/,
    },
  },
  phoneNumber: {
    type: String,
    match: /^\+\d{1,15}$/,
  },
  occupations: {
    type: String,
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
