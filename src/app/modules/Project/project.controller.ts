import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import sendResponse from "../../../helpers/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { ProjectServices } from "./project.services";

const createProject = catchAsync(async (req, res) => {
  const data = req.body;
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, "Unauthorized!");
  }

  const result = await ProjectServices.createProjectIntoDB(token, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project created successfully",
    data: result,
  });
});

const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectServices.getAllProjects();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Projects fetched successfully",
    data: result,
  });
});

const getSingleProject = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await ProjectServices.getProjectById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project fetched successfully",
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, "Unauthorized!");
  }
  const result = await ProjectServices.updateProjectById(id, token, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project updated successfully",
    data: result,
  });
});

const deleteProject = catchAsync(async (req, res) => {
  const id = req.params.id;
  const token = req.headers.authorization;
  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, "Unauthorized!");
  }
  const result = await ProjectServices.deleteProjectById(id, token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Project deleted successfully",
    data: result,
  });
});

export const ProjectController = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
