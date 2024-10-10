import { NextFunction, Request, Response } from "express";
import { TErrorSources } from "../app/interfaces/error";
import config from "../config";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "Something went wrong ⚠!";
  let errorSources: TErrorSources = [
    {
      path: "",
      message: "Something went wrong",
      // message: err.message
    },
  ];

  if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.env === "production" ? err.stack : null,
  });
};

export default globalErrorHandler;
