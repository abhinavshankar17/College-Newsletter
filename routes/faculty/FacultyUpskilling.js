import express from "express";
import { getAllFacultyUpskilling  , addFacultyUpskilling  } from "../../controllers/faculty/FacultyUpskilling.js";

const router = express.Router();
// GET route to list all consultancy works
router.get("/", getAllFacultyUpskilling);
// POST route to add a new consultancy work
router.post("/add", addFacultyUpskilling );
export default router;