import mongoose, { Schema } from "mongoose";
import { IAuth } from "./auth.interface";

const authSchema = new Schema<IAuth>(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
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
      // select: false,
    },
    authProvider: {
      type: String,
      default: null,
    },
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

authSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

authSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

authSchema.post("save", function (doc, next) {
  if (doc) {
    doc.password = "";
  }
  next();
});

const Auth = mongoose.model<IAuth>("auth", authSchema);

export default Auth;
