import mongoose, { model, Schema } from "mongoose";
import { ITeam } from "./team.interface";

const TeamSchema = new Schema<ITeam>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  teamName: {
    type: String,
    required: true,
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  projectIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

TeamSchema.pre(/^find/, function (next) {
  const query = this as unknown as mongoose.Query<any, any>;

  query.where({ isDeleted: { $ne: true } });

  next();
});

export const Team = model<ITeam>("team", TeamSchema);
