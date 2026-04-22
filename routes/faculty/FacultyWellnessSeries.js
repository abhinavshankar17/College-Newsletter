 import express from "express";

const router = express.Router();

import {
  getFacultyWellnessSeries,
  addFacultyWellnessSeries
} from "../../controllers/faculty/FacultyWellnessSeriesController.js";

router.get("/", getFacultyWellnessSeries);

router.post("/add", addFacultyWellnessSeries);


export default router;