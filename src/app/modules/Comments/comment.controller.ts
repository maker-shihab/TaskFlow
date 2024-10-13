import sendResponse from "../../../helpers/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { CommentServices } from "./comment.services";

const createComment = catchAsync(async (req, res) => {
  const accessToken = req.headers.authorization;
  const data = req.body;
  if (!accessToken) {
    throw new Error("Access token not provided for Create Comment");
  }
  const result = await CommentServices.CreateCommentInToDB(data, accessToken);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Comment created successfully",
    data: result,
  });
});

const getAllCommentsByTaskId = catchAsync(async (req, res) => {
  const taskId = req.params.id;
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    throw new Error("Access token not provided for Get All Comments");
  }

  const result = await CommentServices.getAllCommentsByTaskId(
    accessToken,
    taskId
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Comments retrieved successfully",
    data: result,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const accessToken = req.headers.authorization;
  const commentId = req.params.id;
  const data = req.body;
  if (!accessToken) {
    throw new Error("Access token not provided for Update Comment");
  }
  const result = await CommentServices.updateCommentInToDB(
    commentId,
    data,
    accessToken
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Comment updated successfully",
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const accessToken = req.headers.authorization;
  const commentId = req.params.id;
  if (!accessToken) {
    throw new Error("Access token not provided for Delete Comment");
  }
  const result = await CommentServices.deleteCommentInToDB(
    commentId,
    accessToken
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Comment deleted successfully",
    data: result,
  });
});

export const CommentController = {
  createComment,
  getAllCommentsByTaskId,
  updateComment,
  deleteComment,
};
