import { Request, Response } from "express";
import { TTask } from "./task.interface";
import { TaskServices } from "./task.services";

const CreateTask = async (
  req: Request,
  res: Response
): Promise<TTask | null> => {
  const result = await TaskServices.CreateTaskInToDB(req.body);
  if (!result) {
    throw new Error("Sorry something went wrong");
  }

  res.status(200).json({
    success: true,
    message: "Task created successfully",
    data: result,
  });

  return result;
};

export const TaskController = {
  CreateTask,
};
