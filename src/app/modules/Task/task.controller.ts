import sendResponse from "../../../helpers/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { TaskServices } from "./task.services";

const CreateTask = catchAsync(async (req, res) => {
  const accessToken = req.headers.authorization;
  const data = req.body;
  if (!accessToken) {
    throw new Error("Access token not provided for Create Task");
  }

  const result = await TaskServices.CreateTaskInToDB(data, accessToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task created successfully",
    data: result,
  });
});

const GetAllTasks = catchAsync(async (req, res) => {
  const result = await TaskServices.GetAllTasks();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tasks fetched successfully",
    data: result,
  });
});

const GetSingleTasks = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TaskServices.GetSingleTasks(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Task fetched successfully",
    data: result,
  });
});

export const TaskController = {
  CreateTask,
  GetAllTasks,
  GetSingleTasks,
};
