import express from "express";
import multer from "multer";
import { createActivity, getActivities } from "../../controllers/students/activityController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Get all activities
router.get("/activities", getActivities);

// Add activity
router.post("/activities/add", upload.single("image"), createActivity);

export default router;
