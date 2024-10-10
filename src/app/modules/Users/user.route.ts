import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.post("/create-viewer", UserController.createViewer);

export const UserRouter = router;
