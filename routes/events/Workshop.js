import express from "express";
const router = express.Router();

// Correct import: match the exported names
import { getAllWorkshops, addAllWorkshops } from "../../controllers/events/Workshop.js";

router.get("/", getAllWorkshops);
router.post("/add", addAllWorkshops);

export default router;
