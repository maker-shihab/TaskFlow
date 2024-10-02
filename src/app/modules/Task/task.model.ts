import { model, Schema } from "mongoose";
import { TTask } from "./task.interface";

// Schema
const TaskSchema = new Schema<TTask>(
  {
    title: { type: String, required: true },
    user: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Task = model<TTask>("Task", TaskSchema);
