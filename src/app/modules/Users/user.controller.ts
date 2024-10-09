import httpStatus from "http-status";
import sendResponse from "../../helpers/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { UserService } from "./user.services";

const CreateUser = catchAsync(async (req, res) => {
  const user = await UserService.CreateUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: user,
  });
});

export const UserController = {
  CreateUser,
};
