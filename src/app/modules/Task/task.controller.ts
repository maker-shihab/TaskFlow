import { Request, Response } from "express";
import { TTask } from "./task.interface";
import { TaskServices } from "./task.services";

const CreateTask = async (
  req: Request,
  res: Response
): Promise<TTask | null> => {
  const data = req.body;

  if (!data) {
    throw new Error("Sorry something went wrong");
  }

  const result = await TaskServices.CreateTaskInToDB(data);

  if (!result) {
    throw new Error("Sorry something went wrong");
  }
  return result;
};

export const TaskController = {
  CreateTask,
};
