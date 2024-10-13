import { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken } from "../../../utils/jwt";
import { User } from "../Users/user.model";
import { ITask } from "./task.interface";
import { Task } from "./task.model";

const CreateTaskInToDB = async (payload: ITask, accessToken: string) => {
  const getUser = verifyAccessToken(accessToken);

  if (!getUser) {
    throw new Error("Invalid Access Token");
  }

  const { id, role } = getUser as JwtPayload;
  if (!id && !role) {
    throw new Error("Invalid User");
  }

  if (role !== "admin" && role !== "manager") {
    throw new Error("Unauthorized access");
  }
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }

  const newTask = new Task({ ...payload, userId: user._id });
  const result = await newTask.save();
  return result;
};

const GetAllTasks = async () => {
  const tasks = await Task.find();
  return tasks;
};

const GetSingleTasks = async (id: string) => {
  const tasks = await Task.findById(id);
  return tasks;
};

export const TaskServices = {
  CreateTaskInToDB,
  GetAllTasks,
  GetSingleTasks,
};
