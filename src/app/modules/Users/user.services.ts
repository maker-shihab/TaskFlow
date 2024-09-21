import { IAuth } from "../Auth/auth.interface";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createViewer = async (authData: IAuth, userData: IUser) => {
  const session = await User.startSession();
  session.startTransaction();

  try {
  } catch (error) {}
};

const GetAllUser = async () => {
  const result = await User.find();
  return result;
};

export const UserService = {
  createViewer,
  GetAllUser,
};
