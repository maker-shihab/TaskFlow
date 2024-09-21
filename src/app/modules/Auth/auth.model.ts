import { model, Schema, Types } from "mongoose";
import { RoleType } from "../Role/role.interfeca";
import { IAuth } from "./auth.interface";

const authSchema = new Schema<IAuth>(
  {
    _id: {
      type: Types.ObjectId,
      auto: true,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: RoleType,
    },
    token: {
      type: String,
      select: false,
    },
    authProvider: {
      type: String,
      default: null, // Example authentication provider type
    },
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Auth = model<IAuth>("auth", authSchema);
