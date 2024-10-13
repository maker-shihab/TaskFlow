import { Types } from "mongoose";

export type IComment = {
  taskId: Types.ObjectId;
  userId: Types.ObjectId;
  comment: string;
  isDeleted?: boolean;
};
