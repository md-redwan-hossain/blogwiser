import { RequestHandler } from "express";
import { ValidationChain } from "express-validator";
import { validationReport } from "./utils/expressValidator.util.macro.js";
import { jwtInCookieValidator } from "./validators/jwt.validator.macro.js";

export const roleGuardInCookie: [ValidationChain[], RequestHandler] = [
  jwtInCookieValidator(),
  validationReport
];
