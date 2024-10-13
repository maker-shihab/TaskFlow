import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
import { verifyAccessToken } from "../../../utils/jwt";
import { User } from "../Users/user.model";
import { ITeam } from "./team.interface";
import { Team } from "./team.model";

const createTeamInToDB = async (
  payload: ITeam,
  token: string
): Promise<ITeam> => {
  const getUser = verifyAccessToken(token);
  if (!getUser) {
    throw new Error("Invalid Access Token");
  }
  const { id, role } = getUser as JwtPayload;
  if (!id && !role) {
    throw new Error("Invalid User");
  }
  payload.userId = id;
  const result = await Team.create(payload);

  return result;
};

const getAllTeamsFromDB = async () => {
  const result = await Team.find();
  return result;
};

const getSingleTeamFromDB = async (id: string) => {
  const result = await Team.findById(id);
  return result;
};

const updateTeamInToDB = async (
  teamId: string,
  payload: { teamName?: string; members?: string[]; projectIds?: string[] },
  token: string
) => {
  const getUser = verifyAccessToken(token);
  if (!getUser) {
    throw new Error("Invalid Access Token");
  }

  const { id, role } = getUser as JwtPayload;
  if (!id && !role) {
    throw new Error("Invalid User");
  }

  const team = await Team.findById(teamId);
  if (!team) {
    throw new Error("Team not found");
  }

  const updateFields: any = {};

  if (payload.teamName) {
    updateFields.teamName = payload.teamName;
  }

  if (payload.members && payload.members.length > 0) {
    const validMemberIds: Types.ObjectId[] = [];

    for (const memberId of payload.members) {
      if (!Types.ObjectId.isValid(memberId)) {
        throw new Error(`Invalid member ID: ${memberId}`);
      }

      const memberExists = await User.findById(memberId);
      if (!memberExists) {
        throw new Error(`Member with ID: ${memberId} not found`);
      }
      validMemberIds.push(new Types.ObjectId(memberId));
    }
    updateFields.$addToSet = { members: { $each: validMemberIds } };
  }

  if (payload.projectIds && payload.projectIds.length > 0) {
    const objectIdProjects = payload.projectIds.map(
      (projectId) => new Types.ObjectId(projectId)
    );
    if (!updateFields.$addToSet) updateFields.$addToSet = {};
    updateFields.$addToSet.projectIds = { $each: objectIdProjects };
  }

  const result = await Team.findByIdAndUpdate(teamId, updateFields, {
    new: true,
    runValidators: true,
  });

  return result;
};
const deleteTeamInToDB = async (teamId: string, token: string) => {
  const getUser = verifyAccessToken(token);
  if (!getUser) {
    throw new Error("Invalid Access Token");
  }
  const { id, role } = getUser as JwtPayload;
  if (!id && !role) {
    throw new Error("Invalid User");
  }

  const team = await Team.findById(teamId);

  if (!team) {
    throw new Error("Team not found");
  }

  team.isDeleted = true;

  await team.save();

  return team;
};
export const TeamServices = {
  createTeamInToDB,
  getAllTeamsFromDB,
  getSingleTeamFromDB,
  updateTeamInToDB,
  deleteTeamInToDB,
};
