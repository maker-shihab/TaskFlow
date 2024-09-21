import { IAuth } from "./auth.interface";
import { Auth } from "./auth.model";

const authLogin = async (data: IAuth) => {
  const result = await Auth.findOne({
    email: data.email,
    password: data.password,
  });
  return result;
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
