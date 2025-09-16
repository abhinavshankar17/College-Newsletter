import express from "express";
import { getAllEvents ,addAllEvents } from "../../controllers/events/Celebration.js";


const router = express.Router();

// GET route to list all consultancy works
router.get("/", getAllEvents);
// POST route to add a new consultancy work
router.post("/add", addAllEvents);


export default router;
