import httpStatus from "http-status";
import sendResponse from "../../helpers/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { RoleServices } from "./role.services";

const createRole = catchAsync(async (req, res) => {
  const result = await RoleServices.createRole(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Role created successfully",
    data: result,
  });
});

const getAllRoles = catchAsync(async (req, res) => {
  const result = await RoleServices.getAllRole();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Roles retrieved successfully",
    data: result,
  });
});

const getSingleRole = catchAsync(async (req, res) => {
  const result = await RoleServices.getSingleRole(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Role retrieved successfully",
    data: result,
  });
});

// updateRole;
// deleteRole;
// getRolesByPermission: This route would retrieve roles based on their permissions.
// assignPermissionsToRole: This route would assign permissions to a specific role.
// removePermissionsFromRole: This route would remove permissions from a specific role.

export const RoleController = {
  createRole,
  getAllRoles,
  getSingleRole,
};
