import httpStatus from "http-status";
import sendResponse from "../../../helpers/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { TeamServices } from "./team.services";

const createTeam = catchAsync(async (req, res) => {
  const data = req.body;
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    throw new Error("Access token not provided for Create Team");
  }

  const result = await TeamServices.createTeamInToDB(data, accessToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team created successfully",
    data: result,
  });
});

const getAllTeams = catchAsync(async (req, res) => {
  const result = await TeamServices.getAllTeamsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Teams fetched successfully",
    data: result,
  });
});

const getSingleTeam = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await TeamServices.getSingleTeamFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team fetched successfully",
    data: result,
  });
});

const updateTeam = catchAsync(async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    throw new Error("Access token not provided for Update Team");
  }

  const result = await TeamServices.updateTeamInToDB(id, data, accessToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team updated successfully",
    data: result,
  });
});

const deleteTeam = catchAsync(async (req, res) => {
  const id = req.params.id;
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    throw new Error("Access token not provided for Delete Team");
  }

  const result = await TeamServices.deleteTeamInToDB(id, accessToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Team deleted successfully",
    data: result,
  });
});

export const TeamController = {
  createTeam,
  getAllTeams,
  getSingleTeam,
  updateTeam,
  deleteTeam,
};
