import { RequestHandler } from "express";
import { cookiePreference } from "../settings.macro.js";
import { issueJwt } from "../utils/jwt.util.macro.js";

export const sendJwtToClient: RequestHandler = async (req, res, next) => {
  let jwtForClient: string;
  if (res.locals.jwtForSignUp) {
    jwtForClient = res.locals.jwtForSignUp;
  } else {
    jwtForClient = (await issueJwt({
      jwtPayload: {
        role: res.locals.allowedRoleInRoute,
        id: res.locals?.retrivedDbData?.userId
      }
    })) as string;
  }
  res
    .cookie("accessToken", jwtForClient, cookiePreference({ cookiePath: res.locals.cookiePath }))
    .status(res.locals.jwtForSignUp ? 201 : 200)
    .json({ status: "success" });
};
