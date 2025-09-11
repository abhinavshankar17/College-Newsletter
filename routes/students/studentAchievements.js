import express from "express";
import multer from "multer";
import { getAchievements, createAchievement } from "../../controllers/students/studentAchievementController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ Just "/" here because "/students/achievements" is already the base
router.get("/", getAchievements);
router.post("/", upload.single("image"), createAchievement);

export default router;
