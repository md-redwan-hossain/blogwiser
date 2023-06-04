import express, { Router } from "express";
import { asyncErrorHandler } from "../../macro/errorHandler.macro.js";
import { saveInDbOnSignUp } from "../../macro/middlewares/auth.middleware.macro.js";
import * as macroCrudMiddlewares from "../../macro/middlewares/crud.middleware.macro.js";
import { sendJwtToClient } from "../../macro/middlewares/jwt.middleware.macro.js";
import { roleGuardInCookie } from "../../macro/roleGuard.macro.js";
import { User } from "../user/models.user.js";
import { getAllUsers } from "./controllers.admin.js";
import * as adminMiddlewares from "./middlewares.admin.js";

const adminRouter: Router = express.Router();

adminRouter.post(
  "/login",
  ...adminMiddlewares.adminLoginDataValidation,
  asyncErrorHandler(sendJwtToClient)
);
adminRouter.post(
  "/signup",
  ...adminMiddlewares.adminSignUpDataValidation,
  asyncErrorHandler(saveInDbOnSignUp),
  asyncErrorHandler(sendJwtToClient)
);

adminRouter
  .route("/profile")
  .get(...roleGuardInCookie, asyncErrorHandler(macroCrudMiddlewares.getProfileData))
  .patch(
    ...roleGuardInCookie,
    ...adminMiddlewares.adminDataUpdateValidation,
    asyncErrorHandler(macroCrudMiddlewares.updateProfileData)
  )
  .delete(...roleGuardInCookie, asyncErrorHandler(macroCrudMiddlewares.deleteProfile));

adminRouter
  .route("/users")
  .get(
    ...roleGuardInCookie,
    macroCrudMiddlewares.paginationDataMemoizer("totalPatientsinMemoryDB", User),
    asyncErrorHandler(getAllUsers)
  );
export default adminRouter;
