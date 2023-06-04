import { adminDataValidator } from "../admin/validators.admin.js";

export const userDataValidator: MicroValidator = ({ useForUpdate }) => {
  return adminDataValidator({ useForUpdate });
};
