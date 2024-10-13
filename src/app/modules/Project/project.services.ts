import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../../errors/AppError";
import { verifyAccessToken } from "../../../utils/jwt";
import { User } from "../Users/user.model";
import { IProject } from "./project.interface";
import { Project } from "./project.modle";

const createProjectIntoDB = async (token: string, payload: IProject) => {
  const getUser = verifyAccessToken(token);
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
  payload.userId = id;
  // teamId
  const result = await Project.create(payload);
  return result;
};

const getAllProjects = async () => {
  const result = await Project.find();
  return result;
};

const getProjectById = async (id: string) => {
  const result = await Project.findById(id);
  return result;
};

const updateProjectById = async (
  projectId: string,
  token: string,
  payload: IProject
) => {
  const checkProject = await Project.findById(projectId);
  if (!checkProject) {
    throw new AppError(httpStatus.NOT_FOUND, "No project found!");
  }
  const getUser = verifyAccessToken(token);
  const { id, role } = getUser as JwtPayload;
  if (!id && !role) {
    throw new Error("Invalid User");
  }

  const result = await Project.findByIdAndUpdate(projectId, payload, {
    new: true,
  });

  console.log(result);
  return result;
};

const deleteProjectById = async (projectId: string, token: string) => {
  const checkProject = await Project.findById(projectId);
  if (!checkProject) {
    throw new AppError(httpStatus.NOT_FOUND, "No project found!");
  }
  const getUser = verifyAccessToken(token);
  const { id, role } = getUser as JwtPayload;
  if (!id && !role) {
    throw new Error("Invalid User");
  }
  await Project.findByIdAndUpdate(
    projectId,
    { isDeleted: true },
    { new: true }
  );

  return checkProject;
};

export const ProjectServices = {
  createProjectIntoDB,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
