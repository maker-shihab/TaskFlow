import { Types } from "mongoose";

export type IProjectStatus = "active" | "complete" | "in-progress";

export type IProject = {
  userId: Types.ObjectId;
  projectName: string;
  description: string;
  startDate: Date;
  endDate: Date;
  teamId?: Types.ObjectId;
  status: IProjectStatus;
  isDeleted?: boolean;
};

export const ProjectStatus = {
  ACTIVE: "active",
  COMPLETE: "complete",
  ON_HOLD: "in-progress",
} as const;
