import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import path from "path";
import router from "./app/routes";
import globalErrorHandler from "./middlewares/globalErrorHandaller";
import NotFound from "./middlewares/NotFound";

const app: Application = express();

app.use(cors());
app.use(cookieParser());

// app.use(
//   session({
//     secret: config.session_secret || "default-secret",
//     resave: false,
//     saveUninitialized: true,
//   })
// );

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Set up static folder for client-side assets (e.g., images, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

//Testing
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "Welcome to the Task Flow App!",
  });
});
//global error handler
app.use(globalErrorHandler);

//handle not found
app.use(NotFound);

export default app;
