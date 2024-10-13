import jwt from "jsonwebtoken";
import { IUser } from "../app/modules/Users/user.interface";
import config from "../config";

export const generateAccessToken = (user: IUser) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    config.jwt_secret as string,
    { expiresIn: "1h" }
  );
};

export const generateRefreshToken = (user: IUser) => {
  return jwt.sign({ id: user._id }, config.jwt_refresh_secret as string, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string) => {
  const tokenParts = token.split(" ");
  if (tokenParts.length === 2) {
    return jwt.verify(tokenParts[1], config.jwt_secret as string);
  }
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.jwt_refresh_secret as string);
};
