import { Router } from "express";
import { AuthRouter } from "../modules/Auth/auth.route";
import { TaskRouter } from "../modules/Task/task.router";
import { UserRouter } from "../modules/Users/user.route";

const router = Router();

const moduleRouter = [
  {
    path: "/task",
    route: TaskRouter,
  },
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/user",
    route: UserRouter,
  },
];

moduleRouter.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
