import { Router } from "express";
import { TaskController } from "./task.controller";

const router = Router();

router.post("/create", TaskController.CreateTask);
router.get("/", TaskController.GetAllTasks);
router.get("/:id", TaskController.GetSingleTasks);

export const TaskRouter = router;
