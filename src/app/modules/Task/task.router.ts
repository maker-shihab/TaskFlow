import { Router } from "express";
import { TaskController } from "./task.controller";

const router = Router();

router.post("/create", TaskController.CreateTask);

export const TaskRouter = router;
