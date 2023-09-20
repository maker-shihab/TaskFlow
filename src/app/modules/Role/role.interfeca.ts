export type IRole = {
  roleId: string;
  roleName: string;
  permissions: string[];
  isActive: boolean;
};

export enum RoleType {
  Admin = "Admin",
  Manager = "Manager",
  Contributor = "Contributor",
  Viewer = "Viewer",
}
