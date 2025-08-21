import express from "express";
import { getCyberSecurity, addCyberSecurity } from "../controllers/cyberSecurity.js";
const router = express.Router();

// GET - show page
router.get("/", getCyberSecurity);

// POST - add new doc
router.post("/add", addCyberSecurity);

export default router;
