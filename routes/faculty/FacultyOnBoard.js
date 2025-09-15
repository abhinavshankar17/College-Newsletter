import express from "express";
const router = express.Router();
import {getAllFacultyOnBoard , addFacultyOnBoard } from "../../controllers/faculty/FacultyOnBoard.js";

// View all faculty
router.get("/", getAllFacultyOnBoard);

// Add a faculty (optional form or Postman testing)
router.post("/add",addFacultyOnBoard );

export default router;
