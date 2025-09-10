import express from "express";
import { getAchievements, createAchievement } from "../../controllers/students/studentAchievementController.js";

const router = express.Router();

router.get("/", getAchievements);
router.post("/", createAchievement);

export default router;
