import { RequestHandler } from "express";
import createError from "http-errors";
import { memoryDB } from "../../macro/settings.macro.js";
import { excludeDataCommon } from "../../macro/utils/mongoose.util.macro.js";
import { User } from "../user/models.user.js";

export const getAllUsers: RequestHandler = async (req, res, next): Promise<void> => {
  const userDataFromDB = await User.find(req.query)
    .select(excludeDataCommon)
    .sort(res.locals?.sortingData || "-createdAt")
    .skip(res.locals?.skipValue || 0)
    .limit(res.locals?.dataPerPage || 20);

  if (userDataFromDB) {
    res.status(200).json({
      status: "success",
      "total Users": memoryDB.get("totalUsersinMemoryDB"),
      data: userDataFromDB
    });
  } else next(createError(404, "No data found!"));
};
