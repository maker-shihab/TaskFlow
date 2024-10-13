import mongoose, { Schema } from "mongoose";
import { IComment } from "./comment.interface";

const commentSchema = new Schema<IComment>(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Task",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.pre(/^find/, function (next) {
  const query = this as unknown as mongoose.Query<any, any>;

  query.where({ isDeleted: { $ne: true } });
  next();
});

export const Comment = mongoose.model<IComment>("Comment", commentSchema);
