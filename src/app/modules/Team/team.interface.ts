import { Types } from "mongoose";

export type ITeam = {
  userId: Types.ObjectId;
  teamName: string;
  members?: Types.ObjectId[];
  projectIds?: Types.ObjectId[];
  isDeleted?: boolean;
};
