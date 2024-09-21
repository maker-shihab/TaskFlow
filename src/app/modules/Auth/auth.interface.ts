import { Types } from "mongoose";

export type IAuth = {
  _id?: Types.ObjectId;
  userId: String;
  email: string;
  emailVerified: boolean;
  password: string;
  role: string;
  token?: string;
  authProvider?: string;
  isAuthenticated: boolean;
};
