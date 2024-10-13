import { Router } from "express";
import { TeamController } from "./team.controller";

const router = Router();

router.post("/", TeamController.createTeam);
router.get("/", TeamController.getAllTeams);
router.patch("/:id", TeamController.updateTeam);
router.delete("/:id", TeamController.deleteTeam);

export const TeamRouter = router;
