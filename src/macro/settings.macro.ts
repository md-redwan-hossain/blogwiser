import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { CookieOptions, RequestHandler } from "express";
import rateLimit, { RateLimitRequestHandler } from "express-rate-limit";
import { ValidationChain } from "express-validator";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import NodeCache from "node-cache";
import { sanitizeAndSeparateSortAndLimit } from "./middlewares/queryParam.middleware.macro.js";
import futureTime from "./utils/futureTime.util.macro.js";

// ensuring env variables
if (!process.env.MONGODB_URL) throw new Error("MongoDB Connection URL is missing");
if (!process.env.JWT_SECRET) throw Error("Set JWT_SECRET in ENV variable");
if (!process.env.SERVER_IP) throw Error("Set SERVER_IP in ENV variable");
if (!process.env.SERVER_PORT) throw Error("Set SERVER_PORT in ENV variable");

// defining env variables
const mongoConnectionUrl: string = process.env.MONGODB_URL;
export const jwtSecretInEnv: string = process.env.JWT_SECRET;
export const serverIp: string = process.env.SERVER_IP;
export const serverPort: string = process.env.SERVER_PORT;

// global rate limiter
const globalRequestLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 1000, // Limit each IP to 1000 requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

export const globalMiddlewares: (ValidationChain[] | RequestHandler)[] = [
  helmet(),
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
  }),
  globalRequestLimiter,
  express.json(),
  cookieParser(),
  morgan("dev"),
  ...sanitizeAndSeparateSortAndLimit
];

export function cookiePreference({
  cookiePath = "/",
  expirationTime = futureTime.inHour(3),
  secureRule = process.env.NODE_ENV === "production",
  httpOnlyRule = true,
  sameSiteRule = true
}): CookieOptions {
  return {
    path: cookiePath,
    expires: expirationTime,
    secure: secureRule,
    httpOnly: httpOnlyRule,
    sameSite: sameSiteRule
  };
}

export const memoryDB: NodeCache = new NodeCache();

export async function initDatabase(): Promise<void> {
  try {
    await mongoose.connect(mongoConnectionUrl, { autoIndex: false });
    console.log("DB is connected");
  } catch (err) {
    if (err instanceof Error) {
      console.error(`DB Error: ${err.message}`);
    } else {
      console.log("DB Error");
    }
  }
}
