import { TTask } from "./task.interface";
import { Task } from "./task.model";

const CreateTaskInToDB = async (data: TTask) => {
  const result = await Task.create(data);
  return result;
};

export const TaskServices = {
  CreateTaskInToDB,
};
