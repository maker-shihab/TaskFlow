import { ITask } from "./task.interface";
import { Task } from "./task.model";

const CreateTaskInToDB = async (data: ITask) => {
  const result = await Task.create(data);
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
