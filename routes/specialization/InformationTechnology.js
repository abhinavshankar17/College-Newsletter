import express from "express";
import { getInformationTechnology, addInformationTechnology } from "../../controllers/specialization/InformationTechnology.js";

const router = express.Router();

// Show IT page
router.get("/", getInformationTechnology);

// Add new IT document
router.post("/add", addInformationTechnology);

export default router;
