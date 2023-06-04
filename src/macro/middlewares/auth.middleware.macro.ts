import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import { fireEventOnSignUp } from "../utils/eventsPublisher.utils.macro.js";
import { issueJwt } from "../utils/jwt.util.macro.js";

export const roleModelCookiePathInjector = ({
  role,
  DbModel,
  cookiePath
}: IRoleModelCookiePathInjector): RequestHandler => {
  return (req, res, next) => {
    res.locals.allowedRoleInRoute = role;
    res.locals.DbModel = DbModel;
    res.locals.cookiePath = cookiePath;
    next();
  };
};

export const saveInDbOnSignUp: RequestHandler = async (req, res, next) => {
  if (res.locals.DbModel) {
    // hash the given password in the request
    res.locals.validatedReqData.password = await bcrypt.hash(
      res.locals.validatedReqData.password,
      10
    );

    const newUser = new res.locals.DbModel(res.locals.validatedReqData);

    const jwtForNewUser = (await issueJwt({
      jwtPayload: { id: newUser._id, role: res.locals.allowedRoleInRoute }
    })) as string;

    const newUserInDb = await newUser.save();

    if (newUserInDb && jwtForNewUser) {
      fireEventOnSignUp({ userId: newUser._id, role: res.locals.allowedRoleInRoute });
      res.locals.jwtForSignUp = jwtForNewUser;
    }
    next();
  }
};
