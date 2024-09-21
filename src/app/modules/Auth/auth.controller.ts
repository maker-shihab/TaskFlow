import httpStatus from "http-status";
import sendResponse from "../../helpers/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.services";

const authLogin = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AuthServices.authLogin(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const authLogout = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AuthServices.authLogout(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged out successfully",
    data: result,
  });
});

const authRefreshToken = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AuthServices.authRefreshToken(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh token updated successfully",
    data: result,
  });
});

const authForgotPassword = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AuthServices.authForgotPassword(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset link sent successfully",
    data: result,
  });
});

const authResetPassword = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AuthServices.authResetPassword(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successfully",
    data: result,
  });
});

const authVerifyEmail = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AuthServices.authVerifyEmail(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Email verification link sent successfully",
    data: result,
  });
});

const authSendVerificationEmail = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AuthServices.authResendVerificationEmail(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Resend verification email sent successfully",
    data: result,
  });
});

const authResendVerificationEmail = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AuthServices.authResendVerificationEmail(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Resend verification email sent successfully",
    data: result,
  });
});

export const AuthController = {
  authLogin,
  authLogout,
  authRefreshToken,
  authForgotPassword,
  authResetPassword,
  authVerifyEmail,
  authSendVerificationEmail,
  authResendVerificationEmail,
};
