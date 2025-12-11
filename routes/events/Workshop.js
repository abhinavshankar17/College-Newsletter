import express from "express";
const router = express.Router();
 
import { getAllWorkshops, addWorkshops } from "../../controllers/events/Workshop.js";

router.get("/", getAllWorkshops);
router.post("/add", addWorkshops);

export default router;
