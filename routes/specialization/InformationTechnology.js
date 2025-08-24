import express from "express";
import { getInformationTechnology , addInformationTechnology } from "../../controllers/specialization/InformationTechnology.js";

const router = express.Router();

// Show page
router.get("/", getInformationTechnology);

// Add new document
router.post("/add", addInformationTechnology);

export default router;