import { IRole } from "./role.interfeca";
import { Role } from "./role.model";

const createRole = async (data: IRole) => {
  const result = await Role.create(data);
  return result;
};

const getAllRole = async () => {
  const result = await Role.find();
  return result;
};

export const RoleServices = {
  createRole,
  getAllRole,
};
