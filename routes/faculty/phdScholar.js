import express from "express";
import { getAllPhdScholars,addPhdScholar } from "../../controllers/faculty/phdScholar.js";
const router = express.Router();

// GET route to list all PhD Scholars
router.get("/", getAllPhdScholars);
// POST route to add a new PhD Scholar
router.post("/add", addPhdScholar);
export default router;