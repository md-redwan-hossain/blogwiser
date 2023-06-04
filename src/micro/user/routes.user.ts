import express, { Router } from "express";
import { asyncErrorHandler } from "../../macro/errorHandler.macro.js";
import { saveInDbOnSignUp } from "../../macro/middlewares/auth.middleware.macro.js";
import * as macroCrudMiddlewares from "../../macro/middlewares/crud.middleware.macro.js";
import { sendJwtToClient } from "../../macro/middlewares/jwt.middleware.macro.js";
import { roleGuardInCookie } from "../../macro/roleGuard.macro.js";
import * as userMiddlewares from "../admin/middlewares.admin.js";

const userRouter: Router = express.Router();

userRouter.post(
  "/login",
  ...userMiddlewares.adminLoginDataValidation,
  asyncErrorHandler(sendJwtToClient)
);
userRouter.post(
  "/signup",
  ...userMiddlewares.adminSignUpDataValidation,
  asyncErrorHandler(saveInDbOnSignUp),
  asyncErrorHandler(sendJwtToClient)
);

userRouter
  .route("/profile")
  .get(...roleGuardInCookie, asyncErrorHandler(macroCrudMiddlewares.getProfileData))
  .patch(
    ...roleGuardInCookie,
    ...userMiddlewares.adminDataUpdateValidation,
    asyncErrorHandler(macroCrudMiddlewares.updateProfileData)
  )
  .delete(...roleGuardInCookie, asyncErrorHandler(macroCrudMiddlewares.deleteProfile));

export default userRouter;
