import { Types } from "mongoose";
import { ENUM_USER_ROLE } from "../../../enums/user";

export type IAuth = {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  email: string;
  emailVerified: boolean;
  password: string;
  authProvider?: string;
  isAuthenticated: boolean;
  isDeleted: boolean;
};

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  authToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: ENUM_USER_ROLE;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
