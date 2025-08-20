import express from "express";
import { getCloudComputing, addCloudComputing } from "../controllers/cloudComputing.js";

const router = express.Router();

// GET - show page
router.get("/", getCloudComputing);

// POST - add new doc
router.post("/add", addCloudComputing);

export default router;
