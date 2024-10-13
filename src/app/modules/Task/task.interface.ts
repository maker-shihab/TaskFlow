import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export type TTaskStatus =
  | "Pending"
  | "In Progress"
  | "Completed"
  | "Cancelled"
  | "Duplicate"
  | "Invalid"
  | "Expired";

export type TaskPriority = 1 | 2 | 3 | 4;

export type ITask = {
  title: string;
  userId: Types.ObjectId;
  description: string;
  status: TTaskStatus;
  priority: TaskPriority;
  assignedTo?: Types.ObjectId;
  project?: Types.ObjectId;
  dueDate?: string;
  tags?: string[];
  comments?: string[];
  isDeleted?: boolean;
};

export interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
}
