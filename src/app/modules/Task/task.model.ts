import { model, Schema } from "mongoose";
import { PriorityLevels, TaskStatus } from "./task.conostant";
import { ITask } from "./task.interface";

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.PENDING,
    },
    priority: {
      type: Number,
      enum: Object.values(PriorityLevels),
      default: PriorityLevels.LOW,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    dueDate: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
    },
    comments: {
      type: [String],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", TaskSchema);
