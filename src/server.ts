import express, { Application } from "express";
import { Server } from "http";
import * as macroErrorHandlers from "./macro/errorHandler.macro.js";
import apiRouterV1 from "./macro/routes.macro.js";
import { globalMiddlewares, initDatabase, serverIp, serverPort } from "./macro/settings.macro.js";
import { validationReport } from "./macro/utils/expressValidator.util.macro.js";
import { updateRequestValidator } from "./macro/validators/global.validator.macro.js";

process.on("uncaughtException", macroErrorHandlers.uncaughtExceptionHandler);

const app: Application = express();

// trusted IPs
app.set("trust proxy", (ip: string) => {
  if (ip === "127.0.0.1" || ip === serverIp) return true;
  return false;
});

app.use(...globalMiddlewares);
app.patch("*", updateRequestValidator(), validationReport);
app.use("/api/v1", apiRouterV1);
app.use(macroErrorHandlers.globalErrorHandler);

// 404 response for non-existent endpoints
app.all("*", macroErrorHandlers.nonExistenceRouteHandler);

const nodeWebServer: Server = app.listen(serverPort, async () => {
  console.log("Server is up.");
  await initDatabase();
});

process.on("unhandledRejection", macroErrorHandlers.uncaughtPromiseRejectionHandler(nodeWebServer));
