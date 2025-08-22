import express from "express";
import { getCloudComputing, addCloudComputing } from "../../controllers/specialization/cloudComputing.js";

const router = express.Router();

// Show page
router.get("/", getCloudComputing);

// Add new document
router.post("/add", addCloudComputing);

export default router;
