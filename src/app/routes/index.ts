import { Router } from "express";
import { TaskRouter } from "../modules/Task/task.router";

const router = Router();

const moduleRouter = [
  {
    path: "/task",
    route: TaskRouter,
  },
];

moduleRouter.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
