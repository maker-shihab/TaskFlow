import mongoose, { model, Schema } from "mongoose";
import { IProject, ProjectStatus } from "./project.interface";

const ProjectSchema = new Schema<IProject>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
  status: {
    type: String,
    enum: ProjectStatus,
    default: ProjectStatus.ACTIVE,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

ProjectSchema.pre(/^find/, function (next) {
  const query = this as unknown as mongoose.Query<any, any>;

  query.where({ isDeleted: { $ne: true } });
  next();
});

export const Project = model<IProject>("Project", ProjectSchema);
