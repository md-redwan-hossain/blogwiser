import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { matchedData } from "express-validator";
import createError from "http-errors";
import { Model } from "mongoose";
import { UserManagement } from "../../micro/admin/models.admin.js";
import { memoryDB } from "../settings.macro.js";
import { excludeDataCommon } from "../utils/mongoose.util.macro.js";

export const paginationDataMemoizer = (key: string, DbModel: Model<IUser>): RequestHandler => {
  return async (req, res, next): Promise<void> => {
    if (memoryDB.get(key)) next();
    else {
      const tempData = await DbModel.countDocuments();
      memoryDB.set(key, tempData);
      next();
    }
  };
};

export const getProfileData: RequestHandler = async (req, res, next): Promise<void> => {
  if (res.locals.DbModel) {
    // try to fetch user data by objectId
    const userDataFromDB = await res.locals.DbModel.findById(res.locals.decodedJwt?.id).select(
      excludeDataCommon
    );

    if (userDataFromDB) {
      res.status(200).json({
        status: "success",
        data: userDataFromDB
      });
    } else {
      next(createError(404, "User not found"));
    }
  }
};

export const updateProfileData: RequestHandler = async (req, res, next): Promise<void> => {
  if (res.locals.DbModel) {
    const validatedReqData = matchedData(req);
    if (validatedReqData.updatePassword?.newPassword) {
      validatedReqData.password = await bcrypt.hash(
        validatedReqData.updatePassword.newPassword,
        10
      );
    }
    // try to fetch user data by objectId and insert updated data
    const updatedUserDataFromDB = await res.locals.dbdbModel
      .findByIdAndUpdate(res.locals.decodedJwt?.id, validatedReqData, {
        new: true,
        runValidators: true
      })
      .select(excludeDataCommon);

    if (updatedUserDataFromDB) {
      res.status(200).json({
        status: "success",
        data: updatedUserDataFromDB
      });
    } else next(createError(404, "User not found"));
  }
};
export const deleteProfile: RequestHandler = async (req, res, next): Promise<void> => {
  if (res.locals.DbModel) {
    // try to fetch user data by objectId and delete the Admin user
    const deletionFlag = await res.locals.DbModel.findByIdAndDelete(res.locals.decodedJwt?.id);
    // if success, send 204
    if (deletionFlag) {
      res.status(204).clearCookie("accessToken", { path: res.locals.cookiePath }).end();
    } else next(createError(404, "User not found"));
  }
};

export const deactiveProfile: RequestHandler = async (req, res, next): Promise<void> => {
  if (res.locals.DbModel) {
    // try to fetch user data by objectId and delete the Admin user
    const deactivationFlag = await UserManagement.findOneAndUpdate(
      { userId: res.locals.decodedJwt?.id },
      { isDeactivated: true }
    );

    if (deactivationFlag) {
      res
        .status(200)
        .clearCookie("accessToken", { path: res.locals.cookiePath })
        .json({ status: "success", msg: " successfully deactivated. Login to active again." });
    } else next(createError(404, "User not found"));
  }
};
