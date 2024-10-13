import { Router } from "express";
import { AuthRouter } from "../modules/Auth/auth.route";
import { ProjectRouter } from "../modules/Project/project.route";
import { TaskRouter } from "../modules/Task/task.router";
import { TeamRouter } from "../modules/Team/team.route";
import { UserRouter } from "../modules/Users/user.route";

const router = Router();

const moduleRouter = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/user",
    route: UserRouter,
  },
  {
    path: "/task",
    route: TaskRouter,
  },
  {
    path: "/project",
    route: ProjectRouter,
  },
  {
    path: "/team",
    route: TeamRouter,
  },
];

moduleRouter.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
