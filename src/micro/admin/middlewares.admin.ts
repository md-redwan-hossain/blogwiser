import { RequestHandler } from "express";
import { ValidationChain } from "express-validator";
import { validationReport } from "../../macro/utils/expressValidator.util.macro.js";
import { validateLoginCredentials } from "../../macro/validators/auth.validator.macro.js";
import { adminDataValidator } from "./validators.admin.js";

export const adminLoginDataValidation: Array<ValidationChain[] | RequestHandler> = [
  validateLoginCredentials(),
  validationReport
];
export const adminSignUpDataValidation: Array<ValidationChain[] | RequestHandler> = [
  ...adminDataValidator({ useForUpdate: false }),
  validationReport
];

export const adminDataUpdateValidation: Array<ValidationChain[] | RequestHandler> = [
  ...adminDataValidator({ useForUpdate: true }),
  validationReport
];
