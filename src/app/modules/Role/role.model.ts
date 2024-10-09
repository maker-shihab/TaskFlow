import { model, Schema } from "mongoose";
import { IRole, RoleType } from "./role.interfeca";

const roleSchema = new Schema<IRole>({
  roleId: {
    type: String,
    required: true,
  },
  roleName: {
    type: String,
    required: true,
    enum: Object.values(RoleType),
  },
  permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
});

export const Role = model<IRole>("role", roleSchema);
