import httpStatus from "http-status";
import sendResponse from "../../../helpers/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.services";

const register = catchAsync(async (req, res) => {
  const { auth, user } = req.body;
  const result = await UserService.createViewer(auth, user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User register successfully",
    data: result,
  });
});

const GetAllUser = catchAsync(async (req, res) => {
  const user = await UserService.GetAllUser();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrive successfully",
    data: user,
  });
});

export const UserController = {
  register,
  GetAllUser,
};
