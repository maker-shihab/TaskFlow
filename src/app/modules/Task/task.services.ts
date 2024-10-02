import { TTask } from "./task.interface";
import { TaskModel } from "./task.model";

const CreateTaskInToDB = async (data: TTask) => {
  const result = await TaskModel.create(data);
  return result;
};

export const TaskServices = {
  CreateTaskInToDB,
};
