import { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken } from "../../../utils/jwt";
import { IComment } from "./comment.interface";
import { Comment } from "./comment.model";

const CreateCommentInToDB = async (payload: IComment, token: string) => {
  const getUser = verifyAccessToken(token);
  if (!getUser) {
    throw new Error("Invalid Access Token");
  }
  const { id, role } = getUser as JwtPayload;
  if (!id && !role) {
    throw new Error("Invalid User");
  }

  const result = await Comment.create(payload);

  return result;
};

const getAllCommentsByTaskId = async (token: string, taskId: string) => {
  const getUser = verifyAccessToken(token);
  if (!getUser) {
    throw new Error("Invalid Access Token");
  }
  const { id, role } = getUser as JwtPayload;
  if (!id && !role) {
    throw new Error("Invalid User");
  }
  const comments = await Comment.find({ taskId }).populate("taskId").exec();

  return comments;
};
const updateCommentInToDB = async (
  commentId: string,
  payload: Partial<IComment>,
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
  const comment = await Comment.findByIdAndUpdate(commentId, payload, {
    new: true,
  }).exec();

  return comment;
};

const deleteCommentInToDB = async (commentId: string, token: string) => {
  const getUser = verifyAccessToken(token);
  if (!getUser) {
    throw new Error("Invalid Access Token");
  }
  const { id, role } = getUser as JwtPayload;
  if (!id && !role) {
    throw new Error("Invalid User");
  }
  const comment = await Comment.findByIdAndUpdate(
    commentId,
    { isDeleted: true },
    {
      new: true,
    }
  ).exec();

  return comment;
};
export const CommentServices = {
  CreateCommentInToDB,
  getAllCommentsByTaskId,
  updateCommentInToDB,
  deleteCommentInToDB,
};
