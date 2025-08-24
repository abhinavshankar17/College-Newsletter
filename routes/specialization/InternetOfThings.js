import express from "express";
import { getInternetOfThings, addInternetOfThings } from "../../controllers/specialization/InternetOfThings.js";

const router = express.Router();

// Show Page
router.get("/", getInternetOfThings);

// Add Data
router.post("/add", addInternetOfThings);

export default router;
