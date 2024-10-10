import jwt from "jsonwebtoken";
import config from "../config";

export const generateAccessToken = (userId: string, role: string) => {
  const payload = { userId, role };
  const token = jwt.sign(payload, config.jwt_secret as string, {
    expiresIn: "1h",
  });
  return token;
};

export const generateRefreshToken = (userId: string, role: string) => {
  const payload = { userId, role };
  const token = jwt.sign(payload, config.jwt_refresh_secret as string, {
    expiresIn: "7d",
  });
  return token;
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, config.jwt_secret as string);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.jwt_refresh_secret as string);
};
