import { ENUM_USER_ROLE } from "../../../enums/user";
import { hashPassword } from "../../../utils/passwordEncript";
import { IAuth } from "../Auth/auth.interface";
import { Auth } from "../Auth/auth.model";
import { IUser } from "./user.interface";
import { User } from "./user.model";

const createViewer = async (authData: IAuth, userData: IUser) => {
  const session = await User.startSession();
  session.startTransaction();
  try {
    if (!authData.email || !authData.password) {
      throw new Error("Email and password are required.");
    }

    let existingUser = await User.findOne({
      username: userData.username,
    }).session(session);

    let existingAuth = await Auth.findOne({ email: authData.email }).session(
      session
    );

    if (!existingUser || !existingAuth) {
      const hashedPassword = await hashPassword(authData.password);

      const newUser = await User.create(
        [
          {
            name: userData.name,
            username: userData.username,
            teams: userData.teams,
            address: userData.address,
            phoneNumber: userData.phoneNumber,
            occupations: userData.occupations,
            isDeleted: false,
          },
        ],
        { session }
      );

      const newAuth = await Auth.create(
        [
          {
            userId: newUser[0]._id,
            role: ENUM_USER_ROLE.Viewer,
            email: authData.email,
            password: hashedPassword,
          },
        ],
        { session }
      );

      await session.commitTransaction();
      return { user: newUser, auth: newAuth };
    }
  } catch (error: any) {
    await session.abortTransaction();
    throw new Error(error.message || "Failed to create viewer");
  } finally {
    session.endSession();
  }
};

const GetAllUser = async () => {
  const result = await User.find();
  return result;
};

export const UserService = {
  createViewer,
  GetAllUser,
};
