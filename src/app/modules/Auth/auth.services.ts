import { isUserEsist } from "../../../utils";
import { generateAccessToken, generateRefreshToken } from "../../../utils/jwt";
import { checkPassword } from "../../../utils/passwordEncript";
import { User } from "../Users/user.model";
import { IAuth, ILoginUser } from "./auth.interface";
import Auth from "./auth.model";
import { exchangeCodeForToken, getGoogleUserInfo } from "./auth.util";

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
  console.log(user);
  const authToken = generateAccessToken(user);
  const authRefreshToken = generateRefreshToken(user);

  return {
    accessToken: `Bearer ${authToken}`,
    refreshToken: `Bearer ${authRefreshToken}`,
  };
};

const loginWithGoogle = async (code: string) => {
  try {
    const { access_token } = await exchangeCodeForToken(code);

    const googleUser = await getGoogleUserInfo(access_token);
    console.log(googleUser);
    let user = User.findOne(googleUser.email);
    console.log(user);
    // if (!user) {
    //   user = await User.create({
    //     name: {

    //     }
    //   })
    // }

    const accessToken = generateAccessToken(googleUser);
    const refreshToken = generateRefreshToken(googleUser);

    return {
      accessToken: `Bearer ${accessToken}`,
      refreshToken: `Bearer ${refreshToken}`,
      user: googleUser,
    };
  } catch (error) {
    console.error("OAuth login failed:", error);
  }
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
  loginWithGoogle,
  authLogout,
  authRefreshToken,
  authForgotPassword,
  authResetPassword,
  authVerifyEmail,
  authSendVerificationEmail,
  authResendVerificationEmail,
};
