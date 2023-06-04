import { ErrorRequestHandler, RequestHandler } from "express";
import createError, { HttpError } from "http-errors";
import { Server } from "node:http";

export function uncaughtExceptionHandler(err: Error): void {
  console.error(err);
  console.log("Shutting Down!");
  // eslint-disable-next-line
  process.exit(1);
}

export function uncaughtPromiseRejectionHandler(server: Server) {
  return (err: Error): void => {
    console.error(err);
    server.close((): void => {
      console.log("Halting the Server!");
      throw Error(`A rejected promise is escaped: ${err}`);
    });
  };
}

export const nonExistenceRouteHandler: RequestHandler = (req, res, next): void => {
  res.status(404).json({
    status: "failed",
    message: `${req.originalUrl} endpoint for ${req.method} request is not found`
  });
};

export const asyncErrorHandler = (originalAsyncMiddleware: RequestHandler): RequestHandler => {
  return function (req, res, next): void {
    try {
      originalAsyncMiddleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  // in production, error can be raised from express validator and middlewares
  if (process.env.NODE_ENV === "production") {
    // the following <if> block will only execute for express validator errors
    if (res.locals.isExpressValidatorError && res.locals.expressValidatorErrorCode) {
      res.status(res.locals.expressValidatorErrorCode).json({
        status: "failed",
        message: err
      });

      /* eslint-disable */
      switch (err) {
        case err.name === "ValidationError":
          err = createError(400, err.message);
          break;
        case err.name === "CastError":
          err = createError(400, `Invalid ${err.path} -> ${err.value}`);
          break;
        case err.code === 11000:
          err = createError(400, "Duplicate Value");
          break;
        default:
          break;
      }
      /* eslint-enable */

      // the following <else if> block will only execute for middleware errors
    } else if (err instanceof HttpError) {
      res.status(err.status).json({
        status: "failed",
        message: err.message
      });
    } else if (err instanceof SyntaxError) {
      res.status(400).json({
        status: "failed",
        message: err.message
      });
      // the following <else> block is for unknown programmatic errors
      // for programmatic errors in production, the client shouldn't be informed much
    } else {
      // console.error(err);
      res.status(500).json({
        status: "failed",
        message: "Unknown error!"
      });
    }
    // in development, send every possible error to the client
  } else if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
    res.status(err.status || res.locals.expressValidatorErrorCode || 500).json({
      status: "failed",
      error: err,
      message: err.message,
      stack: err.stack
    });
  }
};
