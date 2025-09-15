import express from "express";
import { getAllConsultancyWorks,addConsultancyWork } from "../../controllers/faculty/CounsultancyWork.js";


const router = express.Router();

// GET route to list all consultancy works
router.get("/", getAllConsultancyWorks);
// POST route to add a new consultancy work
router.post("/add", addConsultancyWork);


export default router;
