import express from "express";
import { getFacultyAchievements , addFacultyAchievements  } from "../../controllers/faculty/FacultyAchivements.js";
const router = express.Router();
// GET route to list all consultancy works
router.get("/", getFacultyAchievements);
// POST route to add a new consultancy work
router.post("/add", addFacultyAchievements );
export default router;