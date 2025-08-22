import express from "express";
import { getCyberSecurity, addCyberSecurity } from "../../controllers/specialization/cyberSecurity.js";

const router = express.Router();

// Show page
router.get("/", getCyberSecurity);

// Add new document
router.post("/add", addCyberSecurity);

export default router;
