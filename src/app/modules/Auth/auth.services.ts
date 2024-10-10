import { isUserEsist } from "../../../utils";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { checkPassword } from "../../../utils/passwordEncript";
import { User } from "../Users/user.model";
import { IAuth, ILoginUser } from "./auth.interface";
import Auth from "./auth.model";

const authLogin = async (payload: ILoginUser) => {
  const { email, password } = payload;

  const authRecord = await isUserEsist(email);
  if (!authRecord) {
    throw new Error("User not found.");
  }

  const isPasswordValid = await checkPassword(password, authRecord.password);

  if (!isPasswordValid) {
    throw new Error("Sorry, password not match.");
  }

  const user = await User.findById(authRecord.userId);
  if (!user) {
    throw new Error("User information not found.");
  }

  const userIdString = authRecord.userId.toString();
  const authToken = generateAccessToken(userIdString, user.role);
  const authRefreshToken = generateRefreshToken(userIdString, user.role);

  return {
    accessToken: `Bearer ${authToken}`,
    refreshToken: `Bearer ${authRefreshToken}`,
    user,
  };
};

const authLogout = async (id: string) => {
  const result = await Auth.findByIdAndUpdate(id, { isAuthenticated: false });
  return result;
};

const authRefreshToken = async (token: string) => {
  const result = await Auth.findOneAndUpdate(
    { token },
    { isAuthenticated: true },
    { new: true }
  );
  return result;
};

const authForgotPassword = async (data: IAuth) => {
  const result = await Auth.findOneAndUpdate(
    { email: data.email },
    { password: data.password },
    { new: true }
  );
  return result;
};

const authResetPassword = async (data: IAuth) => {
  const result = await Auth.findByIdAndUpdate(
    data._id,
    { password: data.password },
    { new: true }
  );
  return result;
};

const authVerifyEmail = async (token: string) => {
  const result = await Auth.findOneAndUpdate(
    { token },
    { emailVerified: true },
    { new: true }
  );
  return result;
};

const authSendVerificationEmail = async (data: IAuth) => {
  const result = await Auth.findOneAndUpdate(
    { email: data.email },
    // { token: generateToken() },
    { new: true }
  );
  return result;
};

const authResendVerificationEmail = async (data: IAuth) => {
  const result = await Auth.findOneAndUpdate(
    { email: data.email },
    // { token: generateToken() },
    { new: true }
  );
  return result;
};

export const AuthServices = {
  authLogin,
  authLogout,
  authRefreshToken,
  authForgotPassword,
  authResetPassword,
  authVerifyEmail,
  authSendVerificationEmail,
  authResendVerificationEmail,
};
